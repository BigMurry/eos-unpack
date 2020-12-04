const unpackTx = require('./');
const rawTx = '6AB1C55F9266129C3D9C000000000100A6823403EA3055000000572D3CCDCD01408608D91D7F305500000000A8ED32322A408608D91D7F305580A98A48A169A63B40787D010000000004454F53000000000931303532323836343000';

const unpacked = unpackTx(rawTx);

console.log(JSON.stringify(unpacked, null, 2));