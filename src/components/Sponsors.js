import React, { Component } from 'react';
import _ from 'lodash';
import { Colors } from '../utils';
import { Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { deviceWidth } from '../utils/config/Constants';
import {
  View,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

const elementWidth = 120 / 1.27;
const elementHeight = 90 / 1.27;

class SponsorsList extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.scrollValue = new Animated.Value(0);
    this.mounted = true;
    this.animationStoped = false;
    this.animationValue = 0;
    this.scrollValue.addListener(({ value }) => {
      this.animationValue = value;
    });

    this.state = {
      sponsors: [],
      activeIndex: 0,
    };
  }

  componentDidMount() {
    const sponsors = _(this.props.sponsors)
      .uniqBy(sponsor => sponsor.id)
      .orderBy(sponsor => sponsor.order)
      .filter(sponsor => sponsor.imgUrl)
      .map(sponsor => sponsor.imgUrl)
      .value();

    let bigSponsors = [];

    if (sponsors instanceof Array && sponsors.length > 0) {
      if (sponsors.length <= 2) {
        bigSponsors = sponsors;
      } else {
        bigSponsors = bigSponsors
          .concat(sponsors)
          .concat(sponsors)
          .concat(sponsors)
          .concat(sponsors)
          .concat(sponsors)
          .concat(sponsors);
      }
    }

    if (this.mounted) {
      this.setState(
        {
          sponsors: bigSponsors,
        },
        () => this.scrollSponsors(),
      );
    }
  }

  // componentWillUnmount() {
  //   this.mounted = false;
  //   this.scrollValue.stopAnimation();
  // }

  scrollSponsors() {
    const { sponsors } = this.state;
    if (sponsors.length > 2 && !this.animationStoped) {
      this.scrollValue.setValue(0);
      const toValue = -(deviceWidth * 5);
      Animated.timing(this.scrollValue, {
        toValue,
        duration: 50000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => this.scrollSponsors());
    }
  }

  stopAnimation() {
    const x = -1 * this.animationValue;
    if (!this.animationStoped) {
      this.scrollValue.setValue(0);
      this.animationStoped = true;
      this.sponsorsListRef.scrollTo({ x, animated: false });
    }
  }

  renderItem(item, index) {
    const { imageStyle } = styles;
    const aditionalStyles =
      this.state.sponsors.length === 1
        ? { marginLeft: deviceWidth / 2 - elementWidth / 2 }
        : this.state.sponsors.length === 2
        ? { marginLeft: (deviceWidth - elementWidth * 2) / 3 }
        : { marginLeft: 20 };

    return Platform.OS === 'android' ? (
      <Animated.Image
        resizeMode="contain"
        source={{ uri: item }}
        style={{
          ...imageStyle,
          ...aditionalStyles,
          transform: [{ translateX: this.scrollValue }],
        }}
        key={index.toString()}
      />
    ) : (
      <FastImage
        source={{ uri: item }}
        resizeMode="contain"
        style={{ ...imageStyle, ...aditionalStyles, marginTop: 0 }}
      />
    );
  }

  _renderItem({ item }) {
    const { imageStyle } = styles;
    return (
      <FastImage
        source={{ uri: item }}
        resizeMode="contain"
        style={imageStyle}
      />
    );
  }

  render() {
    const { containerStyle, titleStyle } = styles;
    const { sponsors } = this.state;
    if (sponsors.length === 0) {
      return null;
    }
    return (
      <View style={containerStyle}>
        <Text style={titleStyle} category="c2">
          Patrocinadores
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Carousel
            layout={'default'}
            loop={true}
            autoplay={true}
            autoplayInterval={1000}
            ref={ref => (this.carousel = ref)}
            data={this.state.sponsors}
            sliderWidth={100}
            itemWidth={100}
            renderItem={this._renderItem}
            lockScrollWhileSnapping={true}
            enableMomentum={true}
            onSnapToItem={index => this.setState({ activeIndex: index })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.white,
    marginTop: 20,
    height: 90,
    padding: 20,
    marginHorizontal: -20,
  },
  imageStyle: {
    width: elementWidth,
    height: elementHeight,
    marginTop: -10,
  },
  titleStyle: {
    color: Colors.textColorGray,
  },
});

export default SponsorsList;
