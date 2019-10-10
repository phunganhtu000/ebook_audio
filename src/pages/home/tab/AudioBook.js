import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import {Icon} from 'native-base';
import Carousel from '../../../cores/viewComponents/slideShow';
import {
    getDataOfflineMode,
    inValidateText,
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = setWidth('45%');
const {width} = Dimensions.get('window');
import Styles from '../styles/styles';
import {connect} from 'react-redux';
import {getSubCategory} from '../../../redux/actions/productAction';
import Constant from '../../../utils/Constant_Api';
import {darkMode} from '../../../redux/actions/settingAction';
import {ThemeConstants} from '../../../cores/theme/Theme';

class AudioBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: Styles.getSheet(false),
            sliderIndex: 0,
            maxSlider: 2,
            starCount: 4.5,
        };

    }

    setRef = (c) => {
        this.listRef = c;
    };

    scrollToIndex = (index, animated) => {
        this.listRef && this.listRef.scrollToIndex({index, animated});
    };


    componentWillMount() {
        this.props.getSubCategory(12);
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

    renderPage(image, index) {
        return (
            <View key={index}>
                <FastImage style={{width: BannerWidth, height: BannerHeight}} source={{uri: image}}/>
            </View>
        );
    }

    // async changeStyle() {
    //     const rtl = await getDataOfflineMode(constants.isRTL)
    //     this.setState({
    //         isRTL: rtl
    //     })
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
    //         changeStyle: change_style
    //     }, () => {
    //         if (inValidateText(change_style)) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL)
    //             })
    //
    //
    //         } else if (this.state.changeStyle === 0) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL)
    //             })
    //         } else if (this.state.changeStyle === 1) {
    //             this.setState({
    //                 styles: Styles_Two.getSheet(this.state.isRTL)
    //             })
    //         } else if (this.state.changeStyle === 2) {
    //             this.setState({
    //                 styles: styles_three.getSheet(this.state.isRTL)
    //             })
    //         } else if (this.state.changeStyle === 3) {
    //             this.setState({
    //                 styles: Styles.getSheet(this.state.isRTL)
    //             })
    //         }
    //
    //     }, console.log("change_style :" + change_style))
    //     this.setState({
    //         // styles: getStyleType()
    //     })
    // }

    render() {
        const image = `${Constant.images}`;
        const styles = this.state.styles;
        console.log('styles :' + JSON.stringify(styles));
        const {data} = this.props;
        const column1Data = data.filter((item, i) => i % 2 === 0);
        const column2Data = data.filter((item, i) => i % 2 === 1);
        const {navigate} = this.props.navigation;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container,{backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <ScrollView>
                    <FlatList
                        ref={this.setRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        keyExtractor={item => item.id}
                        data={data || []}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => navigate('Tab_AudioBook', {
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
                    <View style={styles.body}>
                        <View style={styles.itemView}>
                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column1Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => navigate('Tab_AudioBook', {data: item})}
                                            style={styles.item}>
                                            <Image style={styles.image}
                                                   source={{uri: `${image}${item.book_cover_img}`}}>
                                            </Image>
                                            <View style={styles.btnPlay}>
                                                <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column2Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => navigate('Tab_AudioBook', {data: item})}
                                            style={styles.item}>
                                            <FastImage
                                                style={[styles.imageItemTwo]}
                                                source={{uri: `${image}${item.book_cover_img}`}}>
                                                <View style={styles.btnPlay}>
                                                    <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>
                                                </View>
                                            </FastImage>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.sub_category,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory,darkMode})(AudioBook);
