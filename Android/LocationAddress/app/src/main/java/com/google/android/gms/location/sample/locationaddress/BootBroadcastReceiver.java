package com.google.android.gms.location.sample.locationaddress;

import android.app.NotificationManager;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.util.Log;
import android.support.v4.app.NotificationCompat;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.res.Resources;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;

import static android.content.Context.NOTIFICATION_SERVICE;

/**
 * Created by tyler on 2/8/17.
 * Recognizes device boot and starts services accordingly.
 */

// WakefulBroadcastReceiver ensures the device does not go back to sleep
// during the startup of the service
public class BootBroadcastReceiver extends WakefulBroadcastReceiver {

    // Variables
    protected static final String TAG = "BootBroadcastReceiver";
    Context cont;

    @Override
    public void onReceive(Context context, Intent intent) {

        // Get context
        cont = context;

        // Notification to inform user of BOOT_COMPLETED
        showNotification();

        // Launch Services

        // Launch NetworkService when this message is received
        Intent startNetworkServiceIntent = new Intent(context, com.google.android.gms.location.sample.locationaddress.NetworkService.class);
        startWakefulService(context, startNetworkServiceIntent);

    }

    // Method to display monitoring notification
    public void showNotification() {
        // getContext
        Context ctx = cont;

        Intent intent = new Intent(ctx, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(ctx, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder b = new NotificationCompat.Builder(ctx);

        b.setAutoCancel(true)
                .setDefaults(Notification.DEFAULT_ALL)
                .setWhen(System.currentTimeMillis())
                .setSmallIcon(R.drawable.ic_launcher)
                .setTicker("Hearty365")
                .setContentTitle("Location Monitoring")
                .setContentText("Location Monitoring is now Active.")
                .setDefaults(Notification.DEFAULT_LIGHTS| Notification.DEFAULT_SOUND)
                .setContentIntent(contentIntent)
                .setContentInfo("Info");


        NotificationManager notificationManager = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, b.build());
    }
}
