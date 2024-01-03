import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useState } from "react";

export default function Header(){
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token")
        navigate('/login')
    };
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <IconButton>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <h2>MUI - Tutorial</h2>
                    <Box sx={{flexGrow: 1}}></Box>
                    <div>
                        <Link to="/dashboard" style={{  color: 'white', marginRight: '10px', textDecoration: "none"}}>Dashboard</Link>
                        <Link to="/product" style={{ color: 'white', marginRight: '10px', textDecoration: "none" }}>Product</Link>
                        <Link to="/user" style={{  color: 'white', textDecoration: "none"}}>User</Link>
                        <IconButton onClick={handleClick}>
                            <AccountCircle></AccountCircle>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        
    )
}