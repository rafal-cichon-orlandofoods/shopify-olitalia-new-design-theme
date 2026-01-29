(function (cjs, an) {
var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [{name:"olitalia_sun_animation_atlas_1", frames: [[0,0,141,219],[143,83,205,64],[143,0,227,81]]}];

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
this.instance.setTransform(-35.15,-48.45,0.5,0.5);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.olivebranch, new cjs.Rectangle(-35.1,-48.4,70.5,109.5), null);


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
this.instance.setTransform(-51.15,-15.95,0.5,0.5);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.no1chef, new cjs.Rectangle(-51.1,-15.9,102.5,32), null);


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
this.instance.setTransform(-56.65,-20.35,0.5,0.5);

this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.favoilbrand, new cjs.Rectangle(-56.6,-20.3,113.5,40.5), null);


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

}).prototype = getMCSymbolPrototype(lib.copytop, new cjs.Rectangle(-49.1,-63.7,102.5,32), null);


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

}).prototype = getMCSymbolPrototype(lib.copybottom, new cjs.Rectangle(-56.6,23,113.5,40.5), null);


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

// Layer_17 (mask)
var mask = new cjs.Shape();
mask._off = true;
var mask_graphics_25 = new cjs.Graphics().p("An6CaQAshMBDhCQDIjIEbAAQEcAADJDIQA+A+ArBGIiBBcQgjg8g1g0QiaiajbAAQjZAAibCaQg3A4gkBAg");

this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(25).to({graphics:mask_graphics_25,x:67.7625,y:24.3625}).wait(38));

// copy_top
this.instance = new lib.copytop();
this.instance.setTransform(74.35,74.95,1,1,135);
this.instance._off = true;

var maskedShapeInstanceList = [this.instance];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask;
}

this.timeline.addTween(cjs.Tween.get(this.instance).wait(25).to({_off:false},0).to({rotation:0},28,cjs.Ease.quartOut).wait(10));

// Layer_18 (mask)
var mask_1 = new cjs.Shape();
mask_1._off = true;
var mask_1_graphics_32 = new cjs.Graphics().p("AmeIAQg/g+grhGQgSgfgPggQgKgVgIgVIgBgCICTg8IAHATQAMAdAPAaIAFAIQAiA4AxAxQCaCbDaAAQDaAACbibQA4g3AjhBQANgXAKgXIACgEICLBMIgBADIgEAJQgNAagOAZQgtBNhDBCQjIDIkcAAQkbAAjIjIg");

this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(32).to({graphics:mask_1_graphics_32,x:69.7,y:71.25}).wait(31));

// copy_bottom
this.instance_1 = new lib.copybottom();
this.instance_1.setTransform(74.35,74.95,1,1,135);
this.instance_1._off = true;

var maskedShapeInstanceList = [this.instance_1];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
}

this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(32).to({_off:false},0).to({rotation:0},25,cjs.Ease.quartOut).wait(6));

// circle_mask (mask)
var mask_2 = new cjs.Shape();
mask_2._off = true;
var mask_2_graphics_11 = new cjs.Graphics().p("AjoHWQiUiVAAjSQAAjSCUiVQCViUDSAAQDSAACVCUQCVCVAADSQAADSiVCVQiVCUjSAAQjSAAiViUg");

this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(11).to({graphics:mask_2_graphics_11,x:63.475,y:61.85}).wait(52));

// olive_branch
this.instance_2 = new lib.olivebranch();
this.instance_2.setTransform(75.35,172.85,0.4601,1,0,0,0,0,0.1);
this.instance_2._off = true;

var maskedShapeInstanceList = [this.instance_2];

for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
}

this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).to({regY:0,scaleX:0.8435,y:69.75},10,cjs.Ease.quadOut).to({scaleX:0.9713,scaleY:0.936,y:81.65},6,cjs.Ease.quadInOut).to({scaleX:1,scaleY:1,y:75.25},6,cjs.Ease.quadInOut).wait(30));

// sun
this.instance_3 = new lib.sun();
this.instance_3.setTransform(75.4,83.45,1,1,0,0,0,-0.2,-0.1);
this.instance_3.alpha = 0;
this.instance_3._off = true;

this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5).to({_off:false},0).to({y:73.45,alpha:1},8,cjs.Ease.quadOut).wait(50));

this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,135.6,142.5);
// library properties:
lib.properties = {
id: '117E02CA86B748899282774A40150680',
width: 300,
height: 300,
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
}

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
