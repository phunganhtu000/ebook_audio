import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screen1/home/Home';
import Detail from '../screen1/detail/Detail';

import {View, Text, Image, StyleSheet} from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    NavigationActions,
    TabNavigator,
} from 'react-navigation';
import Menu from '../pages/menu/Menu';
import Details from '../pages/details/Details';
import NewsDetails from '../pages/news/News_Details';
// import EpubReader from '../pages/epub/Epub';
import Setting from '../pages/setting/Setting';
import SplashScreen from '../pages/splashscreen/SplashScreen';
import VideoPlayerTV from '../pages/video/VideoPlay';
import Downloads from '../pages/downloads/Downloads';
import Search from '../pages/search/Search';
import AllItem from '../pages/category/AllItem';
import ListItem from '../pages/music/ListItem';
import Singer from '../pages/music/Singer';
import VideoPlayerFull from '../pages/video/VideoPlayFull';
import Detail_Ebook_Two from '../pages/ebook/Detail_Ebook_Two';
import ChangeStyle from '../pages/setting/ChangeStyle';
import ChangeTheme from '../pages/setting/ChangeTheme';
import Comment from '../pages/video/tabTV/Comment';
import PlayRadio from '../pages/radio/Radio';
import WebViewComponent from '../pages/webView/WebView';
import ReadPdf from '../screen1/detail/ReadPdf';
import Infor from '../pages/ebook/tabEbook/Infor';

const Routes = createStackNavigator({
    // Home: {
    //     screen: Home,
    // },
    // Detail: {
    //     screen: Detail,
    // },

    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        },
    },

    Menu: {
        screen: Menu,
        navigationOptions: {
            header: null,
        },
    },
    Comment: {
        screen: Comment,
        navigationOptions: {
            header: null,
        },
    },
    ChangeTheme: {
        screen: ChangeTheme,
        navigationOptions: {
            header: null,
        },
    },
    AllItem: {
        screen: AllItem,
        navigationOptions: {
            header: null,
        },
    },
    Singer: {
        screen: Singer,
        navigationOptions: {
            header: null,
        },
    },
    ListItem: {
        screen: ListItem,
        navigationOptions: {
            header: null,
        },
    },
    Details: {
        screen: Details,
        navigationOptions: {
            header: null,
        },
    },
    NewsDetails: {
        screen: NewsDetails,
        navigationOptions: {
            header: null,
        },
    },
    // EpubReader: {
    //         screen: EpubReader,
    //         navigationOptions: {
    //             header: null,
    //         },
    //     },
    Setting: {
        screen: Setting,
        navigationOptions: {
            header: null,
        },
    },
    VideoPlayerTV: {
        screen: VideoPlayerTV,
        navigationOptions: {
            header: null,
        },
    },
    VideoPlayerFull: {
        screen: VideoPlayerFull,
        navigationOptions: {
            header: null,
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        },
    },
    Detail_Ebook_Two: {
        screen: Detail_Ebook_Two,
        navigationOptions: {
            header: null,
        },
    },
    ChangeStyle: {
        screen: ChangeStyle,
        navigationOptions: {
            header: null,
        },
    },
    Downloads: {
        screen: Downloads,
        navigationOptions: {
            header: null,
        },
    },
    PlayRadio: {
        screen: PlayRadio,
        navigationOptions: {
            header: null,
        },
    },
    WebViewComponent: {
        screen: WebViewComponent,
        navigationOptions: {
            header: null,
        },
    },
    Infor: {
        screen: Infor,
        navigationOptions: {
            header: null,
        },
    },
    ReadPdf: {
        screen: ReadPdf,
    },
});
const AppStack = createAppContainer(Routes);

class RoutesApp extends Component {
    render() {
        return (
            <AppStack/>
        );
    }
}

export default (RoutesApp);

