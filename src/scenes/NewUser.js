import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';
import commitUserMutation from '../mutations/NewUserMutation';
import Wrapper from '@src/components/Wrapper';

export default class NewUser extends Component {

    constructor(props) {
        super(props)
        this.state = { name: '', email: '', password: '', description: '', imageUrl: '' };
    }
    
    commit = () => {
        commitUserMutation(this.state, this.props.navigation.goBack());
    }

    render() {
        return (
            <Wrapper>
                <Title>Create a new user</Title>

                {/* name */}
                <RegularInput autoCorrect={false} onChangeText={text => this.setState({ name: text })} 
                    placeholder="Name"/>

                {/* email */}
                <RegularInput autoCapitalize={'none'} autocorrect={false}
                    onChangeText={text => this.setState({ email: text })} placeholder="E-mail"/>

                {/* description */}
                <RegularInput autoCorrect={false}
                    onChangeText={text => this.setState({ description: text })} placeholder="Description"/>

                {/* imageUrl */}
                <RegularInput autoCapitalize={'none'} autoCorrect={false}
                    onChangeText={text => this.setState({ imageUrl: text })} placeholder="Image URL"/>

                <Button
                    color='#FABA30'
                    title='SUBMIT'
                    onPress={() => this.commit()} />
                
            </Wrapper>
        );
    }
}

const Title = styled.Text`
    fontWeight: 800;
    fontSize: 30;
    color: #FFF;
    marginBottom: 20;
    marginTop: 20;
    marginLeft: auto;
    marginRight: auto;
`

const RegularInput = styled.TextInput`
    height: 40;
    borderColor: gray;
    borderWidth: 1;
    backgroundColor: #FFF;
    marginVertical: 20;
    marginHorizontal: 20;
    paddingLeft: 10;
`