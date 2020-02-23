import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/register.module.css";
import "antd/dist/antd.css";
class Register extends Component {
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
                            })(<>
                                <h2> Add User (Lawyer/Judge) </h2>
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Name"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="mail"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="number"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Phone Number"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Unique Id Number"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="info"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="District"
                                />
                            </>
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
