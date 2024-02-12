import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Fab } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CustomTextField from '../components/CustomTextField';

// Initialize a markdown parser
const mdParser = new MarkdownIt();

interface NoteProps {
    note?: Note;
    index?: number;
    addOrUpdateNote: (note: Note, index?: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, index, addOrUpdateNote }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    const handleEditorChange = ({ text }: { html: string; text: string }) => {
        setContent(text);
    };

    const saveNote = () => {
        if (title && content) {
            const newNote = { title, content };
            addOrUpdateNote(newNote, index);
            navigate('/');
        } else {
            alert('Please add a title and content to your note.');
        }
    };

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

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
            overflow: 'hidden',
        }}>
            <CustomTextField
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter Title Here"
            />
            <MdEditor
                value={content}
                style={{ height: "300px", width: '100%' }}
                renderHTML={(text: any) => mdParser.render(text)}
                onChange={handleEditorChange}
            />

            <Fab aria-label="save" onClick={saveNote} sx={{
                position: 'fixed', bottom: 16, right: 16, backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                "&:hover": {
                    backgroundColor: "#fff",
                    color: "#fff",
                    '& .MuiSvgIcon-root': {
                        color: "GrayText",
                    },
                },
            }}>
                <SaveIcon />
            </Fab>
        </Box>
    );
};

export default Note;
