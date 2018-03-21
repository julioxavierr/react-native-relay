import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '@src/Environment';

const mutation = graphql`
mutation NewUserMutation($input: RegisterEmailInput!) {
    RegisterEmail(input: $input) {
        user {
            id
            name
            email
            description
            imageUrl
        }
        token
    }
}
`;

const updateClientStore = (proxyStore) => {
    // Retrieve the new user from server response
    const registerUserField = proxyStore.getRootField('RegisterEmail');
    const newUser = registerUserField.getLinkedRecord('user');

    // Add the user to the store
    const record = proxyStore.getRoot()
    const users = ConnectionHandler.getConnection(record, 'UserList_users');

    if(users) {
        const newEdge = ConnectionHandler.createEdge(proxyStore, users, newUser, 'UserEdge');

        // Insert edge before all other edges, like in server
        ConnectionHandler.insertEdgeBefore(users, newEdge);
    }
}

const commitUserMutation = (user, callback) => {

    const variables = {input: user}
    commitMutation(
        environment,
        {
            mutation,
            variables,
            updater: (store) => updateClientStore(store),
            onError: err => console.error(err)
        },
    );
}

export default commitUserMutation;