import React, { Component } from 'react';
import { graphql } from 'react-relay';
import Wrapper from '@src/components/Wrapper';
import styled from 'styled-components';
import createQueryRenderer from '../createQueryRenderer';

class User extends Component {
  static navigationOptions = { title: 'Detail' };

  constructor() {
    super();

    // Default infos for user
    this.state = {
      name: '',
      imageUrl: 'http://bit.ly/2uPNgUB',
      description: '',
    };
  }

  componentDidMount() {
    const user = this.props.query.node;

    // Set user state using query data
    this.setState({
      name: user.name,
      imageUrl: user.imageUrl,
      description: user.description,
    });
  }

  render() {
    const info = this.state;

    return (
      <Wrapper>
        <UserImage source={{ uri: info.imageUrl }}>
          <ImageCaptionBackground>
            <ImageCaption>{info.name}</ImageCaption>
          </ImageCaptionBackground>
        </UserImage>
        <UserInfoWrapper>
          <Title>Position:</Title>
          <Description>{info.description}</Description>
        </UserInfoWrapper>
      </Wrapper>
    );
  }
}

const UserImage = styled.ImageBackground`
  flex: 3;
  justify-content: flex-end;
`;

const ImageCaptionBackground = styled.View`
  background-color: rgba(256, 256, 256, 0.8);
  padding-horizontal: 20;
  padding-vertical: 20;
`;

const ImageCaption = styled.Text`
  font-size: 40;
  text-align: left;
  font-weight: 800;
  color: #508ff2;
`;

const UserInfoWrapper = styled.View`
  flex: 2;
  padding-horizontal: 30;
  padding-vertical: 30;
`;

const Title = styled.Text`
  font-weight: 800;
  font-size: 30;
  color: white;
  margin-bottom: 20;
`;

const Description = styled.Text`
  font-weight: 600;
  font-size: 25;
  color: white;
`;

const fragment = graphql`
  fragment User_query on User {
    id
    name
    description
    imageUrl
  }
`;

const query = graphql`
  query UserQuery($id: ID!) {
    node(id: $id) {
      ...User_query
    }
  }
`;

const UserQueryRenderer = ({ navigation }) => {
  const params = { id: navigation.state.params.id };
  return createQueryRenderer(fragment, User, query, params);
};

export default UserQueryRenderer;
