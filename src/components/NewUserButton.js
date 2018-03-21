import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';

export default class NewUserButton extends Component {

    _onPress = (navigation) => {
        navigation.navigate('New', {});
    }

    render() {
        return (
            <Touchable onPress={() => this._onPress(this.props.navigation)}>
                <ButtonText>New user</ButtonText>
            </Touchable>
        )
    }

}

const Touchable = styled.TouchableHighlight`
    flex: 0.1;
    backgroundColor: #AEB0B2;
    alignItems: center;
    justifyContent: center;
    paddingHorizontal: 10;
    paddingVertical: 10;
`

const ButtonText = styled.Text`
    fontSize: 30;
    color: #FFF;
`