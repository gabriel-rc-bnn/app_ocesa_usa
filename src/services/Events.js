import {
  ROUTES,
  BASIC_AUTH_DEV,
  EVENTS_SERVICE_FASTLY_URL,
} from '../utils/config/Constants';
import { PostponedApi, EventsServiceApi } from './Enpoinst';

export const loadPostponedEvents = async () =>
  (await PostponedApi())
    .get('', { auth: BASIC_AUTH_DEV })
    .then(({ data }) => {
      if (Array.isArray(data) && data.length > 0) {
        const newData = _(data)
          .filter(event => event.date)
          .map(event => {
            event.s_img_url = event.squaredImageUrl;
            event.details_url = `${EVENTS_SERVICE_FASTLY_URL}event/${event.seo}`;
            event.dates = [event.newIsoDate];

            return event;
          })
          .value();

        return Promise.resolve(newData);
      }
      if (!data || (Array.isArray(data) && data.length === 0))
        return loadAPIPostponedEvents();
      return Promise.resolve(null);
    })
    .catch(() => loadAPIPostponedEvents());

const loadAPIPostponedEvents = async () =>
  (await EventsServiceApi()).get(ROUTES.apiPostponedEvent).then(({ data }) => {
    if (Array.isArray(data) && data.length > 0) {
      const newData = _(data)
        .filter(
          event =>
            event.postponed &&
            event.newDate &&
            event.newDate.date &&
            event.event,
        )
        .map(event => {
          const { newDate, event: postponedEvent } = event;

          event.venue = newDate.venueName;
          event.stateRef = newDate.stateRef;
          event.s_img_url = postponedEvent.squaredImageUrl;
          event.name = postponedEvent.name;
          event.details_url = `${EVENTS_SERVICE_FASTLY_URL}event/${postponedEvent.seo}`;
          event.dates = [newDate.date];

          return event;
        })
        .value();

      return Promise.resolve(newData);
    }
    return Promise.resolve(null);
  });
