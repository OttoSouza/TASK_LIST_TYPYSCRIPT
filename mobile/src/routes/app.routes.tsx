import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashBoard from '../pages/DashBoard';
import Profile from '../pages/Profile';
import CreateTask from '../pages/CreateTask';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#312e38'},
      }}
      // initialRouteName="SingUp"
    >
      <App.Screen name="SignIn" component={DashBoard} />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="CreateTask" component={CreateTask} />
    </App.Navigator>
  );
};

export default AppRoutes;
