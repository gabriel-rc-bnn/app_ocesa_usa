import React from 'react';
import { StatusBar } from 'react-native';
import {
  Icon,
  Text,
  Layout,
  useTheme,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import ScrollView from './ScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../utils/theme/Colors';

const ContainerComponent = ({
  children,
  withBar,
  withScroll,
  withHeader,
  backgroundColor,
}) => {
  const theme = useTheme();

  const HeaderIcon = (props, data) => {
    props.style.tintColor = data?.color || theme['color-basic-100'];
    return (
      <Icon
        {...props}
        name={data?.name}
        pack={data?.type}
        solid={data?.solid}
      />
    );
  };

  const HeaderTitle = (evaProps, Title, color) => {
    evaProps.style.color = color || theme['color-basic-100'];

    if (typeof Title === 'string') {
      return <Text {...evaProps}>{Title}</Text>;
    } else if (typeof Title === 'function') {
      return <Title />;
    } else {
      return '';
    }
  };

  const TopAction = data => {
    if (data !== undefined)
      return (
        <TopNavigationAction
          onPress={data?.onPress}
          icon={props => HeaderIcon(props, data)}
        />
      );
    return undefined;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: withBar?.colorBar }}>
      {withBar ? (
        <StatusBar
          backgroundColor={withBar?.colorBar}
          barStyle={`${withBar?.themeBar || 'light'}-content`}
          hidden={false}
          animated={true}
        />
      ) : null}

      {withHeader ? (
        <TopNavigation
          {...withHeader}
          style={{
            backgroundColor:
              withHeader?.backgroundColor || theme['color-primary-700'],
            ...withHeader?.style,
          }}
          accessoryLeft={TopAction(withHeader?.accessoryLeft)}
          accessoryRight={TopAction(withHeader?.accessoryRight)}
          alignment={withHeader?.align}
          title={evaProps =>
            HeaderTitle(evaProps, withHeader?.title, withHeader?.color)
          }
        />
      ) : null}

      <Layout style={{ flex: 1, backgroundColor }}>
        {withScroll ? (
          <ScrollView>{children}</ScrollView>
        ) : (
          <Layout style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
            {children}
          </Layout>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default ContainerComponent;
