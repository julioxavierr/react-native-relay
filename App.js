import React from 'react';
import { StyleSheet, FlatList, View, Text} from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Post1'},
            {key: 'Post2'},
            {key: 'Post3'},
            {key: 'Post4'},
            {key: 'Post5'},
            {key: 'Post6'},
            {key: 'Post7'},
            {key: 'Post8'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})