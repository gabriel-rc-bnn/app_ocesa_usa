import React from 'react';
import { Text } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, StyleSheet } from 'react-native';

const TastesButtonGradientComponent = ({
  onPress,
  children,
  buttonPropsStyle,
  textPropsButtonStyle,
  color1,
  color2,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[color1, color2]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={[styles.buttonStyle, buttonPropsStyle]}>
        <Text
          style={[styles.textButtonStyle, textPropsButtonStyle]}
          numberOfLines={2}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 20,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textButtonStyle: {
    textAlign: 'center',
    maxWidth: 145,
    paddingHorizontal: 10,
  },
});

export default TastesButtonGradientComponent;
