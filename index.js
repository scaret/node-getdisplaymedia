const fs = require("fs");
const wrtc = require("wrtc");

function getDisplayMedia(options){
    const platform = process.platform;
    const capturer = require(`./capture/${platform}`)(options || {});
    const source = new wrtc.nonstandard.RTCVideoSource();
    const track = source.createTrack();
    const stream = new wrtc.MediaStream();
    stream.addTrack(track);

    capturer.start();
    capturer.on("frame", (frame)=>{
        source.onFrame(frame);
    });

    return Promise.resolve(stream);
}

module.exports = getDisplayMedia;

// getDisplayMedia().then((ms)=>{
//    console.log("MediaStream", ms);
// });