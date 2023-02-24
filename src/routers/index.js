import {View, Text} from 'react-native';
import React, {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../components/homeScreen';
import Tambah_Catatan from '../components/tambah_catatan';
import edit from '../components/edit';
import Splash from '../components/splas';

const Stack = createNativeStackNavigator();

export const user = createContext();

const Router = () => {
  const [data, setData] = useState([]);

  return (
    <user.Provider
      value={{
        Global: [data, setData],
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="tambah"
            component={Tambah_Catatan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="edit"
            component={edit}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </user.Provider>
  );
};

export default Router;
