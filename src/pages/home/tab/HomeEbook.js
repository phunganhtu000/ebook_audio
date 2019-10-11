import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image, ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {
    getDataOfflineMode,
    inValidateText,
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import {colors} from '../../../cores/styles/colors';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import constants from '../../../assets/constants';
import Styles from '../styles/styleEbook';
import Styles_Two from '../styles/styleEbook_two';
import styles_three from '../styles/styleEbook_three';
import Locales from '../../../cores/languages/languages';
import {connect} from 'react-redux';
import {getDataHome} from '../../../redux/actions/productAction';
import Constant from '../../../utils/Constant_Api';
import {Icon} from 'native-base';
import {Card} from 'react-native-paper';
import {darkMode} from '../../../redux/actions/settingAction';
import {ThemeConstants} from '../../../cores/theme/Theme';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = setWidth('45%');
const {width} = Dimensions.get('window');

class HomeEbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: []
            sliderIndex: 0,
            maxSlider: 2,
            starCount: 4.5,
            styles: Styles.getSheet(false),
            isLoading: true,
        };
    }

    setRef = (c) => {
        this.listRef = c;
    };

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({index, animated});
    };

    componentWillMount() {
        setInterval(function () {
            const {sliderIndex, maxSlider} = this.state;
            let nextIndex = 0;

            if (sliderIndex < maxSlider) {
                nextIndex = sliderIndex + 1;
            }

            this.scrollToIndex(nextIndex, true);
            this.setState({sliderIndex: nextIndex});
        }.bind(this), 3000);
    }

    async componentDidMount(): void {
        // this.setState({
        //     data: api.data,
        // })
        this.props.getDataHome();
        // this.changeStyle();
    }


    _renderItem({item, index}) {
        const image = `${Constant.images}`;
        const styles = this.state.styles;
        console.log('styles :' + JSON.stringify(styles));
        const {navigate} = this.props.navigation;
        return (
            <FastImage style={{width: BannerWidth, height: BannerHeight}}
                       source={{uri: `${image}${item.book_cover_img}`}}/>
        );
    }

    // async changeStyle() {
    //     const rtl = await getDataOfflineMode(constants.isRTL);
    //     this.setState({
    //         isRTL: rtl,
    //     });
    //     const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
    //     // switch (change_style) {
    //     //     case constants.STYLE_BORDER:
    //     //         this.setState(
    //     //             {styles:styles})
    //     //     case constants.STYLE_BOX_SHADOW:
    //     //         this.setState(
    //     //             {styles:styles_three})
    //     //     case constants.STYLE_NON_BORDER:
    //     //         this.setState(
    //     //             {styles:styles_two})
    //     //     case constants.STYLE_NON_LINED:
    //     //         this.setState(
    //     //             {styles:styles_four})
    //     // }
    //
    //     this.setState({
    //         changeStyle: change_style,
    //     }, () => {
    //         if (inValidateText(change_style)) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL),
    //             });
    //
    //
    //         } else if (this.state.changeStyle === 0) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL),
    //             });
    //         } else if (this.state.changeStyle === 1) {
    //             this.setState({
    //                 styles: Styles_Two.getSheet(this.state.isRTL),
    //             });
    //         } else if (this.state.changeStyle === 2) {
    //             this.setState({
    //                 styles: styles_three.getSheet(this.state.isRTL),
    //             });
    //         } else if (this.state.changeStyle === 3) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL),
    //             });
    //         }
    //
    //     }, console.log('change_style :' + change_style));
    //     this.setState({
    //         // styles: getStyleType()
    //     });
    // }


    render() {
        // if (this.state.isLoading) {
        //     const styles = this.state.styles
        //     console.log("styles :" + JSON.stringify(styles));
        //     return (
        //         <View style={styles.container}>
        //             <ActivityIndicator/>
        //         </View>
        //     );
        // }
        const image = `${Constant.images}`;
        const styles = this.state.styles;
        // console.log('styles :' + JSON.stringify(styles));
        const data = this.props.data;
        // const column1Data = data.filter((item, i) => i % 2 === 0);
        // const column2Data = data.filter((item, i) => i % 2 === 1);
        const {navigate} = this.props.navigation;
        const {getdatahome, isFetching} = this.props;
        console.log('getdatahome :' + JSON.stringify(getdatahome));
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>

                <ScrollView>
                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <FlatList
                            ref={this.setRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            keyExtractor={item => item.id}
                            data={getdatahome.popular_books || []}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => navigate('Ebook', {
                                    data: item,
                                })}>
                                    <FastImage style={{width: BannerWidth, height: BannerHeight}}
                                               source={{uri: `${image}${item.book_cover_img}`}}/>
                                </TouchableOpacity>
                            )}
                            onMomentumScrollEnd={(event) => {
                                let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x / width : 0;
                                this.setState({sliderIndex});
                            }}
                        />
                    </ScrollView>
                    <View style={styles.body}>
                        <View style={styles.itemHeader}>
                            <TextComponent style={[styles.title, {color: ThemeConstants[theme].textColor,fontSize: 20}]}>{Locales.New}</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                           style={[styles.textMin, {fontSize: 15}]}>{Locales.More}</TextComponent>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            // data={data}
                            data={getdatahome.featured_books || []}
                            renderItem={({item}) => (
                                <Card onPress={() => navigate('Details', {
                                    data: item,
                                })}
                                      style={[styles.topSing, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                                    <FastImage style={styles.imageSinger}
                                               source={{uri: `${image}${item.book_cover_img}`}}/>
                                    <View style={{padding: 5}}>
                                        <View style={{height: setWidth('18%')}}>
                                            <TextComponent numberOfLines={2}
                                                           style={[styles.title, {
                                                               color: ThemeConstants[theme].textColor,
                                                               marginTop: 5,
                                                           }]}>{item.book_title}</TextComponent>
                                            <TextComponent
                                                style={[styles.txtDes]}>{item.author_name}</TextComponent>
                                        </View>
                                        <View style={styles.rate}>
                                            <RatingBar
                                                disabled={false}
                                                maxStars={5}
                                                // selectedStar={(rating)=>this.onStarRatingPress(rating)}
                                                rating={item.rate_avg}
                                                starSize={12}
                                                fullStarColor={colors.orange}/>
                                        </View>
                                    </View>
                                </Card>
                            )}/>
                        <View style={[styles.itemHeader, {marginTop: 20}]}>
                            <TextComponent style={[styles.title, {color: ThemeConstants[theme].textColor,fontSize: 20}]}>{Locales.PopularBook}</TextComponent>
                            <TextComponent onPress={() => navigate('ListItem', {item: this.state.today})}
                                           style={[styles.textMin, {fontSize: 15}]}>{Locales.More}</TextComponent>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            // data={data}
                            data={getdatahome.popular_books || []}
                            renderItem={({item}) => (
                                <Card onPress={() => navigate('Details', {data: item})}
                                      style={[styles.topSing, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                                    <FastImage style={styles.imageSinger}
                                               source={{uri: `${image}${item.book_cover_img}`}}/>
                                    <View style={{padding: 5}}>
                                        <View style={{height: setWidth('18%')}}>
                                            <TextComponent
                                                style={[styles.title, {
                                                    color: ThemeConstants[theme].textColor,
                                                    marginTop: 5,
                                                }]}>{item.book_title}</TextComponent>
                                            <TextComponent
                                                style={[styles.txtDes]}>{item.author_name}</TextComponent>
                                        </View>
                                        <View style={styles.rate}>
                                            <RatingBar
                                                disabled={false}
                                                maxStars={5}
                                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                rating={item.rate_avg}
                                                starSize={12}
                                                fullStarColor={colors.orange}/>
                                        </View>
                                    </View>
                                </Card>
                            )}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        getdatahome: state.productReducers.gethome,
        isFetching: state.productReducers.isFetching,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getDataHome, darkMode})(HomeEbook);
