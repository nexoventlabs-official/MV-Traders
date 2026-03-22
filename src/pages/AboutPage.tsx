import { Award, Heart, Leaf, Users, Clock, Star, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroChekku from '@/assets/hero-chekku.jpg';
import heroPickles from '@/assets/hero-pickles.jpg';

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: '100% Pure & Natural',
      description: 'No chemicals, preservatives, or artificial additives. Just pure, natural ingredients with authentic flavors and health benefits.'
    },
    {
      icon: Heart,
      title: 'Family Legacy',
      description: 'Three generations of perfecting traditional oil pressing and pickle making with age-old recipes and love.'
    },
    {
      icon: Award,
      title: 'Uncompromising Quality',
      description: 'From handpicked ingredients to rigorous quality checks, we maintain the highest standards.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Supporting local farmers and fair trade practices to make a positive impact.'
    }
  ];

  const timeline = [
    {
      year: '1972',
      title: 'Humble Beginnings',
      description: 'Shri. Murugan Venkatesh established our first wooden chekku press, serving pure sesame oil to local families.'
    },
    {
      year: '1995',
      title: 'Culinary Heritage',
      description: 'Introduced signature pickles using traditional recipes, becoming a household name in our region.'
    },
    {
      year: '2010',
      title: 'Modern Expansion',
      description: 'Invested in modern facilities while preserving traditional methods, serving over 5,000 families.'
    },
    {
      year: '2024',
      title: 'Digital Renaissance',
      description: 'Launched our online store to share our heritage with the world, bringing traditional flavors across India.'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 to-amber-900/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="text-base px-6 py-2 border-amber-300 bg-amber-50/50 backdrop-blur-sm">
              <Clock className="w-4 h-4 mr-2 text-amber-600" />
              Since 1972 • 3 Generations of Excellence
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-tight">
              Preserving Tradition,
              <span className="text-amber-700 block">One Drop at a Time</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
              For over five decades, M V Traders has been the guardian of authentic South Indian culinary heritage, bringing you the purest chekku oils and traditional pickles made with time-honored techniques.
            </p>
            <div className="pt-4">
              <Button asChild className="btn-gold">
                <Link to="/shop">
                  Explore Our Products
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                    Our Story
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                  The Heart Behind Every Drop
                </h2>
                <div className="space-y-5 text-slate-700 leading-relaxed">
                  <p>
                    In 1972, in a small village near Dindigul, our grandfather Shri. Murugan Venkatesh began pressing oil using a traditional wooden chekku (ghani). What started as a way to provide pure, unadulterated oil for our family soon became a mission to serve our community with authentic, chemical-free products.
                  </p>
                  <p>
                    Our grandmother's pickle recipes, carefully guarded and perfected over generations, became the talk of the village. The distinct taste of her mango and lime pickles, made with handpicked ingredients and traditional sun-drying methods, created a loyal following that would become the foundation of M V Traders.
                  </p>
                  <p>
                    Today, while we've grown from that single oil press to serving thousands of families, our commitment remains unchanged. Every product that leaves our facility carries not just the flavors of South India, but the dedication and love of three generations of our family.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="btn-gold group" asChild>
                  <Link to="/shop" className="flex items-center">
                    Discover Our Range
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact" className="flex items-center">
                    Visit Our Facility
                    <MapPin className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="space-y-4">
                <div className="relative h-3/5 overflow-hidden rounded-2xl shadow-lg group">
                  <img 
                    src={heroChekku}
                    alt="Traditional wooden chekku oil extraction"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-heading font-semibold text-lg">Wooden Chekku Press</h4>
                      <p className="text-sm text-amber-100">Cold-pressed to preserve nutrients</p>
                    </div>
                  </div>
                </div>
                <div className="h-2/5 bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col justify-center transition-all hover:shadow-md">
                  <div className="flex items-start mb-3">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <Leaf className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-slate-800">Traditional Methods</h4>
                      <p className="text-sm text-slate-600 mt-1">Wooden chekku pressing preserves natural nutrients and authentic flavor</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2/5 bg-rose-50 border border-rose-100 rounded-2xl p-6 flex flex-col justify-center transition-all hover:shadow-md">
                  <div className="flex items-start mb-3">
                    <div className="bg-rose-100 p-2 rounded-lg mr-3">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-slate-800">Family Recipes</h4>
                      <p className="text-sm text-slate-600 mt-1">Secret spice blends perfected over generations</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-3/5 overflow-hidden rounded-2xl shadow-lg group">
                  <img 
                    src={heroPickles}
                    alt="Traditional South Indian pickles"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h4 className="font-heading font-semibold text-lg">Handcrafted Pickles</h4>
                      <p className="text-sm text-amber-100">Sun-dried and packed with love</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 section-gold">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              The principles that guide everything we do, from sourcing ingredients to serving customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Journey Through Time
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Decades of dedication, growth, and commitment to authentic flavors.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24">
                  <Badge className="bg-primary text-primary-foreground text-sm font-semibold">
                    {item.year}
                  </Badge>
                </div>
                <div className="flex-1 ml-8 relative">
                  {index < timeline.length - 1 && (
                    <div className="absolute left-0 top-8 w-px h-20 bg-border"></div>
                  )}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary -translate-x-1.5"></div>
                  <Card className="ml-6">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 section-red">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-heading font-bold text-foreground">50+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-heading font-bold text-foreground">5000+</div>
              <p className="text-muted-foreground">Happy Families</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-heading font-bold text-foreground">100+</div>
              <p className="text-muted-foreground">Bulk Customers</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1 text-4xl font-heading font-bold text-foreground">
                <span>4.9</span>
                <Star className="w-8 h-8 fill-primary text-primary" />
              </div>
              <p className="text-muted-foreground">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl font-heading font-bold text-foreground">
                  Experience Authentic Flavors Today
                </h2>
                <p className="text-xl text-body">
                  Join thousands of families who trust M V Traders for pure, traditional taste. 
                  From our family to yours, with love and authenticity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gold" asChild>
                    <Link to="/shop">Start Shopping</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Visit Our Store</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;