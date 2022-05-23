import {
  Types,
  UserCache,
  Constants,
  Functions,
  PlatformCache,
} from '../../utils';
import _ from 'lodash';
import * as FirebaseService from '../../firebase';
import {
  ProfileApi,
  SearchEngineApi,
  EventsServiceApi,
} from '../../services/Enpoinst';

const {
  //GLOBAL
  SELECT_TASTE,
  CLEAR_MESSAGES_TASTES,
  CLEAR_PROFILE_GENRES,
  //SPOTIFY
  SHOW_TASTES_SPOTIFY_SPINNER,
  LOAD_SEND_SPOTIFY_PROFILE_SUCCESS,
  LOAD_SEND_SPOTIFY_PROFILE_FAIL,
  //SEND DIRECT PROFILE
  SHOW_TASTES_SELECT_SPINNER,
  LOAD_SEND_TASTES_SUCESS,
  LOAD_SEND_TASTES_FAIL,
  //PROFILE GENRES
  SHOW_LOAD_PROFILE_GENRES_SPINNER,
  LOAD_PROFILE_GENRES_SUCCESS,
  LOAD_PROFILE_GENRES_FAIL,
  //CARDS
  SHOW_LOAD_PROFILE_CARDS_SPINNER,
  LOAD_PROFILE_CARDS_SUCCESS,
  LOAD_PROFILE_CARDS_FAIL,
  //SAVE CARDS
  SHOW_SAVE_CARDS_SPINNER,
  LOAD_SAVE_CARDS_SUCESS,
  LOAD_SAVE_CARDS_FAIL,
  //LOAD PROFILE
  SHOW_LOAD_PROFILE_SPINNER,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  //SAVE SHARE DATA
  SHOW_SAVE_SHARE_DATA_SPINNER,
  LOAD_SAVE_SHARE_DATA_SUCCESS,
  LOAD_SAVE_SHARE_DATA_FAIL,
  //LOAD ARTIST
  SHOW_ARTISTS_GENDERS_SPINNER,
  LOAD_ARTISTS_GENDERS_SUCCESS,
  LOAD_ARTISTS_GENDERS_FAIL,
  //MUSIC GENRE
  SHOW_MUSIC_GENRE_PROFILER_SPINNER,
  LOAD_MUSIC_GENRE_PROFILER_SUCCESS,
  LOAD_MUSIC_GENRE_PROFILER_FAIL,
  //SAVE MUSIV GENRE
  SHOW_SAVE_MUSIC_GENRE_PROFILER_SPINNER,
  LOAD_SAVE_MUSIC_GENRE_PROFILER_SUCCESS,
  LOAD_SAVE_MUSIC_GENRE_PROFILER_FAIL,
  //EVENT PROFILER
  SHOW_EVENT_PROFILER_SPINNER,
  LOAD_EVENT_PROFILER_SUCCESS,
  LOAD_EVENT_PROFILER_FAIL,
  //SAVE EVENT PROFILER
  SHOW_SAVE_EVENT_PROFILER_SPINNER,
  LOAD_SAVE_EVENT_PROFILER_SUCCESS,
  LOAD_SAVE_EVENT_PROFILER_FAIL,
} = Types;
const { ROUTES } = Constants;

export const selectTaste = tastes => ({
  type: SELECT_TASTE,
  payload: tastes,
});

export const clearMessagesTastes = () => ({
  type: CLEAR_MESSAGES_TASTES,
});

export const clearProfilesGenres = () => ({
  type: CLEAR_PROFILE_GENRES,
});

export const sendSpotifyProfile = (code, redirect_uri) => async dispatch => {
  dispatch({ type: SHOW_TASTES_SPOTIFY_SPINNER });

  (await ProfileApi())
    .post(ROUTES.spotify, { code, redirect_uri })
    .then(response => {
      dispatch({ type: LOAD_SEND_SPOTIFY_PROFILE_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({
        type: LOAD_SEND_SPOTIFY_PROFILE_FAIL,
        payload: error.response,
      });
    });
};

export const sendDirectProfile = tastes => async dispatch => {
  dispatch({ type: SHOW_TASTES_SELECT_SPINNER });

  (await ProfileApi())
    .post(`${ROUTES.profile}${ROUTES.direct}`, tastes)
    .then(response => {
      dispatch({ type: LOAD_SEND_TASTES_SUCESS, payload: response });
    })
    .catch(error => {
      dispatch({ type: LOAD_SEND_TASTES_FAIL, payload: error.response });
    });
};

export const loadProfileGenres = () => async dispatch => {
  dispatch({ type: SHOW_LOAD_PROFILE_GENRES_SPINNER });

  (await ProfileApi())
    .get(ROUTES.profile)
    .then(async response => {
      (await EventsServiceApi())
        .get(ROUTES.genres)
        .then(responseGenres => {
          response.data.genres = responseGenres.data;
          dispatch({ type: LOAD_PROFILE_GENRES_SUCCESS, payload: response });

          return Promise.resolve(response.data);
        })
        .catch(errorGenres => {
          console.log('GENRES 400: ', errorGenres);
          dispatch({
            type: LOAD_PROFILE_GENRES_FAIL,
            payload: errorGenres.response,
          });

          return Promise.reject(errorGenres.response);
        });
    })
    .catch(error => {
      dispatch({ type: LOAD_PROFILE_GENRES_FAIL, payload: error.response });
      return Promise.reject(error.response);
    });
};

export const loadProfileCards = () => async dispatch => {
  dispatch({ type: SHOW_LOAD_PROFILE_CARDS_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.cards)
    .then(async response => {
      (await ProfileApi())
        .get(ROUTES.cards)
        .then(responseUserCards => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (responseUserCards.data.length > 0) {
                for (let j = 0; j < responseUserCards.data.length; j++) {
                  if (
                    response.data[i].id === responseUserCards.data[j].cardId
                  ) {
                    response.data[i].saved = true;
                    break;
                  } else response.data[i].saved = false;
                }
              } else {
                response.data[i].saved = false;
                response.data[0].emptyUserdCards = true;
              }
            }

            const partitionGoldCard = partition(response.data, {
              id: 'oro_citibanamex',
            });
            response.data = [...partitionGoldCard[0], ...partitionGoldCard[1]];
          }

          dispatch({ type: LOAD_PROFILE_CARDS_SUCCESS, payload: response });
        })
        .catch(errorUserCards =>
          dispatch({
            type: LOAD_PROFILE_CARDS_FAIL,
            payload: errorUserCards.response,
          }),
        );
    })
    .catch(error =>
      dispatch({ type: LOAD_PROFILE_CARDS_FAIL, payload: error.response }),
    );
};

export const saveCards = cards => async dispatch => {
  dispatch({ type: SHOW_SAVE_CARDS_SPINNER });

  (await ProfileApi())
    .post(ROUTES.cards, cards)
    .then(response => {
      dispatch({ type: LOAD_SAVE_CARDS_SUCESS, payload: response });
    })
    .catch(error => {
      dispatch({ type: LOAD_SAVE_CARDS_FAIL, payload: error.response });
    });
};

export const loadProfile = () => async dispatch => {
  dispatch({ type: SHOW_LOAD_PROFILE_SPINNER });

  if (await UserCache.getToken()) {
    (await ProfileApi())
      .get(ROUTES.profile)
      .then(response => {
        dispatch({ type: LOAD_PROFILE_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: LOAD_PROFILE_FAIL, payload: error.response });
      });
  }
};

export const saveShareData = share => async dispatch => {
  dispatch({ type: SHOW_SAVE_SHARE_DATA_SPINNER });

  (await ProfileApi())
    .patch(ROUTES.profile, { share })
    .then(async response => {
      dispatch({ type: LOAD_SAVE_SHARE_DATA_SUCCESS, payload: response });

      (await ProfileApi())
        .get(ROUTES.profile)
        .then(responseShare => {
          dispatch({ type: LOAD_PROFILE_SUCCESS, payload: responseShare });
        })
        .catch(errorShare => {
          dispatch({ type: LOAD_PROFILE_FAIL, payload: errorShare.response });
        });
    })
    .catch(error => {
      dispatch({ type: LOAD_SAVE_SHARE_DATA_FAIL, payload: error.response });
    });
};

export const loadArtistsWithGenders = () => async dispatch => {
  dispatch({ type: SHOW_ARTISTS_GENDERS_SPINNER });

  (await EventsServiceApi())
    .get(ROUTES.getArtists)
    .then(response =>
      dispatch({ type: LOAD_ARTISTS_GENDERS_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_ARTISTS_GENDERS_FAIL, payload: error.response }),
    );
};

export const loadMusicGenreProfiler = () => async dispatch => {
  if ((await UserCache.getToken()) !== null) {
    dispatch({ type: SHOW_MUSIC_GENRE_PROFILER_SPINNER });

    (await ProfileApi())
      .get(ROUTES.musicGenreProfiler)
      .then(async response => {
        (await EventsServiceApi())
          .get(ROUTES.genres)
          .then(async responseGenres => {
            let genres = [];
            response.data.data.forEach(item => {
              const filter = responseGenres.data.filter(
                item2 => item.genre === item2.name,
              );
              genres.push({ ...item, refId: filter[0].refId });
            });

            const resp = await Promise.all(
              genres.map(async item => {
                const result = await (
                  await SearchEngineApi()
                ).get(`${ROUTES.byGenre}${item.refId}`);

                return {
                  ...item,
                  data: result.data,
                };
              }),
            );

            dispatch({
              type: LOAD_MUSIC_GENRE_PROFILER_SUCCESS,
              payload: { data: resp },
            });
          })
          .catch(error => {
            console.log(
              'ERROR LOAD MUSIC GENRE - EVENTS_SERVICE_API',
              error.response.data,
            );

            dispatch({
              type: LOAD_MUSIC_GENRE_PROFILER_FAIL,
              payload: error.response,
            });
          });
      })
      .catch(error => {
        console.log('ERROR LOAD MUSIC GENRE - PROFILE_API', error);

        dispatch({
          type: LOAD_MUSIC_GENRE_PROFILER_FAIL,
          payload: error.response,
        });
      });
  }
};

export const saveMusicGenreProfiler =
  music_genre_profiler => async dispatch => {
    dispatch({ type: SHOW_SAVE_MUSIC_GENRE_PROFILER_SPINNER });

    (await ProfileApi())
      .post(ROUTES.musicGenreProfiler, music_genre_profiler)
      .then(response =>
        dispatch({
          type: LOAD_SAVE_MUSIC_GENRE_PROFILER_SUCCESS,
          payload: response,
        }),
      )
      .catch(error =>
        dispatch({
          type: LOAD_SAVE_MUSIC_GENRE_PROFILER_FAIL,
          payload: error.response,
        }),
      );
  };

export const loadEventProfiler = () => async dispatch => {
  if ((await UserCache.getToken()) !== null) {
    dispatch({ type: SHOW_EVENT_PROFILER_SPINNER });

    (await ProfileApi())
      .get(ROUTES.eventProfiler)
      .then(async response => {
        let eventsFilter_Artist = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'artist'),
        )) {
          if (key !== 'null') {
            eventsFilter_Artist.push(key);
          }
        }

        let eventsFilter_Venue = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'venue'),
        )) {
          if (key !== 'null') {
            eventsFilter_Venue.push(key);
          }
        }

        let eventsFilter_Genre = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'genre'),
        )) {
          if (key !== 'null') {
            eventsFilter_Genre.push(key);
          }
        }

        let eventsFilter_BannerName = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'banner_name'),
        )) {
          if (key !== 'null') {
            eventsFilter_BannerName.push(key);
          }
        }

        let eventsFilter_EventName = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'event_name'),
        )) {
          if (key !== 'null') {
            eventsFilter_EventName.push(key);
          }
        }

        let eventsFilter_Search = [];
        for (let [key] of Object.entries(
          _.groupBy(response.data.data, 'search'),
        )) {
          if (key !== 'null') {
            eventsFilter_Search.push(key);
          }
        }

        let data = new Set([
          ...eventsFilter_Artist,
          ...eventsFilter_Venue,
          ...eventsFilter_Genre,
          ...eventsFilter_BannerName,
          ...eventsFilter_EventName,
          ...eventsFilter_Search,
        ]);
        data = [...data];

        const resp = await Promise.all(
          data.map(async (item, index) => {
            if (index < 3) {
              const result = await (
                await SearchEngineApi()
              ).get(`${ROUTES.search}?q=${item}`);

              return result.data;
            }

            return [];
          }),
        );

        let dataMerge = [];
        resp.forEach(item => {
          item.forEach(item2 => {
            dataMerge.push(item2);
          });
        });

        let events = dataMerge.map(item => {
          return [JSON.stringify(item), item];
        });
        events = new Map(events);
        events = [...events.values()];

        const dataFilter = _.orderBy(events, ['dates'], ['asc']);

        dispatch({
          type: LOAD_EVENT_PROFILER_SUCCESS,
          payload: { data: dataFilter },
        });
      })
      .catch(error => {
        console.log('ERROR LOAD EVENT PROFILER', error);

        dispatch({
          type: LOAD_EVENT_PROFILER_FAIL,
          payload: error,
        });
      });
  }
};

export const saveEventProfiler = event_profiler => async dispatch => {
  dispatch({ type: SHOW_SAVE_EVENT_PROFILER_SPINNER });

  (await ProfileApi())
    .post(ROUTES.eventProfiler, event_profiler)
    .then(response => {
      dispatch({ type: LOAD_SAVE_EVENT_PROFILER_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({
        type: LOAD_SAVE_EVENT_PROFILER_FAIL,
        payload: error.response,
      });
    });
};
