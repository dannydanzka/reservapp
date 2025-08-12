import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Main Container
export const CardContainer = styled.TouchableOpacity<{
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
  size?: 'small' | 'medium' | 'large';
}>`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.md}
  overflow: hidden;
  margin-bottom: ${theme.spacing.md}px;

  ${({ variant }) => {
    switch (variant) {
      case 'horizontal':
        return `
          flex-direction: row;
          align-items: center;
          min-height: 120px;
        `;
      case 'compact':
        return `
          margin-bottom: ${theme.spacing.sm}px;
        `;
      case 'featured':
        return `
          ${theme.shadows.lg}
          border-width: 2px;
          border-color: ${theme.colors.primary[100]};
        `;
      default:
        return `
          width: 180px;
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 150px;
        `;
      case 'large':
        return `
          width: 220px;
        `;
      default:
        return `
          width: 180px;
        `;
    }
  }}
`;

// Image
export const ImageContainer = styled.View<{
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
}>`
  position: relative;

  ${({ variant }) => {
    switch (variant) {
      case 'horizontal':
        return `
          width: 100px;
          height: 100px;
          margin: ${theme.spacing.md}px;
        `;
      case 'compact':
        return `
          height: 120px;
        `;
      default:
        return `
          height: 140px;
        `;
    }
  }}
`;

export const ProductImage = styled.Image`
  border-top-left-radius: ${theme.borderRadius.lg}px;
  border-top-right-radius: ${theme.borderRadius.lg}px;
  height: 100%;
  width: 100%;
`;

export const ImageOverlay = styled.View`
  background-color: rgb(0 0 0 / 0.1);
  inset: 0;
  position: absolute;
`;

// Content
export const ContentContainer = styled.View<{
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
}>`
  padding: ${theme.spacing.md}px;
  flex: 1;

  ${({ variant }) => {
    switch (variant) {
      case 'horizontal':
        return `
          padding: ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px 0;
        `;
      case 'compact':
        return `
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        `;
      default:
        return '';
    }
  }}
`;

export const ProductTitle = styled.Text<{ numberOfLines?: number }>`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const ProductSubtitle = styled.Text<{ numberOfLines?: number }>`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 18px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const ProductDescription = styled.Text<{ numberOfLines?: number }>`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 18px;
  margin-bottom: ${theme.spacing.sm}px;
`;

// Pricing
export const PriceContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const CurrentPrice = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  margin-right: ${theme.spacing.sm}px;
`;

export const OriginalPrice = styled.Text`
  color: ${theme.colors.gray[400]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  margin-right: ${theme.spacing.sm}px;
  text-decoration-line: line-through;
`;

export const DiscountBadge = styled.View`
  background-color: ${theme.colors.error[500]};
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const DiscountText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
`;

// Rating
export const RatingContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const RatingText = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-left: ${theme.spacing.xs}px;
`;

export const ReviewCount = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  margin-left: ${theme.spacing.xs}px;
`;

// Metadata
export const MetadataContainer = styled.View`
  flex-flow: row wrap;
  gap: ${theme.spacing.xs}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const MetadataItem = styled.View`
  background-color: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const MetadataText = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
`;

// Actions
export const ActionsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const FavoriteButton = styled.TouchableOpacity<{ isFavorite?: boolean }>`
  align-items: center;
  background-color: ${({ isFavorite }) =>
    isFavorite ? theme.colors.error[50] : theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.full}px;
  height: 36px;
  justify-content: center;
  width: 36px;
`;

export const AddToCartButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  align-items: center;
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  border-radius: ${theme.borderRadius.md}px;
  flex: 1;
  justify-content: center;
  margin-left: ${theme.spacing.sm}px;
  min-height: 36px;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

export const AddToCartText = styled.Text<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? theme.colors.gray[500] : theme.colors.white)};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
`;

// Badges
export const BadgeContainer = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.xs}px;
  left: ${theme.spacing.sm}px;
  position: absolute;
  top: ${theme.spacing.sm}px;
`;

export const Badge = styled.View<{
  variant: 'new' | 'featured' | 'unavailable';
}>`
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;

  ${({ variant }) => {
    switch (variant) {
      case 'new':
        return `background-color: ${theme.colors.success[500]};`;
      case 'featured':
        return `background-color: ${theme.colors.warning[500]};`;
      case 'unavailable':
        return `background-color: ${theme.colors.gray[500]};`;
      default:
        return `background-color: ${theme.colors.gray[500]};`;
    }
  }}
`;

export const BadgeText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 600;
`;

// Skeleton Loading
export const SkeletonContainer = styled.View<{
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
  size?: 'small' | 'medium' | 'large';
}>`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.md}
  overflow: hidden;
  margin-bottom: ${theme.spacing.md}px;

  ${({ variant }) => {
    switch (variant) {
      case 'horizontal':
        return `
          flex-direction: row;
          align-items: center;
          min-height: 120px;
        `;
      case 'compact':
        return `
          margin-bottom: ${theme.spacing.sm}px;
        `;
      default:
        return `
          width: 180px;
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `width: 150px;`;
      case 'large':
        return `width: 220px;`;
      default:
        return `width: 180px;`;
    }
  }}
`;

export const SkeletonElement = styled.View<{
  width?: string | number;
  height?: number;
  marginBottom?: number;
  borderRadius?: number;
}>`
  background-color: ${theme.colors.gray[200]};
  border-radius: ${({ borderRadius }) => borderRadius || theme.borderRadius.sm}px;
  height: ${({ height }) => height || 16}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || theme.spacing.xs}px;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || '100%')};
`;

export const SkeletonContent = styled.View<{
  variant?: 'default' | 'horizontal' | 'compact' | 'featured';
}>`
  padding: ${theme.spacing.md}px;
  flex: 1;

  ${({ variant }) => {
    switch (variant) {
      case 'horizontal':
        return `
          padding: ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px 0;
        `;
      case 'compact':
        return `
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        `;
      default:
        return '';
    }
  }}
`;
