package com.nokia.mid.appl.boun;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import javax.microedition.lcdui.Image;
import javax.swing.JFrame;
import javax.swing.JPanel;

public abstract class TileCanvas extends JPanel implements KeyListener {
  private static final long serialVersionUID = 1L;

  private static final int GAME_BUF_W = 156;

  private static final int GAME_BUF_H = 96;

  private static final Color TILE_FILL_DIM = new Color(1073328);

  private static final Color TILE_FILL_NORMAL = new Color(11591920);

  protected int tileX;
  
  protected int tileY;
  
  protected int divTileX;
  
  protected int divisorLine;
  
  protected int v;
  
  protected boolean scrollFlag;
  
  protected java.awt.Image mGameBuffer;

  private Graphics mGameBufferGraphics;
  
  private java.awt.Image[] tileImages;

  private java.awt.Image mTile50Rot3;

  private java.awt.Image mTile50Rot4;

  private java.awt.Image mTile50Rot5;

  private java.awt.Image mTile51Rot3;

  private java.awt.Image mTile51Rot4;

  private java.awt.Image mTile51Rot5;

  private java.awt.Image mTile52Rot3;

  private java.awt.Image mTile52Rot4;

  private java.awt.Image mTile52Rot5;

  private java.awt.Image mTile54Rot3;

  private java.awt.Image mTile54Rot4;

  private java.awt.Image mTile54Rot5;
  
  private Graphics mExitTileGraphics;
  
  private java.awt.Image tmpTileImage;
  
  private Graphics tmpTileImageG;
  
  public int mLevelNum = -1;

  public String mLevelPath;
  
  public String mLevelNumStr;
  
  public String mLevelCompletedStr;
  
  protected int mStartCol;
  
  protected int mStartRow;
  
  public int mStartBallSize;
  
  protected int mExitPosX;
  
  protected int mExitPosY;
  
  public short[][] tileMap;
  
  public int mTileMapWidth;
  
  public int mTileMapHeight;
  
  public int mTotalNumRings;
  
  public int mNumMoveObj;
  
  public short[][] mMOTopLeft;
  
  public short[][] mMOBotRight;
  
  public short[][] mMODirection;
  
  public short[][] mMOOffset;
  
  public java.awt.Image[] mMOImgPtr;
  
  public Graphics[] mMOImgGraphics;
  
  public java.awt.Image mSpikeImgPtr;

  public java.awt.Image mUILife;

  public java.awt.Image mUIRing;
  
  public int mTopLeftExitTileCol;
  
  public int mTopLeftExitTileRow;
  
  public java.awt.Image mExitTileImage;

  public java.awt.Image mImgPtr;
  
  public int mImageOffset;
  
  public boolean mOpenFlag;
  
  protected int mWidth = 0;
  
  protected int mHeight = 0;
  
  protected JFrame mDisplay;
  
  protected javax.swing.Timer mGameTimer = null;
  
  public TileCanvas(JFrame paramDisplay) {
    this.mDisplay = paramDisplay;
    if (Boolean.parseBoolean(System.getProperty("midp.web", "false"))) {
      setDoubleBuffered(false);
    }
    this.mWidth = getWidth();
    this.mHeight = getHeight();
    this.v = 0;
    this.divisorLine = 156;
    this.mGameBuffer = Image.createImage(GAME_BUF_W, GAME_BUF_H).buf;
    this.mGameBufferGraphics = this.mGameBuffer.getGraphics();
    // Opaque base so the ARGB buffer composites like the old INT_RGB (black) default.
    this.mGameBufferGraphics.setColor(Color.BLACK);
    this.mGameBufferGraphics.fillRect(0, 0, GAME_BUF_W, GAME_BUF_H);
    this.tmpTileImage = Image.createImage(12, 12).buf;
    this.tmpTileImageG = this.tmpTileImage.getGraphics();
    loadTileImages();
    this.tileX = 0;
    this.tileY = 0;
    this.scrollFlag = false;
    this.divTileX = this.tileX + 13;
    this.tileMap = null;
  }

  public void loadLevel(int levelNum) {
    String str = "";
    if (levelNum < 10) {
      str = "00" + levelNum;
    } else if (levelNum < 100) {
      str = "0" + levelNum;
    }
    loadLevel("res/levels/J2MElvl." + str);
  }
  
  private static InputStream openLevelInputStream(String filePath) throws IOException {
    File f = new File(filePath);
    if (f.isFile()) {
      return new FileInputStream(f);
    }
    if (!f.isAbsolute()) {
      File cwd = new File(System.getProperty("user.dir", "."));
      File[] devTry = new File[] {
          new File(cwd, filePath.replace('\\', '/')),
          new File(cwd, "src/" + filePath.replace('\\', '/')),
          new File(cwd, "bin/" + filePath.replace('\\', '/')),
      };
      for (File t : devTry) {
        if (t.isFile()) {
          return new FileInputStream(t);
        }
      }
    }
    String normalized = filePath.replace('\\', '/');
    while (normalized.startsWith("/")) {
      normalized = normalized.substring(1);
    }
    String absoluteResource = "/" + normalized;
    InputStream in = TileCanvas.class.getResourceAsStream(absoluteResource);
    if (in != null) {
      return in;
    }
    ClassLoader cl = TileCanvas.class.getClassLoader();
    if (cl != null) {
      in = cl.getResourceAsStream(normalized);
      if (in != null) {
        return in;
      }
    }
    cl = Thread.currentThread().getContextClassLoader();
    if (cl != null) {
      in = cl.getResourceAsStream(normalized);
      if (in != null) {
        return in;
      }
    }
    in = ClassLoader.getSystemResourceAsStream(normalized);
    if (in != null) {
      return in;
    }
    throw new IOException("Level not found: " + filePath);
  }

  public void loadLevel(String filePath) {
    String[] arrayOfString = new String[1];
    arrayOfString[0] = (Integer.valueOf(this.mLevelNum)).toString();
    if (this.mLevelPath == null) {
      this.mLevelNumStr = Local.getText(9, arrayOfString);
    } else {
      this.mLevelNumStr = "Load map: " + Paths.get(this.mLevelPath).getFileName().toString();
    }
    this.mLevelCompletedStr = Local.getText(10, arrayOfString);
    arrayOfString[0] = null;
    arrayOfString = null;
    System.out.println("Load level: " + filePath);
    try (
      InputStream inputStream = openLevelInputStream(filePath);
      DataInputStream dataInputStream = new DataInputStream(inputStream);
    ) {
      this.mStartCol = dataInputStream.read();
      this.mStartRow = dataInputStream.read();
      int i = dataInputStream.read();
      if (i == 0) {
        this.mStartBallSize = 12;
      } else {
        this.mStartBallSize = 16;
      }
      this.mExitPosX = dataInputStream.read();
      this.mExitPosY = dataInputStream.read();
      createExitTileObject(this.mExitPosX, this.mExitPosY, this.tileImages[12]);
      this.mTotalNumRings = dataInputStream.read();
      int mapW = dataInputStream.read();
      int mapH = dataInputStream.read();
      short[][] map = new short[mapH][mapW];
      for (int b1 = 0; b1 < mapH; b1++) {
        for (int b2 = 0; b2 < mapW; b2++) {
          map[b1][b2] = (short)dataInputStream.read();
        }
      }
      this.mTileMapWidth = mapW;
      this.mTileMapHeight = mapH;
      this.tileMap = map;
      this.mNumMoveObj = dataInputStream.read();
      if (this.mNumMoveObj != 0) {
        createMovingObj(dataInputStream);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  /**
   * Horizontal / vertical / both flips. Uses translate+scale so browser (SwingJS) rendering matches
   * desktop; {@code drawImage(..., negative width/height)} is unreliable in JS canvas backends.
   */
  public static void flipImage(Graphics2D graphics, java.awt.Image paramImage, int x, int y, int mode) {
    int width = paramImage.getWidth(null);
    int height = paramImage.getHeight(null);
    AffineTransform saved = graphics.getTransform();
    try {
      switch (mode) {
        case 0:
          graphics.translate(x + width, y);
          graphics.scale(-1, 1);
          break;
        case 1:
          graphics.translate(x, y + height);
          graphics.scale(1, -1);
          break;
        case 2:
          graphics.translate(x + width, y + height);
          graphics.scale(-1, -1);
          break;
      }
      graphics.drawImage(paramImage, 0, 0, null);
    } finally {
      graphics.setTransform(saved);
    }
  }

  /**
   * CCW rotation matching Nokia / {@link com.nokia.mid.ui.DirectGraphics}: positive {@code degrees}
   * are CCW in screen space; Java2D uses clockwise positive rotation in y-down coords, hence
   * {@code -}{@link Math#toRadians(double)}. Applies transforms on the Graphics2D stack instead of
   * {@link Graphics2D#drawImage(java.awt.Image, java.awt.geom.AffineTransform, java.awt.image.ImageObserver)}
   * which SwingJS often implements incorrectly.
   */
  public static void rotateImage(Graphics2D graphics, java.awt.Image paramImage, int degrees) {
    int width = paramImage.getWidth(null);
    int height = paramImage.getHeight(null);
    AffineTransform saved = graphics.getTransform();
    try {
      graphics.translate(width / 2.0, height / 2.0);
      graphics.rotate(-Math.toRadians(degrees));
      graphics.translate(-width / 2.0, -height / 2.0);
      graphics.drawImage(paramImage, 0, 0, null);
    } finally {
      graphics.setTransform(saved);
    }
  }
  
  public static java.awt.Image manipulateImage(java.awt.Image paramImage, int paramInt) {
    int width = paramImage.getWidth(null);
    int height = paramImage.getHeight(null);
    BufferedImage image = Image.createImage(width, height).buf;
    Graphics2D graphics = image.createGraphics();
    try {
      graphics.setRenderingHint(
          RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
      graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_SPEED);
      graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_OFF);
      switch (paramInt) {
        case 0: // FLIP_HORIZONTAL
          flipImage(graphics, paramImage, 0, 0, 0);
          return image;
        case 1: // FLIP_VERTICAL
          flipImage(graphics, paramImage, 0, 0, 1);
          return image;
        case 2: // ??? FLIP_HORIZONTAL_AND_VERTICAL
          flipImage(graphics, paramImage, 0, 0, 2);
          return image;
        case 3: // ROTATE_90
          rotateImage(graphics, paramImage, 90);
          return image;
        case 4: // ROTATE_180
          rotateImage(graphics, paramImage, 180);
          return image;
        case 5: // ROTATE_270
          rotateImage(graphics, paramImage, 270);
          return image;
      }
      graphics.drawImage(paramImage, 0, 0, null);
      return image;
    } finally {
      graphics.dispose();
    }
  }
  
  public void createMovingObj(DataInputStream paramDataInputStream) throws IOException {
    this.mMOTopLeft = new short[this.mNumMoveObj][2];
    this.mMOBotRight = new short[this.mNumMoveObj][2];
    this.mMODirection = new short[this.mNumMoveObj][2];
    this.mMOOffset = new short[this.mNumMoveObj][2];
    this.mMOImgPtr = new java.awt.Image[this.mNumMoveObj];
    this.mMOImgGraphics = new Graphics[this.mNumMoveObj];
    for (int b1 = 0; b1 < this.mNumMoveObj; b1++) {
      this.mMOTopLeft[b1][0] = (short)paramDataInputStream.read();
      this.mMOTopLeft[b1][1] = (short)paramDataInputStream.read();
      this.mMOBotRight[b1][0] = (short)paramDataInputStream.read();
      this.mMOBotRight[b1][1] = (short)paramDataInputStream.read();
      this.mMODirection[b1][0] = (short)paramDataInputStream.read();
      this.mMODirection[b1][1] = (short)paramDataInputStream.read();
      int i = paramDataInputStream.read();
      int j = paramDataInputStream.read();
      this.mMOOffset[b1][0] = (short)i;
      this.mMOOffset[b1][1] = (short)j;
    } 
    this.mSpikeImgPtr = Image.createImage(24, 24).buf;
    Graphics graphics = this.mSpikeImgPtr.getGraphics();
    try {
      graphics.drawImage(this.tileImages[46], 0, 0, null);
      graphics.drawImage(manipulateImage(this.tileImages[46], 0), 12, 0, null);
      graphics.drawImage(manipulateImage(this.tileImages[46], 4), 12, 12, null);
      graphics.drawImage(manipulateImage(this.tileImages[46], 1), 0, 12, null);
    } finally {
      graphics.dispose();
    }
  }
  
  public void disposeLevel() {
    if (this.mExitTileGraphics != null) {
      this.mExitTileGraphics.dispose();
      this.mExitTileGraphics = null;
    }
    if (this.mMOImgPtr != null) {
      for (int b1 = 0; b1 < this.mNumMoveObj; b1++) {
        this.mMOImgPtr[b1] = null;
        this.mMOImgGraphics[b1] = null;
      }
    }
    this.mMOImgPtr = null;
    this.mMOImgGraphics = null;
    this.mMOTopLeft = null;
    this.mMOBotRight = null;
    this.mMODirection = null;
    this.mMOOffset = null;
    this.mNumMoveObj = 0;
    // Do not clear tileMap here: on failed load we keep the previous map so the game loop does not
    // NPE (which stops the Swing timer / freezes the web build). loadLevel replaces tileMap after a
    // full successful parse.
    if (!Boolean.parseBoolean(System.getProperty("midp.web", "false"))) {
      Runtime.getRuntime().gc();
    }
  }
  
  public void updateMovingSpikeObj() {
    if (this.tileMap == null || this.mMOTopLeft == null) {
      return;
    }
    for (int b1 = 0; b1 < this.mNumMoveObj; b1++) {
      short s1 = this.mMOTopLeft[b1][0];
      short s2 = this.mMOTopLeft[b1][1];
      short s3 = this.mMOOffset[b1][0];
      short s4 = this.mMOOffset[b1][1];
      this.mMOOffset[b1][0] = (short)(this.mMOOffset[b1][0] + this.mMODirection[b1][0]);
      int n = (this.mMOBotRight[b1][0] - s1 - 2) * 12;
      int i1 = (this.mMOBotRight[b1][1] - s2 - 2) * 12;
      if (this.mMOOffset[b1][0] < 0) {
        this.mMOOffset[b1][0] = 0;
      } else if (this.mMOOffset[b1][0] > n) {
        this.mMOOffset[b1][0] = (short)n;
      } 
      if (this.mMOOffset[b1][0] == 0 || this.mMOOffset[b1][0] == n)
        this.mMODirection[b1][0] = (short)-this.mMODirection[b1][0]; 
      this.mMOOffset[b1][1] = (short)(this.mMOOffset[b1][1] + this.mMODirection[b1][1]);
      if (this.mMOOffset[b1][1] < 0) {
        this.mMOOffset[b1][1] = 0;
      } else if (this.mMOOffset[b1][1] > i1) {
        this.mMOOffset[b1][1] = (short)i1;
      } 
      if (this.mMOOffset[b1][1] == 0 || this.mMOOffset[b1][1] == i1)
        this.mMODirection[b1][1] = (short)(this.mMODirection[b1][1] * -1); 
      short s5 = this.mMOOffset[b1][0];
      short s6 = this.mMOOffset[b1][1];
      if (s5 < s3) {
        short s = s5;
        s5 = s3;
        s3 = s;
      } 
      if (s6 < s4) {
        short s = s6;
        s6 = s4;
        s4 = s;
      } 
      s5 += 23;
      s6 += 23;
      int i = s3 / 12;
      int j = s4 / 12;
      int k = s5 / 12 + 1;
      int m = s6 / 12 + 1;
      for (int i2 = i; i2 < k; i2++) {
        for (int i3 = j; i3 < m; i3++)
          this.tileMap[s2 + i3][s1 + i2] = (short)(this.tileMap[s2 + i3][s1 + i2] | 0x80); 
      } 
    } 
  }
  
  public int findSpikeIndex(int paramInt1, int paramInt2) {
    for (int b1 = 0; b1 < this.mNumMoveObj; b1++) {
      if (this.mMOTopLeft[b1][0] <= paramInt1 && this.mMOBotRight[b1][0] > paramInt1 && this.mMOTopLeft[b1][1] <= paramInt2 && this.mMOBotRight[b1][1] > paramInt2)
        return b1; 
    } 
    return -1;
  }
  
  public void drawTile(int paramInt1, int paramInt2, int paramInt3, int paramInt4) {
    int j;
    int k;
    Graphics graphics = this.mGameBufferGraphics;
    if (this.tileMap == null) {
      return;
    }
    if (paramInt1 < 0 || paramInt2 < 0 || paramInt1 >= this.mTileMapWidth || paramInt2 >= this.mTileMapHeight) {
      graphics.drawImage(this.tileImages[0], paramInt3, paramInt4, null);
      return;
    } 
    this.tileMap[paramInt2][paramInt1] = (short)(this.tileMap[paramInt2][paramInt1] & 0xFF7F);
    int i = this.tileMap[paramInt2][paramInt1];
    boolean bool = ((i & 0x40) != 0) ? true : false;
    if (bool)
      i = i & 0xFFFFFFBF; 
    graphics.setColor(bool ? TILE_FILL_DIM : TILE_FILL_NORMAL);
    switch (i) {
      case 1:
        graphics.drawImage(this.tileImages[0], paramInt3, paramInt4, null);
        break;
      case 0:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        break;
      case 2:
        graphics.drawImage(this.tileImages[1], paramInt3, paramInt4, null);
        break;
      case 3:
        if (bool) {
          graphics.drawImage(this.tileImages[6], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[2], paramInt3, paramInt4, null);
        break;
      case 4:
        if (bool) {
          graphics.drawImage(this.tileImages[9], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[5], paramInt3, paramInt4, null);
        break;
      case 5:
        if (bool) {
          graphics.drawImage(this.tileImages[7], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[3], paramInt3, paramInt4, null);
        break;
      case 6:
        if (bool) {
          graphics.drawImage(this.tileImages[8], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[4], paramInt3, paramInt4, null);
        break;
      case 7:
        graphics.drawImage(this.tileImages[10], paramInt3, paramInt4, null);
        break;
      case 8:
        graphics.drawImage(this.tileImages[11], paramInt3, paramInt4, null);
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
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[d.a[i - 13]], paramInt3, paramInt4, null);
        graphics.drawImage(this.tileImages[d.b[i - 13]], paramInt3, paramInt4, null);
        break;
      case 9:
        j = (paramInt1 - this.mTopLeftExitTileCol) * 12;
        k = (paramInt2 - this.mTopLeftExitTileRow) * 12;
        graphics.setClip(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mExitTileImage, paramInt3 - j, paramInt4 - k, null);
        graphics.setClip(0, 0, GAME_BUF_W, GAME_BUF_H);
        this.scrollFlag = true;
        break;
      case 10:
        j = findSpikeIndex(paramInt1, paramInt2);
        if (j != -1) {
          k = (paramInt1 - this.mMOTopLeft[j][0]) * 12;
          int m = (paramInt2 - this.mMOTopLeft[j][1]) * 12;
          int n = this.mMOOffset[j][0] - k;
          int i1 = this.mMOOffset[j][1] - m;
          if ((n > -36 && n < 12) || (i1 > -36 && i1 < 12)) {
            this.tmpTileImageG.setColor(TILE_FILL_NORMAL);
            this.tmpTileImageG.fillRect(0, 0, 12, 12);
            this.tmpTileImageG.drawImage(this.mSpikeImgPtr, n, i1, null);
            graphics.drawImage(this.tmpTileImage, paramInt3, paramInt4, null);
            break;
          } 
          graphics.setColor(TILE_FILL_NORMAL);
          graphics.fillRect(paramInt3, paramInt4, 12, 12);
        } 
        break;
      case 29:
        graphics.drawImage(this.tileImages[45], paramInt3, paramInt4, null);
        break;
      case 30:
        if (bool) {
          graphics.drawImage(this.tileImages[61], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[57], paramInt3, paramInt4, null);
        break;
      case 31:
        if (bool) {
          graphics.drawImage(this.tileImages[60], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[56], paramInt3, paramInt4, null);
        break;
      case 32:
        if (bool) {
          graphics.drawImage(this.tileImages[59], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[55], paramInt3, paramInt4, null);
        break;
      case 33:
        if (bool) {
          graphics.drawImage(this.tileImages[62], paramInt3, paramInt4, null);
          break;
        } 
        graphics.drawImage(this.tileImages[58], paramInt3, paramInt4, null);
        break;
      case 34:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[65], paramInt3, paramInt4, null);
        break;
      case 35:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[64], paramInt3, paramInt4, null);
        break;
      case 36:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[63], paramInt3, paramInt4, null);
        break;
      case 37:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[66], paramInt3, paramInt4, null);
        break;
      case 39:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[50], paramInt3, paramInt4, null);
        break;
      case 40:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile50Rot5, paramInt3, paramInt4, null);
        break;
      case 41:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile50Rot4, paramInt3, paramInt4, null);
        break;
      case 42:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile50Rot3, paramInt3, paramInt4, null);
        break;
      case 43:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.tileImages[51], paramInt3, paramInt4, null);
        break;
      case 44:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile51Rot5, paramInt3, paramInt4, null);
        break;
      case 45:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile51Rot4, paramInt3, paramInt4, null);
        break;
      case 46:
        graphics.fillRect(paramInt3, paramInt4, 12, 12);
        graphics.drawImage(this.mTile51Rot3, paramInt3, paramInt4, null);
        break;
      case 47:
        graphics.drawImage(this.tileImages[52], paramInt3, paramInt4, null);
        break;
      case 48:
        graphics.drawImage(this.mTile52Rot5, paramInt3, paramInt4, null);
        break;
      case 49:
        graphics.drawImage(this.mTile52Rot4, paramInt3, paramInt4, null);
        break;
      case 50:
        graphics.drawImage(this.mTile52Rot3, paramInt3, paramInt4, null);
        break;
      case 38:
        graphics.drawImage(this.tileImages[53], paramInt3, paramInt4, null);
        break;
      case 51:
        graphics.drawImage(this.tileImages[54], paramInt3, paramInt4, null);
        break;
      case 52:
        graphics.drawImage(this.mTile54Rot5, paramInt3, paramInt4, null);
        break;
      case 53:
        graphics.drawImage(this.mTile54Rot4, paramInt3, paramInt4, null);
        break;
      case 54:
        graphics.drawImage(this.mTile54Rot3, paramInt3, paramInt4, null);
        break;
    } 
  }
  
  public void drawTileMap(Graphics paramGraphics, int paramInt1, int paramInt2, int paramInt3, int paramInt4) {
    if (this.tileMap == null) {
      return;
    }
    int i = (paramInt1 - paramInt3) / 12;
    int j = (paramInt2 - paramInt3) / 12;
    int k = (paramInt1 + paramInt3 - 1) / 12 + 1;
    int m = (paramInt2 + paramInt3 - 1) / 12 + 1;
    if (i < 0)
      i = 0; 
    if (j < 0)
      j = 0; 
    if (k > this.mTileMapWidth)
      k = this.mTileMapWidth; 
    if (m > this.mTileMapHeight)
      m = this.mTileMapHeight; 
    for (int n = i; n < k; n++) {
      for (int i1 = j; i1 < m; i1++) {
        int i2 = this.tileMap[i1][n] & 0xFFFFFFBF;
        if (i2 >= 13 && i2 <= 28) {
          int i3 = (n - this.tileX) * 12 + paramInt4;
          int i4 = (i1 - this.tileY) * 12;
          paramGraphics.drawImage(this.tileImages[d.b[i2 - 13]], i3, i4, null);
        } 
      } 
    } 
  }
  
  public void createNewBuffer() {
    if (this.tileMap == null) {
      return;
    }
    for (int b1 = 0; b1 < 13; b1++) {
      for (int b2 = 0; b2 < 8; b2++)
        drawTile(this.tileX + b1, this.tileY + b2, b1 * 12, b2 * 12); 
    } 
  }
  
  public void cleanBuffer() {
    if (this.tileMap == null) {
      return;
    }
    int i = this.tileX;
    int j = this.tileY;
    for (int b1 = 0; b1 < 13; b1++) {
      if (b1 * 12 >= this.divisorLine && i >= this.tileX)
        i = this.divTileX - 13; 
      for (int b2 = 0; b2 < 8; b2++) {
        if (i < this.mTileMapWidth && j < this.mTileMapHeight && (this.tileMap[j][i] & 0x80) != 0)
          drawTile(i, j, b1 * 12, b2 * 12); 
        j++;
      } 
      j = this.tileY;
      i++;
    } 
  }
  
  public void scrollBuffer(int paramInt) {
    if (this.tileMap == null) {
      return;
    }
    int i = this.divTileX - 13;
    int j = this.divTileX;
    int k = paramInt - 64;
    if (k < 0) {
      k = 0;
    } else if (k > (this.mTileMapWidth + 1) * 12 - 152) {
      k = (this.mTileMapWidth + 1) * 12 - 152;
    } 
    while (k / 12 < i) {
      this.divisorLine -= 12;
      int m = this.divisorLine;
      this.divTileX--;
      j--;
      i--;
      if (this.divisorLine <= 0) {
        this.divisorLine = 156;
        this.tileX -= 13;
      } 
      for (int b1 = 0; b1 < 8; b1++)
        drawTile(this.divTileX - 13, this.tileY + b1, m, b1 * 12); 
    } 
    while ((k + 128) / 12 >= j) {
      if (this.divisorLine >= 156) {
        this.divisorLine = 0;
        this.tileX += 13;
      } 
      int m = this.divisorLine;
      this.divisorLine += 12;
      this.divTileX++;
      j++;
      i++;
      for (int b1 = 0; b1 < 8; b1++)
        drawTile(this.tileX + m / 12, this.tileY + b1, m, b1 * 12); 
    } 
    this.v = this.tileX * 12 - k;
  }
  
  public int m() {
    return this.tileX * 12 - this.v;
  }
  
  public int g() {
    return this.tileX * 12 - this.v + 128;
  }
  
  public java.awt.Image createLargeBallImage(java.awt.Image paramImage) {
    int width = paramImage.getWidth(null);
    int height = paramImage.getHeight(null);
    BufferedImage image = Image.createImage(width + 4, height + 4).buf;
    Graphics2D graphics = image.createGraphics();
    try {
      graphics.drawImage(paramImage, -4, -4, null);
      flipImage(graphics, paramImage, 8, -4, 0);
      flipImage(graphics, paramImage, -4, 8, 1);
      flipImage(graphics, paramImage, 8, 8, 2);
    } finally {
      graphics.dispose();
    }
    return image;
  }
  
  public java.awt.Image createExitImage(java.awt.Image paramImage) {
    java.awt.Image image = Image.createImage(24, 48).buf;
    Graphics graphics = image.getGraphics();
    try {
      graphics.setColor(new Color(11591920));
      graphics.fillRect(0, 0, 24, 48);
      graphics.setColor(new Color(16555422));
      graphics.fillRect(4, 0, 16, 48);
      graphics.setColor(new Color(14891583));
      graphics.fillRect(6, 0, 10, 48);
      graphics.setColor(new Color(12747918));
      graphics.fillRect(10, 0, 4, 48);
      graphics.drawImage(paramImage, 0, 0, null);
      graphics.drawImage(manipulateImage(paramImage, 0), 12, 0, null);
      graphics.drawImage(manipulateImage(paramImage, 1), 0, 12, null);
      graphics.drawImage(manipulateImage(paramImage, 2), 12, 12, null);
    } finally {
      graphics.dispose();
    }
    return image;
  }
  
  public void loadTileImages() {
    java.awt.Image image = loadImage("res/icons/objects_nm.png");
    this.tileImages = new java.awt.Image[67];
    this.tileImages[0] = extractImage(image, 1, 0);
    this.tileImages[1] = extractImage(image, 1, 2);
    this.tileImages[2] = extractImageBG(image, 0, 3, new Color(-5185296));
    this.tileImages[3] = manipulateImage(this.tileImages[2], 1);
    this.tileImages[4] = manipulateImage(this.tileImages[2], 3);
    this.tileImages[5] = manipulateImage(this.tileImages[2], 5);
    this.tileImages[6] = extractImageBG(image, 0, 3, new Color(-15703888));
    this.tileImages[7] = manipulateImage(this.tileImages[6], 1);
    this.tileImages[8] = manipulateImage(this.tileImages[6], 3);
    this.tileImages[9] = manipulateImage(this.tileImages[6], 5);
    this.tileImages[10] = extractImage(image, 0, 4);
    this.tileImages[11] = extractImage(image, 3, 4);
    this.tileImages[12] = createExitImage(extractImage(image, 2, 3));
    this.tileImages[14] = extractImage(image, 0, 5);
    this.tileImages[13] = manipulateImage(this.tileImages[14], 1);
    this.tileImages[15] = manipulateImage(this.tileImages[13], 0);
    this.tileImages[16] = manipulateImage(this.tileImages[14], 0);
    this.tileImages[18] = extractImage(image, 1, 5);
    this.tileImages[17] = manipulateImage(this.tileImages[18], 1);
    this.tileImages[19] = manipulateImage(this.tileImages[17], 0);
    this.tileImages[20] = manipulateImage(this.tileImages[18], 0);
    this.tileImages[22] = extractImage(image, 2, 5);
    this.tileImages[21] = manipulateImage(this.tileImages[22], 1);
    this.tileImages[23] = manipulateImage(this.tileImages[21], 0);
    this.tileImages[24] = manipulateImage(this.tileImages[22], 0);
    this.tileImages[26] = extractImage(image, 3, 5);
    this.tileImages[25] = manipulateImage(this.tileImages[26], 1);
    this.tileImages[27] = manipulateImage(this.tileImages[25], 0);
    this.tileImages[28] = manipulateImage(this.tileImages[26], 0);
    this.tileImages[29] = manipulateImage(this.tileImages[14], 5);
    this.tileImages[30] = manipulateImage(this.tileImages[29], 1);
    this.tileImages[31] = manipulateImage(this.tileImages[29], 0);
    this.tileImages[32] = manipulateImage(this.tileImages[30], 0);
    this.tileImages[33] = manipulateImage(this.tileImages[18], 5);
    this.tileImages[34] = manipulateImage(this.tileImages[33], 1);
    this.tileImages[35] = manipulateImage(this.tileImages[33], 0);
    this.tileImages[36] = manipulateImage(this.tileImages[34], 0);
    this.tileImages[37] = manipulateImage(this.tileImages[22], 5);
    this.tileImages[38] = manipulateImage(this.tileImages[37], 1);
    this.tileImages[39] = manipulateImage(this.tileImages[37], 0);
    this.tileImages[40] = manipulateImage(this.tileImages[38], 0);
    this.tileImages[41] = manipulateImage(this.tileImages[26], 5);
    this.tileImages[42] = manipulateImage(this.tileImages[41], 1);
    this.tileImages[43] = manipulateImage(this.tileImages[41], 0);
    this.tileImages[44] = manipulateImage(this.tileImages[42], 0);
    this.tileImages[45] = extractImage(image, 3, 3);
    this.tileImages[46] = extractImage(image, 1, 3);
    this.tileImages[47] = extractImage(image, 2, 0);
    this.tileImages[48] = extractImage(image, 0, 1);
    this.tileImages[49] = createLargeBallImage(extractImage(image, 3, 0));
    this.tileImages[50] = extractImage(image, 3, 1);
    this.tileImages[51] = extractImage(image, 2, 4);
    this.tileImages[52] = extractImage(image, 3, 2);
    this.tileImages[53] = extractImage(image, 1, 1);
    this.tileImages[54] = extractImage(image, 2, 2);
    this.tileImages[55] = extractImageBG(image, 0, 0, new Color(-5185296));
    this.tileImages[56] = manipulateImage(this.tileImages[55], 3);
    this.tileImages[57] = manipulateImage(this.tileImages[55], 4);
    this.tileImages[58] = manipulateImage(this.tileImages[55], 5);
    this.tileImages[59] = extractImageBG(image, 0, 0, new Color(-15703888));
    this.tileImages[60] = manipulateImage(this.tileImages[59], 3);
    this.tileImages[61] = manipulateImage(this.tileImages[59], 4);
    this.tileImages[62] = manipulateImage(this.tileImages[59], 5);
    this.tileImages[63] = extractImage(image, 0, 2);
    this.tileImages[64] = manipulateImage(this.tileImages[63], 3);
    this.tileImages[65] = manipulateImage(this.tileImages[63], 4);
    this.tileImages[66] = manipulateImage(this.tileImages[63], 5);
    this.mUILife = extractImage(image, 2, 1);
    this.mUIRing = extractImage(image, 1, 4);
    this.mTile50Rot3 = manipulateImage(this.tileImages[50], 3);
    this.mTile50Rot4 = manipulateImage(this.tileImages[50], 4);
    this.mTile50Rot5 = manipulateImage(this.tileImages[50], 5);
    this.mTile51Rot3 = manipulateImage(this.tileImages[51], 3);
    this.mTile51Rot4 = manipulateImage(this.tileImages[51], 4);
    this.mTile51Rot5 = manipulateImage(this.tileImages[51], 5);
    this.mTile52Rot3 = manipulateImage(this.tileImages[52], 3);
    this.mTile52Rot4 = manipulateImage(this.tileImages[52], 4);
    this.mTile52Rot5 = manipulateImage(this.tileImages[52], 5);
    this.mTile54Rot3 = manipulateImage(this.tileImages[54], 3);
    this.mTile54Rot4 = manipulateImage(this.tileImages[54], 4);
    this.mTile54Rot5 = manipulateImage(this.tileImages[54], 5);
  }
  
  public void setBallImages(Ball paramBall) {
    paramBall.smallBallImage = this.tileImages[47];
    paramBall.poppedImage = this.tileImages[48];
    paramBall.largeBallImage = this.tileImages[49];
  }
  
  public static java.awt.Image extractImage(java.awt.Image paramImage, int paramInt1, int paramInt2) {
    BufferedImage image = Image.createImage(12, 12).buf;
    Graphics graphics = image.getGraphics();
    try {
      graphics.drawImage(paramImage, -paramInt1 * 12, -paramInt2 * 12, null);
    } finally {
      graphics.dispose();
    }
    return image;
  }
  
  public static java.awt.Image extractImageBG(java.awt.Image paramImage, int paramInt1, int paramInt2, Color color) {
    BufferedImage image = Image.createImage(12, 12).buf;
    Graphics graphics = image.getGraphics();
    try {
      graphics.setColor(color);
      graphics.fillRect(0, 0, 12, 12);
      graphics.drawImage(paramImage, -paramInt1 * 12, -paramInt2 * 12, null);
    } finally {
      graphics.dispose();
    }
    return image;
  }
  
  public static java.awt.Image loadImage(String paramString) {
    Image im = Image.createImage(paramString);
    return im != null ? im.buf : null;
  }
  
  public void createExitTileObject(int paramInt1, int paramInt2, java.awt.Image paramImage) {
    this.mTopLeftExitTileCol = paramInt1;
    this.mTopLeftExitTileRow = paramInt2;
    this.mImgPtr = paramImage;
    if (this.mExitTileGraphics != null) {
      this.mExitTileGraphics.dispose();
      this.mExitTileGraphics = null;
    }
    this.mExitTileImage = Image.createImage(24, 24).buf;
    this.mImageOffset = 0;
    this.mExitTileGraphics = this.mExitTileImage.getGraphics();
    repaintExitTile();
    this.mOpenFlag = false;
  }
  
  public void repaintExitTile() {
    this.mExitTileGraphics.drawImage(this.mImgPtr, 0, 0 - this.mImageOffset, null);
  }
  
  public void openExit() {
    this.mImageOffset += 4;
    if (this.mImageOffset >= 24) {
      this.mImageOffset = 24;
      this.mOpenFlag = true;
    } 
    repaintExitTile();
  }
  
  public abstract void run();
  
  public synchronized void start() {
    if (this.mGameTimer != null)
      return; 
    int delay = BounceConst.GAME_TICK_MS;
    this.mGameTimer = new javax.swing.Timer(delay, e -> timerTrigger());
    this.mGameTimer.setRepeats(true);
    this.mGameTimer.setCoalesce(false);
    this.mGameTimer.start();
  }
  
  public synchronized void stop() {
    if (this.mGameTimer == null)
      return; 
    this.mGameTimer.stop();
    this.mGameTimer = null;
  }
  
  protected void timerTrigger() {
    run();
  }
}
