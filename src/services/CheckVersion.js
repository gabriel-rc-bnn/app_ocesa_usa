import VersionCheck from 'react-native-version-check';
import { checkVersion as checkVersionIOS } from 'react-native-check-version';

export const checkVersion = async () => {
  try {
    const versionIOS = await checkVersionIOS({
      platform: 'ios',
      bundleId: 'com.ocesa.app',
      country: 'mx',
    });

    const updateNeededNew = await VersionCheck.needUpdate({
      depth: 3,
      ignoreErrors: false,
      latestVersion: versionIOS.version,
    });

    const updateNeededMandatory = await VersionCheck.needUpdate({
      depth: 1,
      ignoreErrors: false,
      latestVersion: versionIOS.version,
    });

    if (updateNeededNew?.isNeeded !== updateNeededMandatory?.isNeeded) {
      return { newVersion: true };
    } else if (updateNeededMandatory?.isNeeded) {
      return { updateVersion: true };
    }

    return { currentVersion: true };
  } catch (error) {
    if (error.response) {
      console.log({ error: true, data: error.response.data });
    }

    console.log({ error: true, data: error });
    return { error: true, data: error };
  }
};
