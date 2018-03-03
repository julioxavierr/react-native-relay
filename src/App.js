import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserList from './UserList';
import User from './User';

RootStack = StackNavigator(
    {
        List: {screen: UserList},
        Detail: {screen: User}
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