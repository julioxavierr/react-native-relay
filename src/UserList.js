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

    render() {
        this.navigation = this.props.navigation;

        return (
            <View style={styles.container}>
            <FlatList
                data={this.props.viewer.allUsers.edges}
                keyExtractor={(item) => item.node.__id}
                renderItem={({item}) => <RowItem data={item} navigation={this.navigation}/>}
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
                return <BpkSpinner style={styles.container} type="light" />
            }
        }}/>)
}

export default hoistStatics(UserListQueryRenderer, UserList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50E3AC',
    justifyContent: 'center'
  },
})