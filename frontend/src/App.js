import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ErrorPage from './pages/ErrorPage';
import FirstPage from './components/Firstpage';
import MenuLinks from './components/MenuLinks';
import Quiz from './pages/Quiz';
import AddQuestions from './components/QuestionForm';
import AdminLogin from './components/AdminLogin';
import FacultyLogin from './components/FacultyLogin';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import FacultyRegister from './components/FacultyRegister';
import EnterVoucher from './components/EnterVoucher';
import FacultyPanel from './components/FacultyPanel';
import AdminPanel from './components/AdminPanel';
import AddVoucher from './components/AddVoucher';
import FacultyTable from './components/FacultyTable';
import VoucherList from './components/VoucherList';
import QuestionTable from './components/QuestionTable';
import ShowResult from './components/ShowResult';
import ScoreCardTable from './components/ScoreCardTable';
import ScoreCardList from './components/ScoreCardList';
import ProtectedRoute from './router/ProtectedRoute'; 


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <FirstPage /> },

        
        { path: "/studentlogin", element: <StudentLogin /> },
        { path: "/adminlogin", element: <AdminLogin /> },
        { path: "/facultylogin", element: <FacultyLogin /> },
        { path: "/studentregister", element: <StudentRegister /> },


   
        {
          element: <ProtectedRoute />, 
          children: [

         

            { path: "/entervoucher", element: <EnterVoucher /> },
            { path: "/home", element: <MenuLinks /> },
            { path: "/quiz/:slug", element: <Quiz /> },
            { path: "/showresult/:slug", element: <ShowResult /> },

          

            { path: "/facultypanel", element: <FacultyPanel /> },


           

            { path: "/adminpanel", element: <AdminPanel /> },
            { path: "/facultyregister", element: <FacultyRegister /> },
            { path: "/scorecardtable", element: <ScoreCardTable /> },
            { path: "/scorecardlist", element: <ScoreCardList /> },
            { path: "/addvoucher", element: <AddVoucher /> },
            { path: "/facultytable", element: <FacultyTable /> },
            { path: "/voucherlist", element: <VoucherList /> },
            { path: "/addquestions", element: <AddQuestions /> },
            { path: "/questiontable/:slug", element: <QuestionTable /> },
            { path: "/showresult/:slug", element: <ShowResult /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

