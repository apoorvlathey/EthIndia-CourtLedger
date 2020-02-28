import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/register.module.css";
import "antd/dist/antd.css";
const EthCrypto = require('eth-crypto');


class Register extends Component {

    downloadPrivateKey(_blobData) {
        var blob = new Blob([_blobData + '\n' + 'keep this key saved'], { type: 'text/plain' })
        let url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        document.body.appendChild(a);
        a.style = "display:none"
        a.href = url
        a.download = "private_key"
        a.click()
        document.body.removeChild(a)
        document.location.reload();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const person = EthCrypto.createIdentity();
                console.log('add public key to contract');
                this.downloadPrivateKey(person['privateKey']);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.parentContainer}>
                <div className={styles.containerForm}>
                    <Form
                        onSubmit={this.handleSubmit}
                        className="login-form"
                        style={{ margin: "2em" }}>
                        <Form.Item>
                            {getFieldDecorator("Name", {
                                rules: [

                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Name"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("Email", {
                                rules: [

                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="mail"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("Phone_number", {
                                rules: [

                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="number"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Phone Number"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("ID_Num", {
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
                                    placeholder="Unique Id Number"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
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
                        </Form.Item>

                        <Form.Item className={styles.formBottom}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                                Proceed to Adding the user
                            </Button>
                            <br />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalRegisterForm = Form.create({ name: "register" })(Register);
export default WrappedNormalRegisterForm;
