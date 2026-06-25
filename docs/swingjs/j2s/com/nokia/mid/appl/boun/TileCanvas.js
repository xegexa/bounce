(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),I$=[[0,'java.awt.Color','javax.microedition.lcdui.Image','java.io.File','java.io.FileInputStream','Thread','com.nokia.mid.appl.boun.Local','java.nio.file.Paths','java.io.DataInputStream','java.awt.RenderingHints','java.awt.Image','java.awt.Graphics','Runtime','com.nokia.mid.appl.boun.d','javax.swing.Timer']],I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "TileCanvas", null, 'javax.swing.JPanel', 'java.awt.event.KeyListener');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
this.mLevelNum=-1;
this.mWidth=0;
this.mHeight=0;
this.mGameTimer=null;
},1);

C$.$fields$=[['Z',['scrollFlag','mOpenFlag'],'I',['tileX','tileY','divTileX','divisorLine','v','mLevelNum','mStartCol','mStartRow','mStartBallSize','mExitPosX','mExitPosY','mTileMapWidth','mTileMapHeight','mTotalNumRings','mNumMoveObj','mTopLeftExitTileCol','mTopLeftExitTileRow','mImageOffset','mWidth','mHeight'],'S',['mLevelPath','mLevelNumStr','mLevelCompletedStr'],'O',['mGameBuffer','java.awt.Image','mGameBufferGraphics','java.awt.Graphics','tileImages','java.awt.Image[]','mTile50Rot3','java.awt.Image','+mTile50Rot4','+mTile50Rot5','+mTile51Rot3','+mTile51Rot4','+mTile51Rot5','+mTile52Rot3','+mTile52Rot4','+mTile52Rot5','+mTile54Rot3','+mTile54Rot4','+mTile54Rot5','mExitTileGraphics','java.awt.Graphics','tmpTileImage','java.awt.Image','tmpTileImageG','java.awt.Graphics','tileMap','short[][]','+mMOTopLeft','+mMOBotRight','+mMODirection','+mMOOffset','mMOImgPtr','java.awt.Image[]','mMOImgGraphics','java.awt.Graphics[]','mSpikeImgPtr','java.awt.Image','+mUILife','+mUIRing','+mExitTileImage','+mImgPtr','mDisplay','javax.swing.JFrame','mGameTimer','javax.swing.Timer']]
,['O',['TILE_FILL_DIM','java.awt.Color','+TILE_FILL_NORMAL']]]

Clazz.newMeth(C$, 'c$$javax_swing_JFrame',  function (paramDisplay) {
Clazz.super_(C$, this);
this.mDisplay=paramDisplay;
if (Boolean.parseBoolean$S(System.getProperty$S$S("midp.web", "false"))) {
this.setDoubleBuffered$Z(false);
}this.mWidth=this.getWidth$();
this.mHeight=this.getHeight$();
this.v=0;
this.divisorLine=156;
this.mGameBuffer=$I$(2).createImage$I$I(156, 96).buf;
this.mGameBufferGraphics=this.mGameBuffer.getGraphics$();
this.mGameBufferGraphics.setColor$java_awt_Color($I$(1).BLACK);
this.mGameBufferGraphics.fillRect$I$I$I$I(0, 0, 156, 96);
this.tmpTileImage=$I$(2).createImage$I$I(12, 12).buf;
this.tmpTileImageG=this.tmpTileImage.getGraphics$();
this.loadTileImages$();
this.tileX=0;
this.tileY=0;
this.scrollFlag=false;
this.divTileX=this.tileX + 13;
this.tileMap=null;
}, 1);

Clazz.newMeth(C$, 'loadLevel$I',  function (levelNum) {
var str="";
if (levelNum < 10) {
str="00" + levelNum;
} else if (levelNum < 100) {
str="0" + levelNum;
}this.loadLevel$S("res/levels/J2MElvl." + str);
});

Clazz.newMeth(C$, 'openLevelInputStream$S',  function (filePath) {
var f=Clazz.new_($I$(3,1).c$$S,[filePath]);
if (f.isFile$()) {
return Clazz.new_($I$(4,1).c$$java_io_File,[f]);
}if (!f.isAbsolute$()) {
var cwd=Clazz.new_([System.getProperty$S$S("user.dir", ".")],$I$(3,1).c$$S);
var devTry=Clazz.array($I$(3), -1, [Clazz.new_([cwd, filePath.replace$C$C("\\", "/")],$I$(3,1).c$$java_io_File$S), Clazz.new_([cwd, "src/" + filePath.replace$C$C("\\", "/")],$I$(3,1).c$$java_io_File$S), Clazz.new_([cwd, "bin/" + filePath.replace$C$C("\\", "/")],$I$(3,1).c$$java_io_File$S)]);
for (var t, $t = 0, $$t = devTry; $t<$$t.length&&((t=($$t[$t])),1);$t++) {
if (t.isFile$()) {
return Clazz.new_($I$(4,1).c$$java_io_File,[t]);
}}
}var normalized=filePath.replace$C$C("\\", "/");
while (normalized.startsWith$S("/")){
normalized=normalized.substring$I(1);
}
var absoluteResource="/" + normalized;
var $in=Clazz.getClass(C$).getResourceAsStream$S(absoluteResource);
if ($in != null ) {
return $in;
}var cl=Clazz.getClass(C$).getClassLoader$();
if (cl != null ) {
$in=cl.getResourceAsStream$S(normalized);
if ($in != null ) {
return $in;
}}cl=$I$(5).currentThread$().getContextClassLoader$();
if (cl != null ) {
$in=cl.getResourceAsStream$S(normalized);
if ($in != null ) {
return $in;
}}$in=ClassLoader.getSystemResourceAsStream$S(normalized);
if ($in != null ) {
return $in;
}throw Clazz.new_(Clazz.load('java.io.IOException').c$$S,["Level not found: " + filePath]);
}, 1);

Clazz.newMeth(C$, 'loadLevel$S',  function (filePath) {
var arrayOfString=Clazz.array(String, [1]);
arrayOfString[0]=(Integer.valueOf$I(this.mLevelNum)).toString();
if (this.mLevelPath == null ) {
this.mLevelNumStr=$I$(6).getText$I$SA(9, arrayOfString);
} else {
this.mLevelNumStr="Load map: " + $I$(7,"get$S$SA",[this.mLevelPath, Clazz.array(String, -1, [])]).getFileName$().toString();
}this.mLevelCompletedStr=$I$(6).getText$I$SA(10, arrayOfString);
arrayOfString[0]=null;
arrayOfString=null;
System.out.println$S("Load level: " + filePath);
try {
var inputStream=C$.openLevelInputStream$S(filePath);
var dataInputStream=Clazz.new_($I$(8,1).c$$java_io_InputStream,[inputStream]);
try {
this.mStartCol=dataInputStream.read$();
this.mStartRow=dataInputStream.read$();
var i=dataInputStream.read$();
if (i == 0) {
this.mStartBallSize=12;
} else {
this.mStartBallSize=16;
}this.mExitPosX=dataInputStream.read$();
this.mExitPosY=dataInputStream.read$();
this.createExitTileObject$I$I$java_awt_Image(this.mExitPosX, this.mExitPosY, this.tileImages[12]);
this.mTotalNumRings=dataInputStream.read$();
var mapW=dataInputStream.read$();
var mapH=dataInputStream.read$();
var map=Clazz.array(Short.TYPE, [mapH, mapW]);
for (var b1=0; b1 < mapH; b1++) {
for (var b2=0; b2 < mapW; b2++) {
map[b1][b2]=(dataInputStream.read$()|0);
}
}
this.mTileMapWidth=mapW;
this.mTileMapHeight=mapH;
this.tileMap=map;
this.mNumMoveObj=dataInputStream.read$();
if (this.mNumMoveObj != 0) {
this.createMovingObj$java_io_DataInputStream(dataInputStream);
}
}finally{/*res*/dataInputStream&&dataInputStream.close$&&dataInputStream.close$();inputStream&&inputStream.close$&&inputStream.close$();}
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I',  function (graphics, paramImage, x, y, mode) {
var width=paramImage.getWidth$java_awt_image_ImageObserver(null);
var height=paramImage.getHeight$java_awt_image_ImageObserver(null);
var saved=graphics.getTransform$();
try {
switch (mode) {
case 0:
graphics.translate$I$I(x + width, y);
graphics.scale$D$D(-1, 1);
break;
case 1:
graphics.translate$I$I(x, y + height);
graphics.scale$D$D(1, -1);
break;
case 2:
graphics.translate$I$I(x + width, y + height);
graphics.scale$D$D(-1, -1);
break;
}
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, 0, 0, null);
} finally {
graphics.setTransform$java_awt_geom_AffineTransform(saved);
}
}, 1);

Clazz.newMeth(C$, 'rotateImage$java_awt_Graphics2D$java_awt_Image$I',  function (graphics, paramImage, degrees) {
var width=paramImage.getWidth$java_awt_image_ImageObserver(null);
var height=paramImage.getHeight$java_awt_image_ImageObserver(null);
var saved=graphics.getTransform$();
try {
graphics.translate$D$D(width / 2.0, height / 2.0);
graphics.rotate$D(-Math.toRadians(degrees));
graphics.translate$D$D(-width / 2.0, -height / 2.0);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, 0, 0, null);
} finally {
graphics.setTransform$java_awt_geom_AffineTransform(saved);
}
}, 1);

Clazz.newMeth(C$, 'manipulateImage$java_awt_Image$I',  function (paramImage, paramInt) {
var width=paramImage.getWidth$java_awt_image_ImageObserver(null);
var height=paramImage.getHeight$java_awt_image_ImageObserver(null);
var image=$I$(2).createImage$I$I(width, height).buf;
var graphics=image.createGraphics$();
try {
graphics.setRenderingHint$java_awt_RenderingHints_Key$O($I$(9).KEY_INTERPOLATION, $I$(9).VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
graphics.setRenderingHint$java_awt_RenderingHints_Key$O($I$(9).KEY_RENDERING, $I$(9).VALUE_RENDER_SPEED);
graphics.setRenderingHint$java_awt_RenderingHints_Key$O($I$(9).KEY_ANTIALIASING, $I$(9).VALUE_ANTIALIAS_OFF);
switch (paramInt) {
case 0:
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, 0, 0, 0);
return image;
case 1:
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, 0, 0, 1);
return image;
case 2:
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, 0, 0, 2);
return image;
case 3:
C$.rotateImage$java_awt_Graphics2D$java_awt_Image$I(graphics, paramImage, 90);
return image;
case 4:
C$.rotateImage$java_awt_Graphics2D$java_awt_Image$I(graphics, paramImage, 180);
return image;
case 5:
C$.rotateImage$java_awt_Graphics2D$java_awt_Image$I(graphics, paramImage, 270);
return image;
}
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, 0, 0, null);
return image;
} finally {
graphics.dispose$();
}
}, 1);

Clazz.newMeth(C$, 'createMovingObj$java_io_DataInputStream',  function (paramDataInputStream) {
this.mMOTopLeft=Clazz.array(Short.TYPE, [this.mNumMoveObj, 2]);
this.mMOBotRight=Clazz.array(Short.TYPE, [this.mNumMoveObj, 2]);
this.mMODirection=Clazz.array(Short.TYPE, [this.mNumMoveObj, 2]);
this.mMOOffset=Clazz.array(Short.TYPE, [this.mNumMoveObj, 2]);
this.mMOImgPtr=Clazz.array($I$(10), [this.mNumMoveObj]);
this.mMOImgGraphics=Clazz.array($I$(11), [this.mNumMoveObj]);
for (var b1=0; b1 < this.mNumMoveObj; b1++) {
this.mMOTopLeft[b1][0]=(paramDataInputStream.read$()|0);
this.mMOTopLeft[b1][1]=(paramDataInputStream.read$()|0);
this.mMOBotRight[b1][0]=(paramDataInputStream.read$()|0);
this.mMOBotRight[b1][1]=(paramDataInputStream.read$()|0);
this.mMODirection[b1][0]=(paramDataInputStream.read$()|0);
this.mMODirection[b1][1]=(paramDataInputStream.read$()|0);
var i=paramDataInputStream.read$();
var j=paramDataInputStream.read$();
this.mMOOffset[b1][0]=(i|0);
this.mMOOffset[b1][1]=(j|0);
}
this.mSpikeImgPtr=$I$(2).createImage$I$I(24, 24).buf;
var graphics=this.mSpikeImgPtr.getGraphics$();
try {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[46], 0, 0, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(this.tileImages[46], 0), 12, 0, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(this.tileImages[46], 4), 12, 12, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(this.tileImages[46], 1), 0, 12, null);
} finally {
graphics.dispose$();
}
});

Clazz.newMeth(C$, 'disposeLevel$',  function () {
if (this.mExitTileGraphics != null ) {
this.mExitTileGraphics.dispose$();
this.mExitTileGraphics=null;
}if (this.mMOImgPtr != null ) {
for (var b1=0; b1 < this.mNumMoveObj; b1++) {
this.mMOImgPtr[b1]=null;
this.mMOImgGraphics[b1]=null;
}
}this.mMOImgPtr=null;
this.mMOImgGraphics=null;
this.mMOTopLeft=null;
this.mMOBotRight=null;
this.mMODirection=null;
this.mMOOffset=null;
this.mNumMoveObj=0;
if (!Boolean.parseBoolean$S(System.getProperty$S$S("midp.web", "false"))) {
$I$(12).getRuntime$().gc$();
}});

Clazz.newMeth(C$, 'updateMovingSpikeObj$',  function () {
if (this.tileMap == null  || this.mMOTopLeft == null  ) {
return;
}for (var b1=0; b1 < this.mNumMoveObj; b1++) {
var s1=this.mMOTopLeft[b1][0];
var s2=this.mMOTopLeft[b1][1];
var s3=this.mMOOffset[b1][0];
var s4=this.mMOOffset[b1][1];
this.mMOOffset[b1][0]=((this.mMOOffset[b1][0] + this.mMODirection[b1][0])|0);
var n=(this.mMOBotRight[b1][0] - s1 - 2 ) * 12;
var i1=(this.mMOBotRight[b1][1] - s2 - 2 ) * 12;
if (this.mMOOffset[b1][0] < 0) {
this.mMOOffset[b1][0]=(0|0);
} else if (this.mMOOffset[b1][0] > n) {
this.mMOOffset[b1][0]=(n|0);
}if (this.mMOOffset[b1][0] == 0 || this.mMOOffset[b1][0] == n ) this.mMODirection[b1][0]=((($s$[0]=-this.mMODirection[b1][0],this.mMODirection[b1][0]=$s$[0],$s$[0]))|0);
this.mMOOffset[b1][1]=((this.mMOOffset[b1][1] + this.mMODirection[b1][1])|0);
if (this.mMOOffset[b1][1] < 0) {
this.mMOOffset[b1][1]=(0|0);
} else if (this.mMOOffset[b1][1] > i1) {
this.mMOOffset[b1][1]=(i1|0);
}if (this.mMOOffset[b1][1] == 0 || this.mMOOffset[b1][1] == i1 ) this.mMODirection[b1][1]=((this.mMODirection[b1][1] * -1)|0);
var s5=this.mMOOffset[b1][0];
var s6=this.mMOOffset[b1][1];
if (s5 < s3) {
var s=s5;
s5=s3;
s3=s;
}if (s6 < s4) {
var s=s6;
s6=s4;
s4=s;
}s5=($s$[0] = s5+(23), $s$[0]);
s6=($s$[0] = s6+(23), $s$[0]);
var i=($s$[0] = s3/12, $s$[0]);
var j=($s$[0] = s4/12, $s$[0]);
var k=($s$[0] = s5/12, $s$[0]) + 1;
var m=($s$[0] = s6/12, $s$[0]) + 1;
for (var i2=i; i2 < k; i2++) {
for (var i3=j; i3 < m; i3++) this.tileMap[s2 + i3][s1 + i2]=((this.tileMap[s2 + i3][s1 + i2] | 128)|0);

}
}
});

Clazz.newMeth(C$, 'findSpikeIndex$I$I',  function (paramInt1, paramInt2) {
for (var b1=0; b1 < this.mNumMoveObj; b1++) {
if (this.mMOTopLeft[b1][0] <= paramInt1 && this.mMOBotRight[b1][0] > paramInt1  && this.mMOTopLeft[b1][1] <= paramInt2  && this.mMOBotRight[b1][1] > paramInt2 ) return b1;
}
return -1;
});

Clazz.newMeth(C$, 'drawTile$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4) {
var j;
var k;
var graphics=this.mGameBufferGraphics;
if (this.tileMap == null ) {
return;
}if (paramInt1 < 0 || paramInt2 < 0  || paramInt1 >= this.mTileMapWidth  || paramInt2 >= this.mTileMapHeight ) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[0], paramInt3, paramInt4, null);
return;
}this.tileMap[paramInt2][paramInt1]=((this.tileMap[paramInt2][paramInt1] & 65407)|0);
var i=this.tileMap[paramInt2][paramInt1];
var bool=((i & 64) != 0) ? true : false;
if (bool) i=i & -65;
graphics.setColor$java_awt_Color(bool ? C$.TILE_FILL_DIM : C$.TILE_FILL_NORMAL);
switch (i) {
case 1:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[0], paramInt3, paramInt4, null);
break;
case 0:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
break;
case 2:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[1], paramInt3, paramInt4, null);
break;
case 3:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[6], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[2], paramInt3, paramInt4, null);
break;
case 4:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[9], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[5], paramInt3, paramInt4, null);
break;
case 5:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[7], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[3], paramInt3, paramInt4, null);
break;
case 6:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[8], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[4], paramInt3, paramInt4, null);
break;
case 7:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[10], paramInt3, paramInt4, null);
break;
case 8:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[11], paramInt3, paramInt4, null);
break;
case 13:
case 14:
case 15:
case 16:
case 17:
case 18:
case 19:
case 20:
case 21:
case 22:
case 23:
case 24:
case 25:
case 26:
case 27:
case 28:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[$I$(13).a[i - 13]], paramInt3, paramInt4, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[$I$(13).b[i - 13]], paramInt3, paramInt4, null);
break;
case 9:
j=(paramInt1 - this.mTopLeftExitTileCol) * 12;
k=(paramInt2 - this.mTopLeftExitTileRow) * 12;
graphics.setClip$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mExitTileImage, paramInt3 - j, paramInt4 - k, null);
graphics.setClip$I$I$I$I(0, 0, 156, 96);
this.scrollFlag=true;
break;
case 10:
j=this.findSpikeIndex$I$I(paramInt1, paramInt2);
if (j != -1) {
k=(paramInt1 - this.mMOTopLeft[j][0]) * 12;
var m=(paramInt2 - this.mMOTopLeft[j][1]) * 12;
var n=this.mMOOffset[j][0] - k;
var i1=this.mMOOffset[j][1] - m;
if ((n > -36 && n < 12 ) || (i1 > -36 && i1 < 12 ) ) {
this.tmpTileImageG.setColor$java_awt_Color(C$.TILE_FILL_NORMAL);
this.tmpTileImageG.fillRect$I$I$I$I(0, 0, 12, 12);
this.tmpTileImageG.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mSpikeImgPtr, n, i1, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tmpTileImage, paramInt3, paramInt4, null);
break;
}graphics.setColor$java_awt_Color(C$.TILE_FILL_NORMAL);
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
}break;
case 29:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[45], paramInt3, paramInt4, null);
break;
case 30:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[61], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[57], paramInt3, paramInt4, null);
break;
case 31:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[60], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[56], paramInt3, paramInt4, null);
break;
case 32:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[59], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[55], paramInt3, paramInt4, null);
break;
case 33:
if (bool) {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[62], paramInt3, paramInt4, null);
break;
}graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[58], paramInt3, paramInt4, null);
break;
case 34:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[65], paramInt3, paramInt4, null);
break;
case 35:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[64], paramInt3, paramInt4, null);
break;
case 36:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[63], paramInt3, paramInt4, null);
break;
case 37:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[66], paramInt3, paramInt4, null);
break;
case 39:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[50], paramInt3, paramInt4, null);
break;
case 40:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile50Rot5, paramInt3, paramInt4, null);
break;
case 41:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile50Rot4, paramInt3, paramInt4, null);
break;
case 42:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile50Rot3, paramInt3, paramInt4, null);
break;
case 43:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[51], paramInt3, paramInt4, null);
break;
case 44:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile51Rot5, paramInt3, paramInt4, null);
break;
case 45:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile51Rot4, paramInt3, paramInt4, null);
break;
case 46:
graphics.fillRect$I$I$I$I(paramInt3, paramInt4, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile51Rot3, paramInt3, paramInt4, null);
break;
case 47:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[52], paramInt3, paramInt4, null);
break;
case 48:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile52Rot5, paramInt3, paramInt4, null);
break;
case 49:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile52Rot4, paramInt3, paramInt4, null);
break;
case 50:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile52Rot3, paramInt3, paramInt4, null);
break;
case 38:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[53], paramInt3, paramInt4, null);
break;
case 51:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[54], paramInt3, paramInt4, null);
break;
case 52:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile54Rot5, paramInt3, paramInt4, null);
break;
case 53:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile54Rot4, paramInt3, paramInt4, null);
break;
case 54:
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mTile54Rot3, paramInt3, paramInt4, null);
break;
}
});

Clazz.newMeth(C$, 'drawTileMap$java_awt_Graphics$I$I$I$I',  function (paramGraphics, paramInt1, paramInt2, paramInt3, paramInt4) {
if (this.tileMap == null ) {
return;
}var i=((paramInt1 - paramInt3)/12|0);
var j=((paramInt2 - paramInt3)/12|0);
var k=((paramInt1 + paramInt3 - 1)/12|0) + 1;
var m=((paramInt2 + paramInt3 - 1)/12|0) + 1;
if (i < 0) i=0;
if (j < 0) j=0;
if (k > this.mTileMapWidth) k=this.mTileMapWidth;
if (m > this.mTileMapHeight) m=this.mTileMapHeight;
for (var n=i; n < k; n++) {
for (var i1=j; i1 < m; i1++) {
var i2=this.tileMap[i1][n] & -65;
if (i2 >= 13 && i2 <= 28 ) {
var i3=(n - this.tileX) * 12 + paramInt4;
var i4=(i1 - this.tileY) * 12;
paramGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.tileImages[$I$(13).b[i2 - 13]], i3, i4, null);
}}
}
});

Clazz.newMeth(C$, 'createNewBuffer$',  function () {
if (this.tileMap == null ) {
return;
}for (var b1=0; b1 < 13; b1++) {
for (var b2=0; b2 < 8; b2++) this.drawTile$I$I$I$I(this.tileX + b1, this.tileY + b2, b1 * 12, b2 * 12);

}
});

Clazz.newMeth(C$, 'cleanBuffer$',  function () {
if (this.tileMap == null ) {
return;
}var i=this.tileX;
var j=this.tileY;
for (var b1=0; b1 < 13; b1++) {
if (b1 * 12 >= this.divisorLine && i >= this.tileX ) i=this.divTileX - 13;
for (var b2=0; b2 < 8; b2++) {
if (i < this.mTileMapWidth && j < this.mTileMapHeight  && (this.tileMap[j][i] & 128) != 0 ) this.drawTile$I$I$I$I(i, j, b1 * 12, b2 * 12);
++j;
}
j=this.tileY;
++i;
}
});

Clazz.newMeth(C$, 'scrollBuffer$I',  function (paramInt) {
if (this.tileMap == null ) {
return;
}var i=this.divTileX - 13;
var j=this.divTileX;
var k=paramInt - 64;
if (k < 0) {
k=0;
} else if (k > (this.mTileMapWidth + 1) * 12 - 152) {
k=(this.mTileMapWidth + 1) * 12 - 152;
}while ((k/12|0) < i){
this.divisorLine-=12;
var m=this.divisorLine;
--this.divTileX;
--j;
--i;
if (this.divisorLine <= 0) {
this.divisorLine=156;
this.tileX-=13;
}for (var b1=0; b1 < 8; b1++) this.drawTile$I$I$I$I(this.divTileX - 13, this.tileY + b1, m, b1 * 12);

}
while (((k + 128)/12|0) >= j){
if (this.divisorLine >= 156) {
this.divisorLine=0;
this.tileX+=13;
}var m=this.divisorLine;
this.divisorLine+=12;
++this.divTileX;
++j;
++i;
for (var b1=0; b1 < 8; b1++) this.drawTile$I$I$I$I(this.tileX + (m/12|0), this.tileY + b1, m, b1 * 12);

}
this.v=this.tileX * 12 - k;
});

Clazz.newMeth(C$, 'm$',  function () {
return this.tileX * 12 - this.v;
});

Clazz.newMeth(C$, 'g$',  function () {
return this.tileX * 12 - this.v + 128;
});

Clazz.newMeth(C$, 'createLargeBallImage$java_awt_Image',  function (paramImage) {
var width=paramImage.getWidth$java_awt_image_ImageObserver(null);
var height=paramImage.getHeight$java_awt_image_ImageObserver(null);
var image=$I$(2).createImage$I$I(width + 4, height + 4).buf;
var graphics=image.createGraphics$();
try {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, -4, -4, null);
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, 8, -4, 0);
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, -4, 8, 1);
C$.flipImage$java_awt_Graphics2D$java_awt_Image$I$I$I(graphics, paramImage, 8, 8, 2);
} finally {
graphics.dispose$();
}
return image;
});

Clazz.newMeth(C$, 'createExitImage$java_awt_Image',  function (paramImage) {
var image=$I$(2).createImage$I$I(24, 48).buf;
var graphics=image.getGraphics$();
try {
graphics.setColor$java_awt_Color(Clazz.new_($I$(1,1).c$$I,[11591920]));
graphics.fillRect$I$I$I$I(0, 0, 24, 48);
graphics.setColor$java_awt_Color(Clazz.new_($I$(1,1).c$$I,[16555422]));
graphics.fillRect$I$I$I$I(4, 0, 16, 48);
graphics.setColor$java_awt_Color(Clazz.new_($I$(1,1).c$$I,[14891583]));
graphics.fillRect$I$I$I$I(6, 0, 10, 48);
graphics.setColor$java_awt_Color(Clazz.new_($I$(1,1).c$$I,[12747918]));
graphics.fillRect$I$I$I$I(10, 0, 4, 48);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, 0, 0, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(paramImage, 0), 12, 0, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(paramImage, 1), 0, 12, null);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(C$.manipulateImage$java_awt_Image$I(paramImage, 2), 12, 12, null);
} finally {
graphics.dispose$();
}
return image;
});

Clazz.newMeth(C$, 'loadTileImages$',  function () {
var image=C$.loadImage$S("res/icons/objects_nm.png");
this.tileImages=Clazz.array($I$(10), [67]);
this.tileImages[0]=C$.extractImage$java_awt_Image$I$I(image, 1, 0);
this.tileImages[1]=C$.extractImage$java_awt_Image$I$I(image, 1, 2);
this.tileImages[2]=C$.extractImageBG$java_awt_Image$I$I$java_awt_Color(image, 0, 3, Clazz.new_($I$(1,1).c$$I,[-5185296]));
this.tileImages[3]=C$.manipulateImage$java_awt_Image$I(this.tileImages[2], 1);
this.tileImages[4]=C$.manipulateImage$java_awt_Image$I(this.tileImages[2], 3);
this.tileImages[5]=C$.manipulateImage$java_awt_Image$I(this.tileImages[2], 5);
this.tileImages[6]=C$.extractImageBG$java_awt_Image$I$I$java_awt_Color(image, 0, 3, Clazz.new_($I$(1,1).c$$I,[-15703888]));
this.tileImages[7]=C$.manipulateImage$java_awt_Image$I(this.tileImages[6], 1);
this.tileImages[8]=C$.manipulateImage$java_awt_Image$I(this.tileImages[6], 3);
this.tileImages[9]=C$.manipulateImage$java_awt_Image$I(this.tileImages[6], 5);
this.tileImages[10]=C$.extractImage$java_awt_Image$I$I(image, 0, 4);
this.tileImages[11]=C$.extractImage$java_awt_Image$I$I(image, 3, 4);
this.tileImages[12]=this.createExitImage$java_awt_Image(C$.extractImage$java_awt_Image$I$I(image, 2, 3));
this.tileImages[14]=C$.extractImage$java_awt_Image$I$I(image, 0, 5);
this.tileImages[13]=C$.manipulateImage$java_awt_Image$I(this.tileImages[14], 1);
this.tileImages[15]=C$.manipulateImage$java_awt_Image$I(this.tileImages[13], 0);
this.tileImages[16]=C$.manipulateImage$java_awt_Image$I(this.tileImages[14], 0);
this.tileImages[18]=C$.extractImage$java_awt_Image$I$I(image, 1, 5);
this.tileImages[17]=C$.manipulateImage$java_awt_Image$I(this.tileImages[18], 1);
this.tileImages[19]=C$.manipulateImage$java_awt_Image$I(this.tileImages[17], 0);
this.tileImages[20]=C$.manipulateImage$java_awt_Image$I(this.tileImages[18], 0);
this.tileImages[22]=C$.extractImage$java_awt_Image$I$I(image, 2, 5);
this.tileImages[21]=C$.manipulateImage$java_awt_Image$I(this.tileImages[22], 1);
this.tileImages[23]=C$.manipulateImage$java_awt_Image$I(this.tileImages[21], 0);
this.tileImages[24]=C$.manipulateImage$java_awt_Image$I(this.tileImages[22], 0);
this.tileImages[26]=C$.extractImage$java_awt_Image$I$I(image, 3, 5);
this.tileImages[25]=C$.manipulateImage$java_awt_Image$I(this.tileImages[26], 1);
this.tileImages[27]=C$.manipulateImage$java_awt_Image$I(this.tileImages[25], 0);
this.tileImages[28]=C$.manipulateImage$java_awt_Image$I(this.tileImages[26], 0);
this.tileImages[29]=C$.manipulateImage$java_awt_Image$I(this.tileImages[14], 5);
this.tileImages[30]=C$.manipulateImage$java_awt_Image$I(this.tileImages[29], 1);
this.tileImages[31]=C$.manipulateImage$java_awt_Image$I(this.tileImages[29], 0);
this.tileImages[32]=C$.manipulateImage$java_awt_Image$I(this.tileImages[30], 0);
this.tileImages[33]=C$.manipulateImage$java_awt_Image$I(this.tileImages[18], 5);
this.tileImages[34]=C$.manipulateImage$java_awt_Image$I(this.tileImages[33], 1);
this.tileImages[35]=C$.manipulateImage$java_awt_Image$I(this.tileImages[33], 0);
this.tileImages[36]=C$.manipulateImage$java_awt_Image$I(this.tileImages[34], 0);
this.tileImages[37]=C$.manipulateImage$java_awt_Image$I(this.tileImages[22], 5);
this.tileImages[38]=C$.manipulateImage$java_awt_Image$I(this.tileImages[37], 1);
this.tileImages[39]=C$.manipulateImage$java_awt_Image$I(this.tileImages[37], 0);
this.tileImages[40]=C$.manipulateImage$java_awt_Image$I(this.tileImages[38], 0);
this.tileImages[41]=C$.manipulateImage$java_awt_Image$I(this.tileImages[26], 5);
this.tileImages[42]=C$.manipulateImage$java_awt_Image$I(this.tileImages[41], 1);
this.tileImages[43]=C$.manipulateImage$java_awt_Image$I(this.tileImages[41], 0);
this.tileImages[44]=C$.manipulateImage$java_awt_Image$I(this.tileImages[42], 0);
this.tileImages[45]=C$.extractImage$java_awt_Image$I$I(image, 3, 3);
this.tileImages[46]=C$.extractImage$java_awt_Image$I$I(image, 1, 3);
this.tileImages[47]=C$.extractImage$java_awt_Image$I$I(image, 2, 0);
this.tileImages[48]=C$.extractImage$java_awt_Image$I$I(image, 0, 1);
this.tileImages[49]=this.createLargeBallImage$java_awt_Image(C$.extractImage$java_awt_Image$I$I(image, 3, 0));
this.tileImages[50]=C$.extractImage$java_awt_Image$I$I(image, 3, 1);
this.tileImages[51]=C$.extractImage$java_awt_Image$I$I(image, 2, 4);
this.tileImages[52]=C$.extractImage$java_awt_Image$I$I(image, 3, 2);
this.tileImages[53]=C$.extractImage$java_awt_Image$I$I(image, 1, 1);
this.tileImages[54]=C$.extractImage$java_awt_Image$I$I(image, 2, 2);
this.tileImages[55]=C$.extractImageBG$java_awt_Image$I$I$java_awt_Color(image, 0, 0, Clazz.new_($I$(1,1).c$$I,[-5185296]));
this.tileImages[56]=C$.manipulateImage$java_awt_Image$I(this.tileImages[55], 3);
this.tileImages[57]=C$.manipulateImage$java_awt_Image$I(this.tileImages[55], 4);
this.tileImages[58]=C$.manipulateImage$java_awt_Image$I(this.tileImages[55], 5);
this.tileImages[59]=C$.extractImageBG$java_awt_Image$I$I$java_awt_Color(image, 0, 0, Clazz.new_($I$(1,1).c$$I,[-15703888]));
this.tileImages[60]=C$.manipulateImage$java_awt_Image$I(this.tileImages[59], 3);
this.tileImages[61]=C$.manipulateImage$java_awt_Image$I(this.tileImages[59], 4);
this.tileImages[62]=C$.manipulateImage$java_awt_Image$I(this.tileImages[59], 5);
this.tileImages[63]=C$.extractImage$java_awt_Image$I$I(image, 0, 2);
this.tileImages[64]=C$.manipulateImage$java_awt_Image$I(this.tileImages[63], 3);
this.tileImages[65]=C$.manipulateImage$java_awt_Image$I(this.tileImages[63], 4);
this.tileImages[66]=C$.manipulateImage$java_awt_Image$I(this.tileImages[63], 5);
this.mUILife=C$.extractImage$java_awt_Image$I$I(image, 2, 1);
this.mUIRing=C$.extractImage$java_awt_Image$I$I(image, 1, 4);
this.mTile50Rot3=C$.manipulateImage$java_awt_Image$I(this.tileImages[50], 3);
this.mTile50Rot4=C$.manipulateImage$java_awt_Image$I(this.tileImages[50], 4);
this.mTile50Rot5=C$.manipulateImage$java_awt_Image$I(this.tileImages[50], 5);
this.mTile51Rot3=C$.manipulateImage$java_awt_Image$I(this.tileImages[51], 3);
this.mTile51Rot4=C$.manipulateImage$java_awt_Image$I(this.tileImages[51], 4);
this.mTile51Rot5=C$.manipulateImage$java_awt_Image$I(this.tileImages[51], 5);
this.mTile52Rot3=C$.manipulateImage$java_awt_Image$I(this.tileImages[52], 3);
this.mTile52Rot4=C$.manipulateImage$java_awt_Image$I(this.tileImages[52], 4);
this.mTile52Rot5=C$.manipulateImage$java_awt_Image$I(this.tileImages[52], 5);
this.mTile54Rot3=C$.manipulateImage$java_awt_Image$I(this.tileImages[54], 3);
this.mTile54Rot4=C$.manipulateImage$java_awt_Image$I(this.tileImages[54], 4);
this.mTile54Rot5=C$.manipulateImage$java_awt_Image$I(this.tileImages[54], 5);
});

Clazz.newMeth(C$, 'setBallImages$com_nokia_mid_appl_boun_Ball',  function (paramBall) {
paramBall.smallBallImage=this.tileImages[47];
paramBall.poppedImage=this.tileImages[48];
paramBall.largeBallImage=this.tileImages[49];
});

Clazz.newMeth(C$, 'extractImage$java_awt_Image$I$I',  function (paramImage, paramInt1, paramInt2) {
var image=$I$(2).createImage$I$I(12, 12).buf;
var graphics=image.getGraphics$();
try {
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, -paramInt1 * 12, -paramInt2 * 12, null);
} finally {
graphics.dispose$();
}
return image;
}, 1);

Clazz.newMeth(C$, 'extractImageBG$java_awt_Image$I$I$java_awt_Color',  function (paramImage, paramInt1, paramInt2, color) {
var image=$I$(2).createImage$I$I(12, 12).buf;
var graphics=image.getGraphics$();
try {
graphics.setColor$java_awt_Color(color);
graphics.fillRect$I$I$I$I(0, 0, 12, 12);
graphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(paramImage, -paramInt1 * 12, -paramInt2 * 12, null);
} finally {
graphics.dispose$();
}
return image;
}, 1);

Clazz.newMeth(C$, 'loadImage$S',  function (paramString) {
var im=$I$(2).createImage$S(paramString);
return im != null  ? im.buf : null;
}, 1);

Clazz.newMeth(C$, 'createExitTileObject$I$I$java_awt_Image',  function (paramInt1, paramInt2, paramImage) {
this.mTopLeftExitTileCol=paramInt1;
this.mTopLeftExitTileRow=paramInt2;
this.mImgPtr=paramImage;
if (this.mExitTileGraphics != null ) {
this.mExitTileGraphics.dispose$();
this.mExitTileGraphics=null;
}this.mExitTileImage=$I$(2).createImage$I$I(24, 24).buf;
this.mImageOffset=0;
this.mExitTileGraphics=this.mExitTileImage.getGraphics$();
this.repaintExitTile$();
this.mOpenFlag=false;
});

Clazz.newMeth(C$, 'repaintExitTile$',  function () {
this.mExitTileGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mImgPtr, 0, 0 - this.mImageOffset, null);
});

Clazz.newMeth(C$, 'openExit$',  function () {
this.mImageOffset+=4;
if (this.mImageOffset >= 24) {
this.mImageOffset=24;
this.mOpenFlag=true;
}this.repaintExitTile$();
});

Clazz.newMeth(C$, 'start$',  function () {
if (this.mGameTimer != null ) return;
var delay=30;
this.mGameTimer=Clazz.new_([delay, ((P$.TileCanvas$lambda1||
(function(){/*m*/var C$=Clazz.newClass(P$, "TileCanvas$lambda1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ActionListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);
/*lambda_E*/
Clazz.newMeth(C$, ['actionPerformed$java_awt_event_ActionEvent','actionPerformed$O'],  function (e) { return (this.b$['com.nokia.mid.appl.boun.TileCanvas'].timerTrigger$.apply(this.b$['com.nokia.mid.appl.boun.TileCanvas'], []));});
})()
), Clazz.new_(P$.TileCanvas$lambda1.$init$,[this, null]))],$I$(14,1).c$$I$java_awt_event_ActionListener);
this.mGameTimer.setRepeats$Z(true);
this.mGameTimer.setCoalesce$Z(false);
this.mGameTimer.start$();
});

Clazz.newMeth(C$, 'stop$',  function () {
if (this.mGameTimer == null ) return;
this.mGameTimer.stop$();
this.mGameTimer=null;
});

Clazz.newMeth(C$, 'timerTrigger$',  function () {
this.run$();
});

C$.$static$=function(){C$.$static$=0;
C$.TILE_FILL_DIM=Clazz.new_($I$(1,1).c$$I,[1073328]);
C$.TILE_FILL_NORMAL=Clazz.new_($I$(1,1).c$$I,[11591920]);
};
var $s$ = new Int16Array(1);

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
