import { useState, useEffect, useCallback } from 'react';
import { AccessibilityInfo, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FontScale = 'small' | 'medium' | 'large' | 'extraLarge';

interface FontScaleConfig {
  scale: number;
  name: FontScale;
  displayName: string;
}

const FONT_SCALE_KEY = 'user_font_scale';

// Font scale configurations
const FONT_SCALES: FontScaleConfig[] = [
  { scale: 0.85, name: 'small', displayName: 'Pequeño' },
  { scale: 1.0, name: 'medium', displayName: 'Mediano' },
  { scale: 1.15, name: 'large', displayName: 'Grande' },
  { scale: 1.3, name: 'extraLarge', displayName: 'Extra Grande' },
];

const MAX_FONT_SCALE = 1.5; // Maximum system font scale we'll respect
const MIN_FONT_SCALE = 0.8; // Minimum font scale

export const useFontScaling = () => {
  const [currentScale, setCurrentScale] = useState<FontScaleConfig>(FONT_SCALES[1]); // Default to medium
  const [systemFontScale, setSystemFontScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get system font scale
  useEffect(() => {
    const getSystemFontScale = () => {
      const { fontScale } = Dimensions.get('window');
      // Clamp the system font scale to reasonable limits
      const clampedScale = Math.max(MIN_FONT_SCALE, Math.min(MAX_FONT_SCALE, fontScale));
      setSystemFontScale(clampedScale);
    };

    getSystemFontScale();
    
    // Listen for changes in system font scale
    const subscription = Dimensions.addEventListener('change', getSystemFontScale);
    return () => subscription?.remove();
  }, []);

  // Load saved font scale preference
  useEffect(() => {
    const loadFontScale = async () => {
      try {
        setIsLoading(true);
        const savedScale = await AsyncStorage.getItem(FONT_SCALE_KEY);
        
        if (savedScale) {
          const scaleConfig = FONT_SCALES.find(scale => scale.name === savedScale);
          if (scaleConfig) {
            setCurrentScale(scaleConfig);
          }
        } else if (Platform.OS === 'ios') {
          // On iOS, check if accessibility text size is enabled
          const isEnabled = await AccessibilityInfo.isBoldTextEnabled();
          if (isEnabled) {
            setCurrentScale(FONT_SCALES.find(s => s.name === 'large') || FONT_SCALES[2]);
          }
        }
      } catch (error) {
        console.error('Error loading font scale:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFontScale();
  }, []);

  // Save font scale preference
  const saveFontScale = async (scale: FontScale) => {
    try {
      await AsyncStorage.setItem(FONT_SCALE_KEY, scale);
    } catch (error) {
      console.error('Error saving font scale:', error);
    }
  };

  // Change font scale
  const setFontScale = useCallback(async (scale: FontScale) => {
    const scaleConfig = FONT_SCALES.find(s => s.name === scale);
    if (scaleConfig) {
      setCurrentScale(scaleConfig);
      await saveFontScale(scale);
    }
  }, []);

  // Get scaled font size
  const getScaledSize = useCallback((baseSize: number, respectSystemScale = true) => {
    let scaleFactor = currentScale.scale;
    
    if (respectSystemScale) {
      // Combine user preference with system font scale
      scaleFactor *= systemFontScale;
    }
    
    return Math.round(baseSize * scaleFactor);
  }, [currentScale.scale, systemFontScale]);

  // Get scaled spacing
  const getScaledSpacing = useCallback((baseSpacing: number) => {
    // Apply a more subtle scaling to spacing (50% of font scaling effect)
    const scaleFactor = 1 + ((currentScale.scale - 1) * 0.5);
    return Math.round(baseSpacing * scaleFactor * systemFontScale);
  }, [currentScale.scale, systemFontScale]);

  // Get line height based on font size
  const getLineHeight = useCallback((fontSize: number, multiplier = 1.4) => {
    return Math.round(fontSize * multiplier);
  }, []);

  // Check if current scale is accessible
  const isAccessibleScale = useCallback(() => {
    return currentScale.scale >= 1.15; // Large or extra large
  }, [currentScale.scale]);

  // Get recommended minimum touch target size
  const getMinTouchTarget = useCallback(() => {
    // iOS and Android recommend minimum 44pt/48dp respectively
    const baseSize = Platform.OS === 'ios' ? 44 : 48;
    return getScaledSpacing(baseSize);
  }, [getScaledSpacing]);

  // Create scaled theme object
  const createScaledTheme = useCallback((baseTheme: any) => {
    return {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontSize: {
          xs: getScaledSize(baseTheme.typography.fontSize.xs),
          sm: getScaledSize(baseTheme.typography.fontSize.sm),
          md: getScaledSize(baseTheme.typography.fontSize.md),
          lg: getScaledSize(baseTheme.typography.fontSize.lg),
          xl: getScaledSize(baseTheme.typography.fontSize.xl),
          xxl: getScaledSize(baseTheme.typography.fontSize.xxl),
          xxxl: getScaledSize(baseTheme.typography.fontSize.xxxl),
          display: getScaledSize(baseTheme.typography.fontSize.display),
        },
      },
      spacing: {
        xs: getScaledSpacing(baseTheme.spacing?.xs || 4),
        sm: getScaledSpacing(baseTheme.spacing?.sm || 8),
        md: getScaledSpacing(baseTheme.spacing?.md || 16),
        lg: getScaledSpacing(baseTheme.spacing?.lg || 24),
        xl: getScaledSpacing(baseTheme.spacing?.xl || 32),
        xxl: getScaledSpacing(baseTheme.spacing?.xxl || 48),
      },
    };
  }, [getScaledSize, getScaledSpacing]);

  return {
    // Current state
    currentScale: currentScale.name,
    currentScaleConfig: currentScale,
    systemFontScale,
    isLoading,
    
    // Available scales
    availableScales: FONT_SCALES,
    
    // Actions
    setFontScale,
    
    // Utilities
    getScaledSize,
    getScaledSpacing,
    getLineHeight,
    getMinTouchTarget,
    createScaledTheme,
    
    // Accessibility helpers
    isAccessibleScale,
    
    // Quick access to common scaled sizes
    scaledSizes: {
      xs: getScaledSize(12),
      sm: getScaledSize(14),
      md: getScaledSize(16),
      lg: getScaledSize(18),
      xl: getScaledSize(20),
      xxl: getScaledSize(24),
      xxxl: getScaledSize(30),
    },
    
    scaledSpacing: {
      xs: getScaledSpacing(4),
      sm: getScaledSpacing(8),
      md: getScaledSpacing(16),
      lg: getScaledSpacing(24),
      xl: getScaledSpacing(32),
    },
  };
};