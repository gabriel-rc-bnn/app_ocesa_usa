import React from 'react';
import Spinner from 'react-native-spinkit';
import { useTheme } from '@ui-kitten/components';

const SpinnerComponent = ({ visible, style }) => {
  const theme = useTheme();

  return (
    <Spinner
      size={60}
      isVisible={visible}
      type="FadingCircleAlt"
      color={theme['color-info-500']}
      style={{ marginVertical: 20, alignSelf: 'center', ...style }}
    />
  );
};

export default SpinnerComponent;
