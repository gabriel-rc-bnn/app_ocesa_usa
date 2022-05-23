import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from '@ui-kitten/components';
import { ProgressCircle } from 'react-native-svg-charts';

const ProgressCircleComponent = ({ percentage, index }) => {
  const theme = useTheme();

  const colors = [
    theme['color-primary-500'],
    theme['color-danger-500'],
    theme['color-success-500'],
    theme['color-warning-500'],
    theme['color-info-500'],
  ];

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ProgressCircle
        style={{ height: 80, width: 80 }}
        progress={percentage}
        progressColor={colors[index.toFixed(0)]}
      />
      <Text
        style={{
          color: theme['color-basic-600'],
          fontSize: 12,
          position: 'absolute',
        }}>
        {(percentage * 100).toFixed(0)}%
      </Text>
    </View>
  );
};

export default ProgressCircleComponent;
