import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";


const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");

    const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
    };

    
    console.log()

    useEffect(() => {
        
    }, [current])


    return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to='/'>
                    Home
                </Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to='/register'>
                    Register
                </Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to ='/login'>
                    Login
                </Link>
                
            </Item>
    </Menu>
    );
};

export default Header;