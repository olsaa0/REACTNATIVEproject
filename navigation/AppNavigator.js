
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CityDetailScreen from '../screens/CityDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
    
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="CityDetail" 
        component={CityDetailScreen} 
        options={{ title: 'Destination Details' }} 
      />
    </Stack.Navigator>
  );
}