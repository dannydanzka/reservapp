import { useEffect, useRef, useState } from 'react';

import {
  Dimensions,
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
  Platform,
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
    duration: 0,
    easing: undefined,
    endCoordinates: {
      height: 0,
      screenX: 0,
      screenY: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    height: 0,
    isVisible: false,
  });

  const subscriptions = useRef<EmitterSubscription[]>([]);

  useEffect(() => {
    const keyboardWillShow: KeyboardEventListener = (event) => {
      setKeyboardInfo({
        duration: event.duration || 250,
        easing: event.easing,
        endCoordinates: event.endCoordinates,
        height: event.endCoordinates.height,
        isVisible: true,
      });
    };

    const keyboardWillHide: KeyboardEventListener = (event) => {
      setKeyboardInfo({
        duration: event.duration || 250,
        easing: event.easing,
        endCoordinates: event.endCoordinates,
        height: 0,
        isVisible: false,
      });
    };

    const keyboardDidShow: KeyboardEventListener = (event) => {
      setKeyboardInfo((prev) => ({
        ...prev,
        endCoordinates: event.endCoordinates,
        height: event.endCoordinates.height,
        isVisible: true,
      }));
    };

    const keyboardDidHide: KeyboardEventListener = (event) => {
      setKeyboardInfo((prev) => ({
        ...prev,
        endCoordinates: event.endCoordinates,
        height: 0,
        isVisible: false,
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
      subscriptions.current.forEach((subscription) => subscription.remove());
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
