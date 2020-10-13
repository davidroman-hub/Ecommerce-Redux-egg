import React, { useState,useEffect } from "react";
import { Link,withRouter, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import { Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined
} from "@ant-design/icons";



const { SubMenu, Item } = Menu;

const Header = ({history}) => {

    const currentPath = history.location.pathname

    const [
        current, 
        setCurrent] = useState(currentPath);

    let dispatch = useDispatch();
    let {user} = useSelector((state) => ({...state}) ) // to access to user in the state redux
    let historyRedirect = useHistory();    

    const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type:'LOGOUT',
            payload:null,
        });
        historyRedirect.push('/login')
    }

    
    useEffect(() => {
        //
    }, [])


    return (
    <Menu onClick={handleClick} selectedKeys={[currentPath]} mode="horizontal">
            <Item key="/" icon={<AppstoreOutlined />}>
                <Link to='/'>
                    Home
                </Link>
            </Item>
            {/* If exist user */}
            {user && (
                <>
                    <SubMenu icon={<SettingOutlined />}
                        title={user.email && user.email.split('@')[0] } 
                        //name@gmail.com ['name', '@gmail.com'] // we gonna divide and gran only the first part
                        //remember in the arrays start with 0 , and the first part (name) its 0  then
                        className='float-right'>
                        <Item key="setting:1">Option 1</Item>
                        <Item key="setting:2">Option 2</Item>
                        <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
                    </SubMenu>
                </>
            )}

            {/* If not user show: */}
            {!user && (
            <>
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
            </>
            )}
    </Menu>
    );
};

export default withRouter(Header);