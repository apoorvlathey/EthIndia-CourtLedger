import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/login.module.css";
import "antd/dist/antd.css";
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
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
                            {getFieldDecorator("CaseNumber", {
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
                                    placeholder="Case Number"
                                />
                            )}
                        </Form.Item>
                        <Form.Item className={styles.formBottom}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                                Proceed to Login with MetaMask
                            </Button>
                            <br />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);
export default WrappedNormalLoginForm;
