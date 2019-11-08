import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView, ActivityIndicator,
} from 'react-native';

import HeaderComponent from '../headerComponent/HeaderComponent';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from '../../cores/languages/languages';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles from './styles/styles';

import {connect} from 'react-redux';
import {getSubCategory} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class News extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            styles: Styles.getSheet(false),
        };
    }

  componentDidMount() {
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d477de38333840c9b7f7704f764a7760')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.articles,
        }, function() {
          console.log('data:' + JSON.stringify(responseJson.articles));
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


    render() {
        if (this.state.isLoading) {
            const styles = this.state.styles;
            console.log('styles :' + JSON.stringify(styles));
            return (
                <View style={styles.container}>
                    <HeaderComponent
                        left='true'
                        iconRight='ios-search'
                        title={Locales.News}/>
                    <ActivityIndicator/>
                </View>
            );
        }
        const {navigate} = this.props.navigation;
        const styles = this.state.styles;
        console.log('styles :' + JSON.stringify(styles));
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container,{backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <HeaderComponent
                    left='true'
                    iconRight='ios-search'
                    title={Locales.News}/>
                <ScrollView>

                    <View style={styles.body}>

                        <FlatList
                            // horizontal
                            // numColumns={2}
                            data={this.state.dataSource}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => navigate('NewsDetails', {item: item.url})}
                                    style={[styles.item,{backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                                    <FastImage style={[styles.imageItem]}
                                               source={{uri: item.urlToImage}}/>
                                    <View style={styles.viewText}>
                                        <TextComponent style={[styles.text,{color: ThemeConstants[theme].textColor}]}>{item.title}</TextComponent>
                                        <TextComponent style={[styles.textAuthor]}>{item.author} </TextComponent>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory, darkMode})(News);
