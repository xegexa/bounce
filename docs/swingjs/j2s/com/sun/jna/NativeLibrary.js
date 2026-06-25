(function(){var P$=Clazz.newPackage("com.sun.jna"),p$1={},I$=[[0,'java.util.HashMap']],I$0=I$[0],$I$=function(i,n){return((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "NativeLibrary");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[['S',['libraryName']]
,['O',['libraries','java.util.Map']]]

Clazz.newMeth(C$, 'c$$S$S$J$java_util_Map',  function (libraryName, libraryPath, handle, options) {
;C$.$init$.apply(this);
this.libraryName=p$1.getLibraryName$S.apply(this, [libraryName]);
}, 1);

Clazz.newMeth(C$, 'getLibraryName$S',  function (libraryName) {
return libraryName;
}, p$1);

Clazz.newMeth(C$, 'getInstance$S',  function (libraryName) {
return C$.getInstance$S$java_util_Map(libraryName, null);
}, 1);

Clazz.newMeth(C$, 'getInstance$S$ClassLoader',  function (libraryName, classLoader) {
return C$.getInstance$S$java_util_Map(libraryName, null);
}, 1);

Clazz.newMeth(C$, 'getInstance$S$java_util_Map',  function (libraryName, libraryOptions) {
{
var library=C$.libraries.get$O(libraryName);
if (library == null ) {
library=Clazz.new_(C$.c$$S$S$J$java_util_Map,[libraryName, null, 0, null]);
C$.libraries.put$O$O(libraryName, library);
}return library;
}}, 1);

Clazz.newMeth(C$, 'getProcess$',  function () {
return C$.getInstance$S(null);
}, 1);

Clazz.newMeth(C$, 'getProcess$java_util_Map',  function (options) {
return C$.getInstance$S$java_util_Map(null, options);
}, 1);

Clazz.newMeth(C$, 'getName$',  function () {
return this.libraryName;
});

C$.$static$=function(){C$.$static$=0;
C$.libraries=Clazz.new_($I$(1,1));
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:23:41 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
