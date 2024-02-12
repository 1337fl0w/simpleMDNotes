import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/')
    }, []);

    const handleExtensionNameClick = () => {
        navigate('/');
    };

    const handleAddNoteClick = () => {
        navigate('/note');
    };

    return (
        <AppBar position="fixed" color="default" elevation={1} sx={{ width: '100%' }}>
            <Toolbar>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleExtensionNameClick}>
                    Simple MDNotes
                </Typography>
                <IconButton color="inherit" onClick={handleAddNoteClick}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "transparent",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }
                    }}>
                        <AddIcon />
                    </Box>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
