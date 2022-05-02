const ID = 18854;

const LIBRARIES = {
  FS: require("fs"),
  GIF_FRAMES: require("gif-frames"),
  FRAME: require("./public/js/Frame.js"),
  HTTPS: require("https"),
  PNG: require('png-js'),
  PATH: require('path')
};

const TEMP_FOLDER = "temp";
let frames_png = [];

LIBRARIES.HTTPS.get("https://developer.lametric.com/content/apps/icon_thumbs/" + ID + ".gif", (res) => {
  const TEMP_FILE_NAME = LIBRARIES.PATH.join(TEMP_FOLDER, "temp.gif");
  // Open file in local filesystem
  LIBRARIES.FS.mkdirSync(TEMP_FOLDER);
  const FILE = LIBRARIES.FS.createWriteStream(TEMP_FILE_NAME);

  // Write data into local file
  res.pipe(FILE);

  // Close the file
  FILE.on("finish", () => {
    FILE.close();
    console.log('"call": new Icon([');

    LIBRARIES.GIF_FRAMES({ url: TEMP_FILE_NAME, frames: "all", outputType: "png" },
      function (err, frameData) {
        if (err) {
          throw err;
        }

        frameData.forEach(function (frame) {
          const TEMP_SMALL_FILE_NAME = LIBRARIES.PATH.join(TEMP_FOLDER, "temp-" + (1000 + frame.frameIndex) + ".png");
          let stream = frame.getImage().pipe(LIBRARIES.FS.createWriteStream(TEMP_SMALL_FILE_NAME));

          stream.on("finish", function () {
            frames_png.push(TEMP_SMALL_FILE_NAME);
            if(frames_png.length == frameData.length){
              frames_png.sort();
              PNGToGrid();
            }
          });
        });
      }
    );

  });
}).on("error", (err) => {
  console.log("Error: ", err.message);
});

function PNGToGrid(){
  Loop(frames_png, 0, function(){
    console.log("]),");
    LIBRARIES.FS.rmSync(TEMP_FOLDER, { recursive: true });
  });
}

function Loop(array, index, callback){
  LIBRARIES.PNG.decode(array[index], function(pixels) {
    let f = new LIBRARIES.FRAME([
      [],[],[],[],[],[],[],[]
    ]);

    for(let i = 0; i < pixels.length; i+=4){
      const Y = Math.floor(Math.floor(i/4)/8);
      f.grid[Y].push("(" + pixels[i + 0] + "," + pixels[i + 1] + "," + pixels[i + 2] + ")");
    }
    console.log("  new Frame([");
    console.log("    " + JSON.stringify(f.grid[0]) + ",");
    console.log("    " + JSON.stringify(f.grid[1]) + ",");
    console.log("    " + JSON.stringify(f.grid[2]) + ",");
    console.log("    " + JSON.stringify(f.grid[3]) + ",");
    console.log("    " + JSON.stringify(f.grid[4]) + ",");
    console.log("    " + JSON.stringify(f.grid[5]) + ",");
    console.log("    " + JSON.stringify(f.grid[6]) + ",");
    console.log("    " + JSON.stringify(f.grid[7]));
    console.log("  ], 100),");

    if(index == array.length - 1){
      callback();
    }
    else{
      Loop(array, index + 1, callback);
    }
  });
}
