(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),p$1={};
/*c*/var C$=Clazz.newClass(P$, "Ball");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['Z',['mGroundedFlag','mCDRubberFlag','mCDRampFlag'],'I',['xPos','yPos','xSpeed','ySpeed','direction','mBallSize','mHalfBallSize','respawnX','respawnY','respawnSize','ballState','jumpOffset','speedBonusCntr','gravBonusCntr','jumpBonusCntr','slideCntr','popCntr'],'O',['mCanvas','com.nokia.mid.appl.boun.BounceCanvas','mBallImage','java.awt.Image','+poppedImage','+largeBallImage','+smallBallImage']]
,['O',['TRI_TILE_DATA','int[][]','+SMALL_BALL_DATA','+LARGE_BALL_DATA']]]

Clazz.newMeth(C$, 'c$$I$I$I$com_nokia_mid_appl_boun_BounceCanvas',  function (paramInt1, paramInt2, paramInt3, paramBounceCanvas) {
;C$.$init$.apply(this);
this.xPos=paramInt1;
this.yPos=paramInt2;
this.xSpeed=0;
this.ySpeed=0;
this.mCanvas=paramBounceCanvas;
this.jumpOffset=0;
this.mGroundedFlag=false;
this.mCDRubberFlag=false;
this.mCDRampFlag=false;
this.popCntr=0;
this.speedBonusCntr=0;
this.gravBonusCntr=0;
this.jumpBonusCntr=0;
this.slideCntr=0;
this.ballState=0;
this.direction=0;
this.mCanvas.setBallImages$com_nokia_mid_appl_boun_Ball(this);
if (paramInt3 == 12) {
this.shrinkBall$();
} else {
this.enlargeBall$();
}}, 1);

Clazz.newMeth(C$, 'setRespawn$I$I',  function (paramInt1, paramInt2) {
this.respawnX=paramInt1;
this.respawnY=paramInt2;
this.respawnSize=this.mBallSize;
});

Clazz.newMeth(C$, 'setDirection$I',  function (paramInt) {
if (paramInt == 8 || paramInt == 4  || paramInt == 2  || paramInt == 1 ) this.direction|=paramInt;
});

Clazz.newMeth(C$, 'releaseDirection$I',  function (paramInt) {
if (paramInt == 8 || paramInt == 4  || paramInt == 2  || paramInt == 1 ) this.direction&=paramInt ^ -1;
});

Clazz.newMeth(C$, 'resetDirections$',  function () {
this.direction&=-16;
});

Clazz.newMeth(C$, 'collisionDetection$I$I',  function (paramInt1, paramInt2) {
var i=((paramInt1 - this.mHalfBallSize)/12|0);
var j=((paramInt2 - this.mHalfBallSize)/12|0);
var k=((paramInt1 - 1 + this.mHalfBallSize)/12|0) + 1;
var m=((paramInt2 - 1 + this.mHalfBallSize)/12|0) + 1;
for (var n=i; n < k; n++) {
for (var i1=j; i1 < m; i1++) {
if (!this.testTile$I$I$I$I(paramInt1, paramInt2, i1, n)) return false;
}
}
return true;
});

Clazz.newMeth(C$, 'enlargeBall$',  function () {
this.mBallSize=16;
this.mHalfBallSize=8;
this.mBallImage=this.largeBallImage;
var bool=false;
for (var b=1; !bool; b++) {
bool=true;
if (this.collisionDetection$I$I(this.xPos, this.yPos - b)) {
this.yPos-=b;
continue;
}if (this.collisionDetection$I$I(this.xPos - b, this.yPos - b)) {
this.xPos-=b;
this.yPos-=b;
continue;
}if (this.collisionDetection$I$I(this.xPos + b, this.yPos - b)) {
this.xPos+=b;
this.yPos-=b;
continue;
}if (this.collisionDetection$I$I(this.xPos, this.yPos + b)) {
this.yPos+=b;
continue;
}if (this.collisionDetection$I$I(this.xPos - b, this.yPos + b)) {
this.xPos-=b;
this.yPos+=b;
continue;
}if (this.collisionDetection$I$I(this.xPos + b, this.yPos + b)) {
this.xPos+=b;
this.yPos+=b;
continue;
}bool=false;
}
});

Clazz.newMeth(C$, 'shrinkBall$',  function () {
this.mBallSize=12;
this.mHalfBallSize=6;
this.mBallImage=this.smallBallImage;
});

Clazz.newMeth(C$, 'popBall$',  function () {
if (!this.mCanvas.mInvincible) {
this.popCntr=7;
this.ballState=2;
--this.mCanvas.numLives;
this.speedBonusCntr=0;
this.gravBonusCntr=0;
this.jumpBonusCntr=0;
this.mCanvas.mPaintUIFlag=true;
}});

Clazz.newMeth(C$, 'addRing$',  function () {
this.mCanvas.add2Score$I(500);
++this.mCanvas.numRings;
this.mCanvas.mPaintUIFlag=true;
});

Clazz.newMeth(C$, 'redirectBall$I',  function (paramInt) {
var i=this.xSpeed;
switch (paramInt) {
case 35:
this.xSpeed=(this.xSpeed > -this.ySpeed) ? this.xSpeed : this.ySpeed;
this.ySpeed=i;
break;
case 37:
this.xSpeed=(-this.xSpeed > this.ySpeed) ? this.xSpeed : this.ySpeed;
this.ySpeed=i;
break;
case 34:
this.xSpeed=(this.xSpeed < this.ySpeed) ? this.xSpeed : -this.ySpeed;
this.ySpeed=-i;
break;
case 36:
this.xSpeed=(this.xSpeed > this.ySpeed) ? this.xSpeed : -this.ySpeed;
this.ySpeed=-i;
break;
case 31:
this.xSpeed=(this.xSpeed > -this.ySpeed) ? this.xSpeed : (this.ySpeed >> 1);
this.ySpeed=i;
break;
case 33:
this.xSpeed=(-this.xSpeed > this.ySpeed) ? this.xSpeed : (this.ySpeed >> 1);
this.ySpeed=i;
break;
case 30:
this.xSpeed=(this.xSpeed < this.ySpeed) ? this.xSpeed : -(this.ySpeed >> 1);
this.ySpeed=-i;
break;
case 32:
this.xSpeed=(this.xSpeed > this.ySpeed) ? this.xSpeed : -(this.ySpeed >> 1);
this.ySpeed=-i;
break;
}
});

Clazz.newMeth(C$, 'squareCollide$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4) {
var b1;
var n;
var b2;
var i1;
var ballMask;
var i=paramInt4 * 12;
var j=paramInt3 * 12;
var k=paramInt1 - this.mHalfBallSize - i ;
var m=paramInt2 - this.mHalfBallSize - j ;
if (k >= 0) {
b1=k;
n=12;
} else {
b1=0;
n=this.mBallSize + k;
}if (m >= 0) {
b2=m;
i1=12;
} else {
b2=0;
i1=this.mBallSize + m;
}if (this.mBallSize == 16) {
ballMask=C$.LARGE_BALL_DATA;
} else {
ballMask=C$.SMALL_BALL_DATA;
}if (n > 12) n=12;
if (i1 > 12) i1=12;
for (var b3=b1; b3 < n; b3++) {
for (var b=b2; b < i1; b++) {
if (ballMask[b - m][b3 - k] != 0) return true;
}
}
return false;
});

Clazz.newMeth(C$, 'triangleCollide$I$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4, paramInt5) {
var b3;
var n;
var b4;
var i1;
var ballMask;
var i=paramInt4 * 12;
var j=paramInt3 * 12;
var k=paramInt1 - this.mHalfBallSize - i ;
var m=paramInt2 - this.mHalfBallSize - j ;
var b1=0;
var b2=0;
switch (paramInt5) {
case 30:
case 34:
b2=11;
b1=11;
break;
case 31:
case 35:
b2=11;
break;
case 33:
case 37:
b1=11;
break;
}
if (k >= 0) {
b3=k;
n=12;
} else {
b3=0;
n=this.mBallSize + k;
}if (m >= 0) {
b4=m;
i1=12;
} else {
b4=0;
i1=this.mBallSize + m;
}if (this.mBallSize == 16) {
ballMask=C$.LARGE_BALL_DATA;
} else {
ballMask=C$.SMALL_BALL_DATA;
}if (n > 12) n=12;
if (i1 > 12) i1=12;
for (var b5=b3; b5 < n; b5++) {
for (var b=b4; b < i1; b++) {
if ((C$.TRI_TILE_DATA[Math.abs(b - b2)][Math.abs(b5 - b1)] & ballMask[b - m][b5 - k]) != 0) {
if (!this.mGroundedFlag) this.redirectBall$I(paramInt5);
return true;
}}
}
return false;
});

Clazz.newMeth(C$, 'thinCollide$I$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4, paramInt5) {
var i=paramInt4 * 12;
var j=paramInt3 * 12;
var k=i + 12;
var m=j + 12;
switch (paramInt5) {
case 3:
case 5:
case 9:
case 13:
case 14:
case 17:
case 18:
case 21:
case 22:
case 43:
case 45:
i+=4;
k-=4;
break;
case 4:
case 6:
case 15:
case 16:
case 19:
case 20:
case 23:
case 24:
case 44:
case 46:
j+=4;
m-=4;
break;
}
return C$.rectCollide$I$I$I$I$I$I$I$I(paramInt1 - this.mHalfBallSize, paramInt2 - this.mHalfBallSize, paramInt1 + this.mHalfBallSize - 1, paramInt2 + this.mHalfBallSize - 1, i, j, k - 1, m - 1);
});

Clazz.newMeth(C$, 'edgeCollide$I$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4, paramInt5) {
var i=paramInt4 * 12;
var j=paramInt3 * 12;
var k=i + 12;
var m=j + 12;
switch (paramInt5) {
case 15:
case 19:
case 23:
case 27:
j+=6;
m-=6;
k-=11;
break;
case 16:
case 20:
case 24:
case 28:
j+=6;
m-=6;
i+=11;
break;
case 13:
case 17:
i+=6;
k-=6;
m-=11;
break;
case 21:
case 25:
m=j;
--j;
i+=6;
k-=6;
break;
case 14:
case 18:
case 22:
case 26:
i+=6;
k-=6;
j+=11;
break;
}
return C$.rectCollide$I$I$I$I$I$I$I$I(paramInt1 - this.mHalfBallSize, paramInt2 - this.mHalfBallSize, paramInt1 + this.mHalfBallSize, paramInt2 + this.mHalfBallSize, i, j, k, m);
});

Clazz.newMeth(C$, 'testTile$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4) {
var k;
if (paramInt3 >= this.mCanvas.mTileMapHeight || paramInt3 < 0  || paramInt4 >= this.mCanvas.mTileMapWidth  || paramInt4 < 0 ) return false;
if (this.ballState == 2) return false;
var bool=true;
var i=this.mCanvas.tileMap[paramInt3][paramInt4] & 64;
var j=this.mCanvas.tileMap[paramInt3][paramInt4] & -65 & -129 ;
switch (j) {
case 1:
if (this.squareCollide$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4)) {
bool=false;
this.mCDRampFlag=true;
break;
}this.mCDRampFlag=true;
break;
case 2:
if (this.squareCollide$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4)) {
this.mCDRubberFlag=true;
bool=false;
break;
}this.mCDRampFlag=true;
break;
case 34:
case 35:
case 36:
case 37:
if (this.triangleCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
this.mCDRubberFlag=true;
bool=false;
this.mCDRampFlag=true;
}break;
case 30:
case 31:
case 32:
case 33:
if (this.triangleCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
bool=false;
this.mCDRampFlag=true;
}break;
case 10:
k=this.mCanvas.findSpikeIndex$I$I(paramInt4, paramInt3);
if (k != -1) {
var m=this.mCanvas.mMOTopLeft[k][0] * 12 + this.mCanvas.mMOOffset[k][0];
var n=this.mCanvas.mMOTopLeft[k][1] * 12 + this.mCanvas.mMOOffset[k][1];
if (C$.rectCollide$I$I$I$I$I$I$I$I(paramInt1 - this.mHalfBallSize + 1, paramInt2 - this.mHalfBallSize + 1, paramInt1 + this.mHalfBallSize - 1, paramInt2 + this.mHalfBallSize - 1, m + 1, n + 1, m + 24 - 1, n + 24 - 1)) {
bool=false;
this.popBall$();
}}break;
case 3:
case 4:
case 5:
case 6:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
bool=false;
this.popBall$();
}break;
case 7:
this.mCanvas.add2Score$I(200);
this.mCanvas.tileMap[this.respawnY][this.respawnX]=(128|0);
this.setRespawn$I$I(paramInt4, paramInt3);
this.mCanvas.tileMap[paramInt3][paramInt4]=(136|0);
break;
case 23:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
bool=false;
break;
}this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((155 | i)|0);
this.mCanvas.tileMap[paramInt3][paramInt4 + 1]=((156 | i)|0);
}break;
case 15:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mBallSize == 16) {
bool=false;
break;
}if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((147 | i)|0);
this.mCanvas.tileMap[paramInt3][paramInt4 + 1]=((148 | i)|0);
}break;
case 24:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((156 | i)|0);
this.mCanvas.tileMap[paramInt3][paramInt4 - 1]=((155 | i)|0);
}break;
case 16:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mBallSize == 16) {
bool=false;
break;
}if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((148 | i)|0);
this.mCanvas.tileMap[paramInt3][paramInt4 - 1]=((147 | i)|0);
}break;
case 21:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((153 | i)|0);
this.mCanvas.tileMap[paramInt3 + 1][paramInt4]=((154 | i)|0);
}break;
case 13:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mBallSize == 16) {
bool=false;
break;
}if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((145 | i)|0);
this.mCanvas.tileMap[paramInt3 + 1][paramInt4]=((146 | i)|0);
}break;
case 22:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((154 | i)|0);
this.mCanvas.tileMap[paramInt3 - 1][paramInt4]=((153 | i)|0);
}break;
case 14:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mBallSize == 16) {
bool=false;
break;
}this.addRing$();
this.mCanvas.tileMap[paramInt3][paramInt4]=((146 | i)|0);
this.mCanvas.tileMap[paramInt3 - 1][paramInt4]=((145 | i)|0);
}break;
case 17:
case 19:
case 20:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mBallSize == 16) {
bool=false;
break;
}if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
}break;
case 25:
case 27:
case 28:
if (this.edgeCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) bool=false;
break;
case 18:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j) && this.mBallSize == 16 ) bool=false;
break;
case 9:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
if (this.mCanvas.mOpenFlag) {
this.mCanvas.mLeaveGame=true;
break;
}bool=false;
}break;
case 29:
this.mCanvas.add2Score$I(1000);
if (this.mCanvas.numLives < 5) {
++this.mCanvas.numLives;
this.mCanvas.mPaintUIFlag=true;
}this.mCanvas.tileMap[paramInt3][paramInt4]=(128|0);
break;
case 39:
case 40:
case 41:
case 42:
bool=false;
if (this.mBallSize == 16) this.shrinkBall$();
break;
case 43:
case 44:
case 45:
case 46:
if (this.thinCollide$I$I$I$I$I(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
bool=false;
if (this.mBallSize == 12) this.enlargeBall$();
}break;
case 47:
case 48:
case 49:
case 50:
this.gravBonusCntr=300;
this.mGroundedFlag=false;
bool=false;
break;
case 51:
case 52:
case 53:
case 54:
this.jumpBonusCntr=300;
bool=false;
break;
case 38:
this.speedBonusCntr=300;
bool=false;
break;
}
return bool;
});

Clazz.newMeth(C$, 'isGravityTileAt$I$I',  function (tileCol, tileRow) {
if (this.mCanvas.tileMap == null ) return false;
if (tileRow < 0 || tileCol < 0  || tileRow >= this.mCanvas.mTileMapHeight  || tileCol >= this.mCanvas.mTileMapWidth ) return false;
return ((this.mCanvas.tileMap[tileRow][tileCol] & 64) != 0);
}, p$1);

Clazz.newMeth(C$, 'update$',  function () {
var i=this.xPos;
var j=0;
var k=0;
var b1=0;
var bool1=false;
if (this.ballState == 2) {
--this.popCntr;
if (this.popCntr == 0) {
this.ballState=1;
if (this.mCanvas.numLives < 0) this.mCanvas.mLeaveGame=true;
}return;
}var m=(this.xPos/12|0);
var n=(this.yPos/12|0);
var bool2=p$1.isGravityTileAt$I$I.apply(this, [m, n]);
if (bool2) {
if (this.mBallSize == 16) {
k=-30;
j=-2;
if (this.mGroundedFlag) this.ySpeed=-10;
} else {
k=42;
j=6;
}} else if (this.mBallSize == 16) {
k=38;
j=3;
} else {
k=80;
j=4;
}if (this.gravBonusCntr != 0) {
bool1=true;
k*=-1;
j*=-1;
--this.gravBonusCntr;
if (this.gravBonusCntr == 0) {
bool1=false;
this.mGroundedFlag=false;
k*=-1;
j*=-1;
}}if (this.mCanvas.mInvertedGravity) {
bool1=!bool1;
k*=-1;
j*=-1;
}if (this.jumpBonusCntr != 0) {
var jo=this.jumpOffset;
if (jo > -80 && jo < 80 ) if (bool1) {
this.jumpOffset=80;
} else {
this.jumpOffset=-80;
}--this.jumpBonusCntr;
}++this.slideCntr;
if (this.slideCntr == 3) this.slideCntr=0;
if (this.ySpeed < -150) {
this.ySpeed=-150;
} else if (this.ySpeed > 150) {
this.ySpeed=150;
}if (this.xSpeed < -150) {
this.xSpeed=-150;
} else if (this.xSpeed > 150) {
this.xSpeed=150;
}if (this.ySpeed < 10 && this.ySpeed > 0  && !bool2  && !bool1 ) this.ySpeed=10;
var ySpeedAbs=this.ySpeed < 0 ? -this.ySpeed : this.ySpeed;
for (var b2=0; b2 < (ySpeedAbs/10|0); b2++) {
var b=0;
if (this.ySpeed != 0) b=(this.ySpeed < 0) ? -1 : 1;
if (this.collisionDetection$I$I(this.xPos, this.yPos + b)) {
this.yPos+=b;
this.mGroundedFlag=false;
if (k == -30) {
n=(this.yPos/12|0);
if (!p$1.isGravityTileAt$I$I.apply(this, [m, n])) {
this.ySpeed>>=1;
if (this.ySpeed <= 10 && this.ySpeed >= -10 ) this.ySpeed=0;
}}} else {
if (this.mCDRampFlag && this.xSpeed < 10  && this.slideCntr == 0 ) {
var b4=1;
if (this.collisionDetection$I$I(this.xPos + b4, this.yPos + b)) {
this.xPos+=b4;
this.yPos+=b;
this.mCDRampFlag=false;
} else if (this.collisionDetection$I$I(this.xPos - b4, this.yPos + b)) {
this.xPos-=b4;
this.yPos+=b;
this.mCDRampFlag=false;
}}if ((b > 0 && !bool1 ) || (bool1 && b < 0 ) ) {
this.ySpeed=(this.ySpeed * -1/2|0);
this.mGroundedFlag=true;
if (this.mCDRubberFlag && (this.direction & 8) != 0 ) {
this.mCDRubberFlag=false;
if (bool1) {
this.jumpOffset+=10;
} else {
this.jumpOffset+=-10;
}} else if (this.jumpBonusCntr == 0) {
this.jumpOffset=0;
}if (this.ySpeed < 10 && this.ySpeed > -10 ) {
if (bool1) {
this.ySpeed=-10;
break;
}this.ySpeed=10;
}break;
}if ((b < 0 && !bool1 ) || (bool1 && b > 0 ) ) if (bool1) {
this.ySpeed=-20;
} else {
this.ySpeed=-this.ySpeed >> 1;
}}}
if (bool1) {
if (j == -2 && this.ySpeed < k ) {
this.ySpeed+=j;
if (this.ySpeed > k) this.ySpeed=k;
} else if (!this.mGroundedFlag && this.ySpeed > k ) {
this.ySpeed+=j;
if (this.ySpeed < k) this.ySpeed=k;
}} else if (j == -2 && this.ySpeed > k ) {
this.ySpeed+=j;
if (this.ySpeed < k) this.ySpeed=k;
} else if (!this.mGroundedFlag && this.ySpeed < k ) {
this.ySpeed+=j;
if (this.ySpeed > k) this.ySpeed=k;
}if (this.speedBonusCntr != 0) {
b1=100;
--this.speedBonusCntr;
} else {
b1=50;
}if ((this.direction & 2) != 0 && this.xSpeed < b1 ) {
this.xSpeed+=6;
} else if ((this.direction & 1) != 0 && this.xSpeed > -b1 ) {
this.xSpeed-=6;
} else if (this.xSpeed > 0) {
this.xSpeed-=4;
} else if (this.xSpeed < 0) {
this.xSpeed+=4;
}if (this.mBallSize == 16 && this.jumpBonusCntr == 0 ) if (bool1) {
this.jumpOffset+=5;
} else {
this.jumpOffset+=-5;
}if (this.mGroundedFlag && (this.direction & 8) != 0 ) {
if (bool1) {
this.ySpeed=67 + this.jumpOffset;
} else {
this.ySpeed=-67 + this.jumpOffset;
}this.mGroundedFlag=false;
}var xSpeedAbs=this.xSpeed < 0 ? -this.xSpeed : this.xSpeed;
var i2=(xSpeedAbs/10|0);
for (var b3=0; b3 < i2; b3++) {
var b=0;
if (this.xSpeed != 0) b=(this.xSpeed < 0) ? -1 : 1;
if (this.collisionDetection$I$I(this.xPos + b, this.yPos)) {
this.xPos+=b;
} else if (this.mCDRampFlag) {
this.mCDRampFlag=false;
var b4=0;
if (bool1) {
b4=1;
} else {
b4=-1;
}if (this.collisionDetection$I$I(this.xPos + b, this.yPos + b4)) {
this.xPos+=b;
this.yPos+=b4;
} else if (this.collisionDetection$I$I(this.xPos + b, this.yPos - b4)) {
this.xPos+=b;
this.yPos-=b4;
} else {
this.xSpeed=-(this.xSpeed >> 1);
}}}
});

Clazz.newMeth(C$, 'rectCollide$I$I$I$I$I$I$I$I',  function (paramInt1, paramInt2, paramInt3, paramInt4, paramInt5, paramInt6, paramInt7, paramInt8) {
return (paramInt1 <= paramInt7 && paramInt2 <= paramInt8  && paramInt5 <= paramInt3  && paramInt6 <= paramInt4 );
}, 1);

C$.$static$=function(){C$.$static$=0;
C$.TRI_TILE_DATA=Clazz.array(Integer.TYPE, -2, [Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])]);
C$.SMALL_BALL_DATA=Clazz.array(Integer.TYPE, -2, [Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0])]);
C$.LARGE_BALL_DATA=Clazz.array(Integer.TYPE, -2, [Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]), Clazz.array(Integer.TYPE, -1, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0])]);
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
