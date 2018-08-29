package de.newroommedia.stairtalk;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Date;

public class ForegroundService extends Service implements SensorEventListener {

  public final String channel_name = "StorageChannel";
  public final String channel_id = "1337";
  public final String channel_description = "Counting your Steps...";

  // both constructurs are necessary (for whatever reason)
  public ForegroundService(Context appContext) {
    super();

    Log.i("ForegroundService", "Service Running!");
  }

  public ForegroundService() {
    super();

    Log.i("ForegroundService", "Service Running!");
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    super.onStartCommand(intent, flags, startId);
    // startTimer();
    createNotificationChannel();
    showNotification();
    return START_STICKY;
  }

  @Override
  public void onCreate() {
    SensorManager sensorManager;
    sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);

    // Accelerometer
    if (sensorManager != null) {
      sensorManager.registerListener(this, sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
          SensorManager.SENSOR_DELAY_GAME);
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
  }

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  private void showNotification() {

    Intent notificationIntent = new Intent(this, SensorDataPlugin.class);
    notificationIntent.setAction("de.newroommedia.stairtalk.SensorDataPlugin");

    notificationIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

    if (Build.VERSION.SDK_INT < 26) {
      Log.v("ForegroundService", "=====================DETECTED API 25 or lower!");
      Notification notification = new NotificationCompat.Builder(getApplicationContext()).setContentTitle("Stairtalk")
          .setContentText(channel_description).setContentIntent(pendingIntent).setOngoing(true).build();
      startForeground(1337, notification);
    } else {
      Log.v("ForegroundService", "=====================DETECTED API 26 or higher!");

      Notification notification = new Notification.Builder(getApplicationContext(), channel_id)
          .setContentTitle("Stairtalk").setContentText(channel_description).setContentIntent(pendingIntent)
          .setOngoing(true).build();
      startForeground(1337, notification);
    }
    Log.v("ForegroundService", "notification shown");
  }

  private void createNotificationChannel() {

    /*
     * Create the NotificationChannel only on API 26+ because the
     * NotificationChannel class is new and not in the support library
     */

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      int importance = NotificationManager.IMPORTANCE_DEFAULT;
      NotificationChannel channel = new NotificationChannel(channel_id, channel_name, importance);
      channel.setDescription(channel_description);
      channel.enableLights(true);
      channel.setLightColor(Color.RED);

      NotificationManager notificationManager = getApplicationContext().getSystemService(NotificationManager.class);
      if (notificationManager != null) {
        notificationManager.createNotificationChannel(channel);
        Log.v("ForegroundService", "======================================CREATED NOTIFICATION CHANNEL!!!!");
      }
    }
  }

  @Override
  public void onSensorChanged(SensorEvent event) {
    if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
      try {
        getAccelerometer(event);
      } catch (FileNotFoundException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  public void onAccuracyChanged(Sensor sensor, int accuracy) {

  }

  private void createHeader() throws IOException {
    String acc_file = "accelerometer.csv";
    FileOutputStream fOut;
    fOut = openFileOutput(acc_file, MODE_APPEND);
    OutputStreamWriter acc_osw = new OutputStreamWriter(fOut);

    acc_osw.write("Timestamp,AccelerometerX,AccelerometerY,AccelerometerZ\n");
    acc_osw.flush();
    acc_osw.close();
  }

  private void getAccelerometer(SensorEvent event) throws FileNotFoundException {
    float[] values = event.values;
    float x = values[0];
    float y = values[1];
    float z = values[2];

    String timestamp = String.valueOf(new Date());
    String acc_x = String.valueOf(x);
    String acc_y = String.valueOf(y);
    String acc_z = String.valueOf(z);

    String filename = "accelerometer.csv";
    FileOutputStream fOut;
    fOut = openFileOutput(filename, MODE_APPEND);
    OutputStreamWriter osw = new OutputStreamWriter(fOut);

    try {
      osw.write(timestamp + "," + acc_x + "," + acc_y + "," + acc_z + "\n");
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      osw.flush();
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      osw.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    Log.v("ForegroundService", " Accelerometer - X: " + acc_x + " | Y: " + acc_y + " | Z: " + acc_z);
  }
}