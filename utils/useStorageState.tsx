import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function getStorageItemAsync(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("AsyncStorage is unavailable:", e);
    return null;
  }
}

export async function setStorageItemAsync(key: string, value: string | null) {
  try {
    if (value === null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    console.error("AsyncStorage is unavailable:", e);
  }
}

export async function deleteStorageItemAsync(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("AsyncStorage is unavailable:", e);
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();
  // Get
  useEffect(() => {
    const getItem = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setState(value);
      } catch (e) {
        console.error("AsyncStorage is unavailable:", e);
      }
    };
    
    getItem();
  }, [key, setState]);
  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}
