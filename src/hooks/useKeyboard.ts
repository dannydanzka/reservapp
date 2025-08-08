import { useEffect, useState, useRef } from 'react';
import { 
  Keyboard, 
  KeyboardEventListener, 
  Platform, 
  Dimensions,
  EmitterSubscription,
} from 'react-native';

export interface KeyboardInfo {
  isVisible: boolean;
  height: number;
  duration: number;
  easing: string | undefined;
  endCoordinates: {
    screenX: number;
    screenY: number;
    width: number;
    height: number;
  };
}

export const useKeyboard = () => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
    isVisible: false,
    height: 0,
    duration: 0,
    easing: undefined,
    endCoordinates: {
      screenX: 0,
      screenY: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      height: 0,
    },
  });

  const subscriptions = useRef<EmitterSubscription[]>([]);

  useEffect(() => {
    const keyboardWillShow: KeyboardEventListener = (event) => {
      setKeyboardInfo({
        isVisible: true,
        height: event.endCoordinates.height,
        duration: event.duration || 250,
        easing: event.easing,
        endCoordinates: event.endCoordinates,
      });
    };

    const keyboardWillHide: KeyboardEventListener = (event) => {
      setKeyboardInfo({
        isVisible: false,
        height: 0,
        duration: event.duration || 250,
        easing: event.easing,
        endCoordinates: event.endCoordinates,
      });
    };

    const keyboardDidShow: KeyboardEventListener = (event) => {
      setKeyboardInfo(prev => ({
        ...prev,
        isVisible: true,
        height: event.endCoordinates.height,
        endCoordinates: event.endCoordinates,
      }));
    };

    const keyboardDidHide: KeyboardEventListener = (event) => {
      setKeyboardInfo(prev => ({
        ...prev,
        isVisible: false,
        height: 0,
        endCoordinates: event.endCoordinates,
      }));
    };

    // Use different events based on platform
    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillShow', keyboardWillShow),
        Keyboard.addListener('keyboardWillHide', keyboardWillHide),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidShow', keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', keyboardDidHide),
      ];
    }

    return () => {
      subscriptions.current.forEach(subscription => subscription.remove());
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    ...keyboardInfo,
    dismissKeyboard,
  };
};