import React, {Component} from 'react';
import {Platform, StyleSheet, Image, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {styles} from './styles/styles';
import {Icon} from 'native-base';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10} from '../../cores/styles/styleView';
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import getDowload from '../../api/saveDownload/getData';
import {getDataFavorite, removeFavorite} from '../../redux/actions/favoriteAction';
import {connect} from 'react-redux';
import {ThemeConstants} from '../../cores/theme/Theme';
import Constant from '../../utils/Constant_Api';
import {darkMode} from '../../redux/actions/settingAction';
import Locales from '../../cores/languages/languages';
import {NavigationActions, StackActions} from 'react-navigation';

class Favorite extends Component {
    constructor(props) {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.getDataFavorite();
    }

    removeItem(item) {
        this.props.removeFromDownload(item);
    }

    navigateMenu = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: screen}),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    };

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
                        {favorite <= 0 ?
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: setWidth('20%'),
                            }}><FastImage source={require('../../assets/image/hearts.png')}
                                          style={styles.imgtrong}/>
                                <TextComponent
                                    style={{
                                        color: ThemeConstants[theme].textColor,
                                        marginTop: setWidth('5%'),
                                        marginBottom: setWidth('10%'),
                                    }}>Chưa thích mục nào</TextComponent>
                                <TouchableOpacity onPress={() => this.navigateMenu('Menu')} style={{
                                    backgroundColor: '#D0021B', alignItems: 'center',
                                    justifyContent: 'center', width: setWidth('40%'), height: setWidth('10%'),
                                }}>
                                    <TextComponent
                                        style={{color: '#fff', fontSize: setWidth('5%')}}>Read Now</TextComponent>
                                </TouchableOpacity>
                            </View>
                            :
                            <FlatList
                                // horizontal
                                // numColumns={2}
                                data={favorite}
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
                        }
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
