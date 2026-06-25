(function(){var P$=Clazz.newPackage("javajs.http"),I$=[];
/*c*/var C$=Clazz.newClass(P$, "HttpClientFactory");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

C$.$fields$=[[]
,['S',['defaultClassName']]]

Clazz.newMeth(C$, 'setDefaultClassName$S',  function (className) {
if (className != null ) C$.defaultClassName=className;
}, 1);

Clazz.newMeth(C$, 'getClient$S',  function (className) {
if (className == null ) className=C$.defaultClassName;
try {
return Clazz.forName(className).getDeclaredConstructor$ClassA(Clazz.array(Class, -1, [])).newInstance$OA(Clazz.array(java.lang.Object, -1, []));
} catch (e) {
if (Clazz.exceptionOf(e,"Exception")){
e.printStackTrace$();
return null;
} else {
throw e;
}
}
}, 1);

C$.$static$=function(){C$.$static$=0;
C$.defaultClassName="javajs.http.SimpleHttpClient";
};

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:43 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
