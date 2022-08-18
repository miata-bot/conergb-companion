import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import BluetoothApp from './BluetoothApp';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <BluetoothApp />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
