(function(){var P$=Clazz.newPackage("java.text"),p$1={},I$=[[0,'java.util.Locale','sun.util.locale.provider.LocaleProviderAdapter','java.util.Hashtable','java.text.NumberFormat','java.text.DateFormatSymbols','java.util.Calendar','java.util.TimeZone','StringBuilder','StringBuffer','java.text.FieldPosition','java.text.CharacterIteratorFieldDelegate',['java.text.DateFormat','.Field'],'sun.util.calendar.CalendarUtils','java.text.DontCareFieldPosition','java.text.ParsePosition']],I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "SimpleDateFormat", null, 'java.text.DateFormat');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
this.serialVersionOnStream=1;
this.months="JanFebMarAprMayJunJulAugSepOctNovDec";
},1);

C$.$fields$=[['Z',['localeInitialized','useDateFormatSymbols'],'C',['zeroDigit'],'I',['serialVersionOnStream','defaultCenturyStartYear'],'S',['pattern','months'],'O',['compiledPattern','char[]','formatData','java.text.DateFormatSymbols','defaultCenturyStart','java.util.Date','locale','java.util.Locale']]
,['I',['fieldCount'],'O',['cachedLocaleData','java.util.Hashtable','+cachedNumberFormatData','fields','String[]','fieldlens','int[]','+fieldzero','+adj','+isopts','+isolens','+locpts','+loclens','+PATTERN_INDEX_TO_CALENDAR_FIELD','+PATTERN_INDEX_TO_DATE_FORMAT_FIELD','PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID','java.text.DateFormat.Field[]']]]

Clazz.newMeth(C$, 'c$',  function () {
C$.c$$I$I$java_util_Locale.apply(this, [3, 3, $I$(1).getDefault$()]);
}, 1);

Clazz.newMeth(C$, 'c$$S',  function (pattern) {
C$.c$$S$java_util_Locale$Z.apply(this, [pattern, null, true]);
}, 1);

Clazz.newMeth(C$, 'c$$S$java_util_Locale',  function (pattern, locale) {
C$.c$$S$java_util_Locale$Z.apply(this, [pattern, locale, false]);
}, 1);

Clazz.newMeth(C$, 'c$$S$java_text_DateFormatSymbols',  function (pattern, formatSymbols) {
Clazz.super_(C$, this);
if (pattern == null  || formatSymbols == null  ) {
throw Clazz.new_(Clazz.load('NullPointerException'));
}this.pattern=pattern;
this.formatData=formatSymbols.clone$();
this.isSimpleMMDDYY=false;
this.useDateFormatSymbols=true;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$java_util_Locale',  function (timeStyle, dateStyle, loc) {
Clazz.super_(C$, this);
if (loc == null ) {
throw Clazz.new_(Clazz.load('NullPointerException'));
}this.isSimpleMMDDYY=false;
this.locale=loc;
var key=p$1.getKey.apply(this, []) + timeStyle + dateStyle ;
this.pattern=C$.getCachedLocaleData$S(key);
if (this.pattern == null ) {
this.pattern=$I$(2).getResourceBundleBased$().getLocaleResources$java_util_Locale(loc).getDateTimePattern$I$I$java_util_Calendar(3, 3, this.getCalendar$());
C$.cachedLocaleData.put$O$O(key, this.pattern);
}}, 1);

Clazz.newMeth(C$, 'getCachedLocaleData$S',  function (key) {
if (C$.cachedLocaleData == null ) {
C$.cachedLocaleData=Clazz.new_($I$(3,1).c$$I,[3]);
return null;
}return C$.cachedLocaleData.get$O(key);
}, 1);

Clazz.newMeth(C$, 'c$$S$java_util_Locale$Z',  function (pattern, locale, allowNull) {
Clazz.super_(C$, this);
if (pattern == null  || !allowNull && locale == null   ) {
throw Clazz.new_(Clazz.load('NullPointerException'));
}this.pattern=pattern;
this.locale=locale;
this.isSimpleMMDDYY=p$1.isSimple$S$java_util_Locale.apply(this, [pattern, locale]);
}, 1);

Clazz.newMeth(C$, 'initializeLocale',  function () {
if (this.locale == null ) this.locale=$I$(1).getDefault$();
this.compiledPattern=p$1.compile$S.apply(this, [this.pattern]);
this.numberFormat=C$.getCachedNumberFormatData$java_util_Locale(this.locale);
if (this.numberFormat == null ) {
this.numberFormat=$I$(4).getIntegerInstance$java_util_Locale(this.locale);
this.numberFormat.setGroupingUsed$Z(false);
C$.cachedNumberFormatData.put$O$O(this.locale, this.numberFormat);
}this.numberFormat=this.numberFormat.clone$();
}, p$1);

Clazz.newMeth(C$, 'getCachedNumberFormatData$java_util_Locale',  function (key) {
if (C$.cachedNumberFormatData == null ) {
C$.cachedNumberFormatData=Clazz.new_($I$(3,1).c$$I,[3]);
return null;
}return C$.cachedNumberFormatData.get$O(key);
}, 1);

Clazz.newMeth(C$, 'getCalendar$',  function () {
var cal=C$.superclazz.prototype.getCalendar$.apply(this, []);
if (cal == null ) {
p$1.initializeCalendar.apply(this, []);
}return cal;
});

Clazz.newMeth(C$, 'initializeCalendar',  function () {
if (this.calendar == null ) {
p$1.initializeLocale.apply(this, []);
if (this.formatData == null ) this.formatData=$I$(5).getInstance$java_util_Locale(this.locale);
this.calendar=$I$(6,"getInstance$java_util_TimeZone$java_util_Locale",[$I$(7).getDefault$(), this.locale]);
p$1.initializeDefaultCentury.apply(this, []);
}}, p$1);

Clazz.newMeth(C$, 'getKey',  function () {
var sb=Clazz.new_($I$(8,1));
sb.append$S(p$1.getCalendarName.apply(this, [])).append$C(".");
sb.append$S(this.locale.getLanguage$()).append$C("_").append$S(this.locale.getCountry$()).append$C("_").append$S(this.locale.getVariant$());
return sb.toString();
}, p$1);

Clazz.newMeth(C$, 'compile$S',  function (pattern) {
var length=pattern.length$();
var inQuote=false;
var compiledPattern=Clazz.new_($I$(8,1).c$$I,[length * 2]);
var tmpBuffer=null;
var count=0;
var lastTag=-1;
for (var i=0; i < length; i++) {
var c=pattern.charAt$I(i);
if (c == "\'") {
if ((i + 1) < length) {
c=pattern.charAt$I(i + 1);
if (c == "\'") {
++i;
if (count != 0) {
C$.encode$I$I$StringBuilder(lastTag, count, compiledPattern);
lastTag=-1;
count=0;
}if (inQuote) {
tmpBuffer.append$C(c);
} else {
compiledPattern.append$C(String.fromCharCode((25600 | c.$c())));
}continue;
}}if (!inQuote) {
if (count != 0) {
C$.encode$I$I$StringBuilder(lastTag, count, compiledPattern);
lastTag=-1;
count=0;
}if (tmpBuffer == null ) {
tmpBuffer=Clazz.new_($I$(8,1).c$$I,[length]);
} else {
tmpBuffer.setLength$I(0);
}inQuote=true;
} else {
var len=tmpBuffer.length$();
if (len == 1) {
var ch=tmpBuffer.charAt$I(0);
if (ch.$c() < 128 ) {
compiledPattern.append$C(String.fromCharCode((25600 | ch.$c())));
} else {
compiledPattern.append$C("\u6501");
compiledPattern.append$C(ch);
}} else {
C$.encode$I$I$StringBuilder(101, len, compiledPattern);
compiledPattern.append$CharSequence(tmpBuffer);
}inQuote=false;
}continue;
}if (inQuote) {
tmpBuffer.append$C(c);
continue;
}if (!(c >= "a" && c <= "z"  || c >= "A" && c <= "Z"  )) {
if (count != 0) {
C$.encode$I$I$StringBuilder(lastTag, count, compiledPattern);
lastTag=-1;
count=0;
}if (c.$c() < 128 ) {
compiledPattern.append$C(String.fromCharCode((25600 | c.$c())));
} else {
var j;
for (j=i + 1; j < length; j++) {
var d=pattern.charAt$I(j);
if (d == "\'" || (d >= "a" && d <= "z"  || d >= "A" && d <= "Z"  ) ) {
break;
}}
compiledPattern.append$C(String.fromCharCode((25856 | (j - i))));
for (; i < j; i++) {
compiledPattern.append$C(pattern.charAt$I(i));
}
--i;
}continue;
}var tag;
if ((tag="GyMdkHmsSEDFwWahKzZ".indexOf$I(c)) == -1) {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Illegal pattern character \'" + c + "'" ]);
}if (lastTag == -1 || lastTag == tag ) {
lastTag=tag;
++count;
continue;
}C$.encode$I$I$StringBuilder(lastTag, count, compiledPattern);
lastTag=tag;
count=1;
}
if (inQuote) {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Unterminated quote"]);
}if (count != 0) {
C$.encode$I$I$StringBuilder(lastTag, count, compiledPattern);
}var len=compiledPattern.length$();
var r=Clazz.array(Character.TYPE, [len]);
compiledPattern.getChars$I$I$CA$I(0, len, r, 0);
return r;
}, p$1);

Clazz.newMeth(C$, 'encode$I$I$StringBuilder',  function (tag, length, buffer) {
if (length < 255) {
buffer.append$C(String.fromCharCode((tag << 8 | length)));
} else {
buffer.append$C(String.fromCharCode(((tag << 8) | 255)));
buffer.append$C(String.fromCharCode((length >>> 16)));
buffer.append$C(String.fromCharCode((length & 65535)));
}}, 1);

Clazz.newMeth(C$, 'initializeDefaultCentury',  function () {
this.calendar.setTime$java_util_Date(Clazz.new_(java.util.Date));
this.calendar.add$I$I(1, -80);
p$1.parseAmbiguousDatesAsAfter$java_util_Date.apply(this, [this.calendar.getTime$()]);
}, p$1);

Clazz.newMeth(C$, 'parseAmbiguousDatesAsAfter$java_util_Date',  function (startDate) {
this.defaultCenturyStart=startDate;
this.getCalendar$().setTime$java_util_Date(startDate);
this.defaultCenturyStartYear=this.calendar.get$I(1);
}, p$1);

Clazz.newMeth(C$, 'set2DigitYearStart$java_util_Date',  function (startDate) {
p$1.parseAmbiguousDatesAsAfter$java_util_Date.apply(this, [startDate]);
});

Clazz.newMeth(C$, 'get2DigitYearStart$',  function () {
return this.defaultCenturyStart;
});

Clazz.newMeth(C$, 'format$java_util_Date$StringBuffer$java_text_FieldPosition',  function (date, toAppendTo, pos) {
if (pos == null ) {
return p$1.formatSimpleJS$java_util_Date$StringBuffer.apply(this, [date, toAppendTo]);
}pos.beginIndex=pos.endIndex=0;
return p$1.format$java_util_Date$StringBuffer$java_text_Format_FieldDelegate.apply(this, [date, toAppendTo, pos.getFieldDelegate$()]);
});

Clazz.newMeth(C$, 'format$O',  function (obj) {
return this.format$O$StringBuffer$java_text_FieldPosition(obj, Clazz.new_($I$(9,1)), this.isSimpleMMDDYY ? null : Clazz.new_($I$(10,1).c$$I,[0])).toString();
});

Clazz.newMeth(C$, 'format$java_util_Date',  function (date) {
if (this.isSimpleMMDDYY) {
return p$1.formatSimpleJS$java_util_Date$StringBuffer.apply(this, [date, null]);
}return C$.superclazz.prototype.format$java_util_Date.apply(this, [date]);
});

Clazz.newMeth(C$, 'isSimple$S$java_util_Locale',  function (pattern, locale) {
if ((false &&true)) return false;
for (var i=pattern.length$(); --i >= 0; ) {
var ch=pattern.charAt$I(i);
switch (ch.$c()) {
case 77:
case 100:
case 72:
case 107:
case 121:
case 104:
case 109:
case 115:
break;
default:
if (ch >= "A" && ch <= "Z"  || ch >= "a" && ch <= "z"  ) return false;
}
}
return true;
}, p$1);

Clazz.newMeth(C$, 'formatSimpleJS$java_util_Date$StringBuffer',  function (date, sb) {
var loc=(date.toString() ||"");
var ret=this.pattern;
for (var i=0, l=2; i < C$.fieldCount; i++, l=3 - l) {
var pt=ret.indexOf$S(C$.fields[i]);
if (pt >= 0) {
ret=p$1.rep$S$I$I$I$S$I$I$I.apply(this, [ret, pt, C$.fieldlens[i], C$.fieldzero[i], loc, C$.locpts[i], C$.adj[i], C$.loclens[i]]);
}}
if (sb == null ) return ret;
sb.append$S(ret);
return sb;
}, p$1);

Clazz.newMeth(C$, 'rep$S$I$I$I$S$I$I$I',  function (p, pt, flen, fzero, iso, i0, isoadj, isolen) {
var v=(i0 < 0 ? iso.substring$I(iso.length$() + i0) : iso.substring$I$I(i0, i0 + isolen));
var iv=-1;
if (isoadj == 3) {
iv=(("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf$S(v)/3|0) + 1);
} else if (isoadj != 0) {
iv=Integer.parseInt$S(v);
switch (isoadj) {
case 12:
if (iv > 12) iv-=12;
case 24:
if (iv == 0) iv=24;
}
}if (isoadj > 0) {
v=(fzero == 0 && iv < 10  ? "0" : "") + iv;
} else if (fzero > 0 && v.charAt$I(0) == "0" ) {
v=v.substring$I(1);
}return p.substring$I$I(0, pt) + v + p.substring$I(pt + flen) ;
}, p$1);

Clazz.newMeth(C$, 'format$java_util_Date$StringBuffer$java_text_Format_FieldDelegate',  function (date, toAppendTo, delegate) {
this.getCalendar$().setTime$java_util_Date(date);
var useDateFormatSymbols=p$1.useDateFormatSymbols.apply(this, []);
for (var i=0; i < this.compiledPattern.length; ) {
var tag=(this.compiledPattern[i]).$c() >>> 8;
var count=(this.compiledPattern[i++]).$c() & 255;
if (count == 255) {
count=(this.compiledPattern[i++]).$c() << 16;
count|=this.compiledPattern[i++].$c();
}switch (tag) {
case 100:
toAppendTo.append$C(String.fromCharCode(count));
break;
case 101:
toAppendTo.append$CA$I$I(this.compiledPattern, i, count);
i+=count;
break;
default:
p$1.subFormat$I$I$java_text_Format_FieldDelegate$StringBuffer$Z.apply(this, [tag, count, delegate, toAppendTo, useDateFormatSymbols]);
break;
}
}
return toAppendTo;
}, p$1);

Clazz.newMeth(C$, 'formatToCharacterIterator$O',  function (obj) {
var sb=Clazz.new_($I$(9,1));
var delegate=Clazz.new_($I$(11,1));
if (Clazz.instanceOf(obj, "java.util.Date")) {
p$1.format$java_util_Date$StringBuffer$java_text_Format_FieldDelegate.apply(this, [obj, sb, delegate]);
} else if (Clazz.instanceOf(obj, "java.lang.Number")) {
p$1.format$java_util_Date$StringBuffer$java_text_Format_FieldDelegate.apply(this, [Clazz.new_(java.util.Date.c$$J,[(obj).longValue$()]), sb, delegate]);
} else if (obj == null ) {
throw Clazz.new_(Clazz.load('NullPointerException').c$$S,["formatToCharacterIterator must be passed non-null object"]);
} else {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Cannot format given Object as a Date"]);
}return delegate.getIterator$S(sb.toString());
});

Clazz.newMeth(C$, 'getPatternIndexFieldIDs$',  function () {
if (C$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID == null ) {
C$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID=Clazz.array($I$(12), -1, [$I$(12).ERA, $I$(12).YEAR, $I$(12).MONTH, $I$(12).DAY_OF_MONTH, $I$(12).HOUR_OF_DAY1, $I$(12).HOUR_OF_DAY0, $I$(12).MINUTE, $I$(12).SECOND, $I$(12).MILLISECOND, $I$(12).DAY_OF_WEEK, $I$(12).DAY_OF_YEAR, $I$(12).DAY_OF_WEEK_IN_MONTH, $I$(12).WEEK_OF_YEAR, $I$(12).WEEK_OF_MONTH, $I$(12).AM_PM, $I$(12).HOUR1, $I$(12).HOUR0, $I$(12).TIME_ZONE, $I$(12).TIME_ZONE]);
}return C$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID;
}, 1);

Clazz.newMeth(C$, 'subFormat$I$I$java_text_Format_FieldDelegate$StringBuffer$Z',  function (patternCharIndex, count, delegate, buffer, useDateFormatSymbols) {
var maxIntCount=2147483647;
var current=null;
var beginOffset=buffer.length$();
var field=C$.PATTERN_INDEX_TO_CALENDAR_FIELD[patternCharIndex];
var value=this.getCalendar$().get$I(field);
var style=(count >= 4) ? 2 : 1;
if (!useDateFormatSymbols) {
current=this.getCalendar$().getDisplayName$I$I$java_util_Locale(field, style, this.locale);
}switch (patternCharIndex) {
case 0:
if (useDateFormatSymbols) {
var eras=this.formatData.getEras$();
if (value < eras.length) current=eras[value];
}if (current == null ) current="";
break;
case 1:
if (Clazz.instanceOf(this.calendar, "java.util.GregorianCalendar")) {
if (count >= 4) p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, count, maxIntCount, buffer]);
 else p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, 2, 2, buffer]);
} else {
if (current == null ) {
p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, style == 2 ? 1 : count, maxIntCount, buffer]);
}}break;
case 2:
if (useDateFormatSymbols) {
var months;
if (count >= 4) {
months=this.formatData.getMonths$();
current=months[value];
} else if (count == 3) {
months=this.formatData.getShortMonths$();
current=months[value];
}} else {
if (count < 3) {
current=null;
}}if (current == null ) {
p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value + 1, count, maxIntCount, buffer]);
}break;
case 4:
if (current == null ) {
if (value == 0) p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [this.calendar.getMaximum$I(11) + 1, count, maxIntCount, buffer]);
 else p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, count, maxIntCount, buffer]);
}break;
case 9:
if (useDateFormatSymbols) {
var weekdays;
if (count >= 4) {
weekdays=this.formatData.getWeekdays$();
current=weekdays[value];
} else {
weekdays=this.formatData.getShortWeekdays$();
current=weekdays[value];
}}break;
case 14:
if (useDateFormatSymbols) {
var ampm=this.formatData.getAmPmStrings$();
current=ampm[value];
}break;
case 15:
if (current == null ) {
if (value == 0) p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [this.calendar.getLeastMaximum$I(10) + 1, count, maxIntCount, buffer]);
 else p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, count, maxIntCount, buffer]);
}break;
case 17:
if (current == null ) {
var id=this.calendar.getTimeZone$().getID$();
buffer.append$S(id);
}break;
case 18:
value=((this.calendar.get$I(15) + this.calendar.get$I(16))/60000|0);
var width=4;
if (value >= 0) {
buffer.append$C("+");
} else {
++width;
}var num=((value/60|0)) * 100 + (value % 60);
$I$(13).sprintf0d$StringBuffer$I$I(buffer, num, width);
break;
default:
if (current == null ) {
p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value, count, maxIntCount, buffer]);
}break;
}
if (current != null ) {
buffer.append$S(current);
}var fieldID=C$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD[patternCharIndex];
var f=C$.getPatternIndexFieldIDs$()[patternCharIndex];
delegate.formatted$I$java_text_Format_Field$O$I$I$StringBuffer(fieldID, f, f, beginOffset, buffer.length$(), buffer);
}, p$1);

Clazz.newMeth(C$, 'zeroPaddingNumber$I$I$I$StringBuffer',  function (value, minDigits, maxDigits, buffer) {
try {
if (this.zeroDigit.$c() == 0 ) {
this.zeroDigit=(this.numberFormat).getDecimalFormatSymbols$().getZeroDigit$();
}if (value >= 0) {
if (value < 100 && minDigits >= 1  && minDigits <= 2 ) {
if (value < 10) {
if (minDigits == 2) {
buffer.append$C(this.zeroDigit);
}buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + value)));
} else {
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + (value/10|0))));
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + value % 10)));
}return;
} else if (value >= 1000 && value < 10000 ) {
if (minDigits == 4) {
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + (value/1000|0))));
value%=1000;
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + (value/100|0))));
value%=100;
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + (value/10|0))));
buffer.append$C(String.fromCharCode((this.zeroDigit.$c() + value % 10)));
return;
}if (minDigits == 2 && maxDigits == 2 ) {
p$1.zeroPaddingNumber$I$I$I$StringBuffer.apply(this, [value % 100, 2, 2, buffer]);
return;
}}}} catch (e) {
if (Clazz.exceptionOf(e,"Exception")){
} else {
throw e;
}
}
this.numberFormat.setMinimumIntegerDigits$I(minDigits);
this.numberFormat.setMaximumIntegerDigits$I(maxDigits);
this.numberFormat.format$J$StringBuffer$java_text_FieldPosition(value, buffer, $I$(14).INSTANCE);
}, p$1);

Clazz.newMeth(C$, 'parse$S$java_text_ParsePosition',  function (text, pos) {
var start=pos.index;
var oldStart=start;
var textLength=text.length$();
this.getCalendar$().clear$();
var ambiguousYear=Clazz.array(Boolean.TYPE, -1, [false]);
for (var i=0; i < this.compiledPattern.length; ) {
var tag=(this.compiledPattern[i]).$c() >>> 8;
var count=(this.compiledPattern[i++]).$c() & 255;
if (count == 255) {
count=(this.compiledPattern[i++]).$c() << 16;
count|=this.compiledPattern[i++].$c();
}switch (tag) {
case 100:
if (start >= textLength || text.charAt$I(start) != String.fromCharCode(count) ) {
pos.index=oldStart;
pos.errorIndex=start;
return null;
}++start;
break;
case 101:
while (count-- > 0){
if (start >= textLength || text.charAt$I(start) != this.compiledPattern[i++] ) {
pos.index=oldStart;
pos.errorIndex=start;
return null;
}++start;
}
break;
default:
var obeyCount=false;
if (i < this.compiledPattern.length) {
var nextTag=(this.compiledPattern[i]).$c() >>> 8;
if (!(nextTag == 100 || nextTag == 101 )) {
obeyCount=true;
}}start=p$1.subParse$S$I$I$I$Z$ZA$java_text_ParsePosition.apply(this, [text, start, tag, count, obeyCount, ambiguousYear, pos]);
if (start < 0) {
pos.index=oldStart;
return null;
}}
}
pos.index=start;
var parsedDate;
try {
if (ambiguousYear[0]) {
var savedCalendar=this.getCalendar$().clone$();
parsedDate=this.calendar.getTime$();
if (parsedDate.before$java_util_Date(this.defaultCenturyStart)) {
savedCalendar.set$I$I(1, this.defaultCenturyStartYear + 100);
parsedDate=savedCalendar.getTime$();
}} else parsedDate=this.calendar.getTime$();
} catch (e) {
if (Clazz.exceptionOf(e,"IllegalArgumentException")){
pos.errorIndex=start;
pos.index=oldStart;
return null;
} else {
throw e;
}
}
return parsedDate;
});

Clazz.newMeth(C$, 'matchString$S$I$I$SA',  function (text, start, field, data) {
var i=0;
var count=data.length;
if (field == 7) i=1;
var bestMatchLength=0;
var bestMatch=-1;
for (; i < count; ++i) {
var length=data[i].length$();
if (length > bestMatchLength && text.regionMatches$Z$I$S$I$I(true, start, data[i], 0, length) ) {
bestMatch=i;
bestMatchLength=length;
}}
if (bestMatch >= 0) {
this.calendar.set$I$I(field, bestMatch);
return start + bestMatchLength;
}return -start;
}, p$1);

Clazz.newMeth(C$, 'matchString$S$I$I$java_util_Map',  function (text, start, field, data) {
if (data != null ) {
var bestMatch=null;
for (var name, $name = data.keySet$().iterator$(); $name.hasNext$()&&((name=($name.next$())),1);) {
var length=name.length$();
if (bestMatch == null  || length > bestMatch.length$() ) {
if (text.regionMatches$Z$I$S$I$I(true, start, name, 0, length)) {
bestMatch=name;
}}}
if (bestMatch != null ) {
this.calendar.set$I$I(field, (data.get$O(bestMatch)).$c());
return start + bestMatch.length$();
}}return -start;
}, p$1);

Clazz.newMeth(C$, 'matchZoneString$S$I$I',  function (text, start, zoneIndex) {
for (var j=1; j <= 4; ++j) {
var zoneStrings=this.formatData.getZoneStringsWrapper$();
var zoneName=zoneStrings[zoneIndex][j];
if (text.regionMatches$Z$I$S$I$I(true, start, zoneName, 0, zoneName.length$())) {
return j;
}}
return -1;
}, p$1);

Clazz.newMeth(C$, 'matchDSTString$S$I$I$I',  function (text, start, zoneIndex, standardIndex) {
var index=standardIndex + 2;
var zoneStrings=this.formatData.getZoneStringsWrapper$();
var zoneName=zoneStrings[zoneIndex][index];
if (text.regionMatches$Z$I$S$I$I(true, start, zoneName, 0, zoneName.length$())) {
return true;
}return false;
}, p$1);

Clazz.newMeth(C$, 'subParseZoneString$S$I',  function (text, start) {
var useSameName=false;
var currentTimeZone=this.getTimeZone$();
var zoneIndex=this.formatData.getZoneIndex$S(currentTimeZone.getID$());
var tz=null;
var zoneStrings=this.formatData.getZoneStringsWrapper$();
var j=0;
var i=0;
if ((zoneIndex != -1) && ((j=p$1.matchZoneString$S$I$I.apply(this, [text, start, zoneIndex])) > 0) ) {
if (j <= 2) {
useSameName=p$1.matchDSTString$S$I$I$I.apply(this, [text, start, zoneIndex, j]);
}tz=$I$(7).getTimeZone$S(zoneStrings[zoneIndex][0]);
i=zoneIndex;
}if (tz == null ) {
zoneIndex=this.formatData.getZoneIndex$S($I$(7).getDefault$().getID$());
if ((zoneIndex != -1) && ((j=p$1.matchZoneString$S$I$I.apply(this, [text, start, zoneIndex])) > 0) ) {
if (j <= 2) {
useSameName=p$1.matchDSTString$S$I$I$I.apply(this, [text, start, zoneIndex, j]);
}tz=$I$(7).getTimeZone$S(zoneStrings[zoneIndex][0]);
i=zoneIndex;
}}if (tz == null ) {
for (i=0; i < zoneStrings.length; i++) {
if ((j=p$1.matchZoneString$S$I$I.apply(this, [text, start, i])) > 0) {
if (j <= 2) {
useSameName=p$1.matchDSTString$S$I$I$I.apply(this, [text, start, i, j]);
}tz=$I$(7).getTimeZone$S(zoneStrings[i][0]);
break;
}}
}if (tz != null ) {
if (!tz.equals$O(currentTimeZone)) {
this.setTimeZone$java_util_TimeZone(tz);
}if (!useSameName) {
this.calendar.set$I$I(15, tz.getRawOffset$());
this.calendar.set$I$I(16, j >= 3 ? tz.getDSTSavings$() : 0);
}return (start + zoneStrings[i][j].length$());
}return 0;
}, p$1);

Clazz.newMeth(C$, 'subParse$S$I$I$I$Z$ZA$java_text_ParsePosition',  function (text, start, patternCharIndex, count, obeyCount, ambiguousYear, origPos) {
var number=null;
var value=0;
var pos=Clazz.new_($I$(15,1).c$$I,[0]);
pos.index=start;
var field=C$.PATTERN_INDEX_TO_CALENDAR_FIELD[patternCharIndex];
for (; ; ) {
if (pos.index >= text.length$()) {
origPos.errorIndex=start;
return -1;
}var c=text.charAt$I(pos.index);
if (c != " " && c != "\t" ) break;
++pos.index;
}
if (patternCharIndex == 4 || patternCharIndex == 15  || (patternCharIndex == 2 && count <= 2 )  || patternCharIndex == 1 ) {
if (obeyCount) {
if ((start + count) > text.length$()) {
origPos.errorIndex=start;
return -1;
}number=this.numberFormat.parse$S$java_text_ParsePosition(text.substring$I$I(0, start + count), pos);
} else number=this.numberFormat.parse$S$java_text_ParsePosition(text, pos);
if (number == null ) {
if (patternCharIndex != 1 || Clazz.instanceOf(this.calendar, "java.util.GregorianCalendar") ) {
origPos.errorIndex=pos.index;
return -1;
}} else {
value=number.intValue$();
}}var useDateFormatSymbols=p$1.useDateFormatSymbols.apply(this, []);
var index;
switch (patternCharIndex) {
case 0:
if (useDateFormatSymbols) {
if ((index=p$1.matchString$S$I$I$SA.apply(this, [text, start, 0, this.formatData.getEras$()])) > 0) {
return index;
}} else {
var map=this.calendar.getDisplayNames$I$I$java_util_Locale(field, 0, this.locale);
if ((index=p$1.matchString$S$I$I$java_util_Map.apply(this, [text, start, field, map])) > 0) {
return index;
}}origPos.errorIndex=pos.index;
return -1;
case 1:
if (!(Clazz.instanceOf(this.calendar, "java.util.GregorianCalendar"))) {
var style=(count >= 4) ? 2 : 1;
var map=this.calendar.getDisplayNames$I$I$java_util_Locale(field, style, this.locale);
if (map != null ) {
if ((index=p$1.matchString$S$I$I$java_util_Map.apply(this, [text, start, field, map])) > 0) {
return index;
}}this.calendar.set$I$I(field, value);
return pos.index;
}if (count <= 2 && (pos.index - start) == 2  && Character.isDigit$C(text.charAt$I(start))  && Character.isDigit$C(text.charAt$I(start + 1)) ) {
var ambiguousTwoDigitYear=this.defaultCenturyStartYear % 100;
ambiguousYear[0]=value == ambiguousTwoDigitYear;
value+=((this.defaultCenturyStartYear/100|0)) * 100 + (value < ambiguousTwoDigitYear ? 100 : 0);
}this.calendar.set$I$I(1, value);
return pos.index;
case 2:
if (count <= 2) {
this.calendar.set$I$I(2, value - 1);
return pos.index;
} else {
if (useDateFormatSymbols) {
var newStart=0;
if ((newStart=p$1.matchString$S$I$I$SA.apply(this, [text, start, 2, this.formatData.getMonths$()])) > 0) return newStart;
 else if ((index=p$1.matchString$S$I$I$SA.apply(this, [text, start, 2, this.formatData.getShortMonths$()])) > 0) {
return index;
}} else {
var map=this.calendar.getDisplayNames$I$I$java_util_Locale(field, 0, this.locale);
if ((index=p$1.matchString$S$I$I$java_util_Map.apply(this, [text, start, field, map])) > 0) {
return index;
}}}origPos.errorIndex=pos.index;
return -1;
case 4:
if (value == this.calendar.getMaximum$I(11) + 1) value=0;
this.calendar.set$I$I(11, value);
return pos.index;
case 9:
{
if (useDateFormatSymbols) {
var newStart=0;
if ((newStart=p$1.matchString$S$I$I$SA.apply(this, [text, start, 7, this.formatData.getWeekdays$()])) > 0) return newStart;
 else if ((index=p$1.matchString$S$I$I$SA.apply(this, [text, start, 7, this.formatData.getShortWeekdays$()])) > 0) {
return index;
}} else {
var styles=Clazz.array(Integer.TYPE, -1, [2, 1]);
for (var style, $style = 0, $$style = styles; $style<$$style.length&&((style=($$style[$style])),1);$style++) {
var map=this.calendar.getDisplayNames$I$I$java_util_Locale(field, style, this.locale);
if ((index=p$1.matchString$S$I$I$java_util_Map.apply(this, [text, start, field, map])) > 0) {
return index;
}}
}origPos.errorIndex=pos.index;
return -1;
}case 14:
if (useDateFormatSymbols) {
if ((index=p$1.matchString$S$I$I$SA.apply(this, [text, start, 9, this.formatData.getAmPmStrings$()])) > 0) {
return index;
}} else {
var map=this.calendar.getDisplayNames$I$I$java_util_Locale(field, 0, this.locale);
if ((index=p$1.matchString$S$I$I$java_util_Map.apply(this, [text, start, field, map])) > 0) {
return index;
}}origPos.errorIndex=pos.index;
return -1;
case 15:
if (value == this.calendar.getLeastMaximum$I(10) + 1) value=0;
this.calendar.set$I$I(10, value);
return pos.index;
case 17:
case 18:
{
var sign=0;
var offset;
if ((text.length$() - start) >= "GMT".length$() && text.regionMatches$Z$I$S$I$I(true, start, "GMT", 0, "GMT".length$()) ) {
var num;
this.calendar.set$I$I(16, 0);
pos.index=start + "GMT".length$();
try {
if (text.charAt$I(pos.index) == "+") {
sign=1;
} else if (text.charAt$I(pos.index) == "-") {
sign=-1;
}} catch (e) {
if (Clazz.exceptionOf(e,"StringIndexOutOfBoundsException")){
} else {
throw e;
}
}
if (sign == 0) {
this.calendar.set$I$I(15, 0);
return pos.index;
}try {
var c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
num=c.$c() - 48;
}if (text.charAt$I(++pos.index) != ":") {
c=text.charAt$I(pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
num*=10;
num+=c.$c() - 48;
++pos.index;
}}if (num > 23) {
origPos.errorIndex=pos.index - 1;
return -1;
}if (text.charAt$I(pos.index) != ":") {
origPos.errorIndex=pos.index;
return -1;
}} catch (e) {
if (Clazz.exceptionOf(e,"StringIndexOutOfBoundsException")){
origPos.errorIndex=pos.index;
return -1;
} else {
throw e;
}
}
offset=num * 60;
try {
var c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
num=c.$c() - 48;
c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
num*=10;
num+=c.$c() - 48;
}}if (num > 59) {
origPos.errorIndex=pos.index;
return -1;
}} catch (e) {
if (Clazz.exceptionOf(e,"StringIndexOutOfBoundsException")){
origPos.errorIndex=pos.index;
return -1;
} else {
throw e;
}
}
offset+=num;
} else {
var i=p$1.subParseZoneString$S$I.apply(this, [text, pos.index]);
if (i != 0) {
return i;
}try {
if (text.charAt$I(pos.index) == "+") {
sign=1;
} else if (text.charAt$I(pos.index) == "-") {
sign=-1;
}if (sign == 0) {
origPos.errorIndex=pos.index;
return -1;
}var hours=0;
var c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
hours=c.$c() - 48;
c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
hours*=10;
hours+=c.$c() - 48;
}}if (hours > 23) {
origPos.errorIndex=pos.index;
return -1;
}var minutes=0;
c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
minutes=c.$c() - 48;
c=text.charAt$I(++pos.index);
if (c < "0" || c > "9" ) {
origPos.errorIndex=pos.index;
return -1;
} else {
minutes*=10;
minutes+=c.$c() - 48;
}}if (minutes > 59) {
origPos.errorIndex=pos.index;
return -1;
}offset=hours * 60 + minutes;
} catch (e) {
if (Clazz.exceptionOf(e,"StringIndexOutOfBoundsException")){
origPos.errorIndex=pos.index;
return -1;
} else {
throw e;
}
}
}if (sign != 0) {
offset*=60000 * sign;
this.calendar.set$I$I(15, offset);
this.calendar.set$I$I(16, 0);
return ++pos.index;
}}origPos.errorIndex=pos.index;
return -1;
default:
if (obeyCount) {
if ((start + count) > text.length$()) {
origPos.errorIndex=pos.index;
return -1;
}number=this.numberFormat.parse$S$java_text_ParsePosition(text.substring$I$I(0, start + count), pos);
} else number=this.numberFormat.parse$S$java_text_ParsePosition(text, pos);
if (number != null ) {
this.calendar.set$I$I(field, number.intValue$());
return pos.index;
}origPos.errorIndex=pos.index;
return -1;
}
}, p$1);

Clazz.newMeth(C$, 'getCalendarName',  function () {
return this.getCalendar$().getClass$().getName$();
}, p$1);

Clazz.newMeth(C$, 'useDateFormatSymbols',  function () {
if (this.useDateFormatSymbols) {
return true;
}return p$1.isGregorianCalendar.apply(this, []) || this.locale == null  ;
}, p$1);

Clazz.newMeth(C$, 'isGregorianCalendar',  function () {
return "java.util.GregorianCalendar".equals$O(p$1.getCalendarName.apply(this, []));
}, p$1);

Clazz.newMeth(C$, 'translatePattern$S$S$S',  function (pattern, from, to) {
var result=Clazz.new_($I$(8,1));
var inQuote=false;
for (var i=0; i < pattern.length$(); ++i) {
var c=pattern.charAt$I(i);
if (inQuote) {
if (c == "\'") inQuote=false;
} else {
if (c == "\'") inQuote=true;
 else if ((c >= "a" && c <= "z" ) || (c >= "A" && c <= "Z" ) ) {
var ci=from.indexOf$I(c);
if (ci == -1) throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Illegal pattern  character \'" + c + "'" ]);
c=to.charAt$I(ci);
}}result.append$C(c);
}
if (inQuote) throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Unfinished quote in pattern"]);
return result.toString();
}, p$1);

Clazz.newMeth(C$, 'toPattern$',  function () {
return this.pattern;
});

Clazz.newMeth(C$, 'toLocalizedPattern$',  function () {
return p$1.translatePattern$S$S$S.apply(this, [this.pattern, "GyMdkHmsSEDFwWahKzZ", this.formatData.getLocalPatternChars$()]);
});

Clazz.newMeth(C$, 'applyPattern$S',  function (pattern) {
this.compiledPattern=p$1.compile$S.apply(this, [pattern]);
this.pattern=pattern;
});

Clazz.newMeth(C$, 'applyLocalizedPattern$S',  function (pattern) {
var p=p$1.translatePattern$S$S$S.apply(this, [pattern, this.formatData.getLocalPatternChars$(), "GyMdkHmsSEDFwWahKzZ"]);
this.compiledPattern=p$1.compile$S.apply(this, [p]);
this.pattern=p;
});

Clazz.newMeth(C$, 'getDateFormatSymbols$',  function () {
return this.formatData.clone$();
});

Clazz.newMeth(C$, 'setDateFormatSymbols$java_text_DateFormatSymbols',  function (newFormatSymbols) {
this.formatData=newFormatSymbols.clone$();
this.useDateFormatSymbols=true;
});

Clazz.newMeth(C$, 'clone$',  function () {
var other=C$.superclazz.prototype.clone$.apply(this, []);
other.formatData=this.formatData.clone$();
return other;
});

Clazz.newMeth(C$, 'hashCode$',  function () {
return this.pattern.hashCode$();
});

Clazz.newMeth(C$, 'equals$O',  function (obj) {
if (!C$.superclazz.prototype.equals$O.apply(this, [obj])) return false;
var that=obj;
return (this.pattern.equals$O(that.pattern) && this.formatData.equals$O(that.formatData) );
});

C$.$static$=function(){C$.$static$=0;
C$.fields=Clazz.array(String, -1, ["yyyy", "yy", "MM", "M", "dd", "d", "hh", "h", "HH", "H", "kk", "k", "mm", "m", "ss", "s"]);
C$.fieldlens=Clazz.array(Integer.TYPE, -1, [4, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]);
C$.fieldzero=Clazz.array(Integer.TYPE, -1, [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
C$.adj=Clazz.array(Integer.TYPE, -1, [0, 0, 3, 3, 0, 0, 12, 12, 23, 23, 24, 24, 0, 0, 0, 0]);
C$.isopts=Clazz.array(Integer.TYPE, -1, [0, 2, 5, 5, 8, 8, 11, 11, 11, 11, 11, 11, 14, 14, 17, 17]);
C$.isolens=Clazz.array(Integer.TYPE, -1, [4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
C$.locpts=Clazz.array(Integer.TYPE, -1, [-4, -2, 4, 4, 8, 8, 11, 11, 11, 11, 11, 11, 14, 14, 17, 17]);
C$.loclens=Clazz.array(Integer.TYPE, -1, [4, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
C$.fieldCount=C$.fields.length;
C$.PATTERN_INDEX_TO_CALENDAR_FIELD=Clazz.array(Integer.TYPE, -1, [0, 1, 2, 5, 11, 11, 12, 13, 14, 7, 6, 8, 3, 4, 9, 10, 10, 15, 15]);
C$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD=Clazz.array(Integer.TYPE, -1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17]);
};
})();
;Clazz.setTVer('5.0.1-v7');//Created 2025-12-19 08:24:27 Java2ScriptVisitor version 5.0.1-v7 net.sf.j2s.core.jar version 5.0.1-v7
