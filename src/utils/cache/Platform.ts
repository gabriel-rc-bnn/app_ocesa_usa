import AsyncStorage from '@react-native-async-storage/async-storage';

const PLATFORM: string = '@platform';
const TRACKING: string = '@tracking';

type CacheType = {
  setLoginPlatform: (token: string) => Promise<void>;
  getLoginPlatform: () => Promise<string>;
  setTrackingStatus: (status: string) => Promise<void>;
  getTrackingStatus: () => Promise<string>;
  removeAll: (callback: any) => Promise<void>;
};

const CACHE: CacheType = {
  setLoginPlatform: async (token: string): Promise<void> => {
    return await AsyncStorage.setItem(PLATFORM, token);
  },
  getLoginPlatform: async (): Promise<string> => {
    return await AsyncStorage.getItem(PLATFORM);
  },
  setTrackingStatus: async (status: string): Promise<void> => {
    return await AsyncStorage.setItem(TRACKING, status);
  },
  getTrackingStatus: async (): Promise<string> => {
    return await AsyncStorage.getItem(TRACKING);
  },
  removeAll: async (callback): Promise<void> => {
    const keys = [PLATFORM, TRACKING];
    return await AsyncStorage.multiRemove(keys, callback);
  },
};

export default CACHE;
