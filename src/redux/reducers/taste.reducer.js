import { Types } from '../../utils';

const {
  SELECT_TASTE,
  CLEAR_MESSAGES_TASTES,
  CLEAR_PROFILE_GENRES,
  //Spotify
  SHOW_TASTES_SPOTIFY_SPINNER,
  LOAD_SEND_SPOTIFY_PROFILE_SUCCESS,
  LOAD_SEND_SPOTIFY_PROFILE_FAIL,
  //SEND PROFILE
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

const initialState = {
  //GLOBAL
  select_taste: false,
  clear_messages_tastes: false,
  clear_profile_taste: false,
  //SPOTIFY
  show_tastes_spotify_spinner: false,
  load_send_spotify_profile_success: {},
  load_send_spotify_profile_fail: { error: false },
  //SEND PROFILE
  show_taste_select_spinner: false,
  load_send_tastes_success: {},
  load_send_tastes_fail: { error: false },
  //PROFILE GENRES
  show_load_profile_genres_spinner: false,
  load_profile_genres_success: {},
  load_profile_genres_fail: { error: false },
  //CARDS
  show_load_profile_cards_spinner: false,
  load_profile_cards_success: {},
  load_profile_cards_fail: false,
  //SAVE CARDS
  show_save_cards_spinner: false,
  load_save_cards_success: {},
  load_save_cards_fail: { error: false },
  //LOAD PROFILE
  show_load_profile_spinner: false,
  load_profile_success: {},
  load_profile_fail: { error: false },
  //SAVE SHARE DATA
  show_save_share_data_spinner: false,
  load_save_share_data_success: {},
  load_save_share_data_fail: { error: false },
  //MUSIC GENRE
  show_music_genre_profiler_spinner: false,
  load_music_genre_profiler_success: [],
  load_music_genre_profiler_fail: { error: false },
  //
  show_save_music_genre_profiler_spinner: false,
  load_save_music_genre_profiler_success: {},
  load_save_music_genre_profiler_fail: { error: false },
  //SAVE EVENT
  show_save_event_profiler_spinner: false,
  load_save_event_profiler_success: {},
  load_save_event_profiler_fail: { error: false },
  //
  show_event_profiler_spinner: false,
  load_event_profiler_success: [],
  load_event_profiler_fail: { error: false },
  // Artists genders
  show_artists_genders_spinner: false,
  load_artists_genders_success: [],
  load_artists_genders_fail: { error: false },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_TASTE: {
      return {
        ...state,
        select_taste: true,
      };
    }
    case CLEAR_MESSAGES_TASTES: {
      return { ...state, ...initialState };
    }
    case CLEAR_PROFILE_GENRES: {
      return {
        ...state,
        show_load_profile_genres_spinner: false,
        load_profile_genres_success: {},
        load_profile_genres_fail: { error: false },
      };
    }
    case SHOW_TASTES_SPOTIFY_SPINNER: {
      return {
        ...state,
        show_tastes_spotify_spinner: true,
        load_send_spotify_profile_success: {},
        load_send_spotify_profile_fail: { error: true },
      };
    }
    case LOAD_SEND_SPOTIFY_PROFILE_SUCCESS: {
      return {
        ...state,
        show_tastes_spotify_spinner: false,
        load_send_spotify_profile_success: payload.data,
        load_send_spotify_profile_fail: { error: false },
      };
    }
    case LOAD_SEND_SPOTIFY_PROFILE_FAIL: {
      return {
        ...state,
        show_tastes_spotify_spinner: false,
        load_send_spotify_profile_success: {},
        load_send_spotify_profile_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_TASTES_SELECT_SPINNER: {
      return {
        ...state,
        show_taste_select_spinner: true,
        load_send_tastes_success: {},
        load_send_tastes_fail: { error: false },
      };
    }
    case LOAD_SEND_TASTES_SUCESS: {
      return {
        ...state,
        show_taste_select_spinner: false,
        load_send_tastes_success: payload.data,
        load_send_tastes_fail: { error: false },
      };
    }
    case LOAD_SEND_TASTES_FAIL: {
      return {
        ...state,
        show_taste_select_spinner: false,
        load_send_tastes_success: {},
        load_send_tastes_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_LOAD_PROFILE_GENRES_SPINNER: {
      return {
        ...state,
        show_load_profile_genres_spinner: true,
        load_profile_genres_success: {},
        load_profile_genres_fail: { error: false },
      };
    }
    case LOAD_PROFILE_GENRES_SUCCESS: {
      return {
        ...state,
        show_load_profile_genres_spinner: false,
        load_profile_genres_success: payload.data,
        load_profile_genres_fail: { error: false },
      };
    }
    case LOAD_PROFILE_GENRES_FAIL: {
      return {
        ...state,
        show_load_profile_genres_spinner: false,
        load_profile_genres_success: {},
        load_profile_genres_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_LOAD_PROFILE_CARDS_SPINNER: {
      return {
        ...state,
        show_load_profile_cards_spinner: true,
        load_profile_cards_success: {},
        load_profile_cards_fail: { error: false },
      };
    }
    case LOAD_PROFILE_CARDS_SUCCESS: {
      return {
        ...state,
        show_load_profile_cards_spinner: false,
        load_profile_cards_success: payload.data,
        load_profile_cards_fail: { error: false },
      };
    }
    case LOAD_PROFILE_CARDS_FAIL: {
      return {
        ...state,
        show_load_profile_cards_spinner: false,
        load_profile_cards_success: {},
        load_profile_cards_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SAVE_CARDS_SPINNER: {
      return {
        ...state,
        show_save_cards_spinner: true,
        load_save_cards_success: {},
        load_save_cards_fail: { error: false },
      };
    }
    case LOAD_SAVE_CARDS_SUCESS: {
      return {
        ...state,
        show_save_cards_spinner: false,
        load_save_cards_success: payload.data,
        load_save_cards_fail: { error: false },
      };
    }
    case LOAD_SAVE_CARDS_FAIL: {
      return {
        ...state,
        show_save_cards_spinner: false,
        load_save_cards_success: {},
        load_save_cards_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_LOAD_PROFILE_SPINNER: {
      return {
        ...state,
        show_load_profile_spinner: true,
        load_profile_success: {},
        load_profile_fail: { error: false },
      };
    }
    case LOAD_PROFILE_SUCCESS: {
      return {
        ...state,
        show_load_profile_spinner: false,
        load_profile_success: payload.data,
        load_profile_fail: { error: false },
      };
    }
    case LOAD_PROFILE_FAIL: {
      return {
        ...state,
        show_load_profile_spinner: false,
        load_profile_success: {},
        load_profile_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SAVE_SHARE_DATA_SPINNER: {
      return {
        ...state,
        show_save_share_data_spinner: true,
        load_save_share_data_success: {},
        load_save_share_data_fail: { error: false },
      };
    }
    case LOAD_SAVE_SHARE_DATA_SUCCESS: {
      return {
        ...state,
        show_save_share_data_spinner: false,
        load_save_share_data_success: payload.data,
        load_save_share_data_fail: { error: false },
      };
    }
    case LOAD_SAVE_SHARE_DATA_FAIL: {
      return {
        ...state,
        show_save_share_data_spinner: false,
        load_save_share_data_success: {},
        load_save_share_data_fail: { error: false, data: payload.data },
      };
    }
    case SHOW_ARTISTS_GENDERS_SPINNER: {
      return {
        ...state,
        show_artists_genders_spinner: true,
        load_artists_genders_success: [],
        load_artists_genders_fail: { error: false },
      };
    }
    case LOAD_ARTISTS_GENDERS_SUCCESS: {
      return {
        ...state,
        show_artists_genders_spinner: false,
        load_artists_genders_success: payload.data,
        load_artists_genders_fail: { error: false },
      };
    }
    case LOAD_ARTISTS_GENDERS_FAIL: {
      return {
        ...state,
        show_artists_genders_spinner: false,
        load_artists_genders_success: [],
        load_artists_genders_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_MUSIC_GENRE_PROFILER_SPINNER: {
      return {
        ...state,
        show_music_genre_profiler_spinner: true,
        load_music_genre_profiler_success: [],
        load_music_genre_profiler_fail: { error: false },
      };
    }
    case LOAD_MUSIC_GENRE_PROFILER_SUCCESS: {
      return {
        ...state,
        show_music_genre_profiler_spinner: false,
        load_music_genre_profiler_success: payload.data,
        load_music_genre_profiler_fail: { error: false },
      };
    }
    case LOAD_MUSIC_GENRE_PROFILER_FAIL: {
      return {
        ...state,
        show_music_genre_profiler_spinner: false,
        load_music_genre_profiler_success: [],
        load_music_genre_profiler_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SAVE_MUSIC_GENRE_PROFILER_SPINNER: {
      return {
        ...state,
        show_save_music_genre_profiler_spinner: true,
        load_save_music_genre_profiler_success: {},
        load_save_music_genre_profiler_fail: { error: false },
      };
    }
    case LOAD_SAVE_MUSIC_GENRE_PROFILER_SUCCESS: {
      return {
        ...state,
        show_save_music_genre_profiler_spinner: false,
        load_save_music_genre_profiler_success: payload.data,
        load_save_music_genre_profiler_fail: { error: false },
      };
    }
    case LOAD_SAVE_MUSIC_GENRE_PROFILER_FAIL: {
      return {
        ...state,
        show_save_music_genre_profiler_spinner: false,
        load_save_music_genre_profiler_success: {},
        load_save_music_genre_profiler_fail: {
          error: true,
          data: payload.data,
        },
      };
    }
    case SHOW_EVENT_PROFILER_SPINNER: {
      return {
        ...state,
        show_event_profiler_spinner: true,
        load_event_profiler_success: [],
        load_event_profiler_fail: { error: false },
      };
    }
    case LOAD_EVENT_PROFILER_SUCCESS: {
      return {
        ...state,
        show_event_profiler_spinner: false,
        load_event_profiler_success: payload.data,
        load_event_profiler_fail: { error: false },
      };
    }
    case LOAD_EVENT_PROFILER_FAIL: {
      return {
        ...state,
        show_event_profiler_spinner: false,
        load_event_profiler_success: [],
        load_event_profiler_fail: {
          error: true,
          data: payload.data,
        },
      };
    }
    case SHOW_SAVE_EVENT_PROFILER_SPINNER: {
      return {
        ...state,
        show_save_event_profiler_spinner: true,
        load_save_event_profiler_success: {},
        load_save_event_profiler_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_PROFILER_SUCCESS: {
      return {
        ...state,
        show_save_event_profiler_spinner: false,
        load_save_event_profiler_success: payload.data,
        load_save_event_profiler_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_PROFILER_FAIL: {
      return {
        ...state,
        show_save_event_profiler_spinner: false,
        load_save_event_profiler_success: {},
        load_save_event_profiler_fail: { error: true, data: payload.data },
      };
    }
    default: {
      return state;
    }
  }
};
