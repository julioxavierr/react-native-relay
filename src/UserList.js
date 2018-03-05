import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

@withNavigation
class UserList extends Component {


    static navigationOptions = {title: 'List'};

    _onPressRow = (rowData) => {
        this.props.navigation.navigate('Detail', {id: rowData.node.__id})
    }

    /**
     * Render a row
     * @param {object} rowData 
     */
    _renderRowView(rowData) {
        return (
                <TouchableHighlight style={styles.row} 
                    underlayColor='#EEE'
                    onPress={() => this._onPressRow(rowData)}>
                    <View style={styles.rowView}>
                        <Text style={styles.rowText} adjustsFontSizeToFit={true}>{rowData.node.name}</Text>
                        <Image source={require('./assets/arrow.png')}/>
                    </View>
                </TouchableHighlight>
                )
    }

    render() {
        this.navigation = this.props.navigation;

        return (
            <View style={styles.container}>
            <FlatList
                data={this.props.viewer.allUsers.edges}
                keyExtractor={(item) => item.node.__id}
                renderItem={({item}) => this._renderRowView(item)}
            />
            </View>
        );
    }
}

const UserListContainer = createFragmentContainer(UserList, graphql`
    fragment UserList_viewer on Viewer {
    allUsers(last: 100) @connection(key: "ListPage_allUsers", filters: []){
      edges {
        node {
        name
        ...User_user
        }
      }
    }
  }
`)

const UserListQueryRenderer = () => {
    return (<QueryRenderer environment={environment}
        query={graphql`
            query UserListQuery{
                viewer {
                    ...UserList_viewer
                }
            }
        `}
        render={({error, props}) => {
            if (error) {
                return <Text>Error...</Text>
            } else if (props) {
                return <UserListContainer viewer={props.viewer}/>
            } else {
                return (<Text>Loading...</Text>);
            }
        }}/>)
}

export default hoistStatics(UserListQueryRenderer, UserList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  navbar: {
    height: 64,
    backgroundColor: '#51103D'
  },
  row: {
    padding: 10,
    height: 100,
    borderColor: '#000',
    marginVertical: 20,
    marginHorizontal: 35,
    backgroundColor: '#FFF',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    width: 250,
    height: 80,
    fontSize: 30,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FF086D',
  },
})