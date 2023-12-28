const LIBRARIES = {
  FS: require("fs"),
  GIF_FRAMES: require("gif-frames"),
  FRAME: require("./public/js/Frame.js"),
  HTTPS: require("https"),
  PNG: require('png-js'),
  PATH: require('path'),
  BUFFER: require('node:buffer'),
  ARGS: require('node:process')
};

var retval = 0;
let frames_png = [];
let ID = 0;
let icon = 0;
let output = '';
let FILE_PATH = '.\\public\\js\\icons\\';
let BASE_URL = 'https://developer.lametric.com/content/apps/icon_thumbs/';

if (process.argv.length==6) { 
   (process.argv[2] == '-id') ? ID=process.argv[3] : retval=1; 
   (process.argv[4] == '-icon') ? icon=process.argv[5] : retval=1; 
} 
else { retval = 1; }

if (retval == 1) { 
  console.log('Invalid Arguments: example: <node.exe> <LMtoNC.js> -id <Icon ID> -icon "Short_Icon_Name"');
  process.exit(1); 
} 
else { getIcons(BASE_URL,ID,'.gif'); }

function getIcons(url, ID, ext) {
req = LIBRARIES.HTTPS.get(url+ID+ext, (res) => {
	res.on('data', (d) => {     
    const imgbuf = Buffer.from(d);

  if(ext == '.png') {
    frames_png.push(imgbuf);
    PNGToGrid();
  }

  if(ext == '.gif') {
    LIBRARIES.GIF_FRAMES({ url: imgbuf, frames: "all", outputType: "png" }, function (err, frameData) {
      if (err) { throw err; }

      frameData.forEach(function (frame) {
        var stream = frame.getImage();
        var bufs = [];
          stream.on('data', function(d){ bufs.push(d); });
          stream.on('end',  function( ){ 
            var buf = Buffer.concat(bufs);
            frames_png.push(buf);

            if(frames_png.length == frameData.length){
              frames_png.sort();
              PNGToGrid();
            }
          });
      });    
    });
  } 
  }); 
})
.on("error", (err) => { console.log("Error: ", err.code); })
.on("response", (res) => { 
  if(res.statusCode == 404) {
    if (ext == '.gif') {
      req.abort();
      getIcons(BASE_URL,ID,'.png');
    } else {
      console.log('Error: Icon not found.');
      req.abort();
      process.exit(1);
    }
  }
});
}

function PNGToGrid(){
  output += 'DICTIONNARY.' + icon + ' = new Icon([' + "\n";
  Loop(frames_png, 0, function(){
    output += ']);' + "\n";
    LIBRARIES.FS.writeFileSync(FILE_PATH + icon + '.js', output);
    console.log('Success: Icon created on "' + FILE_PATH + icon + '.js"');
  });
}

function Loop(array, index, callback){
  new LIBRARIES.PNG(array[index]).decode(function(pixels) {
    let f = new LIBRARIES.FRAME([
      [],[],[],[],[],[],[],[]
    ]);

    for(let i = 0; i < pixels.length; i+=4){
      const Y = Math.floor(Math.floor(i/4)/8);
      f.grid[Y].push("(" + pixels[i + 0] + "," + pixels[i + 1] + "," + pixels[i + 2] + ")");
    }
    output += '  new Frame([' + "\n";
    
    for(let x = 0; x < 8; x++){
      let str = "    ";
      (x==8) ? str += JSON.stringify(f.grid[x]) : str += JSON.stringify(f.grid[x]) + ",";
      output += str + "\n";
    }

    if(index == array.length - 1){
      output += '  ], 100)' + "\n";
      callback();
    }
    else{
      output += '  ], 100),' + "\n";
      Loop(array, index + 1, callback);
    }
  });
}