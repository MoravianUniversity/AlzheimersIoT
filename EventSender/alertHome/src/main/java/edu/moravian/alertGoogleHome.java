package edu.moravian;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("alertHome")
public class alertGoogleHome {

    @GET
    @Produces(MediaType.TEXT_PLAIN)


    public String doIt(@QueryParam("message") @DefaultValue(" ") String message) throws IOException {
        Process p = Runtime.getRuntime().exec("python3 sendMessageToHome.py " + message);
        return message;
    }

}
