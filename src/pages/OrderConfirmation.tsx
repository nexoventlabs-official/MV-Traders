import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  // Generate a random order ID (in a real app, this would come from your backend)
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            Thank you for your order! Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Order Details</h3>
            <div className="space-y-2 text-left max-w-xs mx-auto">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-green-600 font-medium">Processing</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            We'll send you shipping confirmation when your order is on the way!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => navigate('/track-order')}
              variant="default"
              className="w-full sm:w-auto"
            >
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
