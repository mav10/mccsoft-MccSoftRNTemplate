declare module 'react-native-config' {
    interface Env {
        API_URL: string;
        APP_NAME: string;
        //  add new env variables here
    }

    const Config: Env;
    export default Config;
}
