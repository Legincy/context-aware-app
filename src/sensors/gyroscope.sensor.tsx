import { Gyroscope } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import ColoredDataBox from '../features/sensor/components/colored-data-box/colored-data-box.component';
import { ISensorConfig } from '../interfaces/sensor-config.interface';

type Props = {
    config: ISensorConfig;
    onSensorEvent?: (data: any) => void;
    onTaskUpdate?: (Subscription: Subscription | null) => void;
};

type GyroscopeData = {
    x: number | null;
    y: number | null;
    z: number | null;
};

export const GyroscopeSensor = (props: Props) => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
        x: null,
        y: null,
        z: null,
    });

    useEffect(() => {
        const newSubscription = props.config.isActive
            ? Gyroscope.addListener?.(setGyroscopeData)
            : null;
        setSubscription(newSubscription);

        return () => {
            newSubscription?.remove?.();
        };
    }, [props.config.isActive]);

    useEffect(() => {
        Gyroscope.setUpdateInterval(props.config.updateInterval);
    }, [props.config.updateInterval]);

    useEffect(() => {
        if (props.onTaskUpdate === undefined) return;
        if (props.config.isActiveInBackground) {
            if (props.config.subscription === null && props.onSensorEvent) {
                const sensorTask = Gyroscope.addListener(props.onSensorEvent);
                props.onTaskUpdate(sensorTask);
            }
        } else {
            props.config.subscription?.remove();
            props.onTaskUpdate(null);
        }
    }, [props.config.isActiveInBackground]);

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
