import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {SubscriptionClient} from 'subscriptions-transport-ws'
import 'whatwg-fetch'

  const store = new Store(new RecordSource());

  const setupSubscription = (config, variables, cacheConfig, observer) => {
    const query = config.text
    const subscriptionClient = new SubscriptionClient('ws://localhost:5000/subscriptions', {reconnect: true})
    console.log("subscriptionClient = ", subscriptionClient)
    const onNext = (result) => {
      observer.onNext(result)
    }
    const onError = (error) => {
      observer.onError(error)
    }
    const onComplete = () => {
      observer.onCompleted()
    }
  
    const client = subscriptionClient
      .request({query, variables})
      .subscribe(onNext, onError, onComplete)
  
    // Return a dispose method to be able to unsubscribe and trigger closing the
    // socket connection
    return {
      dispose: () => {
        // unsubscribe and close this socket connection
        client.unsubscribe()
        subscriptionClient.close()
      }
    }
  }

  const network = Network.create((operation, variables) => {

    return fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json()
    });
  }, setupSubscription);

  const environment = new Environment({
    network,
    store,
  });

  export default environment;