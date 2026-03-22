import { Product, Category } from '@/types';

// Import product images
import image1 from '@/assets/1.jpg';
import image2 from '@/assets/2.jpg';
import image3 from '@/assets/3.jpg';
import image4 from '@/assets/4.jpg';
import image5 from '@/assets/5.jpg';
import image6 from '@/assets/6.jpg';
import image7 from '@/assets/7.jpg';
import image8 from '@/assets/8.jpg';

export const categories: Category[] = [
  {
    id: 'oils',
    name: 'Pure Chekku Oils',
    description: 'Traditional cold-pressed oils using wooden chekku methods',
    image: image1,
    color: 'gold',
    slug: 'oils'
  },
  {
    id: 'pickles',
    name: 'Homemade Pickles',
    description: 'Authentic pickles made with traditional recipes and fresh spices',
    image: image2, 
    color: 'red',
    slug: 'pickles'
  }
];

export const products: Product[] = [
  // Oils
  {
    id: 'sample-oil-1rupee',
    name: 'Sample Pure Oil - ₹1 Trial',
    description: 'Try our authentic cold-pressed oils with this special 1 rupee sample. Perfect for testing quality before buying larger quantities.',
    price: 1,
    originalPrice: 10,
    category: 'oils',
    image: image1,
    inStock: true,
    featured: true,
    bulkAvailable: false,
    weight: '10ml',
    ingredients: ['100% Pure Sesame Oil']
  },
  {
    id: 'sesame-oil-500ml',
    name: 'Pure Sesame Oil',
    description: 'Cold-pressed sesame oil extracted using traditional wooden chekku methods. Rich in nutrients and flavor.',
    price: 450,
    originalPrice: 500,
    category: 'oils',
    image: image1,
    inStock: true,
    featured: true,
    bulkAvailable: true,
    weight: '500ml',
    ingredients: ['100% Pure Sesame Seeds']
  },
  {
    id: 'coconut-oil-1l',
    name: 'Virgin Coconut Oil',
    description: 'Premium virgin coconut oil cold-pressed from fresh coconuts. Perfect for cooking and health.',
    price: 380,
    category: 'oils',
    image: image2,
    inStock: true,
    featured: true,
    bulkAvailable: true,
    weight: '1L',
    ingredients: ['100% Fresh Coconut']
  },
  {
    id: 'groundnut-oil-1l',
    name: 'Cold-Pressed Groundnut Oil',
    description: 'Traditional groundnut oil with authentic taste and aroma. Ideal for all cooking needs.',
    price: 320,
    category: 'oils',
    image: image5,
    inStock: true,
    bulkAvailable: true,
    weight: '1L',
    ingredients: ['100% Groundnuts']
  },
  {
    id: 'sunflower-oil-1l',
    name: 'Sunflower Oil',
    description: 'Pure sunflower oil cold-pressed using traditional methods. Light and healthy for daily cooking.',
    price: 280,
    category: 'oils',
    image: image6,
    inStock: true,
    bulkAvailable: true,
    weight: '1L',
    ingredients: ['100% Sunflower Seeds']
  },

  // Pickles
  {
    id: 'mango-pickle-500g',
    name: 'Traditional Mango Pickle',
    description: 'Tangy and spicy mango pickle made with fresh mangoes and authentic spices. A family recipe.',
    price: 180,
    originalPrice: 200,
    category: 'pickles',
    image: image3,
    inStock: true,
    featured: true,
    bulkAvailable: true,
    weight: '500g',
    ingredients: ['Fresh Mangoes', 'Red Chili', 'Turmeric', 'Fenugreek', 'Mustard Seeds', 'Sesame Oil', 'Salt']
  },
  {
    id: 'lime-pickle-300g',
    name: 'Spicy Lime Pickle',
    description: 'Authentic lime pickle with the perfect balance of spice and tanginess. Made with sun-dried limes.',
    price: 150,
    category: 'pickles',
    image: image4,
    inStock: true,
    featured: true,
    bulkAvailable: true,
    weight: '300g',
    ingredients: ['Fresh Limes', 'Red Chili Powder', 'Turmeric', 'Asafoetida', 'Sesame Oil', 'Salt']
  },
  {
    id: 'mixed-vegetable-pickle-400g',
    name: 'Mixed Vegetable Pickle',
    description: 'A delightful mix of seasonal vegetables pickled with traditional spices and methods.',
    price: 220,
    category: 'pickles',
    image: image7,
    inStock: true,
    bulkAvailable: true,
    weight: '400g',
    ingredients: ['Carrots', 'Cauliflower', 'Green Chilies', 'Ginger', 'Garlic', 'Spices', 'Sesame Oil']
  },
  {
    id: 'garlic-pickle-250g',
    name: 'Garlic Pickle',
    description: 'Flavorful garlic pickle that adds a punch to any meal. Made with fresh garlic and aromatic spices.',
    price: 160,
    category: 'pickles',
    image: image8,
    inStock: true,
    bulkAvailable: true,
    weight: '250g',
    ingredients: ['Fresh Garlic', 'Red Chilies', 'Turmeric', 'Coriander', 'Sesame Oil', 'Salt']
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    text: 'The sesame oil quality is exceptional! Just like what my grandmother used to make. The traditional chekku method really makes a difference.',
    product: 'Pure Sesame Oil'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Bangalore',
    rating: 5,
    text: 'Amazing mango pickle! The taste is authentic and reminds me of home-made pickles. Will definitely order again.',
    product: 'Traditional Mango Pickle'
  },
  {
    id: 3,
    name: 'Meera Krishnan',
    location: 'Coimbatore',
    rating: 5,
    text: 'Excellent quality coconut oil. Pure and fresh. My family loves it for both cooking and hair care.',
    product: 'Virgin Coconut Oil'
  },
  {
    id: 4,
    name: 'Restaurant Annapoorna',
    location: 'Salem',
    rating: 5,
    text: 'We order oils in bulk for our restaurant. Consistent quality and authentic taste. Our customers love the food prepared with these oils.',
    product: 'Bulk Orders'
  }
];