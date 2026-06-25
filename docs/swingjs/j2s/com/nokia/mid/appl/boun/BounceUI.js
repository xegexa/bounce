(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),p$1={},I$=[[0,'javax.swing.JPopupMenu','javax.swing.JFrame','javax.swing.JMenuBar','com.nokia.mid.appl.boun.BounceCanvas','javax.swing.JMenu','javax.swing.JMenuItem','javax.swing.JCheckBoxMenuItem','java.awt.event.MouseAdapter','java.awt.event.FocusAdapter','java.awt.KeyboardFocusManager','java.awt.Toolkit','javax.swing.SwingUtilities','javax.swing.MenuSelectionManager','javax.swing.KeyStroke','javax.swing.AbstractAction','com.nokia.mid.appl.boun.Local','java.io.ByteArrayInputStream','java.io.DataInputStream','java.io.ByteArrayOutputStream','java.io.DataOutputStream','javax.swing.JFileChooser','java.awt.event.WindowEvent']],I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "BounceUI");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
this.mState=2;
this.mSavedValid=0;
this.mMainMenuItems=Clazz.array(String, [4]);
},1);

C$.$fields$=[['Z',['mNewBestScore'],'I',['mState','mBestLevel','mBestScore','mLastScore','mSavedValid','mSavedLives','mSavedRings','mSavedLevel','mSavedSize','mSavedScore','mSavedTileX','mSavedTileY','mSavedXSpeed','mSavedYSpeed','mSavedXPos','mSavedYPos','mSavedRespawnX','mSavedRespawnY','mSavedSpeedBonus','mSavedGravBonus','mSavedJumpBonus','mSavedTileCount','mSavedSpikeCount','mSavedMenuItem'],'J',['o'],'O',['mMidlet','com.nokia.mid.appl.boun.Bounce','mDisplay','javax.swing.JFrame','mCanvas','com.nokia.mid.appl.boun.BounceCanvas','mMenuBar','javax.swing.JMenuBar','mSavedTiles','int[][]','mSavedSpikeOffset','short[][]','+mSavedSpikeDirection','mMainMenuItems','String[]','invincibilityMenuItem','javax.swing.JCheckBoxMenuItem','+invertedGravityMenuItem']]]

Clazz.newMeth(C$, 'c$',  function () {
;C$.$init$.apply(this);
$I$(1).setDefaultLightWeightPopupEnabled$Z(false);
this.loadGameData$();
this.mDisplay=Clazz.new_($I$(2,1));
this.mDisplay.setUndecorated$Z(true);
this.mDisplay.setTitle$S("Bounce");
this.mDisplay.setSize$I$I(400, 422);
this.mDisplay.setDefaultCloseOperation$I(3);
this.mDisplay.setLocationRelativeTo$java_awt_Component(null);
this.mMenuBar=Clazz.new_($I$(3,1));
this.mCanvas=Clazz.new_($I$(4,1).c$$com_nokia_mid_appl_boun_BounceUI$I,[this, 1]);
this.mCanvas.start$();
this.initMainMenu$();
this.mDisplay.add$java_awt_Component(this.mCanvas);
this.mDisplay.setJMenuBar$javax_swing_JMenuBar(this.mMenuBar);
var gameMenu=Clazz.new_($I$(5,1).c$$S,["Game"]);
var newGameMenu=Clazz.new_($I$(5,1).c$$S,["New game"]);
var openMapMenuItem=Clazz.new_($I$(6,1).c$$S,["Open map"]);
this.invincibilityMenuItem=Clazz.new_($I$(7,1).c$$S,["Invincibility"]);
this.invertedGravityMenuItem=Clazz.new_($I$(7,1).c$$S,["Inverted gravity"]);
var exitMenuItem=Clazz.new_($I$(6,1).c$$S,["Exit"]);
this.invincibilityMenuItem.setState$Z(this.mCanvas.mInvincible);
this.invertedGravityMenuItem.setState$Z(this.mCanvas.mInvertedGravity);
gameMenu.add$javax_swing_JMenuItem(newGameMenu);
gameMenu.add$javax_swing_JMenuItem(openMapMenuItem);
gameMenu.add$javax_swing_JMenuItem(this.invincibilityMenuItem);
gameMenu.add$javax_swing_JMenuItem(this.invertedGravityMenuItem);
gameMenu.addSeparator$();
gameMenu.add$javax_swing_JMenuItem(exitMenuItem);
this.invincibilityMenuItem.addItemListener$java_awt_event_ItemListener(((P$.BounceUI$1||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ItemListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].setInvincible$Z.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], [this.b$['com.nokia.mid.appl.boun.BounceUI'].invincibilityMenuItem.getState$()]);
});
})()
), Clazz.new_(P$.BounceUI$1.$init$,[this, null])));
this.invertedGravityMenuItem.addItemListener$java_awt_event_ItemListener(((P$.BounceUI$2||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$2", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ItemListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].setInvertedGravity$Z.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], [this.b$['com.nokia.mid.appl.boun.BounceUI'].invertedGravityMenuItem.getState$()]);
});
})()
), Clazz.new_(P$.BounceUI$2.$init$,[this, null])));
exitMenuItem.addActionListener$java_awt_event_ActionListener(((P$.BounceUI$3||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$3", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ActionListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].exitGame$.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_(P$.BounceUI$3.$init$,[this, null])));
var levels=Clazz.array(Integer.TYPE, -1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
for (var level, $level = 0, $$level = levels; $level<$$level.length&&((level=($$level[$level])),1);$level++) {
var levelMenuItem=Clazz.new_($I$(6,1).c$$S,["Level " + level]);
newGameMenu.add$javax_swing_JMenuItem(levelMenuItem);
levelMenuItem.addActionListener$java_awt_event_ActionListener(((P$.BounceUI$4||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$4", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ActionListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].newGame$I.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], [this.$finals$.level]);
});
})()
), Clazz.new_(P$.BounceUI$4.$init$,[this, {level:level}])));
}
openMapMenuItem.addActionListener$java_awt_event_ActionListener(((P$.BounceUI$5||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$5", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.ActionListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].openMap$.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_(P$.BounceUI$5.$init$,[this, null])));
this.mMenuBar.add$javax_swing_JMenu(gameMenu);
this.mCanvas.setFocusable$Z(true);
this.mCanvas.addMouseListener$java_awt_event_MouseListener(((P$.BounceUI$6||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$6", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('java.awt.event.MouseAdapter'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.requestFocusInWindow$();
});
})()
), Clazz.new_($I$(8,1),[this, null],P$.BounceUI$6)));
this.mCanvas.addFocusListener$java_awt_event_FocusListener(((P$.BounceUI$7||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$7", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('java.awt.event.FocusAdapter'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'focusLost$java_awt_event_FocusEvent',  function (e) {
if (e.isTemporary$()) {
return;
}p$1.reclaimFocus.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_($I$(9,1),[this, null],P$.BounceUI$7)));
$I$(10).getCurrentKeyboardFocusManager$().addKeyEventDispatcher$java_awt_KeyEventDispatcher(((P$.BounceUI$lambda1||
(function(){/*m*/var C$=Clazz.newClass(P$, "BounceUI$lambda1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.KeyEventDispatcher', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);
/*lambda_E*/
Clazz.newMeth(C$, ['dispatchKeyEvent$java_awt_event_KeyEvent','dispatchKeyEvent$O'],  function (event) {
if (!this.b$['com.nokia.mid.appl.boun.BounceUI'].mDisplay.isActive$()) {
return false;
}if (event.getID$() == 401) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.keyPressed$java_awt_event_KeyEvent(event);
} else if (event.getID$() == 402) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.keyReleased$java_awt_event_KeyEvent(event);
}return false;
});
})()
), Clazz.new_(P$.BounceUI$lambda1.$init$,[this, null])));
$I$(11).getDefaultToolkit$().addAWTEventListener$java_awt_event_AWTEventListener$J(((P$.BounceUI$lambda2||
(function(){/*m*/var C$=Clazz.newClass(P$, "BounceUI$lambda2", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.AWTEventListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);
/*lambda_E*/
Clazz.newMeth(C$, ['eventDispatched$java_awt_AWTEvent','eventDispatched$O'],  function (awtEvent) {
if (awtEvent.getID$() != 502) {
return;
}var src=awtEvent.getSource$();
if (!(Clazz.instanceOf(src, "java.awt.Component"))) {
return;
}var w=$I$(12).getWindowAncestor$java_awt_Component(src);
if (w !== this.b$['com.nokia.mid.appl.boun.BounceUI'].mDisplay ) {
return;
}p$1.reclaimFocus.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_(P$.BounceUI$lambda2.$init$,[this, null])), 16);
this.mDisplay.addWindowFocusListener$java_awt_event_WindowFocusListener(((P$.BounceUI$8||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$8", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.awt.event.WindowFocusListener', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'windowGainedFocus$java_awt_event_WindowEvent',  function (e) {
p$1.reclaimFocus.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});

Clazz.newMeth(C$, 'windowLostFocus$java_awt_event_WindowEvent',  function (e) {
if (this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas != null  && this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.mBall != null  ) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.mBall.resetDirections$();
}});
})()
), Clazz.new_(P$.BounceUI$8.$init$,[this, null])));
this.mDisplay.setVisible$Z(true);
this.mCanvas.requestFocusInWindow$();
p$1.installMenuAccelerators$javax_swing_JMenu$javax_swing_JMenu$javax_swing_JMenuItem.apply(this, [gameMenu, newGameMenu, exitMenuItem]);
this.displayGame$Z$I(true, 1);
}, 1);

Clazz.newMeth(C$, 'reclaimFocus',  function () {
$I$(12,"invokeLater$Runnable",[((P$.BounceUI$lambda3||
(function(){/*m*/var C$=Clazz.newClass(P$, "BounceUI$lambda3", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'Runnable', 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);
/*lambda_E*/
Clazz.newMeth(C$, 'run$',  function () {
if (this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas == null  || !this.b$['com.nokia.mid.appl.boun.BounceUI'].mDisplay.isActive$() ) {
return;
}if ($I$(13).defaultManager$().getSelectedPath$().length > 0) {
return;
}if (!this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.isFocusOwner$()) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.requestFocusInWindow$();
}});
})()
), Clazz.new_(P$.BounceUI$lambda3.$init$,[this, null]))]);
}, p$1);

Clazz.newMeth(C$, 'installMenuAccelerators$javax_swing_JMenu$javax_swing_JMenu$javax_swing_JMenuItem',  function (gameMenu, newGameMenu, exitMenuItem) {
var shortcut=$I$(11).getDefaultToolkit$().getMenuShortcutKeyMask$();
var root=this.mDisplay.getRootPane$();
var im=root.getInputMap$I(2);
var am=root.getActionMap$();
im.put$javax_swing_KeyStroke$O($I$(14).getKeyStroke$I$I(73, shortcut), "bounceToggleInvincible");
am.put$O$javax_swing_Action("bounceToggleInvincible", ((P$.BounceUI$9||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$9", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('javax.swing.AbstractAction'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].setInvincible$Z.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], [!this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.mInvincible]);
});
})()
), Clazz.new_($I$(15,1),[this, null],P$.BounceUI$9)));
im.put$javax_swing_KeyStroke$O($I$(14).getKeyStroke$I$I(71, shortcut), "bounceToggleInvertedGravity");
am.put$O$javax_swing_Action("bounceToggleInvertedGravity", ((P$.BounceUI$10||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$10", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('javax.swing.AbstractAction'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].setInvertedGravity$Z.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], [!this.b$['com.nokia.mid.appl.boun.BounceUI'].mCanvas.mInvertedGravity]);
});
})()
), Clazz.new_($I$(15,1),[this, null],P$.BounceUI$10)));
im.put$javax_swing_KeyStroke$O($I$(14).getKeyStroke$I$I(79, shortcut), "bounceOpenMap");
am.put$O$javax_swing_Action("bounceOpenMap", ((P$.BounceUI$11||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$11", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('javax.swing.AbstractAction'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].openMap$.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_($I$(15,1),[this, null],P$.BounceUI$11)));
im.put$javax_swing_KeyStroke$O($I$(14).getKeyStroke$I$I(81, shortcut), "bounceExit");
am.put$O$javax_swing_Action("bounceExit", ((P$.BounceUI$12||
(function(){/*a*/var C$=Clazz.newClass(P$, "BounceUI$12", function(){Clazz.newInstance(this, arguments[0],1,C$);}, Clazz.load('javax.swing.AbstractAction'), null, 1);

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.b$['com.nokia.mid.appl.boun.BounceUI'].exitGame$.apply(this.b$['com.nokia.mid.appl.boun.BounceUI'], []);
});
})()
), Clazz.new_($I$(15,1),[this, null],P$.BounceUI$12)));
gameMenu.setMnemonic$I(71);
newGameMenu.setMnemonic$I(78);
try {
this.invincibilityMenuItem.setMnemonic$I(73);
this.invertedGravityMenuItem.setMnemonic$I(71);
exitMenuItem.setMnemonic$I(88);
} catch (ignored) {
if (Clazz.exceptionOf(ignored,"Exception")){
} else {
throw ignored;
}
}
}, p$1);

Clazz.newMeth(C$, 'initMainMenu$',  function () {
this.mMainMenuItems[0]=$I$(16).getText$I(4);
this.mMainMenuItems[1]=$I$(16).getText$I(11);
this.mMainMenuItems[2]=$I$(16).getText$I(7);
this.mMainMenuItems[3]=$I$(16).getText$I(8);
});

Clazz.newMeth(C$, 'displayGame$Z$I',  function (paramBoolean, paramInt) {
if (paramBoolean) {
this.mNewBestScore=false;
this.mCanvas.resetGame$I$I$I(paramInt, 0, 3);
}this.mCanvas.start$();
this.mCanvas.mBall.resetDirections$();
this.mState=1;
});

Clazz.newMeth(C$, 'loadGameData$',  function () {
var arrayOfByte1=Clazz.array(Byte.TYPE, [1]);
var arrayOfByte2=Clazz.array(Byte.TYPE, [4]);
var arrayOfByte3=Clazz.array(Byte.TYPE, [255]);
var byteArrayInputStream=null;
var dataInputStream=null;
try {
byteArrayInputStream=Clazz.new_($I$(17,1).c$$BA,[arrayOfByte1]);
dataInputStream=Clazz.new_($I$(18,1).c$$java_io_InputStream,[byteArrayInputStream]);
this.mBestLevel=dataInputStream.readByte$();
byteArrayInputStream=Clazz.new_($I$(17,1).c$$BA,[arrayOfByte2]);
dataInputStream=Clazz.new_($I$(18,1).c$$java_io_InputStream,[byteArrayInputStream]);
this.mBestScore=dataInputStream.readInt$();
byteArrayInputStream=Clazz.new_($I$(17,1).c$$BA,[arrayOfByte3]);
dataInputStream=Clazz.new_($I$(18,1).c$$java_io_InputStream,[byteArrayInputStream]);
this.o=dataInputStream.readLong$();
this.mSavedValid=dataInputStream.readByte$();
this.mSavedLives=dataInputStream.readByte$();
this.mSavedRings=dataInputStream.readByte$();
this.mSavedLevel=dataInputStream.readByte$();
this.mSavedSize=dataInputStream.readByte$();
this.mSavedScore=dataInputStream.readInt$();
this.mSavedTileX=dataInputStream.readInt$();
this.mSavedTileY=dataInputStream.readInt$();
this.mSavedXPos=dataInputStream.readInt$();
this.mSavedYPos=dataInputStream.readInt$();
this.mSavedXSpeed=dataInputStream.readInt$();
this.mSavedYSpeed=dataInputStream.readInt$();
dataInputStream.readInt$();
dataInputStream.readInt$();
this.mSavedRespawnX=dataInputStream.readInt$();
this.mSavedRespawnY=dataInputStream.readInt$();
this.mSavedSpeedBonus=dataInputStream.readInt$();
this.mSavedGravBonus=dataInputStream.readInt$();
this.mSavedJumpBonus=dataInputStream.readInt$();
this.mSavedTileCount=dataInputStream.readByte$();
this.mSavedTiles=Clazz.array(Integer.TYPE, [this.mSavedTileCount, 3]);
for (var b1=0; b1 < this.mSavedTileCount; b1++) {
this.mSavedTiles[b1][0]=dataInputStream.readShort$();
this.mSavedTiles[b1][1]=dataInputStream.readShort$();
this.mSavedTiles[b1][2]=dataInputStream.readByte$();
}
this.mSavedSpikeCount=dataInputStream.readByte$();
this.mSavedSpikeOffset=Clazz.array(Short.TYPE, [this.mSavedSpikeCount, 2]);
this.mSavedSpikeDirection=Clazz.array(Short.TYPE, [this.mSavedSpikeCount, 2]);
for (var b2=0; b2 < this.mSavedSpikeCount; b2++) {
this.mSavedSpikeOffset[b2][0]=dataInputStream.readShort$();
this.mSavedSpikeOffset[b2][1]=dataInputStream.readShort$();
this.mSavedSpikeDirection[b2][0]=dataInputStream.readShort$();
this.mSavedSpikeDirection[b2][1]=dataInputStream.readShort$();
}
if (Long.$ne(dataInputStream.readLong$(),(Long.$neg(559038737)) )) this.mSavedValid=0;
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
this.mSavedValid=0;
e.printStackTrace$();
} else {
throw e;
}
} finally {
if (dataInputStream != null ) {
try {
dataInputStream.close$();
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
}if (byteArrayInputStream != null ) {
try {
byteArrayInputStream.close$();
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
}}
});

Clazz.newMeth(C$, 'saveGameData$I',  function (paramInt) {
try {
var byteArrayOutputStream=Clazz.new_($I$(19,1));
var dataOutputStream=Clazz.new_($I$(20,1).c$$java_io_OutputStream,[byteArrayOutputStream]);
try {
var b1;
var arrayOfInt;
var b2;
var b3;
var b4;
var b5;
switch (paramInt) {
case 1:
dataOutputStream.writeByte$I(this.mBestLevel);
break;
case 2:
dataOutputStream.writeInt$I(this.mBestScore);
break;
case 3:
if (this.mCanvas == null  || this.mCanvas.mBall == null  ) return;
b1=0;
if (this.mState == 1) {
b1=1;
} else if (this.mState == 5) {
b1=2;
}dataOutputStream.writeLong$J(System.currentTimeMillis$());
dataOutputStream.writeByte$I(b1);
dataOutputStream.writeByte$I(this.mCanvas.numLives);
dataOutputStream.writeByte$I(this.mCanvas.numRings);
dataOutputStream.writeByte$I(this.mCanvas.mLevelNum);
dataOutputStream.writeByte$I(this.mCanvas.mBall.mBallSize);
dataOutputStream.writeInt$I(this.mCanvas.mScore);
dataOutputStream.writeInt$I(this.mCanvas.tileX);
dataOutputStream.writeInt$I(this.mCanvas.tileY);
dataOutputStream.writeInt$I(this.mCanvas.mBall.xPos);
dataOutputStream.writeInt$I(this.mCanvas.mBall.yPos);
dataOutputStream.writeInt$I(this.mCanvas.mBall.xSpeed);
dataOutputStream.writeInt$I(this.mCanvas.mBall.ySpeed);
dataOutputStream.writeInt$I(0);
dataOutputStream.writeInt$I(0);
dataOutputStream.writeInt$I(this.mCanvas.mBall.respawnX);
dataOutputStream.writeInt$I(this.mCanvas.mBall.respawnY);
dataOutputStream.writeInt$I(this.mCanvas.mBall.speedBonusCntr);
dataOutputStream.writeInt$I(this.mCanvas.mBall.gravBonusCntr);
dataOutputStream.writeInt$I(this.mCanvas.mBall.jumpBonusCntr);
arrayOfInt=Clazz.array(Integer.TYPE, [50, 3]);
b2=0;
for (b3=0; b3 < this.mCanvas.mTileMapHeight; b3++) {
for (var b=0; b < this.mCanvas.mTileMapWidth; b++) {
var t=this.mCanvas.tileMap[b3][b] & 65407 & -65 ;
if (t == 7 || t == 29  || t == 13  || t == 14  || t == 21  || t == 22  || t == 15  || t == 16  || t == 23  || t == 24 ) {
arrayOfInt[b2][0]=b3;
arrayOfInt[b2][1]=b;
arrayOfInt[b2][2]=t;
++b2;
}}
}
dataOutputStream.writeByte$I(b2);
for (b4=0; b4 < b2; b4++) {
dataOutputStream.writeShort$I(arrayOfInt[b4][0]);
dataOutputStream.writeShort$I(arrayOfInt[b4][1]);
dataOutputStream.writeByte$I(arrayOfInt[b4][2]);
}
arrayOfInt=null;
dataOutputStream.writeByte$I(this.mCanvas.mNumMoveObj);
for (b5=0; b5 < this.mCanvas.mNumMoveObj; b5++) {
dataOutputStream.writeShort$I(this.mCanvas.mMOOffset[b5][0]);
dataOutputStream.writeShort$I(this.mCanvas.mMOOffset[b5][1]);
dataOutputStream.writeShort$I(this.mCanvas.mMODirection[b5][0]);
dataOutputStream.writeShort$I(this.mCanvas.mMODirection[b5][1]);
}
dataOutputStream.writeLong$J((Long.$neg(559038737)));
break;
}

}finally{/*res*/dataOutputStream&&dataOutputStream.close$&&dataOutputStream.close$();byteArrayOutputStream&&byteArrayOutputStream.close$&&byteArrayOutputStream.close$();}
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
e.printStackTrace$();
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'checkData$',  function () {
if (this.mCanvas.mLevelNum > this.mBestLevel) {
this.mBestLevel=Math.min(this.mCanvas.mLevelNum, 11);
this.saveGameData$I(1);
}if (this.mCanvas.mScore > this.mBestScore) {
this.mBestScore=this.mCanvas.mScore;
this.mNewBestScore=true;
this.saveGameData$I(2);
}this.mLastScore=this.mCanvas.mScore;
});

Clazz.newMeth(C$, 'newGame$I',  function (level) {
this.mCanvas.mLevelNum=level;
this.mCanvas.mLevelPath=null;
this.mCanvas.createNewLevel$();
});

Clazz.newMeth(C$, 'openMap$',  function () {
var fileChooser=Clazz.new_($I$(21,1));
var option=fileChooser.showOpenDialog$java_awt_Component(this.mCanvas);
if (option == 0) {
var filePath=fileChooser.getSelectedFile$().getAbsolutePath$();
this.mCanvas.mLevelPath=filePath;
this.mCanvas.createNewLevel$();
}});

Clazz.newMeth(C$, 'exitGame$',  function () {
this.mDisplay.dispatchEvent$java_awt_AWTEvent(Clazz.new_($I$(22,1).c$$java_awt_Window$I,[this.mDisplay, 201]));
});

Clazz.newMeth(C$, 'setInvincible$Z',  function (paramBoolean) {
this.mCanvas.mInvincible=paramBoolean;
if (this.invincibilityMenuItem != null  && this.invincibilityMenuItem.getState$() != paramBoolean  ) {
this.invincibilityMenuItem.setState$Z(paramBoolean);
}});

Clazz.newMeth(C$, 'setInvertedGravity$Z',  function (paramBoolean) {
this.mCanvas.mInvertedGravity=paramBoolean;
if (this.invertedGravityMenuItem != null  && this.invertedGravityMenuItem.getState$() != paramBoolean  ) {
this.invertedGravityMenuItem.setState$Z(paramBoolean);
}});

Clazz.newMeth(C$, 'gameOver$Z',  function (paramBoolean) {
this.mState=3;
this.mSavedValid=0;
this.mCanvas.mIncomingCall=false;
this.displayGame$Z$I(true, 1);
});
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
