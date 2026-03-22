import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Pure Oils', href: '/shop/oils' },
    { name: 'Homemade Pickles', href: '/shop/pickles' },
    { name: 'About Us', href: '/about' },
    { name: 'Bulk Orders', href: '/bulk-orders' },
  ];

  const customerCare = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">MV</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">M V Traders</h3>
                <p className="text-sm text-background/70">Pure & Traditional</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Authentic pure chekku oils and traditional homemade pickles. 
              Preserving heritage recipes for generations, straight from our family to yours.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-3">
              {customerCare.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">+91 98765 43210</p>
                  <p className="text-background/60 text-xs">Mon-Sat 9AM-6PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <a href="mailto:contact@mvtraders.shop" className="text-background/80 hover:text-primary text-sm transition-colors">
                    contact@mvtraders.shop
                  </a>
                  <p className="text-background/60 text-xs">Quick response</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">
                    4/222, RENGASAMUTHIRA PATTI,<br />
                    REDDIYA PATTI POST, ADIYANUTHU,<br />
                    Dindigul, Tamil Nadu 624003
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6">
              <Button 
                className="w-full btn-gold"
                asChild
              >
                <a href="https://wa.me/917373961569" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp Orders
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/70 text-sm text-center md:text-left">
              <p>&copy; 2024 M V Traders. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for authentic food lovers</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-background/60 text-xs">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="hover:text-primary transition-colors">
                Shipping Policy
              </Link>
              <Link to="/cancellation-refund" className="hover:text-primary transition-colors">
                Cancellation & Refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;