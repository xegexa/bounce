(function(){var P$=java.util,I$=[];
/*c*/var C$=Clazz.newClass(P$, "IllegalFormatCodePointException", null, 'java.util.IllegalFormatException');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['I',['c']]]

Clazz.newMeth(C$, 'c$$I',  function (c) {
Clazz.super_(C$, this);
this.c=c;
}, 1);

Clazz.newMeth(C$, 'getCodePoint$',  function () {
return this.c;
});

Clazz.newMeth(C$, 'getMessage$',  function () {
return String.format$S$OA("Code point = %#x", Clazz.array(java.lang.Object, -1, [Integer.valueOf$I(this.c)]));
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:30 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
