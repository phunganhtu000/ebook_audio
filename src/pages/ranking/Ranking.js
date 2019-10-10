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
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import HeaderComponent from '../headerComponent/HeaderComponent';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import api from '../../api/offline/api';

const window = Dimensions.get('window').width;
import {
  getDataOfflineMode,
  inValidateText,
  setWidth,
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import {Icon} from 'native-base';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import Locales from '../../assets/languages/languages';
import constants from '../../assets/constants';
import Styles from './styles/styles';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';
import {getLatest} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';

class Ranking extends Component {
  constructor(props) {
    super();
    this.state = {
      styles: Styles.getSheet(false),
    };
    this._carousel = {};
  }

  componentDidMount() {
    this.props.getLatest();
    // this.changeStyle();
  }

  _renderItem({item, index}) {
    const {data} = this.props;
    const styles = this.state.styles;
    const {navigate} = this.props.navigation;
    const image = `${Constant.images}`;
    return (
      <View style={[styles.ThumbnailBackgroundView, Platform.OS === 'ios' ? styles.shadow : null]}>

        <TouchableOpacity
          onPress={() => navigate('Details', {item: item})}
        >
          <FastImage style={[styles.CarouselImage, styles.shadow]} source={{uri: `${image}${item.book_cover_img}`}}/>
          {/*{item.type === 'book_audio' ? <View style={styles.btnPlay}>*/}
          {/*  <Icon name='play' type='FontAwesome5' style={styles.iconPlay}/>*/}
          {/*</View> : null}*/}
        </TouchableOpacity>

      </View>
    );
  }

  // async changeStyle() {
  //     const rtl = await getDataOfflineMode(constants.isRTL)
  //     this.setState({
  //         isRTL: rtl
  //     })
  //     const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
  //     // switch (change_style) {
  //     //     case constants.STYLE_BORDER:
  //     //         this.setState(
  //     //             {styles:styles})
  //     //     case constants.STYLE_BOX_SHADOW:
  //     //         this.setState(
  //     //             {styles:styles_three})
  //     //     case constants.STYLE_NON_BORDER:
  //     //         this.setState(
  //     //             {styles:styles_two})
  //     //     case constants.STYLE_NON_LINED:
  //     //         this.setState(
  //     //             {styles:styles_four})
  //     // }
  //
  //     this.setState({
  //         changeStyle: change_style
  //     }, () => {
  //         if (inValidateText(change_style)) {
  //             this.setState({
  //                 styles: Styles.getSheet(this.state.isRTL)
  //             })
  //
  //
  //         } else if (this.state.changeStyle === 0) {
  //             this.setState({
  //                 styles: Styles.getSheet(this.state.isRTL)
  //             })
  //         } else if (this.state.changeStyle === 1) {
  //             this.setState({
  //                 styles: Styles_Two.getSheet(this.state.isRTL)
  //             })
  //         } else if (this.state.changeStyle === 2) {
  //             this.setState({
  //                 styles: styles_three.getSheet(this.state.isRTL)
  //             })
  //         } else if (this.state.changeStyle === 3) {
  //             this.setState({
  //                 styles: Styles.getSheet(this.state.isRTL)
  //             })
  //         }
  //
  //     }, console.log("change_style :" + change_style))
  //     this.setState({
  //         // styles: getStyleType()
  //     })
  // }


  render() {
    const {data} = this.props;
    const styles = this.state.styles;
    // console.log('dataRank :' + JSON.stringify(data.EBOOK_APP.book_title));
    const {navigate} = this.props.navigation;
    const image = `${Constant.images}`;
    return (
      <View style={styles.container}>
        <HeaderComponent
          left='true'
          onPressRight={() => navigate('Search')}
          iconLeft='ios-menu'
          iconRight='ios-search'
          title={Locales.Ranking}/>
        <ScrollView>
          <View>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={data.EBOOK_APP}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={index => this.setState({activeSlide: index})}
              sliderWidth={window}
              itemWidth={200}
              layout={'default'}
              firstItem={1}
              loop={true}
              loopClonesPerSide={1}
              autoplay={true}
              autoplayDelay={0}
              autoplayInterval={5000}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.e_book}>
              <TextComponent style={styles.type}>{Locales.Top}</TextComponent>
              <FlatList
                // horizontal
                // numColumns={2}
                data={data.EBOOK_APP}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => navigate('Details', {data: item})}
                    style={styles.item}>
                    <View style={styles.viewId}>
                      <TextComponent>{index + 1}</TextComponent>
                    </View>
                    <View style={styles.shadow}>
                      <FastImage style={[styles.imageItem]}
                                 source={{uri: `${image}${item.book_cover_img}`}}/>
                    </View>
                    <View style={styles.viewText}>
                      <TextComponent style={styles.text}>{item.book_title}</TextComponent>
                      <TextComponent
                        style={[styles.textAuthor, {...marginTop10}]}>{item.category_name}</TextComponent>
                      <TextComponent
                        style={[styles.texttag, {...marginTop10}]}>{item.author_name}</TextComponent>
                      {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                    </View>
                  </TouchableOpacity>
                )}/>

            </View>
            <View style={styles.book_audio}>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.productReducers.latest,
    isFetching: state.productReducers.isFetching,
  };
}

export default connect(mapStateToProps, {getLatest})(Ranking);
