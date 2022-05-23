import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN: string = '@token';
const USER: string = '@user';
const LOCATION: string = '@location';
const EVENTSLIKE: string = '@eventslike';
const EVENTSATTEN: string = '@eventsatten';
const NOTIFICATIONS: string = '@notifications';

type CacheType = {
  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<string>;
  setUser: (token: Object) => Promise<void>;
  getUser: () => Promise<Object>;
  setLocation: (token: string) => Promise<void>;
  getLocation: () => Promise<Object>;
  setEventsLike: (eventslike: Array<Object>) => Promise<void>;
  getEventsLike: () => Promise<Array<Object>>;
  setEventsAtten: (eventslike: Array<Object>) => Promise<void>;
  getEventsAtten: () => Promise<Array<Object>>;
  setNotifications: (notification: Object) => Promise<void>;
  getNotifications: () => Promise<Array<Object>>;
  removeAll: (callback: any) => Promise<void>;
};

const CACHE: CacheType = {
  setToken: async (token: string): Promise<void> => {
    return await AsyncStorage.setItem(TOKEN, token);
  },
  getToken: async (): Promise<string> => {
    return await AsyncStorage.getItem(TOKEN);
  },
  setUser: async (user: Object): Promise<void> => {
    return await AsyncStorage.setItem(USER, JSON.stringify(user));
  },
  getUser: async (): Promise<Object> => {
    const data = await AsyncStorage.getItem(USER);

    if (data !== null) {
      return JSON.parse(data);
    } else {
      return { error: true, message: 'Login data not stored' };
    }
  },
  setLocation: async (location: string): Promise<void> => {
    return await AsyncStorage.setItem(LOCATION, JSON.stringify(location));
  },
  getLocation: async (): Promise<Object> => {
    const data = await AsyncStorage.getItem(LOCATION);

    if (data !== null) {
      return JSON.parse(data);
    } else {
      return { error: true, message: 'Login data not stored' };
    }
  },

  setEventsLike: async (eventslike: Array<Object>): Promise<void> => {
    return await AsyncStorage.setItem(EVENTSLIKE, JSON.stringify(eventslike));
  },
  getEventsLike: async (): Promise<Array<Object>> => {
    const data = await AsyncStorage.getItem(EVENTSLIKE);

    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [{ error: true, message: 'Events like data not stored' }];
    }
  },
  setEventsAtten: async (eventsatten: Array<Object>): Promise<void> => {
    return await AsyncStorage.setItem(EVENTSATTEN, JSON.stringify(eventsatten));
  },
  getEventsAtten: async (): Promise<Array<Object>> => {
    const data = await AsyncStorage.getItem(EVENTSATTEN);

    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [{ error: true, message: 'Events like data not stored' }];
    }
  },
  setNotifications: async (notification: Object): Promise<void> => {
    let data = await AsyncStorage.getItem(NOTIFICATIONS);

    if (data !== null) {
      data = JSON.parse(data);

      return await AsyncStorage.setItem(
        NOTIFICATIONS,
        JSON.stringify([...data, notification]),
      );
    } else {
      return await AsyncStorage.setItem(
        NOTIFICATIONS,
        JSON.stringify([notification]),
      );
    }
  },
  getNotifications: async (): Promise<Array<Object>> => {
    const data = await AsyncStorage.getItem(NOTIFICATIONS);

    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [{ error: true, message: 'Notifications data not stored' }];
    }
  },

  removeAll: async (callback): Promise<void> => {
    const keys = [
      TOKEN,
      USER,
      LOCATION,
      EVENTSLIKE,
      EVENTSATTEN,
      NOTIFICATIONS,
    ];
    return await AsyncStorage.multiRemove(keys, callback);
  },
};

export default CACHE;
