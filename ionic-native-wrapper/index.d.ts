import { IonicNativePlugin } from "@ionic-native/core";
/**
 * @name SensorDataPlugin
 * @description
 * The sensor data plugin is able to read the accelerometer data
 * from the device and send the retrieved data
 * to the frontend application.
 */
export declare class SensorDataPlugin extends IonicNativePlugin {
    /**
     * @description
     * Starts the necessary services for accessing sensor data
     *
     * @param val
     * @param successCallback Callback for successful execution
     * @param errorCallback Callback, if error has occured
     *
     * @returns {string} Status of starting services
     */
    start(successCallback: (value: string) => void, errorCallback: (value: string) => void): Promise<any>;
    /**
     * @description
     * Reads the current sensor data from the specific platform and
     * sends it the frontend
     *
     * @param val
     * @param successCallback Callback for successful execution
     * @param errorCallback Callback, if error has occured
     *
     * @returns {string} Sensor data or error message as JSON-formatted string
     */
    getData(successCallback: (value: string) => void, errorCallback: (value: string) => void): Promise<any>;
    /**
     * @description
     * Clears the saved sensor data on the device
     *
     * @param val
     * @param successCallback Callback for successful execution
     * @param errorCallback Callback, if error has occured
     *
     * @returns {string} Status of clearing sensor data
     */
    clear(successCallback: (value: string) => void, errorCallback: (value: string) => void): Promise<any>;
}
