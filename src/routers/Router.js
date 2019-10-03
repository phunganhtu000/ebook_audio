import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screen/home/Home';
const Routes = createStackNavigator({
    Home:{
        screen:Home,
    }
})
const AppStack = createAppContainer(Routes);
class RoutesApp extends Component {
    render() {
        return (
            <AppStack/>
        )
    }
}
export default (RoutesApp)
