import React, {Component} from 'react';
import { View, Text, Button, Alert, ImageBackground} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer, requestSubscription } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from '@src/Environment';
import BpkSpinner from 'react-native-bpk-component-spinner';
import Wrapper from '@src/components/Wrapper';
import styled from 'styled-components';

class User extends Component {
    static navigationOptions = {title: 'Detail'};

    constructor(){
        super();

        // Default infos for user
        this.state = {name: '', imageUrl: 'http://bit.ly/2uPNgUB', description: ''}
    }

    componentDidMount(){
        const user = this.props.user;

        // Set user state using query data
        this.setState({name: user.name, imageUrl: user.imageUrl, description: user.description});
    }

    render() {
        const info = this.state
        
        return (
            <Wrapper>
                <UserImage source={{uri: info.imageUrl}}>
                    <ImageCaptionBackground>
                        <ImageCaption>{info.name}</ImageCaption>
                    </ImageCaptionBackground>
                </UserImage>
                <UserInfoWrapper>
                    <Title>Position:</Title>
                    <Description style={{fontWeight: '600', fontSize: 25, color: 'white'}}>{info.description}</Description>
                </UserInfoWrapper>
            </Wrapper>
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

                return (
                    <Wrapper>
                        <BpkSpinner type="light" />
                    </Wrapper>
                );
            }} />
    )
}

const UserImage = styled.ImageBackground`
    flex: 3;
    justifyContent: flex-end;
`

const ImageCaptionBackground = styled.View`
    backgroundColor: rgba(256, 256, 256, 0.8);
    paddingHorizontal: 20;
    paddingVertical: 20;
`

const ImageCaption = styled.Text`
    fontSize: 40;
    textAlign: left;
    fontWeight: 800;
    color: #508FF2;
`

const UserInfoWrapper = styled.View`
    flex: 2;
    paddingHorizontal: 30;
    paddingVertical: 30;
`

const Title = styled.Text`
    fontWeight: 800;
    fontSize: 30;
    color: white;
    marginBottom: 20;
`

const Description = styled.Text`
    fontWeight: 600;
    fontSize: 25;
    color: white;
`

export default UserQueryRenderer;