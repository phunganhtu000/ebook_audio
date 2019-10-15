import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../../cores/styles/colors';

export default class ListTV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTV: [],

    };
  }

  render() {
    const data = this.props.data;
    return (
      <View style={[styles.container]}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                height: 100,
                backgroundColor:colors.background,
                margin: 5,
                borderRadius:5
              }}>
              <Image style={{height: 100, width: '100%'}} resizeMode='contain' source={{uri: item.image}}/>
            </TouchableOpacity>
          )}
          numColumns={2}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewMagin10: {
    marginLeft: 10,
    marginRight: 10,
  },
});
