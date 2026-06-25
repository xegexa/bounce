(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),I$=[[0,'java.awt.image.BufferedImage','java.util.Arrays','javax.swing.ImageIcon','java.io.File','java.io.ByteArrayOutputStream','java.awt.MediaTracker','java.awt.Canvas','Thread']],I$0=I$[0],$I$=function(i,n){return((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "ImageLoader");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'createImage$I$I',  function (width, height) {
var image=Clazz.new_($I$(1,1).c$$I$I$I,[width, height, 6]);
return image;
}, 1);

Clazz.newMeth(C$, 'createImage$BA$I$I',  function (imageData, imageOffset, imageLength) {
var slice;
if (imageOffset == 0 && imageLength == imageData.length ) {
slice=imageData;
} else {
slice=$I$(2).copyOfRange$BA$I$I(imageData, imageOffset, imageOffset + imageLength);
}var icon=Clazz.new_($I$(3,1).c$$BA,[slice]);
return C$.toBufferedImage$java_awt_Image(icon.getImage$());
}, 1);

Clazz.newMeth(C$, 'createImage$S',  function (fileName) {
var image=null;
System.out.println$S("Load image: " + fileName);
try {
image=C$.readImageFromClasspath$S(fileName);
if (image == null ) {
var f=Clazz.new_($I$(4,1).c$$S,[fileName]);
if (f.isFile$()) {
var icon=Clazz.new_([f.getAbsolutePath$()],$I$(3,1).c$$S);
image=C$.toBufferedImage$java_awt_Image(icon.getImage$());
}}} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
return image;
}, 1);

Clazz.newMeth(C$, 'readImageFromClasspath$S',  function (fileName) {
if (fileName == null  || fileName.isEmpty$() ) {
return null;
}var cl=Clazz.getClass(C$).getClassLoader$();
if (cl != null ) {
try {
var $in=cl.getResourceAsStream$S(fileName);
try {
if ($in != null ) {
return C$.loadFromBytes$BA(C$.readStreamFully$java_io_InputStream($in));
}
}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
}var absolute=fileName.startsWith$S("/") ? fileName : "/" + fileName;
var url=Clazz.getClass(C$).getResource$S(absolute);
if (url != null ) {
var icon=Clazz.new_($I$(3,1).c$$java_net_URL,[url]);
return C$.toBufferedImage$java_awt_Image(icon.getImage$());
}try {
var $in=Clazz.getClass(C$).getResourceAsStream$S(absolute);
try {
if ($in != null ) {
return C$.loadFromBytes$BA(C$.readStreamFully$java_io_InputStream($in));
}
}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
return null;
}, 1);

Clazz.newMeth(C$, 'loadFromBytes$BA',  function (data) {
var icon=Clazz.new_($I$(3,1).c$$BA,[data]);
return C$.toBufferedImage$java_awt_Image(icon.getImage$());
}, 1);

Clazz.newMeth(C$, 'readStreamFully$java_io_InputStream',  function ($in) {
var buf=Clazz.new_($I$(5,1));
var chunk=Clazz.array(Byte.TYPE, [8192]);
var n;
while ((n=$in.read$BA(chunk)) != -1){
buf.write$BA$I$I(chunk, 0, n);
}
return buf.toByteArray$();
}, 1);

Clazz.newMeth(C$, 'waitForImage$java_awt_Image',  function (image) {
if (image == null ) {
return;
}var tracker=Clazz.new_([Clazz.new_($I$(7,1))],$I$(6,1).c$$java_awt_Component);
tracker.addImage$java_awt_Image$I(image, 0);
try {
tracker.waitForID$I(0);
} catch (e) {
if (Clazz.exceptionOf(e,"InterruptedException")){
$I$(8).currentThread$().interrupt$();
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'toBufferedImage$java_awt_Image',  function (image) {
if (image == null ) {
return null;
}if (Clazz.instanceOf(image, "java.awt.image.BufferedImage")) {
return image;
}C$.waitForImage$java_awt_Image(image);
var w=image.getWidth$java_awt_image_ImageObserver(null);
var h=image.getHeight$java_awt_image_ImageObserver(null);
if (w <= 0 || h <= 0 ) {
return null;
}var bi=Clazz.new_($I$(1,1).c$$I$I$I,[w, h, 2]);
var g=bi.createGraphics$();
try {
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(image, 0, 0, null);
} finally {
g.dispose$();
}
return bi;
}, 1);

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-04-19 21:50:05 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
