import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  createFragmentContainer,
  graphql,
  QueryRenderer,
  requestSubscription,
} from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from '@src/Environment';
import RowItem from '@src/components/RowItem';
import BpkSpinner from 'react-native-bpk-component-spinner';
import NewUserButton from '@src/components/NewUserButton';
import { ConnectionHandler } from 'relay-runtime';
import styled from 'styled-components';
import Wrapper from '@src/components/Wrapper';
import createQueryRenderer from '../createQueryRenderer';

@withNavigation
class UserList extends Component {
  componentDidMount() {
    // this._subscribe();
  }

  static navigationOptions = { title: 'List' };

  _subscribe = () => {
    requestSubscription(environment, {
      subscription,
      variables: {},
      updater: store => {
        // Get the notification
        const rootField = store.getRootField('UserAdded');
        const newUser = rootField
          .getLinkedRecord('userEdge')
          .getLinkedRecord('node');

        // Add it to a connection
        const record = store.getRoot();
        const users = ConnectionHandler.getConnection(record, 'UserList_users');

        if (users) {
          const newEdge = ConnectionHandler.createEdge(
            store,
            users,
            newUser,
            'UserEdge',
          );
          ConnectionHandler.insertEdgeBefore(users, newEdge);
        }
      },
    });
  };

  // Render a view including a FlatList that contains RowItem's
  render() {
    this.navigation = this.props.navigation;
    const users = this.props.query.users;

    const rowItem = item => (
      <RowItem data={item} navigation={this.navigation} />
    );

    return (
      <Wrapper>
        <List
          data={users.edges}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => rowItem(item)}
        />
        <NewUserButton navigation={this.navigation} />
      </Wrapper>
    );
  }
}

const subscription = graphql`
  subscription UserListSubscription {
    UserAdded {
      userEdge {
        node {
          id
          name
          email
          description
          imageUrl
        }
      }
    }
  }
`;

const query = graphql`
  query UserListQuery {
    ...UserList_query
  }
`;

const fragment = graphql`
  fragment UserList_query on Query {
    users(last: 20) @connection(key: "UserList_users") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const UserListQueryRenderer = createQueryRenderer(fragment, UserList, query);

export default hoistStatics(UserListQueryRenderer, UserList);

const List = styled.FlatList`
  flex: 1;
`;
