import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

@withNavigation
export default class RepoList extends Component {


    static navigationOptions = {title: 'List'};

    _onPressRow = (rowData) => {
        this.props.navigation.navigate('Detail', {id: rowData.node.id})
    }

    /**
     * Render a row
     * @param {object} rowData 
     */
    _renderRowView(rowData) {
        return (<View>
                <TouchableHighlight style={styles.row} 
                    underlayColor='#EEE'
                    onPress={() => this._onPressRow(rowData)}>
                    <Text>{rowData.node.description}</Text>
                </TouchableHighlight>
                <View style={styles.line} />
                </View>)
    }

    render() {
        this.navigation = this.props.navigation;

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
  row: {
    padding: 10,
    height: 44
  },
  line: {
    backgroundColor:'#CCC',
    height: 1
  },
})