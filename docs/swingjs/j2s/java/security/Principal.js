(function(){var P$=Clazz.newPackage("java.security"),I$=[];
/*i*/var C$=Clazz.newInterface(P$, "Principal");
C$.$defaults$ = function(C$){

Clazz.newMeth(C$, 'implies$javax_security_auth_Subject',  function (subject) {
if (subject == null ) return false;
return subject.getPrincipals$().contains$O(this);
});
};})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:20 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
