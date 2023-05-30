export interface IAppConfig {
    APP_COLOR: string;
    CACHE_SIZE: number;
    BACKEND_URL: string;
}

export const AppConfig: IAppConfig = {
    APP_COLOR: '#9B1EF8',
    CACHE_SIZE: 100,
    BACKEND_URL: 'https://lm.jan-krueger.eu/data',
};
