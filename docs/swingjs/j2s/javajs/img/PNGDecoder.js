(function(){var P$=Clazz.newPackage("javajs.img"),p$1={},I$=[[0,'java.io.ByteArrayInputStream','java.io.ByteArrayOutputStream','java.util.zip.InflaterInputStream','java.util.zip.Inflater']],I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};
/*c*/var C$=Clazz.newClass(P$, "PNGDecoder");

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'c$',  function () {
;C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'decodePNG$BA',  function (bytes) {
try {
if (bytes == null  || bytes.length < 33 ) return null;
if ((bytes[0] & 255) != 137  || bytes[1] != 80   || bytes[2] != 78   || bytes[3] != 71   ) return null;
var width=0;
var height=0;
var bitDepth=0;
var colorType=0;
var interlace=0;
var compression=255;
var filterMethod=255;
var plte=null;
var trns=null;
var idatChunks=[];
var o=8;
while (o + 12 <= bytes.length){
var len=p$1.readU32BE$BA$I.apply(this, [bytes, o]);
if (o + 8 + len + 4 > bytes.length ) return null;
var t0=bytes[o + 4]|0;
var t1=bytes[o + 5]|0;
var t2=bytes[o + 6]|0;
var t3=bytes[o + 7]|0;
o+=8;
var chunkStart=o;
o+=len + 4;
if (t0 == 73  && t1 == 72   && t2 == 68   && t3 == 82  ) {
if (len < 13 ) return null;
width=p$1.readU32BE$BA$I.apply(this, [bytes, chunkStart]);
height=p$1.readU32BE$BA$I.apply(this, [bytes, chunkStart + 4]);
bitDepth=bytes[chunkStart + 8] & 255;
colorType=bytes[chunkStart + 9] & 255;
compression=bytes[chunkStart + 10] & 255;
filterMethod=bytes[chunkStart + 11] & 255;
interlace=bytes[chunkStart + 12] & 255;
} else if (t0 == 80  && t1 == 76   && t2 == 84   && t3 == 69  ) {
plte=p$1.copyChunk$BA$I$I.apply(this, [bytes, chunkStart, len]);
} else if (t0 == 116  && t1 == 82   && t2 == 78   && t3 == 83  ) {
trns=p$1.copyChunk$BA$I$I.apply(this, [bytes, chunkStart, len]);
} else if (t0 == 73  && t1 == 68   && t2 == 65   && t3 == 84  ) {
idatChunks.push(p$1.copyChunk$BA$I$I.apply(this, [bytes, chunkStart, len]));
} else if (t0 == 73  && t1 == 69   && t2 == 78   && t3 == 68  ) {
break;
}}
if (width <= 0 || height <= 0 ) return null;
if (compression != 0 || filterMethod != 0 || interlace != 0 ) return null;
if (!p$1.isSupported$I$I.apply(this, [colorType, bitDepth])) return null;
if (colorType == 3  && (plte == null  || plte.length < 3 ) ) return null;
var idat=p$1.concatIdatChunks$OA.apply(this, [idatChunks]);
if (idat == null  || idat.length == 0 ) return null;
var raw=p$1.inflateZlib$BA.apply(this, [idat]);
if (raw == null ) return null;
var rowBytes=p$1.rowBytes$I$I$I.apply(this, [width, bitDepth, colorType]);
var expected=(1 + rowBytes) * height;
if (raw.length < expected ) return null;
var argb=p$1.unfilterToArgb$BA$I$I$I$I$BA$BA.apply(this, [raw, width, height, colorType, bitDepth, plte, trns]);
if (argb == null ) return null;
return Clazz.array(java.lang.Object, -1, [argb, Integer.valueOf$I(width), Integer.valueOf$I(height)]);
} catch (e) {
return null;
}
}, 1);

Clazz.newMeth(C$, 'readU32BE$BA$I',  function (b, i) {
return (b[i] & 255) * 16777216 + (b[i + 1] & 255) * 65536 + (b[i + 2] & 255) * 256 + (b[i + 3] & 255) ;
}, p$1);

Clazz.newMeth(C$, 'copyChunk$BA$I$I',  function (bytes, start, len) {
var out=Clazz.array(Byte.TYPE, [len]);
System.arraycopy$O$I$O$I$I(bytes, start, out, 0, len);
return out;
}, p$1);

Clazz.newMeth(C$, 'concatIdatChunks$OA',  function (chunks) {
var n=chunks.length;
if (n == 0 ) return null;
var total=0;
for (var i=0; i < n; i++) total+=chunks[i].length;

var out=Clazz.array(Byte.TYPE, [total]);
var pos=0;
for (var i=0; i < n; i++) {
var p=chunks[i];
System.arraycopy$O$I$O$I$I(p, 0, out, pos, p.length);
pos+=p.length;
}
return out;
}, p$1);

Clazz.newMeth(C$, 'inflateZlib$BA',  function (idat) {
var bais=Clazz.new_($I$(1,1).c$$BA,[idat]);
var inf=Clazz.new_($I$(4,1));
inf.init$I$Z(0, false);
var iis=Clazz.new_($I$(3,1).c$$java_io_InputStream$java_util_zip_Inflater,[bais, inf]);
var baos=Clazz.new_($I$(2,1));
var tmp=Clazz.array(Byte.TYPE, [8192]);
try {
var nr;
while (true){
nr=iis.read$BA$I$I(tmp, 0, tmp.length);
if (nr <= 0 ) break;
baos.write$BA$I$I(tmp, 0, nr);
}
} finally {
iis.close$();
}
return baos.toByteArray$();
}, p$1);

Clazz.newMeth(C$, 'isSupported$I$I',  function (colorType, bitDepth) {
switch (colorType) {
case 3:
return bitDepth == 1  || bitDepth == 2   || bitDepth == 4   || bitDepth == 8  ;
case 0:
case 2:
case 4:
case 6:
return bitDepth == 8 ;
default:
return false;
}
}, p$1);

Clazz.newMeth(C$, 'rowBytes$I$I$I',  function (width, bitDepth, colorType) {
switch (colorType) {
case 0:
case 3:
return ((((width * bitDepth + 7)/8|0))|0);
case 2:
return width * 3 * ((bitDepth <= 8 ? 1 : 2)|0);
case 4:
return width * 2 * ((bitDepth <= 8 ? 1 : 2)|0);
case 6:
return width * 4 * ((bitDepth <= 8 ? 1 : 2)|0);
default:
return 0;
}
}, p$1);

Clazz.newMeth(C$, 'filterBpp$I$I',  function (colorType, bitDepth) {
var b=(bitDepth <= 8 ? 1 : 2);
switch (colorType) {
case 0:
return Math.max(1, b);
case 2:
return 3 * b;
case 3:
return 1;
case 4:
return 2 * b;
case 6:
return 4 * b;
default:
return 1;
}
}, p$1);

Clazz.newMeth(C$, 'paeth$I$I$I',  function (a, b, c) {
var p=a + b - c;
var pa=Math.abs(p - a);
var pb=Math.abs(p - b);
var pc=Math.abs(p - c);
if (pa <= pb && pa <= pc ) return a;
if (pb <= pc ) return b;
return c;
}, p$1);

Clazz.newMeth(C$, 'unfilterRow$I$BA$BA$I$I',  function (ft, row, prev, rb, bpp) {
if (ft == 0 ) return;
var i=0;
if (ft == 1 ) {
for (i=bpp; i < rb; i++) row[i]=(((row[i] & 255) + (row[i - bpp] & 255)) & 255);

} else if (ft == 2 ) {
for (i=0; i < rb; i++) row[i]=(((row[i] & 255) + (prev[i] & 255)) & 255);

} else if (ft == 3 ) {
for (i=0; i < rb; i++) {
var left=i >= bpp ? (row[i - bpp] & 255) : 0;
var up=prev[i] & 255;
row[i]=(((row[i] & 255) + ((left + up)/2|0)) & 255);
}
} else if (ft == 4 ) {
for (i=0; i < rb; i++) {
var a=i >= bpp ? (row[i - bpp] & 255) : 0;
var b=prev[i] & 255;
var c=i >= bpp ? (prev[i - bpp] & 255) : 0;
row[i]=(((row[i] & 255) + p$1.paeth$I$I$I.apply(this, [a, b, c])) & 255);
}
} else {
throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["Unsupported PNG filter " + ft]);
}}, p$1);

Clazz.newMeth(C$, 'unfilterToArgb$BA$I$I$I$I$BA$BA',  function (raw, width, height, colorType, bitDepth, plte, trns) {
var rowBytes=p$1.rowBytes$I$I$I.apply(this, [width, bitDepth, colorType]);
var bpp=p$1.filterBpp$I$I.apply(this, [colorType, bitDepth]);
var stride=1 + rowBytes;
var out=Clazz.array(Integer.TYPE, [width * height]);
var prev=Clazz.array(Byte.TYPE, [rowBytes]);
var cur=Clazz.array(Byte.TYPE, [rowBytes]);
for (var y=0, off=0; y < height; y++, off+=stride) {
var f=raw[off] & 255;
System.arraycopy$O$I$O$I$I(raw, off + 1, cur, 0, rowBytes);
p$1.unfilterRow$I$BA$BA$I$I.apply(this, [f, cur, prev, rowBytes, bpp]);
if (!p$1.rowToArgb$BA$IA$I$I$I$I$I$BA$BA.apply(this, [cur, out, y * width, width, colorType, bitDepth, plte, trns])) return null;
System.arraycopy$O$I$O$I$I(cur, 0, prev, 0, rowBytes);
}
return out;
}, p$1);

Clazz.newMeth(C$, 'paletteIndex$BA$I$I',  function (row, x, bitDepth) {
switch (bitDepth) {
case 8:
return row[x] & 255;
case 4:
var b4=row[(x/2|0)] & 255;
return ((x & 1) == 0 ? (b4 >> 4) & 15 : b4 & 15);
case 2:
var b2=row[(x/4|0)] & 255;
var sh=6 - ((x & 3) << 1);
return (b2 >> sh) & 3;
case 1:
var b1=row[(x/8|0)] & 255;
return (b1 >> (7 - (x & 7))) & 1;
default:
return 0;
}
}, p$1);

Clazz.newMeth(C$, 'rowToArgb$BA$IA$I$I$I$I$I$BA$BA',  function (row, out, outOff, width, colorType, bitDepth, plte, trns) {
var x=0;
var i=0;
var r;
var g;
var b;
var a;
switch (colorType) {
case 6:
for (x=0; x < width; x++, i+=4) {
r=row[i] & 255;
g=row[i + 1] & 255;
b=row[i + 2] & 255;
a=row[i + 3] & 255;
out[outOff + x]=(a << 24) | (r << 16) | (g << 8) | b ;
}
break;
case 2:
for (x=0; x < width; x++, i+=3) {
r=row[i] & 255;
g=row[i + 1] & 255;
b=row[i + 2] & 255;
out[outOff + x]=-16777216 | (r << 16) | (g << 8) | b ;
}
break;
case 0:
for (x=0; x < width; x++, i++) {
r=row[i] & 255;
out[outOff + x]=-16777216 | (r << 16) | (r << 8) | r ;
}
break;
case 4:
for (x=0; x < width; x++, i+=2) {
r=row[i] & 255;
a=row[i + 1] & 255;
out[outOff + x]=(a << 24) | (r << 16) | (r << 8) | r ;
}
break;
case 3:
var nPal=(plte.length/(3)|0);
for (x=0; x < width; x++) {
var idx=p$1.paletteIndex$BA$I$I.apply(this, [row, x, bitDepth]);
if (idx >= nPal ) return false;
r=plte[idx * 3] & 255;
g=plte[idx * 3 + 1] & 255;
b=plte[idx * 3 + 2] & 255;
a=255;
if (trns != null  && idx < trns.length ) a=trns[idx] & 255;
out[outOff + x]=(a << 24) | (r << 16) | (g << 8) | b ;
}
break;
default:
return false;
}
return true;
}, p$1);

Clazz.newMeth(C$);
})();
;Clazz.setTVer('5.0.1-v7');
