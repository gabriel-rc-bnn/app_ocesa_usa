import axios from 'axios';
import { Constants, Functions } from '../utils';

const {
  PROFILE_URL,
  CUSTOMER_URL,
  LOCATIONS_URL,
  POSTPONED_URL,
  SEARCH_ENGINE_URL,
  NOTIFICATIONS_URL,
  EVENTS_SERVICE_URL,
  EVENTS_SERVICE_FASTLY_URL,
} = Constants;

const { loginHeader } = Functions;

async function config(URL) {
  return {
    baseURL: URL,
    timeout: 30000,
    headers: await loginHeader(),
  };
}

export const LocationsApi = async () =>
  axios.create(await config(LOCATIONS_URL));

export const PostponedApi = async () =>
  axios.create(await config(POSTPONED_URL));

export const SearchEngineApi = async () =>
  axios.create(await config(SEARCH_ENGINE_URL));

export const NotificationsApi = async () =>
  axios.create(await config(NOTIFICATIONS_URL));

export const EventsServiceApi = async () =>
  axios.create(await config(EVENTS_SERVICE_URL));

export const EventsServiceFastlyApi = async () =>
  axios.create(await config(EVENTS_SERVICE_FASTLY_URL));

export const ProfileApi = async () => axios.create(await config(PROFILE_URL));

export const CustomerApi = async () => axios.create(await config(CUSTOMER_URL));
