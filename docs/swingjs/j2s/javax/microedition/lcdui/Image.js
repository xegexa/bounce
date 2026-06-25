(function(){var P$=Clazz.newPackage("javax.microedition.lcdui"),I$=[[0,'javax.imageio.ImageIO','java.io.ByteArrayInputStream','java.awt.image.BufferedImage','java.awt.AlphaComposite','java.io.File','java.io.FileInputStream','java.io.ByteArrayOutputStream']],I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "Image");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['I',['logicalW','logicalH'],'O',['buf','java.awt.image.BufferedImage']]]

Clazz.newMeth(C$, 'c$$java_awt_image_BufferedImage',  function (buf) {
C$.c$$java_awt_image_BufferedImage$I$I.apply(this, [buf, -1, -1]);
}, 1);

Clazz.newMeth(C$, 'c$$java_awt_image_BufferedImage$I$I',  function (buf, logicalW, logicalH) {
;C$.$init$.apply(this);
this.buf=buf;
this.logicalW=logicalW;
this.logicalH=logicalH;
}, 1);

Clazz.newMeth(C$, 'fromBufferedImage$java_awt_image_BufferedImage',  function (buf) {
return Clazz.new_(C$.c$$java_awt_image_BufferedImage,[C$.toArgb$java_awt_image_BufferedImage(buf)]);
}, 1);

Clazz.newMeth(C$, 'fromBufferedImage$java_awt_image_BufferedImage$I$I',  function (buf, logicalW, logicalH) {
return Clazz.new_(C$.c$$java_awt_image_BufferedImage$I$I,[C$.toArgb$java_awt_image_BufferedImage(buf), logicalW, logicalH]);
}, 1);

Clazz.newMeth(C$, 'createImage$BA$I$I',  function (data, offset, len) {
try {
var bi=$I$(1,"read$java_io_InputStream",[Clazz.new_($I$(2,1).c$$BA$I$I,[data, offset, len])]);
if (bi == null ) {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["bad image"]);
}bi=C$.toArgb$java_awt_image_BufferedImage(bi);
return Clazz.new_(C$.c$$java_awt_image_BufferedImage,[bi]);
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$Throwable,[e]);
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'toArgb$java_awt_image_BufferedImage',  function (src) {
var w=src.getWidth$();
var h=src.getHeight$();
var dst=Clazz.new_($I$(3,1).c$$I$I$I,[w, h, 2]);
if (w <= 0 || h <= 0 ) {
return dst;
}var row=Clazz.array(Integer.TYPE, [w]);
for (var y=0; y < h; y++) {
src.getRGB$I$I$I$I$IA$I$I(0, y, w, 1, row, 0, w);
dst.setRGB$I$I$I$I$IA$I$I(0, y, w, 1, row, 0, w);
}
return dst;
}, 1);

Clazz.newMeth(C$, 'createImage$I$I',  function (width, height) {
var bi=Clazz.new_($I$(3,1).c$$I$I$I,[width, height, 2]);
return Clazz.new_(C$.c$$java_awt_image_BufferedImage,[bi]);
}, 1);

Clazz.newMeth(C$, 'createImage$javax_microedition_lcdui_Image',  function (source) {
var rw=source.buf.getWidth$();
var rh=source.buf.getHeight$();
var bi=Clazz.new_($I$(3,1).c$$I$I$I,[rw, rh, 2]);
var g=bi.createGraphics$();
try {
g.setComposite$java_awt_Composite($I$(4).Src);
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(source.buf, 0, 0, null);
} finally {
g.dispose$();
}
return Clazz.new_(C$.c$$java_awt_image_BufferedImage$I$I,[bi, source.logicalW, source.logicalH]);
}, 1);

Clazz.newMeth(C$, 'createImage$S',  function (fileName) {
if (fileName == null  || fileName.isEmpty$() ) {
return null;
}var data=C$.readResourceBytes$S(fileName);
if (data != null ) {
try {
return C$.createImage$BA$I$I(data, 0, data.length);
} catch (e) {
if (Clazz.exceptionOf(e,"IllegalArgumentException")){
return null;
} else {
throw e;
}
}
}return null;
}, 1);

Clazz.newMeth(C$, 'readResourceBytes$S',  function (fileName) {
try {
var cl=Clazz.getClass(C$).getClassLoader$();
if (cl != null ) {
try {
var $in=cl.getResourceAsStream$S(fileName);
try {
if ($in != null ) {
return C$.readStreamFully$java_io_InputStream($in);
}
}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
}var absolute=fileName.startsWith$S("/") ? fileName : "/" + fileName;
var url=Clazz.getClass(C$).getResource$S(absolute);
if (url != null ) {
try {
var $in=url.openStream$();
try {
return C$.readStreamFully$java_io_InputStream($in);

}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
}try {
var $in=Clazz.getClass(C$).getResourceAsStream$S(absolute);
try {
if ($in != null ) {
return C$.readStreamFully$java_io_InputStream($in);
}
}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
var f=Clazz.new_($I$(5,1).c$$S,[fileName]);
if (f.isFile$()) {
try {
var $in=Clazz.new_($I$(6,1).c$$java_io_File,[f]);
try {
return C$.readStreamFully$java_io_InputStream($in);

}finally{/*res*/$in&&$in.close$&&$in.close$();}
}finally{}
}} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
return null;
}, 1);

Clazz.newMeth(C$, 'readStreamFully$java_io_InputStream',  function ($in) {
var buf=Clazz.new_($I$(7,1));
var chunk=Clazz.array(Byte.TYPE, [8192]);
var n;
while ((n=$in.read$BA(chunk)) != -1){
buf.write$BA$I$I(chunk, 0, n);
}
return buf.toByteArray$();
}, 1);

Clazz.newMeth(C$, 'getWidth$',  function () {
return this.logicalW >= 0 ? this.logicalW : this.buf.getWidth$();
});

Clazz.newMeth(C$, 'getHeight$',  function () {
return this.logicalH >= 0 ? this.logicalH : this.buf.getHeight$();
});

C$.$static$=function(){C$.$static$=0;
{
$I$(1).setUseCache$Z(false);
};
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
