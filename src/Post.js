import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

class Post extends Component {


    static navigationOptions = {title: 'Detail'};

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.post.description}</Text>
            </View>
        );
    }
}

const PostContainer = createFragmentContainer(Post, graphql`
        fragment Post_post on Post {
                id
                description
                imageUrl
        }
`)

const PostQueryRenderer = ({ navigation }) => {
    return (
        <QueryRenderer environment={environment}
            query={graphql`
                query PostQuery($id: ID!){
                    node(id: $id){
                        ...Post_post
                    }
                }`} 
            variables={{id: navigation.state.params.id}}
            render={({error, props}) => {
                if (props) {
                    return <PostContainer post={props.node} />
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

export default PostQueryRenderer;