import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWhatsAppContact = () => {
    const contactMessage = `👋 Hello M V Traders!%0A%0A👤 Name: ${formData.name}%0A📧 Email: ${formData.email}%0A📱 Phone: ${formData.phone}%0A%0A📋 Subject: ${formData.subject}%0A%0A💬 Message:%0A${formData.message}`;
    
    const whatsappNumber = '917373961569'; // M V Traders WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${contactMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Message sent via WhatsApp",
      description: "We'll get back to you as soon as possible!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We're here to help with your questions and orders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
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
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is your message about?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                />
              </div>
              
              <Button
                onClick={handleWhatsAppContact}
                disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                className="w-full bg-gradient-gold text-charcoal hover:opacity-90"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send via WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">Mon-Sat, 9 AM - 7 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">Quick response guaranteed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@mvtraders.shop" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@mvtraders.shop
                    </a>
                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      4/222, RENGASAMUTHIRA PATTI,<br />
                      REDDIYA PATTI POST, ADIYANUTHU,<br />
                      Dindigul, Tamil Nadu 624003
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/50">
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Quick Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate assistance with orders or product queries, WhatsApp us directly.
                </p>
                <Button 
                  onClick={() => window.open('https://wa.me/917373961569?text=Hi M V Traders! I need help with...', '_blank')}
                  variant="outline" 
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How can I track my order?</h4>
                  <p className="text-sm text-muted-foreground">
                    Once your order is confirmed, we'll send you tracking details via WhatsApp.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Do you deliver nationwide?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we deliver across India. Delivery charges vary by location.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">What's your return policy?</h4>
                  <p className="text-sm text-muted-foreground">
                    We accept returns within 7 days for unopened products in original packaging.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;