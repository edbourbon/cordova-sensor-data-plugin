var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Plugin, Cordova, IonicNativePlugin } from "@ionic-native/core";
/**
 * @name SensorDataPlugin
 * @description
 * The sensor data plugin is able to read the accelerometer data
 * from the device and send the retrieved data
 * to the frontend application.
 */
var SensorDataPlugin = (function (_super) {
    __extends(SensorDataPlugin, _super);
    function SensorDataPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    SensorDataPlugin.prototype.start = /**
       * @description
       * Starts the necessary services for accessing sensor data
       *
       * @param val
       * @param successCallback Callback for successful execution
       * @param errorCallback Callback, if error has occured
       *
       * @returns {string} Status of starting services
       */
    function (successCallback, errorCallback) {
        return;
    };
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
    SensorDataPlugin.prototype.getData = /**
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
    function (successCallback, errorCallback) {
        return;
    };
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
    SensorDataPlugin.prototype.clear = /**
       * @description
       * Clears the saved sensor data on the device
       *
       * @param val
       * @param successCallback Callback for successful execution
       * @param errorCallback Callback, if error has occured
       *
       * @returns {string} Status of clearing sensor data
       */
    function (successCallback, errorCallback) {
        return;
    };
    SensorDataPlugin.decorators = [
        { type: Injectable },
    ];
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Function]),
        __metadata("design:returntype", Promise)
    ], SensorDataPlugin.prototype, "start", null);
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Function]),
        __metadata("design:returntype", Promise)
    ], SensorDataPlugin.prototype, "getData", null);
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Function]),
        __metadata("design:returntype", Promise)
    ], SensorDataPlugin.prototype, "clear", null);
    /**
     * @name SensorDataPlugin
     * @description
     * The sensor data plugin is able to read the accelerometer data
     * from the device and send the retrieved data
     * to the frontend application.
     */
    SensorDataPlugin = __decorate([
        Plugin({
            pluginName: "SensorDataPlugin",
            plugin: "sensor-data-plugin",
            // npm package name, example: cordova-plugin-camera
            pluginRef: "SensorDataPlugin",
            // the variable reference to call the plugin, example: navigator.geolocation
            repo: "",
            // the github repository URL for the plugin
            install: "",
            // OPTIONAL install command, in case the plugin requires variables
            installVariables: [],
            // OPTIONAL the plugin requires variables
            platforms: ["Android", "iOS"] // Array of platforms supported, example: ['Android', 'iOS']
        })
    ], SensorDataPlugin);
    return SensorDataPlugin;
}(IonicNativePlugin));
export { SensorDataPlugin };
//# sourceMappingURL=index.js.map