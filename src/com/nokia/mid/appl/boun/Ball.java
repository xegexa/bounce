package com.nokia.mid.appl.boun;

import java.awt.Image;

public class Ball {
  //private boolean mDebugCD = true;
  
  public int xPos;
  
  public int yPos;
  
  public int xSpeed;
  
  public int ySpeed;
  
  public int direction;
  
  public int mBallSize;
  
  public int mHalfBallSize;
  
  public int respawnX;
  
  public int respawnY;
  
  public int respawnSize;
  
  public int ballState;
  
  public int jumpOffset;
  
  public int speedBonusCntr;
  
  public int gravBonusCntr;
  
  public int jumpBonusCntr;
  
  public boolean mGroundedFlag;
  
  public boolean mCDRubberFlag;
  
  public boolean mCDRampFlag;
  
  public int slideCntr;
  
  public static final int[][] TRI_TILE_DATA = new int[][] { 
      { 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 1 }, { 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        1, 1 }, { 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
        1, 1 }, { 
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
        1, 1 }, { 
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 
        1, 1 }, { 
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 
        1, 1 }, { 
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, 
      { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 } };
  
  public static final int[][] SMALL_BALL_DATA = new int[][] { 
      { 
        0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 
        0, 0 }, { 
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 
        0, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 0 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 0 }, 
      { 
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 
        0, 0 }, { 
        0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 
        0, 0 } };
  
  public static final int[][] LARGE_BALL_DATA = new int[][] { 
      { 
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 
        1, 0, 0, 0, 0, 0 }, { 
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 0, 0, 0 }, { 
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 0, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 0 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, 
      { 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 0 }, { 
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 0 }, { 
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 0, 0 }, { 
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 0, 0, 0 }, { 
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 
        1, 0, 0, 0, 0, 0 } };
  
  public BounceCanvas mCanvas;
  
  public Image mBallImage;
  
  public Image poppedImage;
  
  public Image largeBallImage;
  
  public Image smallBallImage;
  
  private int popCntr;
  
  public Ball(int paramInt1, int paramInt2, int paramInt3, BounceCanvas paramBounceCanvas) {
    this.xPos = paramInt1;
    this.yPos = paramInt2;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.mCanvas = paramBounceCanvas;
    this.jumpOffset = 0;
    this.mGroundedFlag = false;
    this.mCDRubberFlag = false;
    this.mCDRampFlag = false;
    this.popCntr = 0;
    this.speedBonusCntr = 0;
    this.gravBonusCntr = 0;
    this.jumpBonusCntr = 0;
    this.slideCntr = 0;
    this.ballState = 0;
    this.direction = 0;
    this.mCanvas.setBallImages(this);
    if (paramInt3 == 12) {
      shrinkBall();
    } else {
      enlargeBall();
    } 
  }
  
  public void setRespawn(int paramInt1, int paramInt2) {
    this.respawnX = paramInt1;
    this.respawnY = paramInt2;
    this.respawnSize = this.mBallSize;
  }
  
  public void setDirection(int paramInt) {
    if (paramInt == 8 || paramInt == 4 || paramInt == 2 || paramInt == 1)
      this.direction |= paramInt; 
  }
  
  public void releaseDirection(int paramInt) {
    if (paramInt == 8 || paramInt == 4 || paramInt == 2 || paramInt == 1)
      this.direction &= paramInt ^ 0xFFFFFFFF; 
  }
  
  public void resetDirections() {
    this.direction &= 0xFFFFFFF0;
  }
  
  public boolean collisionDetection(int paramInt1, int paramInt2) {
    int i = (paramInt1 - this.mHalfBallSize) / 12;
    int j = (paramInt2 - this.mHalfBallSize) / 12;
    int k = (paramInt1 - 1 + this.mHalfBallSize) / 12 + 1;
    int m = (paramInt2 - 1 + this.mHalfBallSize) / 12 + 1;
    for (int n = i; n < k; n++) {
      for (int i1 = j; i1 < m; i1++) {
        if (!testTile(paramInt1, paramInt2, i1, n))
          return false; 
      } 
    } 
    return true;
  }
  
  public void enlargeBall() {
    this.mBallSize = 16;
    this.mHalfBallSize = 8;
    this.mBallImage = this.largeBallImage;
    boolean bool = false;
    for (int b = 1; !bool; b++) {
      bool = true;
      if (collisionDetection(this.xPos, this.yPos - b)) {
        this.yPos -= b;
        continue;
      } 
      if (collisionDetection(this.xPos - b, this.yPos - b)) {
        this.xPos -= b;
        this.yPos -= b;
        continue;
      } 
      if (collisionDetection(this.xPos + b, this.yPos - b)) {
        this.xPos += b;
        this.yPos -= b;
        continue;
      } 
      if (collisionDetection(this.xPos, this.yPos + b)) {
        this.yPos += b;
        continue;
      } 
      if (collisionDetection(this.xPos - b, this.yPos + b)) {
        this.xPos -= b;
        this.yPos += b;
        continue;
      } 
      if (collisionDetection(this.xPos + b, this.yPos + b)) {
        this.xPos += b;
        this.yPos += b;
        continue;
      } 
      bool = false;
    } 
  }
  
  public void shrinkBall() {
    this.mBallSize = 12;
    this.mHalfBallSize = 6;
    this.mBallImage = this.smallBallImage;
  }
  
  public void popBall() {
    if (!this.mCanvas.mInvincible) {
      this.popCntr = 7;
      this.ballState = 2;
      this.mCanvas.numLives--;
      this.speedBonusCntr = 0;
      this.gravBonusCntr = 0;
      this.jumpBonusCntr = 0;
      this.mCanvas.mPaintUIFlag = true;
      //this.mCanvas.mSoundPop.play(1);
    } 
  }
  
  public void addRing() {
    this.mCanvas.add2Score(500);
    this.mCanvas.numRings++;
    this.mCanvas.mPaintUIFlag = true;
  }
  
  public void redirectBall(int paramInt) {
    int i = this.xSpeed;
    switch (paramInt) {
      case 35:
        this.xSpeed = (this.xSpeed > -this.ySpeed) ? this.xSpeed : this.ySpeed;
        this.ySpeed = i;
        break;
      case 37:
        this.xSpeed = (-this.xSpeed > this.ySpeed) ? this.xSpeed : this.ySpeed;
        this.ySpeed = i;
        break;
      case 34:
        this.xSpeed = (this.xSpeed < this.ySpeed) ? this.xSpeed : -this.ySpeed;
        this.ySpeed = -i;
        break;
      case 36:
        this.xSpeed = (this.xSpeed > this.ySpeed) ? this.xSpeed : -this.ySpeed;
        this.ySpeed = -i;
        break;
      case 31:
        this.xSpeed = (this.xSpeed > -this.ySpeed) ? this.xSpeed : (this.ySpeed >> 1);
        this.ySpeed = i;
        break;
      case 33:
        this.xSpeed = (-this.xSpeed > this.ySpeed) ? this.xSpeed : (this.ySpeed >> 1);
        this.ySpeed = i;
        break;
      case 30:
        this.xSpeed = (this.xSpeed < this.ySpeed) ? this.xSpeed : -(this.ySpeed >> 1);
        this.ySpeed = -i;
        break;
      case 32:
        this.xSpeed = (this.xSpeed > this.ySpeed) ? this.xSpeed : -(this.ySpeed >> 1);
        this.ySpeed = -i;
        break;
    } 
  }
  
  public boolean squareCollide(int paramInt1, int paramInt2, int paramInt3, int paramInt4) {
    int b1;
    int n;
    int b2;
    int i1;
    int[][] ballMask;
    int i = paramInt4 * 12;
    int j = paramInt3 * 12;
    int k = paramInt1 - this.mHalfBallSize - i;
    int m = paramInt2 - this.mHalfBallSize - j;
    if (k >= 0) {
      b1 = k;
      n = 12;
    } else {
      b1 = 0;
      n = this.mBallSize + k;
    } 
    if (m >= 0) {
      b2 = m;
      i1 = 12;
    } else {
      b2 = 0;
      i1 = this.mBallSize + m;
    } 
    if (this.mBallSize == 16) {
      ballMask = LARGE_BALL_DATA;
    } else {
      ballMask = SMALL_BALL_DATA;
    } 
    if (n > 12)
      n = 12; 
    if (i1 > 12)
      i1 = 12; 
    for (int b3 = b1; b3 < n; b3++) {
      for (int b = b2; b < i1; b++) {
        if (ballMask[b - m][b3 - k] != 0)
          return true; 
      } 
    } 
    return false;
  }
  
  public boolean triangleCollide(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5) {
    int b3;
    int n;
    int b4;
    int i1;
    int[][] ballMask;
    int i = paramInt4 * 12;
    int j = paramInt3 * 12;
    int k = paramInt1 - this.mHalfBallSize - i;
    int m = paramInt2 - this.mHalfBallSize - j;
    int b1 = 0;
    int b2 = 0;
    switch (paramInt5) {
      case 30:
      case 34:
        b2 = 11;
        b1 = 11;
        break;
      case 31:
      case 35:
        b2 = 11;
        break;
      case 33:
      case 37:
        b1 = 11;
        break;
    } 
    if (k >= 0) {
      b3 = k;
      n = 12;
    } else {
      b3 = 0;
      n = this.mBallSize + k;
    } 
    if (m >= 0) {
      b4 = m;
      i1 = 12;
    } else {
      b4 = 0;
      i1 = this.mBallSize + m;
    } 
    if (this.mBallSize == 16) {
      ballMask = LARGE_BALL_DATA;
    } else {
      ballMask = SMALL_BALL_DATA;
    } 
    if (n > 12)
      n = 12; 
    if (i1 > 12)
      i1 = 12; 
    for (int b5 = b3; b5 < n; b5++) {
      for (int b = b4; b < i1; b++) {
        if ((TRI_TILE_DATA[Math.abs(b - b2)][Math.abs(b5 - b1)] & ballMask[b - m][b5 - k]) != 0) {
          if (!this.mGroundedFlag)
            redirectBall(paramInt5); 
          return true;
        } 
      } 
    } 
    return false;
  }
  
  public boolean thinCollide(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5) {
    int i = paramInt4 * 12;
    int j = paramInt3 * 12;
    int k = i + 12;
    int m = j + 12;
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
        i += 4;
        k -= 4;
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
        j += 4;
        m -= 4;
        break;
    } 
    return rectCollide(paramInt1 - this.mHalfBallSize, paramInt2 - this.mHalfBallSize, paramInt1 + this.mHalfBallSize - 1, paramInt2 + this.mHalfBallSize - 1, i, j, k - 1, m - 1);
  }
  
  public boolean edgeCollide(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5) {
    int i = paramInt4 * 12;
    int j = paramInt3 * 12;
    int k = i + 12;
    int m = j + 12;
    switch (paramInt5) {
      case 15:
      case 19:
      case 23:
      case 27:
        j += 6;
        m -= 6;
        k -= 11;
        break;
      case 16:
      case 20:
      case 24:
      case 28:
        j += 6;
        m -= 6;
        i += 11;
        break;
      case 13:
      case 17:
        i += 6;
        k -= 6;
        m -= 11;
        break;
      case 21:
      case 25:
        m = j;
        j--;
        i += 6;
        k -= 6;
        break;
      case 14:
      case 18:
      case 22:
      case 26:
        i += 6;
        k -= 6;
        j += 11;
        break;
    } 
    return rectCollide(paramInt1 - this.mHalfBallSize, paramInt2 - this.mHalfBallSize, paramInt1 + this.mHalfBallSize, paramInt2 + this.mHalfBallSize, i, j, k, m);
  }
  
  public boolean testTile(int paramInt1, int paramInt2, int paramInt3, int paramInt4) {
    int k;
    if (paramInt3 >= this.mCanvas.mTileMapHeight || paramInt3 < 0 || paramInt4 >= this.mCanvas.mTileMapWidth || paramInt4 < 0)
      return false; 
    if (this.ballState == 2)
      return false; 
    boolean bool = true;
    int i = this.mCanvas.tileMap[paramInt3][paramInt4] & 0x40;
    int j = this.mCanvas.tileMap[paramInt3][paramInt4] & 0xFFFFFFBF & 0xFFFFFF7F;
    //Sound sound = null;
    switch (j) {
      case 1:
        if (squareCollide(paramInt1, paramInt2, paramInt3, paramInt4)) {
          bool = false;
          this.mCDRampFlag = true;
          break;
        } 
        this.mCDRampFlag = true;
        break;
      case 2:
        if (squareCollide(paramInt1, paramInt2, paramInt3, paramInt4)) {
          this.mCDRubberFlag = true;
          bool = false;
          break;
        } 
        this.mCDRampFlag = true;
        break;
      case 34:
      case 35:
      case 36:
      case 37:
        if (triangleCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          this.mCDRubberFlag = true;
          bool = false;
          this.mCDRampFlag = true;
        } 
        break;
      case 30:
      case 31:
      case 32:
      case 33:
        if (triangleCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          bool = false;
          this.mCDRampFlag = true;
        } 
        break;
      case 10:
        k = this.mCanvas.findSpikeIndex(paramInt4, paramInt3);
        if (k != -1) {
          int m = this.mCanvas.mMOTopLeft[k][0] * 12 + this.mCanvas.mMOOffset[k][0];
          int n = this.mCanvas.mMOTopLeft[k][1] * 12 + this.mCanvas.mMOOffset[k][1];
          if (rectCollide(paramInt1 - this.mHalfBallSize + 1, paramInt2 - this.mHalfBallSize + 1, paramInt1 + this.mHalfBallSize - 1, paramInt2 + this.mHalfBallSize - 1, m + 1, n + 1, m + 24 - 1, n + 24 - 1)) {
            bool = false;
            popBall();
          } 
        } 
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          bool = false;
          popBall();
        } 
        break;
      case 7:
        this.mCanvas.add2Score(200);
        this.mCanvas.tileMap[this.respawnY][this.respawnX] = 128;
        setRespawn(paramInt4, paramInt3);
        this.mCanvas.tileMap[paramInt3][paramInt4] = 136;
        //sound = this.mCanvas.mSoundPickup;
        break;
      case 23:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
            bool = false;
            break;
          } 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x9B | i);
          this.mCanvas.tileMap[paramInt3][paramInt4 + 1] = (short)(0x9C | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 15:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mBallSize == 16) {
            bool = false;
            break;
          } 
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x93 | i);
          this.mCanvas.tileMap[paramInt3][paramInt4 + 1] = (short)(0x94 | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 24:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x9C | i);
          this.mCanvas.tileMap[paramInt3][paramInt4 - 1] = (short)(0x9B | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 16:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mBallSize == 16) {
            bool = false;
            break;
          } 
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x94 | i);
          this.mCanvas.tileMap[paramInt3][paramInt4 - 1] = (short)(0x93 | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 21:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x99 | i);
          this.mCanvas.tileMap[paramInt3 + 1][paramInt4] = (short)(0x9A | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 13:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mBallSize == 16) {
            bool = false;
            break;
          } 
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x91 | i);
          this.mCanvas.tileMap[paramInt3 + 1][paramInt4] = (short)(0x92 | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 22:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x9A | i);
          this.mCanvas.tileMap[paramInt3 - 1][paramInt4] = (short)(0x99 | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 14:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mBallSize == 16) {
            bool = false;
            break;
          } 
          addRing();
          this.mCanvas.tileMap[paramInt3][paramInt4] = (short)(0x92 | i);
          this.mCanvas.tileMap[paramInt3 - 1][paramInt4] = (short)(0x91 | i);
          //sound = this.mCanvas.mSoundHoop;
        } 
        break;
      case 17:
      case 19:
      case 20:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mBallSize == 16) {
            bool = false;
            break;
          } 
          if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
            bool = false; 
        } 
        break;
      case 25:
      case 27:
      case 28:
        if (edgeCollide(paramInt1, paramInt2, paramInt3, paramInt4, j))
          bool = false; 
        break;
      case 18:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j) && this.mBallSize == 16)
          bool = false; 
        break;
      case 9:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          if (this.mCanvas.mOpenFlag) {
            this.mCanvas.mLeaveGame = true;
            //sound = this.mCanvas.mSoundPickup;
            break;
          } 
          bool = false;
        } 
        break;
      case 29:
        this.mCanvas.add2Score(1000);
        if (this.mCanvas.numLives < 5) {
          this.mCanvas.numLives++;
          this.mCanvas.mPaintUIFlag = true;
        } 
        this.mCanvas.tileMap[paramInt3][paramInt4] = 128;
        //sound = this.mCanvas.mSoundPickup;
        break;
      case 39:
      case 40:
      case 41:
      case 42:
        bool = false;
        if (this.mBallSize == 16)
          shrinkBall(); 
        break;
      case 43:
      case 44:
      case 45:
      case 46:
        if (thinCollide(paramInt1, paramInt2, paramInt3, paramInt4, j)) {
          bool = false;
          if (this.mBallSize == 12)
            enlargeBall(); 
        } 
        break;
      case 47:
      case 48:
      case 49:
      case 50:
        this.gravBonusCntr = 300;
        //sound = this.mCanvas.mSoundPickup;
        this.mGroundedFlag = false;
        bool = false;
        break;
      case 51:
      case 52:
      case 53:
      case 54:
        this.jumpBonusCntr = 300;
        //sound = this.mCanvas.mSoundPickup;
        bool = false;
        break;
      case 38:
        this.speedBonusCntr = 300;
        //sound = this.mCanvas.mSoundPickup;
        bool = false;
        break;
    } 
    //if (sound != null)
    //  sound.play(1); 
    return bool;
  }
  
  /** Inverted-gravity flag for {@code tileMap[tileRow][tileCol]}; false if map is null or indices are out of bounds. */
  private boolean isGravityTileAt(int tileCol, int tileRow) {
    if (this.mCanvas.tileMap == null)
      return false; 
    if (tileRow < 0 || tileCol < 0 || tileRow >= this.mCanvas.mTileMapHeight || tileCol >= this.mCanvas.mTileMapWidth)
      return false; 
    return ((this.mCanvas.tileMap[tileRow][tileCol] & 0x40) != 0);
  }
  
  public void update() {
    int i = this.xPos;
    int j = 0;
    int k = 0;
    int b1 = 0;
    boolean bool1 = false;
    if (this.ballState == 2) {
      this.popCntr--;
      if (this.popCntr == 0) {
        this.ballState = 1;
        if (this.mCanvas.numLives < 0)
          this.mCanvas.mLeaveGame = true; 
      } 
      return;
    } 
    int m = this.xPos / 12;
    int n = this.yPos / 12;
    boolean bool2 = isGravityTileAt(m, n);
    if (bool2) {
      if (this.mBallSize == 16) {
        k = -30;
        j = -2;
        if (this.mGroundedFlag)
          this.ySpeed = -10; 
      } else {
        k = 42;
        j = 6;
      } 
    } else if (this.mBallSize == 16) {
      k = 38;
      j = 3;
    } else {
      k = 80;
      j = 4;
    } 
    if (this.gravBonusCntr != 0) {
      bool1 = true;
      k *= -1;
      j *= -1;
      this.gravBonusCntr--;
      if (this.gravBonusCntr == 0) {
        bool1 = false;
        this.mGroundedFlag = false;
        k *= -1;
        j *= -1;
      }
    }
    if (this.mCanvas.mInvertedGravity) {
      bool1 = !bool1;
      k *= -1;
      j *= -1;
    }
    if (this.jumpBonusCntr != 0) {
      int jo = this.jumpOffset;
      if (jo > -80 && jo < 80)
        if (bool1) {
          this.jumpOffset = 80;
        } else {
          this.jumpOffset = -80;
        }  
      this.jumpBonusCntr--;
    } 
    this.slideCntr++;
    if (this.slideCntr == 3)
      this.slideCntr = 0; 
    if (this.ySpeed < -150) {
      this.ySpeed = -150;
    } else if (this.ySpeed > 150) {
      this.ySpeed = 150;
    } 
    if (this.xSpeed < -150) {
      this.xSpeed = -150;
    } else if (this.xSpeed > 150) {
      this.xSpeed = 150;
    } 
    if (this.ySpeed < 10 && this.ySpeed > 0 && !bool2 && !bool1)
      this.ySpeed = 10; 
    int ySpeedAbs = this.ySpeed < 0 ? -this.ySpeed : this.ySpeed;
    for (int b2 = 0; b2 < ySpeedAbs / 10; b2++) {
      int b = 0;
      if (this.ySpeed != 0)
        b = (this.ySpeed < 0) ? -1 : 1; 
      if (collisionDetection(this.xPos, this.yPos + b)) {
        this.yPos += b;
        this.mGroundedFlag = false;
        if (k == -30) {
          n = this.yPos / 12;
          if (!isGravityTileAt(m, n)) {
            this.ySpeed >>= 1;
            if (this.ySpeed <= 10 && this.ySpeed >= -10)
              this.ySpeed = 0; 
          } 
        } 
      } else {
        if (this.mCDRampFlag && this.xSpeed < 10 && this.slideCntr == 0) {
          int b4 = 1;
          if (collisionDetection(this.xPos + b4, this.yPos + b)) {
            this.xPos += b4;
            this.yPos += b;
            this.mCDRampFlag = false;
          } else if (collisionDetection(this.xPos - b4, this.yPos + b)) {
            this.xPos -= b4;
            this.yPos += b;
            this.mCDRampFlag = false;
          } 
        } 
        if ((b > 0 && !bool1) || (bool1 && b < 0)) {
          this.ySpeed = this.ySpeed * -1 / 2;
          this.mGroundedFlag = true;
          if (this.mCDRubberFlag && (this.direction & 0x8) != 0) {
            this.mCDRubberFlag = false;
            if (bool1) {
              this.jumpOffset += 10;
            } else {
              this.jumpOffset += -10;
            } 
          } else if (this.jumpBonusCntr == 0) {
            this.jumpOffset = 0;
          } 
          if (this.ySpeed < 10 && this.ySpeed > -10) {
            if (bool1) {
              this.ySpeed = -10;
              break;
            } 
            this.ySpeed = 10;
          } 
          break;
        } 
        if ((b < 0 && !bool1) || (bool1 && b > 0))
          if (bool1) {
            this.ySpeed = -20;
          } else {
            this.ySpeed = -this.ySpeed >> 1;
          }
      } 
    } 
    if (bool1) {
      if (j == -2 && this.ySpeed < k) {
        this.ySpeed += j;
        if (this.ySpeed > k)
          this.ySpeed = k; 
      } else if (!this.mGroundedFlag && this.ySpeed > k) {
        this.ySpeed += j;
        if (this.ySpeed < k)
          this.ySpeed = k; 
      } 
    } else if (j == -2 && this.ySpeed > k) {
      this.ySpeed += j;
      if (this.ySpeed < k)
        this.ySpeed = k; 
    } else if (!this.mGroundedFlag && this.ySpeed < k) {
      this.ySpeed += j;
      if (this.ySpeed > k)
        this.ySpeed = k; 
    } 
    if (this.speedBonusCntr != 0) {
      b1 = 100;
      this.speedBonusCntr--;
    } else {
      b1 = 50;
    } 
    if ((this.direction & 0x2) != 0 && this.xSpeed < b1) {
      this.xSpeed += 6;
    } else if ((this.direction & 0x1) != 0 && this.xSpeed > -b1) {
      this.xSpeed -= 6;
    } else if (this.xSpeed > 0) {
      this.xSpeed -= 4;
    } else if (this.xSpeed < 0) {
      this.xSpeed += 4;
    } 
    if (this.mBallSize == 16 && this.jumpBonusCntr == 0)
      if (bool1) {
        this.jumpOffset += 5;
      } else {
        this.jumpOffset += -5;
      }  
    if (this.mGroundedFlag && (this.direction & 0x8) != 0) {
      if (bool1) {
        this.ySpeed = 67 + this.jumpOffset;
      } else {
        this.ySpeed = -67 + this.jumpOffset;
      } 
      this.mGroundedFlag = false;
    } 
    int xSpeedAbs = this.xSpeed < 0 ? -this.xSpeed : this.xSpeed;
    int i2 = xSpeedAbs / 10;
    for (int b3 = 0; b3 < i2; b3++) {
      int b = 0;
      if (this.xSpeed != 0)
        b = (this.xSpeed < 0) ? -1 : 1; 
      if (collisionDetection(this.xPos + b, this.yPos)) {
        this.xPos += b;
      } else if (this.mCDRampFlag) {
        this.mCDRampFlag = false;
        int b4 = 0;
        if (bool1) {
          b4 = 1;
        } else {
          b4 = -1;
        } 
        if (collisionDetection(this.xPos + b, this.yPos + b4)) {
          this.xPos += b;
          this.yPos += b4;
        } else if (collisionDetection(this.xPos + b, this.yPos - b4)) {
          this.xPos += b;
          this.yPos -= b4;
        } else {
          this.xSpeed = -(this.xSpeed >> 1);
        } 
      } 
    } 
  }
  
  public static boolean rectCollide(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5, int paramInt6, int paramInt7, int paramInt8) {
    return (paramInt1 <= paramInt7 && paramInt2 <= paramInt8 && paramInt5 <= paramInt3 && paramInt6 <= paramInt4);
  }
}
