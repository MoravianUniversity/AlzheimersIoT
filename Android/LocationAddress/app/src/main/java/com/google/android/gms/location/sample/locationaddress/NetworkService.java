package com.google.android.gms.location.sample.locationaddress;

// Imports
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import fr.quentinklein.slt.LocationTracker;

/**
 * Created by tyler on 2/10/17.
 * Main Asynchronous Networking thread which implements SmartLocation.
 */
public class NetworkService extends Service {

    // Networking Variables
    private String StrLat;
    private String StrLon;
    private long curTime;
    private String StrTime;
    private Context ctx;

    // LocationTracker
    public LocationTracker tracker;

    // Get TAG
    final static String TAG = "NetworkService";

    // This is the object that receives interactions from clients.  See
    // RemoteService for a more complete example.
    private final IBinder mBinder = new LocalBinder();


    // Must create a default constructor
    public NetworkService() {
        // Do Constructor Stuff
    }

    // Constructor
    @Override
    public void onCreate() {
        super.onCreate(); // if you override onCreate(), make sure to call super().
        // If a Context object is needed, call getApplicationContext() here.

        // Get Context
        ctx = this.getApplicationContext();

        createLocationTracker();

        Log.e(TAG, "onCreate successful");
    }

    public void createLocationTracker() {
        tracker = new LocationTracker(ctx) {
            // Every time device location changes, onLocationFound is called
            @Override
            public void onLocationFound(Location location) {
                // Do some stuff
                Log.e(TAG, location.toString());
                curTime = location.getTime();

                // Cast from epoch to UTC
                Date date = new Date(curTime); // 'epoch' in long
                final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                StrTime = sdf.format(date);

                Log.e(TAG + "Time: ", StrTime);

                StrLat = String.valueOf(location.getLatitude());
                StrLon = String.valueOf(location.getLongitude());
                Thread t = new Thread(new Runnable() {
                    public void run() {
                        // Thread request as it contains Networking which cannot be run on the main thread.
                        request(StrLon, StrLat, StrTime);
                    }
                });

                t.start();
            }
            @Override
                    public void onTimeout() {
                tracker.stopListening();
            }
        };
        tracker.startListening();
    }

    // POST Request to server
    // Need URL encoded
    private StringBuffer request(String lon, String lat, String time) {
        // TODO Auto-generated method stub


        StringBuffer response = new StringBuffer();
        try {
            String url = "http://8887eddd.ngrok.io/api/gps";
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Setting basic post request
            con.setRequestMethod("POST");
            //con.setRequestProperty("User-Agent", USER_AGENT);
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
            con.setRequestProperty("Content-Type","application/json");

            String postJsonData = "{\"_id\":\"\",\"address\":\"Address Feature Not Yet Supported\",\"lon\":" + lon + ",\"lat\":" + lat + ",\"time\":\"" + time + "\",\"__v\":0}";

            // Send post request
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postJsonData);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            System.out.println("\nSending 'POST' request to URL : " + url);
            System.out.println("Post Data : " + postJsonData);
            System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String output;

            while ((output = in.readLine()) != null) {
                response.append(output);
            }
            in.close();

            //printing result from response
            System.out.println(response.toString());
        } catch (IOException e) {
            // Writing exception to log
            e.printStackTrace();
        }
        return response;
    }

    public class LocalBinder extends Binder {
        NetworkService getService() {
            return NetworkService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    /**
     * Shows a toast with the given text.
     */
    protected void showToast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public ComponentName startService(Intent service) {
        return super.startService(service);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }
}