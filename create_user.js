const EthCrypto = require('eth-crypto');
const alice = EthCrypto.createIdentity();
console.log(alice);

// {
//     address: '0x809C816d1AbEF3Ff01108DB1C1Cce00698Dc290F',
//     privateKey: '0xc90624630837b22cd1dde951bf441c7f4636a4e1b7d5918f3764b14b82d17456',
//     publicKey: 'bf6b78a26b7abc11f9e59da81e2fade5be67de7af914df64119598d70536862b87bc1344db520d902fc0468f8b262b7e14b1a1fef38a5a9a45c6ae4f4c8a993e'
// }