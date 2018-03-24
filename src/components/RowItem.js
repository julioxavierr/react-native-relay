import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

export default class RowItem extends Component {
  // Navigate to node detail when component is pressed
  _onPress = data => {
    this.props.navigation.navigate('Detail', { id: data.node.id });
  };

  render() {
    const data = this.props.data;

    return (
      <Row underlayColor="#CCC" onPress={() => this._onPress(data)}>
        <RowView>
          <Name adjustsFontSizeToFit={true}>{data.node.name}</Name>
          <Image source={require('./assets/arrow.png')} />
        </RowView>
      </Row>
    );
  }
}

const Row = styled.TouchableHighlight`
  padding-horizontal: 10;
  padding-vertical: 15;
  height: 120;
  border-color: #000;
  margin-vertical: 20;
  margin-horizontal: 35;
  background-color: #fff;
  shadow-opacity: 0.8;
  shadow-color: #000;
`;

const RowView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Name = styled.Text`
  flex: 1;
  width: 250;
  height: 80;
  font-size: 30;
  text-align: left;
  font-weight: 800;
  color: #508ff2;
`;
