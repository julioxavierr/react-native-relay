import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

export default class RowItem extends Component {

    _onPress = (data) => {
        console.log(data);
    }

    render() {
        return (
        <TouchableHighlight style={styles.row} 
            underlayColor='#EEE'
            onPress={() => this._onPress(this.props.data)}>
            <View style={styles.rowView}>
                <Text style={styles.rowText} adjustsFontSizeToFit={true}>Some Text</Text>
                <Image source={require('../../../src/assets/arrow.png')}/>
            </View>
        </TouchableHighlight>);
    }

}

RowItem.defaultProps = {
    navigation: null,
    data: null,
};
  
RowItem.propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
};

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
});