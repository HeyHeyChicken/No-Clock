const LIBRARIES = {
  FS: require("fs"),
  GIF_FRAMES: require("gif-frames"),
  FRAME: require("./public/js/Frame.js"),
  HTTPS: require("https"),
  PNG: require("png-js"),
  COLORS: require("colors/safe"),
};

class LMToNC {
  static #base_url = "https://developer.lametric.com/content/apps/icon_thumbs/";
  static #file_path = ".\\public\\js\\icons\\";

  /*
  let output = "";
  */

  constructor() {}

  /**
   * This fonction will donwload the icon from the LaMetric API.
   * @param {*} iconName Icon name.
   * @param {*} iconId (optional) Icon LaMetric API's ID.
   */
  static download(iconName, iconId, callback) {
    console.log(
      LIBRARIES.COLORS.yellow(
        ' - The icon "' +
          iconName +
          '" is missing. We are trying to download it.'
      )
    );
    if (!iconId) {
      LMToNC.getIconIdByName(iconName, (iconIdFromAPI) => {
        LMToNC.#getIcons(iconName, iconIdFromAPI, ".gif", callback);
      });
    } else {
      LMToNC.#getIcons(iconName, iconId, ".gif", callback);
    }
  }

  /**
   * This function will retrieve the ID of the first icon from the LaMetric API by filtering by icon name.
   * @param {*} iconName Icon name.
   * @param {*} callback Function that will be called once the icon ID is found.
   */
  static getIconIdByName(iconName, callback) {
    const NB_RESULT = 1;
    LIBRARIES.HTTPS.get(
      "https://developer.lametric.com/api/v1/dev/preloadicons?search=" +
        iconName +
        "&count=" +
        NB_RESULT,
      (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            const JSONED_BODY = JSON.parse(body);
            if (JSONED_BODY) {
              if (JSONED_BODY.icons) {
                if (JSONED_BODY.icons.length == NB_RESULT) {
                  if (callback) {
                    callback(JSONED_BODY.icons[0].id);
                  }
                } else {
                  console.log(
                    LIBRARIES.COLORS.red(
                      ' - No icon named "' + iconName + '" was found.'
                    )
                  );
                }
              }
            }
          } catch (error) {
            console.error(error.message);
          }
        });
      }
    ).on("error", (error) => {
      console.error(error.message);
    });
  }

  static #getIcons(iconName, id, ext, callback, output = "", frames_png = []) {
    iconName = iconName.toLowerCase().replace(/ /g, "_");
    LIBRARIES.HTTPS.get(LMToNC.#base_url + id + ext, (res) => {
      if (res.statusCode != 404) {
        res.on("data", (d) => {
          const IMG_BUF = Buffer.from(d);
          if (ext == ".png") {
            frames_png.push(IMG_BUF);
            LMToNC.#PNGToGrid(output, iconName, frames_png, callback);
          } else if (ext == ".gif") {
            LIBRARIES.GIF_FRAMES(
              { url: IMG_BUF, frames: "all", outputType: "png" },
              function (err, frameData) {
                if (err) {
                  LMToNC.#getIcons(iconName, id, ".png", callback);
                } else {
                  frameData.forEach(function (frame) {
                    const STREAM = frame.getImage();
                    const BUFS = [];
                    STREAM.on("data", function (d) {
                      BUFS.push(d);
                    });
                    STREAM.on("end", function () {
                      const BUF = Buffer.concat(BUFS);
                      frames_png.push(BUF);

                      if (frames_png.length == frameData.length) {
                        frames_png.sort();
                        LMToNC.#PNGToGrid(
                          output,
                          iconName,
                          frames_png,
                          callback
                        );
                      }
                    });
                  });
                }
              }
            );
          }
        });
      }
    })
      .on("error", (err) => {
        console.log("Error: ", err.code);
      })
      .on("response", (res) => {
        if (res.statusCode == 404) {
          if (ext == ".gif") {
            LMToNC.#getIcons(iconName, id, ".png", callback);
          } else {
            console.log(
              LIBRARIES.COLORS.red(
                ' - No icon named "' + iconName + '" was found.'
              )
            );
          }
        }
      });
  }

  static #PNGToGrid(output, iconName, frames_png, callback) {
    output = "DICTIONNARY." + iconName + " = new Icon([" + "\n";
    LMToNC.#Loop(output, frames_png, (end_output) => {
      end_output += "]);" + "\n";
      LIBRARIES.FS.writeFileSync(
        LMToNC.#file_path + iconName + ".js",
        end_output
      );
      console.log(
        LIBRARIES.COLORS.green(
          ' - The icon "' +
            iconName +
            '" is downloaded and created on "' +
            LMToNC.#file_path +
            iconName +
            '.js".'
        )
      );
      if (callback) {
        callback();
      }
    });
  }

  static #Loop(output, array, callback, index = 0) {
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
        callback(output);
      } else {
        output += "    ], 100)," + "\n";
        LMToNC.#Loop(output, array, callback, index + 1);
      }
    });
  }
}

module.exports = LMToNC;
