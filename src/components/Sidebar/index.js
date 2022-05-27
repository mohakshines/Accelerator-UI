import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
                <img src={logo} height='50px' width='50px' style={{ borderRadius: '20%' }} alt="img" />
                <div>
                    <h1 className='heading'>&nbsp;&nbsp;AEROTHON <i>ACCELERATOR</i></h1>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <CloseIcon onClick={showSidebar} className='cross-icon' />
                <div className='nav-menu-image'>
                    <img src={logo} style={{ borderRadius: '20%', marginTop: '20px' }} alt="img" />
                </div>
                <h1 className='nav-menu-heading'>&nbsp;&nbsp;AEROTHON <i>ACCELERATOR</i></h1>
            </nav>
        </>
    )
}

export default Sidebar
