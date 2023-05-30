import { Subscription } from 'expo-sensors/build/Pedometer';

export default interface ISensorConfig {
    isActive: boolean;
    isActiveInBackground: boolean;
    updateInterval: number;
    subscription: Subscription | null;
    cache: any[];
    type: string;
}

export interface IRegisteredSensor {
    [sensor: string]: ISensorConfig;
}
