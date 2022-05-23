import { Types, Constants } from '../../utils';

const {
  CLEAR_SEARCH,
  SEARCH_CHANGED,
  CLEAR_EVENT_DETAILS,
  SELECT_INDEX_CITY,
  CLEAR_SEARCH_TEXT,
  CLEAR_USER_SEARCH,
  CLEAR_ARTIST,
  //Gebres
  SHOW_GENRES_SPINNER,
  LOAD_GENRES_SUCCESS,
  LOAD_GENRES_FAIL,
  //GENRES EVENTE
  SHOW_GENERAL_EVENTS_SPINNER,
  LOAD_GENERAL_EVENTS_SUCCESS,
  LOAD_GENERAL_EVENTS_FAIL,
  //SEACH GENRE
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
  //PRESEALES
  SHOW_PRESALES_SPINNER,
  LOAD_PRESALES_SUCCESS,
  LOAD_PRESALES_FAIL,
  // SEARCH SUBMIT
  SHOW_SEARCH_SUBMIT_SPINNER,
  LOAD_SEARCH_SUBMIT_SUCCESS,
  LOAD_SEARCH_SUBMIT_FAIL,
  //TRENDINGS GENRE
  SHOW_TRENDINGS_GENRE_SPINNER,
  LOAD_TRENDINGS_GENRE_SUCCESS,
  LOAD_TRENDINGS_GENRE_FAIL,
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
  //_EVENT_DETAILS
  SHOW_EVENT_DETAILS_SPINNER,
  LOAD_EVENT_DETAILS_SUCCESS,
  LOAD_EVENT_DETAILS_FAIL,
  //GET_EVENTS_INTEREST
  LOAD_GET_EVENTS_INTEREST_SUCCESS,
  LOAD_GET_EVENTS_INTEREST_FAIL,
  //GET_EVENTS_ATTENDANCE
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

const initialState = {
  //GLOBALS
  clear_search: false,
  clear_search_text: false,
  clear_event_details: false,
  clear_user_search: false,
  clear_artist: false,
  select_index_city: false,
  searche_changed: false,
  //search submit
  show_search_submit_spinner: false,
  load_search_submit_success: {},
  load_search_submit_fail: { error: false },
  //GENRES
  show_genres_spinner: false,
  load_genres_success: [],
  load_genres_fail: { error: false },
  //GENRES EVENTE
  show_general_events_spinner: false,
  load_general_events_success: [],
  load_general_events_fail: { error: false },
  //GENRE SEARCH
  show_search_genre_spinner: false,
  load_search_genre_success: {},
  load_search_genre_fail: { error: false },
  //LOACTION
  show_search_location_spinner: false,
  load_search_location_success: [],
  load_search_location_fail: { error: false },
  //RECOMMENDA
  show_spinner_recommendations: false,
  load_recommendations_success: {},
  load_recommendations_fail: { error: false },
  //RECOMMEND MOSAIC
  show_recommendations_mosaic_spinner: false,
  load_recommendations_mosaic_success: [],
  load_recommendations_mosaic_fail: { error: false },
  //POSITION
  show_events_position_spinner: false,
  load_events_position_success: [],
  load_events_position_fail: { error: false },
  //RECENTLY
  show_recently_spinner: false,
  load_recently_success: {},
  load_recently_fail: { error: false },
  //PRESALES
  show_presales_mosaic_spinner: false,
  load_presales_mosaic_success: [],
  load_presales_mosaic_fail: { error: false },
  //TRENDING
  show_trendings_genre_spinner: false,
  load_trendings_genre_success: {},
  load_trendings_genre_fail: { error: false },
  //PRESEALES
  show_presales_spinner: false,
  load_presales_success: {},
  load_presales_fail: { error: false },
  //presales_citibanamex
  show_presales_citibanamex_spinner: false,
  load_presales_citibanamex_success: [],
  load_presales_citibanamex_fail: { error: false },
  //special
  show_specials_spinner: false,
  load_specials_success: {},
  load_specials_fail: { error: true },
  //SLIDER
  show_slider_spinner: false,
  load_slider_success: [],
  load_slider_fail: { error: false },
  //MASI CALOG
  show_msi_catalog_spinner: false,
  load_msi_catalog_success: [],
  load_msi_catalog_fail: { error: false },
  //CITI MSI TERMS
  show_citi_msi_terms_spinner: false,
  load_citi_msi_terms_success: {},
  load_citi_msi_terms_fail: { error: false },
  //EVENT DETAILS
  show_event_details_spinner: false,
  load_event_details_success: {},
  load_event_details_fail: { error: false },
  //get_events_interest
  load_get_events_interest_success: {},
  load_get_events_interest_fail: { error: false },
  //
  load_current_position: false,
  //
  show_top_hits_spinner: false,
  load_top_hits_success: [],
  load_top_hits_fail: { error: false },
  // STATES
  spinner_states: false,
  data_states: [],
  error_states: { error: false },
  //BANNER MAIN
  clear_main_banner: false,
  load_main_banner_success: [],
  load_main_banner_fail: { error: false },
  //ARTISTS ACTIVES
  show_active_artists_spinner: false,
  load_artists_active_success: [],
  load_artists_active_fail: { error: false },
  //ARTIST
  show_artist_spinner: false,
  load_artists_success: [],
  load_artists_fail: { error: false },
  //family_events
  show_family_events_spinner: false,
  load_family_events_success: [],
  load_family_events_fail: { error: false },
  //digital_events
  show_digital_events_spinner: false,
  load_digital_events_success: [],
  load_digital_events_fail: { error: false },
  //theater_events
  show_theater_events_spinner: false,
  load_theater_events_success: [],
  load_theater_events_fail: { error: false },
  //fixed_cards
  show_fixed_cards_spinner: false,
  load_fixed_cards_success: [],
  load_fixed_cards_fail: { error: false },
  //DRIVING
  show_drivein_events_spinner: false,
  load_drivein_events_success: [],
  load_drivein_events_fail: { error: false },
  //STREAMING
  show_streaming_events_spinner: false,
  load_streaming_events_success: [],
  load_streaming_events_fail: { error: false },
  //PALCOS
  show_palcos_events_spinner: false,
  load_palcos_events_success: [],
  load_palcos_events_fail: { error: false },
  //FILTER EVENTS
  show_filter_events_spinner: false,
  load_filter_events_success: [],
  load_filter_events_fail: { error: false },
  //MANAGE
  show_manageable_content_spinner: false,
  load_manageable_content_success: [],
  load_manageable_content_fail: { error: false },
  //VENUES EXPLORER
  show_venues_explorer: false,
  load_venues_explorer_success: [],
  load_venues_explorer_fail: { error: false },

  //LOAD TRENDING
  show_trendings_spinner: false,
  load_trendings_success: [],
  load_trendings_fail: { error: false },

  //VENUES
  show_venues_spinner: false,
  load_venues_success: [],
  load_venues_fail: { error: false },
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CLEAR_SEARCH: {
      return {
        ...state,
        show_search_genre_spinner: false,
        load_search_genre_success: {},
        load_search_genre_fail: { error: false },
        show_search_location_spinner: false,
        load_search_location_success: [],
        load_search_location_fail: { error: false },
        show_search_submit_spinner: false,
        load_search_submit_success: {},
        load_search_submit_fail: { error: false },
        show_active_artists_spinner: false,
        load_artists_active_success: [],
        load_artists_active_fail: { error: false },
      };
    }
    case SEARCH_CHANGED: {
      return {
        ...state,
        searche_changed: true,
      };
    }

    case SELECT_INDEX_CITY: {
      return {
        ...state,
        select_index_city: true,
      };
    }
    case CLEAR_SEARCH_TEXT: {
      return {
        ...state,
        clear_search_text: true,
      };
    }
    case CLEAR_USER_SEARCH: {
      return {
        ...state,
        clear_user_search: true,
      };
    }
    case CLEAR_ARTIST: {
      return {
        ...state,
        show_artist_spinner: false,
        load_artists_success: [],
        load_artists_fail: { error: false },
      };
    }
    case SHOW_SEARCH_SUBMIT_SPINNER: {
      return {
        ...state,
        show_search_submit_spinner: true,
        load_search_submit_success: {},
        load_search_submit_fail: { error: false },
      };
    }
    case LOAD_SEARCH_SUBMIT_SUCCESS: {
      return {
        ...state,
        show_search_submit_spinner: false,
        load_search_submit_success: payload.data,
        load_search_submit_fail: { error: false },
      };
    }
    case LOAD_SEARCH_SUBMIT_FAIL: {
      return {
        ...state,
        show_search_submit_spinner: false,
        load_search_submit_success: {},
        load_search_submit_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_GENRES_SPINNER: {
      return {
        ...state,
        show_genres_spinner: true,
        load_genres_success: [],
        load_genres_fail: { error: false },
      };
    }
    case LOAD_GENRES_SUCCESS: {
      return {
        ...state,
        show_genres_spinner: false,
        load_genres_success: payload.data,
        load_genres_fail: { error: false },
      };
    }
    case LOAD_GENRES_FAIL: {
      return {
        ...state,
        show_genres_spinner: false,
        load_genres_success: [],
        load_genres_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_GENERAL_EVENTS_SPINNER: {
      return {
        ...state,
        show_general_events_spinner: true,
        load_general_events_success: [],
        load_general_events_fail: { error: false },
      };
    }
    case LOAD_GENERAL_EVENTS_SUCCESS: {
      return {
        ...state,
        show_general_events_spinner: false,
        load_general_events_success: payload.data,
        load_general_events_fail: { error: false },
      };
    }
    case LOAD_GENERAL_EVENTS_FAIL: {
      return {
        ...state,
        show_general_events_spinner: false,
        load_general_events_success: [],
        load_general_events_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SEARCH_GENRE_SPINNER: {
      return {
        ...state,
        show_search_genre_spinner: true,
        load_search_genre_success: {},
        load_search_genre_fail: { error: false },
      };
    }
    case LOAD_SEARCH_GENRE_SUCCESS: {
      return {
        ...state,
        show_search_genre_spinner: false,
        load_search_genre_success: payload.data,
        load_search_genre_fail: { error: false },
      };
    }
    case LOAD_SEARCH_GENRE_FAIL: {
      return {
        ...state,
        show_search_genre_spinner: false,
        load_search_genre_success: {},
        load_search_genre_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SEARCH_LOCATION_SPINNER: {
      return {
        ...state,
        show_search_location_spinner: true,
        load_search_location_success: [],
        load_search_location_fail: { error: false },
      };
    }
    case LOAD_SEARCH_LOCATION_SUCCESS: {
      return {
        ...state,
        show_search_location_spinner: false,
        load_search_location_success: payload.data,
        load_search_location_fail: { error: false },
      };
    }
    case LOAD_SEARCH_LOCATION_FAIL: {
      return {
        ...state,
        show_search_location_spinner: false,
        load_search_location_success: [],
        load_search_location_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_RECOMMENDATIONS_SPINNER: {
      return {
        ...state,
        show_spinner_recommendations: true,
        load_recommendations_success: {},
        load_recommendations_fail: { error: false },
      };
    }
    case LOAD_RECOMMENDATIONS_SUCCESS: {
      return {
        ...state,
        show_spinner_recommendations: false,
        load_recommendations_success: payload.data,
        load_recommendations_fail: { error: false },
      };
    }
    case LOAD_RECOMMENDATIONS_FAIL: {
      return {
        ...state,
        show_spinner_recommendations: false,
        load_recommendations_success: {},
        load_recommendations_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_RECOMMENDATIONS_MOSAIC_SPINNER: {
      return {
        ...state,
        show_recommendations_mosaic_spinner: false,
        load_recommendations_mosaic_success: [],
        load_recommendations_mosaic_fail: { error: false },
      };
    }
    case LOAD_RECOMMENDATIONS_MOSAIC_SUCCESS: {
      return {
        ...state,
        show_recommendations_mosaic_spinner: false,
        load_recommendations_mosaic_success: payload.data,
        load_recommendations_mosaic_fail: { error: false },
      };
    }
    case LOAD_RECOMMENDATIONS_MOSAIC_FAIL: {
      return {
        ...state,
        show_recommendations_mosaic_spinner: false,
        load_recommendations_mosaic_success: [],
        load_recommendations_mosaic_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_TRENDINGS_SPINNER: {
      return {
        ...state,
        show_trendings_spinner: true,
        load_trendings_success: [],
        load_trendings_fail: { error: false },
      };
    }
    case LOAD_TRENDINGS_SUCCESS: {
      return {
        ...state,
        show_trendings_spinner: false,
        load_trendings_success: payload.data,
        load_trendings_fail: { error: false },
      };
    }
    case LOAD_TRENDINGS_FAIL: {
      return {
        ...state,
        show_trendings_spinner: false,
        load_trendings_success: [],
        load_trendings_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_EVENTS_POSITION_SPINNER: {
      return {
        ...state,
        show_events_position_spinner: true,
        load_events_position_success: [],
        load_events_position_fail: { error: false },
      };
    }
    case LOAD_EVENTS_POSITION_SUCCESS: {
      return {
        ...state,
        show_events_position_spinner: false,
        load_events_position_success: payload.data,
        load_events_position_fail: { error: false },
      };
    }
    case LOAD_EVENTS_POSITION_FAIL: {
      return {
        ...state,
        show_events_position_spinner: false,
        load_events_position_success: [],
        load_events_position_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_RECENTLY_SPINNER: {
      return {
        ...state,
        show_recently_spinner: true,
        load_recently_success: {},
        load_recently_fail: { error: false },
      };
    }
    case LOAD_RECENTLY_SUCCESS: {
      return {
        ...state,
        show_recently_spinner: false,
        load_recently_success: payload.data,
        load_recently_fail: { error: false },
      };
    }
    case LOAD_RECENTLY_FAIL: {
      return {
        ...state,
        show_recently_spinner: false,
        load_recently_success: {},
        load_recently_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_PRESALES_MOSAIC_SPINNER: {
      return {
        ...state,
        show_presales_mosaic_spinner: true,
        load_presales_mosaic_success: [],
        load_presales_mosaic_fail: { error: false },
      };
    }
    case LOAD_PRESALES_MOSAIC_SUCCESS: {
      return {
        ...state,
        show_presales_mosaic_spinner: false,
        load_presales_mosaic_success: payload.data,
        load_presales_mosaic_fail: { error: false },
      };
    }
    case LOAD_PRESALES_MOSAIC_FAIL: {
      return {
        ...state,
        show_presales_mosaic_spinner: false,
        load_presales_mosaic_success: [],
        load_presales_mosaic_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_TRENDINGS_GENRE_SPINNER: {
      return {
        ...state,
        show_trendings_genre_spinner: true,
        load_trendings_genre_success: {},
        load_trendings_genre_fail: { error: false },
      };
    }
    case LOAD_TRENDINGS_GENRE_SUCCESS: {
      return {
        ...state,
        show_trendings_genre_spinner: false,
        load_trendings_genre_success: payload.data,
        load_trendings_genre_fail: { error: false },
      };
    }
    case LOAD_TRENDINGS_GENRE_FAIL: {
      return {
        ...state,
        show_trendings_genre_spinner: false,
        load_trendings_genre_success: {},
        load_trendings_genre_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_PRESALES_SPINNER: {
      return {
        ...state,
        show_presales_spinner: true,
        load_presales_success: {},
        load_presales_fail: { error: false },
      };
    }
    case LOAD_PRESALES_SUCCESS: {
      return {
        ...state,
        show_presales_spinner: false,
        load_presales_success: payload.data,
        load_presales_fail: { error: false },
      };
    }
    case LOAD_PRESALES_FAIL: {
      return {
        ...state,
        show_presales_spinner: false,
        load_presales_success: {},
        load_presales_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_PRESALES_CITIBANAMEX_SPINNER: {
      return {
        ...state,
        show_presales_citibanamex_spinner: true,
        load_presales_citibanamex_success: [],
        load_presales_citibanamex_fail: { error: false },
      };
    }
    case LOAD_PRESALES_CITIBANAMEX_SUCCESS: {
      return {
        ...state,
        show_presales_citibanamex_spinner: false,
        load_presales_citibanamex_success: payload.data,
        load_presales_citibanamex_fail: { error: false },
      };
    }
    case LOAD_PRESALES_CITIBANAMEX_FAIL: {
      return {
        ...state,
        show_presales_citibanamex_spinner: false,
        load_presales_citibanamex_success: [],
        load_presales_citibanamex_fail: { error: true, data: payload },
      };
    }
    case SHOW_SPECIALS_SPINNER: {
      return {
        ...state,
        show_specials_spinner: true,
        load_specials_success: {},
        load_specials_fail: { error: false },
      };
    }
    case LOAD_SPECIALS_SUCCESS: {
      return {
        ...state,
        show_specials_spinner: false,
        load_specials_success: payload.data,
        load_specials_fail: { error: false },
      };
    }
    case LOAD_SPECIALS_FAIL: {
      return {
        ...state,
        show_specials_spinner: false,
        load_specials_success: {},
        load_specials_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_EXPERIENCIES_SPINNER: {
      return {
        ...state,
        show_spinner_experiencies: false,
        load_experiencies_success: {},
        load_experiencies_fail: { error: false },
      };
    }
    case LOAD_EXPERIENCIES_SUCCESS: {
      return {
        ...state,
        show_spinner_experiencies: false,
        load_experiencies_success: {},
        load_experiencies_fail: { error: false },
      };
    }
    case LOAD_EXPERIENCIES_FAIL: {
      return {
        ...state,
        show_spinner_experiencies: false,
        load_experiencies_success: {},
        load_experiencies_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SLIDER_SPINNER: {
      return {
        ...state,
        show_slider_spinner: true,
        load_slider_success: [],
        load_slider_fail: { error: false },
      };
    }
    case LOAD_SLIDER_SUCCESS: {
      return {
        ...state,
        show_slider_spinner: false,
        load_slider_success: payload.data,
        load_slider_fail: { error: false },
      };
    }
    case LOAD_SLIDER_FAIL: {
      return {
        ...state,
        show_slider_spinner: false,
        load_slider_success: [],
        load_slider_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_MSI_CATALOG_SPINNER: {
      return {
        ...state,
        show_msi_catalog_spinner: true,
        load_msi_catalog_success: [],
        load_msi_catalog_fail: { error: false },
      };
    }
    case LOAD_MSI_CATALOG_SUCCESS: {
      return {
        ...state,
        show_msi_catalog_spinner: false,
        load_msi_catalog_success: payload,
        load_msi_catalog_fail: { error: false },
      };
    }
    case LOAD_MSI_CATALOG_FAIL: {
      return {
        ...state,
        show_msi_catalog_spinner: false,
        load_msi_catalog_success: [],
        load_msi_catalog_fail: { error: true, data: payload },
      };
    }
    case SHOW_CITI_MSI_TERMS_SPINNER: {
      return {
        ...state,
        show_citi_msi_terms_spinner: true,
        load_citi_msi_terms_success: {},
        load_citi_msi_terms_fail: { error: false },
      };
    }
    case LOAD_CITI_MSI_TERMS_SUCCESS: {
      return {
        ...state,
        show_citi_msi_terms_spinner: false,
        load_citi_msi_terms_success: payload.data,
        load_citi_msi_terms_fail: { error: false },
      };
    }
    case LOAD_CITI_MSI_TERMS_FAIL: {
      return {
        ...state,
        show_citi_msi_terms_spinner: false,
        load_citi_msi_terms_success: {},
        load_citi_msi_terms_fail: { error: true, data: payload.data },
      };
    }
    case CLEAR_EVENT_DETAILS: {
      return {
        ...state,
        show_event_details_spinner: false,
        load_event_details_success: {},
        load_event_details_fail: { error: false },
      };
    }
    case SHOW_EVENT_DETAILS_SPINNER: {
      return {
        ...state,
        show_event_details_spinner: true,
        load_event_details_success: {},
        load_event_details_fail: { error: false },
      };
    }
    case LOAD_EVENT_DETAILS_SUCCESS: {
      return {
        ...state,
        show_event_details_spinner: false,
        load_event_details_success: payload.data,
        load_event_details_fail: { error: false },
      };
    }
    case LOAD_EVENT_DETAILS_FAIL: {
      return {
        ...state,
        show_event_details_spinner: false,
        load_event_details_success: {},
        load_event_details_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_GET_EVENTS_INTEREST_SUCCESS: {
      return {
        ...state,
        load_get_events_interest_success: payload.data,
        load_get_events_interest_fail: { error: false },
      };
    }
    case LOAD_GET_EVENTS_INTEREST_FAIL: {
      return {
        ...state,
        load_get_events_interest_success: {},
        load_get_events_interest_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_GET_EVENTS_ATTENDANCE_SUCCESS: {
      return {
        ...state,
        load_get_events_attendance_success: {},
        load_get_events_attendance_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_GET_EVENTS_ATTENDANCE_FAIL: {
      return {
        ...state,
        load_get_events_attendance_success: {},
        load_get_events_attendance_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_CURRENT_POSITION: {
      return {
        ...state,
        load_current_position: payload,
      };
    }
    case SHOW_TOP_HITS_SPINNER: {
      return {
        ...state,
        show_top_hits_spinner: true,
        load_top_hits_success: [],
        load_top_hits_fail: { error: false },
      };
    }
    case LOAD_TOP_HITS_SUCCESS: {
      return {
        ...state,
        show_top_hits_spinner: false,
        load_top_hits_success: payload.data,
        load_top_hits_fail: { error: false },
      };
    }
    case LOAD_TOP_HITS_FAIL: {
      return {
        ...state,
        show_top_hits_spinner: true,
        load_top_hits_success: [],
        load_top_hits_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_VENUES_SPINNER: {
      return {
        ...state,
        show_venues_spinner: true,
        load_venues_success: [],
        load_venues_fail: { error: false },
      };
    }
    case LOAD_VENUES_SUCCESS: {
      return {
        ...state,
        show_venues_spinner: false,
        load_venues_success: payload.data,
        load_venues_fail: { error: false },
      };
    }
    case LOAD_VENUES_FAIL: {
      return {
        ...state,
        show_venues_spinner: false,
        load_venues_success: [],
        load_venues_fail: { error: true, data: payload },
      };
    }
    case SHOW_STATES_SPINNER: {
      return {
        ...state,
        spinner_states: true,
        data_states: [],
        error_states: { error: false },
      };
    }
    case LOAD_STATES_SUCCESS: {
      return {
        ...state,
        spinner_states: false,
        data_states: payload.data,
        error_states: { error: false },
      };
    }
    case LOAD_STATES_FAIL: {
      return {
        ...state,
        spinner_states: false,
        data_states: [],
        error_states: { error: true, data: payload.data },
      };
    }
    case CLEAR_MAIN_BANNER: {
      return {
        ...state,
        clear_main_banner: true,
        load_main_banner_success: [],
        load_main_banner_fail: { error: false },
      };
    }
    case LOAD_MAIN_BANNER_SUCCESS: {
      return {
        ...state,
        clear_main_banner: false,
        load_main_banner_success: payload.data,
        load_main_banner_fail: { error: false },
      };
    }
    case LOAD_MAIN_BANNER_FAIL: {
      return {
        ...state,
        clear_main_banner: false,
        load_main_banner_success: [],
        load_main_banner_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_ACTIVE_ARTISTS_SPINNER: {
      return {
        ...state,
        show_active_artists_spinner: true,
        load_artists_active_success: [],
        load_artists_active_fail: { error: false },
      };
    }
    case LOAD_ACTIVE_ARTISTS_SUCCESS: {
      return {
        ...state,
        show_active_artists_spinner: false,
        load_artists_active_success: payload.data,
        load_artists_active_fail: { error: false },
      };
    }
    case LOAD_ACTIVE_ARTISTS_FAIL: {
      return {
        ...state,
        show_active_artists_spinner: false,
        load_artists_active_success: [],
        load_artists_active_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_ARTIST_SPINNER: {
      return {
        ...state,
        show_artist_spinner: true,
        load_artists_success: [],
        load_artists_fail: { error: false },
      };
    }
    case LOAD_ARTIST_SUCCESS: {
      return {
        ...state,
        show_artist_spinner: false,
        load_artists_success: payload.data,
        load_artists_fail: { error: false },
      };
    }
    case LOAD_ARTIST_FAIL: {
      return {
        ...state,
        show_artist_spinner: false,
        load_artists_success: [],
        load_artists_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_FAMILY_EVENTS_SPINNER: {
      return {
        ...state,
        show_family_events_spinner: true,
        load_family_events_success: [],
        load_family_events_fail: { error: false },
      };
    }
    case LOAD_FAMILY_EVENTS_SUCCESS: {
      return {
        ...state,
        show_family_events_spinner: false,
        load_family_events_success: payload.data,
        load_family_events_fail: { error: false },
      };
    }
    case LOAD_FAMILY_EVENTS_FAIL: {
      return {
        ...state,
        show_family_events_spinner: false,
        load_family_events_success: [],
        load_family_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_DIGITAL_EVENTS_SPINNER: {
      return {
        ...state,
        show_digital_events_spinner: true,
        load_digital_events_success: [],
        load_digital_events_fail: { error: false },
      };
    }
    case LOAD_DIGITAL_EVENTS_SUCCESS: {
      return {
        ...state,
        show_digital_events_spinner: false,
        load_digital_events_success: payload.data,
        load_digital_events_fail: { error: false },
      };
    }
    case LOAD_DIGITAL_EVENTS_FAIL: {
      return {
        ...state,
        show_digital_events_spinner: false,
        load_digital_events_success: [],
        load_digital_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_THEATER_EVENTS_SPINNER: {
      return {
        ...state,
        show_theater_events_spinner: true,
        load_theater_events_success: [],
        load_theater_events_fail: { error: false },
      };
    }
    case LOAD_THEATER_EVENTS_SUCCESS: {
      return {
        ...state,
        show_theater_events_spinner: false,
        load_theater_events_success: payload.data,
        load_theater_events_fail: { error: false },
      };
    }
    case LOAD_THEATER_EVENTS_FAIL: {
      return {
        ...state,
        show_theater_events_spinner: false,
        load_theater_events_success: [],
        load_theater_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_FIXED_CARDS_SPINNER: {
      return {
        ...state,
        show_fixed_cards_spinner: true,
        load_fixed_cards_success: [],
        load_fixed_cards_fail: { error: false },
      };
    }
    case LOAD_FIXED_CARDS_SUCCESS: {
      return {
        ...state,
        show_fixed_cards_spinner: false,
        load_fixed_cards_success: payload.data,
        load_fixed_cards_fail: { error: false },
      };
    }
    case LOAD_FIXED_CARDS_FAIL: {
      return {
        ...state,
        show_fixed_cards_spinner: false,
        load_fixed_cards_success: [],
        load_fixed_cards_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_DRIVEIN_EVENTS_SPINNER: {
      return {
        ...state,
        show_drivein_events_spinner: true,
        load_drivein_events_success: [],
        load_drivein_events_fail: { error: false },
      };
    }
    case LOAD_DRIVEIN_EVENTS_SUCCESS: {
      return {
        ...state,
        show_drivein_events_spinner: false,
        load_drivein_events_success: payload.data,
        load_drivein_events_fail: { error: false },
      };
    }
    case LOAD_DRIVEIN_EVENTS_FAIL: {
      return {
        ...state,
        show_drivein_events_spinner: false,
        load_drivein_events_success: [],
        load_drivein_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_STREAMING_EVENTS_SPINNER: {
      return {
        ...state,
        show_streaming_events_spinner: true,
        load_streaming_events_success: [],
        load_streaming_events_fail: { error: false },
      };
    }
    case LOAD_STREAMING_EVENTS_SUCCESS: {
      return {
        ...state,
        show_streaming_events_spinner: false,
        load_streaming_events_success: payload.data,
        load_streaming_events_fail: { error: false },
      };
    }
    case LOAD_STREAMING_EVENTS_FAIL: {
      return {
        ...state,
        show_streaming_events_spinner: false,
        load_streaming_events_success: [],
        load_streaming_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_PALCOS_EVENTS_SPINNER: {
      return {
        ...state,
        show_palcos_events_spinner: true,
        load_palcos_events_success: [],
        load_palcos_events_fail: { error: false },
      };
    }
    case LOAD_PALCOS_EVENTS_SUCCESS: {
      return {
        ...state,
        show_palcos_events_spinner: false,
        load_palcos_events_success: payload.data,
        load_palcos_events_fail: { error: false },
      };
    }
    case LOAD_PALCOS_EVENTS_FAIL: {
      return {
        ...state,
        show_palcos_events_spinner: false,
        load_palcos_events_success: [],
        load_palcos_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_DRIVEIN_ALL_EVENTS_SPINNER: {
      return {
        ...state,
        show_drivein_all_events_spinner: true,
        load_drivein_all_events_success: [],
        load_drivein_all_events_fail: { error: false },
      };
    }
    case LOAD_DRIVEIN_ALL_EVENTS_SUCCESS: {
      return {
        ...state,
        show_drivein_all_events_spinner: false,
        load_drivein_all_events_success: payload.data,
        load_drivein_all_events_fail: { error: false },
      };
    }
    case LOAD_DRIVEIN_ALL_EVENTS_FAIL: {
      return {
        ...state,
        show_drivein_all_events_spinner: false,
        load_drivein_all_events_success: [],
        load_drivein_all_events_fail: { error: true, data: payload },
      };
    }
    case SHOW_FILTER_EVENTS_SPINNER: {
      return {
        ...state,
        show_filter_events_spinner: true,
        load_filter_events_success: [],
        load_filter_events_fail: { error: false },
      };
    }
    case LOAD_FILTER_EVENTS_SUCCESS: {
      return {
        ...state,
        show_filter_events_spinner: false,
        load_filter_events_success: payload.data,
        load_filter_events_fail: { error: false },
      };
    }
    case LOAD_FILTER_EVENTS_FAIL: {
      return {
        ...state,
        show_filter_events_spinner: false,
        load_filter_events_success: [],
        load_filter_events_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_MANAGEABLE_CONTENT_SPINNER: {
      return {
        ...state,
        show_manageable_content_spinner: true,
        load_manageable_content_success: [],
        load_manageable_content_fail: { error: false },
      };
    }
    case LOAD_MANAGEABLE_CONTENT_SUCCESS: {
      return {
        ...state,
        show_manageable_content_spinner: false,
        load_manageable_content_success: payload.data,
        load_manageable_content_fail: { error: false },
      };
    }
    case LOAD_MANAGEABLE_CONTENT_FAIL: {
      return {
        ...state,
        show_manageable_content_spinner: false,
        load_manageable_content_success: [],
        load_manageable_content_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_VENUES_EXPLORER_SPINNER: {
      return {
        ...state,
        show_venues_explorer: true,
        load_venues_explorer_success: [],
        load_venues_explorer_fail: { error: false },
      };
    }
    case LOAD_VENUES_EXPLORER_SUCCESS: {
      return {
        ...state,
        show_venues_explorer: false,
        load_venues_explorer_success: payload.data,
        load_venues_explorer_fail: { error: false },
      };
    }
    case LOAD_VENUES_EXPLORER_FAIL: {
      return {
        ...state,
        show_venues_explorer: false,
        load_venues_explorer_success: [],
        load_venues_explorer_fail: { error: true, data: payload.data },
      };
    }

    default: {
      return state;
    }
  }
};
