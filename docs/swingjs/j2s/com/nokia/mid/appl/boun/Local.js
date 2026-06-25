(function(){var P$=Clazz.newPackage("com.nokia.mid.appl.boun"),I$=[[0,'Thread','java.io.BufferedInputStream','java.io.DataInputStream']],I$0=I$[0],$I$=function(i,n){return((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "Local");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[[]
,['Z',['langUnavailable'],'O',['loc','com.nokia.mid.appl.boun.Local','dataInputStream','java.io.DataInputStream','FALLBACK','String[]']]]

Clazz.newMeth(C$, 'replace$S$S$S',  function (paramString1, paramString2, paramString3) {
var i=paramString1.indexOf$S(paramString2);
return (i >= 0) ? (paramString1.substring$I$I(0, i) + paramString3 + paramString1.substring$I(i + paramString2.length$()) ) : paramString1;
}, 1);

Clazz.newMeth(C$, 'applyParams$S$SA',  function (str, paramArrayOfString) {
if (paramArrayOfString != null ) {
if (paramArrayOfString.length == 1) {
str=C$.replace$S$S$S(str, "%U", paramArrayOfString[0]);
} else {
for (var b=0; b < paramArrayOfString.length; b++) {
str=C$.replace$S$S$S(str, "%" + b + "U" , paramArrayOfString[b]);
}
}}return str;
}, 1);

Clazz.newMeth(C$, 'fallbackLine$I',  function (paramInt) {
if (paramInt >= 0 && paramInt < C$.FALLBACK.length  && C$.FALLBACK[paramInt] != null  ) {
return C$.FALLBACK[paramInt];
}return "Err";
}, 1);

Clazz.newMeth(C$, 'openLangStream$',  function () {
var base="lang.xx";
var resPath="res/" + base;
var $in=Clazz.getClass(C$).getResourceAsStream$S("/" + resPath);
if ($in != null ) {
return $in;
}$in=Clazz.getClass(C$).getResourceAsStream$S("/" + base);
if ($in != null ) {
return $in;
}var cl=Clazz.getClass(C$).getClassLoader$();
if (cl != null ) {
$in=cl.getResourceAsStream$S(resPath);
if ($in != null ) {
return $in;
}$in=cl.getResourceAsStream$S(base);
if ($in != null ) {
return $in;
}}cl=$I$(1).currentThread$().getContextClassLoader$();
if (cl != null ) {
$in=cl.getResourceAsStream$S(resPath);
if ($in != null ) {
return $in;
}$in=cl.getResourceAsStream$S(base);
if ($in != null ) {
return $in;
}}$in=ClassLoader.getSystemResourceAsStream$S(resPath);
if ($in != null ) {
return $in;
}return ClassLoader.getSystemResourceAsStream$S(base);
}, 1);

Clazz.newMeth(C$, 'initLangStreamIfNeeded$',  function () {
if (C$.dataInputStream != null  || C$.langUnavailable ) {
return;
}if (C$.loc == null ) {
C$.loc=Clazz.new_(C$);
}System.out.println$S("Load lang: lang.xx");
var raw=C$.openLangStream$();
if (raw == null ) {
System.out.println$S("No lang.xx on classpath; using built-in English strings.");
C$.langUnavailable=true;
return;
}if (!raw.markSupported$()) {
raw=Clazz.new_($I$(2,1).c$$java_io_InputStream,[raw]);
}C$.dataInputStream=Clazz.new_($I$(3,1).c$$java_io_InputStream,[raw]);
C$.dataInputStream.mark$I(262144);
}, 1);

Clazz.newMeth(C$, 'getText$I',  function (paramInt) {
return C$.getText$I$SA(paramInt, null);
}, 1);

Clazz.newMeth(C$, 'getText$I$SA',  function (paramInt, paramArrayOfString) {
try {
C$.initLangStreamIfNeeded$();
if (C$.langUnavailable) {
return C$.applyParams$S$SA(C$.fallbackLine$I(paramInt), paramArrayOfString);
}C$.dataInputStream.skipBytes$I(paramInt * 2);
var s=C$.dataInputStream.readShort$();
C$.dataInputStream.skipBytes$I(s - paramInt * 2 - 2);
var str=C$.dataInputStream.readUTF$();
try {
C$.dataInputStream.reset$();
} catch (e) {
if (Clazz.exceptionOf(e,"java.io.IOException")){
C$.dataInputStream.close$();
C$.dataInputStream=null;
} else {
throw e;
}
}
return C$.applyParams$S$SA(str, paramArrayOfString);
} catch (e) {
if (Clazz.exceptionOf(e,"Exception")){
e.printStackTrace$();
try {
if (C$.dataInputStream != null ) {
C$.dataInputStream.close$();
}} catch (ignored) {
if (Clazz.exceptionOf(ignored,"java.io.IOException")){
} else {
throw ignored;
}
}
C$.dataInputStream=null;
C$.langUnavailable=true;
return C$.applyParams$S$SA(C$.fallbackLine$I(paramInt), paramArrayOfString);
} else {
throw e;
}
}
}, 1);

C$.$static$=function(){C$.$static$=0;
C$.loc=null;
C$.dataInputStream=null;
C$.langUnavailable=false;
C$.FALLBACK=Clazz.array(String, [32]);
{
C$.FALLBACK[0]="Bounce";
C$.FALLBACK[1]="Use %0U, %1U, and %2U to move.";
C$.FALLBACK[2]="Back";
C$.FALLBACK[3]="You win!";
C$.FALLBACK[4]="Continue";
C$.FALLBACK[5]="Back";
C$.FALLBACK[6]="Game over";
C$.FALLBACK[7]="High scores";
C$.FALLBACK[8]="Instructions";
C$.FALLBACK[9]="Level %U";
C$.FALLBACK[10]="Level %U complete";
C$.FALLBACK[11]="New game";
C$.FALLBACK[12]="New best score!";
C$.FALLBACK[13]="OK";
};
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('3.3.1-v5');//Created 2026-05-16 10:19:38 Java2ScriptVisitor version 3.3.1-v5 net.sf.j2s.core.jar version 3.3.1-v5
