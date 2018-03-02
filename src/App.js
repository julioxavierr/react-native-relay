import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RepoList from './RepoList';
import RepoDetail from './RepoDetail';

RootStack = StackNavigator(
    {
        List: {screen: RepoList},
        Detail: {screen: RepoDetail}
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