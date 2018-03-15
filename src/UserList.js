import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';
import RowItem from './RowItem';
import BpkSpinner from 'react-native-bpk-component-spinner';

@withNavigation
class UserList extends Component {


    static navigationOptions = {title: 'List'};

    _newUser(){
        console.log("Create new user");
    }

    // Render a view including a FlatList that contains RowItem's 
    render() {
        this.navigation = this.props.navigation;
        const users = this.props.query.users

        return (
            <View style={styles.container}>
                <FlatList style={{flex:1}}
                    data={users.edges} keyExtractor={(item) => item.node.id}
                    renderItem={({item}) => <RowItem data={item} navigation={this.navigation}/>}
                />
                <TouchableHighlight style={styles.newUserButton} onPress={this._newUser}>
                    <Text style={{fontSize: 30, color: '#FFF'}}>New user</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

// Get the last 100 users names using GraphQL
// and provide info to User_user
const UserListContainer = createFragmentContainer(UserList, graphql`
    fragment UserList_query on Query {
        users {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`)

const UserListQueryRenderer = () => {
    return (<QueryRenderer environment={environment}
        query={graphql`
            query UserListQuery{
                ...UserList_query
            }
        `}
        render={({error, props}) => {
            if (error) {
                return <Text>Error...</Text>
            } else if (props) {
                // Expected path
                return <UserListContainer query={props}/>
            } else {
                // Display loading spinner
                return <BpkSpinner style={styles.container} type="light" />
            }
        }}/>)
}

export default hoistStatics(UserListQueryRenderer, UserList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#508FF2',
    justifyContent: 'center'
  },
  newUserButton: {
      flex: 0.1,
      backgroundColor: '#aeb0b2',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
  },
})