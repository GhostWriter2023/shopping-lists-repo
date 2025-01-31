// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

import { Alert, LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyCMRtcvVhzSpayz3XtVMazeKb0oPFz_SgI",
    authDomain: "shopping-list-demo-53e2b.firebaseapp.com",
    projectId: "shopping-list-demo-53e2b",
    storageBucket: "shopping-list-demo-53e2b.appspot.com",
    messagingSenderId: "281575674591",
    appId: "1:281575674591:web:dc04db34cb0d498b3a0f6a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="ShoppingLists"
        >
          {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;