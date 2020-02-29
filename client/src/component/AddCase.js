import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/addCase.module.css";
import "antd/dist/antd.css";
import loading from "../loading.gif";
class AddCase extends Component {
  handleSubmit = e => {
    e.preventDefault();
    var lg = document.body.querySelector("#loadinggif");
    lg.style = "display:inline";
    var p = this.props.passableItems;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.newCase(
          values.JudgeId,
          values.Lawyer1Id,
          values.Lawyer2Id,
          values.Party1,
          values.Party2,
          values.Details,
          p
        );
      }
    });
  };

  async newCase(
    judgeId,
    lawyer1Id,
    lawyer2Id,
    party1name,
    party2name,
    details,
    p
  ) {
    const { account, court, GAS, GAS_PRICE } = p;
    var h3 = document.body.querySelector("#lawyerId");
    h3.style = "display:none";
    await court.methods
      .newCase(judgeId, lawyer1Id, lawyer2Id, party1name, party2name, details)
      .send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
      .then(r => {
        console.log(r);
        // get Case ID
        h3.style = "display:block";
        var lg = document.body.querySelector("#loadinggif");
        lg.style = "display:none";
        this.getValue(court);
      })
      .catch(e => {
        console.log(e);
      });
  }
  getValue = async court => {
    var events = await court.events
      .caseCreated({ fromBlock: 0 })
      .on("data", event => {
        this.setState({ lawyerId: event.returnValues._caseId });
      })
      .on("changed", function (event) {
        console.log("NEWWW", event);
      })
      .on("error", console.error);
  };
  async checkAuth(props) {
    // console.log(props)
    const { account, court } = this.props.passableItems;
    // console.log("HII", account, court);
    var owner;
    await court.methods.owner().call((err, res) => {
      owner = res;
    });
    // console.log(owner)
    if (owner === account) {
      this.setState({ auth: true });
    }

  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      loading: true,
      auth: false
    };
  }
  async componentDidMount() {
    await this.checkAuth(this.props);
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      this.state.auth ? (<div className={styles.parentContainer}>
        <div className={styles.containerForm}>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{ margin: "2em" }}
          >
            <h2> Add Case </h2>
            <Form.Item>
              {getFieldDecorator("JudgeId", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Judge Id"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Lawyer1Id", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Lawyer 1 ID"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Lawyer2Id", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Lawyer 2 ID"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Party1", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Party 1"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Party2", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Party2 Name"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("Details", {
                rules: []
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Details"
                />
              )}
            </Form.Item>

            <Form.Item className={styles.formBottom}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Proceed to Add the case
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
              Your Case Id is: {this.state.lawyerId}
            </h3>
          </Form>
        </div>
      </div>) : (<h1> YOU ARE NOT AN ADMIN</h1>)
    );
  }
}

const WrappedNormalAddCaseForm = Form.create({ name: "add_case" })(AddCase);
export default WrappedNormalAddCaseForm;
