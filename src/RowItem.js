import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

export default class RowItem extends Component {

    _onPress = (data) => {
        this.props.navigation.navigate('Detail', {id: data.node.__id})
    }

    render() {
        const data = this.props.data;
        return (
        <TouchableHighlight style={styles.row} 
            underlayColor='#EEE'
            onPress={() => this._onPress(data)}>
            <View style={styles.rowView}>
                <Text style={styles.rowText} adjustsFontSizeToFit={true}>{data.node.name}</Text>
                <Image source={require('./assets/arrow.png')}/>
            </View>
        </TouchableHighlight>);
    }

}

const styles = StyleSheet.create({
    row: {
      padding: 10,
      height: 100,
      borderColor: '#000',
      marginVertical: 20,
      marginHorizontal: 35,
      backgroundColor: '#FFF',
    },
    rowView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowText: {
      flex: 1,
      width: 250,
      height: 80,
      fontSize: 30,
      textAlign: 'left',
      fontWeight: '400',
      color: '#FF086D',
    },
  })