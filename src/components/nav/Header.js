import React, { useState,useEffect } from "react";
import { Link,withRouter } from 'react-router-dom';
import { Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";


const { SubMenu, Item } = Menu;

const Header = ({history}) => {

    const currentPath = history.location.pathname

    const [
        current, 
        setCurrent] = useState(currentPath);

    const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
    };


    
    
    useEffect(() => {
        //setCurrent(history.location.pathname)
    }, [])

    //console.log(history.location.pathname)

    return (
    <Menu onClick={handleClick} selectedKeys={[currentPath]} mode="horizontal">
            <Item key="/" icon={<AppstoreOutlined />}>
                <Link to='/'>
                    Home
                </Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>

            <Item key="/register" icon={<UserAddOutlined />} className="float-right" >
                <Link to='/register'>
                    Register
                </Link>
            </Item>

            <Item key="/login" icon={<UserOutlined />} className="float-right">
                <Link to ='/login'>
                    Login
                </Link>
                
            </Item>
    </Menu>
    );
};

export default withRouter(Header);