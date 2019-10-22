import React, {Component} from 'react';
import {Platform, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {styles} from './styles/styles';
import {Icon} from 'native-base';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10} from '../../cores/styles/styleView';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import getDowload from '../../api/saveDownload/getData';
import {getDataFavorite, removeFavorite} from '../../redux/actions/favoriteAction';
import {connect} from 'react-redux';
import {ThemeConstants} from '../../cores/theme/Theme';
import Constant from '../../utils/Constant_Api';
import {darkMode} from '../../redux/actions/settingAction';
import Locales from '../../cores/languages/languages';

class Favorite extends Component {
    constructor(props) {
        super();
        this.state = {};
    }

    async componentDidMount(): void {
        getDowload().then(value => {
            this.setState({
                data: value,
            }, console.log('data' + JSON.stringify(value)));
        });

    }

    removeItem(item) {
        this.props.removeFromDownload(item);
    }

    render() {

        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const {favorite} = this.props;
        console.log('favorite: ' + JSON.stringify(favorite));
        const image = `${Constant.images}`;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    onPressLeft={() => navigation.goBack()}
                    title={Locales.Favorite}/>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            // horizontal
                            // numColumns={2}
                            data={favorite || []}
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    onPress={() => navigate('Details', {data: item})}
                                    style={styles.item}>
                                    <View style={styles.viewId}>
                                        <TextComponent
                                            style={{color: ThemeConstants[theme].textColor}}>{index + 1}</TextComponent>
                                    </View>
                                    <View style={styles.shadow}>
                                        <FastImage style={[styles.imageItem]}
                                                   source={{uri: `${image}${item.image}`}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent
                                            style={[styles.text, {color: ThemeConstants[theme].textColor}]}>{item.name}</TextComponent>
                                        <TextComponent
                                            style={[styles.textAuthor, {...marginTop10}]}>{item.author}</TextComponent>
                                        <TextComponent
                                            style={[styles.texttag, {
                                                ...marginTop10,
                                                color: ThemeConstants[theme].textColor,
                                            }]}>{item.category}</TextComponent>
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
        favorite: state.favoriteReducers,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getDataFavorite, removeFavorite, darkMode})(Favorite);
