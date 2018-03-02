import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

class RepoDetail extends Component {


    static navigationOptions = {title: 'Detail'};

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.query.id}</Text>
            </View>
        );
    }
}

const RepoDetailContainer = createFragmentContainer(RepoDetail, graphql`
fragment RepoDetail_repository on Repository {
    id
    name
    owner {
        login
        avatarUrl
    }
    description
    url
}
`)

const RepoDetailQueryRenderer = ({ navigation }) => {
    return (
        <QueryRenderer environment={environment}
            query={graphql`
                query RepoDetailQuery($id: ID!){
                    ...RepoDetail_repository
                }`} variables={{id: navigation.state.params.id}}
                render={({error, props}) => {
                    if (props) {
                        return <RepoDetailContainer query={props} />
                    } else {
                        <Text>Loading...</Text>
                    }
                }} />
    )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  }
});

export default createFragmentContainer(RepoDetail, graphql`
    fragment RepoDetail_repository on Repository {
        id
        name
        owner {
            login
            avatarUrl
        }
        description
        url
    }
`)