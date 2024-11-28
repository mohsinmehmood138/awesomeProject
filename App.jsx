import React, {useEffect} from 'react';
import AuthStack from './src/navigation/Stacks/AuthStack';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Settings} from 'react-native-fbsdk-next';

const App = () => {

  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
