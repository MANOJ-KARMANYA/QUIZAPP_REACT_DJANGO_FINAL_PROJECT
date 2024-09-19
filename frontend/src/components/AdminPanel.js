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
import FacultyTable from './FacultyTable';
import VoucherList from './VoucherList';
import ScoreCardTable from './ScoreCardTable';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [data, setData] = useState({});
  const [isMinimized, setIsMinimized] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const confirmLogout = () => {
    handleLogout();
    setOpenLogoutDialog(false);
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
    } else if (text === 'Add Faculty') {
      setActiveItem('AddFaculty');
    } else if (text === 'Add Exams') {
      setActiveItem('AddExams');
    } else if (text === 'Exams') {
      setActiveItem('Exams');
    } else if (text === 'Faculty') {
      setActiveItem('Faculty');
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
    if (activeItem === 'AddFaculty') {
      return <FacultyRegister />;
    }
    if (activeItem === 'AddExams') {
      return <AddQuestions />;
    }
    if (activeItem === 'Exams') {
      return <QuestionTable />;
    }
    if (activeItem === 'Faculty') {
      return <FacultyTable />;
    }
    if (activeItem === 'Voucher') {
      return <VoucherList />;
    }
    if (activeItem === 'Results') {
      return <ScoreCardTable />;
    }
    return (
      <Box sx={{ mt: 2, backgroundColor: 'var(--prue-white-color)', padding: 3, borderRadius: 2, boxShadow: '0px 16px 40px rgba(143, 160, 193, 0.14)' }}>
        <Typography variant="h4" sx={{ color: 'var(--prue-white-color)' }}>{activeItem}</Typography>
        
        <Typography variant="body1" sx={{ color: 'var(--prue-white-color)' }}>
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
              <Typography variant="h6" sx={{ ml: 2 }}>Hi, Admin</Typography>
            </Box>
          )}
          <IconButton
            onClick={() => setIsMinimized(!isMinimized)}
            sx={{
              color: 'black',
              backgroundColor: 'transparent',
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
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

   
        <List sx={{ marginTop: isMinimized ? 0 : 8, flexGrow: 1 }}>
          {[{
            text: 'Voucher', icon: <ReceiptIcon />
          }, {
            text: 'Add Voucher', icon: <ReceiptIcon />
          }, {
            text: 'Faculty', icon: <PeopleIcon />
          }, {
            text: 'Add Faculty', icon: <PeopleIcon />
          }, {
            text: 'Exams', icon: <AssignmentIcon />
          }, {
            text: 'Add Exams', icon: <AssignmentIcon />
          }, {
            text: 'Results', icon: <AssessmentIcon />
          }].map(({ text, icon }) => (
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
                borderRadius: 1,
                transition: 'background-color 0.3s ease', 
                '&:hover': {
                  backgroundColor: 'var(--purple-color)',
                  color: 'var(--prue-white-color)',
                },
                borderRadius: '8px', 
                opacity: isMinimized ? 0.5 : 1, 
                transition: 'opacity 0.3s ease',
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
            onClick={handleLogoutConfirm}
            sx={{
              '&:hover': {
                backgroundColor: 'gray',
                color: 'var(--prue-white-color)',
              },
              backgroundColor: 'var(--purple-color)',
              color: 'var(--prue-white-color)',
              borderRadius: '8px', 
              opacity: isMinimized ? 0.5 : 1, 
              transition: 'opacity 0.3s ease', 
            }}
          >
            <Box sx={{ mr: 2 }}>
              <ExitToAppIcon />
            </Box>
            {!isMinimized && (
              <ListItemText primary="Logout" sx={{ color: 'var(--prue-white-color)' }} />
            )}
          </ListItem>
        </Box>
      </Drawer>

      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto',
          backgroundColor: 'var(--light-grey-color)',
          borderRadius: '8px',
        }}
      >
        {renderMainContent()}
      </Box>

      
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: 'var(--purple-color)', borderRadius: '20px' }}>
            Cancel
          </Button>
          <Button onClick={confirmLogout} sx={{ backgroundColor: 'var(--purple-color)', borderRadius: '20px' }} variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;



// import { Box, List, ListItem, ListItemText, Drawer, IconButton, Typography } from '@mui/material';
// import axios from 'axios';




// import React, { useState , useEffect,} from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // SVG Imports
// import logo from "../panel/assets/logo.svg";
// import Home from "../panel/assets/home-solid.svg";
// import Forum from "../panel/assets/Forum.svg";
// import Team from "../panel/assets/social.svg";
// import Calender from "../panel/assets/sceduled.svg";
// import Projects from "../panel/assets/starred.svg";
// import Documents from "../panel/assets/draft.svg";
// import PowerOff from "../panel/assets/power-off-solid.svg";


// // Import Comp
// import AddVoucher from './AddVoucher'; // Import the AddVoucher component
// import FacultyRegister from './FacultyRegister';
// import AddQuestions from './QuestionForm';
// import QuestionTable from './QuestionTable';
// import FacultyTable from './FacultyTable';
// import VoucherList from './VoucherList';
// import ScoreCardTable from './ScoreCardTable';



// const Container = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Button = styled.button`
//   background-color: var(--black);
//   border: none;
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 50%;
//   margin: 0.5rem 0 0 0.5rem;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   &::before,
//   &::after {
//     content: "";
//     background-color: var(--white);
//     height: 2px;
//     width: 1rem;
//     position: absolute;
//     transition: all 0.3s ease;
//   }
//   &::before {
//     top: ${(props) => (props.clicked ? "1.5" : "1rem")};
//     transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
//   }
//   &::after {
//     top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
//     transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
//   }
// `;

// const SidebarContainer = styled.div`
//   background-color: var(--black);
//   width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
//   height: 100vh; /* Ensuring full height */
//   border-radius: 0 30px 30px 0;
//   padding: 1rem 0;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   position: relative;
//   transition: width 0.5s ease;
//   overflow: hidden; /* Ensures no overflow */
// `;

// const Logo = styled.div`
//   width: 2rem;
//   img {
//     width: 100%;
//     height: auto;
//   }
// `;

// const SlickBar = styled.ul`
//   color: var(--white);
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: var(--black);
//   padding: 2rem 0;
//   width: 100%;
//   overflow-y: auto; /* Allows vertical scrolling */
//   height: calc(100% - 4rem); /* Adjust based on logo and logout space */
// `;

// const Item = styled(NavLink)`
//   text-decoration: none;
//   color: var(--white);
//   width: 100%;
//   padding: 1rem 0;
//   cursor: pointer;
//   display: flex;
//   padding-left: 1rem;
//   &:hover {
//     border-right: 4px solid var(--white);
//     img {
//       filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
//     }
//   }
//   img {
//     width: 1.2rem;
//     height: auto;
//     filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg) brightness(78%) contrast(85%);
//   }
// `;

// const Text = styled.span`
//   width: ${(props) => (props.clicked ? "100%" : "0")};
//   overflow: hidden;
//   margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
//   transition: all 0.3s ease;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
//   padding: 1rem;
//   overflow-y: auto; /* Allows vertical scrolling */
//   transition: margin-left 0.5s ease;
// `;

// const Sidebar = () => {

//   const navigate = useNavigate();
//   const [click, setClick] = useState(false);
//   const [data, setData] = useState({});

//   const [activeItem, setActiveItem] = useState('');

//   const [isMinimized, setIsMinimized] = useState(false);


//   const fetchData = (item) => {
//     setActiveItem(item);
//     axios.get(`http://localhost:8000/api/${item.toLowerCase()}`)
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the data!", error);
//       });
//   };

//   useEffect(() => {
//     fetchData('Voucher');
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 600) { // Adjust this value as needed
//         setIsMinimized(true);
//       } else {
//         setIsMinimized(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial check

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


//   const handleClick = () => setClick(!click);

//   const handleLogout = () => {
//     const isConfirmed = window.confirm('Are you sure you want to log out?');
//     if (isConfirmed) {
//       localStorage.clear(); // Clear all local storage items
//       navigate('/');
//     } else {
//       console.log('Logout cancelled');
//     }
//   };


//   return (
//     <Container>

//       <SidebarContainer clicked={click}>
//       <Button clicked={click} onClick={() => handleClick()}>
        
//         </Button>
//         <Logo>
//           <img src={logo} alt="logo" />
//         </Logo>
//         <SlickBar clicked={click} onClick={() => handleClick()}>
//           <Item onClick={() => setClick(false)} exact activeClassName="active" to="/addvoucher">
//             <img src={Calender} alt="Home" />
//             <Text clicked={click}>Bookings</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="/voucherlist">
//             <img src={Forum} alt="Team" />
//             <Text clicked={click}>Contact</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="/facultyregister">
//             <img src={Team} alt="Calender" />
//             <Text clicked={click}>Drivers</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="/facultytable">
//             <img src={Team} alt="Documents" />
//             <Text clicked={click}>User</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="/addquestions">
//             <img src={Documents} alt="CarForm" />
//             <Text clicked={click}>CarForm</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="questiontable/:slug">
//             <img src={Documents} alt="CarForm" />
//             <Text clicked={click}>CarForm</Text>
//           </Item>
//           <Item onClick={() => setClick(false)} activeClassName="active" to="/scorecardtable">
//             <img src={Documents} alt="CarForm" />
//             <Text clicked={click}>CarForm</Text>
//           </Item>
//           <Item onClick={handleLogout} activeClassName="active" >
//             <img src={PowerOff} alt="Logout" />
//             <Text clicked={click}>Logout</Text>
//           </Item>
//         </SlickBar>
//       </SidebarContainer>
//       <MainContent clicked={click}>
//         <Outlet />
//       </MainContent>
//     </Container>
//   );
// };

// export default Sidebar;




