// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

export default class NewUserButton extends Component {

    _onPress = (navigation) => {
        navigation.navigate('New', {});
    }

    render() {
        return (
            <TouchableHighlight style={style} onPress={() => this._onPress(this.props.navigation)}>
                    <Text style={{fontSize: 30, color: '#FFF'}}>New user</Text>
            </TouchableHighlight>
        )
    }

}

const style = {
    flex: 0.1,
    backgroundColor: '#aeb0b2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
};