import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColoredDataBox from '../features/sensor/components/colored-data-box/colored-data-box.component';
import ISensorConfig from '../interfaces/sensor-config.interface';
import SensorData from '../interfaces/sensor-data.interface';

type Props = {
    config: ISensorConfig;
    onSensorEvent?: (data: any) => void;
    onTaskUpdate?: (Subscription: Subscription | null) => void;
};

type AccelerometerData = {
    x: number | null;
    y: number | null;
    z: number | null;
};

export const AccelerometerSensor = (props: Props) => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const [accelerometerData, setAccelerometerData] = useState<AccelerometerData>({
        x: null,
        y: null,
        z: null,
    });

    const onSensorUpdate = (rawData: AccelerometerData) => {
        if (props.onSensorEvent === undefined) return;
        const preparedData: SensorData = {
            payload: {
                [`${props.config.type}_x`]: rawData.x,
                [`${props.config.type}_y`]: rawData.y,
                [`${props.config.type}_z`]: rawData.z,
            },
            sensor: props.config.type,
            timestamp: new Date().toISOString(),
        };

        props.onSensorEvent(preparedData);
    };

    useEffect(() => {
        const newSubscription = props.config.isActive
            ? Accelerometer.addListener?.(setAccelerometerData)
            : null;
        setSubscription(newSubscription);

        return () => {
            newSubscription?.remove?.();
        };
    }, [props.config.isActive]);

    useEffect(() => {
        Accelerometer.setUpdateInterval(props.config.updateInterval);
    }, [props.config.updateInterval]);

    useEffect(() => {
        if (props.onTaskUpdate === undefined) return;
        if (props.config.isActiveInBackground) {
            if (props.config.subscription === null && props.onSensorEvent) {
                const sensorTask = Accelerometer.addListener(onSensorUpdate);
                props.onTaskUpdate(sensorTask);
            }
        } else {
            props.config.subscription?.remove();
            props.onTaskUpdate(null);
        }
    }, [props.config.isActiveInBackground]);

    return (
        <View style={styles.componentContainer}>
            <ColoredDataBox
                data={[
                    { label: 'X-Axis', value: accelerometerData?.x },
                    { label: 'Y-Axis', value: accelerometerData?.y },
                    { label: 'Z-Axis', value: accelerometerData?.z },
                ]}
            />
            <Text>Cache-Items: {props.config.cache.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        display: 'flex',
        gap: 16,
    },
});

export default AccelerometerSensor;
