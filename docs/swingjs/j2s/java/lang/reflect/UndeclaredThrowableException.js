(function(){var P$=java.lang.reflect,I$=[];
/*c*/var C$=Clazz.newClass(P$, "UndeclaredThrowableException", null, 'RuntimeException');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['O',['undeclaredThrowable','Throwable']]]

Clazz.newMeth(C$, 'c$$Throwable',  function (exception) {
;C$.superclazz.c$.apply(this,[]);C$.$init$.apply(this);
this.undeclaredThrowable=exception;
this.initCause$Throwable(exception);
}, 1);

Clazz.newMeth(C$, 'c$$Throwable$S',  function (exception, detailMessage) {
;C$.superclazz.c$$S.apply(this,[detailMessage]);C$.$init$.apply(this);
this.undeclaredThrowable=exception;
this.initCause$Throwable(exception);
}, 1);

Clazz.newMeth(C$, 'getUndeclaredThrowable$',  function () {
return this.undeclaredThrowable;
});

Clazz.newMeth(C$, 'getCause$',  function () {
return this.undeclaredThrowable;
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:10 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
