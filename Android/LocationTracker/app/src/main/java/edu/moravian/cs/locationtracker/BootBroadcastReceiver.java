package edu.moravian.cs.locationtracker;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by tyler on 2/8/17.
 * Recognizes device boot and starts services accordingly.
 */

// WakefulBroadcastReceiver ensures the device does not go back to sleep
// during the startup of the service
public class BootBroadcastReceiver extends WakefulBroadcastReceiver {

    // Variables
    protected static final String TAG = "BootBroadcastReceiver";
    private Context ctx;

    @Override
    public void onReceive(Context context, Intent intent) {

        // Get context
        ctx = context;

        // Notification to inform user of BOOT_COMPLETED
        showNotification();

        // Start NetworkService
        Intent intent2 = new Intent(context, NetworkService.class);
        intent2.putExtras(intent);
        context.startService(intent2);

        // DEBUG
        Log.e(TAG, "onReceive Complete.");
    }

    /**
     * Shows a toast with the given text.
     */
    protected void showToast(String text) {
        Toast.makeText(ctx, text, Toast.LENGTH_SHORT).show();
    }

    // Method to display monitoring notification
    public void showNotification() {

        Intent intent = new Intent(ctx, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(ctx, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder b = new NotificationCompat.Builder(ctx);

        b.setAutoCancel(true)
                .setDefaults(Notification.DEFAULT_ALL)
                .setWhen(System.currentTimeMillis())
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
