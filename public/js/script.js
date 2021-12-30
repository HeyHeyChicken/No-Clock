const APP = new Vue({
  el: "#app",
  data: {
    screen_width: 0,
    screen_height: 0,

    date_grid: [],
    notification_grid: [],

    date_grid_width: 39,
    date_grid_height: 21,
    notification_grid_width: 49,
    notification_grid_height: 29,

    monday_is_first_day: false,
    time_show_seconds: true,
    border_thickness: 3,
    desired_screen_width: 1920,
    desired_screen_height: 1080,

    dictionnary: {
      "'": [
        [1],
        [1],
        [0],
        [0],
        [0]
      ],
      " ": [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      ":": [
        [0],
        [1],
        [0],
        [1],
        [0]
      ],
      0: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      1: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
      ],
      2: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1]
      ],
      3: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
      ],
      4: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      5: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
      ],
      6: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      7: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      8: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      9: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      A: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1]
      ],
      B: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 0]
      ],
      C: [
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 0],
        [1, 0, 1],
        [0, 1, 0]
      ],
      D: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 0]
      ],
      E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1]
      ],
      F: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
      ],
      G: [
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 1]
      ],
      H: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1]
      ],
      I: [
        [1],
        [0],
        [1],
        [1],
        [1]
      ],
      J: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
      ],
      K: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
      ],
      L: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
      ],
      M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
      ],
      N: [
        [1, 0, 0, 1],
        [1, 1, 0, 1],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1]
      ],
      O: [
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
      ],
      P: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
      ],
      Q: [
        [0, 1, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 1]
      ],
      R: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
      ],
      S: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
      ],
      T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      U: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      V: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
      ],
      W: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      X: [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1]
      ],
      Y: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 0]
      ],
      Z: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
      ],
      "calendar": [
        ["(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )"],
        ["(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )", "(184,20 ,19 )"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"],
        ["(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)", "(255,255,255)"]
      ],
      "pikachu": [
        ["               ", "(103, 103, 103)", "(103, 103, 103)", "               ", "               ", "               ", "               ", "(103, 103, 103)"],
        ["               ", "               ", "(255, 249, 0  )", "(250, 176, 21 )", "               ", "               ", "               ", "(250, 176, 21 )"],
        ["               ", "               ", "               ", "(255, 249, 0  )", "(255, 249, 0  )", "(255, 249, 0  )", "(255, 249, 0  )", "(250, 176, 21 )"],
        ["(250, 176, 21 )", "(250, 176, 21 )", "               ", "(255, 249, 0  )", "               ", "(255, 249, 0  )", "(255, 249, 0  )", "               "],
        ["(250, 176, 21 )", "(250, 176, 21 )", "               ", "(255, 54 , 23 )", "(255, 249, 0  )", "(255, 249, 0  )", "(255, 249, 0  )", "(255, 249, 0  )"],
        ["               ", "(250, 176, 21 )", "               ", "(255, 249, 0  )", "(250, 176, 21 )", "(250, 176, 21 )", "(250, 176, 21 )", "               "],
        ["               ", "(250, 176, 21 )", "(255, 249, 0  )", "(250, 176, 21 )", "(255, 249, 0  )", "(250, 176, 21 )", "(255, 249, 0  )", "               "],
        ["               ", "               ", "(255, 249, 0  )", "(250, 176, 21 )", "(166, 86 , 14 )", "(166, 86 , 14 )", "(250, 176, 21 )", "               "]
      ],
      "sun": [
        ["               ", "               ", "(226, 231, 68 )", "               ", "               ", "(226, 231, 68 )", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["(226, 231, 68 )", "               ", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "               ", "(226, 231, 68 )"],
        ["               ", "               ", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "               ", "               "],
        ["               ", "               ", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "               ", "               "],
        ["(226, 231, 68 )", "               ", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "(226, 231, 68 )", "               ", "(226, 231, 68 )"],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "(226, 231, 68 )", "               ", "               ", "(226, 231, 68 )", "               ", "               "]
      ],
      "hourglass": [
        ["               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "],
        ["               ", "(255, 255, 255)", "(4  ,170 ,235 )", "(4  ,170 ,235 )", "(4  ,170 ,235 )", "(255, 255, 255)", "               ", "               "],
        ["               ", "(255, 255, 255)", "(4  ,170 ,235 )", "(4  ,170 ,235 )", "(4  ,170 ,235 )", "(255, 255, 255)", "               ", "               "],
        ["               ", "               ", "(255, 255, 255)", "(4  ,170 ,235 )", "(255, 255, 255)", "               ", "               ", "               "],
        ["               ", "               ", "               ", "(255, 255, 255)", "               ", "               ", "               ", "               "],
        ["               ", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "               ", "               "],
        ["               ", "(255, 255, 255)", "               ", "               ", "               ", "(255, 255, 255)", "               ", "               "],
        ["               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "]
      ],
      "click": [
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "(255, 255, 255)", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "(255, 255, 255)", "               ", "               ", "               ", "               "],
        ["               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "],
        ["               ", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               "],
        ["               ", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               "],
        ["               ", "               ", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "]
      ],
      "lametric": [
        ["               ", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "],
        ["               ", "(255, 255, 255)", "               ", "               ", "               ", "               ", "               ", "(255, 255, 255)", "               "],
        ["(255, 255, 255)", "               ", "               ", "               ", "               ", "               ", "               ", "               ", "(255, 255, 255)"],
        ["(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "               ", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)"],
        ["(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)"],
        ["(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)"],
        ["(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)"],
        ["               ", "(255, 255, 255)", "(255, 255, 255)", "               ", "(255, 255, 255)", "               ", "(255, 255, 255)", "(255, 255, 255)", "               "],
        ["               ", "               ", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "(255, 255, 255)", "               ", "               "]
      ],
      "empty": [
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "],
        ["               ", "               ", "               ", "               ", "               ", "               ", "               ", "               "]
      ]
    },
    oldTime: "",

    notification: {
      icon: {
        x: 20,
        y: 6,
        value: "lametric"
      },
      message: {
        x: 2,
        y: 17,
        value: "My LaMetric"
      },
      remaining_time: 5
    }
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();

    this.loop();
  },
  methods: {
    loop(){
      if(this.oldTime != this.getCurrentTime()){
        this.initDateGrid();
        this.showCalendar(1, 6);
        this.writeTime(this.time_show_seconds ? 11 : 16, 7, this.time_show_seconds);
        this.writeDay(11, 13, this.monday_is_first_day);
      }

      if(this.notification.remaining_time > 0){
        this.initNotificationGrid();
        if(this.notification.icon.value != null){
          this.notification_grid = this.mergeGrids(this.notification_grid, this.dictionnary[this.notification.icon.value], this.notification.icon.x, this.notification.icon.y);
        }
        this.notification_grid = this.writeWord(this.notification_grid, this.notification.message.value, this.notification.message.x, this.notification.message.y);

        this.notification.remaining_time--;
        if(this.notification.remaining_time <= 0){
          this.initNotificationGrid();
        }
      }

      setTimeout(() => {
        this.loop();
      }, 1000 - new Date().getMilliseconds());
    },

    /* This function initializes the date grid. It can also be used to reset the grid. */
    initDateGrid(){
      this.date_grid = new Array(this.date_grid_height);
      for (let y = 0; y < this.date_grid_height; y++){
        this.date_grid[y] = new Array(this.date_grid_width);
        for (let x = 0; x < this.date_grid_width; x++){
          this.date_grid[y][x] = "(0,0,0)";
        }
      }
    },

    /* This function initializes the notification grid. It can also be used to reset the grid. */
    initNotificationGrid(){
      this.notification_grid = new Array(this.notification_grid_height);
      for (let y = 0; y < this.notification_grid_height; y++){
        this.notification_grid[y] = new Array(this.notification_grid_width);
        for (let x = 0; x < this.notification_grid_width; x++){
          this.notification_grid[y][x] = "(0,0,0)";
        }
      }
    },

    /* This function is executed each time the screen is resized. */
    resizeHandler(_e) {
      const SCREEN_WIDTH = document.body.offsetWidth;
      const SCREEN_HEIGHT = document.body.offsetHeight;

      let w = SCREEN_WIDTH;
      let h = w * this.desired_screen_height / this.desired_screen_width;
      if(h > SCREEN_HEIGHT){
        h = SCREEN_HEIGHT;
        w = h * this.desired_screen_width / this.desired_screen_height;
      }

      this.screen_width = w;
      this.screen_height = h;
    },

    /* This function allows you to merge two grids. */
    mergeGrids(_grid1, _grid2, _x, _y, _color){
      let merged = JSON.parse(JSON.stringify(_grid1));
      for(let y = 0; y < _grid2.length; y++){
        for(let x = 0; x < _grid2[y].length; x++){
          if(_grid2[y][x] != 0){
            let color = _grid2[y][x];
            if(color == 1){
              color = _color;
            }
            if(merged[y + _y] != undefined){
              merged[y + _y][x + _x] = color;
            }
          }
        }
      }
      return merged;
    },

    /* This function ensures that you get a number with at least two digits. */
    pad2(_number) {
      return (_number < 10 ? "0" : "") + _number;
    },

    showCalendar(_x, _y){
      const NOW = new Date();
      let date = this.pad2(NOW.getDate());

      let d1 = this.mergeGrids(this.dictionnary["calendar"], this.dictionnary[date[0]], 1, 3, "(0,0,0)");
      let d2 = this.mergeGrids(d1, this.dictionnary[date[1]], 5, 3, "(0,0,0)")

      this.date_grid = this.mergeGrids(this.date_grid, d2, _x, _y, "(0,0,0)")
    },

    getCurrentTime(_showSeconds){
      if(_showSeconds == undefined){
        _showSeconds = false;
      }
      const NOW = new Date();
      let time = this.pad2(NOW.getHours()) + ":" + this.pad2(NOW.getMinutes());
      if(_showSeconds){
        time += ":" + this.pad2(NOW.getSeconds());
      }
      return time;
    },

    writeTime(_x, _y, _showSeconds){
      if(_showSeconds == undefined){
        _showSeconds = false;
      }
      this.oldTime = this.getCurrentTime(_showSeconds);
      this.date_grid = this.writeWord(this.date_grid, this.oldTime, _x, _y);
    },

    writeWord(_grid, _word, _x, _y){
      if(_word != undefined){
        _word = _word.toUpperCase();
        const OLD_X = _x;
        for(let x = 0; x < _word.length; x++){
          const LETTER = this.dictionnary[_word[x]];
          const WIDTH = LETTER[0].length;
          if(_x + WIDTH > this.notification_grid_width){
            _y += LETTER.length + 1;
            _x = OLD_X;
          }
          _grid = this.mergeGrids(_grid, LETTER, _x, _y, "(255,255,255)");
          _x += WIDTH + 1;
        }
      }

      return _grid;
    },

    writeDay(_x, _y, _mondayIsFirstDay){
      const OLD_X = _x;
      const NOW = new Date();

      let day = NOW.getDay();
      if(_mondayIsFirstDay){
        day--;
        if(day < 0){
          day = 6;
        }
      }

      for(let x = 0; x <= 6; x++){
        for(let xx = 0; xx < 3; xx++){
          let color = "(100,100,100)";
          if(x == day){
            color = "(255,255,255)";
          }
          this.date_grid[_y][xx + _x] = color;
        }
        _x += 4;
      }
    },

    notify(_icon, _message){
      this.notification.icon = _icon;
      this.notification.message = message;
    }
  }
});

function requestFullScreen() {

  var el = document.body;

  // Supports most browsers and their versions.
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
  || el.mozRequestFullScreen || el.msRequestFullScreen;

  if (requestMethod) {

    // Native full screen.
    requestMethod.call(el);

  } else if (typeof window.ActiveXObject !== "undefined") {

    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");

    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

/* ###################################################################################################### */
/* ### SOCKET ########################################################################################### */
/* ###################################################################################################### */
const SOCKET = io();

// Si la connection socket avec le serveur est réussie.
SOCKET.on("connect", function() {

});

SOCKET.on("notification", function(_object) {
  APP.notification = _object;
});

// Ce message informe de l'état de connection avec le serveur.
SOCKET.on("settings", function(_object) {
  APP.monday_is_first_day = _object.MondayIsFirstDay;
  APP.time_show_seconds = _object.TimeShowSeconds;
  APP.border_thickness = _object.BorderThickness;
  APP.desired_screen_width = _object.DesiredScreenWidth;
  APP.desired_screen_height = _object.DesiredScreenHeight;
  APP.resizeHandler();
});
