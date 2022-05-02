class Icon {
  constructor(_frames) {
    this.frames = _frames;
  }

  duration() {
    let d = 0;
    for(let i = 0; i < this.frames.length; i++){
      d += this.frames[i].duration;
    }
    return d;
  }
}

if(typeof module != "undefined"){
  module.exports = Icon;
}
