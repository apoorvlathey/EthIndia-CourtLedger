import React, { Component } from 'react';
import Layout from '../component/layout.js';
import '../App.css';
import Web3 from 'web3';
import Nav from "../component/Nav.js";
import Main from "../component/Main.js";
import Court from "../contracts/Court.json"


class Dapp extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        console.log("CURRENT ACCOUNT IS: " + this.state.account)

        const networkId = await web3.eth.net.getId()
        const networkData = Court.networks[networkId]
        if (networkData) {
            const court = new web3.eth.Contract(Court.abi, networkData.address)
            this.setState({ court })
            this.setState({ GAS: 500000, GAS_PRICE: "20000000000" })
            // const func = await court.methods.func(params).call()
            this.setState({ loading: false })
        } else {
            window.alert('Court contract not deployed to detected network.')
        }
    }

    async loginUser(caseId) {
        const { account, court } = this.state
        var owner, judge, lawyer1, lawyer2
        await court.methods.owner.call((err, res) => {
            owner = res
        })
        await court.methods.cases[caseId].judge.call((err, res) => {
            judge = res
        })
        await court.methods.cases[caseId].lawyer1.call((err, res) => {
            lawyer1 = res
        })
        await court.methods.cases[caseId].lawyer2.call((err, res) => {
            lawyer2 = res
        })

        if (account === owner) {
            // can upload & view
            console.log("this is owner")
        } else if (account === judge || account === lawyer1 || account === lawyer2) {
            //can view
            console.log("user can view")
        } else {
            console.log("user not auth")
        }
    }

    async registerLawyer(name, phone, email, address, pubkey) {
        const { account, court, GAS, GAS_PRICE } = this.state
        await court.methods.registerLawyer(name, phone, email, address, pubkey).send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
            .then(r => {
                console.log(r)
                // get Lawyer ID
            })
            .catch(e => {
                console.log(e)
            })
    }

    async registerJudge(name, phone, email, address, pubkey) {
        const { account, court, GAS, GAS_PRICE } = this.state
        await court.methods.registerJudge(name, phone, email, address, pubkey).send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
            .then(r => {
                console.log(r)
                // get Judge ID
            })
            .catch(e => {
                console.log(e)
            })
    }

    async newCase(judgeId, lawyer1Id, lawyer2Id, party1name, party2name, details) {
        const { account, court, GAS, GAS_PRICE } = this.state
        await court.methods.newCase(judgeId, lawyer1Id, lawyer2Id, party1name, party2name, details).send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
            .then(r => {
                console.log(r)
                // get Case ID
            })
            .catch(e => {
                console.log(e)
            })
    }

    async uploadEvidence(caseId, filehash, filetype) {
        const { account, court, GAS, GAS_PRICE } = this.state
        await court.methods.uploadEvidence(caseId, filehash, filetype).send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
    }

    async getEvidenceCount(caseId) {
        const { court } = this.state
        await court.methods.getEvidenceCount(caseId).call((err, res) => {
            console.log(res)
            return (res)
        })
    }

    async getEvidence(caseId, evidenceNo) {
        const { court } = this.state
        await court.methods.getEvidence(caseId, evidenceNo).call((err, res) => {
            console.log(res)
            //FileHash, FileType (JSON)
            return (res)
        })
    }

    async addEncryptedKey(isLawyer, ljId, caseId, key) {
        const { account, court, GAS, GAS_PRICE } = this.state
        await court.methods.addEncryptedKey(isLawyer, ljId, caseId, key).send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
    }

    async getEncryptedKey(isLawyer, ljId, caseId) {
        const { court } = this.state
        await court.methods.getEncryptedKey(caseId).call((err, res) => {
            console.log(res)
            return (res)
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            loading: true,
            court: '',
            GAS: '',
            GAS_PRICE: ''
        }
    }


    render() {
        var passableItems = {
            court: this.state.court,
            account: this.state.account,
            GAS: this.state.GAS,
            GAS_PRICE: this.state.GAS_PRICE
        }
        return (
            <div>
                <Nav />
                <Main passableItems={passableItems} />
            </div>
        );
    }
}
export default Dapp;

