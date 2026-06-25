(function(){var P$=Clazz.newPackage("javax.swing"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "ColorTracker", null, null, 'java.awt.event.ActionListener');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['O',['chooser','javax.swing.JColorChooser','color','java.awt.Color']]]

Clazz.newMeth(C$, 'c$$javax_swing_JColorChooser',  function (c) {
;C$.$init$.apply(this);
this.chooser=c;
}, 1);

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent',  function (e) {
this.color=this.chooser.getColor$();
});

Clazz.newMeth(C$, 'getColor$',  function () {
return this.color;
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:51 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
