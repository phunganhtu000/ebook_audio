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
import LinearGradient from 'react-native-linear-gradient';
import Locales from '../../cores/languages/languages';
import Styles from './styles/styles';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';
import {connect} from 'react-redux';
import {getCategory} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Category extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            styles: Styles.getSheet(false),
        };
    }

    componentDidMount() {
        this.props.getCategory();
        // this.changeStyle();
    }

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
        const image = `${Constant.images}`;
        const color = [['#a18cd1', '#fbc2eb'], ['#d8e76a', '#eb9454'], ['#b2e874', '#48A9BE'], ['#78BEF0', '#6131A1'], ['#EA0386', '#ff9a9e'], ['#ff9a9e', '#fecfef']];
        const {category, isFetching} = this.props;
        const styles = this.state.styles;
        console.log('styles :' + JSON.stringify(styles));
        const {navigate} = this.props.navigation;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <HeaderComponent
                    left='true'
                    onPressRight={() => navigate('Search')}
                    iconLeft='ios-menu'
                    iconRight='ios-search'
                    title={Locales.Category}/>
                <ScrollView>

                    <View style={styles.body}>
                        {isFetching == true ?
                            <FlatList
                                data={category}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('AllItem', {data: item});
                                        }}
                                        style={styles.tou}>
                                        <LinearGradient
                                            start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                            colors={color[index % color.length]}
                                            style={styles.opacity}>
                                            <Text style={styles.name}>{item.category_name}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                }
                                numColumns={2}
                                keyExtractor={(item, index) => item.id}
                            /> : null}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        category: state.productReducers.category,
        isFetching: state.productReducers.isFetching,
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getCategory, darkMode})(Category);
