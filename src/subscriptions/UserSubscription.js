import { graphql, requestSubscription } from 'react-relay';
import environment from '@src/Environment';
import { ConnectionHandler } from 'relay-runtime';

const subscribe = () => {
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

const subscription = graphql`
  subscription UserSubscription {
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

export default subscribe;
