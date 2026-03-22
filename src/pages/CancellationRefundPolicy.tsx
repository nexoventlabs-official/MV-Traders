import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CancellationRefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-serif font-bold mb-2">Cancellation & Refund Policy</h1>
        <p className="text-xl text-muted-foreground mb-8">Clear, Fair, and Customer-Friendly</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At M V Traders, we pride ourselves on delivering pure chekku oils and freshly made pickles that reflect authenticity and quality. While we strive for perfection in every order, we understand that cancellations or issues may arise. This policy outlines how cancellations, returns, and refunds are handled.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Order Cancellations</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Cancellation Window:</strong> Orders can be cancelled within 2 hours of placement, provided they have not yet been packed or dispatched.</li>
            <li>Once an order is processed or handed to the courier, cancellations are no longer possible due to the perishable nature of our products.</li>
            <li>To cancel, contact us immediately with your Order ID via phone, email, or WhatsApp.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Returns & Replacements</h2>
          <p className="mb-4">
            Since our oils and pickles are food products, returns are accepted only under the following conditions:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The product is damaged or leaking on delivery.</li>
            <li>The wrong item was delivered.</li>
            <li>There is a verified quality or packaging issue.</li>
          </ul>
          <p className="mb-2 font-medium">Conditions:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Return requests must be raised within 48 hours of delivery.</li>
            <li>The product must be in its original sealed packaging.</li>
            <li>Photos/videos of the damaged or incorrect item must be shared with our support team for verification.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Non-Returnable Items</h2>
          <p className="mb-2">For safety and hygiene reasons, we cannot accept returns/refunds for:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Opened or partially used oils or pickles</li>
            <li>Items damaged due to mishandling after delivery</li>
            <li>Products returned without prior authorization</li>
            <li>Orders placed by mistake but already processed/shipped</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Refunds</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Approved refunds are initiated within 3–5 business days.</li>
            <li>Refunds are credited via the original payment method (UPI, bank transfer, card, etc.).</li>
            <li>Depending on your bank/payment provider, refunds may take 5–10 business days to reflect.</li>
            <li>Where replacement is possible, customers may choose between a refund, store credit, or replacement.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Exceptions</h2>
          <p className="mb-2">Refunds/cancellations will not apply in cases where:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Delivery is delayed due to courier/logistics disruptions.</li>
            <li>Customer provides incomplete/incorrect delivery address.</li>
            <li>Natural variations in taste, texture, or appearance occur (since products are handmade and preservative-free).</li>
          </ul>

          <div className="bg-accent/20 p-6 rounded-lg mt-10">
            <h2 className="text-2xl font-serif font-bold mb-4">Need Help?</h2>
            <p className="mb-4">For cancellations, refunds, or return-related queries, please contact:</p>
            <address className="not-italic">
              <p className="font-medium">M V Traders</p>
              <p>4/222, RENGASAMUTHIRA PATTI, REDDIYA PATTI POST,</p>
              <p>ADIYANUTHU, Dindigul, Tamil Nadu 624003</p>
              <p>Mobile: <a href="tel:+917373961569" className="text-primary hover:underline">+91 7373961569</a></p>
              <p>Email: <a href="mailto:contact@mvtraders.shop" className="text-primary hover:underline">contact@mvtraders.shop</a></p>
              <p>Website: <a href="http://mvtraders.shop/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://mvtraders.shop/</a></p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
