import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ButtonComponent = ({
  onPress,
  children,
  containerPropsButtonStyle,
  buttonPropsStyle,
  textPropsButtonStyle,
  iconPropsStyle,
  disabled = false,
  icon = false,
  iconType = null,
  iconName = null,
  numberOfLinesProps = null,
}) =>
  !icon ? (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.containerButtonStyle, containerPropsButtonStyle]}>
      <View style={[styles.buttonStyle, buttonPropsStyle]}>
        <Text
          style={[styles.textButtonStyle, textPropsButtonStyle]}
          numberOfLines={numberOfLinesProps || 1}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.containerButtonStyle, containerPropsButtonStyle]}>
      <View style={[styles.buttonStyle, buttonPropsStyle]}>
        {/* <Icon type={iconType} name={iconName} style={{ ...styles.inconStyle, ...iconPropsStyle }} /> */}
        <Text
          style={[styles.textButtonStyle, textPropsButtonStyle]}
          numberOfLines={numberOfLinesProps || 1}>
          {' '}
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  containerButtonStyle: {
    backgroundColor: 'transparent',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonStyle: {
    height: 40,
    width: width - 80,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#002d72',
  },
  textButtonStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Interstate-Regular',
    backgroundColor: 'transparent',
    marginTop: 2.5,
    paddingHorizontal: 2.5,
    color: '#002d72',
  },
  inconStyle: {
    fontSize: 17,
    color: '#686868',
  },
});

export default ButtonComponent;
