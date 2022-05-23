// import axios from 'axios';
// import { Platform } from 'react-native';
// import { IDFA } from 'react-native-idfa';

// // Example pixel Url:
// // https://beacon.krxd.net/pixel.gif?tech_browser_lang=en&_kpid=<publsher_uuid>&_kcp_d=<domain>&_kcp_s=<site>&_kcp_sc=<section>&_kuid=<uuid>&_kpa_<name>=<data>

// const _kpid = 'fb9a4008-db32-4a85-81c3-071a584899bc'; // Publisher ID
// const _kcp_d = 'ocesa.com.mx'; // Domain
// const _kcp_s_iOS = 'OCESA_iOS'; // App Site
// const _kcp_s_Android = 'OCESA_Android'; // App Site

// const getKCPS = () => {
//   if (Platform.OS === 'ios') return _kcp_s_iOS;
//   return _kcp_s_Android;
// };

// export const pixelUrl = `https://beacon.krxd.net/pixel.gif?tech_browser_lang=en&_kpid=${_kpid}&_kcp_d=${_kcp_d}&_kcp_s=${getKCPS()}`;

// export const trackPage = namePage => {
//   IDFA.getIDFA()
//     .then(idfa => {
//       axios
//         .get(`${pixelUrl}&_kuid=${idfa}&_kcp_sc=${namePage}`)
//         .then(() => {
//           // console.log(response.status);
//         })
//         .catch(error => {
//           console.error(error.response);
//         });
//     })
//     .catch(e => {
//       console.error(e);
//     });
// };

// export const trackEvent = (namePage, eventName, data) => {
//   IDFA.getIDFA()
//     .then(idfa => {
//       axios
//         .get(
//           `${pixelUrl}&_kuid=${idfa}&_kcp_sc=${namePage}&_kpa_${eventName}=${data}`,
//         )
//         .then(() => {
//           // console.log(response);
//         })
//         .catch(error => {
//           console.error(error.response);
//         });
//     })
//     .catch(e => {
//       console.error(e);
//     });
// };
