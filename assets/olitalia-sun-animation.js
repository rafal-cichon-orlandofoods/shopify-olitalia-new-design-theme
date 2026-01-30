(function (cjs, an) {
var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [{name:"olitalia_sun_animation_atlas_1", frames: [[0,0,594,923],[596,346,864,270],[596,0,958,344]]}];

(lib.AnMovieClip = function(){
this.actionFrames = [];
this.ignorePause = false;
this.gotoAndPlay = function(positionOrLabel){
cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
}
this.play = function(){
cjs.MovieClip.prototype.play.call(this);
}
this.gotoAndStop = function(positionOrLabel){
cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
}
this.stop = function(){
cjs.MovieClip.prototype.stop.call(this);
}
}).prototype = p = new cjs.MovieClip();
// symbols:
(lib.CachedBmp_3 = function() {
this.initialize(ss["olitalia_sun_animation_atlas_1"]);
this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();

(lib.CachedBmp_2 = function() {
this.initialize(ss["olitalia_sun_animation_atlas_1"]);
this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();

(lib.CachedBmp_1 = function() {
this.initialize(ss["olitalia_sun_animation_atlas_1"]);
this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();

(lib.Layer1GradientMap1 = function() {
this.initialize(img.Layer1GradientMap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4691,4691);

// helper functions:
function mc_symbol_clone() {
var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
clone.gotoAndStop(this.currentFrame);
clone.paused = this.paused;
clone.framerate = this.framerate;
return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
var prototype = cjs.extend(symbol, cjs.MovieClip);
prototype.clone = mc_symbol_clone;
prototype.nominalBounds = nominalBounds;
prototype.frameBounds = frameBounds;
return prototype;
}

(lib.olivebranch = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.CachedBmp_3();
this.instance.setTransform(-35.1,-48.4,0.1184,0.1184);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.olivebranch, new cjs.Rectangle(-35.1,-48.4,70.30000000000001,109.3), null);


(lib.no1chef = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.CachedBmp_2();
this.instance.setTransform(-51.1,-15.9,0.1184,0.1184);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.no1chef, new cjs.Rectangle(-51.1,-15.9,102.30000000000001,32), null);


(lib.favoilbrand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.CachedBmp_1();
this.instance.setTransform(-56.6,-20.3,0.1184,0.1184);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.favoilbrand, new cjs.Rectangle(-56.6,-20.3,113.4,40.7), null);


(lib.orangesunpsd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_3
this.instance = new lib.Layer1GradientMap1();
this.instance.setTransform(3.55,103.95,0.0214,0.0214,0,180,0);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.orangesunpsd, new cjs.Rectangle(3.6,3.5,100.5,100.5), null);


(lib.sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.orangesunpsd();
this.instance.setTransform(-0.2,-0.1,1,1,0,0,0,53.6,53.6);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sun, new cjs.Rectangle(-50.2,-50.2,100.5,100.5), null);


(lib.copytop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.no1chef();
this.instance.setTransform(2,-47.75);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.copytop, new cjs.Rectangle(-49.1,-63.6,102.30000000000001,31.900000000000002), null);


(lib.copybottom = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

// Layer_1
this.instance = new lib.favoilbrand();
this.instance.setTransform(0,43.35);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.copybottom, new cjs.Rectangle(-56.6,23.1,113.4,40.699999999999996), null);


// stage content:
(lib.olitaliasunanimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
var props = new Object();
props.mode = mode;
props.startPosition = startPosition;
props.labels = {};
props.loop = loop;
props.reversed = reversed;
cjs.MovieClip.apply(this,[props]);

this.actionFrames = [65];
// timeline functions:
this.frame_65 = function() {
var _this = this;
/*Stop a Movie Clip/Video
Stops the specified movie clip or video.
*/
_this.stop();
}

// actions tween:
this.timeline.addTween(cjs.Tween.get(this).wait(65).call(this.frame_65).wait(1));

// Layer_17 (mask)
var mask = new cjs.Shape();
mask._off = true;
var mask_graphics_31 = new cjs.Graphics().p("Egi4AJPQC8lBEZkYQNPtPSvAAQSwAANPNPQEFEFC2EoIohGGQiUj9jdjeQqNqLubAAQuaAAqNKLQjsDriWEQg");

this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(31).to({graphics:mask_graphics_31,x:277.3118,y:96.9122}).wait(35));

// copy_top
this.instance = new lib.copytop();
this.instance.setTransform(296.05,304.45,4.2241,4.2241,135);
this.instance._off = true;

var maskedShapeInstanceList = [this.instance];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask;
}

this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({_off:false},0).to({scaleX:4.2242,scaleY:4.2242,rotation:0},28,cjs.Ease.quartOut).wait(7));

// Layer_18 (mask)
var mask_1 = new cjs.Shape();
mask_1._off = true;
var mask_1_graphics_38 = new cjs.Graphics().p("Egc0Ag2QkGkGi2knQhQiDg9iHQgqhXgihbIgEgIIJqj+QAPAqARApQAzB2BBByIAVAiQCODqDPDPQKNKNOaAAQObAAKMqNQDtjqCWkRQA1hfAshjQACgJAEgIIJLFDIgEALIgRAoQg0BuhABpQi8FBkZEZQtPNPyvAAQyvAAtPtPg");

this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(38).to({graphics:mask_1_graphics_38,x:285.4435,y:294.9236}).wait(28));

// copy_bottom
this.instance_1 = new lib.copybottom();
this.instance_1.setTransform(296.05,304.45,4.2241,4.2241,135);
this.instance_1._off = true;

var maskedShapeInstanceList = [this.instance_1];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
}

this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(38).to({_off:false},0).to({scaleX:4.2242,scaleY:4.2242,rotation:0},25,cjs.Ease.quartOut).wait(3));

// circle_mask (mask)
var mask_2 = new cjs.Shape();
mask_2._off = true;
var mask_2_graphics_11 = new cjs.Graphics().p("A3tYsQp0qOAAueQAAudJ0qQQJ1qON4AAQN5AAJ0KOQJ1KQAAOdQAAOep1KOQp0KQt5AAQt4AAp1qQg");

this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(11).to({graphics:mask_2_graphics_11,x:303.65,y:286.8}).wait(55));

// olive_branch
this.instance_2 = new lib.olivebranch();
this.instance_2.setTransform(296.3,657.95,1.9434,4.2242,0,0,0,0,0.1);
this.instance_2._off = true;

var maskedShapeInstanceList = [this.instance_2];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
}

this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).to({regY:0,scaleX:3.5632,x:298.3,y:282.45},11,cjs.Ease.quadOut).to({regX:0.1,regY:0.1,scaleX:4.0999,scaleY:4.2236,x:301.05,y:313.05},8,cjs.Ease.quadInOut).to({regX:0,regY:0,scaleX:4.2242,scaleY:4.2242,x:300.3,y:305.7},5,cjs.Ease.sineOut).wait(31));

// sun
this.instance_3 = new lib.sun();
this.instance_3.setTransform(300.5,340.35,4.2242,4.2242,0,0,0,-0.2,-0.1);
this.instance_3.alpha = 0;
this.instance_3._off = true;

this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5).to({_off:false},0).to({y:298.1,alpha:1},8,cjs.Ease.quadOut).wait(53));

this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,554.6,589.9);
// library properties:
lib.properties = {
id: '117E02CA86B748899282774A40150680',
width: 600,
height: 600,
fps: 30,
color: "#FFFFFF",
opacity: 1.00,
manifest: [],
preloads: []
};

// bootstrap callback support:
(lib.Stage = function(canvas) {
createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }
p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
an.bootstrapListeners.push(fnCallback);
if(an.bootcompsLoaded.length > 0) {
for(var i=0; i<an.bootcompsLoaded.length; ++i) {
fnCallback(an.bootcompsLoaded[i]);
}
}
};

an.compositions = an.compositions || {};
an.compositions['117E02CA86B748899282774A40150680'] = {
getStage: function() { return exportRoot.stage; },
getLibrary: function() { return lib; },
getSpriteSheet: function() { return ss; },
getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
an.bootcompsLoaded.push(id);
for(var j=0; j<an.bootstrapListeners.length; j++) {
an.bootstrapListeners[j](id);
}
}

an.getComposition = function(id) {
return an.compositions[id];
}

an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {      
var lastW, lastH, lastS=1;      
window.addEventListener('resize', resizeCanvas);        
resizeCanvas();     
function resizeCanvas() {           
var w = lib.properties.width, h = lib.properties.height;            
var iw = window.innerWidth, ih=window.innerHeight;          
var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;          
if(isResp) {                
if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
sRatio = lastS;                
}               
else if(!isScale) {                 
if(iw<w || ih<h)                        
sRatio = Math.min(xRatio, yRatio);              
}               
else if(scaleType==1) {                 
sRatio = Math.min(xRatio, yRatio);              
}               
else if(scaleType==2) {                 
sRatio = Math.max(xRatio, yRatio);              
}           
}
domContainers[0].width = w * pRatio * sRatio;           
domContainers[0].height = h * pRatio * sRatio;
domContainers.forEach(function(container) {             
container.style.width = w * sRatio + 'px';              
container.style.height = h * sRatio + 'px';         
});
stage.scaleX = pRatio*sRatio;           
stage.scaleY = pRatio*sRatio;
lastW = iw; lastH = ih; lastS = sRatio;            
stage.tickOnUpdate = false;            
stage.update();            
stage.tickOnUpdate = true;      
}
}

an.handleSoundStreamOnTick = function(event) {
if(!event.paused){
var stageChild = stage.getChildAt(0);
if(!stageChild.paused || stageChild.ignorePause){
stageChild.syncStreamSounds();
}
}
}

an.handleFilterCache = function(event) {
if(!event.paused){
var target = event.target;
if(target){
if(target.filterCacheList){
for(var index = 0; index < target.filterCacheList.length ; index++){
var cacheInst = target.filterCacheList[index];
if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
}
}
}
}
}
}

})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
