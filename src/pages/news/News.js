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
import Locales from '../../assets/languages/languages';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles from './styles/styles';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';
import {Card} from 'react-native-paper';

;

export default class News extends Component {
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
                }, function () {
                    console.log('data:' + JSON.stringify(responseJson.articles));
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //
    // async changeStyle() {
    //   const rtl = await getDataOfflineMode(constants.isRTL);
    //   this.setState({
    //     isRTL: rtl,
    //   });
    //   const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
    //   // switch (change_style) {
    //   //     case constants.STYLE_BORDER:
    //   //         this.setState(
    //   //             {styles:styles})
    //   //     case constants.STYLE_BOX_SHADOW:
    //   //         this.setState(
    //   //             {styles:styles_three})
    //   //     case constants.STYLE_NON_BORDER:
    //   //         this.setState(
    //   //             {styles:styles_two})
    //   //     case constants.STYLE_NON_LINED:
    //   //         this.setState(
    //   //             {styles:styles_four})
    //   // }
    //
    //   this.setState({
    //     changeStyle: change_style,
    //   }, () => {
    //     if (inValidateText(change_style)) {
    //       this.setState({
    //         styles: Styles.getSheet(this.state.isRTL),
    //       });
    //
    //
    //     } else if (this.state.changeStyle === 0) {
    //       this.setState({
    //         styles: Styles.getSheet(this.state.isRTL),
    //       });
    //     } else if (this.state.changeStyle === 1) {
    //       this.setState({
    //         styles: Styles_Two.getSheet(this.state.isRTL),
    //       });
    //     } else if (this.state.changeStyle === 2) {
    //       this.setState({
    //         styles: styles_three.getSheet(this.state.isRTL),
    //       });
    //     } else if (this.state.changeStyle === 3) {
    //       this.setState({
    //         styles: Styles.getSheet(this.state.isRTL),
    //       });
    //     }
    //
    //   }, console.log('change_style :' + change_style));
    //   this.setState({
    //     // styles: getStyleType()
    //   });
    // }

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
        return (
            <View style={styles.container}>
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
                                    style={styles.item}>
                                    <FastImage style={[styles.imageItem]}
                                               source={{uri: item.urlToImage}}/>
                                    <View style={styles.viewText}>
                                        <TextComponent style={styles.text}>{item.title}</TextComponent>
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

