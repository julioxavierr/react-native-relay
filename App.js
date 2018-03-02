import React from 'react';
import { StyleSheet, FlatList, View, Text} from 'react-native';

export default class App extends React.Component {
  
  render() {
    mockData = [
      {
        node: {
          id: 1,
          description: 'Post 1'
        }
      },
      {
        node: {
          id: 2,
          description: 'Post 2'
        }
      }
    ];

    return (
      <View style={styles.container}>
        <FlatList
          data={mockData}
          keyExtractor={(item) => item.node.id}
          renderItem={({item}) => <Text style={styles.item}>{item.node.description}</Text>}
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