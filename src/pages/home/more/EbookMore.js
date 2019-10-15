import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'native-base';
import {ThemeConstants} from '../../../cores/theme/Theme';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import Locales from '../../../cores/languages/languages';
import {setWidth} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import FastImage from 'react-native-fast-image';
import {horizontalView, marginRight10, marginTop10, marginTop20, rowView} from '../../../cores/styles/styleView';
import {connect} from 'react-redux';
import {getDataHome, getSubCategory} from '../../../redux/actions/productAction';
import {darkMode} from '../../../redux/actions/settingAction';
import {colors} from '../../../cores/styles/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {text13, texts} from '../../../cores/viewComponents/text/texts';
import Styles from '../../search/styles/Styles';
import Constant from '../../../utils/Constant_Api';
import HeaderComponent from '../../headerComponent/HeaderComponent';

class EbookMore extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                }}
            />
        );
    };

    async componentDidMount(): void {
        // this.setState({
        //     data: api.data,
        // })
        this.props.getDataHome();
        // this.changeStyle();
    }

    render() {
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        const image = `${Constant.images}`;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        const {getdatahome, isFetching} = this.props;
        console.log('dataLog  ' + JSON.stringify(getdatahome));
        return (
            <View style={[styles.container,{backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    left='back'
                    onPressLeft={() => navigation.goBack()}
                    title={Locales.New}/>
                <ScrollView>
                    <View style={styles.flat}>
                        <FlatList
                            data={getdatahome.featured_books || []}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            //Item Separator View
                            renderItem={({item}) => (
                                // Single Comes here which will be repeatative for the FlatListItems
                                <TouchableOpacity
                                    onPress={() => navigate('Details', {data: item})}
                                    style={styles.item}>
                                    <View style={styles.shadow}>
                                        <FastImage style={[styles.imageItem]}
                                                   source={{uri: `${image}${item.book_cover_img}`}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent numberOfLines={2}
                                                       style={[styles.text, {color: ThemeConstants[theme].textColor}]}>{item.book_title}</TextComponent>
                                        <View style={styles.horizontal}>
                                            <TextComponent
                                                style={[styles.textAuthor, {...marginTop10}]}>{item.author_name}</TextComponent>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            enableEmptySections={true}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            </View>


        );
    }
}

function mapStateToProps(state) {
    return {
        isDarkTheme: state.settingReducers.currentValue,
        getdatahome: state.productReducers.gethome,
        isFetching: state.productReducers.isFetching,
    };
}

export default connect(mapStateToProps, {getDataHome, darkMode})(EbookMore);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    flat: {
        width: setWidth('93%'),
    },
    item: {
        ...rowView,
        paddingHorizontal: setWidth('3%'),
        marginTop: setWidth('3%'),
        width: wp('95%'),
        flexDirection: 'row',
    },
    imageItem: {
        width: wp('18%'),
        height: wp('18%'),
        borderRadius: 15,
        elevation: 5,
        ...marginRight10,
    },
    viewText: {
        // textAlign: isRTL ? 'left' : 'right',
        width: wp('60%'),
        // backgroundColor:'red'
    },
    horizontal: {
        ...horizontalView,
        width: wp('60%'),
    },
    row: {
        ...rowView,
    },
    textAuthor: {
        marginTop: 5,
        ...text13,
        color: colors.color_text_second,
        paddingRight: 5,
    },
    text: {
        // ...marginTop20,
        ...texts,
        // color: colors.purple,
        width: wp('60%'),

    },
    texttag: {
        ...text13,
        ...marginTop20,
        // color: colors.purple
    },
});
