const EthCrypto = require('eth-crypto');

// create identitiy with key-pairs and address
const alice = EthCrypto.createIdentity();
// console.log(alice.publicKey)
const secretMessage = 'My name is Satoshi Buterin';

encrypt = async function (_alice, message){
    return await EthCrypto.encryptWithPublicKey(_alice.publicKey, message)
}
decrypt = async function (_alice, _encrypted) {
    return await EthCrypto.decryptWithPrivateKey(_alice.privateKey, _encrypted);
}


async function run(_alice, _secretMessage) {
    let encrypted = await encrypt(alice, _secretMessage);
    console.log(encrypted)
    let decrypted = await decrypt(alice, encrypted);
    console.log(decrypted);
}

run(alice, secretMessage)