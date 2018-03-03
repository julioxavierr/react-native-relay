import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PostList from './PostList';
import Post from './Post';

RootStack = StackNavigator(
    {
        List: {screen: PostList},
        Detail: {screen: Post}
    },
    {
        initialRouteName: 'List'
    }
);

export default class App extends Component {
    render() {
        return <RootStack/>;
    }
}