import require$$0$3, { Buffer as Buffer$1 } from 'https://deno.land/std@0.136.0/node/buffer.ts';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var naclFast = {exports: {}};

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': _nodeResolve_empty
});

var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

(function (module) {
(function(nacl) {

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = Math.floor((x[j] + 128) / 256);
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  return n;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES,

  gf: gf,
  D: D,
  L: L,
  pack25519: pack25519,
  unpack25519: unpack25519,
  M: M,
  A: A,
  S: S,
  Z: Z,
  pow2523: pow2523,
  add: add,
  set25519: set25519,
  modL: modL,
  scalarmult: scalarmult,
  scalarbase: scalarbase,
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (typeof commonjsRequire !== 'undefined') {
    // Node.js.
    crypto = require$$0$2;
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})(module.exports ? module.exports : (self.nacl = self.nacl || {}));
}(naclFast));

var nacl = naclFast.exports;

const toBuffer = arr => {
  if (Buffer$1.isBuffer(arr)) {
    return arr;
  } else if (arr instanceof Uint8Array) {
    return Buffer$1.from(arr.buffer, arr.byteOffset, arr.byteLength);
  } else {
    return Buffer$1.from(arr);
  }
};

var bn = {exports: {}};

(function (module) {
(function (module, exports) {

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
      Buffer = window.Buffer;
    } else {
      Buffer = require('buffer').Buffer;
    }
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
      this.negative = 1;
    }

    if (start < number.length) {
      if (base === 16) {
        this._parseHex(number, start, endian);
      } else {
        this._parseBase(number, base, start);
        if (endian === 'le') {
          this._initArray(this.toArray(), base, endian);
        }
      }
    }
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [number & 0x3ffffff];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [0];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this._strip();
  };

  function parseHex4Bits (string, index) {
    var c = string.charCodeAt(index);
    // '0' - '9'
    if (c >= 48 && c <= 57) {
      return c - 48;
    // 'A' - 'F'
    } else if (c >= 65 && c <= 70) {
      return c - 55;
    // 'a' - 'f'
    } else if (c >= 97 && c <= 102) {
      return c - 87;
    } else {
      assert(false, 'Invalid character in ' + string);
    }
  }

  function parseHexByte (string, lowerBound, index) {
    var r = parseHex4Bits(string, index);
    if (index - 1 >= lowerBound) {
      r |= parseHex4Bits(string, index - 1) << 4;
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start, endian) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    // 24-bits chunks
    var off = 0;
    var j = 0;

    var w;
    if (endian === 'be') {
      for (i = number.length - 1; i >= start; i -= 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    } else {
      var parseLength = number.length - start;
      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
        w = parseHexByte(number, start, i) << off;
        this.words[j] |= w & 0x3ffffff;
        if (off >= 18) {
          off -= 18;
          j += 1;
          this.words[j] |= w >>> 26;
        } else {
          off += 8;
        }
      }
    }

    this._strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var b = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        b = c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        b = c - 17 + 0xa;

      // '0' - '9'
      } else {
        b = c;
      }
      assert(c >= 0 && b < mul, 'Invalid character');
      r += b;
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [0];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    this._strip();
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  function move (dest, src) {
    dest.words = src.words;
    dest.length = src.length;
    dest.negative = src.negative;
    dest.red = src.red;
  }

  BN.prototype._move = function _move (dest) {
    move(dest, this);
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype._strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  // Check Symbol.for because not everywhere where Symbol defined
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility
  if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
    try {
      BN.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect;
    } catch (e) {
      BN.prototype.inspect = inspect;
    }
  } else {
    BN.prototype.inspect = inspect;
  }

  function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  }

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modrn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16, 2);
  };

  if (Buffer) {
    BN.prototype.toBuffer = function toBuffer (endian, length) {
      return this.toArrayLike(Buffer, endian, length);
    };
  }

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  var allocate = function allocate (ArrayType, size) {
    if (ArrayType.allocUnsafe) {
      return ArrayType.allocUnsafe(size);
    }
    return new ArrayType(size);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    this._strip();

    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    var res = allocate(ArrayType, reqLength);
    var postfix = endian === 'le' ? 'LE' : 'BE';
    this['_toArrayLike' + postfix](res, byteLength);
    return res;
  };

  BN.prototype._toArrayLikeLE = function _toArrayLikeLE (res, byteLength) {
    var position = 0;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = (this.words[i] << shift) | carry;

      res[position++] = word & 0xff;
      if (position < res.length) {
        res[position++] = (word >> 8) & 0xff;
      }
      if (position < res.length) {
        res[position++] = (word >> 16) & 0xff;
      }

      if (shift === 6) {
        if (position < res.length) {
          res[position++] = (word >> 24) & 0xff;
        }
        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position < res.length) {
      res[position++] = carry;

      while (position < res.length) {
        res[position++] = 0;
      }
    }
  };

  BN.prototype._toArrayLikeBE = function _toArrayLikeBE (res, byteLength) {
    var position = res.length - 1;
    var carry = 0;

    for (var i = 0, shift = 0; i < this.length; i++) {
      var word = (this.words[i] << shift) | carry;

      res[position--] = word & 0xff;
      if (position >= 0) {
        res[position--] = (word >> 8) & 0xff;
      }
      if (position >= 0) {
        res[position--] = (word >> 16) & 0xff;
      }

      if (shift === 6) {
        if (position >= 0) {
          res[position--] = (word >> 24) & 0xff;
        }
        carry = 0;
        shift = 0;
      } else {
        carry = word >>> 24;
        shift += 2;
      }
    }

    if (position >= 0) {
      res[position--] = carry;

      while (position >= 0) {
        res[position--] = 0;
      }
    }
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] >>> wbit) & 0x01;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this._strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this._strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this._strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this._strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this._strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this._strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out._strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out._strip();
  }

  function jumboMulTo (self, num, out) {
    // Temporary disable, see https://github.com/indutny/bn.js/issues/211
    // var fftm = new FFTM();
    // return fftm.mulp(self, num, out);
    return bigMulTo(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this._strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) ; else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this._strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this._strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) <= num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this._strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this._strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this._strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q._strip();
    }
    a._strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modrn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modrn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modrn = function modrn (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return isNegNum ? -acc : acc;
  };

  // WARNING: DEPRECATED
  BN.prototype.modn = function modn (num) {
    return this.modrn(num);
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    var isNegNum = num < 0;
    if (isNegNum) num = -num;

    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    this._strip();
    return isNegNum ? this.ineg() : this;
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this._strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is a BN v4 instance
        r.strip();
      } else {
        // r is a BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);

    move(a, a.umod(this.m)._forceRed(this));
    return a;
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(module, commonjsGlobal);
}(bn));

var BN$9 = bn.exports;

var safeBuffer = {exports: {}};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

(function (module, exports) {
/* eslint-disable node/no-deprecated-api */
var buffer = require$$0$3;
var Buffer = buffer.Buffer;

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype);

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
};
}(safeBuffer, safeBuffer.exports));

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore
var _Buffer = safeBuffer.exports.Buffer;
function base$1 (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
  function encode (source) {
    if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source); }
    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    var b58 = new Uint8Array(size);
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin];
            // Apply "b58 = b58 * 256 + ch".
      var i = 0;
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0;
        b58[it1] = (carry % BASE) >>> 0;
        carry = (carry / BASE) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      pbegin++;
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]); }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return _Buffer.alloc(0) }
    var psz = 0;
        // Skip and count leading '1's.
    var zeroes = 0;
    var length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size);
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)];
            // Invalid character
      if (carry === 255) { return }
      var i = 0;
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0;
        b256[it3] = (carry % 256) >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      psz++;
    }
        // Skip leading zeroes in b256.
    var it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
    vch.fill(0x00, 0, zeroes);
    var j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string);
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
var src = base$1;

var basex = src;
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

var bs58 = basex(ALPHABET);

var bs58$1 = bs58;

var hash$3 = {};

var utils$m = {};

var minimalisticAssert = assert$i;

function assert$i(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert$i.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var assert$h = minimalisticAssert;
var inherits$4 = inherits_browser.exports;

utils$m.inherits = inherits$4;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
utils$m.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils$m.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
utils$m.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
utils$m.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils$m.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
utils$m.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert$h(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
utils$m.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
utils$m.split32 = split32;

function rotr32$1(w, b) {
  return (w >>> b) | (w << (32 - b));
}
utils$m.rotr32 = rotr32$1;

function rotl32$2(w, b) {
  return (w << b) | (w >>> (32 - b));
}
utils$m.rotl32 = rotl32$2;

function sum32$3(a, b) {
  return (a + b) >>> 0;
}
utils$m.sum32 = sum32$3;

function sum32_3$1(a, b, c) {
  return (a + b + c) >>> 0;
}
utils$m.sum32_3 = sum32_3$1;

function sum32_4$2(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
utils$m.sum32_4 = sum32_4$2;

function sum32_5$2(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
utils$m.sum32_5 = sum32_5$2;

function sum64$1(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
utils$m.sum64 = sum64$1;

function sum64_hi$1(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
utils$m.sum64_hi = sum64_hi$1;

function sum64_lo$1(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
utils$m.sum64_lo = sum64_lo$1;

function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
utils$m.sum64_4_hi = sum64_4_hi$1;

function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
utils$m.sum64_4_lo = sum64_4_lo$1;

function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
utils$m.sum64_5_hi = sum64_5_hi$1;

function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
utils$m.sum64_5_lo = sum64_5_lo$1;

function rotr64_hi$1(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
utils$m.rotr64_hi = rotr64_hi$1;

function rotr64_lo$1(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
utils$m.rotr64_lo = rotr64_lo$1;

function shr64_hi$1(ah, al, num) {
  return ah >>> num;
}
utils$m.shr64_hi = shr64_hi$1;

function shr64_lo$1(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
utils$m.shr64_lo = shr64_lo$1;

var common$5 = {};

var utils$l = utils$m;
var assert$g = minimalisticAssert;

function BlockHash$4() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
common$5.BlockHash = BlockHash$4;

BlockHash$4.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils$l.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils$l.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash$4.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert$g(this.pending === null);

  return this._digest(enc);
};

BlockHash$4.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};

var sha = {};

var common$4 = {};

var utils$k = utils$m;
var rotr32 = utils$k.rotr32;

function ft_1$1(s, x, y, z) {
  if (s === 0)
    return ch32$1(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32$1(x, y, z);
}
common$4.ft_1 = ft_1$1;

function ch32$1(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
common$4.ch32 = ch32$1;

function maj32$1(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
common$4.maj32 = maj32$1;

function p32(x, y, z) {
  return x ^ y ^ z;
}
common$4.p32 = p32;

function s0_256$1(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
common$4.s0_256 = s0_256$1;

function s1_256$1(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
common$4.s1_256 = s1_256$1;

function g0_256$1(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
common$4.g0_256 = g0_256$1;

function g1_256$1(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
common$4.g1_256 = g1_256$1;

var utils$j = utils$m;
var common$3 = common$5;
var shaCommon$1 = common$4;

var rotl32$1 = utils$j.rotl32;
var sum32$2 = utils$j.sum32;
var sum32_5$1 = utils$j.sum32_5;
var ft_1 = shaCommon$1.ft_1;
var BlockHash$3 = common$3.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash$3.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils$j.inherits(SHA1, BlockHash$3);
var _1 = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32$1(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32$2(this.h[0], a);
  this.h[1] = sum32$2(this.h[1], b);
  this.h[2] = sum32$2(this.h[2], c);
  this.h[3] = sum32$2(this.h[3], d);
  this.h[4] = sum32$2(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$j.toHex32(this.h, 'big');
  else
    return utils$j.split32(this.h, 'big');
};

var utils$i = utils$m;
var common$2 = common$5;
var shaCommon = common$4;
var assert$f = minimalisticAssert;

var sum32$1 = utils$i.sum32;
var sum32_4$1 = utils$i.sum32_4;
var sum32_5 = utils$i.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash$2 = common$2.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256$1() {
  if (!(this instanceof SHA256$1))
    return new SHA256$1();

  BlockHash$2.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils$i.inherits(SHA256$1, BlockHash$2);
var _256 = SHA256$1;

SHA256$1.blockSize = 512;
SHA256$1.outSize = 256;
SHA256$1.hmacStrength = 192;
SHA256$1.padLength = 64;

SHA256$1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert$f(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32$1(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$1(T1, T2);
  }

  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
  this.h[5] = sum32$1(this.h[5], f);
  this.h[6] = sum32$1(this.h[6], g);
  this.h[7] = sum32$1(this.h[7], h);
};

SHA256$1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$i.toHex32(this.h, 'big');
  else
    return utils$i.split32(this.h, 'big');
};

var utils$h = utils$m;
var SHA256 = _256;

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils$h.inherits(SHA224, SHA256);
var _224 = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils$h.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils$h.split32(this.h.slice(0, 7), 'big');
};

var utils$g = utils$m;
var common$1 = common$5;
var assert$e = minimalisticAssert;

var rotr64_hi = utils$g.rotr64_hi;
var rotr64_lo = utils$g.rotr64_lo;
var shr64_hi = utils$g.shr64_hi;
var shr64_lo = utils$g.shr64_lo;
var sum64 = utils$g.sum64;
var sum64_hi = utils$g.sum64_hi;
var sum64_lo = utils$g.sum64_lo;
var sum64_4_hi = utils$g.sum64_4_hi;
var sum64_4_lo = utils$g.sum64_4_lo;
var sum64_5_hi = utils$g.sum64_5_hi;
var sum64_5_lo = utils$g.sum64_5_lo;

var BlockHash$1 = common$1.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512$1() {
  if (!(this instanceof SHA512$1))
    return new SHA512$1();

  BlockHash$1.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils$g.inherits(SHA512$1, BlockHash$1);
var _512 = SHA512$1;

SHA512$1.blockSize = 1024;
SHA512$1.outSize = 512;
SHA512$1.hmacStrength = 192;
SHA512$1.padLength = 128;

SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512$1.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert$e(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512$1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$g.toHex32(this.h, 'big');
  else
    return utils$g.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

var utils$f = utils$m;

var SHA512 = _512;

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils$f.inherits(SHA384, SHA512);
var _384 = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$f.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils$f.split32(this.h.slice(0, 12), 'big');
};

sha.sha1 = _1;
sha.sha224 = _224;
sha.sha256 = _256;
sha.sha384 = _384;
sha.sha512 = _512;

var ripemd = {};

var utils$e = utils$m;
var common = common$5;

var rotl32 = utils$e.rotl32;
var sum32 = utils$e.sum32;
var sum32_3 = utils$e.sum32_3;
var sum32_4 = utils$e.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils$e.inherits(RIPEMD160, BlockHash);
ripemd.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f$1(j, B, C, D), msg[r$1[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f$1(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$e.toHex32(this.h, 'little');
  else
    return utils$e.split32(this.h, 'little');
};

function f$1(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r$1 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

var utils$d = utils$m;
var assert$d = minimalisticAssert;

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils$d.toArray(key, enc));
}
var hmac = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert$d(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};

(function (exports) {
var hash = exports;

hash.utils = utils$m;
hash.common = common$5;
hash.sha = sha;
hash.ripemd = ripemd;
hash.hmac = hmac;

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;
}(hash$3));

var hash$2 = hash$3;

const version$4 = "logger/5.6.0";

let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
    try {
        const missing = [];
        // Make sure all forms of normalization are supported
        ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
            try {
                if ("test".normalize(form) !== "test") {
                    throw new Error("bad normalize");
                }
                ;
            }
            catch (error) {
                missing.push(form);
            }
        });
        if (missing.length) {
            throw new Error("missing " + missing.join(", "));
        }
        if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
            throw new Error("broken implementation");
        }
    }
    catch (error) {
        return error.message;
    }
    return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function (ErrorCode) {
    ///////////////////
    // Generic Errors
    // Unknown Error
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    // Not Implemented
    ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    // Unsupported Operation
    //   - operation
    ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
    //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
    ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    // Some sort of bad response from the server
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    // Timeout
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ///////////////////
    // Operational  Errors
    // Buffer Overrun
    ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    // Numeric Fault
    //   - operation: the operation being executed
    //   - fault: the reason this faulted
    ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ///////////////////
    // Argument Errors
    // Missing new operator to an object
    //  - name: The name of the class
    ErrorCode["MISSING_NEW"] = "MISSING_NEW";
    // Invalid argument (e.g. value is incompatible with type) to a function:
    //   - argument: The argument name that was invalid
    //   - value: The value of the argument
    ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    // Missing argument to a function:
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ///////////////////
    // Blockchain Errors
    // Call exception
    //  - transaction: the transaction
    //  - address?: the contract address
    //  - args?: The arguments passed into the function
    //  - method?: The Solidity method signature
    //  - errorSignature?: The EIP848 error signature
    //  - errorArgs?: The EIP848 error parameters
    //  - reason: The reason (only for EIP848 "Error(string)")
    ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    // Insufficient funds (< value + gasLimit * gasPrice)
    //   - transaction: the transaction attempted
    ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    // Nonce has already been used
    //   - transaction: the transaction attempted
    ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    // The replacement fee for the transaction is too low
    //   - transaction: the transaction attempted
    ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    // The gas limit could not be estimated
    //   - transaction: the transaction passed to estimateGas
    ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    // The transaction was replaced by one with a higher gas price
    //   - reason: "cancelled", "replaced" or "repriced"
    //   - cancelled: true if reason == "cancelled" or reason == "replaced")
    //   - hash: original transaction hash
    //   - replacement: the full TransactionsResponse for the replacement
    //   - receipt: the receipt of the replacement
    ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
})(ErrorCode || (ErrorCode = {}));
const HEX = "0123456789abcdef";
class Logger {
    constructor(version) {
        Object.defineProperty(this, "version", {
            enumerable: true,
            value: version,
            writable: false
        });
    }
    _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
            this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
            return;
        }
        console.log.apply(console, args);
    }
    debug(...args) {
        this._log(Logger.levels.DEBUG, args);
    }
    info(...args) {
        this._log(Logger.levels.INFO, args);
    }
    warn(...args) {
        this._log(Logger.levels.WARNING, args);
    }
    makeError(message, code, params) {
        // Errors are being censored
        if (_censorErrors) {
            return this.makeError("censored error", code, {});
        }
        if (!code) {
            code = Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
            params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key) => {
            const value = params[key];
            try {
                if (value instanceof Uint8Array) {
                    let hex = "";
                    for (let i = 0; i < value.length; i++) {
                        hex += HEX[value[i] >> 4];
                        hex += HEX[value[i] & 0x0f];
                    }
                    messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                }
                else {
                    messageDetails.push(key + "=" + JSON.stringify(value));
                }
            }
            catch (error) {
                messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
            }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch (code) {
            case ErrorCode.NUMERIC_FAULT: {
                url = "NUMERIC_FAULT";
                const fault = message;
                switch (fault) {
                    case "overflow":
                    case "underflow":
                    case "division-by-zero":
                        url += "-" + fault;
                        break;
                    case "negative-power":
                    case "negative-width":
                        url += "-unsupported";
                        break;
                    case "unbound-bitwise-result":
                        url += "-unbound-result";
                        break;
                }
                break;
            }
            case ErrorCode.CALL_EXCEPTION:
            case ErrorCode.INSUFFICIENT_FUNDS:
            case ErrorCode.MISSING_NEW:
            case ErrorCode.NONCE_EXPIRED:
            case ErrorCode.REPLACEMENT_UNDERPRICED:
            case ErrorCode.TRANSACTION_REPLACED:
            case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
                url = code;
                break;
        }
        if (url) {
            message += " [ See: https:/\/links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
            message += " (" + messageDetails.join(", ") + ")";
        }
        // @TODO: Any??
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function (key) {
            error[key] = params[key];
        });
        return error;
    }
    throwError(message, code, params) {
        throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name, value) {
        return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
            argument: name,
            value: value
        });
    }
    assert(condition, message, code, params) {
        if (!!condition) {
            return;
        }
        this.throwError(message, code, params);
    }
    assertArgument(condition, message, name, value) {
        if (!!condition) {
            return;
        }
        this.throwArgumentError(message, name, value);
    }
    checkNormalize(message) {
        if (_normalizeError) {
            this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "String.prototype.normalize", form: _normalizeError
            });
        }
    }
    checkSafeUint53(value, message) {
        if (typeof (value) !== "number") {
            return;
        }
        if (message == null) {
            message = "value not safe";
        }
        if (value < 0 || value >= 0x1fffffffffffff) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: value
            });
        }
        if (value % 1) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: value
            });
        }
    }
    checkArgumentCount(count, expectedCount, message) {
        if (message) {
            message = ": " + message;
        }
        else {
            message = "";
        }
        if (count < expectedCount) {
            this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
        if (count > expectedCount) {
            this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
    }
    checkNew(target, kind) {
        if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    checkAbstract(target, kind) {
        if (target === kind) {
            this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        }
        else if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    static globalLogger() {
        if (!_globalLogger) {
            _globalLogger = new Logger(version$4);
        }
        return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
            this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        if (_permanentCensorErrors) {
            if (!censorship) {
                return;
            }
            this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
            Logger.globalLogger().warn("invalid log level - " + logLevel);
            return;
        }
        _logLevel = level;
    }
    static from(version) {
        return new Logger(version);
    }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel;

const version$3 = "bytes/5.6.0";

const logger = new Logger(version$3);
///////////////////////////////
function isHexable(value) {
    return !!(value.toHexString);
}
function addSlice(array) {
    if (array.slice) {
        return array;
    }
    array.slice = function () {
        const args = Array.prototype.slice.call(arguments);
        return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
    };
    return array;
}
function isInteger(value) {
    return (typeof (value) === "number" && value == value && (value % 1) === 0);
}
function isBytes(value) {
    if (value == null) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    if (typeof (value) === "string") {
        return false;
    }
    if (!isInteger(value.length) || value.length < 0) {
        return false;
    }
    for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) {
            return false;
        }
    }
    return true;
}
function arrayify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof (value) === "number") {
        logger.checkSafeUint53(value, "invalid arrayify value");
        const result = [];
        while (value) {
            result.unshift(value & 0xff);
            value = parseInt(String(value / 256));
        }
        if (result.length === 0) {
            result.push(0);
        }
        return addSlice(new Uint8Array(result));
    }
    if (options.allowMissingPrefix && typeof (value) === "string" && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }
    if (isHexable(value)) {
        value = value.toHexString();
    }
    if (isHexString(value)) {
        let hex = value.substring(2);
        if (hex.length % 2) {
            if (options.hexPad === "left") {
                hex = "0x0" + hex.substring(2);
            }
            else if (options.hexPad === "right") {
                hex += "0";
            }
            else {
                logger.throwArgumentError("hex data is odd-length", "value", value);
            }
        }
        const result = [];
        for (let i = 0; i < hex.length; i += 2) {
            result.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return addSlice(new Uint8Array(result));
    }
    if (isBytes(value)) {
        return addSlice(new Uint8Array(value));
    }
    return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function isHexString(value, length) {
    if (typeof (value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}

const version$2 = "sha2/5.6.0";

new Logger(version$2);
function sha256(data) {
    return "0x" + (hash$2.sha256().update(arrayify(data)).digest("hex"));
}

var lib$1 = {};

var encoding_lib = {};

// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

//
// Utilities
//

/**
 * @param {number} a The number to test.
 * @param {number} min The minimum value in the range, inclusive.
 * @param {number} max The maximum value in the range, inclusive.
 * @return {boolean} True if a >= min and a <= max.
 */
function inRange(a, min, max) {
  return min <= a && a <= max;
}

/**
 * @param {*} o
 * @return {Object}
 */
function ToDictionary(o) {
  if (o === undefined) return {};
  if (o === Object(o)) return o;
  throw TypeError('Could not convert argument to dictionary');
}

/**
 * @param {string} string Input string of UTF-16 code units.
 * @return {!Array.<number>} Code points.
 */
function stringToCodePoints(string) {
  // https://heycam.github.io/webidl/#dfn-obtain-unicode

  // 1. Let S be the DOMString value.
  var s = String(string);

  // 2. Let n be the length of S.
  var n = s.length;

  // 3. Initialize i to 0.
  var i = 0;

  // 4. Initialize U to be an empty sequence of Unicode characters.
  var u = [];

  // 5. While i < n:
  while (i < n) {

    // 1. Let c be the code unit in S at index i.
    var c = s.charCodeAt(i);

    // 2. Depending on the value of c:

    // c < 0xD800 or c > 0xDFFF
    if (c < 0xD800 || c > 0xDFFF) {
      // Append to U the Unicode character with code point c.
      u.push(c);
    }

    // 0xDC00 ≤ c ≤ 0xDFFF
    else if (0xDC00 <= c && c <= 0xDFFF) {
      // Append to U a U+FFFD REPLACEMENT CHARACTER.
      u.push(0xFFFD);
    }

    // 0xD800 ≤ c ≤ 0xDBFF
    else if (0xD800 <= c && c <= 0xDBFF) {
      // 1. If i = n−1, then append to U a U+FFFD REPLACEMENT
      // CHARACTER.
      if (i === n - 1) {
        u.push(0xFFFD);
      }
      // 2. Otherwise, i < n−1:
      else {
        // 1. Let d be the code unit in S at index i+1.
        var d = string.charCodeAt(i + 1);

        // 2. If 0xDC00 ≤ d ≤ 0xDFFF, then:
        if (0xDC00 <= d && d <= 0xDFFF) {
          // 1. Let a be c & 0x3FF.
          var a = c & 0x3FF;

          // 2. Let b be d & 0x3FF.
          var b = d & 0x3FF;

          // 3. Append to U the Unicode character with code point
          // 2^16+2^10*a+b.
          u.push(0x10000 + (a << 10) + b);

          // 4. Set i to i+1.
          i += 1;
        }

        // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
        // U+FFFD REPLACEMENT CHARACTER.
        else  {
          u.push(0xFFFD);
        }
      }
    }

    // 3. Set i to i+1.
    i += 1;
  }

  // 6. Return U.
  return u;
}

/**
 * @param {!Array.<number>} code_points Array of code points.
 * @return {string} string String of UTF-16 code units.
 */
function codePointsToString(code_points) {
  var s = '';
  for (var i = 0; i < code_points.length; ++i) {
    var cp = code_points[i];
    if (cp <= 0xFFFF) {
      s += String.fromCharCode(cp);
    } else {
      cp -= 0x10000;
      s += String.fromCharCode((cp >> 10) + 0xD800,
                               (cp & 0x3FF) + 0xDC00);
    }
  }
  return s;
}


//
// Implementation of Encoding specification
// https://encoding.spec.whatwg.org/
//

//
// 3. Terminology
//

/**
 * End-of-stream is a special token that signifies no more tokens
 * are in the stream.
 * @const
 */ var end_of_stream = -1;

/**
 * A stream represents an ordered sequence of tokens.
 *
 * @constructor
 * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide the
 * stream.
 */
function Stream(tokens) {
  /** @type {!Array.<number>} */
  this.tokens = [].slice.call(tokens);
}

Stream.prototype = {
  /**
   * @return {boolean} True if end-of-stream has been hit.
   */
  endOfStream: function() {
    return !this.tokens.length;
  },

  /**
   * When a token is read from a stream, the first token in the
   * stream must be returned and subsequently removed, and
   * end-of-stream must be returned otherwise.
   *
   * @return {number} Get the next token from the stream, or
   * end_of_stream.
   */
   read: function() {
    if (!this.tokens.length)
      return end_of_stream;
     return this.tokens.shift();
   },

  /**
   * When one or more tokens are prepended to a stream, those tokens
   * must be inserted, in given order, before the first token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
   */
  prepend: function(token) {
    if (Array.isArray(token)) {
      var tokens = /**@type {!Array.<number>}*/(token);
      while (tokens.length)
        this.tokens.unshift(tokens.pop());
    } else {
      this.tokens.unshift(token);
    }
  },

  /**
   * When one or more tokens are pushed to a stream, those tokens
   * must be inserted, in given order, after the last token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
   */
  push: function(token) {
    if (Array.isArray(token)) {
      var tokens = /**@type {!Array.<number>}*/(token);
      while (tokens.length)
        this.tokens.push(tokens.shift());
    } else {
      this.tokens.push(token);
    }
  }
};

//
// 4. Encodings
//

// 4.1 Encoders and decoders

/** @const */
var finished = -1;

/**
 * @param {boolean} fatal If true, decoding errors raise an exception.
 * @param {number=} opt_code_point Override the standard fallback code point.
 * @return {number} The code point to insert on a decoding error.
 */
function decoderError(fatal, opt_code_point) {
  if (fatal)
    throw TypeError('Decoder error');
  return opt_code_point || 0xFFFD;
}

//
// 7. API
//

/** @const */ var DEFAULT_ENCODING = 'utf-8';

// 7.1 Interface TextDecoder

/**
 * @constructor
 * @param {string=} encoding The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
function TextDecoder$1(encoding, options) {
  if (!(this instanceof TextDecoder$1)) {
    return new TextDecoder$1(encoding, options);
  }
  encoding = encoding !== undefined ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error('Encoding not supported. Only utf-8 is supported');
  }
  options = ToDictionary(options);

  /** @private @type {boolean} */
  this._streaming = false;
  /** @private @type {boolean} */
  this._BOMseen = false;
  /** @private @type {?Decoder} */
  this._decoder = null;
  /** @private @type {boolean} */
  this._fatal = Boolean(options['fatal']);
  /** @private @type {boolean} */
  this._ignoreBOM = Boolean(options['ignoreBOM']);

  Object.defineProperty(this, 'encoding', {value: 'utf-8'});
  Object.defineProperty(this, 'fatal', {value: this._fatal});
  Object.defineProperty(this, 'ignoreBOM', {value: this._ignoreBOM});
}

TextDecoder$1.prototype = {
  /**
   * @param {ArrayBufferView=} input The buffer of bytes to decode.
   * @param {Object=} options
   * @return {string} The decoded string.
   */
  decode: function decode(input, options) {
    var bytes;
    if (typeof input === 'object' && input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (typeof input === 'object' && 'buffer' in input &&
               input.buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(input.buffer,
                             input.byteOffset,
                             input.byteLength);
    } else {
      bytes = new Uint8Array(0);
    }

    options = ToDictionary(options);

    if (!this._streaming) {
      this._decoder = new UTF8Decoder({fatal: this._fatal});
      this._BOMseen = false;
    }
    this._streaming = Boolean(options['stream']);

    var input_stream = new Stream(bytes);

    var code_points = [];

    /** @type {?(number|!Array.<number>)} */
    var result;

    while (!input_stream.endOfStream()) {
      result = this._decoder.handler(input_stream, input_stream.read());
      if (result === finished)
        break;
      if (result === null)
        continue;
      if (Array.isArray(result))
        code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
      else
        code_points.push(result);
    }
    if (!this._streaming) {
      do {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (result === null)
          continue;
        if (Array.isArray(result))
          code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
        else
          code_points.push(result);
      } while (!input_stream.endOfStream());
      this._decoder = null;
    }

    if (code_points.length) {
      // If encoding is one of utf-8, utf-16be, and utf-16le, and
      // ignore BOM flag and BOM seen flag are unset, run these
      // subsubsteps:
      if (['utf-8'].indexOf(this.encoding) !== -1 &&
          !this._ignoreBOM && !this._BOMseen) {
        // If token is U+FEFF, set BOM seen flag.
        if (code_points[0] === 0xFEFF) {
          this._BOMseen = true;
          code_points.shift();
        } else {
          // Otherwise, if token is not end-of-stream, set BOM seen
          // flag and append token to output.
          this._BOMseen = true;
        }
      }
    }

    return codePointsToString(code_points);
  }
};

// 7.2 Interface TextEncoder

/**
 * @constructor
 * @param {string=} encoding The label of the encoding;
 *     defaults to 'utf-8'.
 * @param {Object=} options
 */
function TextEncoder$1(encoding, options) {
  if (!(this instanceof TextEncoder$1))
    return new TextEncoder$1(encoding, options);
  encoding = encoding !== undefined ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
  if (encoding !== DEFAULT_ENCODING) {
    throw new Error('Encoding not supported. Only utf-8 is supported');
  }
  options = ToDictionary(options);

  /** @private @type {boolean} */
  this._streaming = false;
  /** @private @type {?Encoder} */
  this._encoder = null;
  /** @private @type {{fatal: boolean}} */
  this._options = {fatal: Boolean(options['fatal'])};

  Object.defineProperty(this, 'encoding', {value: 'utf-8'});
}

TextEncoder$1.prototype = {
  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {Uint8Array} Encoded bytes, as a Uint8Array.
   */
  encode: function encode(opt_string, options) {
    opt_string = opt_string ? String(opt_string) : '';
    options = ToDictionary(options);

    // NOTE: This option is nonstandard. None of the encodings
    // permitted for encoding (i.e. UTF-8, UTF-16) are stateful,
    // so streaming is not necessary.
    if (!this._streaming)
      this._encoder = new UTF8Encoder(this._options);
    this._streaming = Boolean(options['stream']);

    var bytes = [];
    var input_stream = new Stream(stringToCodePoints(opt_string));
    /** @type {?(number|!Array.<number>)} */
    var result;
    while (!input_stream.endOfStream()) {
      result = this._encoder.handler(input_stream, input_stream.read());
      if (result === finished)
        break;
      if (Array.isArray(result))
        bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
      else
        bytes.push(result);
    }
    if (!this._streaming) {
      while (true) {
        result = this._encoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (Array.isArray(result))
          bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
        else
          bytes.push(result);
      }
      this._encoder = null;
    }
    return new Uint8Array(bytes);
  }
};

//
// 8. The encoding
//

// 8.1 utf-8

/**
 * @constructor
 * @implements {Decoder}
 * @param {{fatal: boolean}} options
 */
function UTF8Decoder(options) {
  var fatal = options.fatal;

  // utf-8's decoder's has an associated utf-8 code point, utf-8
  // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
  // lower boundary (initially 0x80), and a utf-8 upper boundary
  // (initially 0xBF).
  var /** @type {number} */ utf8_code_point = 0,
      /** @type {number} */ utf8_bytes_seen = 0,
      /** @type {number} */ utf8_bytes_needed = 0,
      /** @type {number} */ utf8_lower_boundary = 0x80,
      /** @type {number} */ utf8_upper_boundary = 0xBF;

  /**
   * @param {Stream} stream The stream of bytes being decoded.
   * @param {number} bite The next byte read from the stream.
   * @return {?(number|!Array.<number>)} The next code point(s)
   *     decoded, or null if not enough data exists in the input
   *     stream to decode a complete code point.
   */
  this.handler = function(stream, bite) {
    // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
    // set utf-8 bytes needed to 0 and return error.
    if (bite === end_of_stream && utf8_bytes_needed !== 0) {
      utf8_bytes_needed = 0;
      return decoderError(fatal);
    }

    // 2. If byte is end-of-stream, return finished.
    if (bite === end_of_stream)
      return finished;

    // 3. If utf-8 bytes needed is 0, based on byte:
    if (utf8_bytes_needed === 0) {

      // 0x00 to 0x7F
      if (inRange(bite, 0x00, 0x7F)) {
        // Return a code point whose value is byte.
        return bite;
      }

      // 0xC2 to 0xDF
      if (inRange(bite, 0xC2, 0xDF)) {
        // Set utf-8 bytes needed to 1 and utf-8 code point to byte
        // − 0xC0.
        utf8_bytes_needed = 1;
        utf8_code_point = bite - 0xC0;
      }

      // 0xE0 to 0xEF
      else if (inRange(bite, 0xE0, 0xEF)) {
        // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
        if (bite === 0xE0)
          utf8_lower_boundary = 0xA0;
        // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
        if (bite === 0xED)
          utf8_upper_boundary = 0x9F;
        // 3. Set utf-8 bytes needed to 2 and utf-8 code point to
        // byte − 0xE0.
        utf8_bytes_needed = 2;
        utf8_code_point = bite - 0xE0;
      }

      // 0xF0 to 0xF4
      else if (inRange(bite, 0xF0, 0xF4)) {
        // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
        if (bite === 0xF0)
          utf8_lower_boundary = 0x90;
        // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
        if (bite === 0xF4)
          utf8_upper_boundary = 0x8F;
        // 3. Set utf-8 bytes needed to 3 and utf-8 code point to
        // byte − 0xF0.
        utf8_bytes_needed = 3;
        utf8_code_point = bite - 0xF0;
      }

      // Otherwise
      else {
        // Return error.
        return decoderError(fatal);
      }

      // Then (byte is in the range 0xC2 to 0xF4) set utf-8 code
      // point to utf-8 code point << (6 × utf-8 bytes needed) and
      // return continue.
      utf8_code_point = utf8_code_point << (6 * utf8_bytes_needed);
      return null;
    }

    // 4. If byte is not in the range utf-8 lower boundary to utf-8
    // upper boundary, run these substeps:
    if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {

      // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
      // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
      // utf-8 upper boundary to 0xBF.
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xBF;

      // 2. Prepend byte to stream.
      stream.prepend(bite);

      // 3. Return error.
      return decoderError(fatal);
    }

    // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
    // to 0xBF.
    utf8_lower_boundary = 0x80;
    utf8_upper_boundary = 0xBF;

    // 6. Increase utf-8 bytes seen by one and set utf-8 code point
    // to utf-8 code point + (byte − 0x80) << (6 × (utf-8 bytes
    // needed − utf-8 bytes seen)).
    utf8_bytes_seen += 1;
    utf8_code_point += (bite - 0x80) << (6 * (utf8_bytes_needed - utf8_bytes_seen));

    // 7. If utf-8 bytes seen is not equal to utf-8 bytes needed,
    // continue.
    if (utf8_bytes_seen !== utf8_bytes_needed)
      return null;

    // 8. Let code point be utf-8 code point.
    var code_point = utf8_code_point;

    // 9. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
    // seen to 0.
    utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;

    // 10. Return a code point whose value is code point.
    return code_point;
  };
}

/**
 * @constructor
 * @implements {Encoder}
 * @param {{fatal: boolean}} options
 */
function UTF8Encoder(options) {
  options.fatal;
  /**
   * @param {Stream} stream Input stream.
   * @param {number} code_point Next code point read from the stream.
   * @return {(number|!Array.<number>)} Byte(s) to emit.
   */
  this.handler = function(stream, code_point) {
    // 1. If code point is end-of-stream, return finished.
    if (code_point === end_of_stream)
      return finished;

    // 2. If code point is in the range U+0000 to U+007F, return a
    // byte whose value is code point.
    if (inRange(code_point, 0x0000, 0x007f))
      return code_point;

    // 3. Set count and offset based on the range code point is in:
    var count, offset;
    // U+0080 to U+07FF:    1 and 0xC0
    if (inRange(code_point, 0x0080, 0x07FF)) {
      count = 1;
      offset = 0xC0;
    }
    // U+0800 to U+FFFF:    2 and 0xE0
    else if (inRange(code_point, 0x0800, 0xFFFF)) {
      count = 2;
      offset = 0xE0;
    }
    // U+10000 to U+10FFFF: 3 and 0xF0
    else if (inRange(code_point, 0x10000, 0x10FFFF)) {
      count = 3;
      offset = 0xF0;
    }

    // 4.Let bytes be a byte sequence whose first byte is (code
    // point >> (6 × count)) + offset.
    var bytes = [(code_point >> (6 * count)) + offset];

    // 5. Run these substeps while count is greater than 0:
    while (count > 0) {

      // 1. Set temp to code point >> (6 × (count − 1)).
      var temp = code_point >> (6 * (count - 1));

      // 2. Append to bytes 0x80 | (temp & 0x3F).
      bytes.push(0x80 | (temp & 0x3F));

      // 3. Decrease count by one.
      count -= 1;
    }

    // 6. Return bytes bytes, in order.
    return bytes;
  };
}

encoding_lib.TextEncoder = TextEncoder$1;
encoding_lib.TextDecoder = TextDecoder$1;

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(lib$1, "__esModule", { value: true });
var deserializeUnchecked_1 = lib$1.deserializeUnchecked = deserialize_1 = lib$1.deserialize = serialize_1 = lib$1.serialize = lib$1.BinaryReader = lib$1.BinaryWriter = lib$1.BorshError = lib$1.baseDecode = lib$1.baseEncode = void 0;
const bn_js_1 = __importDefault(bn.exports);
const bs58_1 = __importDefault(bs58);
// TODO: Make sure this polyfill not included when not required
const encoding = __importStar(encoding_lib);
const ResolvedTextDecoder = typeof TextDecoder !== "function" ? encoding.TextDecoder : TextDecoder;
const textDecoder = new ResolvedTextDecoder("utf-8", { fatal: true });
function baseEncode(value) {
    if (typeof value === "string") {
        value = Buffer.from(value, "utf8");
    }
    return bs58_1.default.encode(Buffer.from(value));
}
lib$1.baseEncode = baseEncode;
function baseDecode(value) {
    return Buffer.from(bs58_1.default.decode(value));
}
lib$1.baseDecode = baseDecode;
const INITIAL_LENGTH = 1024;
class BorshError extends Error {
    constructor(message) {
        super(message);
        this.fieldPath = [];
        this.originalMessage = message;
    }
    addToFieldPath(fieldName) {
        this.fieldPath.splice(0, 0, fieldName);
        // NOTE: Modifying message directly as jest doesn't use .toString()
        this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
}
lib$1.BorshError = BorshError;
/// Binary encoder.
class BinaryWriter {
    constructor() {
        this.buf = Buffer.alloc(INITIAL_LENGTH);
        this.length = 0;
    }
    maybeResize() {
        if (this.buf.length < 16 + this.length) {
            this.buf = Buffer.concat([this.buf, Buffer.alloc(INITIAL_LENGTH)]);
        }
    }
    writeU8(value) {
        this.maybeResize();
        this.buf.writeUInt8(value, this.length);
        this.length += 1;
    }
    writeU16(value) {
        this.maybeResize();
        this.buf.writeUInt16LE(value, this.length);
        this.length += 2;
    }
    writeU32(value) {
        this.maybeResize();
        this.buf.writeUInt32LE(value, this.length);
        this.length += 4;
    }
    writeU64(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 8)));
    }
    writeU128(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 16)));
    }
    writeU256(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 32)));
    }
    writeU512(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 64)));
    }
    writeBuffer(buffer) {
        // Buffer.from is needed as this.buf.subarray can return plain Uint8Array in browser
        this.buf = Buffer.concat([
            Buffer.from(this.buf.subarray(0, this.length)),
            buffer,
            Buffer.alloc(INITIAL_LENGTH),
        ]);
        this.length += buffer.length;
    }
    writeString(str) {
        this.maybeResize();
        const b = Buffer.from(str, "utf8");
        this.writeU32(b.length);
        this.writeBuffer(b);
    }
    writeFixedArray(array) {
        this.writeBuffer(Buffer.from(array));
    }
    writeArray(array, fn) {
        this.maybeResize();
        this.writeU32(array.length);
        for (const elem of array) {
            this.maybeResize();
            fn(elem);
        }
    }
    toArray() {
        return this.buf.subarray(0, this.length);
    }
}
lib$1.BinaryWriter = BinaryWriter;
function handlingRangeError(target, propertyKey, propertyDescriptor) {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args) {
        try {
            return originalMethod.apply(this, args);
        }
        catch (e) {
            if (e instanceof RangeError) {
                const code = e.code;
                if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(code) >= 0) {
                    throw new BorshError("Reached the end of buffer when deserializing");
                }
            }
            throw e;
        }
    };
}
class BinaryReader {
    constructor(buf) {
        this.buf = buf;
        this.offset = 0;
    }
    readU8() {
        const value = this.buf.readUInt8(this.offset);
        this.offset += 1;
        return value;
    }
    readU16() {
        const value = this.buf.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
    }
    readU32() {
        const value = this.buf.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
    }
    readU64() {
        const buf = this.readBuffer(8);
        return new bn_js_1.default(buf, "le");
    }
    readU128() {
        const buf = this.readBuffer(16);
        return new bn_js_1.default(buf, "le");
    }
    readU256() {
        const buf = this.readBuffer(32);
        return new bn_js_1.default(buf, "le");
    }
    readU512() {
        const buf = this.readBuffer(64);
        return new bn_js_1.default(buf, "le");
    }
    readBuffer(len) {
        if (this.offset + len > this.buf.length) {
            throw new BorshError(`Expected buffer length ${len} isn't within bounds`);
        }
        const result = this.buf.slice(this.offset, this.offset + len);
        this.offset += len;
        return result;
    }
    readString() {
        const len = this.readU32();
        const buf = this.readBuffer(len);
        try {
            // NOTE: Using TextDecoder to fail on invalid UTF-8
            return textDecoder.decode(buf);
        }
        catch (e) {
            throw new BorshError(`Error decoding UTF-8 string: ${e}`);
        }
    }
    readFixedArray(len) {
        return new Uint8Array(this.readBuffer(len));
    }
    readArray(fn) {
        const len = this.readU32();
        const result = Array();
        for (let i = 0; i < len; ++i) {
            result.push(fn());
        }
        return result;
    }
}
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU8", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU16", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU32", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU64", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU128", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU256", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readU512", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readString", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readFixedArray", null);
__decorate([
    handlingRangeError
], BinaryReader.prototype, "readArray", null);
lib$1.BinaryReader = BinaryReader;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function serializeField(schema, fieldName, value, fieldType, writer) {
    try {
        // TODO: Handle missing values properly (make sure they never result in just skipped write)
        if (typeof fieldType === "string") {
            writer[`write${capitalizeFirstLetter(fieldType)}`](value);
        }
        else if (fieldType instanceof Array) {
            if (typeof fieldType[0] === "number") {
                if (value.length !== fieldType[0]) {
                    throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`);
                }
                writer.writeFixedArray(value);
            }
            else if (fieldType.length === 2 && typeof fieldType[1] === "number") {
                if (value.length !== fieldType[1]) {
                    throw new BorshError(`Expecting byte array of length ${fieldType[1]}, but got ${value.length} bytes`);
                }
                for (let i = 0; i < fieldType[1]; i++) {
                    serializeField(schema, null, value[i], fieldType[0], writer);
                }
            }
            else {
                writer.writeArray(value, (item) => {
                    serializeField(schema, fieldName, item, fieldType[0], writer);
                });
            }
        }
        else if (fieldType.kind !== undefined) {
            switch (fieldType.kind) {
                case "option": {
                    if (value === null || value === undefined) {
                        writer.writeU8(0);
                    }
                    else {
                        writer.writeU8(1);
                        serializeField(schema, fieldName, value, fieldType.type, writer);
                    }
                    break;
                }
                case "map": {
                    writer.writeU32(value.size);
                    value.forEach((val, key) => {
                        serializeField(schema, fieldName, key, fieldType.key, writer);
                        serializeField(schema, fieldName, val, fieldType.value, writer);
                    });
                    break;
                }
                default:
                    throw new BorshError(`FieldType ${fieldType} unrecognized`);
            }
        }
        else {
            serializeStruct(schema, value, writer);
        }
    }
    catch (error) {
        if (error instanceof BorshError) {
            error.addToFieldPath(fieldName);
        }
        throw error;
    }
}
function serializeStruct(schema, obj, writer) {
    if (typeof obj.borshSerialize === "function") {
        obj.borshSerialize(writer);
        return;
    }
    const structSchema = schema.get(obj.constructor);
    if (!structSchema) {
        throw new BorshError(`Class ${obj.constructor.name} is missing in schema`);
    }
    if (structSchema.kind === "struct") {
        structSchema.fields.map(([fieldName, fieldType]) => {
            serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
        });
    }
    else if (structSchema.kind === "enum") {
        const name = obj[structSchema.field];
        for (let idx = 0; idx < structSchema.values.length; ++idx) {
            const [fieldName, fieldType] = structSchema.values[idx];
            if (fieldName === name) {
                writer.writeU8(idx);
                serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
                break;
            }
        }
    }
    else {
        throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`);
    }
}
/// Serialize given object using schema of the form:
/// { class_name -> [ [field_name, field_type], .. ], .. }
function serialize(schema, obj, Writer = BinaryWriter) {
    const writer = new Writer();
    serializeStruct(schema, obj, writer);
    return writer.toArray();
}
var serialize_1 = lib$1.serialize = serialize;
function deserializeField(schema, fieldName, fieldType, reader) {
    try {
        if (typeof fieldType === "string") {
            return reader[`read${capitalizeFirstLetter(fieldType)}`]();
        }
        if (fieldType instanceof Array) {
            if (typeof fieldType[0] === "number") {
                return reader.readFixedArray(fieldType[0]);
            }
            else if (typeof fieldType[1] === "number") {
                const arr = [];
                for (let i = 0; i < fieldType[1]; i++) {
                    arr.push(deserializeField(schema, null, fieldType[0], reader));
                }
                return arr;
            }
            else {
                return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader));
            }
        }
        if (fieldType.kind === "option") {
            const option = reader.readU8();
            if (option) {
                return deserializeField(schema, fieldName, fieldType.type, reader);
            }
            return undefined;
        }
        if (fieldType.kind === "map") {
            let map = new Map();
            const length = reader.readU32();
            for (let i = 0; i < length; i++) {
                const key = deserializeField(schema, fieldName, fieldType.key, reader);
                const val = deserializeField(schema, fieldName, fieldType.value, reader);
                map.set(key, val);
            }
            return map;
        }
        return deserializeStruct(schema, fieldType, reader);
    }
    catch (error) {
        if (error instanceof BorshError) {
            error.addToFieldPath(fieldName);
        }
        throw error;
    }
}
function deserializeStruct(schema, classType, reader) {
    if (typeof classType.borshDeserialize === "function") {
        return classType.borshDeserialize(reader);
    }
    const structSchema = schema.get(classType);
    if (!structSchema) {
        throw new BorshError(`Class ${classType.name} is missing in schema`);
    }
    if (structSchema.kind === "struct") {
        const result = {};
        for (const [fieldName, fieldType] of schema.get(classType).fields) {
            result[fieldName] = deserializeField(schema, fieldName, fieldType, reader);
        }
        return new classType(result);
    }
    if (structSchema.kind === "enum") {
        const idx = reader.readU8();
        if (idx >= structSchema.values.length) {
            throw new BorshError(`Enum index: ${idx} is out of range`);
        }
        const [fieldName, fieldType] = structSchema.values[idx];
        const fieldValue = deserializeField(schema, fieldName, fieldType, reader);
        return new classType({ [fieldName]: fieldValue });
    }
    throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${classType.constructor.name}`);
}
/// Deserializes object from bytes using schema.
function deserialize(schema, classType, buffer, Reader = BinaryReader) {
    const reader = new Reader(buffer);
    const result = deserializeStruct(schema, classType, reader);
    if (reader.offset < buffer.length) {
        throw new BorshError(`Unexpected ${buffer.length - reader.offset} bytes after deserialized data`);
    }
    return result;
}
var deserialize_1 = lib$1.deserialize = deserialize;
/// Deserializes object from bytes using schema, without checking the length read
function deserializeUnchecked(schema, classType, buffer, Reader = BinaryReader) {
    const reader = new Reader(buffer);
    return deserializeStruct(schema, classType, reader);
}
deserializeUnchecked_1 = lib$1.deserializeUnchecked = deserializeUnchecked;

class Struct$1 {
  constructor(properties) {
    Object.assign(this, properties);
  }

  encode() {
    return Buffer$1.from(serialize_1(SOLANA_SCHEMA, this));
  }

  static decode(data) {
    return deserialize_1(SOLANA_SCHEMA, this, data);
  }

  static decodeUnchecked(data) {
    return deserializeUnchecked_1(SOLANA_SCHEMA, this, data);
  }

} // Class representing a Rust-compatible enum, since enums are only strings or
// numbers in pure JS

class Enum extends Struct$1 {
  constructor(properties) {
    super(properties);
    this.enum = '';

    if (Object.keys(properties).length !== 1) {
      throw new Error('Enum can only take single value');
    }

    Object.keys(properties).map(key => {
      this.enum = key;
    });
  }

}
const SOLANA_SCHEMA = new Map();

/**
 * Maximum length of derived pubkey seed
 */

const MAX_SEED_LENGTH = 32;
/**
 * Value to be converted into public key
 */

function isPublicKeyData(value) {
  return value._bn !== undefined;
}
/**
 * A public key
 */


class PublicKey extends Struct$1 {
  /** @internal */

  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(value) {
    super({});
    this._bn = void 0;

    if (isPublicKeyData(value)) {
      this._bn = value._bn;
    } else {
      if (typeof value === 'string') {
        // assume base 58 encoding by default
        const decoded = bs58$1.decode(value);

        if (decoded.length != 32) {
          throw new Error(`Invalid public key input`);
        }

        this._bn = new BN$9(decoded);
      } else {
        this._bn = new BN$9(value);
      }

      if (this._bn.byteLength() > 32) {
        throw new Error(`Invalid public key input`);
      }
    }
  }
  /**
   * Default public key value. (All zeros)
   */


  /**
   * Checks if two publicKeys are equal
   */
  equals(publicKey) {
    return this._bn.eq(publicKey._bn);
  }
  /**
   * Return the base-58 representation of the public key
   */


  toBase58() {
    return bs58$1.encode(this.toBytes());
  }

  toJSON() {
    return this.toBase58();
  }
  /**
   * Return the byte array representation of the public key
   */


  toBytes() {
    return this.toBuffer();
  }
  /**
   * Return the Buffer representation of the public key
   */


  toBuffer() {
    const b = this._bn.toArrayLike(Buffer$1);

    if (b.length === 32) {
      return b;
    }

    const zeroPad = Buffer$1.alloc(32);
    b.copy(zeroPad, 32 - b.length);
    return zeroPad;
  }
  /**
   * Return the base-58 representation of the public key
   */


  toString() {
    return this.toBase58();
  }
  /**
   * Derive a public key from another key, a seed, and a program ID.
   * The program ID will also serve as the owner of the public key, giving
   * it permission to write data to the account.
   */

  /* eslint-disable require-await */


  static async createWithSeed(fromPublicKey, seed, programId) {
    const buffer = Buffer$1.concat([fromPublicKey.toBuffer(), Buffer$1.from(seed), programId.toBuffer()]);
    const hash = sha256(new Uint8Array(buffer)).slice(2);
    return new PublicKey(Buffer$1.from(hash, 'hex'));
  }
  /**
   * Derive a program address from seeds and a program ID.
   */

  /* eslint-disable require-await */


  static createProgramAddressSync(seeds, programId) {
    let buffer = Buffer$1.alloc(0);
    seeds.forEach(function (seed) {
      if (seed.length > MAX_SEED_LENGTH) {
        throw new TypeError(`Max seed length exceeded`);
      }

      buffer = Buffer$1.concat([buffer, toBuffer(seed)]);
    });
    buffer = Buffer$1.concat([buffer, programId.toBuffer(), Buffer$1.from('ProgramDerivedAddress')]);
    let hash = sha256(new Uint8Array(buffer)).slice(2);
    let publicKeyBytes = new BN$9(hash, 16).toArray(undefined, 32);

    if (is_on_curve(publicKeyBytes)) {
      throw new Error(`Invalid seeds, address must fall off the curve`);
    }

    return new PublicKey(publicKeyBytes);
  }
  /**
   * Async version of createProgramAddressSync
   * For backwards compatibility
   */

  /* eslint-disable require-await */


  static async createProgramAddress(seeds, programId) {
    return this.createProgramAddressSync(seeds, programId);
  }
  /**
   * Find a valid program address
   *
   * Valid program addresses must fall off the ed25519 curve.  This function
   * iterates a nonce until it finds one that when combined with the seeds
   * results in a valid program address.
   */


  static findProgramAddressSync(seeds, programId) {
    let nonce = 255;
    let address;

    while (nonce != 0) {
      try {
        const seedsWithNonce = seeds.concat(Buffer$1.from([nonce]));
        address = this.createProgramAddressSync(seedsWithNonce, programId);
      } catch (err) {
        if (err instanceof TypeError) {
          throw err;
        }

        nonce--;
        continue;
      }

      return [address, nonce];
    }

    throw new Error(`Unable to find a viable program address nonce`);
  }
  /**
   * Async version of findProgramAddressSync
   * For backwards compatibility
   */


  static async findProgramAddress(seeds, programId) {
    return this.findProgramAddressSync(seeds, programId);
  }
  /**
   * Check that a pubkey is on the ed25519 curve.
   */


  static isOnCurve(pubkeyData) {
    const pubkey = new PublicKey(pubkeyData);
    return is_on_curve(pubkey.toBytes()) == 1;
  }

}
PublicKey.default = new PublicKey('11111111111111111111111111111111');
SOLANA_SCHEMA.set(PublicKey, {
  kind: 'struct',
  fields: [['_bn', 'u256']]
}); // @ts-ignore

let naclLowLevel = nacl.lowlevel; // Check that a pubkey is on the curve.
// This function and its dependents were sourced from:
// https://github.com/dchest/tweetnacl-js/blob/f1ec050ceae0861f34280e62498b1d3ed9c350c6/nacl.js#L792

function is_on_curve(p) {
  var r = [naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf()];
  var t = naclLowLevel.gf(),
      chk = naclLowLevel.gf(),
      num = naclLowLevel.gf(),
      den = naclLowLevel.gf(),
      den2 = naclLowLevel.gf(),
      den4 = naclLowLevel.gf(),
      den6 = naclLowLevel.gf();
  naclLowLevel.set25519(r[2], gf1);
  naclLowLevel.unpack25519(r[1], p);
  naclLowLevel.S(num, r[1]);
  naclLowLevel.M(den, num, naclLowLevel.D);
  naclLowLevel.Z(num, num, r[2]);
  naclLowLevel.A(den, r[2], den);
  naclLowLevel.S(den2, den);
  naclLowLevel.S(den4, den2);
  naclLowLevel.M(den6, den4, den2);
  naclLowLevel.M(t, den6, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.pow2523(t, t);
  naclLowLevel.M(t, t, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(r[0], t, den);
  naclLowLevel.S(chk, r[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num)) naclLowLevel.M(r[0], r[0], I);
  naclLowLevel.S(chk, r[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num)) return 0;
  return 1;
}

let gf1 = naclLowLevel.gf([1]);
let I = naclLowLevel.gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function neq25519(a, b) {
  var c = new Uint8Array(32),
      d = new Uint8Array(32);
  naclLowLevel.pack25519(c, a);
  naclLowLevel.pack25519(d, b);
  return naclLowLevel.crypto_verify_32(c, 0, d, 0);
}

/**
 * An account key pair (public and secret keys).
 *
 * @deprecated since v1.10.0, please use {@link Keypair} instead.
 */

class Account {
  /** @internal */

  /**
   * Create a new Account object
   *
   * If the secretKey parameter is not provided a new key pair is randomly
   * created for the account
   *
   * @param secretKey Secret key for the account
   */
  constructor(secretKey) {
    this._keypair = void 0;

    if (secretKey) {
      this._keypair = nacl.sign.keyPair.fromSecretKey(toBuffer(secretKey));
    } else {
      this._keypair = nacl.sign.keyPair();
    }
  }
  /**
   * The public key for this account
   */


  get publicKey() {
    return new PublicKey(this._keypair.publicKey);
  }
  /**
   * The **unencrypted** secret key for this account
   */


  get secretKey() {
    return toBuffer(this._keypair.secretKey);
  }

}

const BPF_LOADER_DEPRECATED_PROGRAM_ID = new PublicKey('BPFLoader1111111111111111111111111111111111');

var Layout$1 = {};

/* The MIT License (MIT)
 *
 * Copyright 2015-2018 Peter A. Bigot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(Layout$1, "__esModule", { value: true });
Layout$1.s16 = Layout$1.s8 = Layout$1.nu64be = Layout$1.u48be = Layout$1.u40be = Layout$1.u32be = Layout$1.u24be = Layout$1.u16be = nu64 = Layout$1.nu64 = Layout$1.u48 = Layout$1.u40 = u32 = Layout$1.u32 = Layout$1.u24 = u16 = Layout$1.u16 = u8 = Layout$1.u8 = offset = Layout$1.offset = Layout$1.greedy = Layout$1.Constant = Layout$1.UTF8 = Layout$1.CString = Layout$1.Blob = Layout$1.Boolean = Layout$1.BitField = Layout$1.BitStructure = Layout$1.VariantLayout = Layout$1.Union = Layout$1.UnionLayoutDiscriminator = Layout$1.UnionDiscriminator = Layout$1.Structure = Layout$1.Sequence = Layout$1.DoubleBE = Layout$1.Double = Layout$1.FloatBE = Layout$1.Float = Layout$1.NearInt64BE = Layout$1.NearInt64 = Layout$1.NearUInt64BE = Layout$1.NearUInt64 = Layout$1.IntBE = Layout$1.Int = Layout$1.UIntBE = Layout$1.UInt = Layout$1.OffsetLayout = Layout$1.GreedyCount = Layout$1.ExternalLayout = Layout$1.bindConstructorLayout = Layout$1.nameWithProperty = Layout$1.Layout = Layout$1.uint8ArrayToBuffer = Layout$1.checkUint8Array = void 0;
Layout$1.constant = Layout$1.utf8 = Layout$1.cstr = blob = Layout$1.blob = Layout$1.unionLayoutDiscriminator = Layout$1.union = seq = Layout$1.seq = Layout$1.bits = struct = Layout$1.struct = Layout$1.f64be = Layout$1.f64 = Layout$1.f32be = Layout$1.f32 = Layout$1.ns64be = Layout$1.s48be = Layout$1.s40be = Layout$1.s32be = Layout$1.s24be = Layout$1.s16be = ns64 = Layout$1.ns64 = Layout$1.s48 = Layout$1.s40 = Layout$1.s32 = Layout$1.s24 = void 0;
const buffer_1 = require$$0$3;
/* Check if a value is a Uint8Array.
 *
 * @ignore */
function checkUint8Array(b) {
    if (!(b instanceof Uint8Array)) {
        throw new TypeError('b must be a Uint8Array');
    }
}
Layout$1.checkUint8Array = checkUint8Array;
/* Create a Buffer instance from a Uint8Array.
 *
 * @ignore */
function uint8ArrayToBuffer(b) {
    checkUint8Array(b);
    return buffer_1.Buffer.from(b.buffer, b.byteOffset, b.length);
}
Layout$1.uint8ArrayToBuffer = uint8ArrayToBuffer;
/**
 * Base class for layout objects.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support the {@link
 * Layout#encode|encode} or {@link Layout#decode|decode} functions.
 *
 * @param {Number} span - Initializer for {@link Layout#span|span}.  The
 * parameter must be an integer; a negative value signifies that the
 * span is {@link Layout#getSpan|value-specific}.
 *
 * @param {string} [property] - Initializer for {@link
 * Layout#property|property}.
 *
 * @abstract
 */
class Layout {
    constructor(span, property) {
        if (!Number.isInteger(span)) {
            throw new TypeError('span must be an integer');
        }
        /** The span of the layout in bytes.
         *
         * Positive values are generally expected.
         *
         * Zero will only appear in {@link Constant}s and in {@link
         * Sequence}s where the {@link Sequence#count|count} is zero.
         *
         * A negative value indicates that the span is value-specific, and
         * must be obtained using {@link Layout#getSpan|getSpan}. */
        this.span = span;
        /** The property name used when this layout is represented in an
         * Object.
         *
         * Used only for layouts that {@link Layout#decode|decode} to Object
         * instances.  If left undefined the span of the unnamed layout will
         * be treated as padding: it will not be mutated by {@link
         * Layout#encode|encode} nor represented as a property in the
         * decoded Object. */
        this.property = property;
    }
    /** Function to create an Object into which decoded properties will
     * be written.
     *
     * Used only for layouts that {@link Layout#decode|decode} to Object
     * instances, which means:
     * * {@link Structure}
     * * {@link Union}
     * * {@link VariantLayout}
     * * {@link BitStructure}
     *
     * If left undefined the JavaScript representation of these layouts
     * will be Object instances.
     *
     * See {@link bindConstructorLayout}.
     */
    makeDestinationObject() {
        return {};
    }
    /**
     * Calculate the span of a specific instance of a layout.
     *
     * @param {Uint8Array} b - the buffer that contains an encoded instance.
     *
     * @param {Number} [offset] - the offset at which the encoded instance
     * starts.  If absent a zero offset is inferred.
     *
     * @return {Number} - the number of bytes covered by the layout
     * instance.  If this method is not overridden in a subclass the
     * definition-time constant {@link Layout#span|span} will be
     * returned.
     *
     * @throws {RangeError} - if the length of the value cannot be
     * determined.
     */
    getSpan(b, offset) {
        if (0 > this.span) {
            throw new RangeError('indeterminate span');
        }
        return this.span;
    }
    /**
     * Replicate the layout using a new property.
     *
     * This function must be used to get a structurally-equivalent layout
     * with a different name since all {@link Layout} instances are
     * immutable.
     *
     * **NOTE** This is a shallow copy.  All fields except {@link
     * Layout#property|property} are strictly equal to the origin layout.
     *
     * @param {String} property - the value for {@link
     * Layout#property|property} in the replica.
     *
     * @returns {Layout} - the copy with {@link Layout#property|property}
     * set to `property`.
     */
    replicate(property) {
        const rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
    }
    /**
     * Create an object from layout properties and an array of values.
     *
     * **NOTE** This function returns `undefined` if invoked on a layout
     * that does not return its value as an Object.  Objects are
     * returned for things that are a {@link Structure}, which includes
     * {@link VariantLayout|variant layouts} if they are structures, and
     * excludes {@link Union}s.  If you want this feature for a union
     * you must use {@link Union.getVariant|getVariant} to select the
     * desired layout.
     *
     * @param {Array} values - an array of values that correspond to the
     * default order for properties.  As with {@link Layout#decode|decode}
     * layout elements that have no property name are skipped when
     * iterating over the array values.  Only the top-level properties are
     * assigned; arguments are not assigned to properties of contained
     * layouts.  Any unused values are ignored.
     *
     * @return {(Object|undefined)}
     */
    fromArray(values) {
        return undefined;
    }
}
Layout$1.Layout = Layout;
/* Provide text that carries a name (such as for a function that will
 * be throwing an error) annotated with the property of a given layout
 * (such as one for which the value was unacceptable).
 *
 * @ignore */
function nameWithProperty(name, lo) {
    if (lo.property) {
        return name + '[' + lo.property + ']';
    }
    return name;
}
Layout$1.nameWithProperty = nameWithProperty;
/**
 * Augment a class so that instances can be encoded/decoded using a
 * given layout.
 *
 * Calling this function couples `Class` with `layout` in several ways:
 *
 * * `Class.layout_` becomes a static member property equal to `layout`;
 * * `layout.boundConstructor_` becomes a static member property equal
 *    to `Class`;
 * * The {@link Layout#makeDestinationObject|makeDestinationObject()}
 *   property of `layout` is set to a function that returns a `new
 *   Class()`;
 * * `Class.decode(b, offset)` becomes a static member function that
 *   delegates to {@link Layout#decode|layout.decode}.  The
 *   synthesized function may be captured and extended.
 * * `Class.prototype.encode(b, offset)` provides an instance member
 *   function that delegates to {@link Layout#encode|layout.encode}
 *   with `src` set to `this`.  The synthesized function may be
 *   captured and extended, but when the extension is invoked `this`
 *   must be explicitly bound to the instance.
 *
 * @param {class} Class - a JavaScript class with a nullary
 * constructor.
 *
 * @param {Layout} layout - the {@link Layout} instance used to encode
 * instances of `Class`.
 */
// `Class` must be a constructor Function, but the assignment of a `layout_` property to it makes it difficult to type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function bindConstructorLayout(Class, layout) {
    if ('function' !== typeof Class) {
        throw new TypeError('Class must be constructor');
    }
    if (Object.prototype.hasOwnProperty.call(Class, 'layout_')) {
        throw new Error('Class is already bound to a layout');
    }
    if (!(layout && (layout instanceof Layout))) {
        throw new TypeError('layout must be a Layout');
    }
    if (Object.prototype.hasOwnProperty.call(layout, 'boundConstructor_')) {
        throw new Error('layout is already bound to a constructor');
    }
    Class.layout_ = layout;
    layout.boundConstructor_ = Class;
    layout.makeDestinationObject = (() => new Class());
    Object.defineProperty(Class.prototype, 'encode', {
        value(b, offset) {
            return layout.encode(this, b, offset);
        },
        writable: true,
    });
    Object.defineProperty(Class, 'decode', {
        value(b, offset) {
            return layout.decode(b, offset);
        },
        writable: true,
    });
}
Layout$1.bindConstructorLayout = bindConstructorLayout;
/**
 * An object that behaves like a layout but does not consume space
 * within its containing layout.
 *
 * This is primarily used to obtain metadata about a member, such as a
 * {@link OffsetLayout} that can provide data about a {@link
 * Layout#getSpan|value-specific span}.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support {@link
 * ExternalLayout#isCount|isCount} or other {@link Layout} functions.
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @abstract
 * @augments {Layout}
 */
class ExternalLayout extends Layout {
    /**
     * Return `true` iff the external layout decodes to an unsigned
     * integer layout.
     *
     * In that case it can be used as the source of {@link
     * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
     * or as {@link UnionLayoutDiscriminator#layout|external union
     * discriminators}.
     *
     * @abstract
     */
    isCount() {
        throw new Error('ExternalLayout is abstract');
    }
}
Layout$1.ExternalLayout = ExternalLayout;
/**
 * An {@link ExternalLayout} that determines its {@link
 * Layout#decode|value} based on offset into and length of the buffer
 * on which it is invoked.
 *
 * *Factory*: {@link module:Layout.greedy|greedy}
 *
 * @param {Number} [elementSpan] - initializer for {@link
 * GreedyCount#elementSpan|elementSpan}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {ExternalLayout}
 */
class GreedyCount extends ExternalLayout {
    constructor(elementSpan = 1, property) {
        if ((!Number.isInteger(elementSpan)) || (0 >= elementSpan)) {
            throw new TypeError('elementSpan must be a (positive) integer');
        }
        super(-1, property);
        /** The layout for individual elements of the sequence.  The value
         * must be a positive integer.  If not provided, the value will be
         * 1. */
        this.elementSpan = elementSpan;
    }
    /** @override */
    isCount() {
        return true;
    }
    /** @override */
    decode(b, offset = 0) {
        checkUint8Array(b);
        const rem = b.length - offset;
        return Math.floor(rem / this.elementSpan);
    }
    /** @override */
    encode(src, b, offset) {
        return 0;
    }
}
Layout$1.GreedyCount = GreedyCount;
/**
 * An {@link ExternalLayout} that supports accessing a {@link Layout}
 * at a fixed offset from the start of another Layout.  The offset may
 * be before, within, or after the base layout.
 *
 * *Factory*: {@link module:Layout.offset|offset}
 *
 * @param {Layout} layout - initializer for {@link
 * OffsetLayout#layout|layout}, modulo `property`.
 *
 * @param {Number} [offset] - Initializes {@link
 * OffsetLayout#offset|offset}.  Defaults to zero.
 *
 * @param {string} [property] - Optional new property name for a
 * {@link Layout#replicate| replica} of `layout` to be used as {@link
 * OffsetLayout#layout|layout}.  If not provided the `layout` is used
 * unchanged.
 *
 * @augments {Layout}
 */
class OffsetLayout extends ExternalLayout {
    constructor(layout, offset = 0, property) {
        if (!(layout instanceof Layout)) {
            throw new TypeError('layout must be a Layout');
        }
        if (!Number.isInteger(offset)) {
            throw new TypeError('offset must be integer or undefined');
        }
        super(layout.span, property || layout.property);
        /** The subordinated layout. */
        this.layout = layout;
        /** The location of {@link OffsetLayout#layout} relative to the
         * start of another layout.
         *
         * The value may be positive or negative, but an error will thrown
         * if at the point of use it goes outside the span of the Uint8Array
         * being accessed.  */
        this.offset = offset;
    }
    /** @override */
    isCount() {
        return ((this.layout instanceof UInt)
            || (this.layout instanceof UIntBE));
    }
    /** @override */
    decode(b, offset = 0) {
        return this.layout.decode(b, offset + this.offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        return this.layout.encode(src, b, offset + this.offset);
    }
}
Layout$1.OffsetLayout = OffsetLayout;
/**
 * Represent an unsigned integer in little-endian format.
 *
 * *Factory*: {@link module:Layout.u8|u8}, {@link
 *  module:Layout.u16|u16}, {@link module:Layout.u24|u24}, {@link
 *  module:Layout.u32|u32}, {@link module:Layout.u40|u40}, {@link
 *  module:Layout.u48|u48}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UInt extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readUIntLE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeUIntLE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.UInt = UInt;
/**
 * Represent an unsigned integer in big-endian format.
 *
 * *Factory*: {@link module:Layout.u8be|u8be}, {@link
 * module:Layout.u16be|u16be}, {@link module:Layout.u24be|u24be},
 * {@link module:Layout.u32be|u32be}, {@link
 * module:Layout.u40be|u40be}, {@link module:Layout.u48be|u48be}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UIntBE extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readUIntBE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeUIntBE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.UIntBE = UIntBE;
/**
 * Represent a signed integer in little-endian format.
 *
 * *Factory*: {@link module:Layout.s8|s8}, {@link
 *  module:Layout.s16|s16}, {@link module:Layout.s24|s24}, {@link
 *  module:Layout.s32|s32}, {@link module:Layout.s40|s40}, {@link
 *  module:Layout.s48|s48}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Int extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readIntLE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeIntLE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.Int = Int;
/**
 * Represent a signed integer in big-endian format.
 *
 * *Factory*: {@link module:Layout.s8be|s8be}, {@link
 * module:Layout.s16be|s16be}, {@link module:Layout.s24be|s24be},
 * {@link module:Layout.s32be|s32be}, {@link
 * module:Layout.s40be|s40be}, {@link module:Layout.s48be|s48be}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class IntBE extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readIntBE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeIntBE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.IntBE = IntBE;
const V2E32 = Math.pow(2, 32);
/* True modulus high and low 32-bit words, where low word is always
 * non-negative. */
function divmodInt64(src) {
    const hi32 = Math.floor(src / V2E32);
    const lo32 = src - (hi32 * V2E32);
    return { hi32, lo32 };
}
/* Reconstruct Number from quotient and non-negative remainder */
function roundedInt64(hi32, lo32) {
    return hi32 * V2E32 + lo32;
}
/**
 * Represent an unsigned 64-bit integer in little-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.nu64|nu64}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearUInt64 extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset);
        const hi32 = buffer.readUInt32LE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset);
        buffer.writeUInt32LE(split.hi32, offset + 4);
        return 8;
    }
}
Layout$1.NearUInt64 = NearUInt64;
/**
 * Represent an unsigned 64-bit integer in big-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.nu64be|nu64be}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearUInt64BE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readUInt32BE(offset);
        const lo32 = buffer.readUInt32BE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32BE(split.hi32, offset);
        buffer.writeUInt32BE(split.lo32, offset + 4);
        return 8;
    }
}
Layout$1.NearUInt64BE = NearUInt64BE;
/**
 * Represent a signed 64-bit integer in little-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.ns64|ns64}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearInt64 extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset);
        const hi32 = buffer.readInt32LE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset);
        buffer.writeInt32LE(split.hi32, offset + 4);
        return 8;
    }
}
Layout$1.NearInt64 = NearInt64;
/**
 * Represent a signed 64-bit integer in big-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.ns64be|ns64be}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearInt64BE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readInt32BE(offset);
        const lo32 = buffer.readUInt32BE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeInt32BE(split.hi32, offset);
        buffer.writeUInt32BE(split.lo32, offset + 4);
        return 8;
    }
}
Layout$1.NearInt64BE = NearInt64BE;
/**
 * Represent a 32-bit floating point number in little-endian format.
 *
 * *Factory*: {@link module:Layout.f32|f32}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Float extends Layout {
    constructor(property) {
        super(4, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readFloatLE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeFloatLE(src, offset);
        return 4;
    }
}
Layout$1.Float = Float;
/**
 * Represent a 32-bit floating point number in big-endian format.
 *
 * *Factory*: {@link module:Layout.f32be|f32be}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class FloatBE extends Layout {
    constructor(property) {
        super(4, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readFloatBE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeFloatBE(src, offset);
        return 4;
    }
}
Layout$1.FloatBE = FloatBE;
/**
 * Represent a 64-bit floating point number in little-endian format.
 *
 * *Factory*: {@link module:Layout.f64|f64}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Double extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readDoubleLE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeDoubleLE(src, offset);
        return 8;
    }
}
Layout$1.Double = Double;
/**
 * Represent a 64-bit floating point number in big-endian format.
 *
 * *Factory*: {@link module:Layout.f64be|f64be}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class DoubleBE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readDoubleBE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeDoubleBE(src, offset);
        return 8;
    }
}
Layout$1.DoubleBE = DoubleBE;
/**
 * Represent a contiguous sequence of a specific layout as an Array.
 *
 * *Factory*: {@link module:Layout.seq|seq}
 *
 * @param {Layout} elementLayout - initializer for {@link
 * Sequence#elementLayout|elementLayout}.
 *
 * @param {(Number|ExternalLayout)} count - initializer for {@link
 * Sequence#count|count}.  The parameter must be either a positive
 * integer or an instance of {@link ExternalLayout}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Sequence extends Layout {
    constructor(elementLayout, count, property) {
        if (!(elementLayout instanceof Layout)) {
            throw new TypeError('elementLayout must be a Layout');
        }
        if (!(((count instanceof ExternalLayout) && count.isCount())
            || (Number.isInteger(count) && (0 <= count)))) {
            throw new TypeError('count must be non-negative integer '
                + 'or an unsigned integer ExternalLayout');
        }
        let span = -1;
        if ((!(count instanceof ExternalLayout))
            && (0 < elementLayout.span)) {
            span = count * elementLayout.span;
        }
        super(span, property);
        /** The layout for individual elements of the sequence. */
        this.elementLayout = elementLayout;
        /** The number of elements in the sequence.
         *
         * This will be either a non-negative integer or an instance of
         * {@link ExternalLayout} for which {@link
         * ExternalLayout#isCount|isCount()} is `true`. */
        this.count = count;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        let span = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
            count = count.decode(b, offset);
        }
        if (0 < this.elementLayout.span) {
            span = count * this.elementLayout.span;
        }
        else {
            let idx = 0;
            while (idx < count) {
                span += this.elementLayout.getSpan(b, offset + span);
                ++idx;
            }
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        const rv = [];
        let i = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
            count = count.decode(b, offset);
        }
        while (i < count) {
            rv.push(this.elementLayout.decode(b, offset));
            offset += this.elementLayout.getSpan(b, offset);
            i += 1;
        }
        return rv;
    }
    /** Implement {@link Layout#encode|encode} for {@link Sequence}.
     *
     * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
     * the unused space in the buffer is left unchanged.  If `src` is
     * longer than {@link Sequence#count|count} the unneeded elements are
     * ignored.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset = 0) {
        const elo = this.elementLayout;
        const span = src.reduce((span, v) => {
            return span + elo.encode(v, b, offset + span);
        }, 0);
        if (this.count instanceof ExternalLayout) {
            this.count.encode(src.length, b, offset);
        }
        return span;
    }
}
Layout$1.Sequence = Sequence;
/**
 * Represent a contiguous sequence of arbitrary layout elements as an
 * Object.
 *
 * *Factory*: {@link module:Layout.struct|struct}
 *
 * **NOTE** The {@link Layout#span|span} of the structure is variable
 * if any layout in {@link Structure#fields|fields} has a variable
 * span.  When {@link Layout#encode|encoding} we must have a value for
 * all variable-length fields, or we wouldn't be able to figure out
 * how much space to use for storage.  We can only identify the value
 * for a field when it has a {@link Layout#property|property}.  As
 * such, although a structure may contain both unnamed fields and
 * variable-length fields, it cannot contain an unnamed
 * variable-length field.
 *
 * @param {Layout[]} fields - initializer for {@link
 * Structure#fields|fields}.  An error is raised if this contains a
 * variable-length field for which a {@link Layout#property|property}
 * is not defined.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @param {Boolean} [decodePrefixes] - initializer for {@link
 * Structure#decodePrefixes|property}.
 *
 * @throws {Error} - if `fields` contains an unnamed variable-length
 * layout.
 *
 * @augments {Layout}
 */
class Structure extends Layout {
    constructor(fields, property, decodePrefixes) {
        if (!(Array.isArray(fields)
            && fields.reduce((acc, v) => acc && (v instanceof Layout), true))) {
            throw new TypeError('fields must be array of Layout instances');
        }
        if (('boolean' === typeof property)
            && (undefined === decodePrefixes)) {
            decodePrefixes = property;
            property = undefined;
        }
        /* Verify absence of unnamed variable-length fields. */
        for (const fd of fields) {
            if ((0 > fd.span)
                && (undefined === fd.property)) {
                throw new Error('fields cannot contain unnamed variable-length layout');
            }
        }
        let span = -1;
        try {
            span = fields.reduce((span, fd) => span + fd.getSpan(), 0);
        }
        catch (e) {
            // ignore error
        }
        super(span, property);
        /** The sequence of {@link Layout} values that comprise the
         * structure.
         *
         * The individual elements need not be the same type, and may be
         * either scalar or aggregate layouts.  If a member layout leaves
         * its {@link Layout#property|property} undefined the
         * corresponding region of the buffer associated with the element
         * will not be mutated.
         *
         * @type {Layout[]} */
        this.fields = fields;
        /** Control behavior of {@link Layout#decode|decode()} given short
         * buffers.
         *
         * In some situations a structure many be extended with additional
         * fields over time, with older installations providing only a
         * prefix of the full structure.  If this property is `true`
         * decoding will accept those buffers and leave subsequent fields
         * undefined, as long as the buffer ends at a field boundary.
         * Defaults to `false`. */
        this.decodePrefixes = !!decodePrefixes;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        let span = 0;
        try {
            span = this.fields.reduce((span, fd) => {
                const fsp = fd.getSpan(b, offset);
                offset += fsp;
                return span + fsp;
            }, 0);
        }
        catch (e) {
            throw new RangeError('indeterminate span');
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        checkUint8Array(b);
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                dest[fd.property] = fd.decode(b, offset);
            }
            offset += fd.getSpan(b, offset);
            if (this.decodePrefixes
                && (b.length === offset)) {
                break;
            }
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(src, b, offset = 0) {
        const firstOffset = offset;
        let lastOffset = 0;
        let lastWrote = 0;
        for (const fd of this.fields) {
            let span = fd.span;
            lastWrote = (0 < span) ? span : 0;
            if (undefined !== fd.property) {
                const fv = src[fd.property];
                if (undefined !== fv) {
                    lastWrote = fd.encode(fv, b, offset);
                    if (0 > span) {
                        /* Read the as-encoded span, which is not necessarily the
                         * same as what we wrote. */
                        span = fd.getSpan(b, offset);
                    }
                }
            }
            lastOffset = offset;
            offset += span;
        }
        /* Use (lastOffset + lastWrote) instead of offset because the last
         * item may have had a dynamic length and we don't want to include
         * the padding between it and the end of the space reserved for
         * it. */
        return (lastOffset + lastWrote) - firstOffset;
    }
    /** @override */
    fromArray(values) {
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
            if ((undefined !== fd.property)
                && (0 < values.length)) {
                dest[fd.property] = values.shift();
            }
        }
        return dest;
    }
    /**
     * Get access to the layout of a given property.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Layout} - the layout associated with `property`, or
     * undefined if there is no such property.
     */
    layoutFor(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        for (const fd of this.fields) {
            if (fd.property === property) {
                return fd;
            }
        }
        return undefined;
    }
    /**
     * Get the offset of a structure member.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Number} - the offset in bytes to the start of `property`
     * within the structure, or undefined if `property` is not a field
     * within the structure.  If the property is a member but follows a
     * variable-length structure member a negative number will be
     * returned.
     */
    offsetOf(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        let offset = 0;
        for (const fd of this.fields) {
            if (fd.property === property) {
                return offset;
            }
            if (0 > fd.span) {
                offset = -1;
            }
            else if (0 <= offset) {
                offset += fd.span;
            }
        }
        return undefined;
    }
}
Layout$1.Structure = Structure;
/**
 * An object that can provide a {@link
 * Union#discriminator|discriminator} API for {@link Union}.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support the {@link
 * UnionDiscriminator#encode|encode} or {@link
 * UnionDiscriminator#decode|decode} functions.
 *
 * @param {string} [property] - Default for {@link
 * UnionDiscriminator#property|property}.
 *
 * @abstract
 */
class UnionDiscriminator {
    constructor(property) {
        /** The {@link Layout#property|property} to be used when the
         * discriminator is referenced in isolation (generally when {@link
         * Union#decode|Union decode} cannot delegate to a specific
         * variant). */
        this.property = property;
    }
    /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
     *
     * The implementation of this method need not reference the buffer if
     * variant information is available through other means. */
    decode(b, offset) {
        throw new Error('UnionDiscriminator is abstract');
    }
    /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
     *
     * The implementation of this method need not store the value if
     * variant information is maintained through other means. */
    encode(src, b, offset) {
        throw new Error('UnionDiscriminator is abstract');
    }
}
Layout$1.UnionDiscriminator = UnionDiscriminator;
/**
 * An object that can provide a {@link
 * UnionDiscriminator|discriminator API} for {@link Union} using an
 * unsigned integral {@link Layout} instance located either inside or
 * outside the union.
 *
 * @param {ExternalLayout} layout - initializes {@link
 * UnionLayoutDiscriminator#layout|layout}.  Must satisfy {@link
 * ExternalLayout#isCount|isCount()}.
 *
 * @param {string} [property] - Default for {@link
 * UnionDiscriminator#property|property}, superseding the property
 * from `layout`, but defaulting to `variant` if neither `property`
 * nor layout provide a property name.
 *
 * @augments {UnionDiscriminator}
 */
class UnionLayoutDiscriminator extends UnionDiscriminator {
    constructor(layout, property) {
        if (!((layout instanceof ExternalLayout)
            && layout.isCount())) {
            throw new TypeError('layout must be an unsigned integer ExternalLayout');
        }
        super(property || layout.property || 'variant');
        /** The {@link ExternalLayout} used to access the discriminator
         * value. */
        this.layout = layout;
    }
    /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    decode(b, offset) {
        return this.layout.decode(b, offset);
    }
    /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    encode(src, b, offset) {
        return this.layout.encode(src, b, offset);
    }
}
Layout$1.UnionLayoutDiscriminator = UnionLayoutDiscriminator;
/**
 * Represent any number of span-compatible layouts.
 *
 * *Factory*: {@link module:Layout.union|union}
 *
 * If the union has a {@link Union#defaultLayout|default layout} that
 * layout must have a non-negative {@link Layout#span|span}.  The span
 * of a fixed-span union includes its {@link
 * Union#discriminator|discriminator} if the variant is a {@link
 * Union#usesPrefixDiscriminator|prefix of the union}, plus the span
 * of its {@link Union#defaultLayout|default layout}.
 *
 * If the union does not have a default layout then the encoded span
 * of the union depends on the encoded span of its variant (which may
 * be fixed or variable).
 *
 * {@link VariantLayout#layout|Variant layout}s are added through
 * {@link Union#addVariant|addVariant}.  If the union has a default
 * layout, the span of the {@link VariantLayout#layout|layout
 * contained by the variant} must not exceed the span of the {@link
 * Union#defaultLayout|default layout} (minus the span of a {@link
 * Union#usesPrefixDiscriminator|prefix disriminator}, if used).  The
 * span of the variant will equal the span of the union itself.
 *
 * The variant for a buffer can only be identified from the {@link
 * Union#discriminator|discriminator} {@link
 * UnionDiscriminator#property|property} (in the case of the {@link
 * Union#defaultLayout|default layout}), or by using {@link
 * Union#getVariant|getVariant} and examining the resulting {@link
 * VariantLayout} instance.
 *
 * A variant compatible with a JavaScript object can be identified
 * using {@link Union#getSourceVariant|getSourceVariant}.
 *
 * @param {(UnionDiscriminator|ExternalLayout|Layout)} discr - How to
 * identify the layout used to interpret the union contents.  The
 * parameter must be an instance of {@link UnionDiscriminator}, an
 * {@link ExternalLayout} that satisfies {@link
 * ExternalLayout#isCount|isCount()}, or {@link UInt} (or {@link
 * UIntBE}).  When a non-external layout element is passed the layout
 * appears at the start of the union.  In all cases the (synthesized)
 * {@link UnionDiscriminator} instance is recorded as {@link
 * Union#discriminator|discriminator}.
 *
 * @param {(Layout|null)} defaultLayout - initializer for {@link
 * Union#defaultLayout|defaultLayout}.  If absent defaults to `null`.
 * If `null` there is no default layout: the union has data-dependent
 * length and attempts to decode or encode unrecognized variants will
 * throw an exception.  A {@link Layout} instance must have a
 * non-negative {@link Layout#span|span}, and if it lacks a {@link
 * Layout#property|property} the {@link
 * Union#defaultLayout|defaultLayout} will be a {@link
 * Layout#replicate|replica} with property `content`.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Union extends Layout {
    constructor(discr, defaultLayout, property) {
        let discriminator;
        if ((discr instanceof UInt)
            || (discr instanceof UIntBE)) {
            discriminator = new UnionLayoutDiscriminator(new OffsetLayout(discr));
        }
        else if ((discr instanceof ExternalLayout)
            && discr.isCount()) {
            discriminator = new UnionLayoutDiscriminator(discr);
        }
        else if (!(discr instanceof UnionDiscriminator)) {
            throw new TypeError('discr must be a UnionDiscriminator '
                + 'or an unsigned integer layout');
        }
        else {
            discriminator = discr;
        }
        if (undefined === defaultLayout) {
            defaultLayout = null;
        }
        if (!((null === defaultLayout)
            || (defaultLayout instanceof Layout))) {
            throw new TypeError('defaultLayout must be null or a Layout');
        }
        if (null !== defaultLayout) {
            if (0 > defaultLayout.span) {
                throw new Error('defaultLayout must have constant span');
            }
            if (undefined === defaultLayout.property) {
                defaultLayout = defaultLayout.replicate('content');
            }
        }
        /* The union span can be estimated only if there's a default
         * layout.  The union spans its default layout, plus any prefix
         * variant layout.  By construction both layouts, if present, have
         * non-negative span. */
        let span = -1;
        if (defaultLayout) {
            span = defaultLayout.span;
            if ((0 <= span) && ((discr instanceof UInt)
                || (discr instanceof UIntBE))) {
                span += discriminator.layout.span;
            }
        }
        super(span, property);
        /** The interface for the discriminator value in isolation.
         *
         * This a {@link UnionDiscriminator} either passed to the
         * constructor or synthesized from the `discr` constructor
         * argument.  {@link
         * Union#usesPrefixDiscriminator|usesPrefixDiscriminator} will be
         * `true` iff the `discr` parameter was a non-offset {@link
         * Layout} instance. */
        this.discriminator = discriminator;
        /** `true` if the {@link Union#discriminator|discriminator} is the
         * first field in the union.
         *
         * If `false` the discriminator is obtained from somewhere
         * else. */
        this.usesPrefixDiscriminator = (discr instanceof UInt)
            || (discr instanceof UIntBE);
        /** The layout for non-discriminator content when the value of the
         * discriminator is not recognized.
         *
         * This is the value passed to the constructor.  It is
         * structurally equivalent to the second component of {@link
         * Union#layout|layout} but may have a different property
         * name. */
        this.defaultLayout = defaultLayout;
        /** A registry of allowed variants.
         *
         * The keys are unsigned integers which should be compatible with
         * {@link Union.discriminator|discriminator}.  The property value
         * is the corresponding {@link VariantLayout} instances assigned
         * to this union by {@link Union#addVariant|addVariant}.
         *
         * **NOTE** The registry remains mutable so that variants can be
         * {@link Union#addVariant|added} at any time.  Users should not
         * manipulate the content of this property. */
        this.registry = {};
        /* Private variable used when invoking getSourceVariant */
        let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
        /** Function to infer the variant selected by a source object.
         *
         * Defaults to {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant} but may
         * be overridden using {@link
         * Union#configGetSourceVariant|configGetSourceVariant}.
         *
         * @param {Object} src - as with {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant}.
         *
         * @returns {(undefined|VariantLayout)} The default variant
         * (`undefined`) or first registered variant that uses a property
         * available in `src`. */
        this.getSourceVariant = function (src) {
            return boundGetSourceVariant(src);
        };
        /** Function to override the implementation of {@link
         * Union#getSourceVariant|getSourceVariant}.
         *
         * Use this if the desired variant cannot be identified using the
         * algorithm of {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant}.
         *
         * **NOTE** The provided function will be invoked bound to this
         * Union instance, providing local access to {@link
         * Union#registry|registry}.
         *
         * @param {Function} gsv - a function that follows the API of
         * {@link Union#defaultGetSourceVariant|defaultGetSourceVariant}. */
        this.configGetSourceVariant = function (gsv) {
            boundGetSourceVariant = gsv.bind(this);
        };
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        /* Default layouts always have non-negative span, so we don't have
         * one and we have to recognize the variant which will in turn
         * determine the span. */
        const vlo = this.getVariant(b, offset);
        if (!vlo) {
            throw new Error('unable to determine span for unrecognized variant');
        }
        return vlo.getSpan(b, offset);
    }
    /**
     * Method to infer a registered Union variant compatible with `src`.
     *
     * The first satisfied rule in the following sequence defines the
     * return value:
     * * If `src` has properties matching the Union discriminator and
     *   the default layout, `undefined` is returned regardless of the
     *   value of the discriminator property (this ensures the default
     *   layout will be used);
     * * If `src` has a property matching the Union discriminator, the
     *   value of the discriminator identifies a registered variant, and
     *   either (a) the variant has no layout, or (b) `src` has the
     *   variant's property, then the variant is returned (because the
     *   source satisfies the constraints of the variant it identifies);
     * * If `src` does not have a property matching the Union
     *   discriminator, but does have a property matching a registered
     *   variant, then the variant is returned (because the source
     *   matches a variant without an explicit conflict);
     * * An error is thrown (because we either can't identify a variant,
     *   or we were explicitly told the variant but can't satisfy it).
     *
     * @param {Object} src - an object presumed to be compatible with
     * the content of the Union.
     *
     * @return {(undefined|VariantLayout)} - as described above.
     *
     * @throws {Error} - if `src` cannot be associated with a default or
     * registered variant.
     */
    defaultGetSourceVariant(src) {
        if (Object.prototype.hasOwnProperty.call(src, this.discriminator.property)) {
            if (this.defaultLayout && this.defaultLayout.property
                && Object.prototype.hasOwnProperty.call(src, this.defaultLayout.property)) {
                return undefined;
            }
            const vlo = this.registry[src[this.discriminator.property]];
            if (vlo
                && ((!vlo.layout)
                    || (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)))) {
                return vlo;
            }
        }
        else {
            for (const tag in this.registry) {
                const vlo = this.registry[tag];
                if (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)) {
                    return vlo;
                }
            }
        }
        throw new Error('unable to infer src variant');
    }
    /** Implement {@link Layout#decode|decode} for {@link Union}.
     *
     * If the variant is {@link Union#addVariant|registered} the return
     * value is an instance of that variant, with no explicit
     * discriminator.  Otherwise the {@link Union#defaultLayout|default
     * layout} is used to decode the content. */
    decode(b, offset = 0) {
        let dest;
        const dlo = this.discriminator;
        const discr = dlo.decode(b, offset);
        const clo = this.registry[discr];
        if (undefined === clo) {
            const defaultLayout = this.defaultLayout;
            let contentOffset = 0;
            if (this.usesPrefixDiscriminator) {
                contentOffset = dlo.layout.span;
            }
            dest = this.makeDestinationObject();
            dest[dlo.property] = discr;
            // defaultLayout.property can be undefined, but this is allowed by buffer-layout
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            dest[defaultLayout.property] = defaultLayout.decode(b, offset + contentOffset);
        }
        else {
            dest = clo.decode(b, offset);
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link Union}.
     *
     * This API assumes the `src` object is consistent with the union's
     * {@link Union#defaultLayout|default layout}.  To encode variants
     * use the appropriate variant-specific {@link VariantLayout#encode}
     * method. */
    encode(src, b, offset = 0) {
        const vlo = this.getSourceVariant(src);
        if (undefined === vlo) {
            const dlo = this.discriminator;
            // this.defaultLayout is not undefined when vlo is undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const clo = this.defaultLayout;
            let contentOffset = 0;
            if (this.usesPrefixDiscriminator) {
                contentOffset = dlo.layout.span;
            }
            dlo.encode(src[dlo.property], b, offset);
            // clo.property is not undefined when vlo is undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return contentOffset + clo.encode(src[clo.property], b, offset + contentOffset);
        }
        return vlo.encode(src, b, offset);
    }
    /** Register a new variant structure within a union.  The newly
     * created variant is returned.
     *
     * @param {Number} variant - initializer for {@link
     * VariantLayout#variant|variant}.
     *
     * @param {Layout} layout - initializer for {@link
     * VariantLayout#layout|layout}.
     *
     * @param {String} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {VariantLayout} */
    addVariant(variant, layout, property) {
        const rv = new VariantLayout(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
    }
    /**
     * Get the layout associated with a registered variant.
     *
     * If `vb` does not produce a registered variant the function returns
     * `undefined`.
     *
     * @param {(Number|Uint8Array)} vb - either the variant number, or a
     * buffer from which the discriminator is to be read.
     *
     * @param {Number} offset - offset into `vb` for the start of the
     * union.  Used only when `vb` is an instance of {Uint8Array}.
     *
     * @return {({VariantLayout}|undefined)}
     */
    getVariant(vb, offset = 0) {
        let variant;
        if (vb instanceof Uint8Array) {
            variant = this.discriminator.decode(vb, offset);
        }
        else {
            variant = vb;
        }
        return this.registry[variant];
    }
}
Layout$1.Union = Union;
/**
 * Represent a specific variant within a containing union.
 *
 * **NOTE** The {@link Layout#span|span} of the variant may include
 * the span of the {@link Union#discriminator|discriminator} used to
 * identify it, but values read and written using the variant strictly
 * conform to the content of {@link VariantLayout#layout|layout}.
 *
 * **NOTE** User code should not invoke this constructor directly.  Use
 * the union {@link Union#addVariant|addVariant} helper method.
 *
 * @param {Union} union - initializer for {@link
 * VariantLayout#union|union}.
 *
 * @param {Number} variant - initializer for {@link
 * VariantLayout#variant|variant}.
 *
 * @param {Layout} [layout] - initializer for {@link
 * VariantLayout#layout|layout}.  If absent the variant carries no
 * data.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.  Unlike many other layouts, variant
 * layouts normally include a property name so they can be identified
 * within their containing {@link Union}.  The property identifier may
 * be absent only if `layout` is is absent.
 *
 * @augments {Layout}
 */
class VariantLayout extends Layout {
    constructor(union, variant, layout, property) {
        if (!(union instanceof Union)) {
            throw new TypeError('union must be a Union');
        }
        if ((!Number.isInteger(variant)) || (0 > variant)) {
            throw new TypeError('variant must be a (non-negative) integer');
        }
        if (('string' === typeof layout)
            && (undefined === property)) {
            property = layout;
            layout = null;
        }
        if (layout) {
            if (!(layout instanceof Layout)) {
                throw new TypeError('layout must be a Layout');
            }
            if ((null !== union.defaultLayout)
                && (0 <= layout.span)
                && (layout.span > union.defaultLayout.span)) {
                throw new Error('variant span exceeds span of containing union');
            }
            if ('string' !== typeof property) {
                throw new TypeError('variant must have a String property');
            }
        }
        let span = union.span;
        if (0 > union.span) {
            span = layout ? layout.span : 0;
            if ((0 <= span) && union.usesPrefixDiscriminator) {
                span += union.discriminator.layout.span;
            }
        }
        super(span, property);
        /** The {@link Union} to which this variant belongs. */
        this.union = union;
        /** The unsigned integral value identifying this variant within
         * the {@link Union#discriminator|discriminator} of the containing
         * union. */
        this.variant = variant;
        /** The {@link Layout} to be used when reading/writing the
         * non-discriminator part of the {@link
         * VariantLayout#union|union}.  If `null` the variant carries no
         * data. */
        this.layout = layout || null;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            /* Will be equal to the containing union span if that is not
             * variable. */
            return this.span;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        /* Span is defined solely by the variant (and prefix discriminator) */
        let span = 0;
        if (this.layout) {
            span = this.layout.getSpan(b, offset + contentOffset);
        }
        return contentOffset + span;
    }
    /** @override */
    decode(b, offset = 0) {
        const dest = this.makeDestinationObject();
        if (this !== this.union.getVariant(b, offset)) {
            throw new Error('variant mismatch');
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout) {
            dest[this.property] = this.layout.decode(b, offset + contentOffset);
        }
        else if (this.property) {
            dest[this.property] = true;
        }
        else if (this.union.usesPrefixDiscriminator) {
            dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
    }
    /** @override */
    encode(src, b, offset = 0) {
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout
            && (!Object.prototype.hasOwnProperty.call(src, this.property))) {
            throw new TypeError('variant lacks property ' + this.property);
        }
        this.union.discriminator.encode(this.variant, b, offset);
        let span = contentOffset;
        if (this.layout) {
            this.layout.encode(src[this.property], b, offset + contentOffset);
            span += this.layout.getSpan(b, offset + contentOffset);
            if ((0 <= this.union.span)
                && (span > this.union.span)) {
                throw new Error('encoded variant overruns containing union');
            }
        }
        return span;
    }
    /** Delegate {@link Layout#fromArray|fromArray} to {@link
     * VariantLayout#layout|layout}. */
    fromArray(values) {
        if (this.layout) {
            return this.layout.fromArray(values);
        }
        return undefined;
    }
}
Layout$1.VariantLayout = VariantLayout;
/** JavaScript chose to define bitwise operations as operating on
 * signed 32-bit values in 2's complement form, meaning any integer
 * with bit 31 set is going to look negative.  For right shifts that's
 * not a problem, because `>>>` is a logical shift, but for every
 * other bitwise operator we have to compensate for possible negative
 * results. */
function fixBitwiseResult(v) {
    if (0 > v) {
        v += 0x100000000;
    }
    return v;
}
/**
 * Contain a sequence of bit fields as an unsigned integer.
 *
 * *Factory*: {@link module:Layout.bits|bits}
 *
 * This is a container element; within it there are {@link BitField}
 * instances that provide the extracted properties.  The container
 * simply defines the aggregate representation and its bit ordering.
 * The representation is an object containing properties with numeric
 * or {@link Boolean} values.
 *
 * {@link BitField}s are added with the {@link
 * BitStructure#addField|addField} and {@link
 * BitStructure#addBoolean|addBoolean} methods.

 * @param {Layout} word - initializer for {@link
 * BitStructure#word|word}.  The parameter must be an instance of
 * {@link UInt} (or {@link UIntBE}) that is no more than 4 bytes wide.
 *
 * @param {bool} [msb] - `true` if the bit numbering starts at the
 * most significant bit of the containing word; `false` (default) if
 * it starts at the least significant bit of the containing word.  If
 * the parameter at this position is a string and `property` is
 * `undefined` the value of this argument will instead be used as the
 * value of `property`.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class BitStructure extends Layout {
    constructor(word, msb, property) {
        if (!((word instanceof UInt)
            || (word instanceof UIntBE))) {
            throw new TypeError('word must be a UInt or UIntBE layout');
        }
        if (('string' === typeof msb)
            && (undefined === property)) {
            property = msb;
            msb = false;
        }
        if (4 < word.span) {
            throw new RangeError('word cannot exceed 32 bits');
        }
        super(word.span, property);
        /** The layout used for the packed value.  {@link BitField}
         * instances are packed sequentially depending on {@link
         * BitStructure#msb|msb}. */
        this.word = word;
        /** Whether the bit sequences are packed starting at the most
         * significant bit growing down (`true`), or the least significant
         * bit growing up (`false`).
         *
         * **NOTE** Regardless of this value, the least significant bit of
         * any {@link BitField} value is the least significant bit of the
         * corresponding section of the packed value. */
        this.msb = !!msb;
        /** The sequence of {@link BitField} layouts that comprise the
         * packed structure.
         *
         * **NOTE** The array remains mutable to allow fields to be {@link
         * BitStructure#addField|added} after construction.  Users should
         * not manipulate the content of this property.*/
        this.fields = [];
        /* Storage for the value.  Capture a variable instead of using an
         * instance property because we don't want anything to change the
         * value without going through the mutator. */
        let value = 0;
        this._packedSetValue = function (v) {
            value = fixBitwiseResult(v);
            return this;
        };
        this._packedGetValue = function () {
            return value;
        };
    }
    /** @override */
    decode(b, offset = 0) {
        const dest = this.makeDestinationObject();
        const value = this.word.decode(b, offset);
        this._packedSetValue(value);
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                dest[fd.property] = fd.decode(b);
            }
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the packed
     * value is left unmodified.  Unused bits are also left unmodified. */
    encode(src, b, offset = 0) {
        const value = this.word.decode(b, offset);
        this._packedSetValue(value);
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                const fv = src[fd.property];
                if (undefined !== fv) {
                    fd.encode(fv);
                }
            }
        }
        return this.word.encode(this._packedGetValue(), b, offset);
    }
    /** Register a new bitfield with a containing bit structure.  The
     * resulting bitfield is returned.
     *
     * @param {Number} bits - initializer for {@link BitField#bits|bits}.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {BitField} */
    addField(bits, property) {
        const bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
    }
    /** As with {@link BitStructure#addField|addField} for single-bit
     * fields with `boolean` value representation.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {Boolean} */
    // `Boolean` conflicts with the native primitive type
    // eslint-disable-next-line @typescript-eslint/ban-types
    addBoolean(property) {
        // This is my Boolean, not the Javascript one.
        const bf = new Boolean$1(this, property);
        this.fields.push(bf);
        return bf;
    }
    /**
     * Get access to the bit field for a given property.
     *
     * @param {String} property - the bit field of interest.
     *
     * @return {BitField} - the field associated with `property`, or
     * undefined if there is no such property.
     */
    fieldFor(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        for (const fd of this.fields) {
            if (fd.property === property) {
                return fd;
            }
        }
        return undefined;
    }
}
Layout$1.BitStructure = BitStructure;
/**
 * Represent a sequence of bits within a {@link BitStructure}.
 *
 * All bit field values are represented as unsigned integers.
 *
 * **NOTE** User code should not invoke this constructor directly.
 * Use the container {@link BitStructure#addField|addField} helper
 * method.
 *
 * **NOTE** BitField instances are not instances of {@link Layout}
 * since {@link Layout#span|span} measures 8-bit units.
 *
 * @param {BitStructure} container - initializer for {@link
 * BitField#container|container}.
 *
 * @param {Number} bits - initializer for {@link BitField#bits|bits}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 */
class BitField {
    constructor(container, bits, property) {
        if (!(container instanceof BitStructure)) {
            throw new TypeError('container must be a BitStructure');
        }
        if ((!Number.isInteger(bits)) || (0 >= bits)) {
            throw new TypeError('bits must be positive integer');
        }
        const totalBits = 8 * container.span;
        const usedBits = container.fields.reduce((sum, fd) => sum + fd.bits, 0);
        if ((bits + usedBits) > totalBits) {
            throw new Error('bits too long for span remainder ('
                + (totalBits - usedBits) + ' of '
                + totalBits + ' remain)');
        }
        /** The {@link BitStructure} instance to which this bit field
         * belongs. */
        this.container = container;
        /** The span of this value in bits. */
        this.bits = bits;
        /** A mask of {@link BitField#bits|bits} bits isolating value bits
         * that fit within the field.
         *
         * That is, it masks a value that has not yet been shifted into
         * position within its containing packed integer. */
        this.valueMask = (1 << bits) - 1;
        if (32 === bits) { // shifted value out of range
            this.valueMask = 0xFFFFFFFF;
        }
        /** The offset of the value within the containing packed unsigned
         * integer.  The least significant bit of the packed value is at
         * offset zero, regardless of bit ordering used. */
        this.start = usedBits;
        if (this.container.msb) {
            this.start = totalBits - usedBits - bits;
        }
        /** A mask of {@link BitField#bits|bits} isolating the field value
         * within the containing packed unsigned integer. */
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        /** The property name used when this bitfield is represented in an
         * Object.
         *
         * Intended to be functionally equivalent to {@link
         * Layout#property}.
         *
         * If left undefined the corresponding span of bits will be
         * treated as padding: it will not be mutated by {@link
         * Layout#encode|encode} nor represented as a property in the
         * decoded Object. */
        this.property = property;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field. */
    decode(b, offset) {
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(word & this.wordMask);
        const value = wordValue >>> this.start;
        return value;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field.
     *
     * **NOTE** This is not a specialization of {@link
     * Layout#encode|Layout.encode} and there is no return value. */
    encode(value) {
        if ('number' !== typeof value
            || !Number.isInteger(value)
            || (value !== fixBitwiseResult(value & this.valueMask))) {
            throw new TypeError(nameWithProperty('BitField.encode', this)
                + ' value must be integer not exceeding ' + this.valueMask);
        }
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask)
            | wordValue);
    }
}
Layout$1.BitField = BitField;
/**
 * Represent a single bit within a {@link BitStructure} as a
 * JavaScript boolean.
 *
 * **NOTE** User code should not invoke this constructor directly.
 * Use the container {@link BitStructure#addBoolean|addBoolean} helper
 * method.
 *
 * @param {BitStructure} container - initializer for {@link
 * BitField#container|container}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {BitField}
 */
/* eslint-disable no-extend-native */
class Boolean$1 extends BitField {
    constructor(container, property) {
        super(container, 1, property);
    }
    /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
     *
     * @returns {boolean} */
    decode(b, offset) {
        return !!super.decode(b, offset);
    }
    /** @override */
    encode(value) {
        if ('boolean' === typeof value) {
            // BitField requires integer values
            value = +value;
        }
        super.encode(value);
    }
}
Layout$1.Boolean = Boolean$1;
/* eslint-enable no-extend-native */
/**
 * Contain a fixed-length block of arbitrary data, represented as a
 * Uint8Array.
 *
 * *Factory*: {@link module:Layout.blob|blob}
 *
 * @param {(Number|ExternalLayout)} length - initializes {@link
 * Blob#length|length}.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Blob$1 extends Layout {
    constructor(length, property) {
        if (!(((length instanceof ExternalLayout) && length.isCount())
            || (Number.isInteger(length) && (0 <= length)))) {
            throw new TypeError('length must be positive integer '
                + 'or an unsigned integer ExternalLayout');
        }
        let span = -1;
        if (!(length instanceof ExternalLayout)) {
            span = length;
        }
        super(span, property);
        /** The number of bytes in the blob.
         *
         * This may be a non-negative integer, or an instance of {@link
         * ExternalLayout} that satisfies {@link
         * ExternalLayout#isCount|isCount()}. */
        this.length = length;
    }
    /** @override */
    getSpan(b, offset) {
        let span = this.span;
        if (0 > span) {
            span = this.length.decode(b, offset);
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        let span = this.span;
        if (0 > span) {
            span = this.length.decode(b, offset);
        }
        return uint8ArrayToBuffer(b).slice(offset, offset + span);
    }
    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset) {
        let span = this.length;
        if (this.length instanceof ExternalLayout) {
            span = src.length;
        }
        if (!(src instanceof Uint8Array && span === src.length)) {
            throw new TypeError(nameWithProperty('Blob.encode', this)
                + ' requires (length ' + span + ') Uint8Array as src');
        }
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Uint8Array');
        }
        const srcBuffer = uint8ArrayToBuffer(src);
        uint8ArrayToBuffer(b).write(srcBuffer.toString('hex'), offset, span, 'hex');
        if (this.length instanceof ExternalLayout) {
            this.length.encode(span, b, offset);
        }
        return span;
    }
}
Layout$1.Blob = Blob$1;
/**
 * Contain a `NUL`-terminated UTF8 string.
 *
 * *Factory*: {@link module:Layout.cstr|cstr}
 *
 * **NOTE** Any UTF8 string that incorporates a zero-valued byte will
 * not be correctly decoded by this layout.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class CString extends Layout {
    constructor(property) {
        super(-1, property);
    }
    /** @override */
    getSpan(b, offset = 0) {
        checkUint8Array(b);
        let idx = offset;
        while ((idx < b.length) && (0 !== b[idx])) {
            idx += 1;
        }
        return 1 + idx - offset;
    }
    /** @override */
    decode(b, offset = 0) {
        const span = this.getSpan(b, offset);
        return uint8ArrayToBuffer(b).slice(offset, offset + span - 1).toString('utf-8');
    }
    /** @override */
    encode(src, b, offset = 0) {
        /* Must force this to a string, lest it be a number and the
         * "utf8-encoding" below actually allocate a buffer of length
         * src */
        if ('string' !== typeof src) {
            src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, 'utf8');
        const span = srcb.length;
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Buffer');
        }
        const buffer = uint8ArrayToBuffer(b);
        srcb.copy(buffer, offset);
        buffer[offset + span] = 0;
        return span + 1;
    }
}
Layout$1.CString = CString;
/**
 * Contain a UTF8 string with implicit length.
 *
 * *Factory*: {@link module:Layout.utf8|utf8}
 *
 * **NOTE** Because the length is implicit in the size of the buffer
 * this layout should be used only in isolation, or in a situation
 * where the length can be expressed by operating on a slice of the
 * containing buffer.
 *
 * @param {Number} [maxSpan] - the maximum length allowed for encoded
 * string content.  If not provided there is no bound on the allowed
 * content.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UTF8 extends Layout {
    constructor(maxSpan, property) {
        if (('string' === typeof maxSpan) && (undefined === property)) {
            property = maxSpan;
            maxSpan = undefined;
        }
        if (undefined === maxSpan) {
            maxSpan = -1;
        }
        else if (!Number.isInteger(maxSpan)) {
            throw new TypeError('maxSpan must be an integer');
        }
        super(-1, property);
        /** The maximum span of the layout in bytes.
         *
         * Positive values are generally expected.  Zero is abnormal.
         * Attempts to encode or decode a value that exceeds this length
         * will throw a `RangeError`.
         *
         * A negative value indicates that there is no bound on the length
         * of the content. */
        this.maxSpan = maxSpan;
    }
    /** @override */
    getSpan(b, offset = 0) {
        checkUint8Array(b);
        return b.length - offset;
    }
    /** @override */
    decode(b, offset = 0) {
        const span = this.getSpan(b, offset);
        if ((0 <= this.maxSpan)
            && (this.maxSpan < span)) {
            throw new RangeError('text length exceeds maxSpan');
        }
        return uint8ArrayToBuffer(b).slice(offset, offset + span).toString('utf-8');
    }
    /** @override */
    encode(src, b, offset = 0) {
        /* Must force this to a string, lest it be a number and the
         * "utf8-encoding" below actually allocate a buffer of length
         * src */
        if ('string' !== typeof src) {
            src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, 'utf8');
        const span = srcb.length;
        if ((0 <= this.maxSpan)
            && (this.maxSpan < span)) {
            throw new RangeError('text length exceeds maxSpan');
        }
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Buffer');
        }
        srcb.copy(uint8ArrayToBuffer(b), offset);
        return span;
    }
}
Layout$1.UTF8 = UTF8;
/**
 * Contain a constant value.
 *
 * This layout may be used in cases where a JavaScript value can be
 * inferred without an expression in the binary encoding.  An example
 * would be a {@link VariantLayout|variant layout} where the content
 * is implied by the union {@link Union#discriminator|discriminator}.
 *
 * @param {Object|Number|String} value - initializer for {@link
 * Constant#value|value}.  If the value is an object (or array) and
 * the application intends the object to remain unchanged regardless
 * of what is done to values decoded by this layout, the value should
 * be frozen prior passing it to this constructor.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Constant extends Layout {
    constructor(value, property) {
        super(0, property);
        /** The value produced by this constant when the layout is {@link
         * Constant#decode|decoded}.
         *
         * Any JavaScript value including `null` and `undefined` is
         * permitted.
         *
         * **WARNING** If `value` passed in the constructor was not
         * frozen, it is possible for users of decoded values to change
         * the content of the value. */
        this.value = value;
    }
    /** @override */
    decode(b, offset) {
        return this.value;
    }
    /** @override */
    encode(src, b, offset) {
        /* Constants take no space */
        return 0;
    }
}
Layout$1.Constant = Constant;
/** Factory for {@link GreedyCount}. */
Layout$1.greedy = ((elementSpan, property) => new GreedyCount(elementSpan, property));
/** Factory for {@link OffsetLayout}. */
var offset = Layout$1.offset = ((layout, offset, property) => new OffsetLayout(layout, offset, property));
/** Factory for {@link UInt|unsigned int layouts} spanning one
 * byte. */
var u8 = Layout$1.u8 = ((property) => new UInt(1, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning two bytes. */
var u16 = Layout$1.u16 = ((property) => new UInt(2, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning three bytes. */
Layout$1.u24 = ((property) => new UInt(3, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning four bytes. */
var u32 = Layout$1.u32 = ((property) => new UInt(4, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning five bytes. */
Layout$1.u40 = ((property) => new UInt(5, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning six bytes. */
Layout$1.u48 = ((property) => new UInt(6, property));
/** Factory for {@link NearUInt64|little-endian unsigned int
 * layouts} interpreted as Numbers. */
var nu64 = Layout$1.nu64 = ((property) => new NearUInt64(property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning two bytes. */
Layout$1.u16be = ((property) => new UIntBE(2, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning three bytes. */
Layout$1.u24be = ((property) => new UIntBE(3, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning four bytes. */
Layout$1.u32be = ((property) => new UIntBE(4, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning five bytes. */
Layout$1.u40be = ((property) => new UIntBE(5, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning six bytes. */
Layout$1.u48be = ((property) => new UIntBE(6, property));
/** Factory for {@link NearUInt64BE|big-endian unsigned int
 * layouts} interpreted as Numbers. */
Layout$1.nu64be = ((property) => new NearUInt64BE(property));
/** Factory for {@link Int|signed int layouts} spanning one
 * byte. */
Layout$1.s8 = ((property) => new Int(1, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning two bytes. */
Layout$1.s16 = ((property) => new Int(2, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning three bytes. */
Layout$1.s24 = ((property) => new Int(3, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning four bytes. */
Layout$1.s32 = ((property) => new Int(4, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning five bytes. */
Layout$1.s40 = ((property) => new Int(5, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning six bytes. */
Layout$1.s48 = ((property) => new Int(6, property));
/** Factory for {@link NearInt64|little-endian signed int layouts}
 * interpreted as Numbers. */
var ns64 = Layout$1.ns64 = ((property) => new NearInt64(property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning two bytes. */
Layout$1.s16be = ((property) => new IntBE(2, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning three bytes. */
Layout$1.s24be = ((property) => new IntBE(3, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning four bytes. */
Layout$1.s32be = ((property) => new IntBE(4, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning five bytes. */
Layout$1.s40be = ((property) => new IntBE(5, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning six bytes. */
Layout$1.s48be = ((property) => new IntBE(6, property));
/** Factory for {@link NearInt64BE|big-endian signed int layouts}
 * interpreted as Numbers. */
Layout$1.ns64be = ((property) => new NearInt64BE(property));
/** Factory for {@link Float|little-endian 32-bit floating point} values. */
Layout$1.f32 = ((property) => new Float(property));
/** Factory for {@link FloatBE|big-endian 32-bit floating point} values. */
Layout$1.f32be = ((property) => new FloatBE(property));
/** Factory for {@link Double|little-endian 64-bit floating point} values. */
Layout$1.f64 = ((property) => new Double(property));
/** Factory for {@link DoubleBE|big-endian 64-bit floating point} values. */
Layout$1.f64be = ((property) => new DoubleBE(property));
/** Factory for {@link Structure} values. */
var struct = Layout$1.struct = ((fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes));
/** Factory for {@link BitStructure} values. */
Layout$1.bits = ((word, msb, property) => new BitStructure(word, msb, property));
/** Factory for {@link Sequence} values. */
var seq = Layout$1.seq = ((elementLayout, count, property) => new Sequence(elementLayout, count, property));
/** Factory for {@link Union} values. */
Layout$1.union = ((discr, defaultLayout, property) => new Union(discr, defaultLayout, property));
/** Factory for {@link UnionLayoutDiscriminator} values. */
Layout$1.unionLayoutDiscriminator = ((layout, property) => new UnionLayoutDiscriminator(layout, property));
/** Factory for {@link Blob} values. */
var blob = Layout$1.blob = ((length, property) => new Blob$1(length, property));
/** Factory for {@link CString} values. */
Layout$1.cstr = ((property) => new CString(property));
/** Factory for {@link UTF8} values. */
Layout$1.utf8 = ((maxSpan, property) => new UTF8(maxSpan, property));
/** Factory for {@link Constant} values. */
Layout$1.constant = ((value, property) => new Constant(value, property));

/**
 * Layout for a public key
 */

const publicKey = (property = 'publicKey') => {
  return blob(32, property);
};

/**
 * Layout for a Rust String type
 */
const rustString = (property = 'string') => {
  const rsl = struct([u32('length'), u32('lengthPadding'), blob(offset(u32(), -8), 'chars')], property);

  const _decode = rsl.decode.bind(rsl);

  const _encode = rsl.encode.bind(rsl);

  const rslShim = rsl;

  rslShim.decode = (b, offset) => {
    const data = _decode(b, offset);

    return data['chars'].toString();
  };

  rslShim.encode = (str, b, offset) => {
    const data = {
      chars: Buffer$1.from(str, 'utf8')
    };
    return _encode(data, b, offset);
  };

  rslShim.alloc = str => {
    return u32().span + u32().span + Buffer$1.from(str, 'utf8').length;
  };

  return rslShim;
};
/**
 * Layout for an Authorized object
 */

const authorized = (property = 'authorized') => {
  return struct([publicKey('staker'), publicKey('withdrawer')], property);
};
/**
 * Layout for a Lockup object
 */

const lockup = (property = 'lockup') => {
  return struct([ns64('unixTimestamp'), ns64('epoch'), publicKey('custodian')], property);
};
/**
 *  Layout for a VoteInit object
 */

const voteInit = (property = 'voteInit') => {
  return struct([publicKey('nodePubkey'), publicKey('authorizedVoter'), publicKey('authorizedWithdrawer'), u8('commission')], property);
};
function getAlloc(type, fields) {
  let alloc = 0;
  type.layout.fields.forEach(item => {
    if (item.span >= 0) {
      alloc += item.span;
    } else if (typeof item.alloc === 'function') {
      alloc += item.alloc(fields[item.property]);
    }
  });
  return alloc;
}

function decodeLength(bytes) {
  let len = 0;
  let size = 0;

  for (;;) {
    let elem = bytes.shift();
    len |= (elem & 0x7f) << size * 7;
    size += 1;

    if ((elem & 0x80) === 0) {
      break;
    }
  }

  return len;
}
function encodeLength(bytes, len) {
  let rem_len = len;

  for (;;) {
    let elem = rem_len & 0x7f;
    rem_len >>= 7;

    if (rem_len == 0) {
      bytes.push(elem);
      break;
    } else {
      elem |= 0x80;
      bytes.push(elem);
    }
  }
}

/**
 * The message header, identifying signed and read-only account
 */

const PUBKEY_LENGTH = 32;
/**
 * List of instructions to be processed atomically
 */

class Message {
  constructor(args) {
    this.header = void 0;
    this.accountKeys = void 0;
    this.recentBlockhash = void 0;
    this.instructions = void 0;
    this.indexToProgramIds = new Map();
    this.header = args.header;
    this.accountKeys = args.accountKeys.map(account => new PublicKey(account));
    this.recentBlockhash = args.recentBlockhash;
    this.instructions = args.instructions;
    this.instructions.forEach(ix => this.indexToProgramIds.set(ix.programIdIndex, this.accountKeys[ix.programIdIndex]));
  }

  isAccountSigner(index) {
    return index < this.header.numRequiredSignatures;
  }

  isAccountWritable(index) {
    return index < this.header.numRequiredSignatures - this.header.numReadonlySignedAccounts || index >= this.header.numRequiredSignatures && index < this.accountKeys.length - this.header.numReadonlyUnsignedAccounts;
  }

  isProgramId(index) {
    return this.indexToProgramIds.has(index);
  }

  programIds() {
    return [...this.indexToProgramIds.values()];
  }

  nonProgramIds() {
    return this.accountKeys.filter((_, index) => !this.isProgramId(index));
  }

  serialize() {
    const numKeys = this.accountKeys.length;
    let keyCount = [];
    encodeLength(keyCount, numKeys);
    const instructions = this.instructions.map(instruction => {
      const {
        accounts,
        programIdIndex
      } = instruction;
      const data = Array.from(bs58$1.decode(instruction.data));
      let keyIndicesCount = [];
      encodeLength(keyIndicesCount, accounts.length);
      let dataCount = [];
      encodeLength(dataCount, data.length);
      return {
        programIdIndex,
        keyIndicesCount: Buffer$1.from(keyIndicesCount),
        keyIndices: accounts,
        dataLength: Buffer$1.from(dataCount),
        data
      };
    });
    let instructionCount = [];
    encodeLength(instructionCount, instructions.length);
    let instructionBuffer = Buffer$1.alloc(PACKET_DATA_SIZE);
    Buffer$1.from(instructionCount).copy(instructionBuffer);
    let instructionBufferLength = instructionCount.length;
    instructions.forEach(instruction => {
      const instructionLayout = struct([u8('programIdIndex'), blob(instruction.keyIndicesCount.length, 'keyIndicesCount'), seq(u8('keyIndex'), instruction.keyIndices.length, 'keyIndices'), blob(instruction.dataLength.length, 'dataLength'), seq(u8('userdatum'), instruction.data.length, 'data')]);
      const length = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
      instructionBufferLength += length;
    });
    instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
    const signDataLayout = struct([blob(1, 'numRequiredSignatures'), blob(1, 'numReadonlySignedAccounts'), blob(1, 'numReadonlyUnsignedAccounts'), blob(keyCount.length, 'keyCount'), seq(publicKey('key'), numKeys, 'keys'), publicKey('recentBlockhash')]);
    const transaction = {
      numRequiredSignatures: Buffer$1.from([this.header.numRequiredSignatures]),
      numReadonlySignedAccounts: Buffer$1.from([this.header.numReadonlySignedAccounts]),
      numReadonlyUnsignedAccounts: Buffer$1.from([this.header.numReadonlyUnsignedAccounts]),
      keyCount: Buffer$1.from(keyCount),
      keys: this.accountKeys.map(key => toBuffer(key.toBytes())),
      recentBlockhash: bs58$1.decode(this.recentBlockhash)
    };
    let signData = Buffer$1.alloc(2048);
    const length = signDataLayout.encode(transaction, signData);
    instructionBuffer.copy(signData, length);
    return signData.slice(0, length + instructionBuffer.length);
  }
  /**
   * Decode a compiled message into a Message object.
   */


  static from(buffer) {
    // Slice up wire data
    let byteArray = [...buffer];
    const numRequiredSignatures = byteArray.shift();
    const numReadonlySignedAccounts = byteArray.shift();
    const numReadonlyUnsignedAccounts = byteArray.shift();
    const accountCount = decodeLength(byteArray);
    let accountKeys = [];

    for (let i = 0; i < accountCount; i++) {
      const account = byteArray.slice(0, PUBKEY_LENGTH);
      byteArray = byteArray.slice(PUBKEY_LENGTH);
      accountKeys.push(bs58$1.encode(Buffer$1.from(account)));
    }

    const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH);
    byteArray = byteArray.slice(PUBKEY_LENGTH);
    const instructionCount = decodeLength(byteArray);
    let instructions = [];

    for (let i = 0; i < instructionCount; i++) {
      const programIdIndex = byteArray.shift();
      const accountCount = decodeLength(byteArray);
      const accounts = byteArray.slice(0, accountCount);
      byteArray = byteArray.slice(accountCount);
      const dataLength = decodeLength(byteArray);
      const dataSlice = byteArray.slice(0, dataLength);
      const data = bs58$1.encode(Buffer$1.from(dataSlice));
      byteArray = byteArray.slice(dataLength);
      instructions.push({
        programIdIndex,
        accounts,
        data
      });
    }

    const messageArgs = {
      header: {
        numRequiredSignatures,
        numReadonlySignedAccounts,
        numReadonlyUnsignedAccounts
      },
      recentBlockhash: bs58$1.encode(Buffer$1.from(recentBlockhash)),
      accountKeys,
      instructions
    };
    return new Message(messageArgs);
  }

}

function assert$c (condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Default (empty) signature
 *
 * Signatures are 64 bytes in length
 */
const DEFAULT_SIGNATURE = Buffer$1.alloc(64).fill(0);
/**
 * Maximum over-the-wire size of a Transaction
 *
 * 1280 is IPv6 minimum MTU
 * 40 bytes is the size of the IPv6 header
 * 8 bytes is the size of the fragment header
 */

const PACKET_DATA_SIZE = 1280 - 40 - 8;
const SIGNATURE_LENGTH = 64;
/**
 * Account metadata used to define instructions
 */

/**
 * Transaction Instruction class
 */
class TransactionInstruction {
  /**
   * Public keys to include in this transaction
   * Boolean represents whether this pubkey needs to sign the transaction
   */

  /**
   * Program Id to execute
   */

  /**
   * Program input
   */
  constructor(opts) {
    this.keys = void 0;
    this.programId = void 0;
    this.data = Buffer$1.alloc(0);
    this.programId = opts.programId;
    this.keys = opts.keys;

    if (opts.data) {
      this.data = opts.data;
    }
  }
  /**
   * @internal
   */


  toJSON() {
    return {
      keys: this.keys.map(({
        pubkey,
        isSigner,
        isWritable
      }) => ({
        pubkey: pubkey.toJSON(),
        isSigner,
        isWritable
      })),
      programId: this.programId.toJSON(),
      data: [...this.data]
    };
  }

}
/**
 * Pair of signature and corresponding public key
 */

/**
 * Transaction class
 */
class Transaction {
  /**
   * Signatures for the transaction.  Typically created by invoking the
   * `sign()` method
   */

  /**
   * The first (payer) Transaction signature
   */
  get signature() {
    if (this.signatures.length > 0) {
      return this.signatures[0].signature;
    }

    return null;
  }
  /**
   * The transaction fee payer
   */


  /**
   * Construct an empty Transaction
   */
  constructor(opts) {
    this.signatures = [];
    this.feePayer = void 0;
    this.instructions = [];
    this.recentBlockhash = void 0;
    this.nonceInfo = void 0;
    this._message = void 0;
    this._json = void 0;
    opts && Object.assign(this, opts);
  }
  /**
   * @internal
   */


  toJSON() {
    return {
      recentBlockhash: this.recentBlockhash || null,
      feePayer: this.feePayer ? this.feePayer.toJSON() : null,
      nonceInfo: this.nonceInfo ? {
        nonce: this.nonceInfo.nonce,
        nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
      } : null,
      instructions: this.instructions.map(instruction => instruction.toJSON()),
      signers: this.signatures.map(({
        publicKey
      }) => {
        return publicKey.toJSON();
      })
    };
  }
  /**
   * Add one or more instructions to this Transaction
   */


  add(...items) {
    if (items.length === 0) {
      throw new Error('No instructions');
    }

    items.forEach(item => {
      if ('instructions' in item) {
        this.instructions = this.instructions.concat(item.instructions);
      } else if ('data' in item && 'programId' in item && 'keys' in item) {
        this.instructions.push(item);
      } else {
        this.instructions.push(new TransactionInstruction(item));
      }
    });
    return this;
  }
  /**
   * Compile transaction data
   */


  compileMessage() {
    if (this._message) {
      if (JSON.stringify(this.toJSON()) !== JSON.stringify(this._json)) {
        throw new Error('Transaction message mutated after being populated from Message');
      }

      return this._message;
    }

    const {
      nonceInfo
    } = this;

    if (nonceInfo && this.instructions[0] != nonceInfo.nonceInstruction) {
      this.recentBlockhash = nonceInfo.nonce;
      this.instructions.unshift(nonceInfo.nonceInstruction);
    }

    const {
      recentBlockhash
    } = this;

    if (!recentBlockhash) {
      throw new Error('Transaction recentBlockhash required');
    }

    if (this.instructions.length < 1) {
      console.warn('No instructions provided');
    }

    let feePayer;

    if (this.feePayer) {
      feePayer = this.feePayer;
    } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
      // Use implicit fee payer
      feePayer = this.signatures[0].publicKey;
    } else {
      throw new Error('Transaction fee payer required');
    }

    for (let i = 0; i < this.instructions.length; i++) {
      if (this.instructions[i].programId === undefined) {
        throw new Error(`Transaction instruction index ${i} has undefined program id`);
      }
    }

    const programIds = [];
    const accountMetas = [];
    this.instructions.forEach(instruction => {
      instruction.keys.forEach(accountMeta => {
        accountMetas.push({ ...accountMeta
        });
      });
      const programId = instruction.programId.toString();

      if (!programIds.includes(programId)) {
        programIds.push(programId);
      }
    }); // Append programID account metas

    programIds.forEach(programId => {
      accountMetas.push({
        pubkey: new PublicKey(programId),
        isSigner: false,
        isWritable: false
      });
    }); // Sort. Prioritizing first by signer, then by writable

    accountMetas.sort(function (x, y) {
      const pubkeySorting = x.pubkey.toBase58().localeCompare(y.pubkey.toBase58());
      const checkSigner = x.isSigner === y.isSigner ? 0 : x.isSigner ? -1 : 1;
      const checkWritable = x.isWritable === y.isWritable ? pubkeySorting : x.isWritable ? -1 : 1;
      return checkSigner || checkWritable;
    }); // Cull duplicate account metas

    const uniqueMetas = [];
    accountMetas.forEach(accountMeta => {
      const pubkeyString = accountMeta.pubkey.toString();
      const uniqueIndex = uniqueMetas.findIndex(x => {
        return x.pubkey.toString() === pubkeyString;
      });

      if (uniqueIndex > -1) {
        uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
      } else {
        uniqueMetas.push(accountMeta);
      }
    }); // Move fee payer to the front

    const feePayerIndex = uniqueMetas.findIndex(x => {
      return x.pubkey.equals(feePayer);
    });

    if (feePayerIndex > -1) {
      const [payerMeta] = uniqueMetas.splice(feePayerIndex, 1);
      payerMeta.isSigner = true;
      payerMeta.isWritable = true;
      uniqueMetas.unshift(payerMeta);
    } else {
      uniqueMetas.unshift({
        pubkey: feePayer,
        isSigner: true,
        isWritable: true
      });
    } // Disallow unknown signers


    for (const signature of this.signatures) {
      const uniqueIndex = uniqueMetas.findIndex(x => {
        return x.pubkey.equals(signature.publicKey);
      });

      if (uniqueIndex > -1) {
        if (!uniqueMetas[uniqueIndex].isSigner) {
          uniqueMetas[uniqueIndex].isSigner = true;
          console.warn('Transaction references a signature that is unnecessary, ' + 'only the fee payer and instruction signer accounts should sign a transaction. ' + 'This behavior is deprecated and will throw an error in the next major version release.');
        }
      } else {
        throw new Error(`unknown signer: ${signature.publicKey.toString()}`);
      }
    }

    let numRequiredSignatures = 0;
    let numReadonlySignedAccounts = 0;
    let numReadonlyUnsignedAccounts = 0; // Split out signing from non-signing keys and count header values

    const signedKeys = [];
    const unsignedKeys = [];
    uniqueMetas.forEach(({
      pubkey,
      isSigner,
      isWritable
    }) => {
      if (isSigner) {
        signedKeys.push(pubkey.toString());
        numRequiredSignatures += 1;

        if (!isWritable) {
          numReadonlySignedAccounts += 1;
        }
      } else {
        unsignedKeys.push(pubkey.toString());

        if (!isWritable) {
          numReadonlyUnsignedAccounts += 1;
        }
      }
    });
    const accountKeys = signedKeys.concat(unsignedKeys);
    const instructions = this.instructions.map(instruction => {
      const {
        data,
        programId
      } = instruction;
      return {
        programIdIndex: accountKeys.indexOf(programId.toString()),
        accounts: instruction.keys.map(meta => accountKeys.indexOf(meta.pubkey.toString())),
        data: bs58$1.encode(data)
      };
    });
    instructions.forEach(instruction => {
      assert$c(instruction.programIdIndex >= 0);
      instruction.accounts.forEach(keyIndex => assert$c(keyIndex >= 0));
    });
    return new Message({
      header: {
        numRequiredSignatures,
        numReadonlySignedAccounts,
        numReadonlyUnsignedAccounts
      },
      accountKeys,
      recentBlockhash,
      instructions
    });
  }
  /**
   * @internal
   */


  _compile() {
    const message = this.compileMessage();
    const signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);

    if (this.signatures.length === signedKeys.length) {
      const valid = this.signatures.every((pair, index) => {
        return signedKeys[index].equals(pair.publicKey);
      });
      if (valid) return message;
    }

    this.signatures = signedKeys.map(publicKey => ({
      signature: null,
      publicKey
    }));
    return message;
  }
  /**
   * Get a buffer of the Transaction data that need to be covered by signatures
   */


  serializeMessage() {
    return this._compile().serialize();
  }
  /**
   * Get the estimated fee associated with a transaction
   */


  async getEstimatedFee(connection) {
    return (await connection.getFeeForMessage(this.compileMessage())).value;
  }
  /**
   * Specify the public keys which will be used to sign the Transaction.
   * The first signer will be used as the transaction fee payer account.
   *
   * Signatures can be added with either `partialSign` or `addSignature`
   *
   * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
   * specified and it can be set in the Transaction constructor or with the
   * `feePayer` property.
   */


  setSigners(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    }

    const seen = new Set();
    this.signatures = signers.filter(publicKey => {
      const key = publicKey.toString();

      if (seen.has(key)) {
        return false;
      } else {
        seen.add(key);
        return true;
      }
    }).map(publicKey => ({
      signature: null,
      publicKey
    }));
  }
  /**
   * Sign the Transaction with the specified signers. Multiple signatures may
   * be applied to a Transaction. The first signature is considered "primary"
   * and is used identify and confirm transactions.
   *
   * If the Transaction `feePayer` is not set, the first signer will be used
   * as the transaction fee payer account.
   *
   * Transaction fields should not be modified after the first call to `sign`,
   * as doing so may invalidate the signature and cause the Transaction to be
   * rejected.
   *
   * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
   */


  sign(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    } // Dedupe signers


    const seen = new Set();
    const uniqueSigners = [];

    for (const signer of signers) {
      const key = signer.publicKey.toString();

      if (seen.has(key)) {
        continue;
      } else {
        seen.add(key);
        uniqueSigners.push(signer);
      }
    }

    this.signatures = uniqueSigners.map(signer => ({
      signature: null,
      publicKey: signer.publicKey
    }));

    const message = this._compile();

    this._partialSign(message, ...uniqueSigners);

    this._verifySignatures(message.serialize(), true);
  }
  /**
   * Partially sign a transaction with the specified accounts. All accounts must
   * correspond to either the fee payer or a signer account in the transaction
   * instructions.
   *
   * All the caveats from the `sign` method apply to `partialSign`
   */


  partialSign(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    } // Dedupe signers


    const seen = new Set();
    const uniqueSigners = [];

    for (const signer of signers) {
      const key = signer.publicKey.toString();

      if (seen.has(key)) {
        continue;
      } else {
        seen.add(key);
        uniqueSigners.push(signer);
      }
    }

    const message = this._compile();

    this._partialSign(message, ...uniqueSigners);
  }
  /**
   * @internal
   */


  _partialSign(message, ...signers) {
    const signData = message.serialize();
    signers.forEach(signer => {
      const signature = nacl.sign.detached(signData, signer.secretKey);

      this._addSignature(signer.publicKey, toBuffer(signature));
    });
  }
  /**
   * Add an externally created signature to a transaction. The public key
   * must correspond to either the fee payer or a signer account in the transaction
   * instructions.
   */


  addSignature(pubkey, signature) {
    this._compile(); // Ensure signatures array is populated


    this._addSignature(pubkey, signature);
  }
  /**
   * @internal
   */


  _addSignature(pubkey, signature) {
    assert$c(signature.length === 64);
    const index = this.signatures.findIndex(sigpair => pubkey.equals(sigpair.publicKey));

    if (index < 0) {
      throw new Error(`unknown signer: ${pubkey.toString()}`);
    }

    this.signatures[index].signature = Buffer$1.from(signature);
  }
  /**
   * Verify signatures of a complete, signed Transaction
   */


  verifySignatures() {
    return this._verifySignatures(this.serializeMessage(), true);
  }
  /**
   * @internal
   */


  _verifySignatures(signData, requireAllSignatures) {
    for (const {
      signature,
      publicKey
    } of this.signatures) {
      if (signature === null) {
        if (requireAllSignatures) {
          return false;
        }
      } else {
        if (!nacl.sign.detached.verify(signData, signature, publicKey.toBuffer())) {
          return false;
        }
      }
    }

    return true;
  }
  /**
   * Serialize the Transaction in the wire format.
   */


  serialize(config) {
    const {
      requireAllSignatures,
      verifySignatures
    } = Object.assign({
      requireAllSignatures: true,
      verifySignatures: true
    }, config);
    const signData = this.serializeMessage();

    if (verifySignatures && !this._verifySignatures(signData, requireAllSignatures)) {
      throw new Error('Signature verification failed');
    }

    return this._serialize(signData);
  }
  /**
   * @internal
   */


  _serialize(signData) {
    const {
      signatures
    } = this;
    const signatureCount = [];
    encodeLength(signatureCount, signatures.length);
    const transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
    const wireTransaction = Buffer$1.alloc(transactionLength);
    assert$c(signatures.length < 256);
    Buffer$1.from(signatureCount).copy(wireTransaction, 0);
    signatures.forEach(({
      signature
    }, index) => {
      if (signature !== null) {
        assert$c(signature.length === 64, `signature has invalid length`);
        Buffer$1.from(signature).copy(wireTransaction, signatureCount.length + index * 64);
      }
    });
    signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
    assert$c(wireTransaction.length <= PACKET_DATA_SIZE, `Transaction too large: ${wireTransaction.length} > ${PACKET_DATA_SIZE}`);
    return wireTransaction;
  }
  /**
   * Deprecated method
   * @internal
   */


  get keys() {
    assert$c(this.instructions.length === 1);
    return this.instructions[0].keys.map(keyObj => keyObj.pubkey);
  }
  /**
   * Deprecated method
   * @internal
   */


  get programId() {
    assert$c(this.instructions.length === 1);
    return this.instructions[0].programId;
  }
  /**
   * Deprecated method
   * @internal
   */


  get data() {
    assert$c(this.instructions.length === 1);
    return this.instructions[0].data;
  }
  /**
   * Parse a wire transaction into a Transaction object.
   */


  static from(buffer) {
    // Slice up wire data
    let byteArray = [...buffer];
    const signatureCount = decodeLength(byteArray);
    let signatures = [];

    for (let i = 0; i < signatureCount; i++) {
      const signature = byteArray.slice(0, SIGNATURE_LENGTH);
      byteArray = byteArray.slice(SIGNATURE_LENGTH);
      signatures.push(bs58$1.encode(Buffer$1.from(signature)));
    }

    return Transaction.populate(Message.from(byteArray), signatures);
  }
  /**
   * Populate Transaction object from message and signatures
   */


  static populate(message, signatures = []) {
    const transaction = new Transaction();
    transaction.recentBlockhash = message.recentBlockhash;

    if (message.header.numRequiredSignatures > 0) {
      transaction.feePayer = message.accountKeys[0];
    }

    signatures.forEach((signature, index) => {
      const sigPubkeyPair = {
        signature: signature == bs58$1.encode(DEFAULT_SIGNATURE) ? null : bs58$1.decode(signature),
        publicKey: message.accountKeys[index]
      };
      transaction.signatures.push(sigPubkeyPair);
    });
    message.instructions.forEach(instruction => {
      const keys = instruction.accounts.map(account => {
        const pubkey = message.accountKeys[account];
        return {
          pubkey,
          isSigner: transaction.signatures.some(keyObj => keyObj.publicKey.toString() === pubkey.toString()) || message.isAccountSigner(account),
          isWritable: message.isAccountWritable(account)
        };
      });
      transaction.instructions.push(new TransactionInstruction({
        keys,
        programId: message.accountKeys[instruction.programIdIndex],
        data: bs58$1.decode(instruction.data)
      }));
    });
    transaction._message = message;
    transaction._json = transaction.toJSON();
    return transaction;
  }

}

const SYSVAR_CLOCK_PUBKEY = new PublicKey('SysvarC1ock11111111111111111111111111111111');
const SYSVAR_EPOCH_SCHEDULE_PUBKEY = new PublicKey('SysvarEpochSchedu1e111111111111111111111111');
const SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey('Sysvar1nstructions1111111111111111111111111');
const SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey('SysvarRecentB1ockHashes11111111111111111111');
const SYSVAR_RENT_PUBKEY = new PublicKey('SysvarRent111111111111111111111111111111111');
const SYSVAR_REWARDS_PUBKEY = new PublicKey('SysvarRewards111111111111111111111111111111');
const SYSVAR_SLOT_HASHES_PUBKEY = new PublicKey('SysvarS1otHashes111111111111111111111111111');
const SYSVAR_SLOT_HISTORY_PUBKEY = new PublicKey('SysvarS1otHistory11111111111111111111111111');
const SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey('SysvarStakeHistory1111111111111111111111111');

/**
 * Sign, send and confirm a transaction.
 *
 * If `commitment` option is not specified, defaults to 'max' commitment.
 *
 * @param {Connection} connection
 * @param {Transaction} transaction
 * @param {Array<Signer>} signers
 * @param {ConfirmOptions} [options]
 * @returns {Promise<TransactionSignature>}
 */
async function sendAndConfirmTransaction(connection, transaction, signers, options) {
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment,
    maxRetries: options.maxRetries
  };
  const signature = await connection.sendTransaction(transaction, signers, sendOptions);
  const status = (await connection.confirmTransaction(signature, options && options.commitment)).value;

  if (status.err) {
    throw new Error(`Transaction ${signature} failed (${JSON.stringify(status)})`);
  }

  return signature;
}

// zzz
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Populate a buffer of instruction data using an InstructionType
 * @internal
 */
function encodeData(type, fields) {
  const allocLength = type.layout.span >= 0 ? type.layout.span : getAlloc(type, fields);
  const data = Buffer$1.alloc(allocLength);
  const layoutFields = Object.assign({
    instruction: type.index
  }, fields);
  type.layout.encode(layoutFields, data);
  return data;
}
/**
 * Decode instruction data buffer using an InstructionType
 * @internal
 */

function decodeData(type, buffer) {
  let data;

  try {
    data = type.layout.decode(buffer);
  } catch (err) {
    throw new Error('invalid instruction; ' + err);
  }

  if (data.instruction !== type.index) {
    throw new Error(`invalid instruction; instruction index mismatch ${data.instruction} != ${type.index}`);
  }

  return data;
}

/**
 * https://github.com/solana-labs/solana/blob/90bedd7e067b5b8f3ddbb45da00a4e9cabb22c62/sdk/src/fee_calculator.rs#L7-L11
 *
 * @internal
 */

const FeeCalculatorLayout = nu64('lamportsPerSignature');
/**
 * Calculator for transaction fees.
 */

/**
 * See https://github.com/solana-labs/solana/blob/0ea2843ec9cdc517572b8e62c959f41b55cf4453/sdk/src/nonce_state.rs#L29-L32
 *
 * @internal
 */

const NonceAccountLayout = struct([u32('version'), u32('state'), publicKey('authorizedPubkey'), publicKey('nonce'), struct([FeeCalculatorLayout], 'feeCalculator')]);
const NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span;

/**
 * NonceAccount class
 */
class NonceAccount {
  /**
   * @internal
   */
  constructor(args) {
    this.authorizedPubkey = void 0;
    this.nonce = void 0;
    this.feeCalculator = void 0;
    this.authorizedPubkey = args.authorizedPubkey;
    this.nonce = args.nonce;
    this.feeCalculator = args.feeCalculator;
  }
  /**
   * Deserialize NonceAccount from the account data.
   *
   * @param buffer account data
   * @return NonceAccount
   */


  static fromAccountData(buffer) {
    const nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0);
    return new NonceAccount({
      authorizedPubkey: new PublicKey(nonceAccount.authorizedPubkey),
      nonce: new PublicKey(nonceAccount.nonce).toString(),
      feeCalculator: nonceAccount.feeCalculator
    });
  }

}

/**
 * Create account system transaction params
 */

/**
 * System Instruction class
 */
class SystemInstruction {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Decode a system instruction and retrieve the instruction type.
   */


  static decodeInstructionType(instruction) {
    this.checkProgramId(instruction.programId);
    const instructionTypeLayout = u32('instruction');
    const typeIndex = instructionTypeLayout.decode(instruction.data);
    let type;

    for (const [ixType, layout] of Object.entries(SYSTEM_INSTRUCTION_LAYOUTS)) {
      if (layout.index == typeIndex) {
        type = ixType;
        break;
      }
    }

    if (!type) {
      throw new Error('Instruction type incorrect; not a SystemInstruction');
    }

    return type;
  }
  /**
   * Decode a create account system instruction and retrieve the instruction params.
   */


  static decodeCreateAccount(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      lamports,
      space,
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Create, instruction.data);
    return {
      fromPubkey: instruction.keys[0].pubkey,
      newAccountPubkey: instruction.keys[1].pubkey,
      lamports,
      space,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode a transfer system instruction and retrieve the instruction params.
   */


  static decodeTransfer(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      lamports
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Transfer, instruction.data);
    return {
      fromPubkey: instruction.keys[0].pubkey,
      toPubkey: instruction.keys[1].pubkey,
      lamports
    };
  }
  /**
   * Decode a transfer with seed system instruction and retrieve the instruction params.
   */


  static decodeTransferWithSeed(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      lamports,
      seed,
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed, instruction.data);
    return {
      fromPubkey: instruction.keys[0].pubkey,
      basePubkey: instruction.keys[1].pubkey,
      toPubkey: instruction.keys[2].pubkey,
      lamports,
      seed,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode an allocate system instruction and retrieve the instruction params.
   */


  static decodeAllocate(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);
    const {
      space
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Allocate, instruction.data);
    return {
      accountPubkey: instruction.keys[0].pubkey,
      space
    };
  }
  /**
   * Decode an allocate with seed system instruction and retrieve the instruction params.
   */


  static decodeAllocateWithSeed(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);
    const {
      base,
      seed,
      space,
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed, instruction.data);
    return {
      accountPubkey: instruction.keys[0].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      space,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode an assign system instruction and retrieve the instruction params.
   */


  static decodeAssign(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);
    const {
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Assign, instruction.data);
    return {
      accountPubkey: instruction.keys[0].pubkey,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode an assign with seed system instruction and retrieve the instruction params.
   */


  static decodeAssignWithSeed(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 1);
    const {
      base,
      seed,
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed, instruction.data);
    return {
      accountPubkey: instruction.keys[0].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode a create account with seed system instruction and retrieve the instruction params.
   */


  static decodeCreateWithSeed(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      base,
      seed,
      lamports,
      space,
      programId
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed, instruction.data);
    return {
      fromPubkey: instruction.keys[0].pubkey,
      newAccountPubkey: instruction.keys[1].pubkey,
      basePubkey: new PublicKey(base),
      seed,
      lamports,
      space,
      programId: new PublicKey(programId)
    };
  }
  /**
   * Decode a nonce initialize system instruction and retrieve the instruction params.
   */


  static decodeNonceInitialize(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      authorized
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount, instruction.data);
    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: new PublicKey(authorized)
    };
  }
  /**
   * Decode a nonce advance system instruction and retrieve the instruction params.
   */


  static decodeNonceAdvance(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount, instruction.data);
    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey
    };
  }
  /**
   * Decode a nonce withdraw system instruction and retrieve the instruction params.
   */


  static decodeNonceWithdraw(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 5);
    const {
      lamports
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount, instruction.data);
    return {
      noncePubkey: instruction.keys[0].pubkey,
      toPubkey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[4].pubkey,
      lamports
    };
  }
  /**
   * Decode a nonce authorize system instruction and retrieve the instruction params.
   */


  static decodeNonceAuthorize(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      authorized
    } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount, instruction.data);
    return {
      noncePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[1].pubkey,
      newAuthorizedPubkey: new PublicKey(authorized)
    };
  }
  /**
   * @internal
   */


  static checkProgramId(programId) {
    if (!programId.equals(SystemProgram.programId)) {
      throw new Error('invalid instruction; programId is not SystemProgram');
    }
  }
  /**
   * @internal
   */


  static checkKeyLength(keys, expectedLength) {
    if (keys.length < expectedLength) {
      throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
    }
  }

}
/**
 * An enumeration of valid SystemInstructionType's
 */

/**
 * An enumeration of valid system InstructionType's
 * @internal
 */
const SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
  Create: {
    index: 0,
    layout: struct([u32('instruction'), ns64('lamports'), ns64('space'), publicKey('programId')])
  },
  Assign: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('programId')])
  },
  Transfer: {
    index: 2,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  CreateWithSeed: {
    index: 3,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('lamports'), ns64('space'), publicKey('programId')])
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: struct([u32('instruction')])
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  InitializeNonceAccount: {
    index: 6,
    layout: struct([u32('instruction'), publicKey('authorized')])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: struct([u32('instruction'), publicKey('authorized')])
  },
  Allocate: {
    index: 8,
    layout: struct([u32('instruction'), ns64('space')])
  },
  AllocateWithSeed: {
    index: 9,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('space'), publicKey('programId')])
  },
  AssignWithSeed: {
    index: 10,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), publicKey('programId')])
  },
  TransferWithSeed: {
    index: 11,
    layout: struct([u32('instruction'), ns64('lamports'), rustString('seed'), publicKey('programId')])
  }
});
/**
 * Factory class for transactions to interact with the System program
 */

class SystemProgram {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the System program
   */


  /**
   * Generate a transaction instruction that creates a new account
   */
  static createAccount(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.Create;
    const data = encodeData(type, {
      lamports: params.lamports,
      space: params.space,
      programId: toBuffer(params.programId.toBuffer())
    });
    return new TransactionInstruction({
      keys: [{
        pubkey: params.fromPubkey,
        isSigner: true,
        isWritable: true
      }, {
        pubkey: params.newAccountPubkey,
        isSigner: true,
        isWritable: true
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction instruction that transfers lamports from one account to another
   */


  static transfer(params) {
    let data;
    let keys;

    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
      data = encodeData(type, {
        lamports: params.lamports,
        seed: params.seed,
        programId: toBuffer(params.programId.toBuffer())
      });
      keys = [{
        pubkey: params.fromPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.basePubkey,
        isSigner: true,
        isWritable: false
      }, {
        pubkey: params.toPubkey,
        isSigner: false,
        isWritable: true
      }];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
      data = encodeData(type, {
        lamports: params.lamports
      });
      keys = [{
        pubkey: params.fromPubkey,
        isSigner: true,
        isWritable: true
      }, {
        pubkey: params.toPubkey,
        isSigner: false,
        isWritable: true
      }];
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction instruction that assigns an account to a program
   */


  static assign(params) {
    let data;
    let keys;

    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
      data = encodeData(type, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        programId: toBuffer(params.programId.toBuffer())
      });
      keys = [{
        pubkey: params.accountPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.basePubkey,
        isSigner: true,
        isWritable: false
      }];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
      data = encodeData(type, {
        programId: toBuffer(params.programId.toBuffer())
      });
      keys = [{
        pubkey: params.accountPubkey,
        isSigner: true,
        isWritable: true
      }];
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction instruction that creates a new account at
   *   an address generated with `from`, a seed, and programId
   */


  static createAccountWithSeed(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
    const data = encodeData(type, {
      base: toBuffer(params.basePubkey.toBuffer()),
      seed: params.seed,
      lamports: params.lamports,
      space: params.space,
      programId: toBuffer(params.programId.toBuffer())
    });
    let keys = [{
      pubkey: params.fromPubkey,
      isSigner: true,
      isWritable: true
    }, {
      pubkey: params.newAccountPubkey,
      isSigner: false,
      isWritable: true
    }];

    if (params.basePubkey != params.fromPubkey) {
      keys.push({
        pubkey: params.basePubkey,
        isSigner: true,
        isWritable: false
      });
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction that creates a new Nonce account
   */


  static createNonceAccount(params) {
    const transaction = new Transaction();

    if ('basePubkey' in params && 'seed' in params) {
      transaction.add(SystemProgram.createAccountWithSeed({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.noncePubkey,
        basePubkey: params.basePubkey,
        seed: params.seed,
        lamports: params.lamports,
        space: NONCE_ACCOUNT_LENGTH,
        programId: this.programId
      }));
    } else {
      transaction.add(SystemProgram.createAccount({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.noncePubkey,
        lamports: params.lamports,
        space: NONCE_ACCOUNT_LENGTH,
        programId: this.programId
      }));
    }

    const initParams = {
      noncePubkey: params.noncePubkey,
      authorizedPubkey: params.authorizedPubkey
    };
    transaction.add(this.nonceInitialize(initParams));
    return transaction;
  }
  /**
   * Generate an instruction to initialize a Nonce account
   */


  static nonceInitialize(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
    const data = encodeData(type, {
      authorized: toBuffer(params.authorizedPubkey.toBuffer())
    });
    const instructionData = {
      keys: [{
        pubkey: params.noncePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }],
      programId: this.programId,
      data
    };
    return new TransactionInstruction(instructionData);
  }
  /**
   * Generate an instruction to advance the nonce in a Nonce account
   */


  static nonceAdvance(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
    const data = encodeData(type);
    const instructionData = {
      keys: [{
        pubkey: params.noncePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: params.authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    };
    return new TransactionInstruction(instructionData);
  }
  /**
   * Generate a transaction instruction that withdraws lamports from a Nonce account
   */


  static nonceWithdraw(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
    const data = encodeData(type, {
      lamports: params.lamports
    });
    return new TransactionInstruction({
      keys: [{
        pubkey: params.noncePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.toPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: params.authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction instruction that authorizes a new PublicKey as the authority
   * on a Nonce account.
   */


  static nonceAuthorize(params) {
    const type = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
    const data = encodeData(type, {
      authorized: toBuffer(params.newAuthorizedPubkey.toBuffer())
    });
    return new TransactionInstruction({
      keys: [{
        pubkey: params.noncePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction instruction that allocates space in an account without funding
   */


  static allocate(params) {
    let data;
    let keys;

    if ('basePubkey' in params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
      data = encodeData(type, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        space: params.space,
        programId: toBuffer(params.programId.toBuffer())
      });
      keys = [{
        pubkey: params.accountPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.basePubkey,
        isSigner: true,
        isWritable: false
      }];
    } else {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
      data = encodeData(type, {
        space: params.space
      });
      keys = [{
        pubkey: params.accountPubkey,
        isSigner: true,
        isWritable: true
      }];
    }

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data
    });
  }

}
SystemProgram.programId = new PublicKey('11111111111111111111111111111111');

// Keep program chunks under PACKET_DATA_SIZE, leaving enough room for the
// rest of the Transaction fields
//
// TODO: replace 300 with a proper constant for the size of the other
// Transaction fields
const CHUNK_SIZE = PACKET_DATA_SIZE - 300;
/**
 * Program loader interface
 */

class Loader {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Amount of program data placed in each load Transaction
   */


  /**
   * Minimum number of signatures required to load a program not including
   * retries
   *
   * Can be used to calculate transaction fees
   */
  static getMinNumSignatures(dataLength) {
    return 2 * ( // Every transaction requires two signatures (payer + program)
    Math.ceil(dataLength / Loader.chunkSize) + 1 + // Add one for Create transaction
    1) // Add one for Finalize transaction
    ;
  }
  /**
   * Loads a generic program
   *
   * @param connection The connection to use
   * @param payer System account that pays to load the program
   * @param program Account to load the program into
   * @param programId Public key that identifies the loader
   * @param data Program octets
   * @return true if program was loaded successfully, false if program was already loaded
   */


  static async load(connection, payer, program, programId, data) {
    {
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(data.length); // Fetch program account info to check if it has already been created

      const programInfo = await connection.getAccountInfo(program.publicKey, 'confirmed');
      let transaction = null;

      if (programInfo !== null) {
        if (programInfo.executable) {
          console.error('Program load failed, account is already executable');
          return false;
        }

        if (programInfo.data.length !== data.length) {
          transaction = transaction || new Transaction();
          transaction.add(SystemProgram.allocate({
            accountPubkey: program.publicKey,
            space: data.length
          }));
        }

        if (!programInfo.owner.equals(programId)) {
          transaction = transaction || new Transaction();
          transaction.add(SystemProgram.assign({
            accountPubkey: program.publicKey,
            programId
          }));
        }

        if (programInfo.lamports < balanceNeeded) {
          transaction = transaction || new Transaction();
          transaction.add(SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: program.publicKey,
            lamports: balanceNeeded - programInfo.lamports
          }));
        }
      } else {
        transaction = new Transaction().add(SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: program.publicKey,
          lamports: balanceNeeded > 0 ? balanceNeeded : 1,
          space: data.length,
          programId
        }));
      } // If the account is already created correctly, skip this step
      // and proceed directly to loading instructions


      if (transaction !== null) {
        await sendAndConfirmTransaction(connection, transaction, [payer, program], {
          commitment: 'confirmed'
        });
      }
    }
    const dataLayout = struct([u32('instruction'), u32('offset'), u32('bytesLength'), u32('bytesLengthPadding'), seq(u8('byte'), offset(u32(), -8), 'bytes')]);
    const chunkSize = Loader.chunkSize;
    let offset$1 = 0;
    let array = data;
    let transactions = [];

    while (array.length > 0) {
      const bytes = array.slice(0, chunkSize);
      const data = Buffer$1.alloc(chunkSize + 16);
      dataLayout.encode({
        instruction: 0,
        // Load instruction
        offset: offset$1,
        bytes: bytes,
        bytesLength: 0,
        bytesLengthPadding: 0
      }, data);
      const transaction = new Transaction().add({
        keys: [{
          pubkey: program.publicKey,
          isSigner: true,
          isWritable: true
        }],
        programId,
        data
      });
      transactions.push(sendAndConfirmTransaction(connection, transaction, [payer, program], {
        commitment: 'confirmed'
      })); // Delay between sends in an attempt to reduce rate limit errors

      if (connection._rpcEndpoint.includes('solana.com')) {
        const REQUESTS_PER_SECOND = 4;
        await sleep(1000 / REQUESTS_PER_SECOND);
      }

      offset$1 += chunkSize;
      array = array.slice(chunkSize);
    }

    await Promise.all(transactions); // Finalize the account loaded with program data for execution

    {
      const dataLayout = struct([u32('instruction')]);
      const data = Buffer$1.alloc(dataLayout.span);
      dataLayout.encode({
        instruction: 1 // Finalize instruction

      }, data);
      const transaction = new Transaction().add({
        keys: [{
          pubkey: program.publicKey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }],
        programId,
        data
      });
      await sendAndConfirmTransaction(connection, transaction, [payer, program], {
        commitment: 'confirmed'
      });
    } // success

    return true;
  }

}
Loader.chunkSize = CHUNK_SIZE;

const BPF_LOADER_PROGRAM_ID = new PublicKey('BPFLoader2111111111111111111111111111111111');
/**
 * Factory class for transactions to interact with a program loader
 */

class BpfLoader {
  /**
   * Minimum number of signatures required to load a program not including
   * retries
   *
   * Can be used to calculate transaction fees
   */
  static getMinNumSignatures(dataLength) {
    return Loader.getMinNumSignatures(dataLength);
  }
  /**
   * Load a BPF program
   *
   * @param connection The connection to use
   * @param payer Account that will pay program loading fees
   * @param program Account to load the program into
   * @param elf The entire ELF containing the BPF program
   * @param loaderProgramId The program id of the BPF loader to use
   * @return true if program was loaded successfully, false if program was already loaded
   */


  static load(connection, payer, program, elf, loaderProgramId) {
    return Loader.load(connection, payer, program, loaderProgramId, elf);
  }

}

/**
 * Compute Budget Instruction class
 */

class ComputeBudgetInstruction {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Decode a compute budget instruction and retrieve the instruction type.
   */


  static decodeInstructionType(instruction) {
    this.checkProgramId(instruction.programId);
    const instructionTypeLayout = u8('instruction');
    const typeIndex = instructionTypeLayout.decode(instruction.data);
    let type;

    for (const [ixType, layout] of Object.entries(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS)) {
      if (layout.index == typeIndex) {
        type = ixType;
        break;
      }
    }

    if (!type) {
      throw new Error('Instruction type incorrect; not a ComputeBudgetInstruction');
    }

    return type;
  }
  /**
   * Decode request units compute budget instruction and retrieve the instruction params.
   */


  static decodeRequestUnits(instruction) {
    this.checkProgramId(instruction.programId);
    const {
      units,
      additionalFee
    } = decodeData(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestUnits, instruction.data);
    return {
      units,
      additionalFee
    };
  }
  /**
   * Decode request heap frame compute budget instruction and retrieve the instruction params.
   */


  static decodeRequestHeapFrame(instruction) {
    this.checkProgramId(instruction.programId);
    const {
      bytes
    } = decodeData(COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestHeapFrame, instruction.data);
    return {
      bytes
    };
  }
  /**
   * @internal
   */


  static checkProgramId(programId) {
    if (!programId.equals(ComputeBudgetProgram.programId)) {
      throw new Error('invalid instruction; programId is not ComputeBudgetProgram');
    }
  }

}
/**
 * An enumeration of valid ComputeBudgetInstructionType's
 */

/**
 * An enumeration of valid ComputeBudget InstructionType's
 * @internal
 */
const COMPUTE_BUDGET_INSTRUCTION_LAYOUTS = Object.freeze({
  RequestUnits: {
    index: 0,
    layout: struct([u8('instruction'), u32('units'), u32('additionalFee')])
  },
  RequestHeapFrame: {
    index: 1,
    layout: struct([u8('instruction'), u32('bytes')])
  }
});
/**
 * Factory class for transaction instructions to interact with the Compute Budget program
 */

class ComputeBudgetProgram {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the Compute Budget program
   */


  static requestUnits(params) {
    const type = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestUnits;
    const data = encodeData(type, params);
    return new TransactionInstruction({
      keys: [],
      programId: this.programId,
      data
    });
  }

  static requestHeapFrame(params) {
    const type = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestHeapFrame;
    const data = encodeData(type, params);
    return new TransactionInstruction({
      keys: [],
      programId: this.programId,
      data
    });
  }

}
ComputeBudgetProgram.programId = new PublicKey('ComputeBudget111111111111111111111111111111');

var browserPonyfill = {exports: {}};

(function (module, exports) {
var global = typeof self !== 'undefined' ? self : commonjsGlobal;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException;
}
F.prototype = global;
return new F();
})();
(function(self) {

((function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}))({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers;
exports.Request = ctx.Request;
exports.Response = ctx.Response;
module.exports = exports;
}(browserPonyfill, browserPonyfill.exports));

var crossFetch = /*@__PURE__*/getDefaultExportFromCjs(browserPonyfill.exports);

/**
 * A `StructFailure` represents a single specific failure in validation.
 */

/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
class StructError extends TypeError {
  constructor(failure, failures) {
    let cached;
    const {
      message,
      ...rest
    } = failure;
    const {
      path
    } = failure;
    const msg = path.length === 0 ? message : "At path: " + path.join('.') + " -- " + message;
    super(msg);
    Object.assign(this, rest);
    this.name = this.constructor.name;

    this.failures = () => {
      var _cached;

      return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
    };
  }

}

/**
 * Check if a value is an iterator.
 */
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 */


function isObject(x) {
  return typeof x === 'object' && x != null;
}
/**
 * Return a value as a printable string.
 */

function print(value) {
  return typeof value === 'string' ? JSON.stringify(value) : "" + value;
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */

function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? undefined : value;
}
/**
 * Convert a single validation result to a failure.
 */

function toFailure(result, context, struct, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === 'string') {
    result = {
      message: result
    };
  }

  const {
    path,
    branch
  } = context;
  const {
    type
  } = struct;
  const {
    refinement,
    message = "Expected a value of type `" + type + "`" + (refinement ? " with refinement `" + refinement + "`" : '') + ", but received: `" + print(value) + "`"
  } = result;
  return {
    value,
    type,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
/**
 * Convert a validation result to an iterable of failures.
 */

function* toFailures(result, context, struct, value) {
  if (!isIterable(result)) {
    result = [result];
  }

  for (const r of result) {
    const failure = toFailure(r, context, struct, value);

    if (failure) {
      yield failure;
    }
  }
}
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */

function* run(value, struct, options = {}) {
  const {
    path = [],
    branch = [value],
    coerce = false,
    mask = false
  } = options;
  const ctx = {
    path,
    branch
  };

  if (coerce) {
    value = struct.coercer(value, ctx);

    if (mask && struct.type !== 'type' && isObject(struct.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct.schema[key] === undefined) {
          delete value[key];
        }
      }
    }
  }

  let valid = true;

  for (const failure of struct.validator(value, ctx)) {
    valid = false;
    yield [failure, undefined];
  }

  for (let [k, v, s] of struct.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === undefined ? path : [...path, k],
      branch: k === undefined ? branch : [...branch, v],
      coerce,
      mask
    });

    for (const t of ts) {
      if (t[0]) {
        valid = false;
        yield [t[0], undefined];
      } else if (coerce) {
        v = t[1];

        if (k === undefined) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          value[k] = v;
        }
      }
    }
  }

  if (valid) {
    for (const failure of struct.refiner(value, ctx)) {
      valid = false;
      yield [failure, undefined];
    }
  }

  if (valid) {
    yield [undefined, value];
  }
}

/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */

class Struct {
  constructor(props) {
    const {
      type,
      schema,
      validator,
      refiner,
      coercer = value => value,
      entries = function* () {}
    } = props;
    this.type = type;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;

    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }

    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */


  assert(value) {
    return assert$b(value, this);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */


  create(value) {
    return create(value, this);
  }
  /**
   * Check if a value passes the struct's validation.
   */


  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */


  mask(value) {
    return mask(value, this);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */


  validate(value, options = {}) {
    return validate$1(value, this, options);
  }

}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 */

function assert$b(value, struct) {
  const result = validate$1(value, struct);

  if (result[0]) {
    throw result[0];
  }
}
/**
 * Create a value with the coercion logic of struct and validate it.
 */

function create(value, struct) {
  const result = validate$1(value, struct, {
    coerce: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 */

function mask(value, struct) {
  const result = validate$1(value, struct, {
    coerce: true,
    mask: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Check if a value passes a struct.
 */

function is(value, struct) {
  const result = validate$1(value, struct);
  return !result[0];
}
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */

function validate$1(value, struct, options = {}) {
  const tuples = run(value, struct, options);
  const tuple = shiftIterator(tuples);

  if (tuple[0]) {
    const error = new StructError(tuple[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, undefined];
  } else {
    const v = tuple[1];
    return [undefined, v];
  }
}
/**
 * Define a new struct type with a custom validation function.
 */

function define(name, validator) {
  return new Struct({
    type: name,
    schema: null,
    validator
  });
}

/**
 * Ensure that any value passes validation.
 */

function any() {
  return define('any', () => true);
}
function array(Element) {
  return new Struct({
    type: 'array',
    schema: Element,

    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },

    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },

    validator(value) {
      return Array.isArray(value) || "Expected an array value, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value is a boolean.
 */

function boolean() {
  return define('boolean', value => {
    return typeof value === 'boolean';
  });
}
/**
 * Ensure that a value is an instance of a specific class.
 */

function instance(Class) {
  return define('instance', value => {
    return value instanceof Class || "Expected a `" + Class.name + "` instance, but received: " + print(value);
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: 'literal',
    schema: t === 'string' || t === 'number' || t === 'boolean' ? constant : null,

    validator(value) {
      return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
    }

  });
}
/**
 * Ensure that no value ever passes validation.
 */

function never() {
  return define('never', () => false);
}
/**
 * Augment an existing struct to allow `null` values.
 */

function nullable(struct) {
  return new Struct({ ...struct,
    validator: (value, ctx) => value === null || struct.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is a number.
 */

function number() {
  return define('number', value => {
    return typeof value === 'number' && !isNaN(value) || "Expected a number, but received: " + print(value);
  });
}
/**
 * Augment a struct to allow `undefined` values.
 */

function optional(struct) {
  return new Struct({ ...struct,
    validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
    refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */

function record(Key, Value) {
  return new Struct({
    type: 'record',
    schema: null,

    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },

    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value is a string.
 */

function string() {
  return define('string', value => {
    return typeof value === 'string' || "Expected a string, but received: " + print(value);
  });
}
function tuple(Elements) {
  const Never = never();
  return new Struct({
    type: 'tuple',
    schema: null,

    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Elements.length, value.length);

        for (let i = 0; i < length; i++) {
          yield [i, value[i], Elements[i] || Never];
        }
      }
    },

    validator(value) {
      return Array.isArray(value) || "Expected an array, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */

function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: 'type',
    schema,

    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },

    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }

  });
}
function union(Structs) {
  const description = Structs.map(s => s.type).join(' | ');
  return new Struct({
    type: 'union',
    schema: null,

    validator(value, ctx) {
      const failures = [];

      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;

        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }

      return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
    }

  });
}
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 */

function unknown() {
  return define('unknown', () => true);
}

/**
 * Augment a `Struct` to add an additional coercion step to its input.
 *
 * This allows you to transform input data before validating it, to increase the
 * likelihood that it passes validation—for example for default values, parsing
 * different formats, etc.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 */

function coerce(struct, condition, coercer) {
  return new Struct({ ...struct,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct.coercer(coercer(value, ctx), ctx) : struct.coercer(value, ctx);
    }
  });
}

var index_browser = {};

var interopRequireDefault = {exports: {}};

(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(interopRequireDefault));

var classCallCheck = {exports: {}};

(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(classCallCheck));

var inherits$3 = {exports: {}};

var setPrototypeOf = {exports: {}};

(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(setPrototypeOf));

(function (module) {
var setPrototypeOf$1 = setPrototypeOf.exports;

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf$1(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(inherits$3));

var possibleConstructorReturn = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(_typeof));

var assertThisInitialized = {exports: {}};

(function (module) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(assertThisInitialized));

(function (module) {
var _typeof$1 = _typeof.exports["default"];

var assertThisInitialized$1 = assertThisInitialized.exports;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized$1(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(possibleConstructorReturn));

var getPrototypeOf = {exports: {}};

(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(getPrototypeOf));

var websocket_browser = {};

var createClass = {exports: {}};

(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(createClass));

var eventemitter3 = {exports: {}};

(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
}(eventemitter3));

/**
 * WebSocket implements a browser-side WebSocket specification.
 * @module Client
 */

(function (exports) {

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _classCallCheck2 = _interopRequireDefault(classCallCheck.exports);

var _createClass2 = _interopRequireDefault(createClass.exports);

var _inherits2 = _interopRequireDefault(inherits$3.exports);

var _possibleConstructorReturn2 = _interopRequireDefault(possibleConstructorReturn.exports);

var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf.exports);

var _eventemitter = eventemitter3.exports;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WebSocketBrowserImpl = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(WebSocketBrowserImpl, _EventEmitter);

  var _super = _createSuper(WebSocketBrowserImpl);

  /** Instantiate a WebSocket class
   * @constructor
   * @param {String} address - url to a websocket server
   * @param {(Object)} options - websocket options
   * @param {(String|Array)} protocols - a list of protocols
   * @return {WebSocketBrowserImpl} - returns a WebSocket instance
   */
  function WebSocketBrowserImpl(address, options, protocols) {
    var _this;

    (0, _classCallCheck2["default"])(this, WebSocketBrowserImpl);
    _this = _super.call(this);
    _this.socket = new window.WebSocket(address, protocols);

    _this.socket.onopen = function () {
      return _this.emit("open");
    };

    _this.socket.onmessage = function (event) {
      return _this.emit("message", event.data);
    };

    _this.socket.onerror = function (error) {
      return _this.emit("error", error);
    };

    _this.socket.onclose = function (event) {
      _this.emit("close", event.code, event.reason);
    };

    return _this;
  }
  /**
   * Sends data through a websocket connection
   * @method
   * @param {(String|Object)} data - data to be sent via websocket
   * @param {Object} optionsOrCallback - ws options
   * @param {Function} callback - a callback called once the data is sent
   * @return {Undefined}
   */


  (0, _createClass2["default"])(WebSocketBrowserImpl, [{
    key: "send",
    value: function send(data, optionsOrCallback, callback) {
      var cb = callback || optionsOrCallback;

      try {
        this.socket.send(data);
        cb();
      } catch (error) {
        cb(error);
      }
    }
    /**
     * Closes an underlying socket
     * @method
     * @param {Number} code - status code explaining why the connection is being closed
     * @param {String} reason - a description why the connection is closing
     * @return {Undefined}
     * @throws {Error}
     */

  }, {
    key: "close",
    value: function close(code, reason) {
      this.socket.close(code, reason);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener, options) {
      this.socket.addEventListener(type, listener, options);
    }
  }]);
  return WebSocketBrowserImpl;
}(_eventemitter.EventEmitter);
/**
 * factory method for common WebSocket instance
 * @method
 * @param {String} address - url to a websocket server
 * @param {(Object)} options - websocket options
 * @return {Undefined}
 */


function _default(address, options) {
  return new WebSocketBrowserImpl(address, options);
}
}(websocket_browser));

var client = {};

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
}(runtime));

var regenerator = runtime.exports;

var asyncToGenerator = {exports: {}};

(function (module) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(asyncToGenerator));

/*!
Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var
  // should be a not so common char
  // possibly one JSON does not encode
  // possibly one encodeURIComponent does not encode
  // right now this char is '~' but this might change in the future
  specialChar = '~',
  safeSpecialChar = '\\x' + (
    '0' + specialChar.charCodeAt(0).toString(16)
  ).slice(-2),
  escapedSafeSpecialChar = '\\' + safeSpecialChar,
  specialCharRG = new RegExp(safeSpecialChar, 'g'),
  safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, 'g'),

  safeStartWithSpecialCharRG = new RegExp('(?:^|([^\\\\]))' + escapedSafeSpecialChar),

  indexOf = [].indexOf || function(v){
    for(var i=this.length;i--&&this[i]!==v;);
    return i;
  },
  $String = String  // there's no way to drop warnings in JSHint
                    // about new String ... well, I need that here!
                    // faked, and happy linter!
;

function generateReplacer(value, replacer, resolve) {
  var
    doNotIgnore = false,
    inspect = !!replacer,
    path = [],
    all  = [value],
    seen = [value],
    mapp = [resolve ? specialChar : '[Circular]'],
    last = value,
    lvl  = 1,
    i, fn
  ;
  if (inspect) {
    fn = typeof replacer === 'object' ?
      function (key, value) {
        return key !== '' && replacer.indexOf(key) < 0 ? void 0 : value;
      } :
      replacer;
  }
  return function(key, value) {
    // the replacer has rights to decide
    // if a new object should be returned
    // or if there's some key to drop
    // let's call it here rather than "too late"
    if (inspect) value = fn.call(this, key, value);

    // first pass should be ignored, since it's just the initial object
    if (doNotIgnore) {
      if (last !== this) {
        i = lvl - indexOf.call(all, this) - 1;
        lvl -= i;
        all.splice(lvl, all.length);
        path.splice(lvl - 1, path.length);
        last = this;
      }
      // console.log(lvl, key, path);
      if (typeof value === 'object' && value) {
    	// if object isn't referring to parent object, add to the
        // object path stack. Otherwise it is already there.
        if (indexOf.call(all, value) < 0) {
          all.push(last = value);
        }
        lvl = all.length;
        i = indexOf.call(seen, value);
        if (i < 0) {
          i = seen.push(value) - 1;
          if (resolve) {
            // key cannot contain specialChar but could be not a string
            path.push(('' + key).replace(specialCharRG, safeSpecialChar));
            mapp[i] = specialChar + path.join(specialChar);
          } else {
            mapp[i] = mapp[0];
          }
        } else {
          value = mapp[i];
        }
      } else {
        if (typeof value === 'string' && resolve) {
          // ensure no special char involved on deserialization
          // in this case only first char is important
          // no need to replace all value (better performance)
          value = value .replace(safeSpecialChar, escapedSafeSpecialChar)
                        .replace(specialChar, safeSpecialChar);
        }
      }
    } else {
      doNotIgnore = true;
    }
    return value;
  };
}

function retrieveFromPath(current, keys) {
  for(var i = 0, length = keys.length; i < length; current = current[
    // keys should be normalized back here
    keys[i++].replace(safeSpecialCharRG, specialChar)
  ]);
  return current;
}

function generateReviver(reviver) {
  return function(key, value) {
    var isString = typeof value === 'string';
    if (isString && value.charAt(0) === specialChar) {
      return new $String(value.slice(1));
    }
    if (key === '') value = regenerate(value, value, {});
    // again, only one needed, do not use the RegExp for this replacement
    // only keys need the RegExp
    if (isString) value = value .replace(safeStartWithSpecialCharRG, '$1' + specialChar)
                                .replace(escapedSafeSpecialChar, safeSpecialChar);
    return reviver ? reviver.call(this, key, value) : value;
  };
}

function regenerateArray(root, current, retrieve) {
  for (var i = 0, length = current.length; i < length; i++) {
    current[i] = regenerate(root, current[i], retrieve);
  }
  return current;
}

function regenerateObject(root, current, retrieve) {
  for (var key in current) {
    if (current.hasOwnProperty(key)) {
      current[key] = regenerate(root, current[key], retrieve);
    }
  }
  return current;
}

function regenerate(root, current, retrieve) {
  return current instanceof Array ?
    // fast Array reconstruction
    regenerateArray(root, current, retrieve) :
    (
      current instanceof $String ?
        (
          // root is an empty string
          current.length ?
            (
              retrieve.hasOwnProperty(current) ?
                retrieve[current] :
                retrieve[current] = retrieveFromPath(
                  root, current.split(specialChar)
                )
            ) :
            root
        ) :
        (
          current instanceof Object ?
            // dedicated Object parser
            regenerateObject(root, current, retrieve) :
            // value as it is
            current
        )
    )
  ;
}

var CircularJSON = {
  stringify: function stringify(value, replacer, space, doNotResolve) {
    return CircularJSON.parser.stringify(
      value,
      generateReplacer(value, replacer, !doNotResolve),
      space
    );
  },
  parse: function parse(text, reviver) {
    return CircularJSON.parser.parse(
      text,
      generateReviver(reviver)
    );
  },
  // A parser should be an API 1:1 compatible with JSON
  // it should expose stringify and parse methods.
  // The default parser is the native JSON.
  parser: JSON
};

var circularJson_node = CircularJSON;

/**
 * "Client" wraps "ws" or a browser-implemented "WebSocket" library
 * according to the environment providing JSON RPC 2.0 support on top.
 * @module Client
 */

(function (exports) {

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(regenerator);

var _asyncToGenerator2 = _interopRequireDefault(asyncToGenerator.exports);

var _typeof2 = _interopRequireDefault(_typeof.exports);

var _classCallCheck2 = _interopRequireDefault(classCallCheck.exports);

var _createClass2 = _interopRequireDefault(createClass.exports);

var _inherits2 = _interopRequireDefault(inherits$3.exports);

var _possibleConstructorReturn2 = _interopRequireDefault(possibleConstructorReturn.exports);

var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf.exports);

var _eventemitter = eventemitter3.exports;

var _circularJson = _interopRequireDefault(circularJson_node);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __rest = function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}; // @ts-ignore


var CommonClient = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(CommonClient, _EventEmitter);

  var _super = _createSuper(CommonClient);

  /**
   * Instantiate a Client class.
   * @constructor
   * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
   * @param {String} address - url to a websocket server
   * @param {Object} options - ws options object with reconnect parameters
   * @param {Function} generate_request_id - custom generation request Id
   * @return {CommonClient}
   */
  function CommonClient(webSocketFactory) {
    var _this;

    var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ws://localhost:8080";

    var _a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var generate_request_id = arguments.length > 3 ? arguments[3] : undefined;
    (0, _classCallCheck2["default"])(this, CommonClient);

    var _a$autoconnect = _a.autoconnect,
        autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect,
        _a$reconnect = _a.reconnect,
        reconnect = _a$reconnect === void 0 ? true : _a$reconnect,
        _a$reconnect_interval = _a.reconnect_interval,
        reconnect_interval = _a$reconnect_interval === void 0 ? 1000 : _a$reconnect_interval,
        _a$max_reconnects = _a.max_reconnects,
        max_reconnects = _a$max_reconnects === void 0 ? 5 : _a$max_reconnects,
        rest_options = __rest(_a, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);

    _this = _super.call(this);
    _this.webSocketFactory = webSocketFactory;
    _this.queue = {};
    _this.rpc_id = 0;
    _this.address = address;
    _this.autoconnect = autoconnect;
    _this.ready = false;
    _this.reconnect = reconnect;
    _this.reconnect_interval = reconnect_interval;
    _this.max_reconnects = max_reconnects;
    _this.rest_options = rest_options;
    _this.current_reconnects = 0;

    _this.generate_request_id = generate_request_id || function () {
      return ++_this.rpc_id;
    };

    if (_this.autoconnect) _this._connect(_this.address, Object.assign({
      autoconnect: _this.autoconnect,
      reconnect: _this.reconnect,
      reconnect_interval: _this.reconnect_interval,
      max_reconnects: _this.max_reconnects
    }, _this.rest_options));
    return _this;
  }
  /**
   * Connects to a defined server if not connected already.
   * @method
   * @return {Undefined}
   */


  (0, _createClass2["default"])(CommonClient, [{
    key: "connect",
    value: function connect() {
      if (this.socket) return;

      this._connect(this.address, Object.assign({
        autoconnect: this.autoconnect,
        reconnect: this.reconnect,
        reconnect_interval: this.reconnect_interval,
        max_reconnects: this.max_reconnects
      }, this.rest_options));
    }
    /**
     * Calls a registered RPC method on server.
     * @method
     * @param {String} method - RPC method name
     * @param {Object|Array} params - optional method parameters
     * @param {Number} timeout - RPC reply timeout value
     * @param {Object} ws_opts - options passed to ws
     * @return {Promise}
     */

  }, {
    key: "call",
    value: function call(method, params, timeout, ws_opts) {
      var _this2 = this;

      if (!ws_opts && "object" === (0, _typeof2["default"])(timeout)) {
        ws_opts = timeout;
        timeout = null;
      }

      return new Promise(function (resolve, reject) {
        if (!_this2.ready) return reject(new Error("socket not ready"));

        var rpc_id = _this2.generate_request_id(method, params);

        var message = {
          jsonrpc: "2.0",
          method: method,
          params: params || null,
          id: rpc_id
        };

        _this2.socket.send(JSON.stringify(message), ws_opts, function (error) {
          if (error) return reject(error);
          _this2.queue[rpc_id] = {
            promise: [resolve, reject]
          };

          if (timeout) {
            _this2.queue[rpc_id].timeout = setTimeout(function () {
              delete _this2.queue[rpc_id];
              reject(new Error("reply timeout"));
            }, timeout);
          }
        });
      });
    }
    /**
     * Logins with the other side of the connection.
     * @method
     * @param {Object} params - Login credentials object
     * @return {Promise}
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
        var resp;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.call("rpc.login", params);

              case 2:
                resp = _context.sent;

                if (resp) {
                  _context.next = 5;
                  break;
                }

                throw new Error("authentication failed");

              case 5:
                return _context.abrupt("return", resp);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * Fetches a list of client's methods registered on server.
     * @method
     * @return {Array}
     */

  }, {
    key: "listMethods",
    value: function () {
      var _listMethods = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.call("__listMethods");

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function listMethods() {
        return _listMethods.apply(this, arguments);
      }

      return listMethods;
    }()
    /**
     * Sends a JSON-RPC 2.0 notification to server.
     * @method
     * @param {String} method - RPC method name
     * @param {Object} params - optional method parameters
     * @return {Promise}
     */

  }, {
    key: "notify",
    value: function notify(method, params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (!_this3.ready) return reject(new Error("socket not ready"));
        var message = {
          jsonrpc: "2.0",
          method: method,
          params: params || null
        };

        _this3.socket.send(JSON.stringify(message), function (error) {
          if (error) return reject(error);
          resolve();
        });
      });
    }
    /**
     * Subscribes for a defined event.
     * @method
     * @param {String|Array} event - event name
     * @return {Undefined}
     * @throws {Error}
     */

  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(event) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (typeof event === "string") event = [event];
                _context3.next = 3;
                return this.call("rpc.on", event);

              case 3:
                result = _context3.sent;

                if (!(typeof event === "string" && result[event] !== "ok")) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Failed subscribing to an event '" + event + "' with: " + result[event]);

              case 6:
                return _context3.abrupt("return", result);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function subscribe(_x2) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
    /**
     * Unsubscribes from a defined event.
     * @method
     * @param {String|Array} event - event name
     * @return {Undefined}
     * @throws {Error}
     */

  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(event) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (typeof event === "string") event = [event];
                _context4.next = 3;
                return this.call("rpc.off", event);

              case 3:
                result = _context4.sent;

                if (!(typeof event === "string" && result[event] !== "ok")) {
                  _context4.next = 6;
                  break;
                }

                throw new Error("Failed unsubscribing from an event with: " + result);

              case 6:
                return _context4.abrupt("return", result);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unsubscribe(_x3) {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
    /**
     * Closes a WebSocket connection gracefully.
     * @method
     * @param {Number} code - socket close code
     * @param {String} data - optional data to be sent before closing
     * @return {Undefined}
     */

  }, {
    key: "close",
    value: function close(code, data) {
      this.socket.close(code || 1000, data);
    }
    /**
     * Connection/Message handler.
     * @method
     * @private
     * @param {String} address - WebSocket API address
     * @param {Object} options - ws options object
     * @return {Undefined}
     */

  }, {
    key: "_connect",
    value: function _connect(address, options) {
      var _this4 = this;

      this.socket = this.webSocketFactory(address, options);
      this.socket.addEventListener("open", function () {
        _this4.ready = true;

        _this4.emit("open");

        _this4.current_reconnects = 0;
      });
      this.socket.addEventListener("message", function (_ref) {
        var message = _ref.data;
        if (message instanceof ArrayBuffer) message = Buffer.from(message).toString();

        try {
          message = _circularJson["default"].parse(message);
        } catch (error) {
          return;
        } // check if any listeners are attached and forward event


        if (message.notification && _this4.listeners(message.notification).length) {
          if (!Object.keys(message.params).length) return _this4.emit(message.notification);
          var args = [message.notification];
          if (message.params.constructor === Object) args.push(message.params);else // using for-loop instead of unshift/spread because performance is better
            for (var i = 0; i < message.params.length; i++) {
              args.push(message.params[i]);
            } // run as microtask so that pending queue messages are resolved first
          // eslint-disable-next-line prefer-spread

          return Promise.resolve().then(function () {
            _this4.emit.apply(_this4, args);
          });
        }

        if (!_this4.queue[message.id]) {
          // general JSON RPC 2.0 events
          if (message.method && message.params) {
            // run as microtask so that pending queue messages are resolved first
            return Promise.resolve().then(function () {
              _this4.emit(message.method, message.params);
            });
          }

          return;
        } // reject early since server's response is invalid


        if ("error" in message === "result" in message) _this4.queue[message.id].promise[1](new Error("Server response malformed. Response must include either \"result\"" + " or \"error\", but not both."));
        if (_this4.queue[message.id].timeout) clearTimeout(_this4.queue[message.id].timeout);
        if (message.error) _this4.queue[message.id].promise[1](message.error);else _this4.queue[message.id].promise[0](message.result);
        delete _this4.queue[message.id];
      });
      this.socket.addEventListener("error", function (error) {
        return _this4.emit("error", error);
      });
      this.socket.addEventListener("close", function (_ref2) {
        var code = _ref2.code,
            reason = _ref2.reason;
        if (_this4.ready) // Delay close event until internal state is updated
          setTimeout(function () {
            return _this4.emit("close", code, reason);
          }, 0);
        _this4.ready = false;
        _this4.socket = undefined;
        if (code === 1000) return;
        _this4.current_reconnects++;
        if (_this4.reconnect && (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0)) setTimeout(function () {
          return _this4._connect(address, options);
        }, _this4.reconnect_interval);
      });
    }
  }]);
  return CommonClient;
}(_eventemitter.EventEmitter);

exports["default"] = CommonClient;
}(client));

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(index_browser, "__esModule", {
  value: true
});
var Client_1 = index_browser.Client = void 0;

var _classCallCheck2 = _interopRequireDefault(classCallCheck.exports);

var _inherits2 = _interopRequireDefault(inherits$3.exports);

var _possibleConstructorReturn2 = _interopRequireDefault(possibleConstructorReturn.exports);

var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf.exports);

var _websocket = _interopRequireDefault(websocket_browser);

var _client = _interopRequireDefault(client);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Client = /*#__PURE__*/function (_CommonClient) {
  (0, _inherits2["default"])(Client, _CommonClient);

  var _super = _createSuper(Client);

  function Client() {
    var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ws://localhost:8080";

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$autoconnect = _ref.autoconnect,
        autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect,
        _ref$reconnect = _ref.reconnect,
        reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
        _ref$reconnect_interv = _ref.reconnect_interval,
        reconnect_interval = _ref$reconnect_interv === void 0 ? 1000 : _ref$reconnect_interv,
        _ref$max_reconnects = _ref.max_reconnects,
        max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects;

    var generate_request_id = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2["default"])(this, Client);
    return _super.call(this, _websocket["default"], address, {
      autoconnect: autoconnect,
      reconnect: reconnect,
      reconnect_interval: reconnect_interval,
      max_reconnects: max_reconnects
    }, generate_request_id);
  }

  return Client;
}(_client["default"]);

Client_1 = index_browser.Client = Client;

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || stringify(b);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL$1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35 (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return stringify(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var v3 = v35('v3', 0x30, md5);
var v3$1 = v3;

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var v5 = v35('v5', 0x50, sha1);
var v5$1 = v5;

var nil = '00000000-0000-0000-0000-000000000000';

function version$1(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var esmBrowser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	v1: v1,
	v3: v3$1,
	v4: v4,
	v5: v5$1,
	NIL: nil,
	version: version$1,
	validate: validate,
	stringify: stringify,
	parse: parse
});

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(esmBrowser);

const uuid$1 = require$$0$1.v4;

/**
 *  Generates a JSON-RPC 1.0 or 2.0 request
 *  @param {String} method Name of method to call
 *  @param {Array|Object} params Array of parameters passed to the method as specified, or an object of parameter names and corresponding value
 *  @param {String|Number|null} [id] Request ID can be a string, number, null for explicit notification or left out for automatic generation
 *  @param {Object} [options]
 *  @param {Number} [options.version=2] JSON-RPC version to use (1 or 2)
 *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
 *  @param {Function} [options.generator] Passed the request, and the options object and is expected to return a request ID
 *  @throws {TypeError} If any of the parameters are invalid
 *  @return {Object} A JSON-RPC 1.0 or 2.0 request
 *  @memberOf Utils
 */
const generateRequest$1 = function(method, params, id, options) {
  if(typeof method !== 'string') {
    throw new TypeError(method + ' must be a string');
  }

  options = options || {};

  // check valid version provided
  const version = typeof options.version === 'number' ? options.version : 2;
  if (version !== 1 && version !== 2) {
    throw new TypeError(version + ' must be 1 or 2');
  }

  const request = {
    method: method
  };

  if(version === 2) {
    request.jsonrpc = '2.0';
  }

  if(params) {
    // params given, but invalid?
    if(typeof params !== 'object' && !Array.isArray(params)) {
      throw new TypeError(params + ' must be an object, array or omitted');
    }
    request.params = params;
  }

  // if id was left out, generate one (null means explicit notification)
  if(typeof(id) === 'undefined') {
    const generator = typeof options.generator === 'function' ? options.generator : function() { return uuid$1(); };
    request.id = generator(request, options);
  } else if (version === 2 && id === null) {
    // we have a version 2 notification
    if (options.notificationIdNull) {
      request.id = null; // id will not be set at all unless option provided
    }
  } else {
    request.id = id;
  }

  return request;
};

var generateRequest_1 = generateRequest$1;

const uuid = require$$0$1.v4;
const generateRequest = generateRequest_1;

/**
 * Constructor for a Jayson Browser Client that does not depend any node.js core libraries
 * @class ClientBrowser
 * @param {Function} callServer Method that calls the server, receives the stringified request and a regular node-style callback
 * @param {Object} [options]
 * @param {Function} [options.reviver] Reviver function for JSON
 * @param {Function} [options.replacer] Replacer function for JSON
 * @param {Number} [options.version=2] JSON-RPC version to use (1|2)
 * @param {Function} [options.generator] Function to use for generating request IDs
 *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
 * @return {ClientBrowser}
 */
const ClientBrowser = function(callServer, options) {
  if(!(this instanceof ClientBrowser)) {
    return new ClientBrowser(callServer, options);
  }

  if (!options) {
    options = {};
  }

  this.options = {
    reviver: typeof options.reviver !== 'undefined' ? options.reviver : null,
    replacer: typeof options.replacer !== 'undefined' ? options.replacer : null,
    generator: typeof options.generator !== 'undefined' ? options.generator : function() { return uuid(); },
    version: typeof options.version !== 'undefined' ? options.version : 2,
    notificationIdNull: typeof options.notificationIdNull === 'boolean' ? options.notificationIdNull : false,
  };

  this.callServer = callServer;
};

var browser = ClientBrowser;

/**
 *  Creates a request and dispatches it if given a callback.
 *  @param {String|Array} method A batch request if passed an Array, or a method name if passed a String
 *  @param {Array|Object} [params] Parameters for the method
 *  @param {String|Number} [id] Optional id. If undefined an id will be generated. If null it creates a notification request
 *  @param {Function} [callback] Request callback. If specified, executes the request rather than only returning it.
 *  @throws {TypeError} Invalid parameters
 *  @return {Object} JSON-RPC 1.0 or 2.0 compatible request
 */
ClientBrowser.prototype.request = function(method, params, id, callback) {
  const self = this;
  let request = null;

  // is this a batch request?
  const isBatch = Array.isArray(method) && typeof params === 'function';

  if (this.options.version === 1 && isBatch) {
    throw new TypeError('JSON-RPC 1.0 does not support batching');
  }

  // is this a raw request?
  const isRaw = !isBatch && method && typeof method === 'object' && typeof params === 'function';

  if(isBatch || isRaw) {
    callback = params;
    request = method;
  } else {
    if(typeof id === 'function') {
      callback = id;
      // specifically undefined because "null" is a notification request
      id = undefined;
    }

    const hasCallback = typeof callback === 'function';

    try {
      request = generateRequest(method, params, id, {
        generator: this.options.generator,
        version: this.options.version,
        notificationIdNull: this.options.notificationIdNull,
      });
    } catch(err) {
      if(hasCallback) {
        return callback(err);
      }
      throw err;
    }

    // no callback means we should just return a raw request
    if(!hasCallback) {
      return request;
    }

  }

  let message;
  try {
    message = JSON.stringify(request, this.options.replacer);
  } catch(err) {
    return callback(err);
  }

  this.callServer(message, function(err, response) {
    self._parseResponse(err, response, callback);
  });

  // always return the raw request
  return request;
};

/**
 * Parses a response from a server
 * @param {Object} err Error to pass on that is unrelated to the actual response
 * @param {String} responseText JSON-RPC 1.0 or 2.0 response
 * @param {Function} callback Callback that will receive different arguments depending on the amount of parameters
 * @private
 */
ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
  if(err) {
    callback(err);
    return;
  }

  if(!responseText) {
    // empty response text, assume that is correct because it could be a
    // notification which jayson does not give any body for
    return callback();
  }

  let response;
  try {
    response = JSON.parse(responseText, this.options.reviver);
  } catch(err) {
    return callback(err);
  }

  if(callback.length === 3) {
    // if callback length is 3, we split callback arguments on error and response

    // is batch response?
    if(Array.isArray(response)) {

      // neccesary to split strictly on validity according to spec here
      const isError = function(res) {
        return typeof res.error !== 'undefined';
      };

      const isNotError = function (res) {
        return !isError(res);
      };

      return callback(null, response.filter(isError), response.filter(isNotError));
    
    } else {

      // split regardless of validity
      return callback(null, response.error, response.result);
    
    }
  
  }

  callback(null, response);
};

var RpcClient = browser;

const MINIMUM_SLOT_PER_EPOCH = 32; // Returns the number of trailing zeros in the binary representation of self.

function trailingZeros(n) {
  let trailingZeros = 0;

  while (n > 1) {
    n /= 2;
    trailingZeros++;
  }

  return trailingZeros;
} // Returns the smallest power of two greater than or equal to n


function nextPowerOfTwo(n) {
  if (n === 0) return 1;
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n |= n >> 32;
  return n + 1;
}
/**
 * Epoch schedule
 * (see https://docs.solana.com/terminology#epoch)
 * Can be retrieved with the {@link connection.getEpochSchedule} method
 */


class EpochSchedule {
  /** The maximum number of slots in each epoch */

  /** The number of slots before beginning of an epoch to calculate a leader schedule for that epoch */

  /** Indicates whether epochs start short and grow */

  /** The first epoch with `slotsPerEpoch` slots */

  /** The first slot of `firstNormalEpoch` */
  constructor(slotsPerEpoch, leaderScheduleSlotOffset, warmup, firstNormalEpoch, firstNormalSlot) {
    this.slotsPerEpoch = void 0;
    this.leaderScheduleSlotOffset = void 0;
    this.warmup = void 0;
    this.firstNormalEpoch = void 0;
    this.firstNormalSlot = void 0;
    this.slotsPerEpoch = slotsPerEpoch;
    this.leaderScheduleSlotOffset = leaderScheduleSlotOffset;
    this.warmup = warmup;
    this.firstNormalEpoch = firstNormalEpoch;
    this.firstNormalSlot = firstNormalSlot;
  }

  getEpoch(slot) {
    return this.getEpochAndSlotIndex(slot)[0];
  }

  getEpochAndSlotIndex(slot) {
    if (slot < this.firstNormalSlot) {
      const epoch = trailingZeros(nextPowerOfTwo(slot + MINIMUM_SLOT_PER_EPOCH + 1)) - trailingZeros(MINIMUM_SLOT_PER_EPOCH) - 1;
      const epochLen = this.getSlotsInEpoch(epoch);
      const slotIndex = slot - (epochLen - MINIMUM_SLOT_PER_EPOCH);
      return [epoch, slotIndex];
    } else {
      const normalSlotIndex = slot - this.firstNormalSlot;
      const normalEpochIndex = Math.floor(normalSlotIndex / this.slotsPerEpoch);
      const epoch = this.firstNormalEpoch + normalEpochIndex;
      const slotIndex = normalSlotIndex % this.slotsPerEpoch;
      return [epoch, slotIndex];
    }
  }

  getFirstSlotInEpoch(epoch) {
    if (epoch <= this.firstNormalEpoch) {
      return (Math.pow(2, epoch) - 1) * MINIMUM_SLOT_PER_EPOCH;
    } else {
      return (epoch - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
    }
  }

  getLastSlotInEpoch(epoch) {
    return this.getFirstSlotInEpoch(epoch) + this.getSlotsInEpoch(epoch) - 1;
  }

  getSlotsInEpoch(epoch) {
    if (epoch < this.firstNormalEpoch) {
      return Math.pow(2, epoch + trailingZeros(MINIMUM_SLOT_PER_EPOCH));
    } else {
      return this.slotsPerEpoch;
    }
  }

}

class SendTransactionError extends Error {
  constructor(message, logs) {
    super(message);
    this.logs = void 0;
    this.logs = logs;
  }

}

// TODO: These constants should be removed in favor of reading them out of a
// Syscall account

/**
 * @internal
 */
const NUM_TICKS_PER_SECOND = 160;
/**
 * @internal
 */

const DEFAULT_TICKS_PER_SLOT = 64;
/**
 * @internal
 */

const NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
/**
 * @internal
 */

const MS_PER_SLOT = 1000 / NUM_SLOTS_PER_SECOND;

function promiseTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise(resolve => {
    timeoutId = setTimeout(() => resolve(null), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).then(result => {
    clearTimeout(timeoutId);
    return result;
  });
}

function makeWebsocketUrl(endpoint) {
  let url = new URL(endpoint);
  const useHttps = url.protocol === 'https:';
  url.protocol = useHttps ? 'wss:' : 'ws:';
  url.host = ''; // Only shift the port by +1 as a convention for ws(s) only if given endpoint
  // is explictly specifying the endpoint port (HTTP-based RPC), assuming
  // we're directly trying to connect to solana-validator's ws listening port.
  // When the endpoint omits the port, we're connecting to the protocol
  // default ports: http(80) or https(443) and it's assumed we're behind a reverse
  // proxy which manages WebSocket upgrade and backend port redirection.

  if (url.port !== '') {
    url.port = String(Number(url.port) + 1);
  }

  return url.toString();
}

const PublicKeyFromString = coerce(instance(PublicKey), string(), value => new PublicKey(value));
const RawAccountDataResult = tuple([string(), literal('base64')]);
const BufferFromRawAccountData = coerce(instance(Buffer$1), RawAccountDataResult, value => Buffer$1.from(value[0], 'base64'));
/**
 * Attempt to use a recent blockhash for up to 30 seconds
 * @internal
 */

const BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1000;

/**
 * @internal
 */
function createRpcResult(result) {
  return union([type({
    jsonrpc: literal('2.0'),
    id: string(),
    result
  }), type({
    jsonrpc: literal('2.0'),
    id: string(),
    error: type({
      code: unknown(),
      message: string(),
      data: optional(any())
    })
  })]);
}

const UnknownRpcResult = createRpcResult(unknown());
/**
 * @internal
 */

function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, value => {
    if ('error' in value) {
      return value;
    } else {
      return { ...value,
        result: create(value.result, schema)
      };
    }
  });
}
/**
 * @internal
 */


function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number()
    }),
    value
  }));
}
/**
 * @internal
 */


function notificationResultAndContext(value) {
  return type({
    context: type({
      slot: number()
    }),
    value
  });
}
/**
 * The level of commitment desired when querying state
 * <pre>
 *   'processed': Query the most recent block which has reached 1 confirmation by the connected node
 *   'confirmed': Query the most recent block which has reached 1 confirmation by the cluster
 *   'finalized': Query the most recent block which has been finalized by the cluster
 * </pre>
 */


const GetInflationGovernorResult = type({
  foundation: number(),
  foundationTerm: number(),
  initial: number(),
  taper: number(),
  terminal: number()
});
/**
 * The inflation reward for an epoch
 */

/**
 * Expected JSON RPC response for the "getInflationReward" message
 */
const GetInflationRewardResult = jsonRpcResult(array(nullable(type({
  epoch: number(),
  effectiveSlot: number(),
  amount: number(),
  postBalance: number()
}))));
/**
 * Information about the current epoch
 */

const GetEpochInfoResult = type({
  epoch: number(),
  slotIndex: number(),
  slotsInEpoch: number(),
  absoluteSlot: number(),
  blockHeight: optional(number()),
  transactionCount: optional(number())
});
const GetEpochScheduleResult = type({
  slotsPerEpoch: number(),
  leaderScheduleSlotOffset: number(),
  warmup: boolean(),
  firstNormalEpoch: number(),
  firstNormalSlot: number()
});
/**
 * Leader schedule
 * (see https://docs.solana.com/terminology#leader-schedule)
 */

const GetLeaderScheduleResult = record(string(), array(number()));
/**
 * Transaction error or null
 */

const TransactionErrorResult = nullable(union([type({}), string()]));
/**
 * Signature status for a transaction
 */

const SignatureStatusResult = type({
  err: TransactionErrorResult
});
/**
 * Transaction signature received notification
 */

const SignatureReceivedResult = literal('receivedSignature');
/**
 * Version info for a node
 */

const VersionResult = type({
  'solana-core': string(),
  'feature-set': optional(number())
});
const SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
  err: nullable(union([type({}), string()])),
  logs: nullable(array(string())),
  accounts: optional(nullable(array(nullable(type({
    executable: boolean(),
    owner: string(),
    lamports: number(),
    data: array(string()),
    rentEpoch: optional(number())
  }))))),
  unitsConsumed: optional(number())
}));

/**
 * Expected JSON RPC response for the "getBlockProduction" message
 */
const BlockProductionResponseStruct = jsonRpcResultAndContext(type({
  byIdentity: record(string(), array(number())),
  range: type({
    firstSlot: number(),
    lastSlot: number()
  })
}));
/**
 * A performance sample
 */

function createRpcClient(url, useHttps, httpHeaders, customFetch, fetchMiddleware, disableRetryOnRateLimit) {
  const fetch = customFetch ? customFetch : crossFetch;

  let fetchWithMiddleware;

  if (fetchMiddleware) {
    fetchWithMiddleware = async (url, options) => {
      const modifiedFetchArgs = await new Promise((resolve, reject) => {
        try {
          fetchMiddleware(url, options, (modifiedUrl, modifiedOptions) => resolve([modifiedUrl, modifiedOptions]));
        } catch (error) {
          reject(error);
        }
      });
      return await fetch(...modifiedFetchArgs);
    };
  }

  const clientBrowser = new RpcClient(async (request, callback) => {
    const agent = undefined;
    const options = {
      method: 'POST',
      body: request,
      agent,
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, httpHeaders || {})
    };

    try {
      let too_many_requests_retries = 5;
      let res;
      let waitTime = 500;

      for (;;) {
        if (fetchWithMiddleware) {
          res = await fetchWithMiddleware(url, options);
        } else {
          res = await fetch(url, options);
        }

        if (res.status !== 429
        /* Too many requests */
        ) {
          break;
        }

        if (disableRetryOnRateLimit === true) {
          break;
        }

        too_many_requests_retries -= 1;

        if (too_many_requests_retries === 0) {
          break;
        }

        console.log(`Server responded with ${res.status} ${res.statusText}.  Retrying after ${waitTime}ms delay...`);
        await sleep(waitTime);
        waitTime *= 2;
      }

      const text = await res.text();

      if (res.ok) {
        callback(null, text);
      } else {
        callback(new Error(`${res.status} ${res.statusText}: ${text}`));
      }
    } catch (err) {
      if (err instanceof Error) callback(err);
    } finally {
    }
  }, {});
  return clientBrowser;
}

function createRpcRequest(client) {
  return (method, args) => {
    return new Promise((resolve, reject) => {
      client.request(method, args, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  };
}

function createRpcBatchRequest(client) {
  return requests => {
    return new Promise((resolve, reject) => {
      // Do nothing if requests is empty
      if (requests.length === 0) resolve([]);
      const batch = requests.map(params => {
        return client.request(params.methodName, params.args);
      });
      client.request(batch, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  };
}
/**
 * Expected JSON RPC response for the "getInflationGovernor" message
 */


const GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
/**
 * Expected JSON RPC response for the "getEpochInfo" message
 */

const GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
/**
 * Expected JSON RPC response for the "getEpochSchedule" message
 */

const GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
/**
 * Expected JSON RPC response for the "getLeaderSchedule" message
 */

const GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
/**
 * Expected JSON RPC response for the "minimumLedgerSlot" and "getFirstAvailableBlock" messages
 */

const SlotRpcResult = jsonRpcResult(number());
/**
 * Supply
 */

/**
 * Expected JSON RPC response for the "getSupply" message
 */
const GetSupplyRpcResult = jsonRpcResultAndContext(type({
  total: number(),
  circulating: number(),
  nonCirculating: number(),
  nonCirculatingAccounts: array(PublicKeyFromString)
}));
/**
 * Token amount object which returns a token amount in different formats
 * for various client use cases.
 */

/**
 * Expected JSON RPC structure for token amounts
 */
const TokenAmountResult = type({
  amount: string(),
  uiAmount: nullable(number()),
  decimals: number(),
  uiAmountString: optional(string())
});
/**
 * Token address and balance.
 */

/**
 * Expected JSON RPC response for the "getTokenLargestAccounts" message
 */
const GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
  address: PublicKeyFromString,
  amount: string(),
  uiAmount: nullable(number()),
  decimals: number(),
  uiAmountString: optional(string())
})));
/**
 * Expected JSON RPC response for the "getTokenAccountsByOwner" message
 */

const GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: BufferFromRawAccountData,
    rentEpoch: number()
  })
})));
const ParsedAccountDataResult = type({
  program: string(),
  parsed: unknown(),
  space: number()
});
/**
 * Expected JSON RPC response for the "getTokenAccountsByOwner" message with parsed data
 */

const GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: ParsedAccountDataResult,
    rentEpoch: number()
  })
})));
/**
 * Pair of an account address and its balance
 */

/**
 * Expected JSON RPC response for the "getLargestAccounts" message
 */
const GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
  lamports: number(),
  address: PublicKeyFromString
})));
/**
 * @internal
 */

const AccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number(),
  data: BufferFromRawAccountData,
  rentEpoch: number()
});
/**
 * @internal
 */

const KeyedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
const ParsedOrRawAccountData = coerce(union([instance(Buffer$1), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), value => {
  if (Array.isArray(value)) {
    return create(value, BufferFromRawAccountData);
  } else {
    return value;
  }
});
/**
 * @internal
 */

const ParsedAccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number(),
  data: ParsedOrRawAccountData,
  rentEpoch: number()
});
const KeyedParsedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: ParsedAccountInfoResult
});
/**
 * @internal
 */

const StakeActivationResult = type({
  state: union([literal('active'), literal('inactive'), literal('activating'), literal('deactivating')]),
  active: number(),
  inactive: number()
});
/**
 * Expected JSON RPC response for the "getConfirmedSignaturesForAddress2" message
 */

const GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number()))
})));
/**
 * Expected JSON RPC response for the "getSignaturesForAddress" message
 */

const GetSignaturesForAddressRpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number()))
})));
/***
 * Expected JSON RPC response for the "accountNotification" message
 */

const AccountNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(AccountInfoResult)
});
/**
 * @internal
 */

const ProgramAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
/***
 * Expected JSON RPC response for the "programNotification" message
 */

const ProgramAccountNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(ProgramAccountInfoResult)
});
/**
 * @internal
 */

const SlotInfoResult = type({
  parent: number(),
  slot: number(),
  root: number()
});
/**
 * Expected JSON RPC response for the "slotNotification" message
 */

const SlotNotificationResult = type({
  subscription: number(),
  result: SlotInfoResult
});
/**
 * Slot updates which can be used for tracking the live progress of a cluster.
 * - `"firstShredReceived"`: connected node received the first shred of a block.
 * Indicates that a new block that is being produced.
 * - `"completed"`: connected node has received all shreds of a block. Indicates
 * a block was recently produced.
 * - `"optimisticConfirmation"`: block was optimistically confirmed by the
 * cluster. It is not guaranteed that an optimistic confirmation notification
 * will be sent for every finalized blocks.
 * - `"root"`: the connected node rooted this block.
 * - `"createdBank"`: the connected node has started validating this block.
 * - `"frozen"`: the connected node has validated this block.
 * - `"dead"`: the connected node failed to validate this block.
 */

/**
 * @internal
 */
const SlotUpdateResult = union([type({
  type: union([literal('firstShredReceived'), literal('completed'), literal('optimisticConfirmation'), literal('root')]),
  slot: number(),
  timestamp: number()
}), type({
  type: literal('createdBank'),
  parent: number(),
  slot: number(),
  timestamp: number()
}), type({
  type: literal('frozen'),
  slot: number(),
  timestamp: number(),
  stats: type({
    numTransactionEntries: number(),
    numSuccessfulTransactions: number(),
    numFailedTransactions: number(),
    maxTransactionsPerEntry: number()
  })
}), type({
  type: literal('dead'),
  slot: number(),
  timestamp: number(),
  err: string()
})]);
/**
 * Expected JSON RPC response for the "slotsUpdatesNotification" message
 */

const SlotUpdateNotificationResult = type({
  subscription: number(),
  result: SlotUpdateResult
});
/**
 * Expected JSON RPC response for the "signatureNotification" message
 */

const SignatureNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
});
/**
 * Expected JSON RPC response for the "rootNotification" message
 */

const RootNotificationResult = type({
  subscription: number(),
  result: number()
});
const ContactInfoResult = type({
  pubkey: string(),
  gossip: nullable(string()),
  tpu: nullable(string()),
  rpc: nullable(string()),
  version: nullable(string())
});
const VoteAccountInfoResult = type({
  votePubkey: string(),
  nodePubkey: string(),
  activatedStake: number(),
  epochVoteAccount: boolean(),
  epochCredits: array(tuple([number(), number(), number()])),
  commission: number(),
  lastVote: number(),
  rootSlot: nullable(number())
});
/**
 * Expected JSON RPC response for the "getVoteAccounts" message
 */

const GetVoteAccounts = jsonRpcResult(type({
  current: array(VoteAccountInfoResult),
  delinquent: array(VoteAccountInfoResult)
}));
const ConfirmationStatus = union([literal('processed'), literal('confirmed'), literal('finalized')]);
const SignatureStatusResponse = type({
  slot: number(),
  confirmations: nullable(number()),
  err: TransactionErrorResult,
  confirmationStatus: optional(ConfirmationStatus)
});
/**
 * Expected JSON RPC response for the "getSignatureStatuses" message
 */

const GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
/**
 * Expected JSON RPC response for the "getMinimumBalanceForRentExemption" message
 */

const GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number());
const ConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(string()),
    header: type({
      numRequiredSignatures: number(),
      numReadonlySignedAccounts: number(),
      numReadonlyUnsignedAccounts: number()
    }),
    instructions: array(type({
      accounts: array(number()),
      data: string(),
      programIdIndex: number()
    })),
    recentBlockhash: string()
  })
});
const ParsedInstructionResult = type({
  parsed: unknown(),
  program: string(),
  programId: PublicKeyFromString
});
const RawInstructionResult = type({
  accounts: array(PublicKeyFromString),
  data: string(),
  programId: PublicKeyFromString
});
const InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
const UnknownInstructionResult = union([type({
  parsed: unknown(),
  program: string(),
  programId: string()
}), type({
  accounts: array(string()),
  data: string(),
  programId: string()
})]);
const ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, value => {
  if ('accounts' in value) {
    return create(value, RawInstructionResult);
  } else {
    return create(value, ParsedInstructionResult);
  }
});
/**
 * @internal
 */

const ParsedConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(type({
      pubkey: PublicKeyFromString,
      signer: boolean(),
      writable: boolean()
    })),
    instructions: array(ParsedOrRawInstruction),
    recentBlockhash: string()
  })
});
const TokenBalanceResult = type({
  accountIndex: number(),
  mint: string(),
  owner: optional(string()),
  uiTokenAmount: TokenAmountResult
});
/**
 * @internal
 */

const ConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number(),
  innerInstructions: optional(nullable(array(type({
    index: number(),
    instructions: array(type({
      accounts: array(number()),
      data: string(),
      programIdIndex: number()
    }))
  })))),
  preBalances: array(number()),
  postBalances: array(number()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult)))
});
/**
 * @internal
 */

const ParsedConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number(),
  innerInstructions: optional(nullable(array(type({
    index: number(),
    instructions: array(ParsedOrRawInstruction)
  })))),
  preBalances: array(number()),
  postBalances: array(number()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult)))
});
/**
 * Expected JSON RPC response for the "getBlock" message
 */

const GetBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult)
  })),
  rewards: optional(array(type({
    pubkey: string(),
    lamports: number(),
    postBalance: nullable(number()),
    rewardType: nullable(string())
  }))),
  blockTime: nullable(number()),
  blockHeight: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getConfirmedBlock" message
 *
 * @deprecated Deprecated since Solana v1.8.0. Please use {@link GetBlockRpcResult} instead.
 */

const GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult)
  })),
  rewards: optional(array(type({
    pubkey: string(),
    lamports: number(),
    postBalance: nullable(number()),
    rewardType: nullable(string())
  }))),
  blockTime: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getBlock" message
 */

const GetBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  signatures: array(string()),
  blockTime: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getTransaction" message
 */

const GetTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number(),
  meta: ConfirmedTransactionMetaResult,
  blockTime: optional(nullable(number())),
  transaction: ConfirmedTransactionResult
})));
/**
 * Expected parsed JSON RPC response for the "getTransaction" message
 */

const GetParsedTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number(),
  transaction: ParsedConfirmedTransactionResult,
  meta: nullable(ParsedConfirmedTransactionMetaResult),
  blockTime: optional(nullable(number()))
})));
/**
 * Expected JSON RPC response for the "getRecentBlockhash" message
 *
 * @deprecated Deprecated since Solana v1.8.0. Please use {@link GetLatestBlockhashRpcResult} instead.
 */

const GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  feeCalculator: type({
    lamportsPerSignature: number()
  })
}));
/**
 * Expected JSON RPC response for the "getLatestBlockhash" message
 */

const GetLatestBlockhashRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  lastValidBlockHeight: number()
}));
const PerfSampleResult = type({
  slot: number(),
  numTransactions: number(),
  numSlots: number(),
  samplePeriodSecs: number()
});
/*
 * Expected JSON RPC response for "getRecentPerformanceSamples" message
 */

const GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
/**
 * Expected JSON RPC response for the "getFeeCalculatorForBlockhash" message
 */

const GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
  feeCalculator: type({
    lamportsPerSignature: number()
  })
})));
/**
 * Expected JSON RPC response for the "requestAirdrop" message
 */

const RequestAirdropRpcResult = jsonRpcResult(string());
/**
 * Expected JSON RPC response for the "sendTransaction" message
 */

const SendTransactionRpcResult = jsonRpcResult(string());
/**
 * Information about the latest slot being processed by a node
 */

/**
 * @internal
 */
const LogsResult = type({
  err: TransactionErrorResult,
  logs: array(string()),
  signature: string()
});
/**
 * Logs result.
 */

/**
 * Expected JSON RPC response for the "logsNotification" message.
 */
const LogsNotificationResult = type({
  result: notificationResultAndContext(LogsResult),
  subscription: number()
});
/**
 * Filter for log subscriptions.
 */

function createSubscriptionWarningMessage(id, label) {
  return 'Ignored unsubscribe request because an active subscription ' + `with id \`${id}\` for '${label}' events could not be found.`;
}
/**
 * A connection to a fullnode JSON RPC endpoint
 */


class Connection {
  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /**
   * Establish a JSON RPC connection
   *
   * @param endpoint URL to the fullnode JSON RPC endpoint
   * @param commitmentOrConfig optional default commitment level or optional ConnectionConfig configuration object
   */
  constructor(endpoint, commitmentOrConfig) {
    this._commitment = void 0;
    this._confirmTransactionInitialTimeout = void 0;
    this._rpcEndpoint = void 0;
    this._rpcWsEndpoint = void 0;
    this._rpcClient = void 0;
    this._rpcRequest = void 0;
    this._rpcBatchRequest = void 0;
    this._rpcWebSocket = void 0;
    this._rpcWebSocketConnected = false;
    this._rpcWebSocketHeartbeat = null;
    this._rpcWebSocketIdleTimeout = null;
    this._disableBlockhashCaching = false;
    this._pollingBlockhash = false;
    this._blockhashInfo = {
      recentBlockhash: null,
      lastFetch: 0,
      transactionSignatures: [],
      simulatedSignatures: []
    };
    this._accountChangeSubscriptionCounter = 0;
    this._accountChangeSubscriptions = {};
    this._programAccountChangeSubscriptionCounter = 0;
    this._programAccountChangeSubscriptions = {};
    this._rootSubscriptionCounter = 0;
    this._rootSubscriptions = {};
    this._signatureSubscriptionCounter = 0;
    this._signatureSubscriptions = {};
    this._slotSubscriptionCounter = 0;
    this._slotSubscriptions = {};
    this._logsSubscriptionCounter = 0;
    this._logsSubscriptions = {};
    this._slotUpdateSubscriptionCounter = 0;
    this._slotUpdateSubscriptions = {};
    let url = new URL(endpoint);
    const useHttps = url.protocol === 'https:';
    let wsEndpoint;
    let httpHeaders;
    let fetch;
    let fetchMiddleware;
    let disableRetryOnRateLimit;

    if (commitmentOrConfig && typeof commitmentOrConfig === 'string') {
      this._commitment = commitmentOrConfig;
    } else if (commitmentOrConfig) {
      this._commitment = commitmentOrConfig.commitment;
      this._confirmTransactionInitialTimeout = commitmentOrConfig.confirmTransactionInitialTimeout;
      wsEndpoint = commitmentOrConfig.wsEndpoint;
      httpHeaders = commitmentOrConfig.httpHeaders;
      fetch = commitmentOrConfig.fetch;
      fetchMiddleware = commitmentOrConfig.fetchMiddleware;
      disableRetryOnRateLimit = commitmentOrConfig.disableRetryOnRateLimit;
    }

    this._rpcEndpoint = endpoint;
    this._rpcWsEndpoint = wsEndpoint || makeWebsocketUrl(endpoint);
    this._rpcClient = createRpcClient(url.toString(), useHttps, httpHeaders, fetch, fetchMiddleware, disableRetryOnRateLimit);
    this._rpcRequest = createRpcRequest(this._rpcClient);
    this._rpcBatchRequest = createRpcBatchRequest(this._rpcClient);
    this._rpcWebSocket = new Client_1(this._rpcWsEndpoint, {
      autoconnect: false,
      max_reconnects: Infinity
    });

    this._rpcWebSocket.on('open', this._wsOnOpen.bind(this));

    this._rpcWebSocket.on('error', this._wsOnError.bind(this));

    this._rpcWebSocket.on('close', this._wsOnClose.bind(this));

    this._rpcWebSocket.on('accountNotification', this._wsOnAccountNotification.bind(this));

    this._rpcWebSocket.on('programNotification', this._wsOnProgramAccountNotification.bind(this));

    this._rpcWebSocket.on('slotNotification', this._wsOnSlotNotification.bind(this));

    this._rpcWebSocket.on('slotsUpdatesNotification', this._wsOnSlotUpdatesNotification.bind(this));

    this._rpcWebSocket.on('signatureNotification', this._wsOnSignatureNotification.bind(this));

    this._rpcWebSocket.on('rootNotification', this._wsOnRootNotification.bind(this));

    this._rpcWebSocket.on('logsNotification', this._wsOnLogsNotification.bind(this));
  }
  /**
   * The default commitment used for requests
   */


  get commitment() {
    return this._commitment;
  }
  /**
   * The RPC endpoint
   */


  get rpcEndpoint() {
    return this._rpcEndpoint;
  }
  /**
   * Fetch the balance for the specified public key, return with context
   */


  async getBalanceAndContext(publicKey, commitment) {
    const args = this._buildArgs([publicKey.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getBalance', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(number()));

    if ('error' in res) {
      throw new Error('failed to get balance for ' + publicKey.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the balance for the specified public key
   */


  async getBalance(publicKey, commitment) {
    return await this.getBalanceAndContext(publicKey, commitment).then(x => x.value).catch(e => {
      throw new Error('failed to get balance of account ' + publicKey.toBase58() + ': ' + e);
    });
  }
  /**
   * Fetch the estimated production time of a block
   */


  async getBlockTime(slot) {
    const unsafeRes = await this._rpcRequest('getBlockTime', [slot]);
    const res = create(unsafeRes, jsonRpcResult(nullable(number())));

    if ('error' in res) {
      throw new Error('failed to get block time for slot ' + slot + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the lowest slot that the node has information about in its ledger.
   * This value may increase over time if the node is configured to purge older ledger data
   */


  async getMinimumLedgerSlot() {
    const unsafeRes = await this._rpcRequest('minimumLedgerSlot', []);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new Error('failed to get minimum ledger slot: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
   */


  async getFirstAvailableBlock() {
    const unsafeRes = await this._rpcRequest('getFirstAvailableBlock', []);
    const res = create(unsafeRes, SlotRpcResult);

    if ('error' in res) {
      throw new Error('failed to get first available block: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch information about the current supply
   */


  async getSupply(config) {
    let configArg = {};

    if (typeof config === 'string') {
      configArg = {
        commitment: config
      };
    } else if (config) {
      configArg = { ...config,
        commitment: config && config.commitment || this.commitment
      };
    } else {
      configArg = {
        commitment: this.commitment
      };
    }

    const unsafeRes = await this._rpcRequest('getSupply', [configArg]);
    const res = create(unsafeRes, GetSupplyRpcResult);

    if ('error' in res) {
      throw new Error('failed to get supply: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current supply of a token mint
   */


  async getTokenSupply(tokenMintAddress, commitment) {
    const args = this._buildArgs([tokenMintAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenSupply', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

    if ('error' in res) {
      throw new Error('failed to get token supply: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current balance of a token account
   */


  async getTokenAccountBalance(tokenAddress, commitment) {
    const args = this._buildArgs([tokenAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenAccountBalance', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

    if ('error' in res) {
      throw new Error('failed to get token account balance: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch all the token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>>}
   */


  async getTokenAccountsByOwner(ownerAddress, filter, commitment) {
    let _args = [ownerAddress.toBase58()];

    if ('mint' in filter) {
      _args.push({
        mint: filter.mint.toBase58()
      });
    } else {
      _args.push({
        programId: filter.programId.toBase58()
      });
    }

    const args = this._buildArgs(_args, commitment, 'base64');

    const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
    const res = create(unsafeRes, GetTokenAccountsByOwner);

    if ('error' in res) {
      throw new Error('failed to get token accounts owned by account ' + ownerAddress.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch parsed token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
   */


  async getParsedTokenAccountsByOwner(ownerAddress, filter, commitment) {
    let _args = [ownerAddress.toBase58()];

    if ('mint' in filter) {
      _args.push({
        mint: filter.mint.toBase58()
      });
    } else {
      _args.push({
        programId: filter.programId.toBase58()
      });
    }

    const args = this._buildArgs(_args, commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
    const res = create(unsafeRes, GetParsedTokenAccountsByOwner);

    if ('error' in res) {
      throw new Error('failed to get token accounts owned by account ' + ownerAddress.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the 20 largest accounts with their current balances
   */


  async getLargestAccounts(config) {
    const arg = { ...config,
      commitment: config && config.commitment || this.commitment
    };
    const args = arg.filter || arg.commitment ? [arg] : [];
    const unsafeRes = await this._rpcRequest('getLargestAccounts', args);
    const res = create(unsafeRes, GetLargestAccountsRpcResult);

    if ('error' in res) {
      throw new Error('failed to get largest accounts: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the 20 largest token accounts with their current balances
   * for a given mint.
   */


  async getTokenLargestAccounts(mintAddress, commitment) {
    const args = this._buildArgs([mintAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenLargestAccounts', args);
    const res = create(unsafeRes, GetTokenLargestAccountsResult);

    if ('error' in res) {
      throw new Error('failed to get token largest accounts: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch all the account info for the specified public key, return with context
   */


  async getAccountInfoAndContext(publicKey, commitment) {
    const args = this._buildArgs([publicKey.toBase58()], commitment, 'base64');

    const unsafeRes = await this._rpcRequest('getAccountInfo', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(AccountInfoResult)));

    if ('error' in res) {
      throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch parsed account info for the specified public key
   */


  async getParsedAccountInfo(publicKey, commitment) {
    const args = this._buildArgs([publicKey.toBase58()], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getAccountInfo', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(ParsedAccountInfoResult)));

    if ('error' in res) {
      throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch all the account info for the specified public key
   */


  async getAccountInfo(publicKey, commitment) {
    try {
      const res = await this.getAccountInfoAndContext(publicKey, commitment);
      return res.value;
    } catch (e) {
      throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + e);
    }
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */


  async getMultipleAccountsInfoAndContext(publicKeys, commitment) {
    const keys = publicKeys.map(key => key.toBase58());

    const args = this._buildArgs([keys], commitment, 'base64');

    const unsafeRes = await this._rpcRequest('getMultipleAccounts', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(AccountInfoResult))));

    if ('error' in res) {
      throw new Error('failed to get info for accounts ' + keys + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys
   */


  async getMultipleAccountsInfo(publicKeys, commitment) {
    const res = await this.getMultipleAccountsInfoAndContext(publicKeys, commitment);
    return res.value;
  }
  /**
   * Returns epoch activation information for a stake account that has been delegated
   */


  async getStakeActivation(publicKey, commitment, epoch) {
    const args = this._buildArgs([publicKey.toBase58()], commitment, undefined, epoch !== undefined ? {
      epoch
    } : undefined);

    const unsafeRes = await this._rpcRequest('getStakeActivation', args);
    const res = create(unsafeRes, jsonRpcResult(StakeActivationResult));

    if ('error' in res) {
      throw new Error(`failed to get Stake Activation ${publicKey.toBase58()}: ${res.error.message}`);
    }

    return res.result;
  }
  /**
   * Fetch all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
   */


  async getProgramAccounts(programId, configOrCommitment) {
    const extra = {};
    let commitment;
    let encoding;

    if (configOrCommitment) {
      if (typeof configOrCommitment === 'string') {
        commitment = configOrCommitment;
      } else {
        commitment = configOrCommitment.commitment;
        encoding = configOrCommitment.encoding;

        if (configOrCommitment.dataSlice) {
          extra.dataSlice = configOrCommitment.dataSlice;
        }

        if (configOrCommitment.filters) {
          extra.filters = configOrCommitment.filters;
        }
      }
    }

    const args = this._buildArgs([programId.toBase58()], commitment, encoding || 'base64', extra);

    const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
    const res = create(unsafeRes, jsonRpcResult(array(KeyedAccountInfoResult)));

    if ('error' in res) {
      throw new Error('failed to get accounts owned by program ' + programId.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch and parse all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
   */


  async getParsedProgramAccounts(programId, configOrCommitment) {
    const extra = {};
    let commitment;

    if (configOrCommitment) {
      if (typeof configOrCommitment === 'string') {
        commitment = configOrCommitment;
      } else {
        commitment = configOrCommitment.commitment;

        if (configOrCommitment.filters) {
          extra.filters = configOrCommitment.filters;
        }
      }
    }

    const args = this._buildArgs([programId.toBase58()], commitment, 'jsonParsed', extra);

    const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
    const res = create(unsafeRes, jsonRpcResult(array(KeyedParsedAccountInfoResult)));

    if ('error' in res) {
      throw new Error('failed to get accounts owned by program ' + programId.toBase58() + ': ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Confirm the transaction identified by the specified signature.
   */


  async confirmTransaction(signature, commitment) {
    let decodedSignature;

    try {
      decodedSignature = bs58$1.decode(signature);
    } catch (err) {
      throw new Error('signature must be base58 encoded: ' + signature);
    }

    assert$c(decodedSignature.length === 64, 'signature has invalid length');
    const start = Date.now();
    const subscriptionCommitment = commitment || this.commitment;
    let subscriptionId;
    let response = null;
    const confirmPromise = new Promise((resolve, reject) => {
      try {
        subscriptionId = this.onSignature(signature, (result, context) => {
          subscriptionId = undefined;
          response = {
            context,
            value: result
          };
          resolve(null);
        }, subscriptionCommitment);
      } catch (err) {
        reject(err);
      }
    });
    let timeoutMs = this._confirmTransactionInitialTimeout || 60 * 1000;

    switch (subscriptionCommitment) {
      case 'processed':
      case 'recent':
      case 'single':
      case 'confirmed':
      case 'singleGossip':
        {
          timeoutMs = this._confirmTransactionInitialTimeout || 30 * 1000;
          break;
        }
    }

    try {
      await promiseTimeout(confirmPromise, timeoutMs);
    } finally {
      if (subscriptionId) {
        this.removeSignatureListener(subscriptionId);
      }
    }

    if (response === null) {
      const duration = (Date.now() - start) / 1000;
      throw new Error(`Transaction was not confirmed in ${duration.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${signature} using the Solana Explorer or CLI tools.`);
    }

    return response;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */


  async getClusterNodes() {
    const unsafeRes = await this._rpcRequest('getClusterNodes', []);
    const res = create(unsafeRes, jsonRpcResult(array(ContactInfoResult)));

    if ('error' in res) {
      throw new Error('failed to get cluster nodes: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */


  async getVoteAccounts(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getVoteAccounts', args);
    const res = create(unsafeRes, GetVoteAccounts);

    if ('error' in res) {
      throw new Error('failed to get vote accounts: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current slot that the node is processing
   */


  async getSlot(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getSlot', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new Error('failed to get slot: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current slot leader of the cluster
   */


  async getSlotLeader(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getSlotLeader', args);
    const res = create(unsafeRes, jsonRpcResult(string()));

    if ('error' in res) {
      throw new Error('failed to get slot leader: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch `limit` number of slot leaders starting from `startSlot`
   *
   * @param startSlot fetch slot leaders starting from this slot
   * @param limit number of slot leaders to return
   */


  async getSlotLeaders(startSlot, limit) {
    const args = [startSlot, limit];
    const unsafeRes = await this._rpcRequest('getSlotLeaders', args);
    const res = create(unsafeRes, jsonRpcResult(array(PublicKeyFromString)));

    if ('error' in res) {
      throw new Error('failed to get slot leaders: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current status of a signature
   */


  async getSignatureStatus(signature, config) {
    const {
      context,
      value: values
    } = await this.getSignatureStatuses([signature], config);
    assert$c(values.length === 1);
    const value = values[0];
    return {
      context,
      value
    };
  }
  /**
   * Fetch the current statuses of a batch of signatures
   */


  async getSignatureStatuses(signatures, config) {
    const params = [signatures];

    if (config) {
      params.push(config);
    }

    const unsafeRes = await this._rpcRequest('getSignatureStatuses', params);
    const res = create(unsafeRes, GetSignatureStatusesRpcResult);

    if ('error' in res) {
      throw new Error('failed to get signature status: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current transaction count of the cluster
   */


  async getTransactionCount(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getTransactionCount', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new Error('failed to get transaction count: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the current total currency supply of the cluster in lamports
   *
   * @deprecated Deprecated since v1.2.8. Please use {@link getSupply} instead.
   */


  async getTotalSupply(commitment) {
    const result = await this.getSupply({
      commitment,
      excludeNonCirculatingAccountsList: true
    });
    return result.value.total;
  }
  /**
   * Fetch the cluster InflationGovernor parameters
   */


  async getInflationGovernor(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getInflationGovernor', args);
    const res = create(unsafeRes, GetInflationGovernorRpcResult);

    if ('error' in res) {
      throw new Error('failed to get inflation: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the inflation reward for a list of addresses for an epoch
   */


  async getInflationReward(addresses, epoch, commitment) {
    const args = this._buildArgs([addresses.map(pubkey => pubkey.toBase58())], commitment, undefined, {
      epoch
    });

    const unsafeRes = await this._rpcRequest('getInflationReward', args);
    const res = create(unsafeRes, GetInflationRewardResult);

    if ('error' in res) {
      throw new Error('failed to get inflation reward: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the Epoch Info parameters
   */


  async getEpochInfo(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getEpochInfo', args);
    const res = create(unsafeRes, GetEpochInfoRpcResult);

    if ('error' in res) {
      throw new Error('failed to get epoch info: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the Epoch Schedule parameters
   */


  async getEpochSchedule() {
    const unsafeRes = await this._rpcRequest('getEpochSchedule', []);
    const res = create(unsafeRes, GetEpochScheduleRpcResult);

    if ('error' in res) {
      throw new Error('failed to get epoch schedule: ' + res.error.message);
    }

    const epochSchedule = res.result;
    return new EpochSchedule(epochSchedule.slotsPerEpoch, epochSchedule.leaderScheduleSlotOffset, epochSchedule.warmup, epochSchedule.firstNormalEpoch, epochSchedule.firstNormalSlot);
  }
  /**
   * Fetch the leader schedule for the current epoch
   * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
   */


  async getLeaderSchedule() {
    const unsafeRes = await this._rpcRequest('getLeaderSchedule', []);
    const res = create(unsafeRes, GetLeaderScheduleRpcResult);

    if ('error' in res) {
      throw new Error('failed to get leader schedule: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the minimum balance needed to exempt an account of `dataLength`
   * size from rent
   */


  async getMinimumBalanceForRentExemption(dataLength, commitment) {
    const args = this._buildArgs([dataLength], commitment);

    const unsafeRes = await this._rpcRequest('getMinimumBalanceForRentExemption', args);
    const res = create(unsafeRes, GetMinimumBalanceForRentExemptionRpcResult);

    if ('error' in res) {
      console.warn('Unable to fetch minimum balance for rent exemption');
      return 0;
    }

    return res.result;
  }
  /**
   * Fetch a recent blockhash from the cluster, return with context
   * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
   */


  async getRecentBlockhashAndContext(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getRecentBlockhash', args);
    const res = create(unsafeRes, GetRecentBlockhashAndContextRpcResult);

    if ('error' in res) {
      throw new Error('failed to get recent blockhash: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch recent performance samples
   * @return {Promise<Array<PerfSample>>}
   */


  async getRecentPerformanceSamples(limit) {
    const args = this._buildArgs(limit ? [limit] : []);

    const unsafeRes = await this._rpcRequest('getRecentPerformanceSamples', args);
    const res = create(unsafeRes, GetRecentPerformanceSamplesRpcResult);

    if ('error' in res) {
      throw new Error('failed to get recent performance samples: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the fee calculator for a recent blockhash from the cluster, return with context
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getFeeForMessage} instead.
   */


  async getFeeCalculatorForBlockhash(blockhash, commitment) {
    const args = this._buildArgs([blockhash], commitment);

    const unsafeRes = await this._rpcRequest('getFeeCalculatorForBlockhash', args);
    const res = create(unsafeRes, GetFeeCalculatorRpcResult);

    if ('error' in res) {
      throw new Error('failed to get fee calculator: ' + res.error.message);
    }

    const {
      context,
      value
    } = res.result;
    return {
      context,
      value: value !== null ? value.feeCalculator : null
    };
  }
  /**
   * Fetch the fee for a message from the cluster, return with context
   */


  async getFeeForMessage(message, commitment) {
    const wireMessage = message.serialize().toString('base64');

    const args = this._buildArgs([wireMessage], commitment);

    const unsafeRes = await this._rpcRequest('getFeeForMessage', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(number())));

    if ('error' in res) {
      throw new Error('failed to get slot: ' + res.error.message);
    }

    if (res.result === null) {
      throw new Error('invalid blockhash');
    }

    return res.result;
  }
  /**
   * Fetch a recent blockhash from the cluster
   * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
   */


  async getRecentBlockhash(commitment) {
    try {
      const res = await this.getRecentBlockhashAndContext(commitment);
      return res.value;
    } catch (e) {
      throw new Error('failed to get recent blockhash: ' + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<{blockhash: Blockhash, lastValidBlockHeight: number}>}
   */


  async getLatestBlockhash(commitment) {
    try {
      const res = await this.getLatestBlockhashAndContext(commitment);
      return res.value;
    } catch (e) {
      throw new Error('failed to get recent blockhash: ' + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<{blockhash: Blockhash, lastValidBlockHeight: number}>}
   */


  async getLatestBlockhashAndContext(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getLatestBlockhash', args);
    const res = create(unsafeRes, GetLatestBlockhashRpcResult);

    if ('error' in res) {
      throw new Error('failed to get latest blockhash: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the node version
   */


  async getVersion() {
    const unsafeRes = await this._rpcRequest('getVersion', []);
    const res = create(unsafeRes, jsonRpcResult(VersionResult));

    if ('error' in res) {
      throw new Error('failed to get version: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the genesis hash
   */


  async getGenesisHash() {
    const unsafeRes = await this._rpcRequest('getGenesisHash', []);
    const res = create(unsafeRes, jsonRpcResult(string()));

    if ('error' in res) {
      throw new Error('failed to get genesis hash: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch a processed block from the cluster.
   */


  async getBlock(slot, opts) {
    const args = this._buildArgsAtLeastConfirmed([slot], opts && opts.commitment);

    const unsafeRes = await this._rpcRequest('getBlock', args);
    const res = create(unsafeRes, GetBlockRpcResult);

    if ('error' in res) {
      throw new Error('failed to get confirmed block: ' + res.error.message);
    }

    const result = res.result;
    if (!result) return result;
    return { ...result,
      transactions: result.transactions.map(({
        transaction,
        meta
      }) => {
        const message = new Message(transaction.message);
        return {
          meta,
          transaction: { ...transaction,
            message
          }
        };
      })
    };
  }
  /*
   * Returns the current block height of the node
   */


  async getBlockHeight(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getBlockHeight', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new Error('failed to get block height information: ' + res.error.message);
    }

    return res.result;
  }
  /*
   * Returns recent block production information from the current or previous epoch
   */


  async getBlockProduction(configOrCommitment) {
    let extra;
    let commitment;

    if (typeof configOrCommitment === 'string') {
      commitment = configOrCommitment;
    } else if (configOrCommitment) {
      const {
        commitment: c,
        ...rest
      } = configOrCommitment;
      commitment = c;
      extra = rest;
    }

    const args = this._buildArgs([], commitment, 'base64', extra);

    const unsafeRes = await this._rpcRequest('getBlockProduction', args);
    const res = create(unsafeRes, BlockProductionResponseStruct);

    if ('error' in res) {
      throw new Error('failed to get block production information: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch a confirmed or finalized transaction from the cluster.
   */


  async getTransaction(signature, opts) {
    const args = this._buildArgsAtLeastConfirmed([signature], opts && opts.commitment);

    const unsafeRes = await this._rpcRequest('getTransaction', args);
    const res = create(unsafeRes, GetTransactionRpcResult);

    if ('error' in res) {
      throw new Error('failed to get transaction: ' + res.error.message);
    }

    const result = res.result;
    if (!result) return result;
    return { ...result,
      transaction: { ...result.transaction,
        message: new Message(result.transaction.message)
      }
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed or finalized transaction
   */


  async getParsedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getTransaction', args);
    const res = create(unsafeRes, GetParsedTransactionRpcResult);

    if ('error' in res) {
      throw new Error('failed to get transaction: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   */


  async getParsedTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

      return {
        methodName: 'getTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetParsedTransactionRpcResult);

      if ('error' in res) {
        throw new Error('failed to get transactions: ' + res.error.message);
      }

      return res.result;
    });
    return res;
  }
  /**
   * Fetch transaction details for a batch of confirmed transactions.
   * Similar to {@link getParsedTransactions} but returns a {@link TransactionResponse}.
   */


  async getTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment);

      return {
        methodName: 'getTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetTransactionRpcResult);

      if ('error' in res) {
        throw new Error('failed to get transactions: ' + res.error.message);
      }

      return res.result;
    });
    return res;
  }
  /**
   * Fetch a list of Transactions and transaction statuses from the cluster
   * for a confirmed block.
   *
   * @deprecated Deprecated since v1.13.0. Please use {@link getBlock} instead.
   */


  async getConfirmedBlock(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment);

    const unsafeRes = await this._rpcRequest('getConfirmedBlock', args);
    const res = create(unsafeRes, GetConfirmedBlockRpcResult);

    if ('error' in res) {
      throw new Error('failed to get confirmed block: ' + res.error.message);
    }

    const result = res.result;

    if (!result) {
      throw new Error('Confirmed block ' + slot + ' not found');
    }

    const block = { ...result,
      transactions: result.transactions.map(({
        transaction,
        meta
      }) => {
        const message = new Message(transaction.message);
        return {
          meta,
          transaction: { ...transaction,
            message
          }
        };
      })
    };
    return { ...block,
      transactions: block.transactions.map(({
        transaction,
        meta
      }) => {
        return {
          meta,
          transaction: Transaction.populate(transaction.message, transaction.signatures)
        };
      })
    };
  }
  /**
   * Fetch confirmed blocks between two slots
   */


  async getBlocks(startSlot, endSlot, commitment) {
    const args = this._buildArgsAtLeastConfirmed(endSlot !== undefined ? [startSlot, endSlot] : [startSlot], commitment);

    const unsafeRes = await this._rpcRequest('getBlocks', args);
    const res = create(unsafeRes, jsonRpcResult(array(number())));

    if ('error' in res) {
      throw new Error('failed to get blocks: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a block, excluding rewards
   */


  async getBlockSignatures(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment, undefined, {
      transactionDetails: 'signatures',
      rewards: false
    });

    const unsafeRes = await this._rpcRequest('getBlock', args);
    const res = create(unsafeRes, GetBlockSignaturesRpcResult);

    if ('error' in res) {
      throw new Error('failed to get block: ' + res.error.message);
    }

    const result = res.result;

    if (!result) {
      throw new Error('Block ' + slot + ' not found');
    }

    return result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getBlockSignatures} instead.
   */


  async getConfirmedBlockSignatures(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment, undefined, {
      transactionDetails: 'signatures',
      rewards: false
    });

    const unsafeRes = await this._rpcRequest('getConfirmedBlock', args);
    const res = create(unsafeRes, GetBlockSignaturesRpcResult);

    if ('error' in res) {
      throw new Error('failed to get confirmed block: ' + res.error.message);
    }

    const result = res.result;

    if (!result) {
      throw new Error('Confirmed block ' + slot + ' not found');
    }

    return result;
  }
  /**
   * Fetch a transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getTransaction} instead.
   */


  async getConfirmedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment);

    const unsafeRes = await this._rpcRequest('getConfirmedTransaction', args);
    const res = create(unsafeRes, GetTransactionRpcResult);

    if ('error' in res) {
      throw new Error('failed to get transaction: ' + res.error.message);
    }

    const result = res.result;
    if (!result) return result;
    const message = new Message(result.transaction.message);
    const signatures = result.transaction.signatures;
    return { ...result,
      transaction: Transaction.populate(message, signatures)
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransaction} instead.
   */


  async getParsedConfirmedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getConfirmedTransaction', args);
    const res = create(unsafeRes, GetParsedTransactionRpcResult);

    if ('error' in res) {
      throw new Error('failed to get confirmed transaction: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransactions} instead.
   */


  async getParsedConfirmedTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

      return {
        methodName: 'getConfirmedTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetParsedTransactionRpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed transactions: ' + res.error.message);
      }

      return res.result;
    });
    return res;
  }
  /**
   * Fetch a list of all the confirmed signatures for transactions involving an address
   * within a specified slot range. Max range allowed is 10,000 slots.
   *
   * @deprecated Deprecated since v1.3. Please use {@link getConfirmedSignaturesForAddress2} instead.
   *
   * @param address queried address
   * @param startSlot start slot, inclusive
   * @param endSlot end slot, inclusive
   */


  async getConfirmedSignaturesForAddress(address, startSlot, endSlot) {
    let options = {};
    let firstAvailableBlock = await this.getFirstAvailableBlock();

    while (!('until' in options)) {
      startSlot--;

      if (startSlot <= 0 || startSlot < firstAvailableBlock) {
        break;
      }

      try {
        const block = await this.getConfirmedBlockSignatures(startSlot, 'finalized');

        if (block.signatures.length > 0) {
          options.until = block.signatures[block.signatures.length - 1].toString();
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('skipped')) {
          continue;
        } else {
          throw err;
        }
      }
    }

    let highestConfirmedRoot = await this.getSlot('finalized');

    while (!('before' in options)) {
      endSlot++;

      if (endSlot > highestConfirmedRoot) {
        break;
      }

      try {
        const block = await this.getConfirmedBlockSignatures(endSlot);

        if (block.signatures.length > 0) {
          options.before = block.signatures[block.signatures.length - 1].toString();
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('skipped')) {
          continue;
        } else {
          throw err;
        }
      }
    }

    const confirmedSignatureInfo = await this.getConfirmedSignaturesForAddress2(address, options);
    return confirmedSignatureInfo.map(info => info.signature);
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   *
   * @param address queried address
   * @param options
   */


  async getConfirmedSignaturesForAddress2(address, options, commitment) {
    const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, undefined, options);

    const unsafeRes = await this._rpcRequest('getConfirmedSignaturesForAddress2', args);
    const res = create(unsafeRes, GetConfirmedSignaturesForAddress2RpcResult);

    if ('error' in res) {
      throw new Error('failed to get confirmed signatures for address: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   *
   * @param address queried address
   * @param options
   */


  async getSignaturesForAddress(address, options, commitment) {
    const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, undefined, options);

    const unsafeRes = await this._rpcRequest('getSignaturesForAddress', args);
    const res = create(unsafeRes, GetSignaturesForAddressRpcResult);

    if ('error' in res) {
      throw new Error('failed to get signatures for address: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * Fetch the contents of a Nonce account from the cluster, return with context
   */


  async getNonceAndContext(nonceAccount, commitment) {
    const {
      context,
      value: accountInfo
    } = await this.getAccountInfoAndContext(nonceAccount, commitment);
    let value = null;

    if (accountInfo !== null) {
      value = NonceAccount.fromAccountData(accountInfo.data);
    }

    return {
      context,
      value
    };
  }
  /**
   * Fetch the contents of a Nonce account from the cluster
   */


  async getNonce(nonceAccount, commitment) {
    return await this.getNonceAndContext(nonceAccount, commitment).then(x => x.value).catch(e => {
      throw new Error('failed to get nonce for account ' + nonceAccount.toBase58() + ': ' + e);
    });
  }
  /**
   * Request an allocation of lamports to the specified address
   *
   * ```typescript
   * import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
   *
   * (async () => {
   *   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
   *   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
   *   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
   *   await connection.confirmTransaction(signature);
   * })();
   * ```
   */


  async requestAirdrop(to, lamports) {
    const unsafeRes = await this._rpcRequest('requestAirdrop', [to.toBase58(), lamports]);
    const res = create(unsafeRes, RequestAirdropRpcResult);

    if ('error' in res) {
      throw new Error('airdrop to ' + to.toBase58() + ' failed: ' + res.error.message);
    }

    return res.result;
  }
  /**
   * @internal
   */


  async _recentBlockhash(disableCache) {
    if (!disableCache) {
      // Wait for polling to finish
      while (this._pollingBlockhash) {
        await sleep(100);
      }

      const timeSinceFetch = Date.now() - this._blockhashInfo.lastFetch;

      const expired = timeSinceFetch >= BLOCKHASH_CACHE_TIMEOUT_MS;

      if (this._blockhashInfo.recentBlockhash !== null && !expired) {
        return this._blockhashInfo.recentBlockhash;
      }
    }

    return await this._pollNewBlockhash();
  }
  /**
   * @internal
   */


  async _pollNewBlockhash() {
    this._pollingBlockhash = true;

    try {
      const startTime = Date.now();

      for (let i = 0; i < 50; i++) {
        const {
          blockhash
        } = await this.getRecentBlockhash('finalized');

        if (this._blockhashInfo.recentBlockhash != blockhash) {
          this._blockhashInfo = {
            recentBlockhash: blockhash,
            lastFetch: Date.now(),
            transactionSignatures: [],
            simulatedSignatures: []
          };
          return blockhash;
        } // Sleep for approximately half a slot


        await sleep(MS_PER_SLOT / 2);
      }

      throw new Error(`Unable to obtain a new blockhash after ${Date.now() - startTime}ms`);
    } finally {
      this._pollingBlockhash = false;
    }
  }
  /**
   * Simulate a transaction
   */


  async simulateTransaction(transactionOrMessage, signers, includeAccounts) {
    let transaction;

    if (transactionOrMessage instanceof Transaction) {
      let originalTx = transactionOrMessage;
      transaction = new Transaction({
        recentBlockhash: originalTx.recentBlockhash,
        nonceInfo: originalTx.nonceInfo,
        feePayer: originalTx.feePayer,
        signatures: [...originalTx.signatures]
      });
      transaction.instructions = transactionOrMessage.instructions;
    } else {
      transaction = Transaction.populate(transactionOrMessage); // HACK: this function relies on mutating the populated transaction

      transaction._message = transaction._json = undefined;
    }

    if (transaction.nonceInfo && signers) {
      transaction.sign(...signers);
    } else {
      let disableCache = this._disableBlockhashCaching;

      for (;;) {
        transaction.recentBlockhash = await this._recentBlockhash(disableCache);
        if (!signers) break;
        transaction.sign(...signers);

        if (!transaction.signature) {
          throw new Error('!signature'); // should never happen
        }

        const signature = transaction.signature.toString('base64');

        if (!this._blockhashInfo.simulatedSignatures.includes(signature) && !this._blockhashInfo.transactionSignatures.includes(signature)) {
          // The signature of this transaction has not been seen before with the
          // current recentBlockhash, all done. Let's break
          this._blockhashInfo.simulatedSignatures.push(signature);

          break;
        } else {
          // This transaction would be treated as duplicate (its derived signature
          // matched to one of already recorded signatures).
          // So, we must fetch a new blockhash for a different signature by disabling
          // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
          disableCache = true;
        }
      }
    }

    const message = transaction._compile();

    const signData = message.serialize();

    const wireTransaction = transaction._serialize(signData);

    const encodedTransaction = wireTransaction.toString('base64');
    const config = {
      encoding: 'base64',
      commitment: this.commitment
    };

    if (includeAccounts) {
      const addresses = (Array.isArray(includeAccounts) ? includeAccounts : message.nonProgramIds()).map(key => key.toBase58());
      config['accounts'] = {
        encoding: 'base64',
        addresses
      };
    }

    if (signers) {
      config.sigVerify = true;
    }

    const args = [encodedTransaction, config];
    const unsafeRes = await this._rpcRequest('simulateTransaction', args);
    const res = create(unsafeRes, SimulatedTransactionResponseStruct);

    if ('error' in res) {
      let logs;

      if ('data' in res.error) {
        logs = res.error.data.logs;

        if (logs && Array.isArray(logs)) {
          const traceIndent = '\n    ';
          const logTrace = traceIndent + logs.join(traceIndent);
          console.error(res.error.message, logTrace);
        }
      }

      throw new SendTransactionError('failed to simulate transaction: ' + res.error.message, logs);
    }

    return res.result;
  }
  /**
   * Sign and send a transaction
   */


  async sendTransaction(transaction, signers, options) {
    if (transaction.nonceInfo) {
      transaction.sign(...signers);
    } else {
      let disableCache = this._disableBlockhashCaching;

      for (;;) {
        transaction.recentBlockhash = await this._recentBlockhash(disableCache);
        transaction.sign(...signers);

        if (!transaction.signature) {
          throw new Error('!signature'); // should never happen
        }

        const signature = transaction.signature.toString('base64');

        if (!this._blockhashInfo.transactionSignatures.includes(signature)) {
          // The signature of this transaction has not been seen before with the
          // current recentBlockhash, all done. Let's break
          this._blockhashInfo.transactionSignatures.push(signature);

          break;
        } else {
          // This transaction would be treated as duplicate (its derived signature
          // matched to one of already recorded signatures).
          // So, we must fetch a new blockhash for a different signature by disabling
          // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
          disableCache = true;
        }
      }
    }

    const wireTransaction = transaction.serialize();
    return await this.sendRawTransaction(wireTransaction, options);
  }
  /**
   * Send a transaction that has already been signed and serialized into the
   * wire format
   */


  async sendRawTransaction(rawTransaction, options) {
    const encodedTransaction = toBuffer(rawTransaction).toString('base64');
    const result = await this.sendEncodedTransaction(encodedTransaction, options);
    return result;
  }
  /**
   * Send a transaction that has already been signed, serialized into the
   * wire format, and encoded as a base64 string
   */


  async sendEncodedTransaction(encodedTransaction, options) {
    const config = {
      encoding: 'base64'
    };
    const skipPreflight = options && options.skipPreflight;
    const preflightCommitment = options && options.preflightCommitment || this.commitment;

    if (options && options.maxRetries) {
      config.maxRetries = options.maxRetries;
    }

    if (skipPreflight) {
      config.skipPreflight = skipPreflight;
    }

    if (preflightCommitment) {
      config.preflightCommitment = preflightCommitment;
    }

    const args = [encodedTransaction, config];
    const unsafeRes = await this._rpcRequest('sendTransaction', args);
    const res = create(unsafeRes, SendTransactionRpcResult);

    if ('error' in res) {
      let logs;

      if ('data' in res.error) {
        logs = res.error.data.logs;
      }

      throw new SendTransactionError('failed to send transaction: ' + res.error.message, logs);
    }

    return res.result;
  }
  /**
   * @internal
   */


  _wsOnOpen() {
    this._rpcWebSocketConnected = true;
    this._rpcWebSocketHeartbeat = setInterval(() => {
      // Ping server every 5s to prevent idle timeouts
      this._rpcWebSocket.notify('ping').catch(() => {});
    }, 5000);

    this._updateSubscriptions();
  }
  /**
   * @internal
   */


  _wsOnError(err) {
    console.error('ws error:', err.message);
  }
  /**
   * @internal
   */


  _wsOnClose(code) {
    if (this._rpcWebSocketHeartbeat) {
      clearInterval(this._rpcWebSocketHeartbeat);
      this._rpcWebSocketHeartbeat = null;
    }

    if (code === 1000) {
      // explicit close, check if any subscriptions have been made since close
      this._updateSubscriptions();

      return;
    } // implicit close, prepare subscriptions for auto-reconnect


    this._resetSubscriptions();
  }
  /**
   * @internal
   */


  async _subscribe(sub, rpcMethod, rpcArgs) {
    if (sub.subscriptionId == null) {
      sub.subscriptionId = 'subscribing';

      try {
        const id = await this._rpcWebSocket.call(rpcMethod, rpcArgs);

        if (typeof id === 'number' && sub.subscriptionId === 'subscribing') {
          // eslint-disable-next-line require-atomic-updates
          sub.subscriptionId = id;
        }
      } catch (err) {
        if (sub.subscriptionId === 'subscribing') {
          // eslint-disable-next-line require-atomic-updates
          sub.subscriptionId = null;
        }

        if (err instanceof Error) {
          console.error(`${rpcMethod} error for argument`, rpcArgs, err.message);
        }
      }
    }
  }
  /**
   * @internal
   */


  async _unsubscribe(sub, rpcMethod) {
    const subscriptionId = sub.subscriptionId;

    if (subscriptionId != null && typeof subscriptionId != 'string') {
      const unsubscribeId = subscriptionId;

      try {
        await this._rpcWebSocket.call(rpcMethod, [unsubscribeId]);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`${rpcMethod} error:`, err.message);
        }
      }
    }
  }
  /**
   * @internal
   */


  _resetSubscriptions() {
    Object.values(this._accountChangeSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._logsSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._programAccountChangeSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._rootSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._signatureSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._slotSubscriptions).forEach(s => s.subscriptionId = null);
    Object.values(this._slotUpdateSubscriptions).forEach(s => s.subscriptionId = null);
  }
  /**
   * @internal
   */


  _updateSubscriptions() {
    const accountKeys = Object.keys(this._accountChangeSubscriptions).map(Number);
    const programKeys = Object.keys(this._programAccountChangeSubscriptions).map(Number);
    const slotKeys = Object.keys(this._slotSubscriptions).map(Number);
    const slotUpdateKeys = Object.keys(this._slotUpdateSubscriptions).map(Number);
    const signatureKeys = Object.keys(this._signatureSubscriptions).map(Number);
    const rootKeys = Object.keys(this._rootSubscriptions).map(Number);
    const logsKeys = Object.keys(this._logsSubscriptions).map(Number);

    if (accountKeys.length === 0 && programKeys.length === 0 && slotKeys.length === 0 && slotUpdateKeys.length === 0 && signatureKeys.length === 0 && rootKeys.length === 0 && logsKeys.length === 0) {
      if (this._rpcWebSocketConnected) {
        this._rpcWebSocketConnected = false;
        this._rpcWebSocketIdleTimeout = setTimeout(() => {
          this._rpcWebSocketIdleTimeout = null;

          try {
            this._rpcWebSocket.close();
          } catch (err) {
            // swallow error if socket has already been closed.
            if (err instanceof Error) {
              console.log(`Error when closing socket connection: ${err.message}`);
            }
          }
        }, 500);
      }

      return;
    }

    if (this._rpcWebSocketIdleTimeout !== null) {
      clearTimeout(this._rpcWebSocketIdleTimeout);
      this._rpcWebSocketIdleTimeout = null;
      this._rpcWebSocketConnected = true;
    }

    if (!this._rpcWebSocketConnected) {
      this._rpcWebSocket.connect();

      return;
    }

    for (let id of accountKeys) {
      const sub = this._accountChangeSubscriptions[id];

      this._subscribe(sub, 'accountSubscribe', this._buildArgs([sub.publicKey], sub.commitment, 'base64'));
    }

    for (let id of programKeys) {
      const sub = this._programAccountChangeSubscriptions[id];

      this._subscribe(sub, 'programSubscribe', this._buildArgs([sub.programId], sub.commitment, 'base64', {
        filters: sub.filters
      }));
    }

    for (let id of slotKeys) {
      const sub = this._slotSubscriptions[id];

      this._subscribe(sub, 'slotSubscribe', []);
    }

    for (let id of slotUpdateKeys) {
      const sub = this._slotUpdateSubscriptions[id];

      this._subscribe(sub, 'slotsUpdatesSubscribe', []);
    }

    for (let id of signatureKeys) {
      const sub = this._signatureSubscriptions[id];
      const args = [sub.signature];
      if (sub.options) args.push(sub.options);

      this._subscribe(sub, 'signatureSubscribe', args);
    }

    for (let id of rootKeys) {
      const sub = this._rootSubscriptions[id];

      this._subscribe(sub, 'rootSubscribe', []);
    }

    for (let id of logsKeys) {
      const sub = this._logsSubscriptions[id];
      let filter;

      if (typeof sub.filter === 'object') {
        filter = {
          mentions: [sub.filter.toString()]
        };
      } else {
        filter = sub.filter;
      }

      this._subscribe(sub, 'logsSubscribe', this._buildArgs([filter], sub.commitment));
    }
  }
  /**
   * @internal
   */


  _wsOnAccountNotification(notification) {
    const res = create(notification, AccountNotificationResult);

    for (const sub of Object.values(this._accountChangeSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        sub.callback(res.result.value, res.result.context);
        return;
      }
    }
  }
  /**
   * Register a callback to be invoked whenever the specified account changes
   *
   * @param publicKey Public key of the account to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param commitment Specify the commitment level account changes must reach before notification
   * @return subscription id
   */


  onAccountChange(publicKey, callback, commitment) {
    const id = ++this._accountChangeSubscriptionCounter;
    this._accountChangeSubscriptions[id] = {
      publicKey: publicKey.toBase58(),
      callback,
      commitment,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister an account notification callback
   *
   * @param id subscription id to deregister
   */


  async removeAccountChangeListener(id) {
    if (this._accountChangeSubscriptions[id]) {
      const subInfo = this._accountChangeSubscriptions[id];
      delete this._accountChangeSubscriptions[id];
      await this._unsubscribe(subInfo, 'accountUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'account change'));
    }
  }
  /**
   * @internal
   */


  _wsOnProgramAccountNotification(notification) {
    const res = create(notification, ProgramAccountNotificationResult);

    for (const sub of Object.values(this._programAccountChangeSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        const {
          value,
          context
        } = res.result;
        sub.callback({
          accountId: value.pubkey,
          accountInfo: value.account
        }, context);
        return;
      }
    }
  }
  /**
   * Register a callback to be invoked whenever accounts owned by the
   * specified program change
   *
   * @param programId Public key of the program to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param commitment Specify the commitment level account changes must reach before notification
   * @param filters The program account filters to pass into the RPC method
   * @return subscription id
   */


  onProgramAccountChange(programId, callback, commitment, filters) {
    const id = ++this._programAccountChangeSubscriptionCounter;
    this._programAccountChangeSubscriptions[id] = {
      programId: programId.toBase58(),
      callback,
      commitment,
      subscriptionId: null,
      filters
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister an account notification callback
   *
   * @param id subscription id to deregister
   */


  async removeProgramAccountChangeListener(id) {
    if (this._programAccountChangeSubscriptions[id]) {
      const subInfo = this._programAccountChangeSubscriptions[id];
      delete this._programAccountChangeSubscriptions[id];
      await this._unsubscribe(subInfo, 'programUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'program account change'));
    }
  }
  /**
   * Registers a callback to be invoked whenever logs are emitted.
   */


  onLogs(filter, callback, commitment) {
    const id = ++this._logsSubscriptionCounter;
    this._logsSubscriptions[id] = {
      filter,
      callback,
      commitment,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister a logs callback.
   *
   * @param id subscription id to deregister.
   */


  async removeOnLogsListener(id) {
    if (this._logsSubscriptions[id]) {
      const subInfo = this._logsSubscriptions[id];
      delete this._logsSubscriptions[id];
      await this._unsubscribe(subInfo, 'logsUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'logs'));
    }
  }
  /**
   * @internal
   */


  _wsOnLogsNotification(notification) {
    const res = create(notification, LogsNotificationResult);
    const keys = Object.keys(this._logsSubscriptions).map(Number);

    for (let id of keys) {
      const sub = this._logsSubscriptions[id];

      if (sub.subscriptionId === res.subscription) {
        sub.callback(res.result.value, res.result.context);
        return;
      }
    }
  }
  /**
   * @internal
   */


  _wsOnSlotNotification(notification) {
    const res = create(notification, SlotNotificationResult);

    for (const sub of Object.values(this._slotSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        sub.callback(res.result);
        return;
      }
    }
  }
  /**
   * Register a callback to be invoked upon slot changes
   *
   * @param callback Function to invoke whenever the slot changes
   * @return subscription id
   */


  onSlotChange(callback) {
    const id = ++this._slotSubscriptionCounter;
    this._slotSubscriptions[id] = {
      callback,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister a slot notification callback
   *
   * @param id subscription id to deregister
   */


  async removeSlotChangeListener(id) {
    if (this._slotSubscriptions[id]) {
      const subInfo = this._slotSubscriptions[id];
      delete this._slotSubscriptions[id];
      await this._unsubscribe(subInfo, 'slotUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'slot change'));
    }
  }
  /**
   * @internal
   */


  _wsOnSlotUpdatesNotification(notification) {
    const res = create(notification, SlotUpdateNotificationResult);

    for (const sub of Object.values(this._slotUpdateSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        sub.callback(res.result);
        return;
      }
    }
  }
  /**
   * Register a callback to be invoked upon slot updates. {@link SlotUpdate}'s
   * may be useful to track live progress of a cluster.
   *
   * @param callback Function to invoke whenever the slot updates
   * @return subscription id
   */


  onSlotUpdate(callback) {
    const id = ++this._slotUpdateSubscriptionCounter;
    this._slotUpdateSubscriptions[id] = {
      callback,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister a slot update notification callback
   *
   * @param id subscription id to deregister
   */


  async removeSlotUpdateListener(id) {
    if (this._slotUpdateSubscriptions[id]) {
      const subInfo = this._slotUpdateSubscriptions[id];
      delete this._slotUpdateSubscriptions[id];
      await this._unsubscribe(subInfo, 'slotsUpdatesUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'slot update'));
    }
  }

  _buildArgs(args, override, encoding, extra) {
    const commitment = override || this._commitment;

    if (commitment || encoding || extra) {
      let options = {};

      if (encoding) {
        options.encoding = encoding;
      }

      if (commitment) {
        options.commitment = commitment;
      }

      if (extra) {
        options = Object.assign(options, extra);
      }

      args.push(options);
    }

    return args;
  }
  /**
   * @internal
   */


  _buildArgsAtLeastConfirmed(args, override, encoding, extra) {
    const commitment = override || this._commitment;

    if (commitment && !['confirmed', 'finalized'].includes(commitment)) {
      throw new Error('Using Connection with default commitment: `' + this._commitment + '`, but method requires at least `confirmed`');
    }

    return this._buildArgs(args, override, encoding, extra);
  }
  /**
   * @internal
   */


  _wsOnSignatureNotification(notification) {
    const res = create(notification, SignatureNotificationResult);

    for (const [id, sub] of Object.entries(this._signatureSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        if (res.result.value === 'receivedSignature') {
          sub.callback({
            type: 'received'
          }, res.result.context);
        } else {
          // Signatures subscriptions are auto-removed by the RPC service so
          // no need to explicitly send an unsubscribe message
          delete this._signatureSubscriptions[Number(id)];

          this._updateSubscriptions();

          sub.callback({
            type: 'status',
            result: res.result.value
          }, res.result.context);
        }

        return;
      }
    }
  }
  /**
   * Register a callback to be invoked upon signature updates
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param commitment Specify the commitment level signature must reach before notification
   * @return subscription id
   */


  onSignature(signature, callback, commitment) {
    const id = ++this._signatureSubscriptionCounter;
    this._signatureSubscriptions[id] = {
      signature,
      callback: (notification, context) => {
        if (notification.type === 'status') {
          callback(notification.result, context);
        }
      },
      options: {
        commitment
      },
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Register a callback to be invoked when a transaction is
   * received and/or processed.
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param options Enable received notifications and set the commitment
   *   level that signature must reach before notification
   * @return subscription id
   */


  onSignatureWithOptions(signature, callback, options) {
    const id = ++this._signatureSubscriptionCounter;
    this._signatureSubscriptions[id] = {
      signature,
      callback,
      options,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister a signature notification callback
   *
   * @param id subscription id to deregister
   */


  async removeSignatureListener(id) {
    if (this._signatureSubscriptions[id]) {
      const subInfo = this._signatureSubscriptions[id];
      delete this._signatureSubscriptions[id];
      await this._unsubscribe(subInfo, 'signatureUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'signature result'));
    }
  }
  /**
   * @internal
   */


  _wsOnRootNotification(notification) {
    const res = create(notification, RootNotificationResult);

    for (const sub of Object.values(this._rootSubscriptions)) {
      if (sub.subscriptionId === res.subscription) {
        sub.callback(res.result);
        return;
      }
    }
  }
  /**
   * Register a callback to be invoked upon root changes
   *
   * @param callback Function to invoke whenever the root changes
   * @return subscription id
   */


  onRootChange(callback) {
    const id = ++this._rootSubscriptionCounter;
    this._rootSubscriptions[id] = {
      callback,
      subscriptionId: null
    };

    this._updateSubscriptions();

    return id;
  }
  /**
   * Deregister a root notification callback
   *
   * @param id subscription id to deregister
   */


  async removeRootChangeListener(id) {
    if (this._rootSubscriptions[id]) {
      const subInfo = this._rootSubscriptions[id];
      delete this._rootSubscriptions[id];
      await this._unsubscribe(subInfo, 'rootUnsubscribe');

      this._updateSubscriptions();
    } else {
      console.warn(createSubscriptionWarningMessage(id, 'root change'));
    }
  }

}

/**
 * Keypair signer interface
 */

/**
 * An account keypair used for signing transactions.
 */
class Keypair {
  /**
   * Create a new keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair ed25519 keypair
   */
  constructor(keypair) {
    this._keypair = void 0;

    if (keypair) {
      this._keypair = keypair;
    } else {
      this._keypair = nacl.sign.keyPair();
    }
  }
  /**
   * Generate a new random keypair
   */


  static generate() {
    return new Keypair(nacl.sign.keyPair());
  }
  /**
   * Create a keypair from a raw secret key byte array.
   *
   * This method should only be used to recreate a keypair from a previously
   * generated secret key. Generating keypairs from a random seed should be done
   * with the {@link Keypair.fromSeed} method.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */


  static fromSecretKey(secretKey, options) {
    const keypair = nacl.sign.keyPair.fromSecretKey(secretKey);

    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode('@solana/web3.js-validation-v1');
      const signature = nacl.sign.detached(signData, keypair.secretKey);

      if (!nacl.sign.detached.verify(signData, signature, keypair.publicKey)) {
        throw new Error('provided secretKey is invalid');
      }
    }

    return new Keypair(keypair);
  }
  /**
   * Generate a keypair from a 32 byte seed.
   *
   * @param seed seed byte array
   */


  static fromSeed(seed) {
    return new Keypair(nacl.sign.keyPair.fromSeed(seed));
  }
  /**
   * The public key for this keypair
   */


  get publicKey() {
    return new PublicKey(this._keypair.publicKey);
  }
  /**
   * The raw secret key for this keypair
   */


  get secretKey() {
    return this._keypair.secretKey;
  }

}

const PRIVATE_KEY_BYTES$1 = 64;
const PUBLIC_KEY_BYTES$1 = 32;
const SIGNATURE_BYTES = 64;
/**
 * Params for creating an ed25519 instruction using a public key
 */

const ED25519_INSTRUCTION_LAYOUT = struct([u8('numSignatures'), u8('padding'), u16('signatureOffset'), u16('signatureInstructionIndex'), u16('publicKeyOffset'), u16('publicKeyInstructionIndex'), u16('messageDataOffset'), u16('messageDataSize'), u16('messageInstructionIndex')]);
class Ed25519Program {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the ed25519 program
   */


  /**
   * Create an ed25519 instruction with a public key and signature. The
   * public key must be a buffer that is 32 bytes long, and the signature
   * must be a buffer of 64 bytes.
   */
  static createInstructionWithPublicKey(params) {
    const {
      publicKey,
      message,
      signature,
      instructionIndex
    } = params;
    assert$c(publicKey.length === PUBLIC_KEY_BYTES$1, `Public Key must be ${PUBLIC_KEY_BYTES$1} bytes but received ${publicKey.length} bytes`);
    assert$c(signature.length === SIGNATURE_BYTES, `Signature must be ${SIGNATURE_BYTES} bytes but received ${signature.length} bytes`);
    const publicKeyOffset = ED25519_INSTRUCTION_LAYOUT.span;
    const signatureOffset = publicKeyOffset + publicKey.length;
    const messageDataOffset = signatureOffset + signature.length;
    const numSignatures = 1;
    const instructionData = Buffer$1.alloc(messageDataOffset + message.length);
    const index = instructionIndex == null ? 0xffff // An index of `u16::MAX` makes it default to the current instruction.
    : instructionIndex;
    ED25519_INSTRUCTION_LAYOUT.encode({
      numSignatures,
      padding: 0,
      signatureOffset,
      signatureInstructionIndex: index,
      publicKeyOffset,
      publicKeyInstructionIndex: index,
      messageDataOffset,
      messageDataSize: message.length,
      messageInstructionIndex: index
    }, instructionData);
    instructionData.fill(publicKey, publicKeyOffset);
    instructionData.fill(signature, signatureOffset);
    instructionData.fill(message, messageDataOffset);
    return new TransactionInstruction({
      keys: [],
      programId: Ed25519Program.programId,
      data: instructionData
    });
  }
  /**
   * Create an ed25519 instruction with a private key. The private key
   * must be a buffer that is 64 bytes long.
   */


  static createInstructionWithPrivateKey(params) {
    const {
      privateKey,
      message,
      instructionIndex
    } = params;
    assert$c(privateKey.length === PRIVATE_KEY_BYTES$1, `Private key must be ${PRIVATE_KEY_BYTES$1} bytes but received ${privateKey.length} bytes`);

    try {
      const keypair = Keypair.fromSecretKey(privateKey);
      const publicKey = keypair.publicKey.toBytes();
      const signature = nacl.sign.detached(message, keypair.secretKey);
      return this.createInstructionWithPublicKey({
        publicKey,
        message,
        signature,
        instructionIndex
      });
    } catch (error) {
      throw new Error(`Error creating instruction; ${error}`);
    }
  }

}
Ed25519Program.programId = new PublicKey('Ed25519SigVerify111111111111111111111111111');

/**
 * Address of the stake config account which configures the rate
 * of stake warmup and cooldown as well as the slashing penalty.
 */

const STAKE_CONFIG_ID = new PublicKey('StakeConfig11111111111111111111111111111111');
/**
 * Stake account authority info
 */

class Authorized {
  /** stake authority */

  /** withdraw authority */

  /**
   * Create a new Authorized object
   * @param staker the stake authority
   * @param withdrawer the withdraw authority
   */
  constructor(staker, withdrawer) {
    this.staker = void 0;
    this.withdrawer = void 0;
    this.staker = staker;
    this.withdrawer = withdrawer;
  }

}

/**
 * Stake account lockup info
 */
class Lockup {
  /** Unix timestamp of lockup expiration */

  /** Epoch of lockup expiration */

  /** Lockup custodian authority */

  /**
   * Create a new Lockup object
   */
  constructor(unixTimestamp, epoch, custodian) {
    this.unixTimestamp = void 0;
    this.epoch = void 0;
    this.custodian = void 0;
    this.unixTimestamp = unixTimestamp;
    this.epoch = epoch;
    this.custodian = custodian;
  }
  /**
   * Default, inactive Lockup value
   */


}
Lockup.default = new Lockup(0, 0, PublicKey.default);

/**
 * Stake Instruction class
 */
class StakeInstruction {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Decode a stake instruction and retrieve the instruction type.
   */


  static decodeInstructionType(instruction) {
    this.checkProgramId(instruction.programId);
    const instructionTypeLayout = u32('instruction');
    const typeIndex = instructionTypeLayout.decode(instruction.data);
    let type;

    for (const [ixType, layout] of Object.entries(STAKE_INSTRUCTION_LAYOUTS)) {
      if (layout.index == typeIndex) {
        type = ixType;
        break;
      }
    }

    if (!type) {
      throw new Error('Instruction type incorrect; not a StakeInstruction');
    }

    return type;
  }
  /**
   * Decode a initialize stake instruction and retrieve the instruction params.
   */


  static decodeInitialize(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      authorized,
      lockup
    } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Initialize, instruction.data);
    return {
      stakePubkey: instruction.keys[0].pubkey,
      authorized: new Authorized(new PublicKey(authorized.staker), new PublicKey(authorized.withdrawer)),
      lockup: new Lockup(lockup.unixTimestamp, lockup.epoch, new PublicKey(lockup.custodian))
    };
  }
  /**
   * Decode a delegate stake instruction and retrieve the instruction params.
   */


  static decodeDelegate(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 6);
    decodeData(STAKE_INSTRUCTION_LAYOUTS.Delegate, instruction.data);
    return {
      stakePubkey: instruction.keys[0].pubkey,
      votePubkey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[5].pubkey
    };
  }
  /**
   * Decode an authorize stake instruction and retrieve the instruction params.
   */


  static decodeAuthorize(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      newAuthorized,
      stakeAuthorizationType
    } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Authorize, instruction.data);
    const o = {
      stakePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey,
      newAuthorizedPubkey: new PublicKey(newAuthorized),
      stakeAuthorizationType: {
        index: stakeAuthorizationType
      }
    };

    if (instruction.keys.length > 3) {
      o.custodianPubkey = instruction.keys[3].pubkey;
    }

    return o;
  }
  /**
   * Decode an authorize-with-seed stake instruction and retrieve the instruction params.
   */


  static decodeAuthorizeWithSeed(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 2);
    const {
      newAuthorized,
      stakeAuthorizationType,
      authoritySeed,
      authorityOwner
    } = decodeData(STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed, instruction.data);
    const o = {
      stakePubkey: instruction.keys[0].pubkey,
      authorityBase: instruction.keys[1].pubkey,
      authoritySeed: authoritySeed,
      authorityOwner: new PublicKey(authorityOwner),
      newAuthorizedPubkey: new PublicKey(newAuthorized),
      stakeAuthorizationType: {
        index: stakeAuthorizationType
      }
    };

    if (instruction.keys.length > 3) {
      o.custodianPubkey = instruction.keys[3].pubkey;
    }

    return o;
  }
  /**
   * Decode a split stake instruction and retrieve the instruction params.
   */


  static decodeSplit(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      lamports
    } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Split, instruction.data);
    return {
      stakePubkey: instruction.keys[0].pubkey,
      splitStakePubkey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey,
      lamports
    };
  }
  /**
   * Decode a merge stake instruction and retrieve the instruction params.
   */


  static decodeMerge(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    decodeData(STAKE_INSTRUCTION_LAYOUTS.Merge, instruction.data);
    return {
      stakePubkey: instruction.keys[0].pubkey,
      sourceStakePubKey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[4].pubkey
    };
  }
  /**
   * Decode a withdraw stake instruction and retrieve the instruction params.
   */


  static decodeWithdraw(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 5);
    const {
      lamports
    } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data);
    const o = {
      stakePubkey: instruction.keys[0].pubkey,
      toPubkey: instruction.keys[1].pubkey,
      authorizedPubkey: instruction.keys[4].pubkey,
      lamports
    };

    if (instruction.keys.length > 5) {
      o.custodianPubkey = instruction.keys[5].pubkey;
    }

    return o;
  }
  /**
   * Decode a deactivate stake instruction and retrieve the instruction params.
   */


  static decodeDeactivate(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    decodeData(STAKE_INSTRUCTION_LAYOUTS.Deactivate, instruction.data);
    return {
      stakePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey
    };
  }
  /**
   * @internal
   */


  static checkProgramId(programId) {
    if (!programId.equals(StakeProgram.programId)) {
      throw new Error('invalid instruction; programId is not StakeProgram');
    }
  }
  /**
   * @internal
   */


  static checkKeyLength(keys, expectedLength) {
    if (keys.length < expectedLength) {
      throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
    }
  }

}
/**
 * An enumeration of valid StakeInstructionType's
 */

/**
 * An enumeration of valid stake InstructionType's
 * @internal
 */
const STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
  Initialize: {
    index: 0,
    layout: struct([u32('instruction'), authorized(), lockup()])
  },
  Authorize: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType')])
  },
  Delegate: {
    index: 2,
    layout: struct([u32('instruction')])
  },
  Split: {
    index: 3,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  Withdraw: {
    index: 4,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  Deactivate: {
    index: 5,
    layout: struct([u32('instruction')])
  },
  Merge: {
    index: 7,
    layout: struct([u32('instruction')])
  },
  AuthorizeWithSeed: {
    index: 8,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType'), rustString('authoritySeed'), publicKey('authorityOwner')])
  }
});
/**
 * Stake authorization type
 */

/**
 * An enumeration of valid StakeAuthorizationLayout's
 */
const StakeAuthorizationLayout = Object.freeze({
  Staker: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
/**
 * Factory class for transactions to interact with the Stake program
 */

class StakeProgram {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the Stake program
   */


  /**
   * Generate an Initialize instruction to add to a Stake Create transaction
   */
  static initialize(params) {
    const {
      stakePubkey,
      authorized,
      lockup: maybeLockup
    } = params;
    const lockup = maybeLockup || Lockup.default;
    const type = STAKE_INSTRUCTION_LAYOUTS.Initialize;
    const data = encodeData(type, {
      authorized: {
        staker: toBuffer(authorized.staker.toBuffer()),
        withdrawer: toBuffer(authorized.withdrawer.toBuffer())
      },
      lockup: {
        unixTimestamp: lockup.unixTimestamp,
        epoch: lockup.epoch,
        custodian: toBuffer(lockup.custodian.toBuffer())
      }
    });
    const instructionData = {
      keys: [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }],
      programId: this.programId,
      data
    };
    return new TransactionInstruction(instructionData);
  }
  /**
   * Generate a Transaction that creates a new Stake account at
   *   an address generated with `from`, a seed, and the Stake programId
   */


  static createAccountWithSeed(params) {
    const transaction = new Transaction();
    transaction.add(SystemProgram.createAccountWithSeed({
      fromPubkey: params.fromPubkey,
      newAccountPubkey: params.stakePubkey,
      basePubkey: params.basePubkey,
      seed: params.seed,
      lamports: params.lamports,
      space: this.space,
      programId: this.programId
    }));
    const {
      stakePubkey,
      authorized,
      lockup
    } = params;
    return transaction.add(this.initialize({
      stakePubkey,
      authorized,
      lockup
    }));
  }
  /**
   * Generate a Transaction that creates a new Stake account
   */


  static createAccount(params) {
    const transaction = new Transaction();
    transaction.add(SystemProgram.createAccount({
      fromPubkey: params.fromPubkey,
      newAccountPubkey: params.stakePubkey,
      lamports: params.lamports,
      space: this.space,
      programId: this.programId
    }));
    const {
      stakePubkey,
      authorized,
      lockup
    } = params;
    return transaction.add(this.initialize({
      stakePubkey,
      authorized,
      lockup
    }));
  }
  /**
   * Generate a Transaction that delegates Stake tokens to a validator
   * Vote PublicKey. This transaction can also be used to redelegate Stake
   * to a new validator Vote PublicKey.
   */


  static delegate(params) {
    const {
      stakePubkey,
      authorizedPubkey,
      votePubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Delegate;
    const data = encodeData(type);
    return new Transaction().add({
      keys: [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: votePubkey,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: STAKE_CONFIG_ID,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a Transaction that authorizes a new PublicKey as Staker
   * or Withdrawer on the Stake account.
   */


  static authorize(params) {
    const {
      stakePubkey,
      authorizedPubkey,
      newAuthorizedPubkey,
      stakeAuthorizationType,
      custodianPubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Authorize;
    const data = encodeData(type, {
      newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
      stakeAuthorizationType: stakeAuthorizationType.index
    });
    const keys = [{
      pubkey: stakePubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: SYSVAR_CLOCK_PUBKEY,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: authorizedPubkey,
      isSigner: true,
      isWritable: false
    }];

    if (custodianPubkey) {
      keys.push({
        pubkey: custodianPubkey,
        isSigner: false,
        isWritable: false
      });
    }

    return new Transaction().add({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a Transaction that authorizes a new PublicKey as Staker
   * or Withdrawer on the Stake account.
   */


  static authorizeWithSeed(params) {
    const {
      stakePubkey,
      authorityBase,
      authoritySeed,
      authorityOwner,
      newAuthorizedPubkey,
      stakeAuthorizationType,
      custodianPubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
    const data = encodeData(type, {
      newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
      stakeAuthorizationType: stakeAuthorizationType.index,
      authoritySeed: authoritySeed,
      authorityOwner: toBuffer(authorityOwner.toBuffer())
    });
    const keys = [{
      pubkey: stakePubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: authorityBase,
      isSigner: true,
      isWritable: false
    }, {
      pubkey: SYSVAR_CLOCK_PUBKEY,
      isSigner: false,
      isWritable: false
    }];

    if (custodianPubkey) {
      keys.push({
        pubkey: custodianPubkey,
        isSigner: false,
        isWritable: false
      });
    }

    return new Transaction().add({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * @internal
   */


  static splitInstruction(params) {
    const {
      stakePubkey,
      authorizedPubkey,
      splitStakePubkey,
      lamports
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Split;
    const data = encodeData(type, {
      lamports
    });
    return new TransactionInstruction({
      keys: [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: splitStakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a Transaction that splits Stake tokens into another stake account
   */


  static split(params) {
    const transaction = new Transaction();
    transaction.add(SystemProgram.createAccount({
      fromPubkey: params.authorizedPubkey,
      newAccountPubkey: params.splitStakePubkey,
      lamports: 0,
      space: this.space,
      programId: this.programId
    }));
    return transaction.add(this.splitInstruction(params));
  }
  /**
   * Generate a Transaction that splits Stake tokens into another account
   * derived from a base public key and seed
   */


  static splitWithSeed(params) {
    const {
      stakePubkey,
      authorizedPubkey,
      splitStakePubkey,
      basePubkey,
      seed,
      lamports
    } = params;
    const transaction = new Transaction();
    transaction.add(SystemProgram.allocate({
      accountPubkey: splitStakePubkey,
      basePubkey,
      seed,
      space: this.space,
      programId: this.programId
    }));
    return transaction.add(this.splitInstruction({
      stakePubkey,
      authorizedPubkey,
      splitStakePubkey,
      lamports
    }));
  }
  /**
   * Generate a Transaction that merges Stake accounts.
   */


  static merge(params) {
    const {
      stakePubkey,
      sourceStakePubKey,
      authorizedPubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Merge;
    const data = encodeData(type);
    return new Transaction().add({
      keys: [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: sourceStakePubKey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a Transaction that withdraws deactivated Stake tokens.
   */


  static withdraw(params) {
    const {
      stakePubkey,
      authorizedPubkey,
      toPubkey,
      lamports,
      custodianPubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Withdraw;
    const data = encodeData(type, {
      lamports
    });
    const keys = [{
      pubkey: stakePubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: toPubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: SYSVAR_CLOCK_PUBKEY,
      isSigner: false,
      isWritable: false
    }, {
      pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
      isSigner: false,
      isWritable: false
    }, {
      pubkey: authorizedPubkey,
      isSigner: true,
      isWritable: false
    }];

    if (custodianPubkey) {
      keys.push({
        pubkey: custodianPubkey,
        isSigner: false,
        isWritable: false
      });
    }

    return new Transaction().add({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a Transaction that deactivates Stake tokens.
   */


  static deactivate(params) {
    const {
      stakePubkey,
      authorizedPubkey
    } = params;
    const type = STAKE_INSTRUCTION_LAYOUTS.Deactivate;
    const data = encodeData(type);
    return new Transaction().add({
      keys: [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    });
  }

}
StakeProgram.programId = new PublicKey('Stake11111111111111111111111111111111111111');
StakeProgram.space = 200;

const errors = {
  IMPOSSIBLE_CASE: 'Impossible case. Please create issue.',
  TWEAK_ADD:
    'The tweak was out of range or the resulted private key is invalid',
  TWEAK_MUL: 'The tweak was out of range or equal to zero',
  CONTEXT_RANDOMIZE_UNKNOW: 'Unknow error on context randomization',
  SECKEY_INVALID: 'Private Key is invalid',
  PUBKEY_PARSE: 'Public Key could not be parsed',
  PUBKEY_SERIALIZE: 'Public Key serialization error',
  PUBKEY_COMBINE: 'The sum of the public keys is not valid',
  SIG_PARSE: 'Signature could not be parsed',
  SIGN: 'The nonce generation function failed, or the private key was invalid',
  RECOVER: 'Public key could not be recover',
  ECDH: 'Scalar was invalid (zero or overflow)'
};

function assert$a (cond, msg) {
  if (!cond) throw new Error(msg)
}

function isUint8Array (name, value, length) {
  assert$a(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`);

  if (length !== undefined) {
    if (Array.isArray(length)) {
      const numbers = length.join(', ');
      const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
      assert$a(length.includes(value.length), msg);
    } else {
      const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
      assert$a(value.length === length, msg);
    }
  }
}

function isCompressed (value) {
  assert$a(toTypeString(value) === 'Boolean', 'Expected compressed to be a Boolean');
}

function getAssertedOutput (output = (len) => new Uint8Array(len), length) {
  if (typeof output === 'function') output = output(length);
  isUint8Array('output', output, length);
  return output
}

function toTypeString (value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

var lib = (secp256k1) => {
  return {
    contextRandomize (seed) {
      assert$a(
        seed === null || seed instanceof Uint8Array,
        'Expected seed to be an Uint8Array or null'
      );
      if (seed !== null) isUint8Array('seed', seed, 32);

      switch (secp256k1.contextRandomize(seed)) {
        case 1:
          throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW)
      }
    },

    privateKeyVerify (seckey) {
      isUint8Array('private key', seckey, 32);

      return secp256k1.privateKeyVerify(seckey) === 0
    },

    privateKeyNegate (seckey) {
      isUint8Array('private key', seckey, 32);

      switch (secp256k1.privateKeyNegate(seckey)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    privateKeyTweakAdd (seckey, tweak) {
      isUint8Array('private key', seckey, 32);
      isUint8Array('tweak', tweak, 32);

      switch (secp256k1.privateKeyTweakAdd(seckey, tweak)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.TWEAK_ADD)
      }
    },

    privateKeyTweakMul (seckey, tweak) {
      isUint8Array('private key', seckey, 32);
      isUint8Array('tweak', tweak, 32);

      switch (secp256k1.privateKeyTweakMul(seckey, tweak)) {
        case 0:
          return seckey
        case 1:
          throw new Error(errors.TWEAK_MUL)
      }
    },

    publicKeyVerify (pubkey) {
      isUint8Array('public key', pubkey, [33, 65]);

      return secp256k1.publicKeyVerify(pubkey) === 0
    },

    publicKeyCreate (seckey, compressed = true, output) {
      isUint8Array('private key', seckey, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyCreate(output, seckey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SECKEY_INVALID)
        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyConvert (pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyConvert(output, pubkey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyNegate (pubkey, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyNegate(output, pubkey)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyCombine (pubkeys, compressed = true, output) {
      assert$a(Array.isArray(pubkeys), 'Expected public keys to be an Array');
      assert$a(pubkeys.length > 0, 'Expected public keys array will have more than zero items');
      for (const pubkey of pubkeys) {
        isUint8Array('public key', pubkey, [33, 65]);
      }
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyCombine(output, pubkeys)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_COMBINE)
        case 3:
          throw new Error(errors.PUBKEY_SERIALIZE)
      }
    },

    publicKeyTweakAdd (pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('tweak', tweak, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyTweakAdd(output, pubkey, tweak)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.TWEAK_ADD)
      }
    },

    publicKeyTweakMul (pubkey, tweak, compressed = true, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('tweak', tweak, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.publicKeyTweakMul(output, pubkey, tweak)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.TWEAK_MUL)
      }
    },

    signatureNormalize (sig) {
      isUint8Array('signature', sig, 64);

      switch (secp256k1.signatureNormalize(sig)) {
        case 0:
          return sig
        case 1:
          throw new Error(errors.SIG_PARSE)
      }
    },

    signatureExport (sig, output) {
      isUint8Array('signature', sig, 64);
      output = getAssertedOutput(output, 72);

      const obj = { output, outputlen: 72 };
      switch (secp256k1.signatureExport(obj, sig)) {
        case 0:
          return output.slice(0, obj.outputlen)
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    signatureImport (sig, output) {
      isUint8Array('signature', sig);
      output = getAssertedOutput(output, 64);

      switch (secp256k1.signatureImport(output, sig)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdsaSign (msg32, seckey, options = {}, output) {
      isUint8Array('message', msg32, 32);
      isUint8Array('private key', seckey, 32);
      assert$a(toTypeString(options) === 'Object', 'Expected options to be an Object');
      if (options.data !== undefined) isUint8Array('options.data', options.data);
      if (options.noncefn !== undefined) assert$a(toTypeString(options.noncefn) === 'Function', 'Expected options.noncefn to be a Function');
      output = getAssertedOutput(output, 64);

      const obj = { signature: output, recid: null };
      switch (secp256k1.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)) {
        case 0:
          return obj
        case 1:
          throw new Error(errors.SIGN)
        case 2:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdsaVerify (sig, msg32, pubkey) {
      isUint8Array('signature', sig, 64);
      isUint8Array('message', msg32, 32);
      isUint8Array('public key', pubkey, [33, 65]);

      switch (secp256k1.ecdsaVerify(sig, msg32, pubkey)) {
        case 0:
          return true
        case 3:
          return false
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.PUBKEY_PARSE)
      }
    },

    ecdsaRecover (sig, recid, msg32, compressed = true, output) {
      isUint8Array('signature', sig, 64);
      assert$a(
        toTypeString(recid) === 'Number' &&
          recid >= 0 &&
          recid <= 3,
        'Expected recovery id to be a Number within interval [0, 3]'
      );
      isUint8Array('message', msg32, 32);
      isCompressed(compressed);
      output = getAssertedOutput(output, compressed ? 33 : 65);

      switch (secp256k1.ecdsaRecover(output, sig, recid, msg32)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.SIG_PARSE)
        case 2:
          throw new Error(errors.RECOVER)
        case 3:
          throw new Error(errors.IMPOSSIBLE_CASE)
      }
    },

    ecdh (pubkey, seckey, options = {}, output) {
      isUint8Array('public key', pubkey, [33, 65]);
      isUint8Array('private key', seckey, 32);
      assert$a(toTypeString(options) === 'Object', 'Expected options to be an Object');
      if (options.data !== undefined) isUint8Array('options.data', options.data);
      if (options.hashfn !== undefined) {
        assert$a(toTypeString(options.hashfn) === 'Function', 'Expected options.hashfn to be a Function');
        if (options.xbuf !== undefined) isUint8Array('options.xbuf', options.xbuf, 32);
        if (options.ybuf !== undefined) isUint8Array('options.ybuf', options.ybuf, 32);
        isUint8Array('output', output);
      } else {
        output = getAssertedOutput(output, 32);
      }

      switch (secp256k1.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)) {
        case 0:
          return output
        case 1:
          throw new Error(errors.PUBKEY_PARSE)
        case 2:
          throw new Error(errors.ECDH)
      }
    }
  }
};

var elliptic$2 = {};

var name = "elliptic";
var version = "6.5.4";
var description = "EC cryptography";
var main = "lib/elliptic.js";
var files = [
	"lib"
];
var scripts = {
	lint: "eslint lib test",
	"lint:fix": "npm run lint -- --fix",
	unit: "istanbul test _mocha --reporter=spec test/index.js",
	test: "npm run lint && npm run unit",
	version: "grunt dist && git add dist/"
};
var repository = {
	type: "git",
	url: "git@github.com:indutny/elliptic"
};
var keywords = [
	"EC",
	"Elliptic",
	"curve",
	"Cryptography"
];
var author = "Fedor Indutny <fedor@indutny.com>";
var license = "MIT";
var bugs = {
	url: "https://github.com/indutny/elliptic/issues"
};
var homepage = "https://github.com/indutny/elliptic";
var devDependencies = {
	brfs: "^2.0.2",
	coveralls: "^3.1.0",
	eslint: "^7.6.0",
	grunt: "^1.2.1",
	"grunt-browserify": "^5.3.0",
	"grunt-cli": "^1.3.2",
	"grunt-contrib-connect": "^3.0.0",
	"grunt-contrib-copy": "^1.0.0",
	"grunt-contrib-uglify": "^5.0.0",
	"grunt-mocha-istanbul": "^5.0.2",
	"grunt-saucelabs": "^9.0.1",
	istanbul: "^0.4.5",
	mocha: "^8.0.1"
};
var dependencies = {
	"bn.js": "^4.11.9",
	brorand: "^1.1.0",
	"hash.js": "^1.0.0",
	"hmac-drbg": "^1.0.1",
	inherits: "^2.0.4",
	"minimalistic-assert": "^1.0.1",
	"minimalistic-crypto-utils": "^1.0.1"
};
var require$$0 = {
	name: name,
	version: version,
	description: description,
	main: main,
	files: files,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	dependencies: dependencies
};

var utils$c = {};

var utils$b = {};

(function (exports) {

var utils = exports;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  } else {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};
}(utils$b));

(function (exports) {

var utils = exports;
var BN = bn.exports;
var minAssert = minimalisticAssert;
var minUtils = utils$b;

utils.assert = minAssert;
utils.toArray = minUtils.toArray;
utils.zero2 = minUtils.zero2;
utils.toHex = minUtils.toHex;
utils.encode = minUtils.encode;

// Represent num in a w-NAF form
function getNAF(num, w, bits) {
  var naf = new Array(Math.max(num.bitLength(), bits) + 1);
  naf.fill(0);

  var ws = 1 << (w + 1);
  var k = num.clone();

  for (var i = 0; i < naf.length; i++) {
    var z;
    var mod = k.andln(ws - 1);
    if (k.isOdd()) {
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }

    naf[i] = z;
    k.iushrn(1);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    [],
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  var m8;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
      this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
    bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;
}(utils$c));

var brorand = {exports: {}};

var r;

brorand.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
brorand.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto$1 = require('crypto');
    if (typeof crypto$1.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto$1.randomBytes(n);
    };
  } catch (e) {
  }
}

var curve = {};

var BN$8 = bn.exports;
var utils$a = utils$c;
var getNAF = utils$a.getNAF;
var getJSF = utils$a.getJSF;
var assert$9 = utils$a.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN$8(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN$8.red(conf.prime) : BN$8.mont(this.p);

  // Useful for many curves
  this.zero = new BN$8(0).toRed(this.red);
  this.one = new BN$8(1).toRed(this.red);
  this.two = new BN$8(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN$8(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  this._bitLength = this.n ? this.n.bitLength() : 0;

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
var base = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert$9(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1, this._bitLength);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  var j;
  var nafW;
  for (j = 0; j < naf.length; j += doubles.step) {
    nafW = 0;
    for (var l = j + doubles.step - 1; l >= j; l--)
      nafW = (nafW << 1) + naf[l];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (j = 0; j < repr.length; j++) {
      nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w, this._bitLength);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var l = 0; i >= 0 && naf[i] === 0; i--)
      l++;
    if (i >= 0)
      l++;
    acc = acc.dblp(l);

    if (i < 0)
      break;
    var z = naf[i];
    assert$9(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
  points,
  coeffs,
  len,
  jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  var i;
  var j;
  var p;
  for (i = 0; i < len; i++) {
    p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b], /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3,  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (j = 0; j < len; j++) {
      var z = tmp[j];
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils$a.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert$9(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert$9(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
      bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len));
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils$a.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null,
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles,
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res,
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};

var utils$9 = utils$c;
var BN$7 = bn.exports;
var inherits$2 = inherits_browser.exports;
var Base$2 = base;

var assert$8 = utils$9.assert;

function ShortCurve(conf) {
  Base$2.call(this, 'short', conf);

  this.a = new BN$7(conf.a, 16).toRed(this.red);
  this.b = new BN$7(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits$2(ShortCurve, Base$2);
var short = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN$7(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN$7(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert$8(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN$7(vec.a, 16),
        b: new BN$7(vec.b, 16),
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis,
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN$7.mont(num);
  var tinv = new BN$7(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN$7(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN$7(1);
  var y1 = new BN$7(0);
  var x2 = new BN$7(0);
  var y2 = new BN$7(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 },
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN$7(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i = 0; i < points.length; i++) {
        var split = this._endoSplit(coeffs[i]);
        var p = points[i];
        var beta = p._getBeta();

        if (split.k1.negative) {
          split.k1.ineg();
          p = p.neg(true);
        }
        if (split.k2.negative) {
          split.k2.ineg();
          beta = beta.neg(true);
        }

        npoints[i * 2] = p;
        npoints[i * 2 + 1] = beta;
        ncoeffs[i * 2] = split.k1;
        ncoeffs[i * 2 + 1] = split.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

      // Clean-up references to points and coefficients
      for (var j = 0; j < i * 2; j++) {
        npoints[j] = null;
        ncoeffs[j] = null;
      }
      return res;
    };

function Point$2(curve, x, y, isRed) {
  Base$2.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN$7(x, 16);
    this.y = new BN$7(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits$2(Point$2, Base$2.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point$2(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point$2.fromJSON(this, obj, red);
};

Point$2.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul),
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul),
      },
    };
  }
  return beta;
};

Point$2.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1),
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1),
    },
  } ];
};

Point$2.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point)),
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point)),
    },
  };
  return res;
};

Point$2.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point$2.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point$2.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point$2.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point$2.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point$2.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point$2.prototype.mul = function mul(k) {
  k = new BN$7(k, 16);
  if (this.isInfinity())
    return this;
  else if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point$2.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point$2.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point$2.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point$2.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate),
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate),
      },
    };
  }
  return res;
};

Point$2.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base$2.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN$7(0);
  } else {
    this.x = new BN$7(x, 16);
    this.y = new BN$7(y, 16);
    this.z = new BN$7(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits$2(JPoint, Base$2.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  var i;
  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN$7(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

var BN$6 = bn.exports;
var inherits$1 = inherits_browser.exports;
var Base$1 = base;

var utils$8 = utils$c;

function MontCurve(conf) {
  Base$1.call(this, 'mont', conf);

  this.a = new BN$6(conf.a, 16).toRed(this.red);
  this.b = new BN$6(conf.b, 16).toRed(this.red);
  this.i4 = new BN$6(4).toRed(this.red).redInvm();
  this.two = new BN$6(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits$1(MontCurve, Base$1);
var mont = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point$1(curve, x, z) {
  Base$1.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN$6(x, 16);
    this.z = new BN$6(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits$1(Point$1, Base$1.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils$8.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point$1(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point$1.fromJSON(this, obj);
};

Point$1.prototype.precompute = function precompute() {
  // No-op
};

Point$1.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point$1.fromJSON = function fromJSON(curve, obj) {
  return new Point$1(curve, obj[0], obj[1] || curve.one);
};

Point$1.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point$1.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point$1.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point$1.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point$1.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point$1.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point$1.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point$1.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point$1.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point$1.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point$1.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};

var utils$7 = utils$c;
var BN$5 = bn.exports;
var inherits = inherits_browser.exports;
var Base = base;

var assert$7 = utils$7.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN$5(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN$5(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN$5(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert$7(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
var edwards = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN$5(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN$5(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.c2);
  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.fromRed().isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN$5(x, 16);
    this.y = new BN$5(y, 16);
    this.z = z ? new BN$5(z, 16) : this.curve.one;
    this.t = t && new BN$5(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
    (this.y.cmp(this.z) === 0 ||
    (this.zOne && this.y.cmp(this.curve.c) === 0));
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  var e;
  var h;
  var j;
  if (this.curve.twisted) {
    // E = a * C
    e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      h = this.z.redSqr();
      // J = F - 2 * H
      j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    e = c.redAdd(d);
    // H = (c * Z1)^2
    h = this.curve._mulC(this.z).redSqr();
    // J = E - 2 * H
    j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
    this.y,
    this.z,
    this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;

(function (exports) {

var curve = exports;

curve.base = base;
curve.short = short;
curve.mont = mont;
curve.edwards = edwards;
}(curve));

var curves$2 = {};

(function (exports) {

var curves = exports;

var hash = hash$3;
var curve$1 = curve;
var utils = utils$c;

var assert = utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new curve$1.short(options);
  else if (options.type === 'edwards')
    this.curve = new curve$1.edwards(options);
  else
    this.curve = new curve$1.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve,
      });
      return curve;
    },
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811',
  ],
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34',
  ],
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5',
  ],
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f',
  ],
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650',
  ],
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9',
  ],
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658',
  ],
});

var pre;
try {
  pre = require('./precomputed/secp256k1');
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3',
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15',
    },
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre,
  ],
});
}(curves$2));

var hash$1 = hash$3;
var utils$6 = utils$b;
var assert$6 = minimalisticAssert;

function HmacDRBG$1(options) {
  if (!(this instanceof HmacDRBG$1))
    return new HmacDRBG$1(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils$6.toArray(options.entropy, options.entropyEnc || 'hex');
  var nonce = utils$6.toArray(options.nonce, options.nonceEnc || 'hex');
  var pers = utils$6.toArray(options.pers, options.persEnc || 'hex');
  assert$6(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
var hmacDrbg = HmacDRBG$1;

HmacDRBG$1.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG$1.prototype._hmac = function hmac() {
  return new hash$1.hmac(this.hash, this.K);
};

HmacDRBG$1.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG$1.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils$6.toArray(entropy, entropyEnc);
  add = utils$6.toArray(add, addEnc);

  assert$6(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this._reseed = 1;
};

HmacDRBG$1.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils$6.toArray(add, addEnc || 'hex');
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this._reseed++;
  return utils$6.encode(res, enc);
};

var BN$4 = bn.exports;
var utils$5 = utils$c;
var assert$5 = utils$5.assert;

function KeyPair$3(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
var key$1 = KeyPair$3;

KeyPair$3.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair$3)
    return pub;

  return new KeyPair$3(ec, {
    pub: pub,
    pubEnc: enc,
  });
};

KeyPair$3.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair$3)
    return priv;

  return new KeyPair$3(ec, {
    priv: priv,
    privEnc: enc,
  });
};

KeyPair$3.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair$3.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair$3.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair$3.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN$4(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair$3.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert$5(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert$5(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair$3.prototype.derive = function derive(pub) {
  if(!pub.validate()) {
    assert$5(pub.validate(), 'public point not validated');
  }
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair$3.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair$3.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair$3.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};

var BN$3 = bn.exports;

var utils$4 = utils$c;
var assert$4 = utils$4.assert;

function Signature$3(options, enc) {
  if (options instanceof Signature$3)
    return options;

  if (this._importDER(options, enc))
    return;

  assert$4(options.r && options.s, 'Signature without r or s');
  this.r = new BN$3(options.r, 16);
  this.s = new BN$3(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
var signature$1 = Signature$3;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;

  // Indefinite length or overflow
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }

  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
    val >>>= 0;
  }

  // Leading zeroes
  if (val <= 0x7f) {
    return false;
  }

  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature$3.prototype._importDER = function _importDER(data, enc) {
  data = utils$4.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if (len === false) {
    return false;
  }
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  if (rlen === false) {
    return false;
  }
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (slen === false) {
    return false;
  }
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0) {
    if (r[1] & 0x80) {
      r = r.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }
  if (s[0] === 0) {
    if (s[1] & 0x80) {
      s = s.slice(1);
    } else {
      // Leading zeroes
      return false;
    }
  }

  this.r = new BN$3(r);
  this.s = new BN$3(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature$3.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils$4.encode(res, enc);
};

var BN$2 = bn.exports;
var HmacDRBG = hmacDrbg;
var utils$3 = utils$c;
var curves$1 = curves$2;
var rand = brorand.exports;
var assert$3 = utils$3.assert;

var KeyPair$2 = key$1;
var Signature$2 = signature$1;

function EC$1(options) {
  if (!(this instanceof EC$1))
    return new EC$1(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert$3(Object.prototype.hasOwnProperty.call(curves$1, options),
      'Unknown curve ' + options);

    options = curves$1[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof curves$1.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
var ec$1 = EC$1;

EC$1.prototype.keyPair = function keyPair(options) {
  return new KeyPair$2(this, options);
};

EC$1.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair$2.fromPrivate(this, priv, enc);
};

EC$1.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair$2.fromPublic(this, pub, enc);
};

EC$1.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray(),
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN$2(2));
  for (;;) {
    var priv = new BN$2(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  }
};

EC$1.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC$1.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN$2(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN$2(1));

  for (var iter = 0; ; iter++) {
    var k = options.k ?
      options.k(iter) :
      new BN$2(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature$2({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC$1.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN$2(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature$2(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);
  var p;

  if (!this.curve._maxwellTrick) {
    p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC$1.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert$3((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature$2(signature, enc);

  var n = this.n;
  var e = new BN$2(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC$1.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature$2(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};

var utils$2 = utils$c;
var assert$2 = utils$2.assert;
var parseBytes$2 = utils$2.parseBytes;
var cachedProperty$1 = utils$2.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair$1(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes$2(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes$2(params.pub);
}

KeyPair$1.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair$1)
    return pub;
  return new KeyPair$1(eddsa, { pub: pub });
};

KeyPair$1.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair$1)
    return secret;
  return new KeyPair$1(eddsa, { secret: secret });
};

KeyPair$1.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty$1(KeyPair$1, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty$1(KeyPair$1, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty$1(KeyPair$1, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty$1(KeyPair$1, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty$1(KeyPair$1, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty$1(KeyPair$1, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair$1.prototype.sign = function sign(message) {
  assert$2(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair$1.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair$1.prototype.getSecret = function getSecret(enc) {
  assert$2(this._secret, 'KeyPair is public only');
  return utils$2.encode(this.secret(), enc);
};

KeyPair$1.prototype.getPublic = function getPublic(enc) {
  return utils$2.encode(this.pubBytes(), enc);
};

var key = KeyPair$1;

var BN$1 = bn.exports;
var utils$1 = utils$c;
var assert$1 = utils$1.assert;
var cachedProperty = utils$1.cachedProperty;
var parseBytes$1 = utils$1.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature$1(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes$1(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength),
    };
  }

  assert$1(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN$1)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature$1, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature$1, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature$1, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature$1, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature$1.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature$1.prototype.toHex = function toHex() {
  return utils$1.encode(this.toBytes(), 'hex').toUpperCase();
};

var signature = Signature$1;

var hash = hash$3;
var curves = curves$2;
var utils = utils$c;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = key;
var Signature = signature;

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  curve = curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

var eddsa = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
    .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};

(function (exports) {

var elliptic = exports;

elliptic.version = require$$0.version;
elliptic.utils = utils$c;
elliptic.rand = brorand.exports;
elliptic.curve = curve;
elliptic.curves = curves$2;

// Protocols
elliptic.ec = ec$1;
elliptic.eddsa = eddsa;
}(elliptic$2));

const EC = elliptic$2.ec;

const ec = new EC('secp256k1');
const ecparams = ec.curve;

// Hack, we can not use bn.js@5, while elliptic uses bn.js@4
// See https://github.com/indutny/elliptic/issues/191#issuecomment-569888758
const BN = ecparams.n.constructor;

function loadCompressedPublicKey (first, xbuf) {
  let x = new BN(xbuf);

  // overflow
  if (x.cmp(ecparams.p) >= 0) return null
  x = x.toRed(ecparams.red);

  // compute corresponding Y
  let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
  if ((first === 0x03) !== y.isOdd()) y = y.redNeg();

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadUncompressedPublicKey (first, xbuf, ybuf) {
  let x = new BN(xbuf);
  let y = new BN(ybuf);

  // overflow
  if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null

  x = x.toRed(ecparams.red);
  y = y.toRed(ecparams.red);

  // is odd flag
  if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

  // x*x*x + b = y*y
  const x3 = x.redSqr().redIMul(x);
  if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null

  return ec.keyPair({ pub: { x: x, y: y } })
}

function loadPublicKey (pubkey) {
  // length should be validated in interface
  const first = pubkey[0];
  switch (first) {
    case 0x02:
    case 0x03:
      if (pubkey.length !== 33) return null
      return loadCompressedPublicKey(first, pubkey.subarray(1, 33))
    case 0x04:
    case 0x06:
    case 0x07:
      if (pubkey.length !== 65) return null
      return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65))
    default:
      return null
  }
}

function savePublicKey (output, point) {
  const pubkey = point.encode(null, output.length === 33);
  // Loop should be faster because we do not need create extra Uint8Array
  // output.set(new Uint8Array(pubkey))
  for (let i = 0; i < output.length; ++i) output[i] = pubkey[i];
}

var elliptic$1 = {
  contextRandomize () {
    return 0
  },

  privateKeyVerify (seckey) {
    const bn = new BN(seckey);
    return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1
  },

  privateKeyNegate (seckey) {
    const bn = new BN(seckey);
    const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, 'be', 32);
    seckey.set(negate);
    return 0
  },

  privateKeyTweakAdd (seckey, tweak) {
    const bn = new BN(tweak);
    if (bn.cmp(ecparams.n) >= 0) return 1

    bn.iadd(new BN(seckey));
    if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
    if (bn.isZero()) return 1

    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
    seckey.set(tweaked);

    return 0
  },

  privateKeyTweakMul (seckey, tweak) {
    let bn = new BN(tweak);
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

    bn.imul(new BN(seckey));
    if (bn.cmp(ecparams.n) >= 0) bn = bn.umod(ecparams.n);

    const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
    seckey.set(tweaked);

    return 0
  },

  publicKeyVerify (pubkey) {
    const pair = loadPublicKey(pubkey);
    return pair === null ? 1 : 0
  },

  publicKeyCreate (output, seckey) {
    const bn = new BN(seckey);
    if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

    const point = ec.keyFromPrivate(seckey).getPublic();
    savePublicKey(output, point);

    return 0
  },

  publicKeyConvert (output, pubkey) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1

    const point = pair.getPublic();
    savePublicKey(output, point);

    return 0
  },

  publicKeyNegate (output, pubkey) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1

    const point = pair.getPublic();
    point.y = point.y.redNeg();
    savePublicKey(output, point);

    return 0
  },

  publicKeyCombine (output, pubkeys) {
    const pairs = new Array(pubkeys.length);
    for (let i = 0; i < pubkeys.length; ++i) {
      pairs[i] = loadPublicKey(pubkeys[i]);
      if (pairs[i] === null) return 1
    }

    let point = pairs[0].getPublic();
    for (let i = 1; i < pairs.length; ++i) point = point.add(pairs[i].pub);
    if (point.isInfinity()) return 2

    savePublicKey(output, point);

    return 0
  },

  publicKeyTweakAdd (output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1

    tweak = new BN(tweak);
    if (tweak.cmp(ecparams.n) >= 0) return 2

    const point = pair.getPublic().add(ecparams.g.mul(tweak));
    if (point.isInfinity()) return 2

    savePublicKey(output, point);

    return 0
  },

  publicKeyTweakMul (output, pubkey, tweak) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1

    tweak = new BN(tweak);
    if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) return 2

    const point = pair.getPublic().mul(tweak);
    savePublicKey(output, point);

    return 0
  },

  signatureNormalize (sig) {
    const r = new BN(sig.subarray(0, 32));
    const s = new BN(sig.subarray(32, 64));
    if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) return 1

    if (s.cmp(ec.nh) === 1) {
      sig.set(ecparams.n.sub(s).toArrayLike(Uint8Array, 'be', 32), 32);
    }

    return 0
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureExport (obj, sig) {
    const sigR = sig.subarray(0, 32);
    const sigS = sig.subarray(32, 64);
    if (new BN(sigR).cmp(ecparams.n) >= 0) return 1
    if (new BN(sigS).cmp(ecparams.n) >= 0) return 1

    const { output } = obj;

    // Prepare R
    let r = output.subarray(4, 4 + 33);
    r[0] = 0x00;
    r.set(sigR, 1);

    let lenR = 33;
    let posR = 0;
    for (; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

    r = r.subarray(posR);
    if (r[0] & 0x80) return 1
    if (lenR > 1 && (r[0] === 0x00) && !(r[1] & 0x80)) return 1

    // Prepare S
    let s = output.subarray(6 + 33, 6 + 33 + 33);
    s[0] = 0x00;
    s.set(sigS, 1);

    let lenS = 33;
    let posS = 0;
    for (; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

    s = s.subarray(posS);
    if (s[0] & 0x80) return 1
    if (lenS > 1 && (s[0] === 0x00) && !(s[1] & 0x80)) return 1

    // Set output length for return
    obj.outputlen = 6 + lenR + lenS;

    // Output in specified format
    // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
    output[0] = 0x30;
    output[1] = obj.outputlen - 2;
    output[2] = 0x02;
    output[3] = r.length;
    output.set(r, 4);
    output[4 + lenR] = 0x02;
    output[5 + lenR] = s.length;
    output.set(s, 6 + lenR);

    return 0
  },

  // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
  // Adapted for Uint8Array instead Buffer
  signatureImport (output, sig) {
    if (sig.length < 8) return 1
    if (sig.length > 72) return 1
    if (sig[0] !== 0x30) return 1
    if (sig[1] !== sig.length - 2) return 1
    if (sig[2] !== 0x02) return 1

    const lenR = sig[3];
    if (lenR === 0) return 1
    if (5 + lenR >= sig.length) return 1
    if (sig[4 + lenR] !== 0x02) return 1

    const lenS = sig[5 + lenR];
    if (lenS === 0) return 1
    if ((6 + lenR + lenS) !== sig.length) return 1

    if (sig[4] & 0x80) return 1
    if (lenR > 1 && (sig[4] === 0x00) && !(sig[5] & 0x80)) return 1

    if (sig[lenR + 6] & 0x80) return 1
    if (lenS > 1 && (sig[lenR + 6] === 0x00) && !(sig[lenR + 7] & 0x80)) return 1

    let sigR = sig.subarray(4, 4 + lenR);
    if (sigR.length === 33 && sigR[0] === 0x00) sigR = sigR.subarray(1);
    if (sigR.length > 32) return 1

    let sigS = sig.subarray(6 + lenR);
    if (sigS.length === 33 && sigS[0] === 0x00) sigS = sigS.slice(1);
    if (sigS.length > 32) throw new Error('S length is too long')

    let r = new BN(sigR);
    if (r.cmp(ecparams.n) >= 0) r = new BN(0);

    let s = new BN(sig.subarray(6 + lenR));
    if (s.cmp(ecparams.n) >= 0) s = new BN(0);

    output.set(r.toArrayLike(Uint8Array, 'be', 32), 0);
    output.set(s.toArrayLike(Uint8Array, 'be', 32), 32);

    return 0
  },

  ecdsaSign (obj, message, seckey, data, noncefn) {
    if (noncefn) {
      const _noncefn = noncefn;
      noncefn = (counter) => {
        const nonce = _noncefn(message, seckey, null, data, counter);

        const isValid = nonce instanceof Uint8Array && nonce.length === 32;
        if (!isValid) throw new Error('This is the way')

        return new BN(nonce)
      };
    }

    const d = new BN(seckey);
    if (d.cmp(ecparams.n) >= 0 || d.isZero()) return 1

    let sig;
    try {
      sig = ec.sign(message, seckey, { canonical: true, k: noncefn, pers: data });
    } catch (err) {
      return 1
    }

    obj.signature.set(sig.r.toArrayLike(Uint8Array, 'be', 32), 0);
    obj.signature.set(sig.s.toArrayLike(Uint8Array, 'be', 32), 32);
    obj.recid = sig.recoveryParam;

    return 0
  },

  ecdsaVerify (sig, msg32, pubkey) {
    const sigObj = { r: sig.subarray(0, 32), s: sig.subarray(32, 64) };

    const sigr = new BN(sigObj.r);
    const sigs = new BN(sigObj.s);
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1
    if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return 3

    const pair = loadPublicKey(pubkey);
    if (pair === null) return 2

    const point = pair.getPublic();
    const isValid = ec.verify(msg32, sigObj, point);
    return isValid ? 0 : 3
  },

  ecdsaRecover (output, sig, recid, msg32) {
    const sigObj = { r: sig.slice(0, 32), s: sig.slice(32, 64) };

    const sigr = new BN(sigObj.r);
    const sigs = new BN(sigObj.s);
    if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1

    if (sigr.isZero() || sigs.isZero()) return 2

    // Can throw `throw new Error('Unable to find sencond key candinate');`
    let point;
    try {
      point = ec.recoverPubKey(msg32, sigObj, recid);
    } catch (err) {
      return 2
    }

    savePublicKey(output, point);

    return 0
  },

  ecdh (output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
    const pair = loadPublicKey(pubkey);
    if (pair === null) return 1

    const scalar = new BN(seckey);
    if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) return 2

    const point = pair.getPublic().mul(scalar);

    if (hashfn === undefined) {
      const data = point.encode(null, true);
      const sha256 = ec.hash().update(data).digest();
      for (let i = 0; i < 32; ++i) output[i] = sha256[i];
    } else {
      if (!xbuf) xbuf = new Uint8Array(32);
      const x = point.getX().toArray('be', 32);
      for (let i = 0; i < 32; ++i) xbuf[i] = x[i];

      if (!ybuf) ybuf = new Uint8Array(32);
      const y = point.getY().toArray('be', 32);
      for (let i = 0; i < 32; ++i) ybuf[i] = y[i];

      const hash = hashfn(xbuf, ybuf, data);

      const isValid = hash instanceof Uint8Array && hash.length === output.length;
      if (!isValid) return 2

      output.set(hash);
    }

    return 0
  }
};

var elliptic = lib(elliptic$1);

var secp256k1 = elliptic;

var sha3$1 = {exports: {}};

/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */

(function (module) {
/*jslint bitwise: true */
(function () {

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA3_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = commonjsGlobal;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && 'object' === 'object' && module.exports;
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
    0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
    2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
    2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
    2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function (bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function (method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }
    return method;
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');
    method.create = function () {
      return new Keccak(bits, padding, bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };
    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };
    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };
    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };
    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');
    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };
    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };
    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [
    { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
    { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
    { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
    { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
    { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
  ];

  var methods = {}, methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits = algorithm.bits;
    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.finalized = false;
    this.block = 0;
    this.start = 0;
    this.blockCount = (1600 - (bits << 1)) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
      blockCount = this.blockCount, index = 0, s = this.s, i, code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      this.lastByteIndex = i;
      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];
        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }
        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255, n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;
    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }
    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }
    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    var notString, type = typeof str;
    if (type !== 'string') {
      if (type === 'object') {
        if (str === null) {
          throw new Error(INPUT_ERROR);
        } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
          str = new Uint8Array(str);
        } else if (!Array.isArray(str)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
            throw new Error(INPUT_ERROR);
          }
        }
      } else {
        throw new Error(INPUT_ERROR);
      }
      notString = true;
    }
    var bytes = 0, length = str.length;
    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
          bytes += 4;
        }
      }
    }
    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);
    for (var i = 0; i < strs.length; ++i) {
      bytes += this.encodeString(strs[i]);
    }
    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];
    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    blocks[blockCount - 1] |= 0x80000000;
    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }
    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var hex = '', block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
          HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
          HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
          HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
      }
      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }
    if (extraBytes) {
      block = s[i];
      hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
      if (extraBytes > 1) {
        hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
      }
      if (extraBytes > 2) {
        hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
      }
    }
    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;
    if (extraBytes) {
      buffer = new ArrayBuffer((outputBlocks + 1) << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }
    var array = new Uint32Array(buffer);
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }
    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var array = [], offset, block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = (block >> 8) & 0xFF;
        array[offset + 2] = (block >> 16) & 0xFF;
        array[offset + 3] = (block >> 24) & 0xFF;
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;
      if (extraBytes > 1) {
        array[offset + 1] = (block >> 8) & 0xFF;
      }
      if (extraBytes > 2) {
        array[offset + 2] = (block >> 16) & 0xFF;
      }
    }
    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
      b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
      b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
      b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

      h = c8 ^ ((c2 << 1) | (c3 >>> 31));
      l = c9 ^ ((c3 << 1) | (c2 >>> 31));
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ ((c4 << 1) | (c5 >>> 31));
      l = c1 ^ ((c5 << 1) | (c4 >>> 31));
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ ((c6 << 1) | (c7 >>> 31));
      l = c3 ^ ((c7 << 1) | (c6 >>> 31));
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ ((c8 << 1) | (c9 >>> 31));
      l = c5 ^ ((c9 << 1) | (c8 >>> 31));
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ ((c0 << 1) | (c1 >>> 31));
      l = c7 ^ ((c1 << 1) | (c0 >>> 31));
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;

      b0 = s[0];
      b1 = s[1];
      b32 = (s[11] << 4) | (s[10] >>> 28);
      b33 = (s[10] << 4) | (s[11] >>> 28);
      b14 = (s[20] << 3) | (s[21] >>> 29);
      b15 = (s[21] << 3) | (s[20] >>> 29);
      b46 = (s[31] << 9) | (s[30] >>> 23);
      b47 = (s[30] << 9) | (s[31] >>> 23);
      b28 = (s[40] << 18) | (s[41] >>> 14);
      b29 = (s[41] << 18) | (s[40] >>> 14);
      b20 = (s[2] << 1) | (s[3] >>> 31);
      b21 = (s[3] << 1) | (s[2] >>> 31);
      b2 = (s[13] << 12) | (s[12] >>> 20);
      b3 = (s[12] << 12) | (s[13] >>> 20);
      b34 = (s[22] << 10) | (s[23] >>> 22);
      b35 = (s[23] << 10) | (s[22] >>> 22);
      b16 = (s[33] << 13) | (s[32] >>> 19);
      b17 = (s[32] << 13) | (s[33] >>> 19);
      b48 = (s[42] << 2) | (s[43] >>> 30);
      b49 = (s[43] << 2) | (s[42] >>> 30);
      b40 = (s[5] << 30) | (s[4] >>> 2);
      b41 = (s[4] << 30) | (s[5] >>> 2);
      b22 = (s[14] << 6) | (s[15] >>> 26);
      b23 = (s[15] << 6) | (s[14] >>> 26);
      b4 = (s[25] << 11) | (s[24] >>> 21);
      b5 = (s[24] << 11) | (s[25] >>> 21);
      b36 = (s[34] << 15) | (s[35] >>> 17);
      b37 = (s[35] << 15) | (s[34] >>> 17);
      b18 = (s[45] << 29) | (s[44] >>> 3);
      b19 = (s[44] << 29) | (s[45] >>> 3);
      b10 = (s[6] << 28) | (s[7] >>> 4);
      b11 = (s[7] << 28) | (s[6] >>> 4);
      b42 = (s[17] << 23) | (s[16] >>> 9);
      b43 = (s[16] << 23) | (s[17] >>> 9);
      b24 = (s[26] << 25) | (s[27] >>> 7);
      b25 = (s[27] << 25) | (s[26] >>> 7);
      b6 = (s[36] << 21) | (s[37] >>> 11);
      b7 = (s[37] << 21) | (s[36] >>> 11);
      b38 = (s[47] << 24) | (s[46] >>> 8);
      b39 = (s[46] << 24) | (s[47] >>> 8);
      b30 = (s[8] << 27) | (s[9] >>> 5);
      b31 = (s[9] << 27) | (s[8] >>> 5);
      b12 = (s[18] << 20) | (s[19] >>> 12);
      b13 = (s[19] << 20) | (s[18] >>> 12);
      b44 = (s[29] << 7) | (s[28] >>> 25);
      b45 = (s[28] << 7) | (s[29] >>> 25);
      b26 = (s[38] << 8) | (s[39] >>> 24);
      b27 = (s[39] << 8) | (s[38] >>> 24);
      b8 = (s[48] << 14) | (s[49] >>> 18);
      b9 = (s[49] << 14) | (s[48] >>> 18);

      s[0] = b0 ^ (~b2 & b4);
      s[1] = b1 ^ (~b3 & b5);
      s[10] = b10 ^ (~b12 & b14);
      s[11] = b11 ^ (~b13 & b15);
      s[20] = b20 ^ (~b22 & b24);
      s[21] = b21 ^ (~b23 & b25);
      s[30] = b30 ^ (~b32 & b34);
      s[31] = b31 ^ (~b33 & b35);
      s[40] = b40 ^ (~b42 & b44);
      s[41] = b41 ^ (~b43 & b45);
      s[2] = b2 ^ (~b4 & b6);
      s[3] = b3 ^ (~b5 & b7);
      s[12] = b12 ^ (~b14 & b16);
      s[13] = b13 ^ (~b15 & b17);
      s[22] = b22 ^ (~b24 & b26);
      s[23] = b23 ^ (~b25 & b27);
      s[32] = b32 ^ (~b34 & b36);
      s[33] = b33 ^ (~b35 & b37);
      s[42] = b42 ^ (~b44 & b46);
      s[43] = b43 ^ (~b45 & b47);
      s[4] = b4 ^ (~b6 & b8);
      s[5] = b5 ^ (~b7 & b9);
      s[14] = b14 ^ (~b16 & b18);
      s[15] = b15 ^ (~b17 & b19);
      s[24] = b24 ^ (~b26 & b28);
      s[25] = b25 ^ (~b27 & b29);
      s[34] = b34 ^ (~b36 & b38);
      s[35] = b35 ^ (~b37 & b39);
      s[44] = b44 ^ (~b46 & b48);
      s[45] = b45 ^ (~b47 & b49);
      s[6] = b6 ^ (~b8 & b0);
      s[7] = b7 ^ (~b9 & b1);
      s[16] = b16 ^ (~b18 & b10);
      s[17] = b17 ^ (~b19 & b11);
      s[26] = b26 ^ (~b28 & b20);
      s[27] = b27 ^ (~b29 & b21);
      s[36] = b36 ^ (~b38 & b30);
      s[37] = b37 ^ (~b39 & b31);
      s[46] = b46 ^ (~b48 & b40);
      s[47] = b47 ^ (~b49 & b41);
      s[8] = b8 ^ (~b0 & b2);
      s[9] = b9 ^ (~b1 & b3);
      s[18] = b18 ^ (~b10 & b12);
      s[19] = b19 ^ (~b11 & b13);
      s[28] = b28 ^ (~b20 & b22);
      s[29] = b29 ^ (~b21 & b23);
      s[38] = b38 ^ (~b30 & b32);
      s[39] = b39 ^ (~b31 & b33);
      s[48] = b48 ^ (~b40 & b42);
      s[49] = b49 ^ (~b41 & b43);

      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }
  }
})();
}(sha3$1));

var sha3 = sha3$1.exports;

const {
  publicKeyCreate,
  ecdsaSign
} = secp256k1;
const PRIVATE_KEY_BYTES = 32;
const ETHEREUM_ADDRESS_BYTES = 20;
const PUBLIC_KEY_BYTES = 64;
const SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
/**
 * Params for creating an secp256k1 instruction using a public key
 */

const SECP256K1_INSTRUCTION_LAYOUT = struct([u8('numSignatures'), u16('signatureOffset'), u8('signatureInstructionIndex'), u16('ethAddressOffset'), u8('ethAddressInstructionIndex'), u16('messageDataOffset'), u16('messageDataSize'), u8('messageInstructionIndex'), blob(20, 'ethAddress'), blob(64, 'signature'), u8('recoveryId')]);
class Secp256k1Program {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the secp256k1 program
   */


  /**
   * Construct an Ethereum address from a secp256k1 public key buffer.
   * @param {Buffer} publicKey a 64 byte secp256k1 public key buffer
   */
  static publicKeyToEthAddress(publicKey) {
    assert$c(publicKey.length === PUBLIC_KEY_BYTES, `Public key must be ${PUBLIC_KEY_BYTES} bytes but received ${publicKey.length} bytes`);

    try {
      return Buffer$1.from(sha3.keccak_256.update(toBuffer(publicKey)).digest()).slice(-ETHEREUM_ADDRESS_BYTES);
    } catch (error) {
      throw new Error(`Error constructing Ethereum address: ${error}`);
    }
  }
  /**
   * Create an secp256k1 instruction with a public key. The public key
   * must be a buffer that is 64 bytes long.
   */


  static createInstructionWithPublicKey(params) {
    const {
      publicKey,
      message,
      signature,
      recoveryId,
      instructionIndex
    } = params;
    return Secp256k1Program.createInstructionWithEthAddress({
      ethAddress: Secp256k1Program.publicKeyToEthAddress(publicKey),
      message,
      signature,
      recoveryId,
      instructionIndex
    });
  }
  /**
   * Create an secp256k1 instruction with an Ethereum address. The address
   * must be a hex string or a buffer that is 20 bytes long.
   */


  static createInstructionWithEthAddress(params) {
    const {
      ethAddress: rawAddress,
      message,
      signature,
      recoveryId,
      instructionIndex = 0
    } = params;
    let ethAddress;

    if (typeof rawAddress === 'string') {
      if (rawAddress.startsWith('0x')) {
        ethAddress = Buffer$1.from(rawAddress.substr(2), 'hex');
      } else {
        ethAddress = Buffer$1.from(rawAddress, 'hex');
      }
    } else {
      ethAddress = rawAddress;
    }

    assert$c(ethAddress.length === ETHEREUM_ADDRESS_BYTES, `Address must be ${ETHEREUM_ADDRESS_BYTES} bytes but received ${ethAddress.length} bytes`);
    const dataStart = 1 + SIGNATURE_OFFSETS_SERIALIZED_SIZE;
    const ethAddressOffset = dataStart;
    const signatureOffset = dataStart + ethAddress.length;
    const messageDataOffset = signatureOffset + signature.length + 1;
    const numSignatures = 1;
    const instructionData = Buffer$1.alloc(SECP256K1_INSTRUCTION_LAYOUT.span + message.length);
    SECP256K1_INSTRUCTION_LAYOUT.encode({
      numSignatures,
      signatureOffset,
      signatureInstructionIndex: instructionIndex,
      ethAddressOffset,
      ethAddressInstructionIndex: instructionIndex,
      messageDataOffset,
      messageDataSize: message.length,
      messageInstructionIndex: instructionIndex,
      signature: toBuffer(signature),
      ethAddress: toBuffer(ethAddress),
      recoveryId
    }, instructionData);
    instructionData.fill(toBuffer(message), SECP256K1_INSTRUCTION_LAYOUT.span);
    return new TransactionInstruction({
      keys: [],
      programId: Secp256k1Program.programId,
      data: instructionData
    });
  }
  /**
   * Create an secp256k1 instruction with a private key. The private key
   * must be a buffer that is 32 bytes long.
   */


  static createInstructionWithPrivateKey(params) {
    const {
      privateKey: pkey,
      message,
      instructionIndex
    } = params;
    assert$c(pkey.length === PRIVATE_KEY_BYTES, `Private key must be ${PRIVATE_KEY_BYTES} bytes but received ${pkey.length} bytes`);

    try {
      const privateKey = toBuffer(pkey);
      const publicKey = publicKeyCreate(privateKey, false).slice(1); // throw away leading byte

      const messageHash = Buffer$1.from(sha3.keccak_256.update(toBuffer(message)).digest());
      const {
        signature,
        recid: recoveryId
      } = ecdsaSign(messageHash, privateKey);
      return this.createInstructionWithPublicKey({
        publicKey,
        message,
        signature,
        recoveryId,
        instructionIndex
      });
    } catch (error) {
      throw new Error(`Error creating instruction; ${error}`);
    }
  }

}
Secp256k1Program.programId = new PublicKey('KeccakSecp256k11111111111111111111111111111');

const VALIDATOR_INFO_KEY = new PublicKey('Va1idator1nfo111111111111111111111111111111');
/**
 * @internal
 */

const InfoString = type({
  name: string(),
  website: optional(string()),
  details: optional(string()),
  keybaseUsername: optional(string())
});
/**
 * ValidatorInfo class
 */

class ValidatorInfo {
  /**
   * validator public key
   */

  /**
   * validator information
   */

  /**
   * Construct a valid ValidatorInfo
   *
   * @param key validator public key
   * @param info validator information
   */
  constructor(key, info) {
    this.key = void 0;
    this.info = void 0;
    this.key = key;
    this.info = info;
  }
  /**
   * Deserialize ValidatorInfo from the config account data. Exactly two config
   * keys are required in the data.
   *
   * @param buffer config account data
   * @return null if info was not found
   */


  static fromConfigData(buffer) {
    const PUBKEY_LENGTH = 32;
    let byteArray = [...buffer];
    const configKeyCount = decodeLength(byteArray);
    if (configKeyCount !== 2) return null;
    const configKeys = [];

    for (let i = 0; i < 2; i++) {
      const publicKey = new PublicKey(byteArray.slice(0, PUBKEY_LENGTH));
      byteArray = byteArray.slice(PUBKEY_LENGTH);
      const isSigner = byteArray.slice(0, 1)[0] === 1;
      byteArray = byteArray.slice(1);
      configKeys.push({
        publicKey,
        isSigner
      });
    }

    if (configKeys[0].publicKey.equals(VALIDATOR_INFO_KEY)) {
      if (configKeys[1].isSigner) {
        const rawInfo = rustString().decode(Buffer$1.from(byteArray));
        const info = JSON.parse(rawInfo);
        assert$b(info, InfoString);
        return new ValidatorInfo(configKeys[1].publicKey, info);
      }
    }

    return null;
  }

}

const VOTE_PROGRAM_ID = new PublicKey('Vote111111111111111111111111111111111111111');

/**
 * See https://github.com/solana-labs/solana/blob/8a12ed029cfa38d4a45400916c2463fb82bbec8c/programs/vote_api/src/vote_state.rs#L68-L88
 *
 * @internal
 */
const VoteAccountLayout = struct([publicKey('nodePubkey'), publicKey('authorizedWithdrawer'), u8('commission'), nu64(), // votes.length
seq(struct([nu64('slot'), u32('confirmationCount')]), offset(u32(), -8), 'votes'), u8('rootSlotValid'), nu64('rootSlot'), nu64(), // authorizedVoters.length
seq(struct([nu64('epoch'), publicKey('authorizedVoter')]), offset(u32(), -8), 'authorizedVoters'), struct([seq(struct([publicKey('authorizedPubkey'), nu64('epochOfLastAuthorizedSwitch'), nu64('targetEpoch')]), 32, 'buf'), nu64('idx'), u8('isEmpty')], 'priorVoters'), nu64(), // epochCredits.length
seq(struct([nu64('epoch'), nu64('credits'), nu64('prevCredits')]), offset(u32(), -8), 'epochCredits'), struct([nu64('slot'), nu64('timestamp')], 'lastTimestamp')]);

/**
 * VoteAccount class
 */
class VoteAccount {
  /**
   * @internal
   */
  constructor(args) {
    this.nodePubkey = void 0;
    this.authorizedWithdrawer = void 0;
    this.commission = void 0;
    this.rootSlot = void 0;
    this.votes = void 0;
    this.authorizedVoters = void 0;
    this.priorVoters = void 0;
    this.epochCredits = void 0;
    this.lastTimestamp = void 0;
    this.nodePubkey = args.nodePubkey;
    this.authorizedWithdrawer = args.authorizedWithdrawer;
    this.commission = args.commission;
    this.rootSlot = args.rootSlot;
    this.votes = args.votes;
    this.authorizedVoters = args.authorizedVoters;
    this.priorVoters = args.priorVoters;
    this.epochCredits = args.epochCredits;
    this.lastTimestamp = args.lastTimestamp;
  }
  /**
   * Deserialize VoteAccount from the account data.
   *
   * @param buffer account data
   * @return VoteAccount
   */


  static fromAccountData(buffer) {
    const versionOffset = 4;
    const va = VoteAccountLayout.decode(toBuffer(buffer), versionOffset);
    let rootSlot = va.rootSlot;

    if (!va.rootSlotValid) {
      rootSlot = null;
    }

    return new VoteAccount({
      nodePubkey: new PublicKey(va.nodePubkey),
      authorizedWithdrawer: new PublicKey(va.authorizedWithdrawer),
      commission: va.commission,
      votes: va.votes,
      rootSlot,
      authorizedVoters: va.authorizedVoters.map(parseAuthorizedVoter),
      priorVoters: getPriorVoters(va.priorVoters),
      epochCredits: va.epochCredits,
      lastTimestamp: va.lastTimestamp
    });
  }

}

function parseAuthorizedVoter({
  authorizedVoter,
  epoch
}) {
  return {
    epoch,
    authorizedVoter: new PublicKey(authorizedVoter)
  };
}

function parsePriorVoters({
  authorizedPubkey,
  epochOfLastAuthorizedSwitch,
  targetEpoch
}) {
  return {
    authorizedPubkey: new PublicKey(authorizedPubkey),
    epochOfLastAuthorizedSwitch,
    targetEpoch
  };
}

function getPriorVoters({
  buf,
  idx,
  isEmpty
}) {
  if (isEmpty) {
    return [];
  }

  return [...buf.slice(idx + 1).map(parsePriorVoters), ...buf.slice(0, idx).map(parsePriorVoters)];
}

/**
 * Vote account info
 */

class VoteInit {
  /** [0, 100] */
  constructor(nodePubkey, authorizedVoter, authorizedWithdrawer, commission) {
    this.nodePubkey = void 0;
    this.authorizedVoter = void 0;
    this.authorizedWithdrawer = void 0;
    this.commission = void 0;
    this.nodePubkey = nodePubkey;
    this.authorizedVoter = authorizedVoter;
    this.authorizedWithdrawer = authorizedWithdrawer;
    this.commission = commission;
  }

}
/**
 * Create vote account transaction params
 */

/**
 * Vote Instruction class
 */
class VoteInstruction {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Decode a vote instruction and retrieve the instruction type.
   */


  static decodeInstructionType(instruction) {
    this.checkProgramId(instruction.programId);
    const instructionTypeLayout = u32('instruction');
    const typeIndex = instructionTypeLayout.decode(instruction.data);
    let type;

    for (const [ixType, layout] of Object.entries(VOTE_INSTRUCTION_LAYOUTS)) {
      if (layout.index == typeIndex) {
        type = ixType;
        break;
      }
    }

    if (!type) {
      throw new Error('Instruction type incorrect; not a VoteInstruction');
    }

    return type;
  }
  /**
   * Decode an initialize vote instruction and retrieve the instruction params.
   */


  static decodeInitializeAccount(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 4);
    const {
      voteInit
    } = decodeData(VOTE_INSTRUCTION_LAYOUTS.InitializeAccount, instruction.data);
    return {
      votePubkey: instruction.keys[0].pubkey,
      nodePubkey: instruction.keys[3].pubkey,
      voteInit: new VoteInit(new PublicKey(voteInit.nodePubkey), new PublicKey(voteInit.authorizedVoter), new PublicKey(voteInit.authorizedWithdrawer), voteInit.commission)
    };
  }
  /**
   * Decode an authorize instruction and retrieve the instruction params.
   */


  static decodeAuthorize(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      newAuthorized,
      voteAuthorizationType
    } = decodeData(VOTE_INSTRUCTION_LAYOUTS.Authorize, instruction.data);
    return {
      votePubkey: instruction.keys[0].pubkey,
      authorizedPubkey: instruction.keys[2].pubkey,
      newAuthorizedPubkey: new PublicKey(newAuthorized),
      voteAuthorizationType: {
        index: voteAuthorizationType
      }
    };
  }
  /**
   * Decode a withdraw instruction and retrieve the instruction params.
   */


  static decodeWithdraw(instruction) {
    this.checkProgramId(instruction.programId);
    this.checkKeyLength(instruction.keys, 3);
    const {
      lamports
    } = decodeData(VOTE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data);
    return {
      votePubkey: instruction.keys[0].pubkey,
      authorizedWithdrawerPubkey: instruction.keys[2].pubkey,
      lamports,
      toPubkey: instruction.keys[1].pubkey
    };
  }
  /**
   * @internal
   */


  static checkProgramId(programId) {
    if (!programId.equals(VoteProgram.programId)) {
      throw new Error('invalid instruction; programId is not VoteProgram');
    }
  }
  /**
   * @internal
   */


  static checkKeyLength(keys, expectedLength) {
    if (keys.length < expectedLength) {
      throw new Error(`invalid instruction; found ${keys.length} keys, expected at least ${expectedLength}`);
    }
  }

}
/**
 * An enumeration of valid VoteInstructionType's
 */

const VOTE_INSTRUCTION_LAYOUTS = Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: struct([u32('instruction'), voteInit()])
  },
  Authorize: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('voteAuthorizationType')])
  },
  Withdraw: {
    index: 3,
    layout: struct([u32('instruction'), ns64('lamports')])
  }
});
/**
 * VoteAuthorize type
 */

/**
 * An enumeration of valid VoteAuthorization layouts.
 */
const VoteAuthorizationLayout = Object.freeze({
  Voter: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
/**
 * Factory class for transactions to interact with the Vote program
 */

class VoteProgram {
  /**
   * @internal
   */
  constructor() {}
  /**
   * Public key that identifies the Vote program
   */


  /**
   * Generate an Initialize instruction.
   */
  static initializeAccount(params) {
    const {
      votePubkey,
      nodePubkey,
      voteInit
    } = params;
    const type = VOTE_INSTRUCTION_LAYOUTS.InitializeAccount;
    const data = encodeData(type, {
      voteInit: {
        nodePubkey: toBuffer(voteInit.nodePubkey.toBuffer()),
        authorizedVoter: toBuffer(voteInit.authorizedVoter.toBuffer()),
        authorizedWithdrawer: toBuffer(voteInit.authorizedWithdrawer.toBuffer()),
        commission: voteInit.commission
      }
    });
    const instructionData = {
      keys: [{
        pubkey: votePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: nodePubkey,
        isSigner: true,
        isWritable: false
      }],
      programId: this.programId,
      data
    };
    return new TransactionInstruction(instructionData);
  }
  /**
   * Generate a transaction that creates a new Vote account.
   */


  static createAccount(params) {
    const transaction = new Transaction();
    transaction.add(SystemProgram.createAccount({
      fromPubkey: params.fromPubkey,
      newAccountPubkey: params.votePubkey,
      lamports: params.lamports,
      space: this.space,
      programId: this.programId
    }));
    return transaction.add(this.initializeAccount({
      votePubkey: params.votePubkey,
      nodePubkey: params.voteInit.nodePubkey,
      voteInit: params.voteInit
    }));
  }
  /**
   * Generate a transaction that authorizes a new Voter or Withdrawer on the Vote account.
   */


  static authorize(params) {
    const {
      votePubkey,
      authorizedPubkey,
      newAuthorizedPubkey,
      voteAuthorizationType
    } = params;
    const type = VOTE_INSTRUCTION_LAYOUTS.Authorize;
    const data = encodeData(type, {
      newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
      voteAuthorizationType: voteAuthorizationType.index
    });
    const keys = [{
      pubkey: votePubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: SYSVAR_CLOCK_PUBKEY,
      isSigner: false,
      isWritable: false
    }, {
      pubkey: authorizedPubkey,
      isSigner: true,
      isWritable: false
    }];
    return new Transaction().add({
      keys,
      programId: this.programId,
      data
    });
  }
  /**
   * Generate a transaction to withdraw from a Vote account.
   */


  static withdraw(params) {
    const {
      votePubkey,
      authorizedWithdrawerPubkey,
      lamports,
      toPubkey
    } = params;
    const type = VOTE_INSTRUCTION_LAYOUTS.Withdraw;
    const data = encodeData(type, {
      lamports
    });
    const keys = [{
      pubkey: votePubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: toPubkey,
      isSigner: false,
      isWritable: true
    }, {
      pubkey: authorizedWithdrawerPubkey,
      isSigner: true,
      isWritable: false
    }];
    return new Transaction().add({
      keys,
      programId: this.programId,
      data
    });
  }

}
VoteProgram.programId = new PublicKey('Vote111111111111111111111111111111111111111');
VoteProgram.space = 3731;

/**
 * Send and confirm a raw transaction
 *
 * If `commitment` option is not specified, defaults to 'max' commitment.
 *
 * @param {Connection} connection
 * @param {Buffer} rawTransaction
 * @param {ConfirmOptions} [options]
 * @returns {Promise<TransactionSignature>}
 */
async function sendAndConfirmRawTransaction(connection, rawTransaction, options) {
  const sendOptions = options && {
    skipPreflight: options.skipPreflight,
    preflightCommitment: options.preflightCommitment || options.commitment
  };
  const signature = await connection.sendRawTransaction(rawTransaction, sendOptions);
  const status = (await connection.confirmTransaction(signature, options && options.commitment)).value;

  if (status.err) {
    throw new Error(`Raw transaction ${signature} failed (${JSON.stringify(status)})`);
  }

  return signature;
}

const endpoint = {
  http: {
    devnet: 'http://api.devnet.solana.com',
    testnet: 'http://api.testnet.solana.com',
    'mainnet-beta': 'http://api.mainnet-beta.solana.com/'
  },
  https: {
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com/'
  }
};

/**
 * Retrieves the RPC API URL for the specified cluster
 */
function clusterApiUrl(cluster, tls) {
  const key = tls === false ? 'http' : 'https';

  if (!cluster) {
    return endpoint[key]['devnet'];
  }

  const url = endpoint[key][cluster];

  if (!url) {
    throw new Error(`Unknown ${key} cluster: ${cluster}`);
  }

  return url;
}

/**
 * There are 1-billion lamports in one SOL
 */

const LAMPORTS_PER_SOL = 1000000000;

export { Account, Authorized, BLOCKHASH_CACHE_TIMEOUT_MS, BPF_LOADER_DEPRECATED_PROGRAM_ID, BPF_LOADER_PROGRAM_ID, BpfLoader, COMPUTE_BUDGET_INSTRUCTION_LAYOUTS, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, Ed25519Program, Enum, EpochSchedule, FeeCalculatorLayout, Keypair, LAMPORTS_PER_SOL, Loader, Lockup, MAX_SEED_LENGTH, Message, NONCE_ACCOUNT_LENGTH, NonceAccount, PACKET_DATA_SIZE, PublicKey, SOLANA_SCHEMA, STAKE_CONFIG_ID, STAKE_INSTRUCTION_LAYOUTS, SYSTEM_INSTRUCTION_LAYOUTS, SYSVAR_CLOCK_PUBKEY, SYSVAR_EPOCH_SCHEDULE_PUBKEY, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, SYSVAR_RENT_PUBKEY, SYSVAR_REWARDS_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY, SYSVAR_SLOT_HISTORY_PUBKEY, SYSVAR_STAKE_HISTORY_PUBKEY, Secp256k1Program, SendTransactionError, StakeAuthorizationLayout, StakeInstruction, StakeProgram, Struct$1 as Struct, SystemInstruction, SystemProgram, Transaction, TransactionInstruction, VALIDATOR_INFO_KEY, VOTE_PROGRAM_ID, ValidatorInfo, VoteAccount, VoteAuthorizationLayout, VoteInit, VoteInstruction, VoteProgram, clusterApiUrl, sendAndConfirmRawTransaction, sendAndConfirmTransaction };
//# sourceMappingURL=web3.deno.js.map
