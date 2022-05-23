import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';

const SelectButtonComponent = ({
  onPress,
  children,
  containerPropsStyle,
  iconType,
  iconName,
  iconPropsStyle,
  textPropsStyle,
  containerTextPropsStyle,
  disableIcon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.containerStyle, containerPropsStyle]}
      onPress={onPress}>
      <Col size={85} style={{ backgroundColor: 'transparent' }}>
        <Row style={[styles.containerTextStyle, containerTextPropsStyle]}>
          {iconType && (
            <Icon
              pack="font-awesome-5"
              name={iconName}
              style={[styles.iconStyle, iconPropsStyle]}
            />
          )}
          <Text numberOfLines={1} style={[styles.textStyle, textPropsStyle]}>
            {' '}
            {children}
          </Text>
        </Row>
      </Col>

      <Col
        size={15}
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!disableIcon && (
          <Icon
            name="chevron-down"
            pack="font-awesome-5"
            style={[styles.iconStyle, iconPropsStyle]}
          />
        )}
      </Col>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerTextStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    color: '#686868',
    fontSize: 14,
  },
  iconStyle: {
    color: '#686868',
    fontSize: 20,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectButtonComponent;
