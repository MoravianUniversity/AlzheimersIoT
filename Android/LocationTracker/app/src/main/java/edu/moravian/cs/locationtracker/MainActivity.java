package edu.moravian.cs.locationtracker;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    protected Context ctx;

    // Bindings for NetworkService
    protected NetworkService mBoundNetworkService;
    protected boolean mIsNetworkBound;

    // Tags and other Strings
    protected static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Get Context
        ctx = this.getApplicationContext();

        // Check if NetworkService is bound
        if (mBoundNetworkService==null) {
            // Bind NetworkService
            Intent mIntent = new Intent(ctx, NetworkService.class);
            bindService(mIntent, mNetworkConnection, BIND_AUTO_CREATE);
        }
        else {
            // Service is already bound
        }
    }

    // Bind ServiceConnection for interacting with NetworkService
    private ServiceConnection mNetworkConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder service) {
            // This is called when the connection with the service has been
            // established, giving us the service object we can use to
            // interact with the service.  Because we have bound to a explicit
            // service that we know is running in our own process, we can
            // cast its IBinder to a concrete class and directly access it.
            mBoundNetworkService = ((NetworkService.LocalBinder)service).getService();

            if(mBoundNetworkService != null) {
                // Tell the user about this for our demo.
                showToast("NetworkService Connected");
                Log.e(TAG,"NetworkService Connected");
            }
        }

        public void onServiceDisconnected(ComponentName className) {
            // This is called when the connection with the service has been
            // unexpectedly disconnected -- that is, its process crashed.
            // Because it is running in our same process, we should never
            // see this happen.
            mBoundNetworkService = null;
            showToast("NetworkService Disconnected");
            Log.e(TAG,"NetworkService Disconnected");
        }
    };

    /**
     * Shows a toast with the given text.
     */
    protected void showToast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }

}
