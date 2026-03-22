import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-serif font-bold mb-2">Shipping Policy</h1>
        <p className="text-xl text-muted-foreground mb-8">Pure, Fresh & Delivered with Care</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At M V Traders, we are committed to ensuring that our chekku oils and homemade pickles reach you safely, securely, and on time. This Shipping Policy explains how we handle order processing, delivery timelines, and packaging for our valued customers.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Order Processing Time</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Orders are processed within 2–4 business days after payment confirmation.</li>
            <li>Orders placed on Sundays or public holidays are processed on the next business day.</li>
            <li>Bulk/wholesale orders may require additional preparation time. Customers will be notified with updated timelines.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Shipping Destinations & Timelines</h2>
          <h3 className="text-xl font-semibold mb-2">Domestic Shipping (India)</h3>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li><strong>Metro Cities:</strong> 3–6 business days after dispatch</li>
            <li><strong>Non-Metro & Semi-Urban Areas:</strong> 5–10 business days after dispatch</li>
            <li><strong>Remote/Rural Areas:</strong> 7–12 business days after dispatch</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">International Shipping</h3>
          <p className="mb-6">
            At present, international shipping is limited. Export/B2B shipments may be arranged on request, with timelines depending on destination country, customs clearance, and logistics providers.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Shipping Charges</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Charges are calculated based on order weight, volume, and delivery location.</li>
            <li>Shipping costs will be displayed clearly at checkout before payment.</li>
            <li>Free shipping offers may apply for select orders or promotional campaigns.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Packaging & Handling</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Oils are packed in leak-proof, food-grade containers and sealed securely.</li>
            <li>Pickles are bottled in airtight jars to preserve freshness and prevent spillage.</li>
            <li>All parcels are cushioned in tamper-proof packaging to avoid damage in transit.</li>
            <li>Customers are advised to check packaging upon delivery and report damages immediately.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Tracking Your Order</h2>
          <p className="mb-2">Once your order is dispatched, you will receive:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>A tracking number via SMS/email/WhatsApp</li>
            <li>A tracking link to monitor real-time status</li>
          </ul>
          <p className="mb-6 text-muted-foreground">Please allow 24–48 hours for tracking updates after dispatch.</p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Delays & Exceptions</h2>
          <p className="mb-2">While we strive for timely delivery, delays may occur due to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Courier/logistics disruptions</li>
            <li>Weather or natural events</li>
            <li>Public holidays or regional restrictions</li>
            <li>Customs clearance delays (for exports)</li>
          </ul>
          <p className="mb-6">In such cases, our support team will proactively update you.</p>

          <div className="bg-accent/20 p-6 rounded-lg mt-10">
            <h2 className="text-2xl font-serif font-bold mb-4">Need Help?</h2>
            <p className="mb-4">For queries about your shipment, please contact:</p>
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

export default ShippingPolicy;
