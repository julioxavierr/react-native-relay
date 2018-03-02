import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class PostDetail extends Component {


    static navigationOptions = {title: 'Detail'};

    render() {
        return (
            <Text>I'm a detail screen</Text>
        );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  }
})