import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { ServiceDetailScreen } from './ServiceDetailScreen';
import { AddServiceScreen } from './AddServiceScreen';
import { EditServiceScreen } from './EditServiceScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#E91E63',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'KAMI SPA' }}
                />
                <Stack.Screen
                    name="ServiceDetail"
                    component={ServiceDetailScreen}
                    options={{ title: 'Service detail' }}
                />
                <Stack.Screen
                    name="AddService"
                    component={AddServiceScreen}
                    options={{ title: 'Add Service' }}
                />
                <Stack.Screen
                    name="EditService"
                    component={EditServiceScreen}
                    options={{ title: 'Edit Service' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};