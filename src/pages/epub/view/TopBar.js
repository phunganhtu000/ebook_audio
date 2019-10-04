import React, {Component} from 'react';

import {
    Platform,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated,
    StatusBar
} from 'react-native';

import {Icon} from 'native-base'
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Styles from './styles/styleTopbar';


class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1),
        };


        this.barsShown = true;
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })
        setTimeout(() => {
            if (this.props.shown) {
                this.show();
            } else {
                this.hide();
            }
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.shown !== this.props.shown) {
            if (this.props.shown) {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    show() {
        const timing = Animated.timing;

        timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 20
        }).start();

        this.barsShown = true;
    }

    hide() {
        const timing = Animated.timing;

        timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 20
        }).start();


        this.barsShown = false;
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        return (
            <Animated.View style={[styles.header, {opacity: this.state.fadeAnim}]}>
                <TouchableOpacity style={styles.backButton}
                                  onPress={this.props.onback}
                >
                    <Icon name="ios-arrow-back" size={34}/>
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this.props.onRightButtonPressed}>
                    <Icon name="font-download" type='MaterialIcons' size={34}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={this.props.bookmark}>
                    <Icon name="bookmark-o" type='FontAwesome' size={34}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton}
                                  onPress={this.props.onMenuPressed}>
                    <Icon name="menu" size={34}/>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default TopBar;

