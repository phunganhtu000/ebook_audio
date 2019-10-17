import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Styles from '../../details/styles/style';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import Locales from '../../../cores/languages/languages';
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Constant from '../../../utils/Constant_Api';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';
import {darkMode} from '../../../redux/actions/settingAction';
import {ThemeConstants} from '../../../cores/theme/Theme';

class AudioBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isRTL:''
        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
    }

    render() {
        const image = `${Constant.images}`;
        const styles = Styles.getSheet(this.state.isRTL);
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewMagin10}>
                            <TextComponent style={styles.type}>{Locales.details}</TextComponent>
                            <TextComponent
                                style={[styles.title, {color: ThemeConstants[theme].textColor}]}>{this.props.data[0].book_title}</TextComponent>
                            <View style={[styles.time, styles.horizontal]}>
                                <TextComponent style={styles.textTime}>Published from istudio</TextComponent>
                                <TextComponent style={styles.textTime}>{this.props.data[0].author_name}</TextComponent>
                            </View>
                        </View>
                        <View style={styles.viewDetail}>
                            <View style={styles.borderImage}>
                                <FastImage style={styles.image}
                                           source={{uri: `${image}${this.props.data[0].book_cover_img}`}}/>

                                {/*<View style={styles.viewPlay}>*/}
                                {/*    <View style={styles.btnInfo}>*/}
                                {/*        <Icon name='information-outline' type='MaterialCommunityIcons'*/}
                                {/*              style={styles.iconWhite}/>*/}
                                {/*    </View>*/}
                                {/*    <View style={styles.btnPlay}>*/}
                                {/*        <Icon name='control-play' type='SimpleLineIcons'*/}
                                {/*              style={[styles.iconWhite, {fontSize: 18}]}/>*/}
                                {/*        <TextComponent style={styles.textPlay}>Audio Book</TextComponent>*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                            </View>
                        </View>
                        <View style={[styles.marginTop30, styles.viewMagin10]}>
                            <View style={styles.row}>
                                <TextComponent
                                    style={[styles.textReview, {color: ThemeConstants[theme].textColor}]}>{this.props.data[0].rate_avg}</TextComponent>
                                <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                                    <RatingBar
                                        disabled={false}
                                        maxStars={5}
                                        // selectedStar={(rating)=>this.onStarRatingPress(rating)}
                                        rating={this.props.data[0].rate_avg}
                                        starSize={25}
                                        fullStarColor={colors.orange}/>
                                </View>
                            </View>
                            <View style={styles.marginTop10}>
                                <TextComponent style={styles.textTime}>982 Rating on Google Play</TextComponent>
                            </View>
                            <View style={[styles.marginTop30]}>
                                <HTML baseFontStyle={{color: ThemeConstants[theme].textColor}}
                                      html={this.props.data[0].book_description} style={styles.text}/>
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

        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {darkMode})(AudioBook);
