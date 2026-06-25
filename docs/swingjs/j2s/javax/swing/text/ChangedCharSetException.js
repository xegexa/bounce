(function(){var P$=Clazz.newPackage("javax.swing.text"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "ChangedCharSetException", null, 'java.io.IOException');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['Z',['charSetKey'],'S',['charSetSpec']]]

Clazz.newMeth(C$, 'c$$S$Z',  function (charSetSpec, charSetKey) {
Clazz.super_(C$, this);
this.charSetSpec=charSetSpec;
this.charSetKey=charSetKey;
}, 1);

Clazz.newMeth(C$, 'getCharSetSpec$',  function () {
return this.charSetSpec;
});

Clazz.newMeth(C$, 'keyEqualsCharSet$',  function () {
return this.charSetKey;
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:25:04 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
