import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/addCase.module.css";
import "antd/dist/antd.css";
class AddCase extends Component {
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
                            {getFieldDecorator("addcase", {
                                rules: [

                                ]
                            })(<>
                                <h2> Add Case </h2>
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Judge Address"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Lawyer 1 "
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Lawyer 2"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="info"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Case Details"
                                />
                                <Input
                                    prefix={
                                        <Icon
                                            type="number"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Unique Case Number"
                                />
                            </>
                            )}
                        </Form.Item>
                        <Form.Item className={styles.formBottom}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                                Proceed to Ading the case
                            </Button>
                            <br />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalAddCaseForm = Form.create({ name: "add_case" })(AddCase);
export default WrappedNormalAddCaseForm;
