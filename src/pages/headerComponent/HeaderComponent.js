import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import {colors} from '../../cores/styles/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Icon} from 'native-base';
import {getDataOfflineMode, setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Styles from './styles/styles';
import FastImage from 'react-native-fast-image';

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: colors.purple,
    };
  }

  async componentDidMount(): void {
    const rtl = await getDataOfflineMode(constants.isRTL);
    this.setState({
      isRTL: rtl,
    });
    const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
    this.setState({
      bg: backgroundColor,
    });
  }

  render() {
    const styles = Styles.getSheet(this.state.isRTL);
    const color = this.state.bg;
    return (
      <View
        style={[styles.container]}>
        <View style={[styles.body, styles.horizontal]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.props.onPressLeft}>
            {
              this.props.left == 'true' ? <FastImage style={{width: 35, height: 35, borderRadius: 35 / 2}}
                                                     source={{uri: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.15752-0/p280x280/70811049_329186837901756_8137241036092080128_n.png?_nc_cat=102&_nc_oc=AQl1n37N-QWfd-Qm1KQiQbi4k6Sf2bA1qQdZlpMC4iExNBItCa4anH1fDoCRKvcwPck&_nc_ht=scontent.fhan2-1.fna&oh=a78211620dc941fc1f039e61d6496f7a&oe=5E2D79EE'}}
                                                     resizeMode={FastImage.resizeMode.contain}/> : null
            }
            {
              this.props.left == 'back' ?
                <Icon name={this.props.iconLeft} type={this.props.typeIconLeft} style={[styles.icon]}/> : null
            }

          </TouchableOpacity>
          <View>
            <TextComponent style={[styles.title]} numberOfLines={1}>{this.props.title}</TextComponent>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.props.onPressRight}>
            <Icon name={this.props.iconRight} type={this.props.typeIconRight} style={[styles.icon,this.props.iconRightStyle]}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


