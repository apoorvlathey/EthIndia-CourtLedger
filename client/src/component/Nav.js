import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
export default class Nav extends Component {
    state = {
        current: "mail"
    };

    handleClick = e => {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    };
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">
                        <Icon type="home" />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/login">
                        <Icon type="login" />
                        Login
                    </Link>
                </Menu.Item>
                <Menu.Item key="addcase">
                    <Link to="/addcase">
                        <Icon type="plus-circle" />
                        Add Case
                    </Link>
                </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register">
                        <Icon type="user" />
                        Register New Lawyer
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
