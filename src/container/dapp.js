import React, { Component } from 'react';
import Layout from '../component/layout.js';
import '../App.css';
import Web3 from 'web3';
import Nav from "../component/Nav.js";
import Main from "../component/Main.js";
// import Court from '../abis/Court';


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
        const networkId = await web3.eth.net.getId()
        // const networkData = Court.networks[networkId]
        // if (networkData) {
        //     const court = web3.eth.Contract(Court.abi, networkData.address)
        //     this.setState({ court })
        //     const func = await court.methods.func(params).call()
        //     this.setState({ loading: false })
        // } else {
        //     window.alert('Court contract not deployed to detected network.')
        // }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            loading: true,
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <Main />
            </div>
        );
    }
}
export default Dapp;

