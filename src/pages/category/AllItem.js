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
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import Locales from '../../assets/languages/languages';
import Styles from './styles/styles';
import api from '../../api/offline/api';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';
import {connect} from 'react-redux';
import {getDetail, getSubCategory} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class AllItem extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            data: [],
            styles: Styles.getSheet(false),
        };
    }

    //
    // componentDidMount() {
    //   this.setState(
    //     {
    //       data: api.banner,
    //     },
    //   );
    //   this.changeStyle();
    // }
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
    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getSubCategory(data.cid);
    }

    render() {
        console.log('dataCate', JSON.stringify(data));
        const styles = this.state.styles;
        const name = this.props.navigation.state.params.data.category_name;
        const {data} = this.props;
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const image = `${Constant.images}`;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    onPressLeft={() => navigation.goBack()}
                    title={name}/>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            // horizontal
                            // numColumns={2}
                            data={data}
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
                                                   source={{uri: `${image}${item.book_cover_img}`}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent
                                            style={[styles.text, {color: ThemeConstants[theme].textColor}]}>{item.book_title}</TextComponent>
                                        <View style={styles.horizontal}>
                                            <View style={styles.row}>
                                                <TextComponent
                                                    style={[styles.textAuthor, {...marginTop10}]}>Published
                                                    from </TextComponent>
                                                <TextComponent
                                                    style={[styles.texttag, {
                                                        ...marginTop10,
                                                        color: ThemeConstants[theme].textColor,
                                                    }]}>{item.author_name}</TextComponent>
                                            </View>
                                            {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                        </View>
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
        data: state.productReducers.sub_category,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory, darkMode})(AllItem);
