import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();

  const categoryColor = product.category === 'oils' ? 'gold' : 'red';
  const categoryClass = product.category === 'oils' ? 'section-gold' : 'section-red';

  return (
    <Card className={cn("product-card group", className)}>
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              ₹{(product.originalPrice - product.price)} OFF
            </Badge>
          )}
        </div>

        {/* Bulk Available */}
        {product.bulkAvailable && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-background/80">
              <Package className="w-3 h-3 mr-1" />
              Bulk
            </Badge>
          </div>
        )}

        {/* Category accent */}
        <div className={cn("absolute bottom-0 left-0 right-0 h-1", categoryClass)} />
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Category & Name */}
          <div>
            <p className={cn(
              "text-sm font-medium mb-1",
              product.category === 'oils' ? "text-primary" : "text-secondary"
            )}>
              {product.category === 'oils' ? 'Pure Oils' : 'Homemade Pickles'}
            </p>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-heading text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Description */}
          <p className="text-body text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Weight & Stock */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {product.weight && (
              <span className="flex items-center">
                <Package className="w-4 h-4 mr-1" />
                {product.weight}
              </span>
            )}
            <span className={cn(
              "font-medium",
              product.inStock ? "text-green-600" : "text-destructive"
            )}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <Button
              size="sm"
              className={cn(
                "shrink-0",
                categoryColor === 'gold' ? "btn-gold" : "btn-red"
              )}
              onClick={() => addItem(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <Link to={`/product/${product.id}`}>View Details</Link>
            </Button>
            {product.bulkAvailable && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                asChild
              >
                <Link to="/bulk-orders">Bulk Inquiry</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;