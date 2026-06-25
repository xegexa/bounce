(function(){var P$=Clazz.newPackage("java.beans"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "PropertyVetoException", null, 'Exception');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['O',['evt','java.beans.PropertyChangeEvent']]]

Clazz.newMeth(C$, 'c$$S$java_beans_PropertyChangeEvent',  function (mess, evt) {
;C$.superclazz.c$$S.apply(this,[mess]);C$.$init$.apply(this);
this.evt=evt;
}, 1);

Clazz.newMeth(C$, 'getPropertyChangeEvent$',  function () {
return this.evt;
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:04 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
