export interface ProductPack {
  id: string;
  name: string;
  weight: string;
  tagline: string;
  description: string;
  bestFor: string[];
  servings: number;
  badge?: string;
  sku: string;
  dimensions: string;
}

export interface NutritionalFact {
  nutrient: string;
  amountPer100g: string;
  dailyValuePercentage: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'vegetable' | 'draw' | 'traditional' | 'specialty' | string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  calories: string;
  image: string;
  featured?: boolean;
  soupName?: string;
  description: string;
  ingredients: {
    name: string;
    amount: string;
    unit: string;
    isKeySapphire?: boolean;
  }[];
  instructions: {
    step: number;
    title: string;
    text: string;
    tip?: string;
  }[];
  chefTip: string;
  perfectPairing: string;
}

export interface Stockist {
  id: string;
  name: string;
  type: 'supermarket' | 'wholesale' | 'online';
  state: string;
  city: string;
  address: string;
  phone: string;
  inStock: boolean;
  availablePacks: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  dishPrepared: string;
  date: string;
}

export interface DistributorQuote {
  cartonCount: number;
  packSize: '1kg' | '2kg' | '5kg' | '25kg';
  state: string;
  businessType: string;
}
