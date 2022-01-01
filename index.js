const LIBRARIES = {
  Express: require("express"),
  BodyParser: require("body-parser"),
  SocketIO: require("socket.io"),
  Path: require("path"),
  HTTP: require("http"),
  FS: require("fs")
};

const SETTINGS = JSON.parse(LIBRARIES.FS.readFileSync(LIBRARIES.Path.join(__dirname, "settings.json"), "utf8"));

if(SETTINGS.licenseKey !== "non-commercial-and-evaluation"){
    console.log("Your license key is invalid.");
    process.exit();
}

if(SETTINGS.APIKey == null){
  SETTINGS.APIKey = random(40);
  LIBRARIES.FS.writeFileSync(LIBRARIES.Path.join(__dirname, "settings.json"), JSON.stringify(SETTINGS, null, 4), "utf8");
}

const EXPRESS = LIBRARIES.Express();
EXPRESS.use(LIBRARIES.BodyParser.urlencoded({extended : true}));
EXPRESS.use(LIBRARIES.BodyParser.json());
EXPRESS.post("/notification", function requestHandler(req, res) {
  const API_KEY = req.headers["api-key"];
  if(API_KEY != undefined){
    if(API_KEY == SETTINGS.APIKey){
      const NOTIFICATION = {
        icon: {
          x: 0,
          y: 0,
          value: null
        },
        message: {
          x: 0,
          y: 0,
          value: null
        },
        remaining_time: 5,
        sound: null
      };
      IO_SERVER.emit("notification", {
        ...NOTIFICATION,
        ...req.body
      });
      res.end("Notification sended !");
    }
    else{
      res.end("Wrong API key.");
    }
  }
  else{
    res.end("An API key is required. You will find it in the \"settings.json\" file.");
  }
});
EXPRESS.use(LIBRARIES.Express.static(LIBRARIES.Path.join(__dirname, "public")));
const HTTP = LIBRARIES.HTTP.createServer(EXPRESS);

const IO_SERVER = LIBRARIES.SocketIO(HTTP);
IO_SERVER.on("connection", function(socket){
  IO_SERVER.emit("settings", SETTINGS.client);

  // Lorsque l'utilisateur fait une demande directe au serveur, on lui redirige.
  socket.on("server", function(_message){
    //IO_SERVER.emit("server", _message);
  });
});

HTTP.listen(SETTINGS.serverPort, function(){
  console.log("You can access the GUI on http://localhost:" + SETTINGS.serverPort + ".");
});

function random(_length){
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let back = "";
    for (let i = 0; i < _length; i++) {
        back += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }

    return back;

};
