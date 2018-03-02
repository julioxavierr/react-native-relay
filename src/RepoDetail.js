import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class RepoDetail extends Component {


    static navigationOptions = {title: 'Detail'};

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.navigation.state.params.id}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  }
})