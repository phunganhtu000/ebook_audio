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
    ScrollView, ActivityIndicator
} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import Locales from '../../assets/languages/languages';
import {styles} from './styles/styles';
export default class Category extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            data: [
                {
                    _id: 1,
                    image: 'https://izdesigner.net/wp-content/uploads/2017/07/su-dung-nghe-thuat-trong-thiet-ke-website-min.jpg',
                    title: 'An Old Man is happy today,he doesn\'t complain',
                    type: 'book_audio'
                },
                {
                    _id: 2,
                    image: 'https://gotrangtri.vn/wp-content/uploads/2018/10/Tranh-nghe-thuat-dep-treo-tuong-phong-khach-GHS-6432-ava-400x600.jpg',
                    type: 'book',
                    title: 'An Old Man is happy today,he doesn\'t complain',
                },
                {
                    _id: 3,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTuSKjGefUpc34LD4ca0nC7s76wG6IU5Mf8__WbRXev_n0vA9',
                    title: 'An Old Man is happy today,he doesn\'t complain',
                    type: 'book_audio'

                },
                {
                    _id: 4,
                    image: 'http://thuvienngontinh.com/wp-content/uploads/2014/11/tich_mich.jpg',
                    title: 'An Old Man is happy today,he doesn\'t complain',
                    type: 'book'

                },
                // {
                //     _id: 5,
                //     image: 'https://izdesigner.net/wp-content/uploads/2017/07/su-dung-nghe-thuat-trong-thiet-ke-website-min.jpg',
                //     title: 'An Old Man is happy today,he doesn\'t complain',
                //     type: 'book_audio'
                // },
                // {
                //     _id: 6,
                //     image: 'https://gotrangtri.vn/wp-content/uploads/2018/10/Tranh-nghe-thuat-dep-treo-tuong-phong-khach-GHS-6432-ava-400x600.jpg',
                //     title: 'An Old Man is happy today,he doesn\'t complain',
                //     type: 'book'
                // },
                // {
                //     _id: 7,
                //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTuSKjGefUpc34LD4ca0nC7s76wG6IU5Mf8__WbRXev_n0vA9',
                //     title: 'An Old Man is happy today,he doesn\'t complain',
                //     type: 'book'
                //
                // },
                // {
                //     _id: 8,
                //     image: 'http://thuvienngontinh.com/wp-content/uploads/2014/11/tich_mich.jpg',
                //     title: 'An Old Man is happy today,he doesn\'t complain',
                //     type: 'book_audio'
                //
                // },
            ]
        };
    }

    componentDidMount() {
        return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d477de38333840c9b7f7704f764a7760')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.articles
                }, function () {
                    console.log("data:" + JSON.stringify(responseJson.articles))
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {

        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-menu'
                    iconRight='ios-search'
                    title={Locales.Category}/>
                <ScrollView>

                    <View style={styles.body}>
                        <TextComponent style={styles.type}>{Locales.NewBook}</TextComponent>
                        <FlatList
                            // horizontal
                            // numColumns={2}
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => navigate('Details',{item:item})}
                                    style={styles.item}>
                                    <View style={styles.viewId}>
                                        <TextComponent >{item._id}</TextComponent>
                                    </View>
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
                                            {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                        <View style={styles.e_book}>
                            <TextComponent style={styles.type}>{Locales.EBook}</TextComponent>
                            <FlatList
                                // horizontal
                                // numColumns={2}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => navigate('Details',{item:item})}
                                        style={styles.item}>
                                        <View style={styles.viewId}>
                                            <TextComponent >{item._id}</TextComponent>
                                        </View>
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
                                                {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                        </View>
                        <View style={styles.e_book}>
                            <TextComponent style={styles.type}>{Locales.AudioBook}</TextComponent>
                            <FlatList
                                // horizontal
                                // numColumns={2}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => navigate('Details',{item:item})}
                                        style={styles.item}>
                                        <View style={styles.viewId}>
                                            <TextComponent >{item._id}</TextComponent>
                                        </View>
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
                                                {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}/>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}
