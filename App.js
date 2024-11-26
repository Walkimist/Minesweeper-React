import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './screens/Main';
import About from './screens/About';
import Game from './screens/Game';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: '#212135' } }}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#212135' }, animation: 'none' }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}