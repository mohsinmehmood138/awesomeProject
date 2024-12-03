import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Settings } from 'react-native-fbsdk-next';
import { persistor, store } from './src/redux/store';
import AuthStack from './src/navigation/Stacks/AuthStack';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging'

const App = () => {
  useEffect(() => {
    Settings.initializeSDK();

    GoogleSignin.configure({
      webClientId:
        '502024347478-ge6s47pipsjpmu1hfdi36264jp4o82rf.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    (async () => {
      const fcmToken = await messaging().getToken()
      console.log('fcm token?>>>>>>', fcmToken);
    })();
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
