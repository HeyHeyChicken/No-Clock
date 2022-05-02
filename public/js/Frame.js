class Frame {
  constructor(_grid, _duration) {
    if(_duration == undefined){
      _duration = 1;
    }
    this.grid = _grid;
    this.duration = _duration;
  }
}

if(typeof module != "undefined"){
  module.exports = Frame;
}
