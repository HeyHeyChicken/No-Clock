const LIBRARIES = {
  FS: require("fs"),
  GIF_FRAMES: require("gif-frames"),
  FRAME: require("./public/js/Frame.js"),
  HTTPS: require("https"),
  PNG: require("png-js"),
  PATH: require("path"),
  BUFFER: require("node:buffer"),
  ARGS: require("node:process"),
};

let retval = 0;
let id = 0;
let icon = "";
let output = "";
const FRAMES_PNG = [];
const FILE_PATH = ".\\public\\js\\icons\\";
const BASE_URL = "https://developer.lametric.com/content/apps/icon_thumbs/";

if (process.argv.length == 6) {
  process.argv[2] == "-id" ? (id = process.argv[3]) : (retval = 1);
  process.argv[4] == "-icon" ? (icon = process.argv[5]) : (retval = 1);
} else {
  retval = 1;
}

if (retval == 1) {
  console.log(
    'Invalid Arguments: example: <node.exe> <LMtoNC.js> -id <Icon ID> -icon "Short_Icon_Name"'
  );
  process.exit(1);
} else {
  icon = icon.toLowerCase().replace(/ /g, "_");
  getIcons(BASE_URL, id, ".gif");
}

function getIcons(url, id, ext) {
  LIBRARIES.HTTPS.get(url + id + ext, (res) => {
    res.on("data", (d) => {
      const IMG_BUF = Buffer.from(d);

      if (ext == ".png") {
        FRAMES_PNG.push(IMG_BUF);
        PNGToGrid();
      } else if (ext == ".gif") {
        LIBRARIES.GIF_FRAMES(
          { url: IMG_BUF, frames: "all", outputType: "png" },
          function (err, frameData) {
            if (err) {
              throw err;
            }

            frameData.forEach(function (frame) {
              const STREAM = frame.getImage();
              const BUFS = [];
              STREAM.on("data", function (d) {
                BUFS.push(d);
              });
              STREAM.on("end", function () {
                const BUF = Buffer.concat(BUFS);
                FRAMES_PNG.push(BUF);

                if (FRAMES_PNG.length == frameData.length) {
                  FRAMES_PNG.sort();
                  PNGToGrid();
                }
              });
            });
          }
        );
      }
    });
  })
    .on("error", (err) => {
      console.log("Error: ", err.code);
    })
    .on("response", (res) => {
      if (res.statusCode == 404) {
        if (ext == ".gif") {
          getIcons(BASE_URL, id, ".png");
        } else {
          console.log("Error: Icon not found.");
          process.exit(1);
        }
      }
    });
}

function PNGToGrid() {
  output = "DICTIONNARY." + icon + " = new Icon([" + "\n";
  Loop(FRAMES_PNG, function () {
    output += "]);" + "\n";
    LIBRARIES.FS.writeFileSync(FILE_PATH + icon + ".js", output);
    console.log('Success: Icon created on "' + FILE_PATH + icon + '.js"');
  });
}

function Loop(array, callback, index = 0) {
  new LIBRARIES.PNG(array[index]).decode(function (pixels) {
    const FRAME = new LIBRARIES.FRAME([[], [], [], [], [], [], [], []]);

    for (let i = 0; i < pixels.length; i += 4) {
      const Y = Math.floor(Math.floor(i / 4) / 8);
      FRAME.grid[Y].push(
        "(" + pixels[i + 0] + "," + pixels[i + 1] + "," + pixels[i + 2] + ")"
      );
    }
    output += "    new Frame([" + "\n";

    for (let x = 0; x < 8; x++) {
      let str = "        ";
      x == 8
        ? (str += JSON.stringify(FRAME.grid[x]))
        : (str += JSON.stringify(FRAME.grid[x]) + ",");
      output += str + "\n";
    }

    if (index == array.length - 1) {
      output += "    ], 100)" + "\n";
      callback();
    } else {
      output += "    ], 100)," + "\n";
      Loop(array, callback, index + 1);
    }
  });
}
