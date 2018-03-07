import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

export default class UserList extends Component {


    static navigationOptions = {title: 'List'};

    mockData = {}
    render() {
        this.navigation = this.props.navigation;

        return (
            <View style={styles.container}>
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => this.props.RowItem}
            />
            </View>
        );
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#508FF2',
    justifyContent: 'center'
  },
})