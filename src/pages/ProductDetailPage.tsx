import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart, MessageCircle, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-serif mb-4">Product not found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBulkInquiry = () => {
    const message = `Hi! I'm interested in bulk ordering of ${product.name}. Could you please share the wholesale pricing and minimum order quantity?`;
    const whatsappUrl = `https://wa.me/917373961569?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-foreground capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center gap-2 mb-6 text-sm hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge variant="destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {product.weight && (
              <div>
                <span className="font-medium">Weight/Volume: </span>
                <span className="text-muted-foreground">{product.weight}</span>
              </div>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-gold text-charcoal hover:opacity-90"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              {product.bulkAvailable && (
                <Button
                  onClick={handleBulkInquiry}
                  variant="outline"
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Bulk Inquiry
                </Button>
              )}
            </div>

            {!product.inStock && (
              <p className="text-destructive text-sm">
                This product is currently out of stock. Contact us for availability.
              </p>
            )}
          </div>
        </div>

        {/* Product Features */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-serif mb-4">Product Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">✨ Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Made using traditional methods with the finest ingredients sourced directly from trusted farmers.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">🌱 Natural & Pure</h3>
                <p className="text-sm text-muted-foreground">
                  No artificial preservatives, colors, or additives. Just pure, natural goodness.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">🏺 Traditional Process</h3>
                <p className="text-sm text-muted-foreground">
                  Prepared using time-tested traditional methods passed down through generations.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">📦 Fresh Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  Carefully packaged to maintain freshness and deliver the authentic taste to your home.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif mb-6">You might also like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;