(function(){var P$=Clazz.newPackage("com.sun.jna"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "Pointer");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['I',['peer']]
,['O',['NULL','com.sun.jna.Pointer']]]

Clazz.newMeth(C$, 'createConstant$J',  function (peer) {
return Clazz.new_(C$.c$$I,[Long.$ival(peer)]);
}, 1);

Clazz.newMeth(C$, 'createConstant$I',  function (peer) {
return Clazz.new_(C$.c$$I,[peer]);
}, 1);

Clazz.newMeth(C$, 'c$',  function () {
;C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I',  function (peer) {
;C$.$init$.apply(this);
this.peer=peer;
}, 1);

Clazz.newMeth(C$, 'equals$O',  function (o) {
if (o === this ) {
return true;
}if (o == null ) {
return false;
}return (Clazz.instanceOf(o, "com.sun.jna.Pointer")) && ((o).peer == this.peer) ;
});

Clazz.newMeth(C$, 'hashCode$',  function () {
return this.peer;
});

Clazz.newMeth(C$, 'nativeValue$com_sun_jna_Pointer',  function (p) {
return p == null  ? 0 : p.peer;
}, 1);

Clazz.newMeth(C$, 'toString',  function () {
return "const@0x" + Integer.toHexString$I(this.peer);
});

C$.$static$=function(){C$.$static$=0;
C$.NULL=null;
};
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:23:41 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
