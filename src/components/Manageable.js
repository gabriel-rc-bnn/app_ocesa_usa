import React from 'react';
import { CardNoEventsView, Carousel, Spinner } from '.';
import _ from 'lodash';
import { View } from 'react-native';
import { Banner, CarouselImages } from '.';

const ManageableComponents = ({ data, screen, navigation }) => {
  const dataFilter = _.orderBy(data, ['order', 'name'], ['asc, asc']);

  const renderTarget = (hC, title) => {
    if (!hC) {
      return (
        <View style={{ marginTop: 10 }}>
          <CardNoEventsView message={title} />
        </View>
      );
    }
  };

  const getKeys = data => {
    let keysOfData = Object.keys(data);
    let findKey = keysOfData.find(x => x == 'spinnerDataComponent');
    if (findKey != undefined) {
      return true;
    }
    return false;
  };

  const renderCarousel = dataCarousel => {
    if (dataCarousel.data.length > 0) {
      const dataCarouselFilter = _.orderBy(
        dataCarousel.data,
        ['dates'],
        ['asc'],
      );
      if (getKeys(dataCarousel)) {
        return (
          <Carousel
            data={dataCarouselFilter}
            title={dataCarousel.title}
            navigation={navigation}
            spinner={dataCarousel.spinnerDataComponent}
            error={dataCarousel.errorDataComponent}
          />
        );
      }
      return (
        <Carousel
          data={dataCarouselFilter}
          title={dataCarousel.title}
          navigation={navigation}
          spinner={dataCarousel.spinner}
          error={dataCarousel.errorLoadData}
        />
      );
    } else {
      return renderTarget(dataCarousel.hideCarousel, dataCarousel.title);
    }
  };

  const renderPromotionBanner = dataBanner => {
    if (dataBanner.data.length > 0) {
      if (getKeys(dataBanner)) {
        return (
          <Banner
            data={dataBanner.data[0]}
            navigation={navigation}
            title={dataBanner.title}
            hideTitle={dataCarousel.hideCarousel}
            spinner={dataBanner.spinnerDataComponent}
            error={dataBanner.errorDataComponent}
          />
        );
      }
      return (
        <Banner
          data={dataBanner.data[0]}
          navigation={navigation}
          title={dataBanner.title}
          spinner={dataBanner.spinner}
          error={dataBanner.errorLoadData}
        />
      );
    }
  };

  const renderSliderBanner = dataSliderBanner => {
    if (dataSliderBanner.data.length > 0) {
      if (getKeys(dataSliderBanner)) {
        return (
          <CarouselImages
            data={dataSliderBanner.data.dataSliderBanner}
            navigation={navigation}
            spinner={dataSliderBanner.spinnerDataComponent}
            error={dataSliderBanner.errorDataComponent}
          />
        );
      }
      return (
        <CarouselImages
          data={dataSliderBanner.data.dataSliderBanner}
          navigation={navigation}
          spinner={dataSliderBanner.spinner}
          error={dataSliderBanner.errorLoadData}
        />
      );
    } else {
      return renderTarget(
        dataSliderBanner.hideCarousel,
        dataSliderBanner.title,
      );
    }
  };

  return dataFilter.map((datos, i) => {
    if (datos.active && datos.screen === screen) {
      return (
        <View key={i}>
          {datos.type === 'carousel' ? renderCarousel(datos) : null}
          {datos.type === 'promotion_banner'
            ? renderPromotionBanner(datos)
            : null}
          {datos.type === 'slider' ? renderSliderBanner(datos) : null}
          {/* {datos.type === "lucky_stage" ? renderLuckyStage(props, datos) : null}
          {datos.type === "msi_banner" ? renderMSIBanner(props, datos) : null} */}
        </View>
      );
    }
    return null;
  });
};

// const renderLuckyStage = ({ navigation }, { data, banner = false }) => {
//   if (Array.isArray(data) && data.length > 0) {
//     return (
//       <LuckyStageBanner data={data} navigation={navigation} banner={banner} />
//     );
//   }
//   return null;
// };

// const renderMSIBanner = (
//   { navigation },
//   { data, title, dataFixedCard, screen },
// ) => (
//   <MSIBanner
//     data={data}
//     home={screen === 'home'}
//     navigation={navigation}
//     title={title}
//     squaredImage={dataFixedCard.squared_image}
//   />
// );

export default ManageableComponents;
