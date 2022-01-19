import React, {Component} from 'react';
import cookie from 'react-cookie'
import './Header.css'

class Header extends Component {
    handleLoginOut = () => {
        cookie.remove('username', { path: '/' })
        cookie.remove('loginSuccess', { path: '/' })
        window.location.href = '/'
    }
    render () {
        const username = cookie.load('username')
        return (
            <div className="myHeader">
                <div id="webTitle" onClick={() => {window.location.href = username !== undefined ? '/index' : '/login'}}>
                    <img src='../../images/logo.png' alt='logo' id='logo'/>
                    <mark>
                        <span className='myTitle'><i className="myFont">嘉</i></span>
                        <span className='myTitle'><i className="myFont">日</i></span>
                        <span className='myTitle'><i className="myFont">单</i></span>
                        <span className='myTitle'><i className="myFont">词</i></span>
                    </mark>
                </div>
            </div>
        );
    }
}

export default Header;