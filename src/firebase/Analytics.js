import Analytics from '@react-native-firebase/analytics';
import { DeviceCache, PlatformCache, UserCache } from '../utils';

const guest = 'invitado';

export const pageName = {
  home: 'Home',
  search: 'Búsqueda',
  family: 'Familiares',
  profile: 'Perfilador',
  billboard: 'Cartelera',
  eventDetails: 'Detalle del evento',
  presalesCurrent: 'Promociones vigentes',
  presalesComming: 'Promociones próximas',
};

export const eventName = {
  signUp: 'crear_cuenta',
  loginFB: 'login_facebook',
  loginOCESA: 'login_ocesa',
  bannerHome: 'banner_home',
  startsNow: 'comienza_ahora',
  MSIBanner: 'banner_3_6_9_msi',
  buyTickets: 'comprar_boletos',
  guest: 'ingresar_como_invitado',
  searchByMonth: 'busqueda_por_mes',
  searchByText: 'busqueda_por_texto',
  searchByDate: 'busqueda_por_fecha',
  searchByGenre: 'busqueda_por_genero',
  searchByState: 'busqueda_por_estado',
  suggestedSearch: 'busqueda_sugerida',
  recoveryPassword: 'recovery_password',
  bannerLuckyStage: 'banner_lucky_stage',
  searchByVenue: 'busqueda_por_inmueble',
  MSIBenefits: 'beneficio_citi_3_6_9_msi',
  searchByCategory: 'busqueda_por_categoria',
  specialEventNotice: 'aviso_especial_evento',
  citibanamexBenefits: 'beneficios_citibanamex',
  billboardSearchByMonth: 'cartelera_busqueda_mes',
  syncProfileMusic: 'sincronizar_perfilador_musical',
  syncTastesFavorites: 'sincronizar_gustos_musicales',
  billboardSearchByState: 'cartelera_busqueda_estado',
  bannerSpecialDeals: 'banner_promociones_especiales',
  profileMusicGenre: 'perfilador_de_generos_musicales',
};

export const logEvent = async (name, object = Object) => {
  if ((await UserCache.getToken()) !== null) {
    const user = await UserCache.getUser();
    const platform = await PlatformCache.getLoginPlatform();

    Analytics().logEvent(name, {
      ...object,
      userId: user.userId,
      plataformaLogin: platform,
      invitado: 'no',
    });
  } else {
    Analytics().logEvent(name, { ...object, invitado: 'si' });
  }
};

export const initFA = async () => {
  const trackingStatus = await PlatformCache.getTrackingStatus();
  const user = await UserCache.getUser();

  if (trackingStatus !== null) {
    if ((await UserCache.getToken()) !== null) {
      Analytics().setUserId(String(user.userId));
      Analytics().setUserProperty('invitado', 'no');
      Analytics().setUserProperty(
        'plataforma_login',
        await PlatformCache.getLoginPlatform(),
      );
    } else {
      Analytics().setUserId(`${guest}-${await DeviceCache.getGuestId()}`);
      Analytics().setUserProperty('invitado', 'sí');
    }
  } else {
    console.log('Tracking Status is Null');
  }
};

export const trackScreen = async name => {
  await Analytics().logScreenView({
    screen_name: name,
  });
};

export const sendTop3MusicalGenres = arrayMusicalGenres => {
  if (arrayMusicalGenres instanceof Array && arrayMusicalGenres.length > 0) {
    for (let i = 0; i < 3; i++) {
      if (arrayMusicalGenres[i] && arrayMusicalGenres[i].name) {
        Analytics().setUserProperty(
          `top_${i + 1}_genero_musical`,
          arrayMusicalGenres[i].name,
        );
      }
    }
  }
};
