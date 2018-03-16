import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default class NewUser extends Component {
    constructor(props){
        super(props);
        this.state = {name: ''};
    }

    _handleButtonPress = () => {
        console.log('Submit')
        console.log(this._name + this._mail + this._description + this._imageUrl)
    }

    render() {
        return (
            <View>
                <Text>Create a new user</Text>

                {/* name */}
                <TextInput onChangeText={text => this._name = text} placeholder="username"></TextInput>

                {/* email */}
                <TextInput onChangeText={text => this._mail = text} placeholder="e-mail"></TextInput>

                {/* description */}
                <TextInput onChangeText={text => this._description = text} placeholder="description"></TextInput>

                {/* imageUrl */}
                <TextInput onChangeText={text => this._imageUrl = text} placeholder="imageUrl"></TextInput>

                <Button
                    color='#FABA30'
                    icon={{name: 'check'}}
                    title='SUBMIT'
                    onPress={() => this._handleButtonPress()} />
                
            </View>
        );
    }
}