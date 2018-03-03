import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createFragmentContainer, graphql, QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import environment from './Environment';

@withNavigation
class RepoList extends Component {


    static navigationOptions = {title: 'List'};

    _onPressRow = (rowData) => {
        this.props.navigation.navigate('Detail', {id: rowData.node.id})
    }

    /**
     * Render a row
     * @param {object} rowData 
     */
    _renderRowView(rowData) {
        return (<View>
                <TouchableHighlight style={styles.row} 
                    underlayColor='#EEE'
                    onPress={() => this._onPressRow(rowData)}>
                    <Text>{rowData.node.name}</Text>
                </TouchableHighlight>
                <View style={styles.line} />
                </View>)
    }

    render() {
        this.navigation = this.props.navigation;

        return (
            <View style={styles.container}>
            <FlatList
                data={this.props.query.viewer.repositories.edges}
                keyExtractor={(item) => item.node.__id}
                renderItem={({item}) => this._renderRowView(item)}
            />
            </View>
        );
    }
}

const RepoListContainer = createFragmentContainer(RepoList, graphql`
    fragment RepoList_query on Query {
        user(login: "julioxavierr"){
            repositories(first: 10) {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`)

const RepoListQueryRenderer = () => {
    return (<QueryRenderer environment={environment}
        query={graphql`
            query RepoListQuery {
                viewer {
                    repositories(last: 10){
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                }
            }
        `}
        variables={{}}
        render={({error, props}) => {
            if (error) {
                return <Text>Error...</Text>
            } else if (props) {
                return <RepoListContainer query={props}/>
            } else {
                return (<Text>Loading...</Text>);
            }
        }}/>)
}

export default hoistStatics(RepoListQueryRenderer, RepoList);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FFF'
  },
  navbar: {
    height: 64,
    backgroundColor: '#51103D'
  },
  row: {
    padding: 10,
    height: 44
  },
  line: {
    backgroundColor:'#CCC',
    height: 1
  },
})