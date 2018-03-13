import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';
import RowItem from './RowItem';
import BpkSpinner from 'react-native-bpk-component-spinner';

@withNavigation
class UserList extends Component {


    static navigationOptions = {title: 'List'};

    // Render a view including a FlatList that contains RowItem's 
    render() {
        this.navigation = this.props.navigation;
        const users = this.props.query.users

        return (
            <View style={styles.container}>
            <FlatList
                data={users.edges}
                keyExtractor={(item) => item.node.id}
                renderItem={({item}) => <RowItem data={item} navigation={this.navigation}/>}
            />
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
})