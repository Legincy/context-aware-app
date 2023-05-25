import HomeControlView from '../views/home-control.view';
import SensorView from '../views/sensor.view';
import SettingsView from '../views/settings.view';

export interface INavicationConfig {
    name: string;
    label: string;
    icon: any;
    locked?: boolean;
    component: React.FC;
}

export const navigationConfig: INavicationConfig[] = [
    { name: 'Sensor', label: 'Sensor', icon: 'layers', component: SensorView },
    {
        name: 'Home Control',
        locked: true,
        label: 'Home Control',
        icon: 'home',
        component: HomeControlView,
    },
    {
        name: 'Settings',
        locked: true,
        label: 'Settings',
        icon: 'ios-settings-sharp',
        component: SettingsView,
    },
];
