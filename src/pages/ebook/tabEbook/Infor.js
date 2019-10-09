import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    AsyncStorage,
    Dimensions,
    FlatList, Image,
} from 'react-native';
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
import HTML from 'react-native-render-html';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';

class Infor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);
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

    renderItem = ({item}) => {
        const styles = Styles.getSheet(this.state.isRTL);
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        return (
            <View>
                <ScrollView>
                    <View style={styles.viewMagin10}>
                        {/*<TextComponent style={styles.type}>{Locales.History}</TextComponent>*/}
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
                            <TextComponent style={styles.textReview}>{item.rate_avg}</TextComponent>
                            <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                                <RatingBar
                                    disabled={false}
                                    maxStars={5}
                                    // selectedStar={(rating)=>this.onStarRatingPress(rating)}
                                    rating={item.rate_avg}
                                    starSize={25}
                                    fullStarColor={colors.orange}/>
                            </View>
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
                            <HTML html={item.book_description} style={styles.text}/>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    };
    renderItem2 = ({item}) => {
        const styles = Styles.getSheet(this.state.isRTL);
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        return (
            <View>
                <ButtonBottom
                    onPressReadNow={() => navigate('ReadPdf', {data: item.book_file_url})}
                    download={() => this.saveDownloadData()}
                />
            </View>
        );
    };

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        // const item = this.props.navigation.state.params.item;
        const {data} = this.props;
        console.log('data ebook' + JSON.stringify(data));
        const image = `${Constant.images}`;
        return (
            <View style={styles.container}>
                {/*<HeaderComponent*/}
                {/*    iconRightStyle={{fontSize: 22}}*/}
                {/*    iconLeft='ios-arrow-back'*/}
                {/*    left='back'*/}
                {/*    typeIconRight='FontAwesome'*/}
                {/*    title={Locales.Detail_EBook}*/}
                {/*    iconRight='heart-o'*/}
                {/*    onPressLeft={() => navigation.goBack()}*/}
                {/*/>*/}
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList data={data} renderItem={this.renderItem}/>
                    </View>
                </ScrollView>
                <View style={styles.viewButtonBottom}>
                    <FlatList data={data} renderItem={this.renderItem2}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
    };
}

export default connect(mapStateToProps, {getDetail})(Infor);

