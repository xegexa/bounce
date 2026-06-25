(function(){var P$=java.lang,I$=[];
/*c*/var C$=Clazz.newClass(P$, "ExceptionInInitializerError", null, 'LinkageError');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['O',['exception','Throwable']]]

Clazz.newMeth(C$, 'c$',  function () {
;C$.superclazz.c$.apply(this,[]);C$.$init$.apply(this);
this.initCause$Throwable(null);
}, 1);

Clazz.newMeth(C$, 'c$$S',  function (detailMessage) {
;C$.superclazz.c$$S.apply(this,[detailMessage]);C$.$init$.apply(this);
this.initCause$Throwable(null);
}, 1);

Clazz.newMeth(C$, 'c$$Throwable',  function (exception) {
;C$.superclazz.c$.apply(this,[]);C$.$init$.apply(this);
this.exception=exception;
this.initCause$Throwable(exception);
}, 1);

Clazz.newMeth(C$, 'getException$',  function () {
return this.exception;
});

Clazz.newMeth(C$, 'getCause$',  function () {
return this.exception;
});
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:07 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
