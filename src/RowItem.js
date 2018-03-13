import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

export default class RowItem extends Component {

    // Navigate to node detail when component is pressed
    _onPress = (data) => {
        this.props.navigation.navigate('Detail', {id: data.node.id})
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
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        padding: 10,
        height: 120,
        borderColor: '#000',
        marginVertical: 20,
        marginHorizontal: 35,
        backgroundColor: '#FFF',
        shadowOpacity: 0.15,
        shadowColor: '#000',
        shadowOffset: {
            width: -10,
            heigth: -10
        }
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
        fontWeight: '800',
        color: '#508FF2',
    },
})