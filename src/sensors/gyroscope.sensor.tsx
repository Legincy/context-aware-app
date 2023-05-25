import Gyroscope from 'expo-sensors/build/Gyroscope';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import ColoredDataBox from '../features/sensor/components/colored-data-box/colored-data-box.component';

type Props = {
    updateInterval: number;
};

export const GyroscopeSensor = ({ updateInterval }: Props) => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [gyroscopeData, setGyroscopeData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const _subscribe = useCallback(() => {
        setSubscription(Gyroscope.addListener(setGyroscopeData));
    }, []);

    const _unsubscribe = useCallback(() => {
        subscription?.remove();
        setSubscription(null);
    }, [subscription]);

    useEffect(() => {
        Gyroscope.setUpdateInterval(updateInterval);
    }, [updateInterval]);

    useEffect(() => {
        _subscribe();
        Gyroscope.setUpdateInterval(updateInterval);
        return () => _unsubscribe();
    }, []);

    return (
        <View>
            <ColoredDataBox
                data={[
                    { label: 'X-Axis', value: gyroscopeData.x },
                    { label: 'Y-Axis', value: gyroscopeData.y },
                    { label: 'Z-Axis', value: gyroscopeData.z },
                ]}
            />
        </View>
    );
};

export default GyroscopeSensor;
