(function(){var P$=Clazz.newPackage("java.awt.image"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "LookupTable");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['I',['numComponents','offset','numEntries']]]

Clazz.newMeth(C$, 'c$$I$I',  function (offset, numComponents) {
;C$.$init$.apply(this);
if (offset < 0) {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Offset must be greater than 0"]);
}if (numComponents < 1) {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Number of components must  be at least 1"]);
}this.numComponents=numComponents;
this.offset=offset;
}, 1);

Clazz.newMeth(C$, 'getNumComponents$',  function () {
return this.numComponents;
});

Clazz.newMeth(C$, 'getOffset$',  function () {
return this.offset;
});

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:02 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
