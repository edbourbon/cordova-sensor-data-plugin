package de.newroommedia.stairtalk;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;

public class SensorDataPlugin extends CordovaPlugin {
  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
  }

  @Override
  public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
    if (action.equals("start")) {
      this.start(callbackContext);
      return true;
    } else if (action.equals("getData")) {
      this.getData(callbackContext);
      return true;
    } else if (action.equals("clear")) {
      this.clear(callbackContext);
      return true;
    }
    return false;
  }

  private boolean serviceRunning(Class<?> serviceClass) {
    Context context = this.cordova.getActivity().getApplicationContext();

    ActivityManager manager;
    manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);

    if (manager != null) {
      for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
        if (serviceClass.getName().equals(service.service.getClassName())) {
          return true;
        }
      }
    }
    return false;
  }

  private void start(CallbackContext callbackContext) {
    Context context = this.cordova.getActivity().getApplicationContext();
    ForegroundService sensorService = new ForegroundService(context);
    Intent serviceIntent = new Intent(context, sensorService.getClass());

    if (!serviceRunning(sensorService.getClass())) {
      if (context.startService(serviceIntent) != null) {
        callbackContext.success("Started sensor service");
      } else {
        callbackContext.error("Unable to start sensor service or already running");
      }
    } else {
      callbackContext.error("Unable to start sensor service or already running");
    }
  }

  private void getData(CallbackContext callbackContext) {
    try {
      FileInputStream fistream = this.cordova.getActivity().getApplicationContext().openFileInput("accelerometer.csv");

      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fistream));
      String line;
      JSONArray accelerometerData = new JSONArray();

      try {
        while ((line = bufferedReader.readLine()) != null) {
          String[] parts = line.split(",");

          JSONObject entry = new JSONObject();
          try {
            entry.put("x", Double.parseDouble(parts[1]));
            entry.put("y", Double.parseDouble(parts[2]));
            entry.put("z", Double.parseDouble(parts[3]));

            accelerometerData.put(entry);
          } catch (JSONException e) {
            e.printStackTrace();
          }
        }
      } catch (IOException ex) {
        callbackContext.error("IO Error");
      }

      // return accelerometer data as JSON array
      callbackContext.success(accelerometerData);
    } catch (FileNotFoundException e) {
      callbackContext.error("File not found");
    }
  }

  private void clear(CallbackContext callbackContext) {
    if (this.cordova.getActivity().getApplicationContext().deleteFile("accelerometer.csv")) {
      callbackContext.success("Successfully deleted accelerometer file.");
    } else {
      callbackContext.error("Unable to delete file.");
    }
  }
}