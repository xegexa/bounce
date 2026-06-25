(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),p$1={},I$=[[0,'java.awt.Color','java.awt.Font','javax.microedition.lcdui.Image','com.nokia.mid.appl.boun.Ball','Runtime','java.awt.image.BufferedImage']],I$0=I$[0],$I$=function(i,n){return((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "BounceCanvas", null, 'com.nokia.mid.appl.boun.TileCanvas');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
this.TEXT_FONT=Clazz.new_($I$(2,1).c$$S$I$I,["Dialog", 0, 11]);
this.mFullScreenGraphics=null;
this.mCheat=false;
this.mInvincible=true;
this.mInvertedGravity=false;
this.mCheatSeq=0;
this.mIncomingCall=true;
},1);

C$.$fields$=[['Z',['mLeaveGame','mOpenExitFlag','mPaintUIFlag','mClearScreenFlag','mCheat','mInvincible','mInvertedGravity','mIncomingCall'],'I',['mSplashIndex','mSplashTimer','numRings','numLives','mScore','bonusCntrValue','mLevelDisCntr','mCheatSeq'],'O',['mSplashImage','java.awt.Image','mUI','com.nokia.mid.appl.boun.BounceUI','mBall','com.nokia.mid.appl.boun.Ball','TEXT_FONT','java.awt.Font','mFullScreenBuffer','java.awt.Image','mFullScreenGraphics','java.awt.Graphics']]
,['O',['COLOR_TEXT_LIGHT','java.awt.Color','+COLOR_UI_BAR','+COLOR_BONUS_BAR','SPLASH_NAME','String[]']]]

Clazz.newMeth(C$, 'c$$com_nokia_mid_appl_boun_BounceUI$I',  function (paramBounceUI, paramInt) {
;C$.superclazz.c$$javax_swing_JFrame.apply(this,[paramBounceUI.mDisplay]);C$.$init$.apply(this);
this.mUI=paramBounceUI;
this.mFullScreenBuffer=$I$(3).createImage$I$I(128, 128).buf;
{
var g=this.mFullScreenBuffer.getGraphics$();
try {
g.setColor$java_awt_Color($I$(1).BLACK);
g.fillRect$I$I$I$I(0, 0, 128, 96);
} finally {
g.dispose$();
}
}this.mSplashIndex=1;
{
var splash=$I$(3).createImage$S(C$.SPLASH_NAME[this.mSplashIndex]);
this.mSplashImage=splash != null  ? splash.buf : null;
}this.start$();
}, 1);

Clazz.newMeth(C$, 'resetGame$I$I$I',  function (paramInt1, paramInt2, paramInt3) {
this.mLevelNum=paramInt1;
this.mLevelPath=null;
this.numRings=0;
this.numLives=paramInt3;
this.mScore=paramInt2;
this.mLeaveGame=false;
this.mOpenExitFlag=false;
this.createNewLevel$();
this.mClearScreenFlag=true;
});

Clazz.newMeth(C$, 'resetGame$I$I',  function (paramInt1, paramInt2) {
this.mLevelNum=this.mUI.mSavedLevel;
this.mLevelPath=null;
this.numRings=this.mUI.mSavedRings;
this.numLives=this.mUI.mSavedLives;
this.mScore=this.mUI.mSavedScore;
p$1.disposeFullScreenGraphics.apply(this, []);
this.disposeLevel$();
if (this.mLevelPath == null ) {
this.loadLevel$I(this.mLevelNum);
} else {
this.loadLevel$S(this.mLevelPath);
}this.resetTiles$();
this.resetSpikes$();
this.mLevelDisCntr=120;
this.mPaintUIFlag=true;
if (this.mUI.mSavedRespawnX != this.mStartCol && this.mUI.mSavedRespawnY != this.mStartRow ) this.tileMap[this.mUI.mSavedRespawnY][this.mUI.mSavedRespawnX]=((8 | this.tileMap[this.mUI.mSavedRespawnY][this.mUI.mSavedRespawnX] & 64)|0);
this.createBufferFocused$I$I$I$I$I(paramInt1, paramInt2, this.mUI.mSavedSize, this.mUI.mSavedXSpeed, this.mUI.mSavedYSpeed);
/*sync org.eclipse.jdt.core.dom.FieldAccess*/(this.mBall);
{
this.mBall.setRespawn$I$I(this.mUI.mSavedRespawnX, this.mUI.mSavedRespawnY);
this.mBall.speedBonusCntr=this.mUI.mSavedSpeedBonus;
this.mBall.gravBonusCntr=this.mUI.mSavedGravBonus;
this.mBall.jumpBonusCntr=this.mUI.mSavedJumpBonus;
this.mClearScreenFlag=true;
}});

Clazz.newMeth(C$, 'disposeFullScreenGraphics',  function () {
if (this.mFullScreenGraphics != null ) {
this.mFullScreenGraphics.dispose$();
this.mFullScreenGraphics=null;
}}, p$1);

Clazz.newMeth(C$, 'createNewLevel$',  function () {
p$1.disposeFullScreenGraphics.apply(this, []);
this.disposeLevel$();
if (this.mLevelPath == null ) {
this.loadLevel$I(this.mLevelNum);
} else {
this.loadLevel$S(this.mLevelPath);
}this.numRings=0;
this.mLevelDisCntr=120;
this.mPaintUIFlag=true;
this.createBufferFocused$I$I$I$I$I(this.mStartCol * 12 + 6, this.mStartRow * 12 + 6, this.mStartBallSize, 0, 0);
this.mBall.setRespawn$I$I(this.mStartCol, this.mStartRow);
this.mClearScreenFlag=true;
});

Clazz.newMeth(C$, 'createBufferFocused$I$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4, paramInt5) {
this.mBall=Clazz.new_($I$(4,1).c$$I$I$I$com_nokia_mid_appl_boun_BounceCanvas,[paramInt1, paramInt2, paramInt3, this]);
this.mBall.xSpeed=paramInt4;
this.mBall.ySpeed=paramInt5;
this.tileX=0;
this.tileY=0;
this.screenFlip$();
});

Clazz.newMeth(C$, 'screenFlip$',  function () {
var i=this.mBall.xPos - 64;
if (i < 0) {
i=0;
} else if (i > this.mTileMapWidth * 12 - 156) {
i=this.mTileMapWidth * 12 - 156;
}this.tileX=(i/12|0);
this.v=this.tileX * 12 - i;
this.divisorLine=156;
this.divTileX=this.tileX + 13;
while (this.mBall.yPos - 6 < this.tileY * 12)this.tileY-=7;

while (this.mBall.yPos + 6 > this.tileY * 12 + 96)this.tileY+=7;

this.createNewBuffer$();
});

Clazz.newMeth(C$, 'add2Score$I',  function (paramInt) {
this.mScore+=paramInt;
this.mPaintUIFlag=true;
});

Clazz.newMeth(C$, 'paint2Buffer$',  function () {
if (this.mFullScreenGraphics == null ) this.mFullScreenGraphics=this.mFullScreenBuffer.getGraphics$();
this.mFullScreenGraphics.setClip$I$I$I$I(0, 0, 128, 96);
if (this.mGameBuffer != null ) {
this.cleanBuffer$();
if (this.v <= 0) {
this.mFullScreenGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mGameBuffer, this.v, 0, null);
} else {
this.mFullScreenGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mGameBuffer, this.v, 0, null);
this.mFullScreenGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mGameBuffer, this.v - 156, 0, null);
}}this.createMovingObj$java_awt_Graphics$I(this.mFullScreenGraphics, this.v);
this.drawTileMap$java_awt_Graphics$I$I$I$I(this.mFullScreenGraphics, this.mBall.xPos, this.mBall.yPos, this.mBall.mHalfBallSize, this.v);
this.mFullScreenGraphics.setClip$I$I$I$I(0, 0, 128, 128);
if (this.mLevelDisCntr != 0) {
p$1.drawStringCrisp$java_awt_Graphics$S$I$I$java_awt_Color$java_awt_Font.apply(this, [this.mFullScreenGraphics, this.mLevelNumStr, 10, 20, C$.COLOR_TEXT_LIGHT, this.TEXT_FONT]);
}if (this.mPaintUIFlag) {
this.mFullScreenGraphics.setColor$java_awt_Color(C$.COLOR_UI_BAR);
this.mFullScreenGraphics.fillRect$I$I$I$I(0, 96, 128, 32);
for (var b1=0; b1 < this.numLives; b1++) this.mFullScreenGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mUILife, 5 + b1 * (this.mUILife.getWidth$java_awt_image_ImageObserver(null) - 1), 97, null);

for (var b2=0; b2 < this.mTotalNumRings - this.numRings; b2++) this.mFullScreenGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mUIRing, 5 + b2 * (this.mUIRing.getWidth$java_awt_image_ImageObserver(null) - 4), 110, null);

p$1.drawStringCrisp$java_awt_Graphics$S$I$I$java_awt_Color$java_awt_Font.apply(this, [this.mFullScreenGraphics, C$.zeroString$I(this.mScore), 64, 106, C$.COLOR_TEXT_LIGHT, this.TEXT_FONT]);
if (this.bonusCntrValue != 0) {
this.mFullScreenGraphics.setColor$java_awt_Color(C$.COLOR_BONUS_BAR);
this.mFullScreenGraphics.fillRect$I$I$I$I(1, 128 - (3 * this.bonusCntrValue/30|0), 5, 128);
}this.mPaintUIFlag=false;
}});

Clazz.newMeth(C$, 'paint$java_awt_Graphics',  function (paramGraphics) {
var w=this.mUI.mDisplay.getWidth$();
var h=this.mUI.mDisplay.getHeight$() - 22;
if (this.mSplashIndex != -1) {
if (this.mSplashImage != null ) {
paramGraphics.setColor$java_awt_Color($I$(1).BLACK);
paramGraphics.fillRect$I$I$I$I(0, 0, w, h);
paramGraphics.drawImage$java_awt_Image$I$I$I$I$java_awt_image_ImageObserver(this.mSplashImage, 0, 0, w, h, null);
}} else {
paramGraphics.drawImage$java_awt_Image$I$I$I$I$java_awt_image_ImageObserver(this.mFullScreenBuffer, 0, 0, w, h, null);
}});

Clazz.newMeth(C$, 'createMovingObj$java_awt_Graphics$I',  function (paramGraphics, paramInt) {
if (this.mBall == null ) return;
var i=this.mBall.xPos - this.tileX * 12;
var j=this.mBall.yPos - this.tileY * 12;
if (this.mBall.ballState == 2) {
paramGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mBall.poppedImage, i - 6 + paramInt, j - 6, null);
} else {
paramGraphics.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.mBall.mBallImage, i - this.mBall.mHalfBallSize + paramInt, j - this.mBall.mHalfBallSize, null);
}});

Clazz.newMeth(C$, 'run$',  function () {
if (this.mSplashIndex != -1) {
if (this.mSplashImage == null  || this.mSplashImage == null  ) {
this.mIncomingCall=false;
} else if (this.mSplashTimer > 30) {
this.mSplashImage=null;
if (!Boolean.parseBoolean$S(System.getProperty$S$S("midp.web", "false"))) {
$I$(5).getRuntime$().gc$();
}switch (this.mSplashIndex) {
case 0:
this.mSplashIndex=1;
{
var splash=$I$(3).createImage$S(C$.SPLASH_NAME[this.mSplashIndex]);
this.mSplashImage=splash != null  ? splash.buf : null;
}this.repaint$();
break;
case 1:
this.mSplashIndex=-1;
this.mIncomingCall=false;
break;
}
this.mSplashTimer=0;
} else {
++this.mSplashTimer;
}this.repaint$();
return;
}if (this.mLevelDisCntr != 0) --this.mLevelDisCntr;
/*sync org.eclipse.jdt.core.dom.FieldAccess*/(this.mBall);
{
if (this.mBall.yPos - 6 < this.tileY * 12 || this.mBall.yPos + 6 > this.tileY * 12 + 96 ) {
this.screenFlip$();
} else {
this.mBall.update$();
}if (this.mBall.ballState == 1) {
if (this.numLives < 0) {
this.mUI.checkData$();
this.stop$();
this.mUI.gameOver$Z(false);
return;
}var i=this.mBall.respawnX;
var j=this.mBall.respawnY;
var k=this.mBall.respawnSize;
this.createBufferFocused$I$I$I$I$I(this.mBall.respawnX * 12 + 6, this.mBall.respawnY * 12 + 6, this.mBall.respawnSize, 0, 0);
this.mBall.respawnX=i;
this.mBall.respawnY=j;
this.mBall.respawnSize=k;
}if (this.mNumMoveObj != 0) this.updateMovingSpikeObj$();
if (this.numRings == this.mTotalNumRings) this.mOpenExitFlag=true;
if (this.mOpenExitFlag && this.scrollFlag && (this.mExitPosX + 1) * 12 > this.m$()   && this.mExitPosX * 12 < this.g$() ) {
if (this.mOpenFlag) {
this.scrollFlag=false;
this.mOpenExitFlag=false;
} else {
this.openExit$();
}this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol]=((this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol] | 128)|0);
this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol + 1]=((this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol + 1] | 128)|0);
this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol]=((this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol] | 128)|0);
this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol + 1]=((this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol + 1] | 128)|0);
}this.bonusCntrValue=0;
if (this.mBall.speedBonusCntr != 0 || this.mBall.gravBonusCntr != 0  || this.mBall.jumpBonusCntr != 0 ) {
if (this.mBall.speedBonusCntr > this.bonusCntrValue) this.bonusCntrValue=this.mBall.speedBonusCntr;
if (this.mBall.gravBonusCntr > this.bonusCntrValue) this.bonusCntrValue=this.mBall.gravBonusCntr;
if (this.mBall.jumpBonusCntr > this.bonusCntrValue) this.bonusCntrValue=this.mBall.jumpBonusCntr;
if (this.bonusCntrValue % 30 == 0 || this.bonusCntrValue == 1 ) this.mPaintUIFlag=true;
}}this.scrollBuffer$I(this.mBall.xPos);
this.paint2Buffer$();
this.repaint$();
if (this.mLeaveGame) {
this.mLeaveGame=false;
this.mOpenExitFlag=false;
this.mLevelNum=1 + this.mLevelNum;
this.mLevelPath=null;
this.add2Score$I(5000);
this.mUI.checkData$();
if (this.mLevelNum > 11) {
} else {
this.mIncomingCall=false;
}this.createNewLevel$();
this.repaint$();
}});

Clazz.newMeth(C$, 'keyPressed$java_awt_event_KeyEvent',  function (event) {
if (this.mSplashIndex != -1) {
this.mSplashTimer=31;
return;
}if (this.mBall == null ) return;
/*sync org.eclipse.jdt.core.dom.FieldAccess*/(this.mBall);
{
switch (event.getKeyCode$()) {
case 49:
if (this.mCheat && --this.mLevelNum < 1 ) this.mLevelNum=11;
this.mLevelPath=null;
this.createNewLevel$();
break;
case 51:
if (this.mCheat && ++this.mLevelNum > 11 ) this.mLevelNum=1;
this.mLevelPath=null;
this.createNewLevel$();
break;
case 55:
if (this.mCheatSeq == 0 || this.mCheatSeq == 2 ) {
++this.mCheatSeq;
break;
}this.mCheatSeq=0;
break;
case 56:
if (this.mCheatSeq == 1 || this.mCheatSeq == 3 ) {
++this.mCheatSeq;
break;
}if (this.mCheatSeq == 5) {
this.mInvincible=true;
this.mCheatSeq=0;
break;
}this.mCheatSeq=0;
break;
case 57:
if (this.mCheatSeq == 4) {
++this.mCheatSeq;
break;
}if (this.mCheatSeq == 5) {
this.mCheat=true;
this.mCheatSeq=0;
break;
}this.mCheatSeq=0;
break;
case 35:
if (this.mCheat) this.mBall.gravBonusCntr=300;
break;
case -7:
case -6:
this.mIncomingCall=false;
break;
case 38:
case 87:
this.mBall.setDirection$I(8);
break;
case 40:
case 83:
this.mBall.setDirection$I(4);
break;
case 37:
case 65:
this.mBall.setDirection$I(1);
break;
case 39:
case 68:
this.mBall.setDirection$I(2);
break;
}
}});

Clazz.newMeth(C$, 'keyReleased$java_awt_event_KeyEvent',  function (event) {
if (this.mBall == null ) return;
/*sync org.eclipse.jdt.core.dom.FieldAccess*/(this.mBall);
{
switch (event.getKeyCode$()) {
case 38:
case 87:
this.mBall.releaseDirection$I(8);
break;
case 40:
case 83:
this.mBall.releaseDirection$I(4);
break;
case 37:
case 65:
this.mBall.releaseDirection$I(1);
break;
case 39:
case 68:
this.mBall.releaseDirection$I(2);
break;
}
}});

Clazz.newMeth(C$, 'keyTyped$java_awt_event_KeyEvent',  function (event) {
});

Clazz.newMeth(C$, 'zeroString$I',  function (paramInt) {
var str;
if (paramInt < 100) {
str="0000000";
} else if (paramInt < 1000) {
str="00000";
} else if (paramInt < 10000) {
str="0000";
} else if (paramInt < 100000) {
str="000";
} else if (paramInt < 1000000) {
str="00";
} else if (paramInt < 10000000) {
str="0";
} else {
str="";
}return str + paramInt;
}, 1);

Clazz.newMeth(C$, 'hideNotify$',  function () {
if (this.mIncomingCall) {
if (this.mBall != null ) this.mBall.resetDirections$();
}this.mIncomingCall=true;
});

Clazz.newMeth(C$, 'resetSpikes$',  function () {
for (var b1=0; b1 < this.mUI.mSavedSpikeCount; b1++) {
this.mMODirection[b1][0]=this.mUI.mSavedSpikeDirection[b1][0];
this.mMODirection[b1][1]=this.mUI.mSavedSpikeDirection[b1][1];
this.mMOOffset[b1][0]=this.mUI.mSavedSpikeOffset[b1][0];
this.mMOOffset[b1][1]=this.mUI.mSavedSpikeOffset[b1][1];
}
this.mUI.mSavedSpikeOffset=null;
this.mUI.mSavedSpikeDirection=null;
this.mUI.mSavedSpikeCount=0;
});

Clazz.newMeth(C$, 'resetTiles$',  function () {
for (var b1=0; b1 < this.mTileMapHeight; b1++) {
for (var b2=0; b2 < this.mTileMapWidth; b2++) {
var b3=this.tileMap[b1][b2] & 65407 & -65 ;
switch (b3) {
case 7:
case 29:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((0 | this.tileMap[b1][b2] & 64)|0);
break;
case 13:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((17 | this.tileMap[b1][b2] & 64)|0);
break;
case 14:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((18 | this.tileMap[b1][b2] & 64)|0);
break;
case 21:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((25 | this.tileMap[b1][b2] & 64)|0);
break;
case 22:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((26 | this.tileMap[b1][b2] & 64)|0);
break;
case 15:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((19 | this.tileMap[b1][b2] & 64)|0);
break;
case 16:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((20 | this.tileMap[b1][b2] & 64)|0);
break;
case 23:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((27 | this.tileMap[b1][b2] & 64)|0);
break;
case 24:
if (p$1.shouldResetTileForLoad$I$I.apply(this, [b1, b2])) this.tileMap[b1][b2]=((28 | this.tileMap[b1][b2] & 64)|0);
break;
}
}
}
this.mUI.mSavedTiles=null;
this.mUI.mSavedTileCount=0;
});

Clazz.newMeth(C$, 'shouldResetTileForLoad$I$I',  function (paramInt1, paramInt2) {
for (var b1=0; b1 < this.mUI.mSavedTileCount; b1++) {
if (this.mUI.mSavedTiles[b1][0] == paramInt1 && this.mUI.mSavedTiles[b1][1] == paramInt2 ) return false;
}
return true;
}, p$1);

Clazz.newMeth(C$, 'drawStringCrisp$java_awt_Graphics$S$I$I$java_awt_Color$java_awt_Font',  function (g, s, x, y, c, f) {
if (s == null  || s.length$() == 0 ) return;
var fm=g.getFontMetrics$java_awt_Font(f);
var w=fm.stringWidth$S(s);
var ascent=fm.getAscent$();
var h=fm.getHeight$();
if (w <= 0 || h <= 0 ) return;
var img=Clazz.new_($I$(6,1).c$$I$I$I,[w, h, 2]);
var g2=img.createGraphics$();
g2.setFont$java_awt_Font(f);
g2.setColor$java_awt_Color($I$(1).WHITE);
g2.drawString$S$I$I(s, 0, ascent);
g2.dispose$();
var rgb=c.getRGB$() & 16777215;
for (var py=0; py < h; py++) {
for (var px=0; px < w; px++) {
var a=(img.getRGB$I$I(px, py) >>> 24) & 255;
img.setRGB$I$I$I(px, py, a >= 128 ? (-16777216 | rgb) : 0);
}
}
g.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(img, x, y - ascent, null);
}, p$1);

C$.$static$=function(){C$.$static$=0;
C$.COLOR_TEXT_LIGHT=Clazz.new_($I$(1,1).c$$I,[16777214]);
C$.COLOR_UI_BAR=Clazz.new_($I$(1,1).c$$I,[545706]);
C$.COLOR_BONUS_BAR=Clazz.new_($I$(1,1).c$$I,[16750611]);
C$.SPLASH_NAME=Clazz.array(String, -1, ["res/icons/nokiagames.png", "res/icons/bouncesplash.png"]);
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
