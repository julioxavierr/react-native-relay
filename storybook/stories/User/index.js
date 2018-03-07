import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, ImageBackground} from 'react-native';

export default class User extends Component {

    constructor(){
        super();
        this.state = {name: 'Storybook User', imageUrl: 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png', description: "I'm a storybook user"}
    }

    render() {
        const info = this.state
        return (
            <View style={styles.container}>
                <ImageBackground source={{uri: info.imageUrl}} style={styles.image}>
                    <View style={styles.insideView}>
                        <Text style={styles.insideText}>{info.name}</Text>
                    </View>
                </ImageBackground>
                <View style={{flex: 2, padding: 30}}>
                    <Text style={{fontWeight: '800', fontSize: 30, color: 'white', marginBottom: 20}}>Position:</Text>
                    <Text style={{fontWeight: '600', fontSize: 25, color: 'white'}}>{info.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#508FF2'
    },
    spinner: {
      flex: 1,
      justifyContent: 'center'
    },
    image: {
      flex: 3,
      justifyContent: 'flex-end',
    },
    insideView: {
      backgroundColor: 'rgba(256, 256, 256, 0.8)',
      padding: 20,
    },
    insideText: {
      fontSize: 40,
      textAlign: 'left',
      fontWeight: '800',
      color: '#508FF2',
    }
  
  });