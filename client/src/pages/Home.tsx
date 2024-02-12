import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Divider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    notes: Note[];
    onDeleteNote: (index: number) => void;
}

const Home: React.FC<HomeProps> = ({ notes, onDeleteNote }) => {
    const navigate = useNavigate();

    const handleEditNote = (index: number) => {
        navigate(`/note/edit/${index}`);
    };

    const handleViewNote = (index: number) => {
        navigate(`/note/view/${index}`);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            p: 2,
            marginTop: '64px',
            width: '440px',
            height: 'calc(100vh - 96px)',
            overflowY: 'auto'
        }}>
            <List sx={{
                width: '100%',
                maxWidth: 'inherit',
            }}>
                {notes.map((note, index) =>
                    <ListItem
                        key={index}
                        sx={{
                            cursor: 'pointer',
                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            width: '100%',
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: '4px',
                            marginBottom: '8px',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s ease',
                        }}
                        onClick={() => handleViewNote(index)}
                        disableGutters
                    >
                        <ListItemText
                            primary={note.title}
                            primaryTypographyProps={{ sx: { color: 'white' } }}
                            secondary={note.content.substring(0, 10) + '...'}
                            secondaryTypographyProps={{ sx: { color: 'white' } }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton sx={{ marginRight: 2 }} edge="end" onClick={(e) => { e.stopPropagation(); handleEditNote(index); }}>
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    <EditIcon sx={{ color: "#fff" }} />
                                </Box>
                            </IconButton>
                            <IconButton sx={{ marginRight: 2 }} edge="end" onClick={(e) => { e.stopPropagation(); onDeleteNote(index); }}>
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    <DeleteIcon sx={{ color: "#fff" }} />
                                </Box>
                            </IconButton>
                        </ListItemSecondaryAction>
                        <Divider />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default Home;
