import React from 'react';
import {
  Modal,
  Text,
  Input,
  Button,
  useTheme,
  Layout,
} from '@ui-kitten/components';
import { Colors } from '../utils';
import { Constants } from '../utils';
import { Avatar } from 'react-native-elements';
import { StyleSheet, StatusBar, Keyboard } from 'react-native';

const { deviceWidth } = Constants;

const ModalCardComponent = ({
  dataBtnLeft,
  dataBtnRigth,
  dataInput,
  dataIcon,
  text,
  textStyle,
  TextComponent,
  visible,
  title,
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      backdropStyle={{ backgroundColor: Colors.backdropModal }}
      style={styles.containerModal}>
      <StatusBar
        backgroundColor={Colors.backdropModal}
        barStyle="light-content"
        hidden={false}
      />
      <Layout style={styles.containerCard}>
        {dataIcon ? (
          <Avatar
            size={66}
            rounded
            icon={{
              name: dataIcon?.name,
              size: dataIcon?.size ? dataIcon.size : 30,
              type: dataIcon?.type || 'font-awesome-5',
              color: dataIcon?.color
                ? dataIcon.color
                : theme['color-primary-default'],
            }}
            overlayContainerStyle={[
              {
                backgroundColor: dataIcon?.iconBackColor
                  ? dataIcon.iconBackColor
                  : theme['color-basic-default'],
              },
              dataIcon?.activeBorder
                ? {
                    borderWidth: 0.2,
                    borderColor: dataIcon?.color
                      ? dataIcon.color
                      : theme['color-primary-default'],
                  }
                : null,
            ]}
          />
        ) : null}

        {title ? <Text style={styles.titleStyle}>{title}</Text> : null}

        {text ? (
          <Text
            style={{
              ...styles.textStyle,
              color: theme['color-basic-600'],
              ...textStyle,
            }}>
            {text}
          </Text>
        ) : typeof TextComponent === 'function' ? (
          <TextComponent />
        ) : null}

        {dataInput ? (
          <Input
            placeholder={dataInput?.label}
            size="large"
            value={dataInput?.value}
            onChange={dataInput?.setValue}
            autoCapitalize={dataInput?.autoCapitalize}
            keyboardType={dataInput?.keyboardType}
            style={{ marginTop: 20, ...dataInput?.style }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
        ) : null}

        <Layout style={{ flexDirection: 'row', marginTop: 20 }}>
          {dataBtnLeft ? (
            <Layout style={{ flex: 1 }}>
              <Button
                size="large"
                status={dataBtnLeft?.status ? dataBtnLeft.status : 'basic'}
                onPress={dataBtnLeft?.onPress}
                disabled={dataBtnLeft?.disabled}
                accessoryLeft={dataBtnLeft?.accessoryLeft}
                style={{ borderRadius: 0 }}>
                {dataBtnLeft?.text}
              </Button>
            </Layout>
          ) : null}

          <Layout style={{ flex: 1 }}>
            <Button
              size="large"
              status={dataBtnRigth?.status ? dataBtnRigth.status : 'info'}
              onPress={dataBtnRigth?.onPress}
              disabled={dataBtnRigth?.disabled}
              accessoryLeft={dataBtnRigth?.accessoryLeft}
              style={{ borderRadius: 0 }}>
              {dataBtnRigth?.text}
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    width: deviceWidth,
    paddingHorizontal: 20,
  },
  containerCard: {
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  textStyle: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ModalCardComponent;
