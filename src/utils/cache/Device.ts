import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';

const DEVICE_ID: string = '@deviceId';
const GUEST_ID: string = '@guestId';

type CacheType = {
  setDeviceId: (token: string) => Promise<void>;
  getDeviceId: () => Promise<string>;
  removeDeviceId: () => Promise<void>;
  setGuestId: () => Promise<string>;
  getGuestId: () => Promise<string>;
  removeAll: (callback: any) => Promise<void>;
};

const CACHE: CacheType = {
  setDeviceId: async (token: string): Promise<void> => {
    return await AsyncStorage.setItem(DEVICE_ID, token);
  },
  getDeviceId: async (): Promise<string> => {
    return await AsyncStorage.getItem(DEVICE_ID);
  },
  removeDeviceId: async (): Promise<void> => {
    return await AsyncStorage.removeItem(DEVICE_ID);
  },
  setGuestId: async (): Promise<string> => {
    const id = shortid.generate();
    await AsyncStorage.setItem(GUEST_ID, String(id));
    return String(id);
  },
  getGuestId: async (): Promise<string> => {
    const guestId = await AsyncStorage.getItem(GUEST_ID);

    if (guestId !== null) {
      return String(guestId);
    } else {
      return await CACHE.setGuestId();
    }
  },
  removeAll: async (callback): Promise<void> => {
    const keys = [DEVICE_ID, GUEST_ID];
    return await AsyncStorage.multiRemove(keys, callback);
  },
};

export default CACHE;
