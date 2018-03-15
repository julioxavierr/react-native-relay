import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, Alert, ImageBackground} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer, requestSubscription } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';
import BpkSpinner from 'react-native-bpk-component-spinner';

class User extends Component {
    static navigationOptions = {title: 'Detail'};

    constructor(){
        super();

        // Default infos for user
        this.state = {name: '', imageUrl: 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png', description: ''}
    }

    componentDidMount(){
        const user = this.props.user;

        // Set user state using query data
        this.setState({name: user.name, imageUrl: user.imageUrl, description: user.description});
    }

    render() {
        const info = this.state
        
        return (
            <View style={styles.container}>
                <ImageBackground source={{uri: info.imageUrl}} style={styles.image}>
                    <View style={styles.insideView}>
                        <Text style={styles.insideText}>{info.name}</Text>
                    </View>
                </ImageBackground>
                <View style={{flex: 2, padding: 30}}>
                    <Text style={{fontWeight: '800', fontSize: 30, color: 'white', marginBottom: 20}}>Position:</Text>
                    <Text style={{fontWeight: '600', fontSize: 25, color: 'white'}}>{info.description}</Text>
                </View>
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

                return <BpkSpinner style={styles.spinner} type="light" />
            }} />
    )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#508FF2'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  insideView: {
    backgroundColor: 'rgba(256, 256, 256, 0.8)',
    padding: 20,
  },
  insideText: {
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '800',
    color: '#508FF2',
  }

});

export default UserQueryRenderer;