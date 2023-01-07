import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import GoogleMap from '../screens/GoogleMap';
import List from '../screens/List';
import ListDetail from '../screens/ListDetail';
import Task from '../screens/Task';
import {Icon} from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const HomeScreens = () => {
  const sesion = true;
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Tasks" component={Task} />
    </HomeStack.Navigator>
  )
}

const ListStack = createStackNavigator();

const ListScreens = () => {
  const sesion = true;
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="List" component={List} />
      <HomeStack.Screen name="Detail" component={ListDetail} />
    </HomeStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator();
const PRIMARY_COLOR = '#0da9ba';

export const Tabs = () =>{
  return (
    <Tab.Navigator 
        
     barStyle={{backgroundColor: PRIMARY_COLOR}}>
      <Tab.Screen name="Casa" component={HomeScreens} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon 
                name='home'
                type='font-awesome-5'
                color='#03535c'
            />
          ),
        }}/>
      <Tab.Screen name="Task" component={HomeScreens} options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({ color }) => (
            <Icon 
                name='thumbtack'
                type='font-awesome-5'
                color='#03535c'
            />
          ),}}/>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon 
                name='user'
                type='font-awesome-5'
                color='#03535c'
            />
          ),}}/>
      <Tab.Screen name="Listas" component={ListScreens} options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <Icon 
                name='list'
                type='font-awesome-5'
                color='#03535c'
            />
          ),}}/>
      <Tab.Screen name="Map" component={GoogleMap} options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <Icon 
                name='map'
                type='font-awesome-5'
                color='#03535c'
            />
          ),}}/>
    </Tab.Navigator>
  );
}