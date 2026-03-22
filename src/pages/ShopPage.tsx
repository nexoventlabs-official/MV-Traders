import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

const ShopPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceFilter, setPriceFilter] = useState('all');

  // Get category info
  const categoryInfo = categories.find(cat => cat.slug === category);
  
  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = category 
      ? products.filter(p => p.category === category)
      : products;

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-200':
          filtered = filtered.filter(p => p.price < 200);
          break;
        case '200-400':
          filtered = filtered.filter(p => p.price >= 200 && p.price <= 400);
          break;
        case 'above-400':
          filtered = filtered.filter(p => p.price > 400);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  }, [category, sortBy, priceFilter]);

  const pageTitle = categoryInfo ? categoryInfo.name : 'All Products';
  const pageDescription = categoryInfo ? categoryInfo.description : 'Explore our complete range of pure chekku oils and homemade pickles';

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          {categoryInfo && (
            <>
              <span>/</span>
              <span className="text-foreground">{categoryInfo.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className={cn(
          "rounded-2xl p-8 mb-8",
          categoryInfo?.color === 'gold' ? 'section-gold' : categoryInfo?.color === 'red' ? 'section-red' : 'section-rustic'
        )}>
          <div className="text-center space-y-4">
            {categoryInfo && (
              <Badge 
                className={cn(
                  "mb-2",
                  categoryInfo.color === 'gold' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {filteredProducts.length} Products Available
              </Badge>
            )}
            <h1 className="text-4xl font-heading font-bold text-foreground">
              {pageTitle}
            </h1>
            <p className="text-xl text-body max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>
            
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-200">Under ₹200</SelectItem>
                <SelectItem value="200-400">₹200 - ₹400</SelectItem>
                <SelectItem value="above-400">Above ₹400</SelectItem>
              </SelectContent>
            </Select>

            {!category && (
              <div className="flex gap-2">
                <Link to="/shop/oils">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Pure Oils
                  </Badge>
                </Link>
                <Link to="/shop/pickles">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground">
                    Homemade Pickles
                  </Badge>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="px-3"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="px-3"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={cn(
          "gap-6",
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col space-y-4"
        )}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              className={viewMode === 'list' ? 'flex-row' : ''}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="mt-8">
            <CardContent className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSortBy('featured');
                setPriceFilter('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Category Navigation */}
        {!category && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <Link key={cat.id} to={`/shop/${cat.slug}`}>
                  <Card className="overflow-hidden hover-lift group">
                    <div className="relative h-48">
                      <img 
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        cat.color === 'gold' 
                          ? 'from-primary/60 to-transparent' 
                          : 'from-secondary/60 to-transparent'
                      }`} />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-heading font-bold text-white mb-2">
                          {cat.name}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;