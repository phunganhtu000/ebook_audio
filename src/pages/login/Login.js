import React, {Component} from 'react';
//import react in our code.
import {Text, Image, View, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import FastImage from 'react-native-fast-image'
import {setHeight, setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import Locales from "../../cores/languages/languages";
import {colors} from '../../cores/styles/colors'
import {Icon} from 'native-base'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <SafeAreaView style={styles.saf}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <FastImage source={{uri: 'https://i.imgur.com/LjxUURl.jpg'}} style={styles.image}/>
            </View>
            <View style={styles.body}>
              <TextInput
                style={styles.textInput}
                placeholder='UserName'/>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder='Password'/>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Menu')}
                style={[styles.tologin, {backgroundColor: '#0099FF'}]}>
                <TextComponent style={styles.textLogin}>Login</TextComponent>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('SignUp')}
                style={[styles.tologin, {backgroundColor: '#0099FF'}]}>
                <TextComponent style={styles.textLogin}>SignUp</TextComponent>
              </TouchableOpacity>
              <TextComponent style={styles.textOr}>Forgot the password?</TextComponent>
            </View>
          </View>
          <View style={styles.viewBottom}>
            <Icon name='facebook' type='Entypo' style={styles.icon}/>
            <TextComponent>Sign in with Facebook</TextComponent>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  saf: {flex: 1},
  container: {
    flex: 1,
    height: setHeight('90%')
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: setWidth('10%'),
    paddingHorizontal: setWidth('20%'),
    height: setHeight('20%')
  },
  image: {
    width: setWidth('25%'),
    height: setWidth('25%'),
    borderRadius: setWidth('30%'),
  },
  body: {
    paddingHorizontal: setWidth('8%'),
  },
  textInput: {
    width: setWidth('84%'),
    paddingLeft: setWidth('3%'),
    height: setWidth('11%'),
    borderRadius: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginTop: setWidth('5%')
  },
  tologin: {
    width: setWidth('84%'),
    height: setWidth('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: setWidth('10%')
  },
  textLogin: {
    color: colors.white,
    fontSize: setWidth('4.2%')
  },
  icon: {
    color: 'gray',
    fontSize: setWidth('6.5%'),
    marginRight: setWidth('2%')
  },
  textOr: {
    fontSize: setWidth('4%'),
    textAlign: 'center',
    marginVertical: setWidth('7%')
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: 'red',
    //   position: 'absolute',
    // width: setWidth('46%'),
    // bottom: setWidth('5%'),
    // left:setWidth('27%'),
  }
})
