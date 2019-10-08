import React, {Component} from 'react';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import FastImage from "react-native-fast-image";
import Locales from '../../assets/languages/languages';
import Styles from './styles/Styles';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import api from '../../api/offline/api'
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
    KeyboardAvoidingView
} from 'react-native';
import {colors} from '../../cores/styles/colors';
import Constant from '../../utils/Constant_Api';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataSource:[],
            input: false,
            check: null,
            address: '',
            color: colors.white,
            ModalVisibleStatus: false,
        }

    }

    // componentWillMount() {
    //     this.props.getSearch(this.state.search);
    // }


    onFocus() {
        this.setState({
            color: colors.iOSBlue
        })
    }

    onBlur() {
        this.setState({
            color: colors.white
        })
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
        },()=>{this.fetchData(this.state.search)});
    }
    fetchData(text) {
        this.setState({ text });
        const url = `${Constant.url}${Constant.searchApi}${this.state.search}`;
        console.log('ủrl'+url)
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
        console.log('dataLog  '+JSON.stringify(this.state.dataSource))
        const styles = Styles.getSheet(this.state.isRTL)
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        const image = `${Constant.images}`;
        return (
            <KeyboardAvoidingView style={styles.container}  enabled>
                <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent/>
                <View style={styles.accBar}>
                    <View style={styles.searchBar}>
                        <TextInput
                            autoFocus={true}
                            round
                            onChangeText={text => this.SearchFilterFunction(text)}
                            onClear={text => this.SearchFilterFunction('')}
                            placeholder={Locales.TypeHere}
                            value={this.state.search}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
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
                                        <TextComponent style={styles.text}>{item.book_title}</TextComponent>
                                        <View style={styles.horizontal}>
                                            <View style={styles.row}><TextComponent
                                                style={[styles.textAuthor, {...marginTop10}]}>Published
                                                from </TextComponent><TextComponent
                                                style={[styles.texttag, {...marginTop10}]}>istudio</TextComponent>
                                            </View>
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
// function mapStateToProps(state) {
//     return {
//         data: state.productReducers.search,
//         isFetching: state.productReducers.isFetching,
//     };
// }
//
// export default connect(mapStateToProps, {getSearch})(Search);


