package com.nokia.mid.appl.boun;

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.KeyboardFocusManager;
import java.awt.Toolkit;
import java.awt.Window;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.WindowEvent;
import java.awt.event.WindowFocusListener;

import javax.swing.AbstractAction;
import javax.swing.ActionMap;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JPopupMenu;
import javax.swing.KeyStroke;
import javax.swing.MenuSelectionManager;
import javax.swing.SwingUtilities;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;

import javax.swing.JCheckBoxMenuItem;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

public class BounceUI {
  public Bounce mMidlet;
  
  public JFrame mDisplay;
  
  public BounceCanvas mCanvas;

  public JMenuBar mMenuBar;
  
  public int mState = 2;
  
  public int mBestLevel;
  
  public int mBestScore;
  
  public boolean mNewBestScore;
  
  public int mLastScore;
  
  public int mSavedValid = 0;
  
  public int mSavedLives;
  
  public int mSavedRings;
  
  public int mSavedLevel;
  
  public int mSavedSize;
  
  public int mSavedScore;
  
  public int mSavedTileX;
  
  public int mSavedTileY;
  
  public int mSavedXSpeed;
  
  public int mSavedYSpeed;
  
  public int mSavedXPos;
  
  public int mSavedYPos;
  
  public int mSavedRespawnX;
  
  public int mSavedRespawnY;
  
  public int mSavedSpeedBonus;
  
  public int mSavedGravBonus;
  
  public int mSavedJumpBonus;
  
  public int mSavedTileCount;
  
  public int[][] mSavedTiles;
  
  public int mSavedSpikeCount;
  
  public short[][] mSavedSpikeOffset;
  
  public short[][] mSavedSpikeDirection;
  
  public long o;
  
  //private Command mOkayCmd;
  
  //private Command k;
  
  //private Command mBackCmd;
  
  //private Command mContinueCmd;
  
  //private List mMainMenu;
  
  //private List mNewGameMenu;
  
  //private Form mTextPage;
  
  private int mSavedMenuItem;
  
  private String[] mMainMenuItems = new String[4];

  private JCheckBoxMenuItem invincibilityMenuItem;

  private JCheckBoxMenuItem invertedGravityMenuItem;
  
  public BounceUI() {
    JPopupMenu.setDefaultLightWeightPopupEnabled(false);
    loadGameData();
    this.mDisplay = new JFrame();
    this.mDisplay.setUndecorated(true);
    this.mDisplay.setTitle("Bounce");
    this.mDisplay.setSize(BounceConst.WINDOW_WIDTH, BounceConst.WINDOW_HEIGHT + BounceConst.FRAME_MENU_BAR_HEIGHT);
    //this.mDisplay.setResizable(false);
    this.mDisplay.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    this.mDisplay.setLocationRelativeTo(null);
    this.mMenuBar = new JMenuBar();
    this.mCanvas = new BounceCanvas(this, 1);
    this.mCanvas.start();
    initMainMenu();
    this.mDisplay.add(this.mCanvas);
    this.mDisplay.setJMenuBar(this.mMenuBar);
    JMenu gameMenu = new JMenu("Game");
    JMenu newGameMenu = new JMenu("New game");
    JMenuItem openMapMenuItem = new JMenuItem("Open map");
    this.invincibilityMenuItem = new JCheckBoxMenuItem("Invincibility");
    this.invertedGravityMenuItem = new JCheckBoxMenuItem("Inverted gravity");
    JMenuItem exitMenuItem = new JMenuItem("Exit");
    this.invincibilityMenuItem.setState(this.mCanvas.mInvincible);
    this.invertedGravityMenuItem.setState(this.mCanvas.mInvertedGravity);
    gameMenu.add(newGameMenu);
    gameMenu.add(openMapMenuItem);
    gameMenu.add(this.invincibilityMenuItem);
    gameMenu.add(this.invertedGravityMenuItem);
    gameMenu.addSeparator();
    gameMenu.add(exitMenuItem);
    this.invincibilityMenuItem.addItemListener(new ItemListener() {
      @Override
      public void itemStateChanged(ItemEvent e) {
        setInvincible(BounceUI.this.invincibilityMenuItem.getState());
      }
    });
    this.invertedGravityMenuItem.addItemListener(new ItemListener() {
      @Override
      public void itemStateChanged(ItemEvent e) {
        setInvertedGravity(BounceUI.this.invertedGravityMenuItem.getState());
      }
    });
    exitMenuItem.addActionListener(new ActionListener() {
      @Override
      public void actionPerformed(ActionEvent e) {
        exitGame();
      }
    });
    int[] levels = {1,2,3,4,5,6,7,8,9,10,11};
    for (int level : levels) {
      JMenuItem levelMenuItem = new JMenuItem("Level " + level);
      newGameMenu.add(levelMenuItem);
      levelMenuItem.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e) {
          newGame(level);
        }
      });
    }
    openMapMenuItem.addActionListener(new ActionListener() {
      @Override
      public void actionPerformed(ActionEvent e) {
        openMap();
      }
    });
    this.mMenuBar.add(gameMenu);
    // Browser-hosted Swing (SwingJS/CheerpJ) routes key events via DOM focus, which is lost
    // whenever the user clicks any element outside the canvas (menu bar empty area, etc.). To
    // make the game uncontrollable-proof we (a) keep a global KeyEventDispatcher as a fallback
    // for any key the JVM does see, and (b) aggressively reclaim Swing focus to the canvas
    // whenever it would otherwise drift away — on focus loss, on any mouse click anywhere
    // inside our frame, and on window re-activation. The only exception is when a menu is
    // actually being navigated, so we don't fight menu selection.
    this.mCanvas.setFocusable(true);
    this.mCanvas.addMouseListener(new MouseAdapter() {
      @Override
      public void mousePressed(MouseEvent e) {
        BounceUI.this.mCanvas.requestFocusInWindow();
      }
    });
    this.mCanvas.addFocusListener(new FocusAdapter() {
      @Override
      public void focusLost(FocusEvent e) {
        if (e.isTemporary()) {
          return;
        }
        reclaimFocus();
      }
    });
    KeyboardFocusManager.getCurrentKeyboardFocusManager().addKeyEventDispatcher(event -> {
      if (!BounceUI.this.mDisplay.isActive()) {
        return false;
      }
      if (event.getID() == KeyEvent.KEY_PRESSED) {
        BounceUI.this.mCanvas.keyPressed(event);
      } else if (event.getID() == KeyEvent.KEY_RELEASED) {
        BounceUI.this.mCanvas.keyReleased(event);
      }
      return false;
    });
    Toolkit.getDefaultToolkit().addAWTEventListener(awtEvent -> {
      if (awtEvent.getID() != MouseEvent.MOUSE_RELEASED) {
        return;
      }
      Object src = awtEvent.getSource();
      if (!(src instanceof Component)) {
        return;
      }
      Window w = SwingUtilities.getWindowAncestor((Component) src);
      if (w != BounceUI.this.mDisplay) {
        return;
      }
      reclaimFocus();
    }, AWTEvent.MOUSE_EVENT_MASK);
    this.mDisplay.addWindowFocusListener(new WindowFocusListener() {
      @Override
      public void windowGainedFocus(WindowEvent e) {
        reclaimFocus();
      }
      @Override
      public void windowLostFocus(WindowEvent e) {
        // Releasing held directions on focus loss avoids the ball coasting forever if the user
        // alt-tabs away mid-press (the matching keyReleased never arrives).
        if (BounceUI.this.mCanvas != null && BounceUI.this.mCanvas.mBall != null) {
          BounceUI.this.mCanvas.mBall.resetDirections();
        }
      }
    });
    this.mDisplay.setVisible(true);
    this.mCanvas.requestFocusInWindow();
    installMenuAccelerators(gameMenu, newGameMenu, exitMenuItem);
    displayGame(true, 1);
  }

  private void reclaimFocus() {
    SwingUtilities.invokeLater(() -> {
      if (this.mCanvas == null || !this.mDisplay.isActive()) {
        return;
      }
      // Don't fight menu navigation: if a menu is currently open let it keep focus.
      if (MenuSelectionManager.defaultManager().getSelectedPath().length > 0) {
        return;
      }
      if (!this.mCanvas.isFocusOwner()) {
        this.mCanvas.requestFocusInWindow();
      }
    });
  }

  /**
   * Mnemonics and mouse targets for menus are unreliable in some environments (e.g. CheerpJ in the
   * browser). Bind the same actions to accelerators on the root pane so they work with keyboard.
   */
  private void installMenuAccelerators(JMenu gameMenu, JMenu newGameMenu, JMenuItem exitMenuItem) {
    int shortcut = Toolkit.getDefaultToolkit().getMenuShortcutKeyMask();
    JComponent root = this.mDisplay.getRootPane();
    InputMap im = root.getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);
    ActionMap am = root.getActionMap();

    im.put(KeyStroke.getKeyStroke(KeyEvent.VK_I, shortcut), "bounceToggleInvincible");
    am.put("bounceToggleInvincible", new AbstractAction() {
      @Override
      public void actionPerformed(ActionEvent e) {
        BounceUI.this.setInvincible(!BounceUI.this.mCanvas.mInvincible);
      }
    });

    im.put(KeyStroke.getKeyStroke(KeyEvent.VK_G, shortcut), "bounceToggleInvertedGravity");
    am.put("bounceToggleInvertedGravity", new AbstractAction() {
      @Override
      public void actionPerformed(ActionEvent e) {
        BounceUI.this.setInvertedGravity(!BounceUI.this.mCanvas.mInvertedGravity);
      }
    });

    im.put(KeyStroke.getKeyStroke(KeyEvent.VK_O, shortcut), "bounceOpenMap");
    am.put("bounceOpenMap", new AbstractAction() {
      @Override
      public void actionPerformed(ActionEvent e) {
        BounceUI.this.openMap();
      }
    });

    im.put(KeyStroke.getKeyStroke(KeyEvent.VK_Q, shortcut), "bounceExit");
    am.put("bounceExit", new AbstractAction() {
      @Override
      public void actionPerformed(ActionEvent e) {
        BounceUI.this.exitGame();
      }
    });

    gameMenu.setMnemonic(KeyEvent.VK_G);
    newGameMenu.setMnemonic(KeyEvent.VK_N);
    try {
      this.invincibilityMenuItem.setMnemonic(KeyEvent.VK_I);
      this.invertedGravityMenuItem.setMnemonic(KeyEvent.VK_G);
      exitMenuItem.setMnemonic(KeyEvent.VK_X);
    } catch (Exception ignored) {
    }
  }
  
  public synchronized void initMainMenu() {
    this.mMainMenuItems[0] = Local.getText(4);
    this.mMainMenuItems[1] = Local.getText(11);
    this.mMainMenuItems[2] = Local.getText(7);
    this.mMainMenuItems[3] = Local.getText(8);
  }
  
  /*public synchronized void displayMainMenu() {
    this.mMainMenu = new List(Local.getText(0), 3);
    if (this.mBackCmd == null) {
      this.mBackCmd = new Command(Local.getText(2), 2, 1);
      this.mBackCmd = new Command(Local.getText(5), 7, 1);
    } 
    if (this.mState == 1 || this.mSavedValid == 1 || this.mSavedValid == 2)
      this.mMainMenu.append(this.mMainMenuItems[0], null); 
    for (int b = 1; b < this.mMainMenuItems.length; b++)
      this.mMainMenu.append(this.mMainMenuItems[b], null); 
    this.mMainMenu.addCommand(this.mBackCmd);
    this.mMainMenu.setCommandListener(this);
    if (this.mCanvas.mSplashIndex != -1) {
      this.mCanvas.mSplashIndex = -1;
      this.mCanvas.mSplashImage = null;
    } 
    if (this.mState == 1 || this.mSavedValid == 1 || this.mSavedValid == 2) {
      this.mMainMenu.setSelectedIndex(0, true);
    } else {
      this.mMainMenu.setSelectedIndex(this.mSavedMenuItem, true);
    } 
    this.mCanvas.stop();
    this.mDisplay.setCurrent((Displayable)this.mMainMenu);
  }*/
  
  /*public void displayNewGameMenu() {
    String[] arrayOfString1 = new String[this.mBestLevel];
    String[] arrayOfString2 = new String[1];
    for (int b = 0; b < this.mBestLevel; b++) {
      arrayOfString2[0] = String.valueOf(b + 1);
      arrayOfString1[b] = Local.getText(9, arrayOfString2);
    } 
    this.mNewGameMenu = new List(Local.getText(11), 3, arrayOfString1, null);
    this.mNewGameMenu.addCommand(this.mBackCmd);
    this.mNewGameMenu.setCommandListener(this);
    this.mDisplay.setCurrent((Displayable)this.mNewGameMenu);
  }*/
  
  public void displayGame(boolean paramBoolean, int paramInt) {
    if (paramBoolean) {
      this.mNewBestScore = false;
      this.mCanvas.resetGame(paramInt, 0, 3);
    } 
    this.mCanvas.start();
    this.mCanvas.mBall.resetDirections();
    //this.mDisplay.setCurrent((Displayable)this.mCanvas);
    this.mState = 1;
  }
  
  /*public void displayHighScore() {
    this.mTextPage = new Form(Local.getText(7));
    this.mTextPage.append(String.valueOf(this.mBestScore));
    this.mTextPage.addCommand(this.mBackCmd);
    this.mTextPage.setCommandListener(this);
    this.mDisplay.setCurrent((Displayable)this.mTextPage);
  }*/
  
  /*public void displayInstructions() {
    this.mTextPage = new Form(Local.getText(8));
    String[] arrayOfString = { this.mCanvas.getKeyName(this.mCanvas.getKeyCode(2)), this.mCanvas.getKeyName(this.mCanvas.getKeyCode(5)), this.mCanvas.getKeyName(this.mCanvas.getKeyCode(1)) };
    this.mTextPage.append(Local.getText(1, arrayOfString));
    this.mTextPage.addCommand(this.mBackCmd);
    this.mTextPage.setCommandListener(this);
    this.mDisplay.setCurrent((Displayable)this.mTextPage);
    this.mTextPage = null;
  }*/
  
  /*public void displayGameOver(boolean paramBoolean) {
    this.mCanvas.stop();
    if (this.mOkayCmd == null)
      this.mOkayCmd = new Command(Local.getText(13), 4, 1); 
    this.mTextPage = new Form(Local.getText(6));
    if (paramBoolean) {
      this.mTextPage.append(Local.getText(3));
    } else {
      this.mTextPage.append(Local.getText(6));
    } 
    this.mTextPage.append("\n\n");
    if (this.mNewBestScore) {
      this.mTextPage.append(Local.getText(12));
      this.mTextPage.append("\n\n");
    } 
    this.mTextPage.append(String.valueOf(this.mLastScore));
    this.mTextPage.addCommand(this.mOkayCmd);
    this.mTextPage.setCommandListener(this);
    this.mDisplay.setCurrent((Displayable)this.mTextPage);
    this.mTextPage = null;
  }*/
  
  /*public void displayLevelComplete() {
    this.mCanvas.stop();
    displayGame(false, 0);
    this.mState = 5;
    if (this.mContinueCmd == null)
      this.mContinueCmd = new Command(Local.getText(4), 4, 1); 
    this.mTextPage = new Form("");
    this.mTextPage.append(this.mCanvas.mLevelCompletedStr);
    this.mTextPage.append("\n\n");
    this.mTextPage.append("" + this.mLastScore + "\n");
    this.mTextPage.addCommand(this.mContinueCmd);
    this.mTextPage.setCommandListener(this);
    this.mDisplay.setCurrent((Displayable)this.mTextPage);
    this.mTextPage = null;
  }*/
  
  /*public void commandAction(Command paramCommand, Displayable paramDisplayable) {
    if (paramCommand == List.SELECT_COMMAND) {
      if (paramDisplayable == this.mNewGameMenu) {
        displayGame(true, this.mNewGameMenu.getSelectedIndex() + 1);
      } else {
        String str = this.mMainMenu.getString(this.mMainMenu.getSelectedIndex());
        this.mSavedMenuItem = this.mMainMenu.getSelectedIndex();
        if (str.equals(this.mMainMenuItems[0])) {
          if (this.mState == 1) {
            displayGame(false, this.mCanvas.mLevelNum);
          } else if (this.mSavedValid != 0) {
            this.mDisplay.setCurrent((Displayable)this.mCanvas);
            if (this.mSavedValid == 1) {
              this.mCanvas.resetGame(this.mSavedXPos, this.mSavedYPos);
            } else {
              this.mCanvas.resetGame(this.mSavedLevel, this.mSavedScore, this.mSavedLives);
            } 
            this.mSavedTiles = null;
            this.mCanvas.start();
            this.mState = 1;
          } 
        } else if (str.equals(this.mMainMenuItems[1])) {
          if (this.mState != 4)
            if (this.mBestLevel > 1) {
              displayNewGameMenu();
            } else {
              this.mState = 4;
              displayGame(true, 1);
            }  
        } else if (str.equals(this.mMainMenuItems[2])) {
          displayHighScore();
        } else if (str.equals(this.mMainMenuItems[3])) {
          displayInstructions();
        } else if (str.equals("Read RMS")) {
          loadGameData();
        } else if (str.equals("Write RMS")) {
          saveGameData(1);
          saveGameData(2);
          saveGameData(3);
        } 
      } 
    } else if (paramCommand == this.mBackCmd || paramCommand == this.mBackCmd || paramCommand == this.mOkayCmd) {
      if (this.mDisplay.getCurrent() == this.mMainMenu) {
        this.mMidlet.destroyApp(true);
        this.mMidlet.notifyDestroyed();
      } else {
        displayMainMenu();
      } 
    } else if (paramCommand == this.mContinueCmd) {
      this.mState = 1;
      this.mDisplay.setCurrent((Displayable)this.mCanvas);
    } 
  }*/
  
  public void loadGameData() {
    byte[] arrayOfByte1 = new byte[1];
    byte[] arrayOfByte2 = new byte[4];
    byte[] arrayOfByte3 = new byte[255];
    //Object object = null;
    ByteArrayInputStream byteArrayInputStream = null;
    DataInputStream dataInputStream = null;
    try {
      //RecordStore recordStore = RecordStore.openRecordStore("bounceRMS", true);
      /*if (recordStore.getNumRecords() != 3) {
        recordStore.addRecord(arrayOfByte1, 0, arrayOfByte1.length);
        recordStore.addRecord(arrayOfByte2, 0, arrayOfByte2.length);
        recordStore.addRecord(arrayOfByte3, 0, arrayOfByte3.length);
      } else {
        arrayOfByte1 = recordStore.getRecord(1);
        arrayOfByte2 = recordStore.getRecord(2);
        arrayOfByte3 = recordStore.getRecord(3);*/
        byteArrayInputStream = new ByteArrayInputStream(arrayOfByte1);
        dataInputStream = new DataInputStream(byteArrayInputStream);
        this.mBestLevel = dataInputStream.readByte();
        byteArrayInputStream = new ByteArrayInputStream(arrayOfByte2);
        dataInputStream = new DataInputStream(byteArrayInputStream);
        this.mBestScore = dataInputStream.readInt();
        byteArrayInputStream = new ByteArrayInputStream(arrayOfByte3);
        dataInputStream = new DataInputStream(byteArrayInputStream);
        this.o = dataInputStream.readLong();
        this.mSavedValid = dataInputStream.readByte();
        this.mSavedLives = dataInputStream.readByte();
        this.mSavedRings = dataInputStream.readByte();
        this.mSavedLevel = dataInputStream.readByte();
        this.mSavedSize = dataInputStream.readByte();
        this.mSavedScore = dataInputStream.readInt();
        this.mSavedTileX = dataInputStream.readInt();
        this.mSavedTileY = dataInputStream.readInt();
        this.mSavedXPos = dataInputStream.readInt();
        this.mSavedYPos = dataInputStream.readInt();
        this.mSavedXSpeed = dataInputStream.readInt();
        this.mSavedYSpeed = dataInputStream.readInt();
        dataInputStream.readInt();
        dataInputStream.readInt();
        this.mSavedRespawnX = dataInputStream.readInt();
        this.mSavedRespawnY = dataInputStream.readInt();
        this.mSavedSpeedBonus = dataInputStream.readInt();
        this.mSavedGravBonus = dataInputStream.readInt();
        this.mSavedJumpBonus = dataInputStream.readInt();
        this.mSavedTileCount = dataInputStream.readByte();
        this.mSavedTiles = new int[this.mSavedTileCount][3];
        for (int b1 = 0; b1 < this.mSavedTileCount; b1++) {
          this.mSavedTiles[b1][0] = dataInputStream.readShort();
          this.mSavedTiles[b1][1] = dataInputStream.readShort();
          this.mSavedTiles[b1][2] = dataInputStream.readByte();
        } 
        this.mSavedSpikeCount = dataInputStream.readByte();
        this.mSavedSpikeOffset = new short[this.mSavedSpikeCount][2];
        this.mSavedSpikeDirection = new short[this.mSavedSpikeCount][2];
        for (int b2 = 0; b2 < this.mSavedSpikeCount; b2++) {
          this.mSavedSpikeOffset[b2][0] = dataInputStream.readShort();
          this.mSavedSpikeOffset[b2][1] = dataInputStream.readShort();
          this.mSavedSpikeDirection[b2][0] = dataInputStream.readShort();
          this.mSavedSpikeDirection[b2][1] = dataInputStream.readShort();
        } 
        if (dataInputStream.readLong() != -559038737L)
          this.mSavedValid = 0; 
      //} 
      //recordStore.closeRecordStore();
    } catch (IOException e) {
      this.mSavedValid = 0;
      e.printStackTrace();
    } finally {
      if (dataInputStream != null) {
        try {
          dataInputStream.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      if (byteArrayInputStream != null) {
        try {
          byteArrayInputStream.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }
  
  public void saveGameData(int paramInt) {
    //Object object = null;
    try (
      ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
      DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
    ) {
      int b1;
      int[][] arrayOfInt;
      int b2;
      int b3;
      int b4;
      int b5;
      switch (paramInt) {
        case 1:
          dataOutputStream.writeByte(this.mBestLevel);
          break;
        case 2:
          dataOutputStream.writeInt(this.mBestScore);
          break;
        case 3:
          if (this.mCanvas == null || this.mCanvas.mBall == null)
            return; 
          b1 = 0;
          if (this.mState == 1) {
            b1 = 1;
          } else if (this.mState == 5) {
            b1 = 2;
          } 
          dataOutputStream.writeLong(System.currentTimeMillis());
          dataOutputStream.writeByte(b1);
          dataOutputStream.writeByte(this.mCanvas.numLives);
          dataOutputStream.writeByte(this.mCanvas.numRings);
          dataOutputStream.writeByte(this.mCanvas.mLevelNum);
          dataOutputStream.writeByte(this.mCanvas.mBall.mBallSize);
          dataOutputStream.writeInt(this.mCanvas.mScore);
          dataOutputStream.writeInt(this.mCanvas.tileX);
          dataOutputStream.writeInt(this.mCanvas.tileY);
          dataOutputStream.writeInt(this.mCanvas.mBall.xPos);
          dataOutputStream.writeInt(this.mCanvas.mBall.yPos);
          dataOutputStream.writeInt(this.mCanvas.mBall.xSpeed);
          dataOutputStream.writeInt(this.mCanvas.mBall.ySpeed);
          dataOutputStream.writeInt(0);
          dataOutputStream.writeInt(0);
          dataOutputStream.writeInt(this.mCanvas.mBall.respawnX);
          dataOutputStream.writeInt(this.mCanvas.mBall.respawnY);
          dataOutputStream.writeInt(this.mCanvas.mBall.speedBonusCntr);
          dataOutputStream.writeInt(this.mCanvas.mBall.gravBonusCntr);
          dataOutputStream.writeInt(this.mCanvas.mBall.jumpBonusCntr);
          arrayOfInt = new int[50][3];
          b2 = 0;
          for (b3 = 0; b3 < this.mCanvas.mTileMapHeight; b3++) {
            for (int b = 0; b < this.mCanvas.mTileMapWidth; b++) {
              int t = this.mCanvas.tileMap[b3][b] & 0xFF7F & 0xFFFFFFBF;
              if (t == 7 || t == 29 || t == 13 || t == 14 || t == 21 || t == 22 || t == 15 || t == 16 || t == 23 || t == 24) {
                arrayOfInt[b2][0] = b3;
                arrayOfInt[b2][1] = b;
                arrayOfInt[b2][2] = t;
                b2++;
              } 
            } 
          } 
          dataOutputStream.writeByte(b2);
          for (b4 = 0; b4 < b2; b4++) {
            dataOutputStream.writeShort(arrayOfInt[b4][0]);
            dataOutputStream.writeShort(arrayOfInt[b4][1]);
            dataOutputStream.writeByte(arrayOfInt[b4][2]);
          } 
          arrayOfInt = null;
          dataOutputStream.writeByte(this.mCanvas.mNumMoveObj);
          for (b5 = 0; b5 < this.mCanvas.mNumMoveObj; b5++) {
            dataOutputStream.writeShort(this.mCanvas.mMOOffset[b5][0]);
            dataOutputStream.writeShort(this.mCanvas.mMOOffset[b5][1]);
            dataOutputStream.writeShort(this.mCanvas.mMODirection[b5][0]);
            dataOutputStream.writeShort(this.mCanvas.mMODirection[b5][1]);
          } 
          dataOutputStream.writeLong(-559038737L);
          break;
      } 
      //RecordStore recordStore = RecordStore.openRecordStore("bounceRMS", true);
      //recordStore.setRecord(paramInt, byteArrayOutputStream.toByteArray(), 0, byteArrayOutputStream.size());
      //recordStore.closeRecordStore();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  
  public void checkData() {
    if (this.mCanvas.mLevelNum > this.mBestLevel) {
      this.mBestLevel = Math.min(this.mCanvas.mLevelNum, 11);
      saveGameData(1);
    } 
    if (this.mCanvas.mScore > this.mBestScore) {
      this.mBestScore = this.mCanvas.mScore;
      this.mNewBestScore = true;
      saveGameData(2);
    } 
    this.mLastScore = this.mCanvas.mScore;
  }

  public void newGame(int level) {
    this.mCanvas.mLevelNum = level;
    this.mCanvas.mLevelPath = null;
    this.mCanvas.createNewLevel();
  }

  public void openMap() {
    JFileChooser fileChooser = new JFileChooser();
    int option = fileChooser.showOpenDialog(this.mCanvas);
    if (option == JFileChooser.APPROVE_OPTION) {
      String filePath = fileChooser.getSelectedFile().getAbsolutePath();
      this.mCanvas.mLevelPath = filePath;
      this.mCanvas.createNewLevel();
    }
  }

  public void exitGame() {
    //this.mDisplay.setVisible(false);
    //this.mDisplay.dispose();
    //System.exit(0);
    this.mDisplay.dispatchEvent(new WindowEvent(this.mDisplay, WindowEvent.WINDOW_CLOSING));
  }

  public void setInvincible(boolean paramBoolean) {
    this.mCanvas.mInvincible = paramBoolean;
    if (this.invincibilityMenuItem != null && this.invincibilityMenuItem.getState() != paramBoolean) {
      this.invincibilityMenuItem.setState(paramBoolean);
    }
  }

  public void setInvertedGravity(boolean paramBoolean) {
    this.mCanvas.mInvertedGravity = paramBoolean;
    if (this.invertedGravityMenuItem != null && this.invertedGravityMenuItem.getState() != paramBoolean) {
      this.invertedGravityMenuItem.setState(paramBoolean);
    }
  }
  
  public void gameOver(boolean paramBoolean) {
    this.mState = 3;
    this.mSavedValid = 0;
    this.mCanvas.mIncomingCall = false;
    //displayGameOver(paramBoolean);
    displayGame(true, 1);
  }
}
