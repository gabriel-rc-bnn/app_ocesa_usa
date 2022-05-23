import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import { UserCache } from '../../utils';
import axios from 'axios';
import {
  ProfileApi,
  CustomerApi,
  LocationsApi,
  PostponedApi,
  SearchEngineApi,
  NotificationsApi,
  EventsServiceApi,
  EventsServiceFastlyApi,
} from '../../services/Enpoinst';
import * as FirebaseService from '../../firebase';
import { Types, Constants, Functions } from '../../utils';

const {
  // CLEAR
  CLEAR_SEARCH,
  CLEAR_SEARCH_TEXT,
  CLEAR_USER_SEARCH,
  CLEAR_EVENT_DETAILS,
  CLEAR_ARTIST,
  //
  SEARCH_CHANGED,
  SELECT_INDEX_CITY,
  //SEARCH SUBMIT
  SHOW_SEARCH_SUBMIT_SPINNER,
  LOAD_SEARCH_SUBMIT_SUCCESS,
  LOAD_SEARCH_SUBMIT_FAIL,
  //GENRES
  SHOW_GENRES_SPINNER,
  LOAD_GENRES_SUCCESS,
  LOAD_GENRES_FAIL,
  //GENRES EVENTE
  SHOW_GENERAL_EVENTS_SPINNER,
  LOAD_GENERAL_EVENTS_SUCCESS,
  LOAD_GENERAL_EVENTS_FAIL,
  // SEARCH GENRE
  SHOW_SEARCH_GENRE_SPINNER,
  LOAD_SEARCH_GENRE_SUCCESS,
  LOAD_SEARCH_GENRE_FAIL,
  //LOACTION
  SHOW_SEARCH_LOCATION_SPINNER,
  LOAD_SEARCH_LOCATION_SUCCESS,
  LOAD_SEARCH_LOCATION_FAIL,
  //RECOMMENDATION
  SHOW_RECOMMENDATIONS_SPINNER,
  LOAD_RECOMMENDATIONS_FAIL,
  LOAD_RECOMMENDATIONS_SUCCESS,
  //RECOMMEND MOASIC
  SHOW_RECOMMENDATIONS_MOSAIC_SPINNER,
  LOAD_RECOMMENDATIONS_MOSAIC_SUCCESS,
  LOAD_RECOMMENDATIONS_MOSAIC_FAIL,
  // TREDINGS
  SHOW_TRENDINGS_SPINNER,
  LOAD_TRENDINGS_SUCCESS,
  LOAD_TRENDINGS_FAIL,
  //events position
  SHOW_EVENTS_POSITION_SPINNER,
  LOAD_EVENTS_POSITION_SUCCESS,
  LOAD_EVENTS_POSITION_FAIL,
  //RECENTLY
  SHOW_RECENTLY_SPINNER,
  LOAD_RECENTLY_SUCCESS,
  LOAD_RECENTLY_FAIL,
  //PRESALES MOSAIC
  SHOW_PRESALES_MOSAIC_SPINNER,
  LOAD_PRESALES_MOSAIC_SUCCESS,
  LOAD_PRESALES_MOSAIC_FAIL,
  //TRENDINGS_GENRE
  SHOW_TRENDINGS_GENRE_SPINNER,
  LOAD_TRENDINGS_GENRE_SUCCESS,
  LOAD_TRENDINGS_GENRE_FAIL,
  //PRESEALES
  SHOW_PRESALES_SPINNER,
  LOAD_PRESALES_SUCCESS,
  LOAD_PRESALES_FAIL,
  //PRESALES_CITIBANAMEX
  SHOW_PRESALES_CITIBANAMEX_SPINNER,
  LOAD_PRESALES_CITIBANAMEX_SUCCESS,
  LOAD_PRESALES_CITIBANAMEX_FAIL,
  //SPECIALS
  SHOW_SPECIALS_SPINNER,
  LOAD_SPECIALS_SUCCESS,
  LOAD_SPECIALS_FAIL,
  //EXPERIENCE
  SHOW_EXPERIENCIES_SPINNER,
  LOAD_EXPERIENCIES_SUCCESS,
  LOAD_EXPERIENCIES_FAIL,
  //SLIDER
  SHOW_SLIDER_SPINNER,
  LOAD_SLIDER_SUCCESS,
  LOAD_SLIDER_FAIL,
  //MSI_CATALOG
  SHOW_MSI_CATALOG_SPINNER,
  LOAD_MSI_CATALOG_SUCCESS,
  LOAD_MSI_CATALOG_FAIL,
  //CITI_MSI_TERMS
  SHOW_CITI_MSI_TERMS_SPINNER,
  LOAD_CITI_MSI_TERMS_SUCCESS,
  LOAD_CITI_MSI_TERMS_FAIL,
  //
  SHOW_EVENT_DETAILS_SPINNER,
  LOAD_EVENT_DETAILS_SUCCESS,
  LOAD_EVENT_DETAILS_FAIL,
  //
  LOAD_GET_EVENTS_INTEREST_SUCCESS,
  LOAD_GET_EVENTS_INTEREST_FAIL,
  //
  LOAD_GET_EVENTS_ATTENDANCE_SUCCESS,
  LOAD_GET_EVENTS_ATTENDANCE_FAIL,
  //
  LOAD_CURRENT_POSITION,
  //TOP_HITS
  SHOW_TOP_HITS_SPINNER,
  LOAD_TOP_HITS_SUCCESS,
  LOAD_TOP_HITS_FAIL,
  //VENUES
  SHOW_VENUES_SPINNER,
  LOAD_VENUES_SUCCESS,
  LOAD_VENUES_FAIL,
  //STATES
  SHOW_STATES_SPINNER,
  LOAD_STATES_SUCCESS,
  LOAD_STATES_FAIL,
  //BANNER
  CLEAR_MAIN_BANNER,
  LOAD_MAIN_BANNER_SUCCESS,
  LOAD_MAIN_BANNER_FAIL,
  //ACTIVE_ARTISTS
  SHOW_ACTIVE_ARTISTS_SPINNER,
  LOAD_ACTIVE_ARTISTS_SUCCESS,
  LOAD_ACTIVE_ARTISTS_FAIL,
  //ARTIST
  SHOW_ARTIST_SPINNER,
  LOAD_ARTIST_SUCCESS,
  LOAD_ARTIST_FAIL,
  //FAMILY EVENTS
  SHOW_FAMILY_EVENTS_SPINNER,
  LOAD_FAMILY_EVENTS_SUCCESS,
  LOAD_FAMILY_EVENTS_FAIL,
  //DIGITAL_EVENTS
  SHOW_DIGITAL_EVENTS_SPINNER,
  LOAD_DIGITAL_EVENTS_SUCCESS,
  LOAD_DIGITAL_EVENTS_FAIL,
  //
  SHOW_THEATER_EVENTS_SPINNER,
  LOAD_THEATER_EVENTS_SUCCESS,
  LOAD_THEATER_EVENTS_FAIL,
  //FIXED_CARDS
  SHOW_FIXED_CARDS_SPINNER,
  LOAD_FIXED_CARDS_SUCCESS,
  LOAD_FIXED_CARDS_FAIL,
  //DRIVEIN
  SHOW_DRIVEIN_EVENTS_SPINNER,
  LOAD_DRIVEIN_EVENTS_SUCCESS,
  LOAD_DRIVEIN_EVENTS_FAIL,
  //STREAMING
  SHOW_STREAMING_EVENTS_SPINNER,
  LOAD_STREAMING_EVENTS_SUCCESS,
  LOAD_STREAMING_EVENTS_FAIL,
  //PALCOS
  SHOW_PALCOS_EVENTS_SPINNER,
  LOAD_PALCOS_EVENTS_SUCCESS,
  LOAD_PALCOS_EVENTS_FAIL,
  //DRIVEIN_ALL_EVENTS
  SHOW_DRIVEIN_ALL_EVENTS_SPINNER,
  LOAD_DRIVEIN_ALL_EVENTS_SUCCESS,
  LOAD_DRIVEIN_ALL_EVENTS_FAIL,
  //FILTER_EVENTS
  SHOW_FILTER_EVENTS_SPINNER,
  LOAD_FILTER_EVENTS_SUCCESS,
  LOAD_FILTER_EVENTS_FAIL,
  //MANAGEABLE
  SHOW_MANAGEABLE_CONTENT_SPINNER,
  LOAD_MANAGEABLE_CONTENT_SUCCESS,
  LOAD_MANAGEABLE_CONTENT_FAIL,
  //VENUES
  SHOW_VENUES_EXPLORER_SPINNER,
  LOAD_VENUES_EXPLORER_SUCCESS,
  LOAD_VENUES_EXPLORER_FAIL,
} = Types;

const { ROUTES, STORAGE, BANKS, EVENT_CATEGORY, deals } = Constants;
const { loginHeader, isCurrentOrFutureDate, isWithinDateRange } = Functions;

const getParams = (position, state) => {
  if (state !== null) return { state };
  if (position !== null) return { l: position };
  return null;
};

const getParamsDeals = dealType => ({
  date: FirebaseService.getDateTimeZone(),
  dealType,
  bankId: BANKS.citibanamex,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const searchChanged = text => ({
  type: SEARCH_CHANGED,
  payload: text,
});

export const clearEventDetails = () => ({
  type: CLEAR_EVENT_DETAILS,
});

export const selectIndexCity = (indexCity, city) => ({
  type: SELECT_INDEX_CITY,
  payload: { indexCity, city },
});

export const clearSearchText = () => ({ type: CLEAR_SEARCH_TEXT });

export const clearUserSearch = () => ({ type: CLEAR_USER_SEARCH });

export const clearArtist = () => ({ type: CLEAR_ARTIST });

export const searchSubmit =
  (
    text = null,
    location = null,
    city = null,
    startDate = null,
    endDate = null,
  ) =>
  async dispatch => {
    dispatch({ type: SHOW_SEARCH_SUBMIT_SPINNER });

    (await SearchEngineApi())
      .get(ROUTES.search, {
        params: {
          q: text,
          l: location,
          state: city,
          sd: startDate,
          ed: endDate,
          nearest: location ? true : null,
        },
      })
      .then(response => {
        const { data } = response;

        data.searchResults = data;
        data.userSearch = { text, location, city, startDate, endDate };

        if (startDate && endDate && !(text || location || city)) {
          for (let i = 0; i < data.length; i++) {
            const closestDateIndex = getClosestIndexDate(
              data[i].dates,
              startDate,
            );
            data[i].closestDate = data[i].dates[closestDateIndex];
          }

          data.searchResults = orderBy(data, ['closestDate']);
        }

        dispatch({ type: LOAD_SEARCH_SUBMIT_SUCCESS, payload: data });
      })
      .catch(error =>
        dispatch({ type: LOAD_SEARCH_SUBMIT_FAIL, payload: error.response }),
      );
  };

export const loadGenres = () => async dispatch => {
  dispatch({ type: SHOW_GENRES_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.genres)
    .then(response =>
      dispatch({ type: LOAD_GENRES_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_GENRES_FAIL, payload: error.response }),
    );
};

export const loadGeneralEvents =
  (location = null, city = null) =>
  async dispatch => {
    if ((await UserCache.getToken()) === null) {
      dispatch({ type: SHOW_GENERAL_EVENTS_SPINNER });

      (await SearchEngineApi())
        .get(ROUTES.search, {
          params: {
            l: location,
            state: city,
            nearest: location ? true : null,
          },
        })
        .then(response =>
          dispatch({
            type: LOAD_GENERAL_EVENTS_SUCCESS,
            payload: response,
          }),
        )
        .catch(error =>
          dispatch({
            type: LOAD_GENERAL_EVENTS_FAIL,
            payload: error.response,
          }),
        );
    }
  };

export const searchGenre = genreId => async dispatch => {
  dispatch({ type: SHOW_SEARCH_GENRE_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.byGenre}${genreId}`)
    .then(response =>
      dispatch({ type: LOAD_SEARCH_GENRE_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({
        type: LOAD_SEARCH_GENRE_FAIL,
        payload: error.response,
      }),
    );
};

export const searchLocation = locationId => async dispatch => {
  dispatch({ type: SHOW_SEARCH_LOCATION_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.byVenue}${locationId}`)
    .then(response =>
      dispatch({ type: LOAD_SEARCH_LOCATION_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_SEARCH_LOCATION_FAIL, payload: error.response }),
    );
};

export const loadRecommendations =
  (position, state = null) =>
  async dispatch => {
    if (await UserCache.getToken()) {
      dispatch({ type: SHOW_RECOMMENDATIONS_SPINNER });

      (await SearchEngineApi())
        .get(ROUTES.recommendations, {
          params: getParams(position, state),
        })
        .then(response =>
          dispatch({ type: LOAD_RECOMMENDATIONS_SUCCESS, payload: response }),
        )
        .catch(error =>
          dispatch({
            type: LOAD_RECOMMENDATIONS_FAIL,
            payload: error.response,
          }),
        );
    }
  };

export const loadRecommendationsMosaic =
  (position, state = null) =>
  async dispatch => {
    dispatch({ type: SHOW_RECOMMENDATIONS_MOSAIC_SPINNER });

    (await SearchEngineApi())
      .get(ROUTES.recommendations, {
        params: getParams(position, state),
      })
      .then(response =>
        dispatch({
          type: LOAD_RECOMMENDATIONS_MOSAIC_SUCCESS,
          payload: response,
        }),
      )
      .catch(error =>
        dispatch({
          type: LOAD_RECOMMENDATIONS_MOSAIC_FAIL,
          payload: error.response,
        }),
      );
  };

export const loadTrendings =
  (position, state = null) =>
  async dispatch => {
    dispatch({ type: SHOW_TRENDINGS_SPINNER });

    (await SearchEngineApi())
      .get(ROUTES.trendings, {
        params: getParams(position, state),
      })
      .then(response =>
        dispatch({ type: LOAD_TRENDINGS_SUCCESS, payload: response }),
      )
      .catch(error =>
        dispatch({ type: LOAD_TRENDINGS_FAIL, payload: error.response }),
      );
  };

export const loadEventsPosition = position => async dispatch => {
  dispatch({ type: SHOW_EVENTS_POSITION_SPINNER });
  (await SearchEngineApi())
    .get(ROUTES.search, {
      params: { l: position, nearest: position ? true : null },
    })
    .then(response =>
      dispatch({ type: LOAD_EVENTS_POSITION_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_EVENTS_POSITION_FAIL, payload: error.response }),
    );
};

export const loadRecently = () => async dispatch => {
  dispatch({ type: SHOW_RECENTLY_SPINNER });
  (await SearchEngineApi())
    .get(ROUTES.recently, {
      // params: getParams(position, null),
    })
    .then(response =>
      dispatch({ type: LOAD_RECENTLY_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_RECENTLY_FAIL, payload: error.response }),
    );
};

export const loadPresalesCurrentUpcoming = () => async dispatch => {
  dispatch({ type: SHOW_PRESALES_MOSAIC_SPINNER });

  (await EventsServiceFastlyApi())
    .get(ROUTES.eventDealDates, {
      params: {
        banks: BANKS.citibanamex,
        type: deals.presale,
        includeFuture: true,
      },
    })
    .then(response => {
      const { data } = response;
      data.upcomingPresales = [];
      data.currentPresales = [];

      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].currentPresales = [];
          data[i].upcomingPresales = [];
          for (let j = 0; j < data[i].dates.length; j++) {
            data[i].dates[j].deals = filter(
              data[i].dates[j].deals,
              dealBank =>
                dealBank.deal.specialDealTypeId === deals.presale &&
                dealBank.deal.bankId === BANKS.citibanamex &&
                isCurrentOrFutureDate(dealBank.endDate, true),
            );
            if (
              data[i].dates[j].deals instanceof Array &&
              data[i].dates[j].deals.length > 0
            ) {
              for (let k = 0; k < data[i].dates[j].deals.length; k++) {
                const { startDate, endDate } = data[i].dates[j].deals[k];

                data[i].dates[j].name = data[i].name;
                data[i].dates[j].s_img_url = data[i].squaredImageUrl;
                data[i].dates[j].details_url = data[i].details_url;
                data[i].dates[j].venue = data[i].dates[j].venue
                  ? data[i].dates[j].venue.name
                  : null;
                data[i].dates[j].ticketMasterUrl =
                  data[i].ticketMasterUrl || null;
                data[i].dates[j].categoryId = data[i].categoryId;
                data[i].dates[j].categories = data[i].categories;

                if (isWithinDateRange(startDate, endDate, true))
                  data[i].currentPresales.push(data[i].dates[j]);
                else data[i].upcomingPresales.push(data[i].dates[j]);
              }
            }
          }
        }

        for (let i = 0; i < data.length; i++) {
          if (data[i].upcomingPresales.length > 0) {
            for (let j = 0; j < data[i].upcomingPresales.length; j++)
              data.upcomingPresales.push(data[i].upcomingPresales[j]);
          }

          if (data[i].currentPresales.length > 0) {
            for (let j = 0; j < data[i].currentPresales.length; j++)
              data.currentPresales.push(data[i].currentPresales[j]);
          }
        }

        data.upcomingPresales = orderBy(data.upcomingPresales, ['date']);
        data.currentPresales = orderBy(data.currentPresales, ['date']);
      }

      dispatch({ type: LOAD_PRESALES_MOSAIC_SUCCESS, payload: response });
    })
    .catch(error =>
      dispatch({ type: LOAD_PRESALES_MOSAIC_FAIL, payload: error.response }),
    );
};

export const loadTrendingsGenre = position => async dispatch => {
  dispatch({ type: SHOW_TRENDINGS_GENRE_SPINNER });

  (await SearchEngineApi())
    .get(ROUTES.trendings, {
      params: getParams(position),
    })
    .then(response =>
      dispatch({ type: LOAD_TRENDINGS_GENRE_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_TRENDINGS_GENRE_FAIL, payload: error.response }),
    );
};

export const loadPresales = () => async dispatch => {
  dispatch({ type: SHOW_PRESALES_SPINNER });

  (await SearchEngineApi())
    .get(ROUTES.presales)
    .then(response =>
      dispatch({ type: LOAD_PRESALES_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_PRESALES_FAIL, payload: error.response }),
    );
};

export const loadPresalesCitibanamex = () => async dispatch => {
  dispatch({ type: SHOW_PRESALES_CITIBANAMEX_SPINNER });

  (await EventsServiceFastlyApi())
    .get(
      `${ROUTES.eventDealDates}/?banks=${BANKS.citibanamex}&type=${deals.presale}`,
    )
    .then(response => {
      let { data } = response;
      data.currentPresales = [];

      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].currentPresales = [];

          for (let j = 0; j < data[i].dates.length; j++) {
            data[i].dates[j].deals = filter(
              data[i].dates[j].deals,
              dealBank =>
                dealBank.deal.specialDealTypeId === deals.presale &&
                dealBank.deal.bankId === BANKS.citibanamex &&
                isCurrentOrFutureDate(dealBank.endDate, true),
            );

            if (
              data[i].dates[j].deals instanceof Array &&
              data[i].dates[j].deals.length > 0
            ) {
              for (let k = 0; k < data[i].dates[j].deals.length; k++) {
                const { startDate, endDate } = data[i].dates[j].deals[k];

                data[i].dates[j].name = data[i].name;
                data[i].dates[j].s_img_url = data[i].squaredImageUrl;
                data[i].dates[j].details_url = data[i].details_url;
                data[i].dates[j].dates = [data[i].dates[j].date];
                data[i].dates[j].venue = data[i].dates[j].venue
                  ? data[i].dates[j].venue.name
                  : null;
                data[i].dates[j].ticketMasterUrl =
                  data[i].ticketMasterUrl || null;
                data[i].dates[j].categoryId = data[i].categoryId;
                data[i].dates[j].categories = data[i].categories;

                if (isWithinDateRange(startDate, endDate, true)) {
                  data[i].currentPresales.push(data[i].dates[j]);
                }
              }
            }
          }
        }

        for (let i = 0; i < data.length; i++) {
          if (data[i].currentPresales.length > 0) {
            for (let j = 0; j < data[i].currentPresales.length; j++)
              data.currentPresales.push(data[i].currentPresales[j]);
          }
        }

        data.currentPresales = orderBy(data.currentPresales, ['date']);
      }

      dispatch({
        type: LOAD_PRESALES_CITIBANAMEX_SUCCESS,
        payload: { data: data.currentPresales }, //data.currentPresales,
      });
    })
    .catch(error => {
      console.log('ERROR LOAD PRESALES CITIBANAMEX', error);

      dispatch({
        type: LOAD_PRESALES_CITIBANAMEX_FAIL,
        payload: error,
      });
    });
};

export const loadSpecials = () => async dispatch => {
  dispatch({ type: SHOW_SPECIALS_SPINNER });

  (await EventsServiceFastlyApi())
    .get(ROUTES._event, {
      params: getParamsDeals('citibanamex_special_deals'),
    })
    .then(response =>
      dispatch({ type: LOAD_SPECIALS_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_SPECIALS_FAIL, payload: error.response }),
    );
};

export const loadExperiences = () => async dispatch => {
  dispatch({ type: SHOW_EXPERIENCIES_SPINNER });

  (await EventsServiceFastlyApi())
    .get(ROUTES._event, {
      params: getParamsDeals('citibanamex_experiences'),
    })
    .then(response =>
      dispatch({ type: LOAD_EXPERIENCIES_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_EXPERIENCIES_FAIL, payload: error.response }),
    );
};

export const loadSlider = () => async dispatch => {
  dispatch({ type: SHOW_SLIDER_SPINNER });

  (await SearchEngineApi())
    .get(ROUTES.slider)
    .then(async response => {
      (await EventsServiceApi())
        .get(`AdevertisingBanners?filter={"where": {"isAppMX": true }}`)
        .then(independientes => {
          // response.push(independientes)
          let eventos = [];
          eventos = response;
          independientes.data.map(element => {
            eventos.data.push(element);
          });
          dispatch({ type: LOAD_SLIDER_SUCCESS, payload: eventos });
        });
    })
    .catch(error =>
      dispatch({ type: LOAD_SLIDER_FAIL, payload: error.response }),
    );
};

export const loadMSICatalog = () => async dispatch => {
  dispatch({ type: SHOW_MSI_CATALOG_SPINNER });
  (await EventsServiceFastlyApi())
    .get(ROUTES.MSICatalog)
    .then(({ data }) => {
      let orderMSICatalog;

      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].orderMSI = data[i].name
            ? Number(data[i].name.split(' ')[0])
            : 0;
        }

        orderMSICatalog = orderBy(data, ['orderMSI']);
      }

      dispatch({ type: LOAD_MSI_CATALOG_SUCCESS, payload: orderMSICatalog });
    })
    .catch(response =>
      dispatch({ type: LOAD_MSI_CATALOG_FAIL, payload: response }),
    );
};

export const loadCitiMSITerms = () => async dispatch => {
  dispatch({ type: SHOW_CITI_MSI_TERMS_SPINNER });
  (await EventsServiceFastlyApi())
    .get(ROUTES.citiMSITerms)
    .then(({ data }) => {
      let citiMSITerms;

      if (Array.isArray(data) && data.length > 0) citiMSITerms = data[0];

      dispatch({ type: LOAD_CITI_MSI_TERMS_SUCCESS, payload: citiMSITerms });
    })
    .catch(({ response }) =>
      dispatch({ type: LOAD_CITI_MSI_TERMS_FAIL, payload: response }),
    );
};
export const loadEventDetails = eventId => async dispatch => {
  dispatch({ type: SHOW_EVENT_DETAILS_SPINNER });

  return axios
    .get(eventId, await loginHeader())
    .then(async response => {
      dispatch({ type: LOAD_EVENT_DETAILS_SUCCESS, payload: response });
      if (await UserCache.getToken()) {
        (await ProfileApi())
          .get(ROUTES.interests)
          .then(responseInterests =>
            dispatch({
              type: LOAD_GET_EVENTS_INTEREST_SUCCESS,
              payload: responseInterests,
            }),
          )
          .catch(errorInterests =>
            dispatch({
              type: LOAD_GET_EVENTS_INTEREST_FAIL,
              payload: errorInterests.response,
            }),
          );

        (await ProfileApi())
          .get(ROUTES.attendance)
          .then(responseAttendance =>
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_SUCCESS,
              payload: responseAttendance,
            }),
          )
          .catch(errorAttendance =>
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_FAIL,
              payload: errorAttendance.response,
            }),
          );
      }

      return Promise.resolve(response.data);
    })
    .catch(error => {
      dispatch({ type: LOAD_EVENT_DETAILS_FAIL, payload: error.response });
      return Promise.reject(error.response);
    });
};

export const loadCurrentPosition = position => ({
  type: LOAD_CURRENT_POSITION,
  payload: position,
});

export const loadTopHits = () => async dispatch => {
  dispatch({ type: SHOW_TOP_HITS_SPINNER });

  (await SearchEngineApi())
    .get(ROUTES.topHits)
    .then(response =>
      dispatch({ type: LOAD_TOP_HITS_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_TOP_HITS_FAIL, payload: error.response }),
    );
};

export const loadVenues = () => async dispatch => {
  dispatch({ type: SHOW_VENUES_SPINNER });

  (await SearchEngineApi())
    .get(
      ROUTES.venues,
      // {
      // params: getParams(null, null),
      // }
    )
    .then(response => {
      dispatch({ type: LOAD_VENUES_SUCCESS, payload: response });
    })
    .catch(error => {
      console.log('ERROR LOAD VENUES', error);
      dispatch({ type: LOAD_VENUES_FAIL, payload: error });
    });
};

export const loadMainBanner = () => async dispatch => {
  dispatch({ type: CLEAR_MAIN_BANNER });

  (await EventsServiceApi())
    .get(ROUTES.configProperties)
    .then(response =>
      dispatch({ type: LOAD_MAIN_BANNER_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_MAIN_BANNER_FAIL, payload: error.response }),
    );
};

export const loadActiveArtists = () => async dispatch => {
  dispatch({ type: SHOW_ACTIVE_ARTISTS_SPINNER });

  (await EventsServiceFastlyApi())
    .get(ROUTES.activeArtist)
    .then(response => {
      dispatch({ type: LOAD_ACTIVE_ARTISTS_SUCCESS, payload: response });
    })
    .catch(error =>
      dispatch({ type: LOAD_ACTIVE_ARTISTS_FAIL, payload: error.response }),
    );
};
export const loadArtist = id => async dispatch => {
  dispatch({ type: SHOW_ARTIST_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.byArtist}${id}`)
    .then(response => {
      dispatch({ type: LOAD_ARTIST_SUCCESS, payload: response });
      return Promise.resolve(response.data);
    })
    .catch(error => {
      dispatch({ type: LOAD_ARTIST_FAIL, payload: error.response });
      return Promise.reject(error.response);
    });
};

export const loadFamilyEvents =
  (position, state = null) =>
  async dispatch => {
    dispatch({ type: SHOW_FAMILY_EVENTS_SPINNER });

    (await SearchEngineApi())
      .get(`${ROUTES.byCategory}${ROUTES.family}`, {
        params: getParams(position, state),
      })
      .then(response => {
        dispatch({ type: LOAD_FAMILY_EVENTS_SUCCESS, payload: response });
      })
      .catch(error => {
        console.log('ERROR LOAD FAMILY EVENTS', error);
        dispatch({ type: LOAD_FAMILY_EVENTS_FAIL, payload: error.response });
      });
  };

export const loadDigitalEvents =
  (position, state = null) =>
  async dispatch => {
    dispatch({ type: SHOW_DIGITAL_EVENTS_SPINNER });

    (await EventsServiceApi())
      .get(`dEvent/eventDigital`)
      .then(response => {
        const { data } = response;

        const newData = data.map(item => ({
          ...item,
          long_img_url: item.horizontalImageUrl,
          s_img_url: item.squaredImageUrl,
          dates: item.dates.map(dates => dates.date),
          venue: item.dates[0].venueName,
          stateRef: item.dates[0].stateRef,
        }));

        dispatch({
          type: LOAD_DIGITAL_EVENTS_SUCCESS,
          payload: { data: newData },
        });
      })
      .catch(error => {
        console.log('ERROR LOAD DIGITAL EVENTS:', error);

        dispatch({
          type: LOAD_DIGITAL_EVENTS_FAIL,
          payload: error,
        });
      });
  };

export const loadTheaterEvents =
  (position = null, state = null) =>
  async dispatch => {
    dispatch({ type: SHOW_THEATER_EVENTS_SPINNER });

    (await SearchEngineApi())
      .get(`${ROUTES.byCategory}${EVENT_CATEGORY.theater}`, {
        params: getParams(position, state),
      })
      .then(response => {
        dispatch({ type: LOAD_THEATER_EVENTS_SUCCESS, payload: response });
      })
      .catch(error => {
        console.log('LOAD THEATER EVENTS', error);
        dispatch({ type: LOAD_THEATER_EVENTS_FAIL, payload: error });
      });
  };

export const loadFixedCards = () => async dispatch => {
  dispatch({ type: SHOW_FIXED_CARDS_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.fixedCards)
    .then(response =>
      dispatch({ type: LOAD_FIXED_CARDS_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_FIXED_CARDS_FAIL, payload: error.response }),
    );
};

export const loadDriveInEvents = () => async dispatch => {
  dispatch({ type: SHOW_DRIVEIN_EVENTS_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.conecta_en_vivo}/autoconciertos`)
    .then(response =>
      dispatch({ type: LOAD_DRIVEIN_EVENTS_SUCCESS, payload: response }),
    )
    .catch(error => {
      console.log('ERROR LOAD DRIVE IN EVENTS', error);
      dispatch({ type: LOAD_DRIVEIN_EVENTS_FAIL, payload: error });
    });
};

export const loadStreamingEvents = () => async dispatch => {
  dispatch({ type: SHOW_STREAMING_EVENTS_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.conecta_en_vivo}/streamings`)
    .then(response =>
      dispatch({ type: LOAD_STREAMING_EVENTS_SUCCESS, payload: response }),
    )
    .catch(error => {
      console.log('ERROR LOAD STREAMING EVENTS', error);
      dispatch({ type: LOAD_STREAMING_EVENTS_FAIL, payload: error });
    });
};

export const loadPalcosEvents = () => async dispatch => {
  dispatch({ type: SHOW_PALCOS_EVENTS_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.conecta_en_vivo}/palcos`)
    .then(response =>
      dispatch({ type: LOAD_PALCOS_EVENTS_SUCCESS, payload: response }),
    )
    .catch(error => {
      console.log('ERROR LOAD PALCOS EVENTS', error);
      dispatch({ type: LOAD_PALCOS_EVENTS_FAIL, payload: error });
    });
};

export const loadDriveInAllEvents = () => async dispatch => {
  dispatch({ type: SHOW_DRIVEIN_ALL_EVENTS_SPINNER });

  (await SearchEngineApi())
    .get(`${ROUTES.conecta_en_vivo}/all`)
    .then(response =>
      dispatch({ type: LOAD_DRIVEIN_ALL_EVENTS_SUCCESS, payload: response }),
    )
    .catch(error => {
      console.log('ERROR LOAD DRIVE IN ALL EVENTS', error);
      dispatch({ type: LOAD_DRIVEIN_ALL_EVENTS_FAIL, payload: error });
    });
};

export const loadFilterEvents = data => async dispatch => {
  dispatch({ type: SHOW_FILTER_EVENTS_SPINNER });

  (await SearchEngineApi())
    .post(ROUTES.filter, data)
    .then(response => {
      dispatch({ type: LOAD_FILTER_EVENTS_SUCCESS, payload: response });
    })
    .catch(error =>
      dispatch({ type: LOAD_FILTER_EVENTS_FAIL, payload: error.response }),
    );
};

export const loadManageableContent = () => async dispatch => {
  dispatch({ type: SHOW_MANAGEABLE_CONTENT_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.manageable_content)
    .then(response =>
      dispatch({ type: LOAD_MANAGEABLE_CONTENT_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_MANAGEABLE_CONTENT_FAIL, payload: error.response }),
    );
};

export const loadVenuesExplorer = () => async dispatch => {
  dispatch({ type: SHOW_VENUES_EXPLORER_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.venues)
    .then(response =>
      dispatch({ type: LOAD_VENUES_EXPLORER_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_VENUES_EXPLORER_FAIL, payload: error.response }),
    );
};
