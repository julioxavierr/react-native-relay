import React from 'react';
import { StyleSheet, FlatList, View, Text} from 'react-native';

export default class App extends React.Component {

  /**
   * Render a row
   * @param {object} rowData 
   */
  _renderRowView(rowData) {
    return <Text style={styles.item}>{rowData.node.description}</Text>
  }
  
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
        <View style={styles.navbar}/>
        <FlatList
          data={mockData}
          keyExtractor={(item) => item.node.id}
          renderItem={({item}) => this._renderRowView(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  },
  navbar: {
    height: 64,
    backgroundColor: '#51103D'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})