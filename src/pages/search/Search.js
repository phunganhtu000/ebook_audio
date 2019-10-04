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
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            input: false,
            newSearch: [],
            dataSource: [],
            check: null,
            address: '',
            color: colors.white,
            nameStreet: [],
            ModalVisibleStatus: false,
        }

    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState(
            {
                nameStreet: api.banner,
                dataSource: api.banner,
                isRTL: rtl
            }
        )
    }


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
        const newData = this.state.nameStreet.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search: text,
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
        const styles = Styles.getSheet(this.state.isRTL)
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
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
                                                   source={{uri: item.image}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent style={styles.text}>{item.title}</TextComponent>
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


