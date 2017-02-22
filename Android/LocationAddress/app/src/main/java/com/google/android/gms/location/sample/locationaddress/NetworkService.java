package com.google.android.gms.location.sample.locationaddress;

// Imports
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.location.Address;
import android.location.Location;
import android.os.Binder;
import android.os.IBinder;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;
import com.google.android.gms.location.DetectedActivity;
import com.google.android.gms.location.Geofence;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

// SmartLocation Imports
import io.nlopez.smartlocation.OnActivityUpdatedListener;
import io.nlopez.smartlocation.OnGeofencingTransitionListener;
import io.nlopez.smartlocation.OnLocationUpdatedListener;
import io.nlopez.smartlocation.OnReverseGeocodingListener;
import io.nlopez.smartlocation.SmartLocation;
import io.nlopez.smartlocation.geofencing.model.GeofenceModel;
import io.nlopez.smartlocation.geofencing.utils.TransitionGeofence;
import io.nlopez.smartlocation.location.providers.LocationGooglePlayServicesProvider;

/**
 * Created by tyler on 2/10/17.
 * Main Asynchronous Networking thread which implements SmartLocation.
 */
public class NetworkService extends Service implements OnLocationUpdatedListener, OnActivityUpdatedListener, OnGeofencingTransitionListener {

    // SmartLocation Variables
    private String locationText;
    private String activityText;
    private String geofenceText;

    public Double smartLat;
    public Double smartLon;
    public long smartTime;

    private LocationGooglePlayServicesProvider provider;

    private static final int LOCATION_PERMISSION_ID = 1001;

    // Networking Variables
    private Double rawLat;
    private Double rawLon;
    private String StrLat;
    private String StrLon;
    private String curTime;
    private Context ctx;

    protected TimeServer mBoundServer;

    // Get TAG
    final static String TAG = "NetworkService";

    // This is the object that receives interactions from clients.  See
    // RemoteService for a more complete example.
    private final IBinder mBinder = new LocalBinder();


    // Must create a default constructor
    public NetworkService() {

    }

    // Constructor
    @Override
    public void onCreate() {
        super.onCreate(); // if you override onCreate(), make sure to call super().
        // If a Context object is needed, call getApplicationContext() here.

        // Get Context
        ctx = this.getApplicationContext();

        // Initial SmartLocation Initialization
        startLocation();
        //stopLocation();
        showLast();

        // BIND SERVICES
        // DEBUG
        // Bind TimeServer
        Intent mIntent = new Intent(this, TimeServer.class);
        bindService(mIntent, mConnection, BIND_AUTO_CREATE);

        Log.e(TAG, "onCreate successful");
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

    // Get Location from LocationService
    private void getLoc() {
        // Get Lon and Lat values
        StrLon = String.valueOf(getLon());
        StrLat = String.valueOf(getLat());

    }

    // Function to get current time
    public void getCurTime() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US);
        String currentDateTimeString = df.getDateTimeInstance().format(new Date());

        // textView is the TextView view that should display it
        curTime = (currentDateTimeString);
    }

    // Update data and commit POST request
    public void postRequest() {
        // LocationService
        getLoc();
        // Current time
        getCurTime();
        // Log data
        //request(rawLon, rawLat, curTime);
        //Log.e(TAG + "Lon: ", String.valueOf(getLon()));
        //Log.e(TAG + "Lat: ", String.valueOf(getLat()));
        Log.e(TAG + "curTime: ", String.valueOf(curTime));
    }

    // TimeServer Connection
    ServiceConnection mConnection = new ServiceConnection() {

        public void onServiceConnected(ComponentName className, IBinder service) {
            // This is called when the connection with the service has been
            // established, giving us the service object we can use to
            // interact with the service.  Because we have bound to a explicit
            // service that we know is running in our own process, we can
            // cast its IBinder to a concrete class and directly access it.
            mBoundServer = ((TimeServer.LocalBinder)service).getServerInstance();

            if(mBoundServer != null) {
                // Tell the user about this for our demo.
                showToast("TimeServer Connected");
                Log.e(TAG,"TimeServer Connected");
                // Do something with LocationService
                Log.e(TAG + "timeServ", mBoundServer.getTime());
            }
        }

        public void onServiceDisconnected(ComponentName className) {
            // This is called when the connection with the service has been
            // unexpectedly disconnected -- that is, its process crashed.
            // Because it is running in our same process, we should never
            // see this happen.
            mBoundServer = null;
            showToast("TimeServer Disconnected");
        }
    };

    /**
     * Shows a toast with the given text.
     */
    protected void showToast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDestroy() {
        stopLocation();
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

    /**
     * SmartLocationService Stuff
     *
     * The MIT License (MIT)
     * Copyright (c) 2013-2016 Nacho Lopez
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     */
    public void showLast() {
        Location lastLocation = SmartLocation.with(this).location().getLastLocation();
        if (lastLocation != null) {
            locationText = (
                    String.format("[From Cache] Latitude %.6f, Longitude %.6f",
                            lastLocation.getLatitude(),
                            lastLocation.getLongitude())
            );
        }

        DetectedActivity detectedActivity = SmartLocation.with(this).activity().getLastActivity();
        if (detectedActivity != null) {
            activityText = (
                    String.format("[From Cache] Activity %s with %d%% confidence",
                            getNameFromType(detectedActivity),
                            detectedActivity.getConfidence())
            );
        }
    }

    public void reverseGeo(Location location) {
        SmartLocation.with(ctx).geocoding()
                .reverse(location, new OnReverseGeocodingListener() {
                    @Override
                    public void onAddressResolved(Location location, List<Address> list) {
                        // Do stuff

                    }
                });
    }

    public Double getLat() {
        return smartLat;
    }

    public Double getLon() {
        return smartLon;
    }

    public long getTime() {
        return smartTime;
    }

    public void startLocation() {

        provider = new LocationGooglePlayServicesProvider();
        provider.setCheckLocationSettings(true);

        SmartLocation smartLocation = new SmartLocation.Builder(this).logging(true).build();

        smartLocation.location(provider).start(this);
        smartLocation.activity().start(this);

        // Create some geofences
        GeofenceModel mestalla = new GeofenceModel.Builder("1").setTransition(Geofence.GEOFENCE_TRANSITION_ENTER).setLatitude(39.47453120000001).setLongitude(-0.358065799999963).setRadius(500).build();
        smartLocation.geofencing().add(mestalla).start(this);
    }

    public void stopLocation() {
        SmartLocation.with(this).location().stop();
        locationText = ("Location stopped!");

        SmartLocation.with(this).activity().stop();
        activityText = ("Activity Recognition stopped!");

        SmartLocation.with(this).geofencing().stop();
        geofenceText = ("Geofencing stopped!");
    }

    public void showLocation(Location location) {
        if (location != null) {
            final String text = String.format("Latitude %.6f, Longitude %.6f",
                    location.getLatitude(),
                    location.getLongitude());
            locationText = (text);

            smartLat = location.getLatitude();
            smartLon = location.getLongitude();
            smartTime = location.getTime();

            // POST REQUEST FOR TEST DATA

            // DEBUG
            Log.e(TAG + "LAT", String.valueOf(smartLat));
            Log.e(TAG + "LON", String.valueOf(smartLon));

            // We are going to get the address for the current position
            SmartLocation.with(this).geocoding().reverse(location, new OnReverseGeocodingListener() {
                @Override
                public void onAddressResolved(Location original, List<Address> results) {
                    if (results.size() > 0) {
                        Address result = results.get(0);
                        StringBuilder builder = new StringBuilder(text);
                        builder.append("\n[Reverse Geocoding] ");
                        List<String> addressElements = new ArrayList<>();
                        for (int i = 0; i <= result.getMaxAddressLineIndex(); i++) {
                            addressElements.add(result.getAddressLine(i));
                        }
                        builder.append(TextUtils.join(", ", addressElements));
                        locationText = (builder.toString());
                    }
                }
            });
        } else {
            locationText = ("Null location");
        }
    }

    private void showActivity(DetectedActivity detectedActivity) {
        if (detectedActivity != null) {
            activityText = (
                    String.format("Activity %s with %d%% confidence",
                            getNameFromType(detectedActivity),
                            detectedActivity.getConfidence())
            );
        } else {
            activityText = ("Null activity");
        }
    }

    private void showGeofence(Geofence geofence, int transitionType) {
        if (geofence != null) {
            geofenceText = ("Transition " + getTransitionNameFromType(transitionType) + " for Geofence with id = " + geofence.getRequestId());
        } else {
            geofenceText = ("Null geofence");
        }
    }

    @Override
    public void onLocationUpdated(Location location) {
        showLocation(location);
    }

    @Override
    public void onActivityUpdated(DetectedActivity detectedActivity) {
        showActivity(detectedActivity);
    }

    @Override
    public void onGeofenceTransition(TransitionGeofence geofence) {
        showGeofence(geofence.getGeofenceModel().toGeofence(), geofence.getTransitionType());
    }

    private String getNameFromType(DetectedActivity activityType) {
        switch (activityType.getType()) {
            case DetectedActivity.IN_VEHICLE:
                return "in_vehicle";
            case DetectedActivity.ON_BICYCLE:
                return "on_bicycle";
            case DetectedActivity.ON_FOOT:
                return "on_foot";
            case DetectedActivity.STILL:
                return "still";
            case DetectedActivity.TILTING:
                return "tilting";
            default:
                return "unknown";
        }
    }

    private String getTransitionNameFromType(int transitionType) {
        switch (transitionType) {
            case Geofence.GEOFENCE_TRANSITION_ENTER:
                return "enter";
            case Geofence.GEOFENCE_TRANSITION_EXIT:
                return "exit";
            default:
                return "dwell";
        }
    }
    /**
     *  End SmartLocation Stuff
     */
}