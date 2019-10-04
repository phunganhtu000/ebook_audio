import React, { Component } from 'react';

import {
    Platform,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated,
    Slider
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons'
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Styles from './styles/styleBottombar';



class BottomBar extends Component {
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

        Animated.sequence([
            timing( this.state.fadeAnim, {
                toValue: 1,
                duration: 20
            })
        ]).start();

        this.barsShown = true;
    }

    hide() {
        const timing = Animated.timing;

        Animated.sequence([
            timing( this.state.fadeAnim, {
                toValue: 0,
                duration: 20
            })
        ]).start();


        this.barsShown = false;
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        return (
            <Animated.View style={[styles.footer, { opacity: this.state.fadeAnim }]}>
                <Slider
                    style={styles.slider}
                    disabled={this.props.disabled}
                    value={this.props.value}
                    onSlidingComplete={this.props.onSlidingComplete} />
            </Animated.View>
        );
    }
}

export default BottomBar;

