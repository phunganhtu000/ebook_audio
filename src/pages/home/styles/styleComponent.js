import React, {Component} from 'react';
import {styles} from './styles';
import {styles_two} from './style_two';
import {styles_three} from './style_three';
import {getDataOfflineMode, inValidateText} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';

export default class styleComponent extends Component {
    async componentDidMount(): void {
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);

        this.setState({
            changeStyle: change_style
        }, () => {
            if (inValidateText(this.state.changeStyle)) {
                this.setState({
                    styles: styles
                })
            } else if (this.state.changeStyle === 0) {
                this.setState({
                    styles: styles
                })
            } else if (this.state.changeStyle === 1) {
                this.setState({
                    styles: styles_two
                })
            } else if (this.state.changeStyle === 2) {
                this.setState({
                    styles: styles_three
                })
            } else if (this.state.changeStyle === 3) {
                this.setState({
                    styles: styles
                })
            }

        }, console.log("change_style :" + change_style))
    }

}
