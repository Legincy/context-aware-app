import { Subscription } from 'expo-sensors/build/Pedometer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import LabeledContainer from '../components/container/labeled-container.component';
import dropDownSensorConfig from '../components/drop-down/config/sensor.config';
import DropDown from '../components/drop-down/drop-down.component';
import CheckBox from '../components/form/checkbox.form';
import { IconButton } from '../components/form/icon-button.form';
import LabeledSlider from '../components/slider/labeled-slider.component';
import { Sensor } from '../features/sensor/sensor.config';
import {
    ISensorConfig,
    IRegisteredSensor as ISensorRegister,
} from '../interfaces/sensor-config.interface';
import { SensorData } from '../interfaces/sensor-data.interface';
import AccelerometerSensor from '../sensors/accelerometer.sensor';
import { isEqual } from '../shared/utils/helper.utils';

type Props = {};

export const SensorView = (props: Props) => {
    const [sessionId, setSessionId] = useState<string | number[]>(uuid.v4);
    const [sensorRegister, setSensorRegister] = useState<ISensorRegister>({});
    const [sensorConfig, setSensorConfig] = useState<ISensorConfig | null>(null);
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

    const updateSensorTask = (subscription: Subscription | null) => {
        if (sensorConfig === null) return;
        setSensorConfig({ ...sensorConfig, subscription });
    };

    const onSensorTaskEvent = (sensorData: SensorData) => {
        console.log(sensorRegister, sensorData, sensorData === undefined);
        /*setSensorRegister((prevState: ISensorRegister) => ({
            ...prevState,
            [sensorData.sensor]: {
                ...prevState[sensorData.sensor],
                cache: [...prevState[sensorData.sensor]?.cache, ...sensorData.payload],
            },
        }));
        */
    };

    const sensorComponents: {
        [key in string]?: JSX.Element;
    } = {
        [Sensor.ACCELEROMETER]: (
            <AccelerometerSensor
                config={sensorConfig!}
                onTaskUpdate={updateSensorTask}
                onSensorEvent={onSensorTaskEvent}
            />
        ),
        [Sensor.GYROSCOPE]: <AccelerometerSensor config={sensorConfig!} />,
    };

    const setUpdateInterval = (value: number) => {
        if (sensorConfig === null) return;
        setSensorConfig({ ...sensorConfig, updateInterval: value });
    };

    const toggleIsActive = () => {
        if (sensorConfig === null) return;
        setSensorConfig({
            ...sensorConfig,
            isActive: !sensorConfig.isActive,
        });
    };

    const setIsActiveInBackground = (status: boolean) => {
        if (sensorConfig === null) return;
        setSensorConfig({
            ...sensorConfig,
            isActiveInBackground: status,
        });
    };

    useEffect(() => {
        if (sensorConfig !== null && sensorConfig.type !== selectedSensor) {
            const newConfig = { ...sensorRegister, [sensorConfig.type]: sensorConfig };

            if (!isEqual(newConfig, sensorRegister)) {
                setSensorRegister(newConfig);
            }
        }

        if (selectedSensor !== null) {
            let activeSensorConfig: ISensorConfig = {
                isActive: true,
                isActiveInBackground: false,
                updateInterval: 1000,
                type: selectedSensor,
                cache: [],
            };

            if (sensorRegister.hasOwnProperty(selectedSensor)) {
                activeSensorConfig = sensorRegister[selectedSensor];
            }

            setSensorConfig(activeSensorConfig);
        }
    }, [selectedSensor]);

    useEffect(() => {
        Object.keys(sensorRegister).forEach((config) =>
            console.log({
                ...sensorRegister[config],
                cache_size: len(sensorRegister[config].cache),
            }),
        );
    }, [sensorRegister]);

    return (
        <View style={styles.componentContainer}>
            {sensorConfig !== null && (
                <View style={styles.sensorViewWrapper}>
                    <View style={styles.sensorContainer}>
                        {sensorComponents[sensorConfig.type]}
                    </View>
                    <LabeledContainer label='Sensor Settings'>
                        <View>
                            <LabeledSlider
                                label={'Update Interval'}
                                minimumValue={200}
                                maximumValue={10000}
                                step={100}
                                value={sensorConfig.updateInterval}
                                isDisabled={!sensorConfig}
                                onValueChange={setUpdateInterval}
                            />
                            <CheckBox
                                value={sensorConfig.isActiveInBackground}
                                onChange={setIsActiveInBackground}
                                label='Stay active in background'
                            />
                        </View>
                    </LabeledContainer>
                </View>
            )}

            <LabeledContainer label='Session Settings'>
                <DropDown
                    items={dropDownSensorConfig}
                    setValue={(sensor: string) => setSelectedSensor(sensor)}
                />
                <IconButton
                    label={sensorConfig?.isActive === true ? 'Deactivate' : 'Activate'}
                    icon='power'
                    isDisabled={sensorConfig === null}
                    color={sensorConfig?.isActive ? '#DC3545' : '#3BA55C'}
                    style={styles.sensorControlBtn}
                    onPress={toggleIsActive}
                />
                <View style={styles.sessionCtrlWrapper}>
                    <IconButton label={'New Session'} onPress={() => setSessionId(uuid.v4())} />
                    <Text style={styles.sessionLabel}>{sessionId}</Text>
                </View>
            </LabeledContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        position: 'relative',
        display: 'flex',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 16,
        justifyContent: 'flex-end',
        flex: 1,
        gap: 8,
    },
    sensorViewWrapper: {
        position: 'relative',
        display: 'flex',
        gap: 16,
        width: '100%',
    },
    sensorContainer: {
        position: 'relative',
    },
    sensorControlBtn: {},
    sessionCtrlWrapper: { display: 'flex', alignItems: 'center', width: '100%', gap: 4 },
    newSessionBtn: {},
    sessionLabel: {
        color: '#BEBEBE',
        fontSize: 13,
        fontWeight: '400',
    },
});

export default SensorView;
