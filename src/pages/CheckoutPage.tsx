import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, X } from 'lucide-react';
import { initiatePaytmPayment, openPaytmCheckout } from '@/lib/paytm';

const CheckoutPage = () => {
  const { items, total, clearCart, updateQuantity, removeItem } = useCart();

  // Check if cart contains only sample product (no shipping/tax)
  const hasSampleProduct = items.some(item => item.product.id === 'sample-oil-1rupee');
  const shippingCost = hasSampleProduct ? 0 : 50; // Waive shipping for sample product
  const taxRate = 0.05; // 5% tax
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = hasSampleProduct ? 0 : (subtotal * taxRate); // Waive tax for sample product
  const orderTotal = subtotal + shippingCost + tax;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Generate unique order ID
      const orderId = `ORD${Date.now()}`;
      
      // Prepare order data
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city} - ${formData.pincode}`
        },
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal,
        shipping: shippingCost,
        tax,
        total: orderTotal,
        notes: formData.notes,
        orderDate: new Date().toISOString()
      };
      
      // Store order data in localStorage for later retrieval
      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      
      // Initiate Paytm payment - get txnToken from backend
      const paymentData = await initiatePaytmPayment({
        orderId: orderId,
        amount: orderTotal.toFixed(2),
        customerId: formData.phone,
        customerEmail: formData.email || 'customer@example.com',
        customerPhone: formData.phone,
      });
      
      toast({
        title: "Opening payment gateway...",
        description: "Please complete your payment on Paytm",
      });
      
      // Open Paytm JS Checkout with txnToken
      await openPaytmCheckout(
        paymentData,
        // On Success
        (paymentStatus) => {
          console.log('Payment successful:', paymentStatus);
          clearCart();
          toast({
            title: "Payment Successful!",
            description: `Transaction ID: ${paymentStatus.TXNID || 'N/A'}`,
          });
          navigate(`/payment-callback?ORDERID=${orderId}&STATUS=TXN_SUCCESS&TXNID=${paymentStatus.TXNID || ''}&TXNAMOUNT=${paymentStatus.TXNAMOUNT || orderTotal.toFixed(2)}&RESPMSG=${encodeURIComponent(paymentStatus.RESPMSG || 'Payment successful')}`);
          setIsProcessing(false);
        },
        // On Failure
        (errorMsg) => {
          console.error('Payment failed:', errorMsg);
          toast({
            title: "Payment Failed",
            description: errorMsg || "Payment was not completed. Please try again.",
            variant: "destructive",
          });
          navigate(`/payment-callback?ORDERID=${orderId}&STATUS=TXN_FAILURE&RESPMSG=${encodeURIComponent(errorMsg || 'Payment failed')}`);
          setIsProcessing(false);
        }
      );
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-serif mb-4">No items in cart</h1>
        <p className="text-muted-foreground mb-6">Please add items to your cart before checkout.</p>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleOrderSubmit} className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden border">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">₹{item.product.price} each</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="font-medium w-16 text-right">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/50 p-4 rounded-lg mb-4">
                <p className="text-sm text-center">
                  Complete your order via WhatsApp for quick confirmation and delivery coordination.
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode || isProcessing}
                className="w-full bg-gradient-gold text-charcoal hover:opacity-90"
              >
                {isProcessing ? 'Processing...' : 'Pay with Paytm'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;