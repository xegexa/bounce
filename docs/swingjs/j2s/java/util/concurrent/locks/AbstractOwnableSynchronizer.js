(function(){var P$=Clazz.newPackage("java.util.concurrent.locks"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "AbstractOwnableSynchronizer", null, null, 'java.io.Serializable');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['O',['exclusiveOwnerThread','Thread']]]

Clazz.newMeth(C$, 'c$',  function () {
;C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'setExclusiveOwnerThread$Thread',  function (t) {
this.exclusiveOwnerThread=t;
});

Clazz.newMeth(C$, 'getExclusiveOwnerThread$',  function () {
return this.exclusiveOwnerThread;
});
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:36 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
