import React, {Component} from 'react';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import Locales from '../../assets/languages/languages';
import Styles from './styles/Styles';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import api from '../../api/offline/api';
import {
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    Modal,
    StatusBar,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../cores/styles/colors';
import Constant from '../../utils/Constant_Api';
import {connect} from 'react-redux';
import {getSubCategory} from '../../redux/actions/productAction';
import {darkMode} from '../../redux/actions/settingAction';
import {ThemeConstants} from '../../cores/theme/Theme';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataSource: [],
            input: false,
            check: null,
            address: '',
            color: colors.white,
            ModalVisibleStatus: false,
        };

    }

    // componentWillMount() {
    //     this.props.getSearch(this.state.search);
    // }


    onFocus() {
        this.setState({
            color: colors.iOSBlue,
        });
    }

    onBlur() {
        this.setState({
            color: colors.white,
        });
    }

    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };

    SearchFilterFunction(text) {
        this.setState({
            search: text,
        }, () => {
            this.fetchData(this.state.search);
        });
    }

    fetchData(text) {
        this.setState({text});
        const url = `${Constant.url}${Constant.searchApi}${this.state.search}`;
        console.log('ủrl' + url);
        fetch(url)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.EBOOK_APP,
                });
            })
            .catch((error) => {
                console.log(error);
            });
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

    render() {
        // const {data}=this.props;
        console.log('dataLog  ' + JSON.stringify(this.state.dataSource));
        const styles = Styles.getSheet(this.state.isRTL);
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        const image = `${Constant.images}`;
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <KeyboardAvoidingView style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}
                                  enabled>
                <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent/>
                <View style={styles.accBar}>
                    <TextInput
                        autoFocus={true}
                        round
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        placeholder={Locales.TypeHere}
                        placeholderTextColor={ThemeConstants[theme].textColor}
                        value={this.state.search}
                        style={[styles.input, {
                            backgroundColor: ThemeConstants[theme].backgroundCard,
                            color: ThemeConstants[theme].textColor,
                        }]}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.filter}>
                        <Text style={[styles.txtBar, {color: colors.iOSBlue, fontSize: 15}]}>{Locales.Cancel}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.flat}>
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            //Item Separator View
                            renderItem={({item}) => (
                                // Single Comes here which will be repeatative for the FlatListItems
                                <TouchableOpacity
                                    onPress={() => navigate('Details', {item: item})}
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
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {getSubCategory, darkMode})(Search);


