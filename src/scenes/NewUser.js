import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';
import commitUserMutation from '../mutations/NewUserMutation';
import Wrapper from '@src/components/Wrapper';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      description: '',
      imageUrl: '',
    };
  }

  commit = () => {
    commitUserMutation(this.state, this.props.navigation.goBack());
  };

  render() {
    return (
      <Wrapper>
        <Title>Create a new user</Title>

        {/* name */}
        <RegularInput
          autoCorrect={false}
          onChangeText={text => this.setState({ name: text })}
          placeholder="Name"
        />

        {/* email */}
        <RegularInput
          autoCapitalize={'none'}
          autocorrect={false}
          onChangeText={text => this.setState({ email: text })}
          placeholder="E-mail"
        />

        {/* description */}
        <RegularInput
          autoCorrect={false}
          onChangeText={text => this.setState({ description: text })}
          placeholder="Description"
        />

        {/* imageUrl */}
        <RegularInput
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={text => this.setState({ imageUrl: text })}
          placeholder="Image URL"
        />

        <Button color="#FABA30" title="SUBMIT" onPress={() => this.commit()} />
      </Wrapper>
    );
  }
}

const Title = styled.Text`
  font-weight: 800;
  font-size: 30;
  color: #fff;
  margin-bottom: 20;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
`;

const RegularInput = styled.TextInput`
  height: 40;
  border-color: gray;
  border-width: 1;
  background-color: #fff;
  margin-vertical: 20;
  margin-horizontal: 20;
  padding-left: 10;
`;
