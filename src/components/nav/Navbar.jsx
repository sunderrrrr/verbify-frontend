import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { getAuthData } from '../utils/storage';

function Navbar() {
    const { token } = getAuthData();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                {token && (
                    <Button color="inherit" href="/home">
                        Профиль
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;