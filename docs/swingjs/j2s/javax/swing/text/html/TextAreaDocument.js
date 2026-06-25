(function(){var P$=Clazz.newPackage("javax.swing.text.html"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "TextAreaDocument", null, 'javax.swing.text.PlainDocument');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['S',['initialText']]]

Clazz.newMeth(C$, 'reset$',  function () {
try {
this.remove$I$I(0, this.getLength$());
if (this.initialText != null ) {
this.insertString$I$S$javax_swing_text_AttributeSet(0, this.initialText, null);
}} catch (e) {
if (Clazz.exceptionOf(e,"javax.swing.text.BadLocationException")){
} else {
throw e;
}
}
});

Clazz.newMeth(C$, 'storeInitialText$',  function () {
try {
this.initialText=this.getText$I$I(0, this.getLength$());
} catch (e) {
if (Clazz.exceptionOf(e,"javax.swing.text.BadLocationException")){
} else {
throw e;
}
}
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:25:10 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
