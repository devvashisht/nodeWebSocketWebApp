# nodeWebSocketWebApp **WebSOCKET** **_Socket.io library_**

## chat application

- install express
- setup express with public folder and port to listen

```javascript
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = port.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
app.listen(port, () => {
  console.log(`Server is up on port${port}`);
});
```

**WEB SOCKET PROTOCOL** : `full-duplex` communication(bi-directional)

- whereas `http` : client initiate the request for response but server can not make such request to the client
- `WEb socket` : `persistence` communication with client & server
- **SOCKET.IO LIBRARY** :
- evnets :on('connection'), socket.emit('customevent',value)
- socket.emit('event', value)
- io.emit('event',value)
- io.broadcase.emit('event',value)

**Sharing location** : using browser geolocation

        ```javascript
        navigator.geoloction.getCurrentPosition((position) => {});
        ```

**Using Google map api**

```javascript
io.emit(
  "message",
  `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
);
```

**Event Acknowledgement** - ` socket.emit(eventname,eventPayload,acknowledgementCallBack)

**Bad word (validatiy)** - bad-word : npm pakage
**Deploying on Heroku**
heroku create <appName>

- git push heroku master
