import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserList from './scenes/UserList';
import User from './scenes/User';
import NewUser from './scenes/NewUser';

RootStack = StackNavigator(
    {
        List: {screen: UserList},
        Detail: {screen: User},
        New: {screen: NewUser},
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