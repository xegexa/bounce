package com.nokia.mid.appl.boun;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;

import javax.microedition.lcdui.Image;

public class BounceCanvas extends TileCanvas {
  private static final long serialVersionUID = 1L;

  private static final Color COLOR_TEXT_LIGHT = new Color(16777214);

  private static final Color COLOR_UI_BAR = new Color(545706);

  private static final Color COLOR_BONUS_BAR = new Color(16750611);

  public int mSplashIndex;
  
  public java.awt.Image mSplashImage;
  
  private int mSplashTimer;
  
  //public Sound mSoundHoop;
  
  //public Sound mSoundPickup;
  
  //public Sound mSoundPop;
  
  public BounceUI mUI;
  
  public Ball mBall;
  
  public int numRings;
  
  public int numLives;
  
  public int mScore;
  
  public int bonusCntrValue;
  
  public int mLevelDisCntr;
  
  public boolean mLeaveGame;
  
  public boolean mOpenExitFlag;
  
  public boolean mPaintUIFlag;
  
  public final Font TEXT_FONT = new Font("Dialog", Font.PLAIN, 11);
  
  public java.awt.Image mFullScreenBuffer;
  
  public Graphics mFullScreenGraphics = null;
  
  public boolean mClearScreenFlag;
  
  private boolean mCheat = false;
  
  public boolean mInvincible = true;

  public boolean mInvertedGravity = false;

  private int mCheatSeq = 0;
  
  private static final String[] SPLASH_NAME = new String[] { "res/icons/nokiagames.png", "res/icons/bouncesplash.png" };
  
  public boolean mIncomingCall = true;
  
  public BounceCanvas(BounceUI paramBounceUI, int paramInt) {
    super(paramBounceUI.mDisplay);
    this.mUI = paramBounceUI;
    //this.mSoundHoop = loadSound("res/sounds/up.ott");
    //this.mSoundPickup = loadSound("res/sounds/pickup.ott");
    //this.mSoundPop = loadSound("res/sounds/pop.ott");
    this.mFullScreenBuffer = Image.createImage(128, 128).buf;
    {
      Graphics g = this.mFullScreenBuffer.getGraphics();
      try {
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, 128, 96);
      } finally {
        g.dispose();
      }
    }
    this.mSplashIndex = 1;
    {
      Image splash = Image.createImage(SPLASH_NAME[this.mSplashIndex]);
      this.mSplashImage = splash != null ? splash.buf : null;
    } 
    start();
  }
  
  public void resetGame(int paramInt1, int paramInt2, int paramInt3) {
    this.mLevelNum = paramInt1;
    this.mLevelPath = null;
    this.numRings = 0;
    this.numLives = paramInt3;
    this.mScore = paramInt2;
    this.mLeaveGame = false;
    this.mOpenExitFlag = false;
    createNewLevel();
    this.mClearScreenFlag = true;
  }
  
  public void resetGame(int paramInt1, int paramInt2) {
    this.mLevelNum = this.mUI.mSavedLevel;
    this.mLevelPath = null;
    this.numRings = this.mUI.mSavedRings;
    this.numLives = this.mUI.mSavedLives;
    this.mScore = this.mUI.mSavedScore;
    disposeFullScreenGraphics();
    disposeLevel();
    if (this.mLevelPath == null) {
      loadLevel(this.mLevelNum);
    } else {
      loadLevel(this.mLevelPath);
    }
    resetTiles();
    resetSpikes();
    this.mLevelDisCntr = 120;
    this.mPaintUIFlag = true;
    if (this.mUI.mSavedRespawnX != this.mStartCol && this.mUI.mSavedRespawnY != this.mStartRow)
      this.tileMap[this.mUI.mSavedRespawnY][this.mUI.mSavedRespawnX] = (short)(0x8 | this.tileMap[this.mUI.mSavedRespawnY][this.mUI.mSavedRespawnX] & 0x40); 
    createBufferFocused(paramInt1, paramInt2, this.mUI.mSavedSize, this.mUI.mSavedXSpeed, this.mUI.mSavedYSpeed);
    synchronized (this.mBall) {
      this.mBall.setRespawn(this.mUI.mSavedRespawnX, this.mUI.mSavedRespawnY);
      this.mBall.speedBonusCntr = this.mUI.mSavedSpeedBonus;
      this.mBall.gravBonusCntr = this.mUI.mSavedGravBonus;
      this.mBall.jumpBonusCntr = this.mUI.mSavedJumpBonus;
      this.mClearScreenFlag = true;
    } 
  }
  
  private void disposeFullScreenGraphics() {
    if (this.mFullScreenGraphics != null) {
      this.mFullScreenGraphics.dispose();
      this.mFullScreenGraphics = null;
    }
  }

  void createNewLevel() {
    disposeFullScreenGraphics();
    disposeLevel();
    if (this.mLevelPath == null) {
      loadLevel(this.mLevelNum);
    } else {
      loadLevel(this.mLevelPath);
    }
    this.numRings = 0;
    this.mLevelDisCntr = 120;
    this.mPaintUIFlag = true;
    createBufferFocused(this.mStartCol * 12 + 6, this.mStartRow * 12 + 6, this.mStartBallSize, 0, 0);
    this.mBall.setRespawn(this.mStartCol, this.mStartRow);
    this.mClearScreenFlag = true;
  }
  
  public void createBufferFocused(int paramInt1, int paramInt2, int paramInt3, int paramInt4, int paramInt5) {
    this.mBall = new Ball(paramInt1, paramInt2, paramInt3, this);
    this.mBall.xSpeed = paramInt4;
    this.mBall.ySpeed = paramInt5;
    this.tileX = 0;
    this.tileY = 0;
    screenFlip();
  }
  
  public void screenFlip() {
    int i = this.mBall.xPos - 64;
    if (i < 0) {
      i = 0;
    } else if (i > this.mTileMapWidth * 12 - 156) {
      i = this.mTileMapWidth * 12 - 156;
    } 
    this.tileX = i / 12;
    this.v = this.tileX * 12 - i;
    this.divisorLine = 156;
    this.divTileX = this.tileX + 13;
    while (this.mBall.yPos - 6 < this.tileY * 12)
      this.tileY -= 7; 
    while (this.mBall.yPos + 6 > this.tileY * 12 + 96)
      this.tileY += 7; 
    createNewBuffer();
  }
  
  public void add2Score(int paramInt) {
    this.mScore += paramInt;
    this.mPaintUIFlag = true;
  }
  
  public void paint2Buffer() {
    if (this.mFullScreenGraphics == null)
      this.mFullScreenGraphics = this.mFullScreenBuffer.getGraphics(); 
    this.mFullScreenGraphics.setClip(0, 0, 128, 96);
    if (this.mGameBuffer != null) {
      cleanBuffer();
      if (this.v <= 0) {
        this.mFullScreenGraphics.drawImage(this.mGameBuffer, this.v, 0, null);
      } else {
        this.mFullScreenGraphics.drawImage(this.mGameBuffer, this.v, 0, null);
        this.mFullScreenGraphics.drawImage(this.mGameBuffer, this.v - 156, 0, null);
      } 
    } 
    createMovingObj(this.mFullScreenGraphics, this.v);
    drawTileMap(this.mFullScreenGraphics, this.mBall.xPos, this.mBall.yPos, this.mBall.mHalfBallSize, this.v);
    this.mFullScreenGraphics.setClip(0, 0, 128, 128);
    if (this.mLevelDisCntr != 0) {
      drawStringCrisp(this.mFullScreenGraphics, this.mLevelNumStr, 10, 20, COLOR_TEXT_LIGHT, this.TEXT_FONT);
    }
    if (this.mPaintUIFlag) {
      this.mFullScreenGraphics.setColor(COLOR_UI_BAR);
      this.mFullScreenGraphics.fillRect(0, 96, 128, 32);
      for (int b1 = 0; b1 < this.numLives; b1++)
        this.mFullScreenGraphics.drawImage(this.mUILife, 5 + b1 * (this.mUILife.getWidth(null) - 1), 97, null); 
      for (int b2 = 0; b2 < this.mTotalNumRings - this.numRings; b2++)
        this.mFullScreenGraphics.drawImage(this.mUIRing, 5 + b2 * (this.mUIRing.getWidth(null) - 4), 110, null); 
      drawStringCrisp(this.mFullScreenGraphics, zeroString(this.mScore), 64, 106, COLOR_TEXT_LIGHT, this.TEXT_FONT);
      if (this.bonusCntrValue != 0) {
        this.mFullScreenGraphics.setColor(COLOR_BONUS_BAR);
        this.mFullScreenGraphics.fillRect(1, 128 - 3 * this.bonusCntrValue / 30, 5, 128);
      } 
      this.mPaintUIFlag = false;
    } 
  }
  
  public void paint(Graphics paramGraphics) {
    int w = this.mUI.mDisplay.getWidth();
    int h = this.mUI.mDisplay.getHeight() - BounceConst.FRAME_MENU_BAR_HEIGHT;
    if (this.mSplashIndex != -1) {
      if (this.mSplashImage != null) {
        paramGraphics.setColor(Color.BLACK);
        paramGraphics.fillRect(0, 0, w, h);
        paramGraphics.drawImage(this.mSplashImage, 0, 0, w, h, null);
      } 
    } else {
      paramGraphics.drawImage(this.mFullScreenBuffer, 0, 0, w, h, null);
    } 
  }
  
  public void createMovingObj(Graphics paramGraphics, int paramInt) {
    if (this.mBall == null)
      return; 
    int i = this.mBall.xPos - this.tileX * 12;
    int j = this.mBall.yPos - this.tileY * 12;
    if (this.mBall.ballState == 2) {
      paramGraphics.drawImage(this.mBall.poppedImage, i - 6 + paramInt, j - 6, null);
    } else {
      paramGraphics.drawImage(this.mBall.mBallImage, i - this.mBall.mHalfBallSize + paramInt, j - this.mBall.mHalfBallSize, null);
    } 
  }
  
  public void run() {
    if (this.mSplashIndex != -1) {
      if (this.mSplashImage == null || this.mSplashImage == null) {
        this.mIncomingCall = false;
      } else if (this.mSplashTimer > BounceConst.SPLASH_TIMER_DELAY) {
        this.mSplashImage = null;
        if (!Boolean.parseBoolean(System.getProperty("midp.web", "false"))) {
          Runtime.getRuntime().gc();
        }
        switch (this.mSplashIndex) {
          case 0:
            this.mSplashIndex = 1;
            {
              Image splash = Image.createImage(SPLASH_NAME[this.mSplashIndex]);
              this.mSplashImage = splash != null ? splash.buf : null;
            }
            repaint();
            break;
          case 1:
            this.mSplashIndex = -1;
            this.mIncomingCall = false;
            break;
        } 
        this.mSplashTimer = 0;
      } else {
        this.mSplashTimer++;
      } 
      repaint();
      return;
    } 
    if (this.mLevelDisCntr != 0)
      this.mLevelDisCntr--; 
    synchronized (this.mBall) {
      if (this.mBall.yPos - 6 < this.tileY * 12 || this.mBall.yPos + 6 > this.tileY * 12 + 96) {
        screenFlip();
      } else {
        this.mBall.update();
      } 
      if (this.mBall.ballState == 1) {
        if (this.numLives < 0) {
          this.mUI.checkData();
          stop();
          this.mUI.gameOver(false);
          return;
        } 
        int i = this.mBall.respawnX;
        int j = this.mBall.respawnY;
        int k = this.mBall.respawnSize;
        createBufferFocused(this.mBall.respawnX * 12 + 6, this.mBall.respawnY * 12 + 6, this.mBall.respawnSize, 0, 0);
        this.mBall.respawnX = i;
        this.mBall.respawnY = j;
        this.mBall.respawnSize = k;
      } 
      if (this.mNumMoveObj != 0)
        updateMovingSpikeObj(); 
      if (this.numRings == this.mTotalNumRings)
        this.mOpenExitFlag = true; 
      if (this.mOpenExitFlag && this.scrollFlag && (this.mExitPosX + 1) * 12 > m() && this.mExitPosX * 12 < g()) {
        if (this.mOpenFlag) {
          this.scrollFlag = false;
          this.mOpenExitFlag = false;
        } else {
          openExit();
        } 
        this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol] = (short)(this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol] | 0x80);
        this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol + 1] = (short)(this.tileMap[this.mTopLeftExitTileRow][this.mTopLeftExitTileCol + 1] | 0x80);
        this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol] = (short)(this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol] | 0x80);
        this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol + 1] = (short)(this.tileMap[this.mTopLeftExitTileRow + 1][this.mTopLeftExitTileCol + 1] | 0x80);
      } 
      this.bonusCntrValue = 0;
      if (this.mBall.speedBonusCntr != 0 || this.mBall.gravBonusCntr != 0 || this.mBall.jumpBonusCntr != 0) {
        if (this.mBall.speedBonusCntr > this.bonusCntrValue)
          this.bonusCntrValue = this.mBall.speedBonusCntr; 
        if (this.mBall.gravBonusCntr > this.bonusCntrValue)
          this.bonusCntrValue = this.mBall.gravBonusCntr; 
        if (this.mBall.jumpBonusCntr > this.bonusCntrValue)
          this.bonusCntrValue = this.mBall.jumpBonusCntr; 
        if (this.bonusCntrValue % 30 == 0 || this.bonusCntrValue == 1)
          this.mPaintUIFlag = true; 
      } 
    } 
    scrollBuffer(this.mBall.xPos);
    paint2Buffer();
    repaint();
    if (this.mLeaveGame) {
      this.mLeaveGame = false;
      this.mOpenExitFlag = false;
      this.mLevelNum = 1 + this.mLevelNum;
      this.mLevelPath = null;
      add2Score(5000);
      this.mUI.checkData();
      if (this.mLevelNum > 11) {
        //this.mUI.gameOver(true);
      } else {
        this.mIncomingCall = false;
        //this.mUI.displayLevelComplete();
      }
      createNewLevel();
      repaint();
    } 
  }
  
  public void keyPressed(KeyEvent event) {
    if (this.mSplashIndex != -1) {
      this.mSplashTimer = BounceConst.SPLASH_TIMER_DELAY + 1;
      return;
    } 
    if (this.mBall == null)
      return; 
    synchronized (this.mBall) {
      switch (event.getKeyCode()) {
        case 49:
          if (this.mCheat && --this.mLevelNum < 1)
            this.mLevelNum = 11; 
          this.mLevelPath = null;
          createNewLevel();
          break;
        case 51:
          if (this.mCheat && ++this.mLevelNum > 11)
            this.mLevelNum = 1; 
          this.mLevelPath = null;
          createNewLevel();
          break;
        case 55:
          if (this.mCheatSeq == 0 || this.mCheatSeq == 2) {
            this.mCheatSeq++;
            break;
          } 
          this.mCheatSeq = 0;
          break;
        case 56:
          if (this.mCheatSeq == 1 || this.mCheatSeq == 3) {
            this.mCheatSeq++;
            break;
          } 
          if (this.mCheatSeq == 5) {
            //this.mSoundHoop.play(1);
            this.mInvincible = true;
            this.mCheatSeq = 0;
            break;
          } 
          this.mCheatSeq = 0;
          break;
        case 57:
          if (this.mCheatSeq == 4) {
            this.mCheatSeq++;
            break;
          } 
          if (this.mCheatSeq == 5) {
            //this.mSoundPop.play(1);
            this.mCheat = true;
            this.mCheatSeq = 0;
            break;
          } 
          this.mCheatSeq = 0;
          break;
        case 35:
          if (this.mCheat)
            this.mBall.gravBonusCntr = 300; 
          break;
        case -7:
        case -6:
          this.mIncomingCall = false;
          //this.mUI.displayMainMenu();
          break;
        case KeyEvent.VK_UP:
        case KeyEvent.VK_W:
          this.mBall.setDirection(8);
          break;
        case KeyEvent.VK_DOWN:
        case KeyEvent.VK_S:
          this.mBall.setDirection(4);
          break;
        case KeyEvent.VK_LEFT:
        case KeyEvent.VK_A:
          this.mBall.setDirection(1);
          break;
        case KeyEvent.VK_RIGHT:
        case KeyEvent.VK_D:
          this.mBall.setDirection(2);
          break;
      } 
    } 
  }
  
  public void keyReleased(KeyEvent event) {
    if (this.mBall == null)
      return; 
    synchronized (this.mBall) {
      switch (event.getKeyCode()) {
        case KeyEvent.VK_UP:
        case KeyEvent.VK_W:
          this.mBall.releaseDirection(8);
          break;
        case KeyEvent.VK_DOWN:
        case KeyEvent.VK_S:
          this.mBall.releaseDirection(4);
          break;
        case KeyEvent.VK_LEFT:
        case KeyEvent.VK_A:
          this.mBall.releaseDirection(1);
          break;
        case KeyEvent.VK_RIGHT:
        case KeyEvent.VK_D:
          this.mBall.releaseDirection(2);
          break;
      } 
    } 
  }

  public void keyTyped(KeyEvent event) {}
  
  public static String zeroString(int paramInt) {
    String str;
    if (paramInt < 100) {
      str = "0000000";
    } else if (paramInt < 1000) {
      str = "00000";
    } else if (paramInt < 10000) {
      str = "0000";
    } else if (paramInt < 100000) {
      str = "000";
    } else if (paramInt < 1000000) {
      str = "00";
    } else if (paramInt < 10000000) {
      str = "0";
    } else {
      str = "";
    } 
    return str + paramInt;
  }
  
  /*protected Sound loadSound(String paramString) {
    byte[] arrayOfByte = new byte[100];
    Sound sound = null;
    DataInputStream dataInputStream = new DataInputStream(getClass().getResourceAsStream(paramString));
    try {
      int i = dataInputStream.read(arrayOfByte);
      dataInputStream.close();
      byte[] arrayOfByte1 = new byte[i];
      System.arraycopy(arrayOfByte, 0, arrayOfByte1, 0, i);
      sound = new Sound(arrayOfByte1, 1);
    } catch (IOException e) {
      sound = new Sound(1000, 500L);
      sound.play(3);
    } 
    return sound;
  }*/
  
  public void hideNotify() {
    if (this.mIncomingCall) {
      if (this.mBall != null)
        this.mBall.resetDirections(); 
      //this.mUI.displayMainMenu();
    } 
    this.mIncomingCall = true;
  }
  
  public void resetSpikes() {
    for (int b1 = 0; b1 < this.mUI.mSavedSpikeCount; b1++) {
      this.mMODirection[b1][0] = this.mUI.mSavedSpikeDirection[b1][0];
      this.mMODirection[b1][1] = this.mUI.mSavedSpikeDirection[b1][1];
      this.mMOOffset[b1][0] = this.mUI.mSavedSpikeOffset[b1][0];
      this.mMOOffset[b1][1] = this.mUI.mSavedSpikeOffset[b1][1];
    } 
    this.mUI.mSavedSpikeOffset = null;
    this.mUI.mSavedSpikeDirection = null;
    this.mUI.mSavedSpikeCount = 0;
  }
  
  public void resetTiles() {
    for (int b1 = 0; b1 < this.mTileMapHeight; b1++) {
      for (int b2 = 0; b2 < this.mTileMapWidth; b2++) {
        int b3 = this.tileMap[b1][b2] & 0xFF7F & 0xFFFFFFBF;
        switch (b3) {
          case 7:
          case 29:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x0 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 13:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x11 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 14:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x12 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 21:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x19 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 22:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x1A | this.tileMap[b1][b2] & 0x40); 
            break;
          case 15:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x13 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 16:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x14 | this.tileMap[b1][b2] & 0x40); 
            break;
          case 23:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x1B | this.tileMap[b1][b2] & 0x40); 
            break;
          case 24:
            if (shouldResetTileForLoad(b1, b2))
              this.tileMap[b1][b2] = (short)(0x1C | this.tileMap[b1][b2] & 0x40); 
            break;
        } 
      } 
    } 
    this.mUI.mSavedTiles = null;
    this.mUI.mSavedTileCount = 0;
  }
  
  /** @return true if this map cell is not listed in the save-game tile snapshot. */
  private boolean shouldResetTileForLoad(int paramInt1, int paramInt2) {
    for (int b1 = 0; b1 < this.mUI.mSavedTileCount; b1++) {
      if (this.mUI.mSavedTiles[b1][0] == paramInt1 && this.mUI.mSavedTiles[b1][1] == paramInt2)
        return false; 
    } 
    return true;
  }

  private void drawStringCrisp(Graphics g, String s, int x, int y, Color c, Font f) {
    if (s == null || s.length() == 0) return;
    FontMetrics fm = g.getFontMetrics(f);
    int w = fm.stringWidth(s);
    int ascent = fm.getAscent();
    int h = fm.getHeight();
    if (w <= 0 || h <= 0) return;

    BufferedImage img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g2 = img.createGraphics();
    g2.setFont(f);
    g2.setColor(Color.WHITE);
    g2.drawString(s, 0, ascent);
    g2.dispose();

    int rgb = c.getRGB() & 0x00FFFFFF;
    for (int py = 0; py < h; py++) {
      for (int px = 0; px < w; px++) {
        int a = (img.getRGB(px, py) >>> 24) & 0xFF;
        img.setRGB(px, py, a >= 128 ? (0xFF000000 | rgb) : 0);
      }
    }
    g.drawImage(img, x, y - ascent, null);
  }
}
