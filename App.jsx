import React, { useEffect } from 'react';
import AuthStack from './src/navigation/Stacks/AuthStack';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    Settings.initializeSDK();

    GoogleSignin.configure({
      webClientId: '502024347478-ge6s47pipsjpmu1hfdi36264jp4o82rf.apps.googleusercontent.com',
    });
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
