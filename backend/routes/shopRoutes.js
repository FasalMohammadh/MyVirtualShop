const express = require("express");
const con = require("../otherRes/DbConnection");
const router = express.Router();
const {isCorrectPassword} = require("../otherRes/common");

router.post("/", async (request, response) => {
    try {
        let { shopId } = request.session;

        if (!shopId)
            return response.send(
                "You are not logged in how did access this Page"
            );

        let [result] = await con.query(
            "SELECT shop_name FROM Shop WHERE shop_id=?",
            [shopId]
        );
        return response.send(result[0]);
    } catch (error) {
        console.log(error);
    }
});

router.post("/details", (request, response) => {
    let { shopId } = request.session;
    if (!shopId)
        return response.send("You are not logged in how did access this Page");

    con.query("SELECT shop_name,email,location FROM Shop WHERE shop_id=?", [
        shopId,
    ])
        .then((result) => response.send(result[0][0]))
        .catch((error) => console.log(error));
});

router.post("/newDetails", async (request, response) => {
    try {
        //getting shopId from session if logged in there will be a shopId in session
        let { shopId } = request.session;

        //if there is no shopId 401 unautorized access will send
        if (!shopId) return response.sendStatus(401);

        //getting all the data from request
        let { name, email, location, confirmPass } = request.body;

        //if there is no confirm password present 401 unautorized access will send
        if (!confirmPass) return response.sendStatus(400);

        //if password do not match 401 unautorized access will send
        let passCheck = await isCorrectPassword(confirmPass, shopId);

        if (!passCheck) return response.sendStatus(401);

        if (name && email && location) {
            await con.query(
                "UPDATE Shop SET shop_name=?, email=?, location=? WHERE shop_id=?",
                [name, email, location, shopId]
            );
            return response.sendStatus(200);
        }
        return response.sendStatus(400);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
});

module.exports = router;

/*
100 Continue    Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request.
101 Switching Protocols The server switches protocol.
200 OK  The request is OK.
201 Created The request is complete, and a new resource is created .
202 Accepted    The request is accepted for processing, but the processing is not complete.
203 Non-authoritative Information   The information in the entity header is from a local or third-party copy, not from the original server.
204 No Content  A status code and a header are given in the response, but there is no entity-body in the reply.
205 Reset Content   The browser should clear the form used for this transaction for additional input.
206 Partial Content The server is returning partial data of the size requested. Used in response to a request specifying a Range header. The server must specify the range included in the response with the Content-Range header.
300 Multiple Choices    A link list. The user can select a link and go to that location. Maximum five addresses  .
301 Moved Permanently   The requested page has moved to a new url .
302 Found   The requested page has moved temporarily to a new url .
303 See Other   The requested page can be found under a different url .
304 Not Modified    This is the response code to an If-Modified-Since or If-None-Match header, where the URL has not been modified since the specified date.
305 Use Proxy   The requested URL must be accessed through the proxy mentioned in the Location header.
306 Unused  This code was used in a previous version. It is no longer used, but the code is reserved.
307 Temporary Redirect  The requested page has moved temporarily to a new url.
400 Bad Request The server did not understand the request.
401 Unauthorized    The requested page needs a username and a password.
402 Payment Required    You can not use this code yet.
403 Forbidden   Access is forbidden to the requested page.
404 Not Found   The server can not find the requested page.
405 Method Not Allowed  The method specified in the request is not allowed.
406 Not Acceptable  The server can only generate a response that is not accepted by the client.
407 Proxy Authentication Required   You must authenticate with a proxy server before this request can be served.
408 Request Timeout The request took longer than the server was prepared to wait.
409 Conflict    The request could not be completed because of a conflict.
410 Gone    The requested page is no longer available .
411 Length Required The "Content-Length" is not defined. The server will not accept the request without it .
412 Precondition Failed The pre condition given in the request evaluated to false by the server.
413 Request Entity Too Large    The server will not accept the request, because the request entity is too large.
414 Request-url Too Long    The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information .
415 Unsupported Media Type  The server will not accept the request, because the mediatype is not supported .
416 Requested Range Not Satisfiable The requested byte range is not available and is out of bounds.
417 Expectation Failed  The expectation given in an Expect request-header field could not be met by this server.
500 Internal Server Error   The request was not completed. The server met an unexpected condition.
501 Not Implemented The request was not completed. The server did not support the functionality required.
502 Bad Gateway The request was not completed. The server received an invalid response from the upstream server.
503 Service Unavailable The request was not completed. The server is temporarily overloading or down.
504 Gateway Timeout The gateway has timed out.
505 HTTP Version Not Supported
*/
