import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, AsyncStorage} from 'react-native';
import Styles from '../../details/styles/style';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Toast} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import ButtonBottom from '../../button/ButtonBottom';
import {getDataOfflineMode, saveDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Locales from '../../../assets/languages/languages';
import saveDownload from '../../../api/saveDownload/saveData';
import Constant from '../../../utils/Constant_Api';

export default class Infor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    saveDownloadData() {
        const item = this.props.navigation.state.params.item;
        saveDownload(item);
    }

    addProductToCart() {
        // const isExist = this.state.cartArray.some(e => e.product.id === product.id);
        // if (isExist) return false;
        var item = this.props.navigation.state.params.item;

        AsyncStorage.getItem('@cart', (err, res) => {
            if (!res) {
                AsyncStorage.setItem('@cart', JSON.stringify([item]));
            } else {
                const isExist = JSON.parse(res).some(e => e.product.id === product.id);
                if (isExist) {
                    return (
                        Toast.show({
                            text: 'Product added to your cart !',
                            position: 'bottom',
                            type: 'warning',
                            buttonText: 'Dismiss',
                            duration: 3000,
                        })
                    );
                } else {
                    var items = JSON.parse(res);
                    items.push(item);
                    AsyncStorage.setItem('@cart', JSON.stringify(items));
                    Toast.show({
                        text: 'Product added to your cart !',
                        position: 'bottom',
                        type: 'success',
                        buttonText: 'Dismiss',
                        duration: 3000,
                    });
                }
            }
        });
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        console.log('data ebook' + JSON.stringify(item));
        const image = `${Constant.images}`;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewMagin10}>
                            <TextComponent style={styles.type}>{Locales.History}</TextComponent>
                            <TextComponent style={styles.title}>{item.book_title}</TextComponent>
                            <View style={[styles.time, styles.horizontal]}>
                                <TextComponent style={styles.textTime}>{item.author_name}</TextComponent>
                                <TextComponent style={styles.textTime}>23 Mar, 2019</TextComponent>
                            </View>
                        </View>
                        <View style={styles.viewDetail}>
                            <View style={styles.borderImage}>
                                <FastImage style={styles.image}
                                           source={{uri: `${image}${item.book_cover_img}`}}/>

                            </View>
                        </View>
                        <View style={[styles.marginTop30, styles.viewMagin10]}>
                            <View style={styles.row}>
                                <TextComponent style={styles.textReview}>4.7</TextComponent>
                                <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                    <Icon name='star' type='AntDesign' style={{fontSize: 20, color: colors.orange}}/>
                                </View>
                            </View>
                            <View style={[styles.horizontal, styles.time]}>
                                <TouchableOpacity style={styles.review}><TextComponent
                                    style={styles.text}>21</TextComponent><TextComponent
                                    style={styles.textTime}>Favorite</TextComponent></TouchableOpacity>
                                <TouchableOpacity style={styles.review}><TextComponent
                                    style={styles.text}>9</TextComponent><TextComponent
                                    style={styles.textTime}>Rate</TextComponent></TouchableOpacity>
                                <TouchableOpacity style={styles.review}><TextComponent
                                    style={styles.text}>13</TextComponent><TextComponent
                                    style={styles.textTime}>Discuss</TextComponent></TouchableOpacity>
                                <TouchableOpacity style={styles.review}><TextComponent
                                    style={styles.text}>0</TextComponent><TextComponent
                                    style={styles.textTime}>Appoint</TextComponent></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.horizontal, styles.time, {
                                backgroundColor: colors.lightGray,
                                borderRadius: 5,
                                paddingHorizontal: 5,
                            }]}>
                                <TextComponent style={[styles.type, {fontSize: 22, paddingTop: 10}]}>Chapter
                                    list</TextComponent>
                                <View style={styles.horizontal}>
                                    <TextComponent style={styles.txtChapname}>Chap 35: Kia Sengoria</TextComponent>
                                    <Icon name='right' type='AntDesign'
                                          style={styles.iconright}/>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.marginTop30]}>
                                <TextComponent style={styles.text}>
                                    I failed the first quarter of a class in school , so
                                    i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                    I failed the first quarter of a class in school , so i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                    I failed the first quarter of a class in school , so i mad a face report card.
                                    I did this every quarter that year. I forgot that they mail home the end-year cards,
                                    and my mom go it beforeIculd intercept...Read more
                                </TextComponent>
                            </View>
                        </View>

                    </View>
                </ScrollView>

                <View style={styles.viewButtonBottom}>
                    <ButtonBottom
                        onPressReadNow={() => navigate('EpubReader')}
                        download={() => this.saveDownloadData()}
                    />

                </View>
            </View>
        );
    }
}


