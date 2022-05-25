import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from "./logo.png";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <div className='navbar' style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div>
                    <div to='#' className='menu-bars'>
                        <MenuIcon onClick={showSidebar} fontSize='large' />
                    </div>
                </div>
                <img src={logo} height='50px' width='50px' style={{ borderRadius: '20%' }} />
                <div>
                    <h1 style={{ color: 'white', fontWeight: 600, letterSpacing: '1px' }}>&nbsp;&nbsp;Aerothon <i>ACCELERATOR</i></h1>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className='navbar-toggle' onClick={showSidebar}>
                    <div className='cross-icon'>
                        <CloseIcon />
                    </div>
                </div>
                <img src={logo} height='150px' width='150px' style={{ borderRadius: '20%', marginTop: '20px' }} />
                <div>
                    <h1 style={{ color: 'white', fontWeight: 600, letterSpacing: '1px', fontSize: '4rem' }}>&nbsp;&nbsp;Aerothon <i>ACCELERATOR</i></h1>
                </div>
            </nav>
        </>
    )
}

export default Sidebar
