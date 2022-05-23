import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, ListFavorites, Loading } from '../../components';
import AssistScreen from './Assist';
import { useSelector, useDispatch } from 'react-redux';
import { getMyEventsInterest } from '../../redux/actions';
import {
  Text,
  useTheme,
  TabView,
  Tab,
  Icon,
  Card,
} from '@ui-kitten/components';
import { RefreshControlBase } from 'react-native';

const FavoritesScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setdata] = useState([]);
  const [empty, setempty] = useState(false);
  const theme = useTheme();

  const { MyInterest } = useSelector(state => state);

  const dispatch = useDispatch();

  const savefavoriteSpinner = useSelector(
    state => state.MyInterest.show_save_events_interest_spinner,
  );
  const favoriteSpinner = useSelector(
    state => state.MyInterest.show_get_events_interest_spinner,
  );
  const favoriteData = useSelector(
    state => state.MyInterest.load_get_events_interest_success,
  );
  const favoriteError = useSelector(
    state => state.MyInterest.load_get_events_interest_fail,
  );
  useEffect(() => {
    dispatch(getMyEventsInterest());
  }, [savefavoriteSpinner]);

  useEffect(() => {
    let favoriteArray=[];
    if (favoriteData.length > 0) {
      try{
        favoriteData.forEach(
           function(item){
             if(item && item.body && item.body.name)
             {
               favoriteArray.push({
               nombre: item.body.name,
               img: item.body.squaredImageUrl,
               detail: item.body.details_url,
               id: item.body.id,
               seo: item.body.seo,
              })
             }
            }
         )
         setdata(favoriteArray);
      }
      catch(e){

      }
      setempty(false);
      /*
      setdata(
        favoriteData.map(item => (
          {
          nombre: item.body.name,
          img: item.body.squaredImageUrl,
          detail: item.body.details_url,
          id: item.body.id,
          seo: item.body.seo,
        })),
      );*/


    } else if (favoriteData.length === 0) {
      setempty(true);
    }
  }, [favoriteSpinner, favoriteData]);

  console.log(empty);
  const RenderIcon = ({ props, name }) => (
    <Icon
      {...props}
      name={name}
      pack="font-awesome-5"
      solid={props.style.tintColor !== theme['color-basic-600']}
    />
  );

  const FavoritesTab = () => {
    if (!favoriteSpinner) {
      if (empty) {
        return (
          <Card
            style={{
              marginTop: 15,
              alignSelf: 'center',
            }}>
            <Icon
              name="heart"
              pack="font-awesome-5"
              style={{
                marginTop: 5,
                fontSize: 30,
                alignSelf: 'center',
                color: theme['color-info-500'],
              }}
            />
            <Text
              category="c1"
              style={{
                marginTop: 5,
                textAlign: 'center',
                color: theme['color-basic-600'],
              }}>
              Aún no has agregado eventos a favoritos. ¡Empieza ahora!
            </Text>
          </Card>
        );
      } else {
        console.log('nop',data);
        return <ListFavorites navigation={navigation} data={data} />;
      }
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Loading
            visible={favoriteSpinner}
            barStyle="dark"
            statusText="info"
            backdropColor="transparent"
            colorSpinner={theme['color-info-500']}
          />
        </View>
      );
    }
  };

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: 'Favoritos',
        align: 'center',
      }}>
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab
          appearance="basic"
          title="Favoritos"
          icon={props => <RenderIcon props={props} name="heart" />}>
          <FavoritesTab />
        </Tab>
        <Tab
          appearance="basic"
          title="Asistiré"
          icon={props => <RenderIcon props={props} name="check" />}>
          <AssistScreen navigation={navigation} />
        </Tab>
      </TabView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FavoritesScreen;
