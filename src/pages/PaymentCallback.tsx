import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});

  useEffect(() => {
    const verifyPayment = async () => {
      // Get payment response from URL params
      const orderId = searchParams.get('ORDERID') || '';
      const txnId = searchParams.get('TXNID') || '';
      const txnAmount = searchParams.get('TXNAMOUNT') || '';
      const urlStatus = searchParams.get('STATUS') || '';
      const respCode = searchParams.get('RESPCODE') || '';
      const respMsg = searchParams.get('RESPMSG') || '';

      setPaymentDetails({
        orderId,
        txnId,
        txnAmount,
        status: urlStatus,
        respCode,
        respMsg,
      });

      // Verify payment status with backend if we have an orderId
      if (orderId) {
        try {
          const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mv-traders-0007.onrender.com';
          const response = await fetch(`${BACKEND_URL}/api/verify-transaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          });
          const data = await response.json();
          if (data.success) {
            setStatus('success');
          } else {
            // Fall back to URL param status
            setStatus(urlStatus === 'TXN_SUCCESS' ? 'success' : 'failed');
          }
        } catch (error) {
          console.error('Verification error:', error);
          // Fall back to URL param status
          setStatus(urlStatus === 'TXN_SUCCESS' ? 'success' : 'failed');
        }
      } else {
        setStatus(urlStatus === 'TXN_SUCCESS' ? 'success' : 'failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === 'processing') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-16">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-serif mb-2">Processing Payment...</h2>
            <p className="text-muted-foreground">Please wait while we verify your payment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className={`rounded-full p-3 ${status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              {status === 'success' ? (
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              ) : (
                <XCircle className="h-12 w-12 text-red-600" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-serif">
            {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            {status === 'success'
              ? 'Thank you for your payment! Your order has been confirmed.'
              : 'We could not process your payment. Please try again.'}
          </p>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Payment Details</h3>
            <div className="space-y-2 text-left max-w-xs mx-auto">
              {paymentDetails.orderId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">{paymentDetails.orderId}</span>
                </div>
              )}
              {paymentDetails.txnId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">{paymentDetails.txnId}</span>
                </div>
              )}
              {paymentDetails.txnAmount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">₹{paymentDetails.txnAmount}</span>
                </div>
              )}
              {paymentDetails.respMsg && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Message:</span>
                  <span className="font-medium text-sm">{paymentDetails.respMsg}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
            {status === 'success' ? (
              <Button
                onClick={() => navigate('/order-confirmation')}
                variant="default"
                className="w-full sm:w-auto"
              >
                View Order Details
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/checkout')}
                variant="default"
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCallback;
