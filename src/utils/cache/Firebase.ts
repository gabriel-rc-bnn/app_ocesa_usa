import AsyncStorage from '@react-native-async-storage/async-storage';

const SYNC_EVENTS_LIKE: string = '@isInitialSyncEventsLike';
const SYNC_EVENTS_ATTEND: string = '@isInitialSyncEventsAttend';

type CacheType = {
  setSyncEventsLike: (token: string) => Promise<void>;
  getSyncEventsLike: () => Promise<string>;
  setSyncEventsAttend: (token: string) => Promise<void>;
  getSyncEventsAttend: () => Promise<string>;
  removeAll: (callback: any) => Promise<void>;
};

const CACHE: CacheType = {
  setSyncEventsLike: async (token: string): Promise<void> => {
    return await AsyncStorage.setItem(SYNC_EVENTS_LIKE, token);
  },
  getSyncEventsLike: async (): Promise<string> => {
    return await AsyncStorage.getItem(SYNC_EVENTS_LIKE);
  },
  setSyncEventsAttend: async (token: string): Promise<void> => {
    return await AsyncStorage.setItem(SYNC_EVENTS_ATTEND, token);
  },
  getSyncEventsAttend: async (): Promise<string> => {
    return await AsyncStorage.getItem(SYNC_EVENTS_ATTEND);
  },
  removeAll: async (callback): Promise<void> => {
    const keys = [SYNC_EVENTS_LIKE, SYNC_EVENTS_ATTEND];
    return await AsyncStorage.multiRemove(keys, callback);
  },
};

export default CACHE;
