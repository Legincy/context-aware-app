import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { BottomNavigation } from './src/components/navigation/bottom-navigation.component';

export const App = () => {
    return (
        <RootSiblingParent>
            <View style={styles.appContainer}>
                <BottomNavigation />
            </View>
        </RootSiblingParent>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
    },
});

export default App;
