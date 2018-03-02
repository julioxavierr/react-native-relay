const {
    Environment,
    Network,
    RecordSource,
    Store,
  } = require('relay-runtime');

  const store = new Store(new RecordSource());

  const network = Network.create((operation, variables) => {

    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer 6c356922178822a9bc80c4a02c2bb418e04520db'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json()
    });
  });

  const environment = new Environment({
    network,
    store,
  });

  export default environment;