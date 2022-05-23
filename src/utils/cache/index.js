import UserCache from './User';
import DeviceCache from './Device';
import FirebaseCache from './Firebase';
import PlatformCache from './Platform';

export { UserCache, PlatformCache, DeviceCache, FirebaseCache };

export async function RemoveAll() {
  await UserCache.removeAll();
  await PlatformCache.removeAll();
  await DeviceCache.removeAll();
  await FirebaseCache.removeAll();
}
