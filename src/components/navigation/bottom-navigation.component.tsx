import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { AppConfig } from '../../config/app.config';
import { INavicationConfig, navigationConfig } from '../../config/navigation.config';

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
    const navigationItems = navigationConfig.map((config: INavicationConfig, index: number) => {
        const listeners = config.locked
            ? {
                  tabPress: (e: any) => {
                      Toast.show('Tab currently not available', {
                          opacity: 0.5,
                          backgroundColor: AppConfig.APP_COLOR,
                          textColor: '#fff',
                          position: -32,
                          duration: Toast.durations.SHORT,
                          shadow: false,
                      });
                      e.preventDefault();
                  },
              }
            : undefined;

        return (
            <Tab.Screen
                key={index}
                name={config.name}
                component={config.component}
                options={{
                    tabBarLabel: config.label,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name={config.icon} color={color} size={size} />
                    ),
                }}
                listeners={listeners}
            />
        );
    });

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Sensor'
                screenOptions={{
                    tabBarActiveTintColor: AppConfig.APP_COLOR,
                }}
            >
                {navigationItems}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomNavigation;
