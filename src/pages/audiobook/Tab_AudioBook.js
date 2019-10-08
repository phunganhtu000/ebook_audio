import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Tab, Container, TabHeading, Tabs, ScrollableTab} from 'native-base';
import AudioBookThree from './list/Audio_Book_Three';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Locales from '../../assets/languages/languages';
import AudioBook from './list/AudioBook';
import Comment from './list/Comment';

export default class Tab_AudioBook extends Component {
  render() {
    const navigations = this.props.navigation;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <HeaderComponent
          iconLeft='ios-arrow-back'
          left='back'
          typeIconRight='MaterialCommunityIcons'
          iconRight='dots-horizontal'
          title={Locales.AudioBook}
          onPressLeft={() => navigation.goBack()}
        />
        <Tabs tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1}}
              renderTabBar={() => <ScrollableTab style={{backgroundColor: '#fff', borderBottomWidth: 0}}/>}>
          <Tab tabStyle={{backgroundColor: '#fff'}}
               activeTabStyle={{backgroundColor: '#fff'}}
               textStyle={{color: '#C5C4C4'}}
               activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.NowPlaying}>
            <AudioBookThree navigation={navigations}/>
          </Tab>
          <Tab tabStyle={{backgroundColor: '#fff'}}
               activeTabStyle={{backgroundColor: '#fff'}}
               textStyle={{color: '#C5C4C4'}}
               activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}}
               heading={Locales.Info}>
            <AudioBook navigation={navigations}/>
          </Tab>
          <Tab tabStyle={{backgroundColor: '#fff'}}
               activeTabStyle={{backgroundColor: '#fff'}}
               textStyle={{color: '#C5C4C4'}}
               activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Comment}>
            <Comment navigation={navigations}/>
          </Tab>


        </Tabs>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
