import { StyleSheet } from 'react-native';
import { deviceWidth } from '../config/Constants';

const constantMeasurement = 2.8;
const constantLogoMeasurement = 3;

export default Styles = StyleSheet.create({
  buttonAlignEnd: {
    marginVertical: 5,
    width: deviceWidth - 80,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 2.0,
    color: 'black',
    paddingVertical: 9,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textDecorationColor: 'black'
  },
  container: {
    flex: 1,
    padding: 20,
  },
  imgLogoCiti: {
    width: 438 / constantLogoMeasurement,
    height: 199 / constantLogoMeasurement,
  },
  colLeft: {
    flex: 1,
    paddingLeft: 10,
  },
  colRight: {
    flex: 1,
    paddingRight: 10,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    padding: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: deviceWidth,
  },
});
