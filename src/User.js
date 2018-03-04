import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer, requestSubscription } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

class User extends Component {
    static navigationOptions = {title: 'Detail'};

    constructor(){
        super();
        this.state = {name: '', imageUrl: '', description: ''}
    }

    componentDidMount(){
        const user = this.props.user;
        this.setState({name: user.name, imageUrl: user.imageUrl, description: user.description});
    }

    render() {
        const info = this.state
        return (
            <View style={styles.container}>
                <Image source={{uri: info.imageUrl}} style={{width: 400, height: 400}}/>
                <Text>{info.name}</Text>
                <Text>{info.description}</Text>
                <Button onPress={() => {
                    this.setState({name: '', description: ''});
                }} title="Clean"/>
            </View>
        );
    }
}

const UserContainer = createFragmentContainer(User, graphql`
        fragment User_user on User {
                id
                name
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