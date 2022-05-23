import {
  AccessToken,
  LoginManager,
  GraphRequest,
} from 'react-native-fbsdk-next';

export const handleLoginFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      LoginManager.logOut();
      return {
        status: 401,
        message: 'Inicio de sesión cancelado',
      };
    } else {
      const token = await AccessToken.getCurrentAccessToken();
      return { status: 200, data: { token } };
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return { status: 404, error, message: 'Hubo un error, intente más tarde' };
  }
};

export const infoRequest = (token, callback) => {
  return new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string: 'email,name,first_name,middle_name,last_name',
        },
        access_token: {
          string: token,
        },
      },
    },
    callback,
  );
};
