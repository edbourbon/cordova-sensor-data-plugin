import { Injectable } from "@angular/core";
import { Plugin, Cordova, IonicNativePlugin } from "@ionic-native/core";
/**
 * @name SensorDataPlugin
 * @description
 * The sensor data plugin is able to read the accelerometer data
 * from the device and send the retrieved data
 * to the frontend application.
 */
@Plugin({
  pluginName: "SensorDataPlugin",
  plugin: "sensor-data-plugin", // npm package name, example: cordova-plugin-camera
  pluginRef: "SensorDataPlugin", // the variable reference to call the plugin, example: navigator.geolocation
  repo: "", // the github repository URL for the plugin
  install: "", // OPTIONAL install command, in case the plugin requires variables
  installVariables: [], // OPTIONAL the plugin requires variables
  platforms: ["Android", "iOS"] // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class SensorDataPlugin extends IonicNativePlugin {
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
  @Cordova()
  start(
    successCallback: (value: string) => void,
    errorCallback: (value: string) => void
  ): Promise<any> {
    return;
  }
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
  @Cordova()
  getData(
    successCallback: (value: string) => void,
    errorCallback: (value: string) => void
  ): Promise<any> {
    return;
  }
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
  @Cordova()
  clear(
    successCallback: (value: string) => void,
    errorCallback: (value: string) => void
  ): Promise<any> {
    return;
  }
}
