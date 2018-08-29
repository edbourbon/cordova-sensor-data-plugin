/**
 * Cordova Template Plugin
 */

var SensorDataPlugin = (function() {
  function SensorDataPlugin() {}

  // starten des recorders (bei app start)
  SensorDataPlugin.prototype.start = function(successCallback, errorCallback) {
    cordova.exec(
      successCallback,
      errorCallback,
      "SensorDataPlugin",
      "start",
      []
    );
  };

  // übermittlung der daten (tdat) an das ionic frontend
  SensorDataPlugin.prototype.getData = function(
    from,
    to,
    successCallback,
    errorCallback
  ) {
    cordova.exec(
      successCallback,
      errorCallback,
      "SensorDataPlugin",
      "getData",
      [from, to]
    );
  };

  SensorDataPlugin.prototype.clear = function(successCallback, errorCallback) {
    cordova.exec(
      successCallback,
      errorCallback,
      "SensorDataPlugin",
      "clear",
      []
    );
  };

  return SensorDataPlugin;
})();

module.exports = SensorDataPlugin;
