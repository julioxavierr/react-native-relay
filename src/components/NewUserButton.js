import React, { Component } from 'react';
import styled from 'styled-components';

export default class NewUserButton extends Component {
  _onPress = navigation => {
    navigation.navigate('New', {});
  };

  render() {
    return (
      <Touchable onPress={() => this._onPress(this.props.navigation)}>
        <ButtonText>New user</ButtonText>
      </Touchable>
    );
  }
}

const Touchable = styled.TouchableHighlight`
  flex: 0.1;
  background-color: #aeb0b2;
  align-items: center;
  justify-content: center;
  padding-horizontal: 10;
  padding-vertical: 10;
`;

const ButtonText = styled.Text`
  font-size: 30;
  color: #fff;
`;
