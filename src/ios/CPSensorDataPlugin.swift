import CoreMotion

extension CMSensorDataList : Sequence {
    public func makeIterator() -> NSFastEnumerationIterator {
        return NSFastEnumerationIterator(self)
    }
}

struct SensorDataEntry: Encodable {
  var x: Double
  var y: Double
  var z: Double
}

@objc(CPSensorDataPlugin) class CPSensorDataPlugin : CDVPlugin {
  /**
   * Calculate accelerometer data based on sensor recorder
   *
   * @param from  Start date
   * @param to    End date
   */
  func calcAccelData(_ from: Date, _ to: Date) -> [SensorDataEntry] {
    let recorder = CMSensorRecorder()

    /// storage for sensor data
    var sensorData: [SensorDataEntry] = [SensorDataEntry]()

    // retrieve data from the recorder
    if let recorderData = recorder.accelerometerData(from: from, to: to) {
      for a in recorderData {
        if let aa = a as? CMRecordedAccelerometerData {
          // create sensor data entry
          let sensorDataEntry: SensorDataEntry = SensorDataEntry(
            x: aa.acceleration.x * 9.8,
            y: aa.acceleration.y * 9.8,
            z: aa.acceleration.z * 9.8
          )
          sensorData.append(sensorDataEntry)
        }
      }
    }
    return sensorData
  }

  /**
   * Helper function to check, if core motion is authorized
   */
  func isCoreMotionAuthorized() -> Bool {
    if #available(iOS 11.0, *) {
      return CMSensorRecorder.authorizationStatus() == .authorized
    } else {
      // Fallback on earlier versions
      return CMSensorRecorder.isAuthorizedForRecording()
    }
  }

  @objc(start:)
  func start(command: CDVInvokedUrlCommand) {
    let recorder = CMSensorRecorder()

    var pluginResult = CDVPluginResult(
      status: CDVCommandStatus_ERROR
    )

    // start sensor recorder for recording x,y,z coordinates to timestamps
    if CMSensorRecorder.isAccelerometerRecordingAvailable() {
      recorder.recordAccelerometer(forDuration: 43200)

      pluginResult = CDVPluginResult(
        status: CDVCommandStatus_OK,
        messageAs: "started recorder"
      )
    }
    else {  // return error messages, if sensor recorder is unavailable
      // if core motion is not authorized
      if !self.isCoreMotionAuthorized() {
        pluginResult = CDVPluginResult(
          status: CDVCommandStatus_ERROR,
          messageAs: "Not authorized"
        )
      } else {  // if core motion is authorized, but recorder is unavailable
        pluginResult = CDVPluginResult(
          status: CDVCommandStatus_ERROR,
          messageAs: "No receiver data available"
        ) 
      }
    }
    self.commandDelegate!.send(
      pluginResult,
      callbackId: command.callbackId
    )
  }

  @objc(getData:)
  func getData(command: CDVInvokedUrlCommand) {
    let from = Date(timeIntervalSince1970: (command.arguments[0] as? Double) ?? Date().timeIntervalSince1970)
    let to = Date(timeIntervalSince1970:   (command.arguments[1] as? Double) ?? Date().timeIntervalSince1970)

    DispatchQueue.global(qos: .background).async {
      let jsonEncoder = JSONEncoder()

      let sensorDataOut: [SensorDataEntry] = self.calcAccelData(from, to)
      let sensorDataJson = try? jsonEncoder.encode(sensorDataOut)
      let sensorDataJsonStr = String(data: sensorDataJson!, encoding: .utf8)!

      // send to frontend
      var pluginResult = CDVPluginResult(
        status: CDVCommandStatus_OK,
        messageAs: sensorDataJsonStr
      )
      self.commandDelegate!.send(
        pluginResult,
        callbackId: command.callbackId
      )    
    }
  }

  @objc(clear:)
  func clear(command: CDVInvokedUrlCommand) {
    let pluginResult = CDVPluginResult(
      status: CDVCommandStatus_OK,
      messageAs: "Nothing to clear"
    )
    self.commandDelegate!.send(
      pluginResult,
      callbackId: command.callbackId
    )
  }
}
