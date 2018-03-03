import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

class User extends Component {


    static navigationOptions = {title: 'Detail'};

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.user.description}</Text>
            </View>
        );
    }
}

const UserContainer = createFragmentContainer(User, graphql`
        fragment User_user on User {
                id
                description
                imageUrl
        }
`)

const UserQueryRenderer = ({ navigation }) => {
    return (
        <QueryRenderer environment={environment}
            query={graphql`
                query UserQuery($id: ID!){
                    node(id: $id){
                        ...User_user
                    }
                }`} 
            variables={{id: navigation.state.params.id}}
            render={({error, props}) => {
                if (props) {
                    return <UserContainer user={props.node} />
                }

                return <Text>Loading...</Text>
            }} />
    )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  }
});

export default UserQueryRenderer;