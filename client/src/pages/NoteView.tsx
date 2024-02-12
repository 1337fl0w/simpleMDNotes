import React, { useState } from 'react';
import { Box, Typography, Divider, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface NoteViewProps {
    note: Note;
    index: number;
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
}

const NoteView: React.FC<NoteViewProps> = ({ note, index, onDelete, onEdit }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // Track SpeedDial open state

    const actions = [
        { icon: <ArrowBackIcon />, name: 'Back', action: () => navigate('/') },
        { icon: <EditIcon />, name: 'Edit', action: () => onEdit(index) },
        { icon: <DeleteIcon />, name: 'Delete', action: () => onDelete(index) },
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            p: 2,
            marginTop: '64px',
            width: '440px',
            height: 'calc(100vh - 96px)',
            overflowY: 'auto'
        }}>
            <Typography variant="h4" gutterBottom>{note.title}</Typography>
            <Divider sx={{ width: '100%', mb: 2 }} />
            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                FabProps={{
                    sx: {
                        backgroundColor: open ? "white" : "rgba(255, 255, 255, 0.1)",
                        color: open ? "GrayText" : "#fff",
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "#fff",
                            '& .MuiSvgIcon-root': {
                                color: open ? "GrayText" : "#fff",
                            },
                        },
                        transition: "all 0.3s ease-in-out",
                    }
                }}
                icon={<SpeedDialIcon icon={open ? <MenuIcon /> : <MoreVertIcon />} openIcon={<MenuIcon />} />}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open={open}
                direction="left"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.action}
                        FabProps={{
                            sx: {
                                borderRadius: "50%",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    "& .MuiSvgIcon-root": {
                                        color: "#fff",
                                    }
                                }
                            }
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};

export default NoteView;
