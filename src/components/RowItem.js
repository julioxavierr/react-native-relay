import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components'

export default class RowItem extends Component {

    // Navigate to node detail when component is pressed
    _onPress = (data) => {
        this.props.navigation.navigate('Detail', {id: data.node.id})
    }

    render() {
        const data = this.props.data;
        
        return (
            <Row underlayColor='#CCC' onPress={() => this._onPress(data)}>
                <RowView>
                    <Name adjustsFontSizeToFit={true}>{data.node.name}</Name>
                    <Image source={require('../assets/arrow.png')}/>
                </RowView>
            </Row>
        );
    }

}

const Row = styled.TouchableHighlight`
    paddingHorizontal: 10;
    paddingVertical: 15;
    height: 120;
    borderColor: #000;
    marginVertical: 20;
    marginHorizontal: 35;
    backgroundColor: #FFF;
    shadowOpacity: 0.8;
    shadowColor: #000;
`

const RowView = styled.View`
    flex: 1;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
`

const Name = styled.Text`
    flex: 1;
    width: 250;
    height: 80;
    fontSize: 30;
    textAlign: left;
    fontWeight: 800;
    color: #508FF2;
`