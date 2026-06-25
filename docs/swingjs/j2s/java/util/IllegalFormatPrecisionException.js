(function(){var P$=java.util,I$=[];
/*c*/var C$=Clazz.newClass(P$, "IllegalFormatPrecisionException", null, 'java.util.IllegalFormatException');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['I',['p']]]

Clazz.newMeth(C$, 'c$$I',  function (p) {
Clazz.super_(C$, this);
this.p=p;
}, 1);

Clazz.newMeth(C$, 'getPrecision$',  function () {
return this.p;
});

Clazz.newMeth(C$, 'getMessage$',  function () {
return Integer.toString$I(this.p);
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:30 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
