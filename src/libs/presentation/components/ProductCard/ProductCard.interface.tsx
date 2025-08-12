export interface ProductCardProps {
  // Basic Info
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;

  // Media
  image?: string | { uri: string } | number;
  imageAlt?: string;

  // Pricing
  originalPrice?: number;
  currentPrice?: number;
  discountPercentage?: number;
  currency?: string;
  priceLabel?: string;

  // States
  isLoading?: boolean;
  isFavorite?: boolean;
  isAvailable?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;

  // Rating
  rating?: number;
  reviewCount?: number;

  // Actions
  onPress?: () => void;
  onFavoritePress?: () => void;
  onAddToCart?: () => void;

  // Layout
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
  size?: 'small' | 'medium' | 'large';

  // Custom styling
  style?: any;

  // Additional data
  metadata?: {
    duration?: string;
    location?: string;
    category?: string;
    tags?: string[];
  };
}

export interface SkeletonProductCardProps {
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
  size?: 'small' | 'medium' | 'large';
  count?: number;
}
