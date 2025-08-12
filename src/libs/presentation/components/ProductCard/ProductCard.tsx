import React from 'react';

import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { View } from 'react-native';

import { theme } from '@styles/theme';

import { ProductCardProps, SkeletonProductCardProps } from './ProductCard.interface';

import * as S from './ProductCard.styled';

// Skeleton Loading Component
export const SkeletonProductCard: React.FC<SkeletonProductCardProps> = ({
  count = 1,
  size = 'medium',
  variant = 'default',
}) => {
  const renderSkeleton = () => (
    <S.SkeletonContainer size={size} variant={variant}>
      {variant !== 'horizontal' && (
        <S.SkeletonElement
          borderRadius={0}
          height={variant === 'compact' ? 120 : 140}
          marginBottom={0}
        />
      )}

      {variant === 'horizontal' && (
        <View style={{ margin: theme.spacing.md }}>
          <S.SkeletonElement
            borderRadius={theme.borderRadius.lg}
            height={100}
            marginBottom={0}
            width={100}
          />
        </View>
      )}

      <S.SkeletonContent variant={variant}>
        <S.SkeletonElement height={18} width='80%' />
        <S.SkeletonElement height={14} width='60%' />
        <S.SkeletonElement height={16} width='40%' />

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.spacing.sm,
          }}
        >
          <S.SkeletonElement borderRadius={theme.borderRadius.full} height={30} width={30} />
          <S.SkeletonElement height={32} width='60%' />
        </View>
      </S.SkeletonContent>
    </S.SkeletonContainer>
  );

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <View>
      {Array.from({ length: count }, (_, index) => (
        <View key={index}>{renderSkeleton()}</View>
      ))}
    </View>
  );
};

// Main ProductCard Component
const ProductCard: React.FC<ProductCardProps> = ({
  currency = '$',
  currentPrice = 0,
  description = '',
  discountPercentage = 0,
  id = '',
  image = '',
  imageAlt = '',
  isAvailable = true,
  isFavorite = false,
  isFeatured = false,
  isLoading = false,
  isNew = false,
  metadata = {},
  onAddToCart = () => {},
  onFavoritePress = () => {},
  onPress = () => {},
  originalPrice = 0,
  priceLabel = '',
  rating = 0,
  reviewCount = 0,
  size = 'medium',
  style = {},
  subtitle = '',
  title = '',
  variant = 'default',
}) => {
  // Show skeleton if loading
  if (isLoading) {
    return <SkeletonProductCard size={size} variant={variant} />;
  }

  const formatPrice = (price?: number) => {
    if (price === undefined) return '';
    return `${currency}${price.toLocaleString()}`;
  };

  const renderBadges = () => {
    const badges = [];

    if (isNew) {
      badges.push(
        <S.Badge key='new' variant='new'>
          <S.BadgeText>Nuevo</S.BadgeText>
        </S.Badge>
      );
    }

    if (isFeatured) {
      badges.push(
        <S.Badge key='featured' variant='featured'>
          <S.BadgeText>Destacado</S.BadgeText>
        </S.Badge>
      );
    }

    if (!isAvailable) {
      badges.push(
        <S.Badge key='unavailable' variant='unavailable'>
          <S.BadgeText>No disponible</S.BadgeText>
        </S.Badge>
      );
    }

    return badges.length > 0 ? <S.BadgeContainer>{badges}</S.BadgeContainer> : null;
  };

  const renderRating = () => {
    if (!rating) return null;

    return (
      <S.RatingContainer>
        <Star color={theme.colors.warning[500]} fill={theme.colors.warning[500]} size={14} />
        <S.RatingText>{rating.toFixed(1)}</S.RatingText>
        {reviewCount && <S.ReviewCount>({reviewCount})</S.ReviewCount>}
      </S.RatingContainer>
    );
  };

  const renderPricing = () => {
    if (!currentPrice && !originalPrice) return null;

    return (
      <S.PriceContainer>
        {currentPrice && <S.CurrentPrice>{formatPrice(currentPrice)}</S.CurrentPrice>}

        {originalPrice && originalPrice !== currentPrice && (
          <S.OriginalPrice>{formatPrice(originalPrice)}</S.OriginalPrice>
        )}

        {discountPercentage && (
          <S.DiscountBadge>
            <S.DiscountText>-{discountPercentage}%</S.DiscountText>
          </S.DiscountBadge>
        )}
      </S.PriceContainer>
    );
  };

  const renderMetadata = () => {
    if (!metadata) return null;

    const items = [];

    if (metadata.duration) items.push(metadata.duration);
    if (metadata.location) items.push(metadata.location);
    if (metadata.category) items.push(metadata.category);
    if (metadata.tags) items.push(...metadata.tags);

    if (items.length === 0) return null;

    return (
      <S.MetadataContainer>
        {items.slice(0, 3).map((item, index) => (
          <S.MetadataItem key={index}>
            <S.MetadataText>{item}</S.MetadataText>
          </S.MetadataItem>
        ))}
      </S.MetadataContainer>
    );
  };

  const renderActions = () => {
    return (
      <S.ActionsContainer>
        {onFavoritePress && (
          <S.FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress}>
            <Heart
              color={isFavorite ? theme.colors.error[500] : theme.colors.gray[400]}
              fill={isFavorite ? theme.colors.error[500] : 'none'}
              size={16}
            />
          </S.FavoriteButton>
        )}

        {onAddToCart && (
          <S.AddToCartButton
            disabled={!isAvailable}
            onPress={isAvailable ? onAddToCart : undefined}
          >
            <ShoppingBag
              color={isAvailable ? theme.colors.white : theme.colors.gray[500]}
              size={14}
            />
            <S.AddToCartText disabled={!isAvailable}>
              {isAvailable ? ' Agregar' : ' No disponible'}
            </S.AddToCartText>
          </S.AddToCartButton>
        )}
      </S.ActionsContainer>
    );
  };

  return (
    <S.CardContainer
      activeOpacity={onPress ? 0.8 : 1}
      size={size}
      style={style}
      variant={variant}
      onPress={onPress}
    >
      {/* Image */}
      {image && (
        <S.ImageContainer variant={variant}>
          <S.ProductImage
            accessibilityLabel={imageAlt || title}
            source={typeof image === 'string' ? { uri: image } : image}
          />
          <S.ImageOverlay />
          {renderBadges()}
        </S.ImageContainer>
      )}

      {/* Content */}
      <S.ContentContainer variant={variant}>
        <S.ProductTitle numberOfLines={2}>{title}</S.ProductTitle>

        {subtitle && <S.ProductSubtitle numberOfLines={1}>{subtitle}</S.ProductSubtitle>}

        {description && (
          <S.ProductDescription numberOfLines={2}>{description}</S.ProductDescription>
        )}

        {renderRating()}
        {renderMetadata()}
        {renderPricing()}
        {renderActions()}
      </S.ContentContainer>
    </S.CardContainer>
  );
};

export default ProductCard;
export { SkeletonProductCard };
