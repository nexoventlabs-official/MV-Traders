import { Link } from 'react-router-dom';
import { Star, Package, Shield, Truck, ArrowRight, Users, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { products, testimonials, categories } from '@/data/products';
import heroChekku from '@/assets/hero-chekku.jpg';
import heroPickles from '@/assets/hero-pickles.jpg';

const Homepage = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  
  return (
    <main className="min-h-screen">
      {/* Hero Section - Split Screen */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <Award className="w-4 h-4 mr-2" />
                  3rd Generation Family Business
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Pure Chekku Oils & 
                  <span className="text-primary block">Traditional Pickles</span>
                </h1>
                <p className="text-xl text-body max-w-lg">
                  Authentic flavors preserved for generations. From our traditional wooden chekku press 
                  to your kitchen, experience the taste of heritage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-gold" asChild>
                  <Link to="/shop/oils">
                    Shop Pure Oils
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/shop/pickles">Explore Pickles</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">100% Pure</p>
                  <p className="text-xs text-muted-foreground">No Adulterants</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">5000+ Families</p>
                  <p className="text-xs text-muted-foreground">Trust Us Daily</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Above ₹500</p>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-[600px]">
                <div className="space-y-4">
                  <div className="relative h-3/5 overflow-hidden rounded-2xl hover-lift">
                    <img 
                      src={heroChekku}
                      alt="Traditional Chekku Oil Press"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Traditional Chekku Method
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2/5 section-gold rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="font-heading text-lg font-semibold mb-2">Cold Pressed Excellence</h3>
                    <p className="text-sm text-body">Wooden chekku ensures maximum nutrition retention</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-12">
                  <div className="h-2/5 section-red rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="font-heading text-lg font-semibold mb-2">Family Recipes</h3>
                    <p className="text-sm text-body">Traditional pickle making passed down 3 generations</p>
                  </div>
                  <div className="relative h-3/5 overflow-hidden rounded-2xl hover-lift">
                    <img 
                      src={heroPickles}
                      alt="Traditional Homemade Pickles"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        Authentic Flavors
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 section-rustic">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Discover our range of authentic products, each crafted with traditional methods 
              and the finest ingredients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden hover-lift group">
                <div className="relative h-64">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    category.color === 'gold' 
                      ? 'from-primary/60 to-transparent' 
                      : 'from-secondary/60 to-transparent'
                  }`} />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <Badge 
                      className={`w-fit mb-3 ${
                        category.color === 'gold'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {products.filter(p => p.category === category.id).length} Products
                    </Badge>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <Button 
                      className={category.color === 'gold' ? 'btn-gold' : 'btn-red'}
                      asChild
                    >
                      <Link to={`/shop/${category.slug}`}>
                        Explore Collection
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Our most loved products, carefully selected for their exceptional quality and authentic taste.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 section-gold">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-body max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust M V Traders for authentic taste.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-body text-sm mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary mt-1">{testimonial.product}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Orders CTA */}
      <section className="py-16 section-red">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 items-center">
                <div className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      <Package className="w-4 h-4 mr-2" />
                      Bulk Orders Available
                    </Badge>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                        Special Pricing for Restaurants & Retailers
                      </h2>
                      <p className="text-body text-lg">
                        Get wholesale prices on bulk orders. Perfect for restaurants, grocery stores, 
                        and businesses. Minimum order quantities apply.
                      </p>
                    </div>
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Wholesale Pricing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Free Delivery</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="btn-red" asChild>
                        <Link to="/bulk-orders">Get Bulk Quote</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <a href="https://wa.me/917373961569" target="_blank" rel="noopener noreferrer">
                          WhatsApp Inquiry
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block h-full min-h-[400px] relative">
                  <img 
                    src={heroChekku}
                    alt="Bulk Orders"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-secondary/20 to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Homepage;