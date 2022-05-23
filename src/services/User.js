import { ProfileApi } from '.';
import { ROUTES } from '../utils/config/Constants';

export const getProfile = async () => {
  try {
    const response = await (await ProfileApi()).get(ROUTES.profile);

    if (response.status === 200) {
      return { status: 200, data: response.data };
    }
  } catch (error) {
    console.log('ERROR GET PROFILE:', error.response);
    return error.response;
  }
};
