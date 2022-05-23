import { Card, Icon, Text, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  formatFullDate,
  formatShortDate,
  getDateTimeZone,
  getTodayISOString,
} from '../utils/config/Functions';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

const CarouselSearchItemComponent = ({
  name,
  venue,
  image,
  onPress,
  date,
  isUpcomingPresales,
  deals,
  stateName,
  urlBuyTickets,
  showDealName,
  stateShortName,
}) => {
  const theme = useTheme();

  const renderCarousel = () => {
    if (name) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.viewStyle,
            { height: isUpcomingPresales ? 270 : 230 },
          ]}>
          <FastImage
            style={{ height: 170, borderRadius: 10, marginBottom: 5 }}
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
          />

          {showDealName && deals && deals.deal && deals.deal.name && (
            <Text
              numberOfLines={1}
              style={{ color: theme['color-primary-600'], fontSize: 12 }}>
              {deals.deal.name}
            </Text>
          )}

          <View style={{ marginLeft: 10 }}>
            <Text
              category="label"
              numberOfLines={1}
              style={{ color: theme['color-primary-600'], fontSize: 14 }}>
              {name}
            </Text>

            {isUpcomingPresales && (
              <Text
                numberOfLines={1}
                style={{ color: theme['color-basic-600'], fontSize: 12 }}>
                Preventa: {formatShortDate(deals.startDate)}
              </Text>
            )}

            <Text
              numberOfLines={1}
              style={{ color: theme['color-basic-600'], fontSize: 12 }}>
              {date || 'Varias fechas'}
            </Text>

            {stateShortName ? (
              <Text numberOfLines={1} style={styles.subtitleStyle}>
                {`${stateShortName}`}{' '}
                <Text
                  style={{
                    color: theme['color-basic-600'],
                    fontSize: 12,
                  }}>{`/${venue}`}</Text>
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                style={{ color: theme['color-basic-600'], fontSize: 12 }}>
                {venue}
              </Text>
            )}

            {isUpcomingPresales && (
              <TouchableOpacity
                onPress={() => {
                  const auxDate = getDateTimeZone(new Date(deals.startDate));
                  const eventDate = auxDate.getDate();
                  const eventMonth = auxDate.getMonth();
                  const eventYear = auxDate.getFullYear();
                  const startDate = getTodayISOString(
                    eventDate,
                    eventMonth,
                    eventYear,
                    11,
                  );

                  let notes = `${name}\n${venue}\n${stateName}\nPreventa: ${formatFullDate(
                    startDate,
                  )}\n\nComprar boletos: ${urlBuyTickets}`;
                  if (!urlBuyTickets)
                    notes = `${name}\n${venue}\n${stateName}\nPreventa: ${formatFullDate(
                      startDate,
                    )}`;

                  const eventConfig = {
                    title: `Preventa ${name}`,
                    startDate,
                    endDate: startDate,
                    location: venue,
                    url: urlBuyTickets,
                    notes,
                  };

                  AddCalendarEvent.presentEventCreatingDialog(eventConfig)
                    .then(() => {})
                    .catch(error => {
                      // handle error such as when user rejected permissions
                      console.warn('error add presale calendar', error);
                    });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  paddingVertical: 6,
                  alignSelf: 'stretch',
                  marginLeft: -5,
                }}>
                <Icon
                  pack="font-awesome-5"
                  name="calendar-week"
                  style={{
                    color: '#00bdf2',
                    fontSize: 20,
                    alignSelf: 'flex-start',
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{ color: theme['color-basic-600'], fontSize: 12 }}>
                  Agregar a calendario
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    }

    return <View style={styles.viewEmptyStyle} />;
  };

  return renderCarousel();
};

const styles = StyleSheet.create({
  subtitleStyle: {
    color: '#686868',
    fontSize: 12,
  },
  viewEmptyStyle: {
    backgroundColor: 'transparent',
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    width: 400 / 2.8 + 1,
    height: 210,
  },
  preSaleStyle: {
    backgroundColor: '#71BF48',
    textAlign: 'center',
    paddingHorizontal: Platform.OS === 'ios' ? 5 : 2,
    paddingVertical: 5,
    color: 'white',
    fontSize: 12,
  },
  viewStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 140,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default CarouselSearchItemComponent;
