import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Building, Users, Package } from 'lucide-react';
import { products } from '@/data/products';

const BulkOrdersPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedProducts: [] as string[],
    quantity: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProductSelection = (productId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: checked 
        ? [...prev.selectedProducts, productId]
        : prev.selectedProducts.filter(id => id !== productId)
    }));
  };

  const handleSubmit = () => {
    const selectedProductNames = formData.selectedProducts
      .map(id => products.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const enquiryDetails = `🏪 Bulk Order Enquiry from M V Traders Website%0A%0A👤 Contact Details:%0AName: ${formData.name}%0ACompany: ${formData.company || 'N/A'}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0A%0A📦 Products Interested:%0A${selectedProductNames}%0A%0A📊 Expected Quantity: ${formData.quantity}%0A%0A💬 Message:%0A${formData.message || 'No additional message'}`;

    const whatsappNumber = '917373961569'; // M V Traders WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${enquiryDetails}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Bulk enquiry sent!",
      description: "We'll get back to you with the best pricing within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      selectedProducts: [],
      quantity: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Bulk Orders</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Special wholesale pricing for restaurants, retailers, and businesses
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Building className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">For Businesses</h3>
              <p className="text-sm text-muted-foreground">Restaurants, hotels, catering services</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">Wholesale Pricing</h3>
              <p className="text-sm text-muted-foreground">Special rates for bulk quantities</p>
            </div>
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">Custom Packaging</h3>
              <p className="text-sm text-muted-foreground">Branding options available</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Order Enquiry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Contact Person *</Label>
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
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company/Restaurant Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label>Products Interested In *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {products.filter(p => p.bulkAvailable).map((product) => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={product.id}
                        checked={formData.selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => 
                          handleProductSelection(product.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={product.id} className="text-sm">
                        {product.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="quantity">Expected Quantity/Month *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 100 bottles, 50kg, etc."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Additional Requirements</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Custom packaging, delivery schedule, etc."
                />
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.phone || !formData.email || formData.selectedProducts.length === 0 || !formData.quantity}
                className="w-full bg-gradient-gold text-charcoal hover:opacity-90"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Bulk Enquiry
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Our Bulk Services?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">🎯 Competitive Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Volume-based discounts with transparent pricing structure
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🚚 Reliable Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Scheduled deliveries to maintain your inventory levels
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎨 Custom Branding</h4>
                  <p className="text-sm text-muted-foreground">
                    Private labeling options for your business needs
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📞 Dedicated Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Direct line to our bulk sales team for all your queries
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-2">Need Immediate Assistance?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call our bulk sales team directly
                </p>
                <Button variant="outline" size="sm">
                  📞 +91 98765 43210
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrdersPage;