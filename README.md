# CourtLedger

A simple, decentralized and tamper-proof solution for storing evidences for court proceedings.
![Courtledger Evidences Page](https://i.imgur.com/LSM8d5p.png)

## Stack Used
1. Solidity
2. Moibit
3. React.js
4. Web3.js
5. Matic Network

## Project Initialization
(Project is deployed on the Matic network with network_id 8995, adjust metamask accordingly)

1. Deploy smart contracts to Matic Network: ``truffle migrate --network matic``
2. Run Frontend: ``cd client`` then ``npm start``

## Screenshots
1. Admin Registers new Lawyers (and Judges)
![](https://i.imgur.com/QSdzZD1.png)

2. Download unique private key
![](https://i.imgur.com/PgpTdYv.png)

3. Get a Lawyer Id
![](https://i.imgur.com/8WTUECi.png)

4. Admin (Ethereum account) creates a new Case
![](https://i.imgur.com/KhSExIf.png)

5. Login via Metamask
![](https://i.imgur.com/mljboxr.png)

6. Evidence Dashboard opens up
![](https://i.imgur.com/TJX4pCV.png)

* Judges and Lawyers can only view the Evidences. Admin has the right to upload new evidences. Rest other users are not authorized to protect senesitive information.
## The problem CourtLedger solves
There have been various cases in which a courthouse reopened a case after several years and it was found that some evidence was either missing or had been tampered with. This is a big issue in countries like India where there is very minimal digitization of such documents and it has been a great obstruction in strengthening our judicial systems. We have come up with a solution that will allow court proceedings to be stored digitally on Moibits decentralized storage with every record stored on the ethereum blockchain. We have 3 main users, one is the admin(or the state), judge, and lawyers. Every one of them can register themselves on our platform and can log in to a particular case(which they have access to) and get the corresponding files.
Admin has the right to add cases and add evidence into the cases as well, which makes it similar to the existing procedure but a lot more secure. The case files are also stored in an encrypted format which can be decrypted only by a case's private key which is only provided to authorized users. (Not visible to them though, it just works in the background for decryption). We have used various public-private key pairs to ensure security and enforce access control. Lawyers and judges can register themselves and view the cases they have access to, and the admin can add cases, add evidence and view the case files. This provides a streamlined process for the users (lawyers and judge) to take care of evidence and look them up whenever needed.
The evidence files are stored encrypted (with the public key of the case ) in the decentralized storage, so even if the storage is compromised an attacker can never know the content unless and until he has the private key of the case. The private key of the case is also encrypted with an authorized users public key and stored on the smart contract, so an authenticated user can view the files by decrypting them with private key of case that in turn has to be decrypted by their own private key first.

## Challenges we ran into
The toughest task of this project was to maintain security and provide access control mechanisms. We had to use public-key cryptography and also had to provide each user with their own public and private key pair, (as there was no way in metamask to encrypt a message with user B's public key and for him to decrypt it) so we had to build our own key system while also keeping them connected with the metamask address of the user to verify whether that account was authorized or not. After asking various people on Discord and also emailing metamask we found out that the best way was to maintain our own encryption service while keeping them linked to the metamask address. We included all this in our smart contract.
