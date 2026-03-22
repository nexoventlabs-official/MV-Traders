import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-serif font-bold mb-2">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground mb-8">Your Trust, Our Responsibility</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At M V Traders, we value the trust you place in us when choosing our pure chekku oils and homemade pickles. 
            Protecting your personal information is as important to us as maintaining the authenticity of our products. 
            This Privacy Policy explains how we collect, use, protect, and manage your data when you shop with us online or offline.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            When you interact with M V Traders, we may collect:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Full Name</li>
            <li>Email Address & Phone Number</li>
            <li>Shipping & Billing Address</li>
            <li>Order Details & Purchase History</li>
            <li>Payment Information (via secure third-party gateways – we never store your card details)</li>
            <li>Device & Browser Information (for online store interactions)</li>
            <li>Cookies & Analytics Data (for performance optimization)</li>
          </ul>
          <p className="mb-6">
            We collect only the data necessary to serve you better and provide a smooth shopping experience.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Why We Collect Your Information</h2>
          <p className="mb-4">
            Your data helps us in:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Processing and fulfilling your orders</li>
            <li>Communicating shipping updates and delivery status</li>
            <li>Offering customer support and resolving queries</li>
            <li>Sending promotional offers and updates (only if you opt in)</li>
            <li>Understanding customer preferences and improving our oils, pickles, and services</li>
            <li>Complying with tax, legal, and regulatory obligations</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">How We Protect Your Information</h2>
          <p className="mb-4">
            We take strict measures to keep your personal data safe:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>SSL Encryption on our website to protect online transactions</li>
            <li>Secure Payment Gateways – no sensitive payment details are stored by us</li>
            <li>Access Controls – only authorized staff can handle customer data</li>
            <li>Regular Security Practices to ensure confidentiality and data integrity</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Your Rights & Choices</h2>
          <p className="mb-4">
            As our customer, you have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Access the data we hold about you</li>
            <li>Request corrections or updates to your information</li>
            <li>Ask us to delete your data (where legally permitted)</li>
            <li>Opt out of marketing communication at any time</li>
            <li>Raise any privacy-related concerns directly with us</li>
          </ul>
          <p className="mb-6">
            We aim to resolve all requests within 30 business days.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Third-Party Sharing</h2>
          <p className="mb-6">
            We do not sell or rent your personal information. Data may be shared only with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Logistics partners for order delivery</li>
            <li>Payment processors for secure billing</li>
            <li>Regulatory authorities if legally required</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Policy Updates</h2>
          <p className="mb-6">
            This Privacy Policy may be updated from time to time to reflect changes in law, technology, or business practices. 
            Any revisions will be posted on our website with a revised "Last Updated" date.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Contact Us</h2>
          <p className="mb-2">For questions or concerns regarding this Privacy Policy, please contact:</p>
          <address className="not-italic mb-8">
            <p className="font-medium">M V Traders</p>
            <p>4/222, RENGASAMUTHIRA PATTI, REDDIYA PATTI POST,</p>
            <p>ADIYANUTHU, Dindigul, Tamil Nadu 624003</p>
            <p>+91 7373961569</p>
            <p>Email: <a href="mailto:contact@mvtraders.shop" className="text-primary hover:underline">contact@mvtraders.shop</a></p>
            <p>Website: <a href="http://mvtraders.shop/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://mvtraders.shop/</a></p>
          </address>

          <div className="border-t pt-6 mt-8">
            <p className="text-muted-foreground">
              <strong>Last Updated:</strong> August 2024<br />
              © 2024 M V Traders. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
