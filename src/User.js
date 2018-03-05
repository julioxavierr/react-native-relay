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
        this.state = {name: '', imageUrl: 'http://nordicflanges.com/wp-content/uploads/2017/05/anonym_man_gra.gif', description: ''}
    }

    componentDidMount(){
        const user = this.props.user;
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
                <Text style={{flex: 2}}>{info.description}</Text>
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
   backgroundColor: '#50E3AC'
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
    backgroundColor: 'rgba(256, 256, 256, 0.5)',
    padding: 20,
  },
  insideText: {
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '400',
    color: '#FF086D',
  }

});

export default UserQueryRenderer;