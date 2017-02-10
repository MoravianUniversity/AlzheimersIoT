package com.google.android.gms.location.sample.basiclocationsample;

// Imports
import android.app.IntentService;
import android.content.ComponentName;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by tyler on 2/10/17.
 */
public abstract class NetworkService extends IntentService {

    // POST Request to server
    private StringBuffer request(String urlString) {
        // TODO Auto-generated method stub

        StringBuffer strBuff = new StringBuffer("");
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("User-Agent", "");
            connection.setRequestMethod("POST");
            connection.setDoInput(true);
            connection.connect();

            InputStream inputStream = connection.getInputStream();

            BufferedReader rd = new BufferedReader(new InputStreamReader(inputStream));
            String line = "";
            while ((line = rd.readLine()) != null) {
                strBuff.append(line);
            }
        } catch (IOException e) {
            // Writing exception to log
            e.printStackTrace();
        }
        strBuff.append("asdgfjhgadshfalsdhfkjbrgkhagsyva");
        return strBuff;
    }

    // Get TAG
    final static String TAG = "NetworkService";

    // Must create a default constructor
    public NetworkService() {
        // Used to name the worker thread, important only for debugging.
        super("network-service");

        // DEBUG
        Log.e(TAG, "NetworkService Constructor.");
    }

    // Constructor
    @Override
    public void onCreate() {
        super.onCreate(); // if you override onCreate(), make sure to call super().
        // If a Context object is needed, call getApplicationContext() here.

        // DEBUG
        Log.e(TAG, "NetworkService onCreate.");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        // This describes what will happen when service is triggered
        WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }

    @Override
    public ComponentName startService(Intent service) {
        return super.startService(service);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

}