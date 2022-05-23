import React from 'react';
import { ListItem, Text, List } from '@ui-kitten/components';

const MenuCollectionsComponent = ({ data, navigation }) => {
  const renderItem = ({ item, index }) => {
    if (!item.disabled) {
      return (
        <ListItem
          key={index}
          onPress={
            item.route
              ? () => {
                  navigation.navigate(item.route, {
                    ...item.params,
                    ...item?.data,
                  });
                }
              : item.onPress
          }
          style={{
            minHeight: 45,
            backgroundColor: item.background ? item.background : '#fff',
          }}
          title={() => <Text category="p2">{item.label}</Text>}
        />
      );
    }
  };

  return <List renderItem={renderItem} data={data} />;
};

export default MenuCollectionsComponent;
