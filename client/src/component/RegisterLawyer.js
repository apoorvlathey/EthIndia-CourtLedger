import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/register.module.css";
import "antd/dist/antd.css";
import loading from "../loading.gif";
const EthCrypto = require("eth-crypto");

class Register extends Component {
  async registerLawyer(name, phone, email, address, pubkey, p) {
    const { account, court, GAS, GAS_PRICE } = p;
    console.log(court);
    await court.methods
      .registerLawyer(name, phone, email, address, pubkey)
      .send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
      .then(r => {
        console.log(r);
        //get Lawyer Id
        var h3 = document.body.querySelector("#lawyerId");
        h3.style = "display:block";
        this.getValue(court);
        var lg = document.body.querySelector("#loadinggif");
        lg.style = "display:none";
      });
  }

  getValue = async court => {
    var events = await court.events
      .lawyerRegistered({ fromBlock: 0 })
      .on("data", event => {
        this.setState({ lawyerId: event.returnValues._lawyerId });
      })
      .on("changed", function (event) {
        console.log("NEWWW", event);
      })
      .on("error", console.error);
  };
  downloadPrivateKey(_blobData) {
    var blob = new Blob([_blobData + "\n" + "keep this key saved"], {
      type: "text/plain"
    });
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display:none";
    a.href = url;
    a.download = "private_key";
    a.click();
    document.body.removeChild(a);
    // document.location.reload();
  }

  handleSubmit = e => {
    e.preventDefault();
    var lg = document.body.querySelector("#loadinggif");
    lg.style = "display:inline";
    var p = this.props.passableItems;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const person = EthCrypto.createIdentity();
        console.log("add public key to contract", person.publicKey);
        var name = values.Name;
        var email = values.Email;
        var phone = values.Phone_number;
        var address = p.account;
        var pubk = person.publicKey;
        // console.log(name, email, phone, address)
        this.registerLawyer(name, phone, email, address, pubk, p);
        this.downloadPrivateKey(person["privateKey"]);
      }
    });
  };

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      lawyerId: ''
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.parentContainer}>
        <div className={styles.containerForm}>
          <h1>Register Lawyer</h1>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{ margin: "2em" }}
          >
            <Form.Item>
              {getFieldDecorator("Name", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Name"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Email", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Phone_number", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Phone Number"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Address", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder={`Eth address: ${this.props.passableItems.account}`}
                  disabled
                />
              )}
            </Form.Item>
            {/* <Form.Item>
                            {getFieldDecorator("District", {
                                rules: [

                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="info"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="District"
                                />
                            )}
                        </Form.Item> */}
            {/* <Form.Item>
                            {getFieldDecorator("PublicKey", {
                                rules: [

                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Public Key"
                                />
                            )}
                        </Form.Item> */}

            <Form.Item className={styles.formBottom}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Proceed to Add the user
              </Button>
              <br />
              <img
                style={{ display: "none" }}
                id="loadinggif"
                src={loading}
                alt=""
                height="100px"
              />
              <br />
            </Form.Item>
            <h3 id="lawyerId" style={{ display: "none" }}>
              Your Lawyer Id is: {this.state.lawyerId}
            </h3>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedNormalRegisterForm = Form.create({ name: "register" })(Register);
export default WrappedNormalRegisterForm;
