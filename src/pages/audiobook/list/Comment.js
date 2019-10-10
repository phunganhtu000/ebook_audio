import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../style/style_Comment';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <FlatList
              data={this.props.data[0].user_comments}
              renderItem={({item}) =>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '90%'}}>
                  <FastImage
                    source={{uri: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no'}}
                    style={styles.image}/>
                  <View style={{marginLeft: '2.5%', width: '80%'}}>
                    <View style={styles.horizontal}>
                      <TextComponent style={styles.txtName}>{item.user_name}</TextComponent>
                      <TextComponent
                        style={{color: colors.color_text_second, fontSize: 13}}>{item.dt_rate}</TextComponent>
                    </View>
                    <View style={{width: '20%'}}>
                    </View>
                    <TextComponent
                      style={{color: colors.color_text_second, fontSize: 14}}>{item.comment_text}</TextComponent>
                  </View>
                </View>}
            />

          </View>
        </ScrollView>
        <View style={styles.viewallinput}>
          <View style={styles.viewinput}>
            <TextInput
              style={styles.input}
              placeholder="Comment..."
            />
            <TouchableOpacity style={styles.toucoment}>
              <Icon style={styles.iconcomment} type="Ionicons" name="md-send"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


