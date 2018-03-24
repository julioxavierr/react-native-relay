import React, { Component } from 'react';
import { createFragmentContainer, QueryRenderer } from 'react-relay';
import environment from './Environment';
import { View } from 'react-native';
import BpkSpinner from 'react-native-bpk-component-spinner';
import Wrapper from '@src/components/Wrapper';

function createQueryRenderer(fragment, WrappedComponent, query) {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const Container = createFragmentContainer(WrappedComponent, fragment);

      return (
        <QueryRenderer
          environment={environment}
          query={query}
          render={({ error, props }) => {
            if (error) {
              return <View>{error}</View>;
            } else if (props) {
              // Expected path
              return <Container query={props} />;
            } else {
              // Display loading spinner
              return (
                <Wrapper>
                  <BpkSpinner type="light" />
                </Wrapper>
              );
            }
          }}
        />
      );
    }
  };
}

export default createQueryRenderer;
