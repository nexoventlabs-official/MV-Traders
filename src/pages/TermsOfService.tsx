import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-serif font-bold mb-2">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">Last Updated: August 2025</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Welcome to M V Traders. By accessing our website or purchasing our products, you agree to comply with and be bound by the following Terms & Conditions. These terms govern all orders, sales, and interactions with M V Traders.
          </p>
          <p className="mb-8 font-medium">
            If you do not agree with these terms, we request you to discontinue use of our services.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">1. General Use of Website & Services</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>By using our services, you confirm that you are at least 18 years old or accessing under the supervision of a legal guardian.</li>
            <li>You agree to provide accurate and complete details while placing orders.</li>
            <li>Misuse, fraudulent activity, or abusive behavior may result in suspension of service.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">2. Products & Pricing</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>We specialize in cold-pressed chekku oils and homemade pickles prepared in small batches for freshness.</li>
            <li>Product descriptions are provided to the best of our ability; slight variations in color, taste, or packaging may occur since products are natural and handmade.</li>
            <li>Prices are listed in Indian Rupees (INR ₹) and may change due to raw material costs, seasonal availability, or business policy.</li>
            <li>We reserve the right to correct pricing or listing errors, cancel affected orders, and issue refunds where applicable.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">3. Orders & Payments</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Orders are confirmed only upon successful payment.</li>
            <li>We accept UPI, debit/credit cards, net banking, and wallets via secure gateways.</li>
            <li>M V Traders does not store payment details; transactions are handled by verified third-party providers.</li>
            <li>In case of payment errors, duplicates, or disputes, please contact our support team.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">4. Shipping & Delivery</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Orders are shipped across India using trusted courier partners.</li>
            <li>Estimated delivery timelines are displayed at checkout but may vary due to location and courier availability.</li>
            <li>Tracking details will be provided once your order is dispatched.</li>
            <li>M V Traders is not liable for delays caused by courier/logistics partners or force majeure events.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">5. Cancellations & Returns</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Orders may be cancelled within 2 hours of purchase, provided they have not been packed or shipped.</li>
            <li>Returns are accepted only in cases of:
              <ul className="list-[circle] pl-6 mt-2 space-y-1">
                <li>Damaged items received</li>
                <li>Wrong product delivered</li>
                <li>Verified quality issues</li>
              </ul>
            </li>
            <li>For detailed terms, refer to our Cancellation & Refund Policy.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">6. Customer Responsibilities</h2>
          <p className="mb-2">By shopping with us, you agree not to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide false or incomplete shipping details</li>
            <li>Resell our products without written approval</li>
            <li>Misuse our brand name or product information</li>
            <li>Raise fraudulent refund/return claims</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">7. Intellectual Property</h2>
          <p className="mb-6">
            All logos, product images, descriptions, and branding are the intellectual property of M V Traders. Unauthorized use or reproduction is prohibited.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">8. Limitation of Liability</h2>
          <p className="mb-2">M V Traders shall not be liable for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Minor variations in taste, texture, or appearance of products (as they are handmade/natural)</li>
            <li>Delays caused by courier partners or customer unavailability</li>
            <li>Indirect or incidental damages from product use beyond its intended purpose</li>
          </ul>
          <p className="mb-6">Our liability is limited to the value of the product purchased.</p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
          <p className="mb-6">
            These Terms & Conditions are governed by the laws of India, with disputes subject to the jurisdiction of courts in Dindigul, Tamil Nadu.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">10. Contact Us</h2>
          <p className="mb-4">For queries or support, please contact:</p>
          <address className="not-italic mb-8">
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
  );
};

export default TermsOfService;
