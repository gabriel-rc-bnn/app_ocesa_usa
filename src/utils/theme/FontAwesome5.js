import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function FontAwesome5Icon({ name, style, solid }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon
      name={name}
      size={height}
      color={tintColor}
      style={iconStyle}
      solid={solid}
    />
  );
}

const IconProvider = name => ({
  toReactElement: props => FontAwesome5Icon({ name, ...props }),
});

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

export default FontAwesome5IconsPack = {
  name: 'font-awesome-5',
  icons: createIconsMap(),
};
