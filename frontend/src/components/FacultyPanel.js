import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Drawer, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddVoucher from './AddVoucher';
import FacultyRegister from './FacultyRegister';
import AddQuestions from './QuestionForm';
import QuestionTable from './QuestionTable';
import VoucherList from './VoucherList';
import ScoreCardTable from './ScoreCardTable';

function FacultyPanel() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');
    const [data, setData] = useState({});
    const [isMinimized, setIsMinimized] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = () => {
        setOpenDialog(true);
    };

    const confirmLogout = () => {
        setOpenDialog(false);
        navigate('/');
        localStorage.clear();
    };

    const cancelLogout = () => {
        setOpenDialog(false);
    };

    const fetchData = (item) => {
        setActiveItem(item);
        axios.get(`http://localhost:8000/api/${item.toLowerCase()}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };

    useEffect(() => {
        fetchData('Voucher');
    }, []);

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setUserName(name);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setIsMinimized(true);
            } else {
                setIsMinimized(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (text) => {
        if (text === 'Add Voucher') {
            setActiveItem('AddVoucher');
        } else if (text === 'Add Exams') {
            setActiveItem('AddExams');
        } else if (text === 'Exams') {
            setActiveItem('Exams');
        } else if (text === 'Voucher') {
            setActiveItem('Voucher');
        } else if (text === 'Results') {
            setActiveItem('Results');
        } else {
            fetchData(text);
            setActiveItem(text);
        }
    };

    const renderMainContent = () => {
        if (activeItem === 'AddVoucher') {
            return <AddVoucher />;
        }
        if (activeItem === 'AddExams') {
            return <AddQuestions />;
        }
        if (activeItem === 'Exams') {
            return <QuestionTable />;
        }
        if (activeItem === 'Voucher') {
            return <VoucherList />;
        }
        if (activeItem === 'Results') {
            return <ScoreCardTable />;
        }
        return (
            <Box sx={{ mt: 2, backgroundColor: 'var(--prue-white-color)', padding: 3, borderRadius: 2, boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)' }}>
                <Typography variant="h4" sx={{ color: 'var(--dark-navy-color)' }}>{activeItem}</Typography>
                <Typography variant="body1" sx={{ color: 'var(--dark-navy-color)' }}>
                    {data ? JSON.stringify(data, null, 2) : `No data available for ${activeItem}`}
                </Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'var(--light-grey-color)' }}>
       
            <Drawer
                variant="permanent"
                sx={{
                    width: isMinimized ? 80 : 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMinimized ? 80 : 240,
                        boxSizing: 'border-box',
                        backgroundColor: 'var(--prue-white-color)',
                        borderRight: 'none',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowX: 'hidden',
                        borderRadius: 2,
                        transition: 'width 0.3s ease', 
                    },
                }}
            >
               
                <Box sx={{
                    display: 'flex',
                    flexDirection: isMinimized ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: isMinimized ? 'center' : 'space-between',
                    padding: 2,
                    
                    borderBottom: '1px solid rgba(224, 224, 224, 1);',
                    marginBottom: 2,
                    position: 'relative',
                    minHeight: isMinimized ? '64px' : 'auto',
                }}>
                    {!isMinimized && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: 'var(--dark-navy-color)' }} />
                            <Typography variant="h6" sx={{ ml: 2 }}>Hi, {userName}</Typography>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setIsMinimized(!isMinimized)}
                        sx={{
                            color: 'black',
                        
                            '&:hover': {
                                backgroundColor: 'var(--purple-color)',
                                color: 'var(--prue-white-color)',
                                
                            },
                            borderRadius: '50%',
                            padding: 1,
                            fontSize: '1.5rem',
                            position: isMinimized ? 'absolute' : 'relative',
                            bottom: isMinimized ? 10 : 'auto',
                            left: isMinimized ? 10 : 'auto',
                            top: isMinimized ? 'auto' : 10,
                            zIndex: 1,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

             
                <List sx={{ marginTop: isMinimized ? 0 : 8, flexGrow: 1 }}>
                    {[
                        { text: 'Voucher', icon: <ReceiptIcon /> },
                        { text: 'Add Voucher', icon: <ReceiptIcon /> },
                        { text: 'Exams', icon: <AssignmentIcon /> },
                        { text: 'Add Exams', icon: <AssignmentIcon /> },
                        { text: 'Results', icon: <AssessmentIcon /> },
                    ].map(({ text, icon }) => (
                        <ListItem
                            button
                            key={text}
                            selected={activeItem === text}
                            onClick={() => handleNavigation(text)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'var(--purple-color)',
                                    color: 'var(--prue-white-color)',
                                },
                                paddingLeft: isMinimized ? 1 : 2,
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px', 
                                transition: 'background-color 0.3s ease', 
                                opacity: isMinimized ? 0.7 : 1, 
                                transform: isMinimized ? 'scale(0.9)' : 'scale(1)', 
                            }}
                        >
                            <Box sx={{ mr: isMinimized ? 0 : 2, display: 'flex', justifyContent: 'center' }}>
                                {icon}
                            </Box>
                            {!isMinimized && (
                                <ListItemText primary={text} sx={{ color: 'var(--dark-navy-color)', whiteSpace: 'nowrap' }} />
                            )}
                        </ListItem>
                    ))}
                </List>

               
                <Box sx={{ marginTop: 'auto', mb: 2 }}>
                    <ListItem
                        button
                        key="Logout"
                        onClick={handleLogout}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'gray',
                                color: 'var(--prue-white-color)',
                            },
                            paddingLeft: isMinimized ? 1 : 2,
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '8px', 
                            backgroundColor: 'var(--purple-color)',
                            color: 'var(--prue-white-color)',
                            transition: 'background-color 0.3s ease', 
                            opacity: isMinimized ? 0.7 : 1, 
                            transform: isMinimized ? 'scale(0.9)' : 'scale(1)', 
                        }}
                    >
                        <Box sx={{ mr: isMinimized ? 0 : 2 }}>
                            <ExitToAppIcon sx={{ color: 'var(--prue-white-color)' }} />
                        </Box>
                        {!isMinimized && (
                            <ListItemText primary="Logout" sx={{ color: 'var(--prue-white-color)', whiteSpace: 'nowrap' }} />
                        )}
                    </ListItem>
                </Box>
            </Drawer>

          
            <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'var(--light-grey-color)' }}>
                {renderMainContent()}
            </Box>

         
            <Dialog
                open={openDialog}
                onClose={cancelLogout}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to logout?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelLogout} sx={{ color: 'var(--purple-color)', borderRadius: '20px' }}>
                        Cancel
                    </Button>
                    <Button onClick={confirmLogout} sx={{ backgroundColor: 'var(--purple-color)', borderRadius: '20px' }} variant="contained">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FacultyPanel;
