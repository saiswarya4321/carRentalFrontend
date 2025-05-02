import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // ✅ correct

import { Provider } from 'react-redux'
import store from './redux/store.js'
import 'bootstrap-icons/font/bootstrap-icons.css';




 import Root from './layouts/Root.jsx';
import Signup from './pages/shared/Signup.jsx';
import Login from './pages/shared/Login.jsx';
import Homepage from './pages/user/Homepage.jsx';
import Cardetails from './pages/user/Cardetails.jsx';
import Outerhome from './components/Outerpages/Outerhome.jsx';
import Outerlayout from './layouts/Outerlayout.jsx';
import Adminhome from './pages/admin/Adminhome.jsx';
import Dealerhome from './pages/dealer/Dealerhome.jsx';
import Adminlayout from './layouts/Adminlayout.jsx';
import Dealerlayout from './layouts/Dealerlayout.jsx';

import Success from './pages/user/payment/Success.jsx';
import Booking from './pages/user/Booking.jsx';
import Profile from './pages/user/Profile.jsx';
import Allusers from './pages/admin/Allusers.jsx';
import Alldealers from './pages/admin/Alldealers.jsx';
import Allbooking from './pages/admin/Allbooking.jsx';
import Allcars from './pages/admin/Allcars.jsx';
import DealerSignup from './pages/dealer/DealerSignup.jsx';
import AddCar from './pages/dealer/Addcar.jsx';
import Viewcars from './pages/dealer/Viewcars.jsx';
import Editcars from './pages/dealer/Editcars.jsx';
import Getbooking from './pages/dealer/Getbooking.jsx';
import Reviews from './pages/user/Reviews.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';


const router=createBrowserRouter([
  
  {
    path: "/",
    element: <Outerlayout />,
    children: [
      { path: "/", element: <Outerhome /> },
      { path: "/home", element: <Outerhome /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/userdashboard", // 👈 top-level parent
    element: <Root />,
    children: [
      { path: "homepage", element: <Homepage /> }, // 
      { path: "cardetails/:id", element: <Cardetails /> },
      { path: "payment/success", element: <Success /> },
      { path: "viewbooking", element: <Booking /> },
      { path: "profile", element: <Profile /> },
      { path: "reviews/:id", element: <Reviews /> },
    ],
  },

  {
    path: "/admindashboard", // 👈 top-level parent
    element: <Adminlayout/>,
    children: [
      { path: "adminhome", element: <Adminhome /> }, // 
      { path: "allusers", element: <Allusers /> }, 
      { path: "alldealers", element: <Alldealers /> }, 
      { path: "allbooking", element: <Allbooking /> }, 
      { path: "allcars", element: <Allcars /> }, 
      
    ],
  },
  {
    path: "/dealerdashboard", // 👈 top-level parent
    element: <Dealerlayout />,
    children: [
      { path: "dealerhome", element: <Dealerhome /> }, 
      { path: "signup", element: <DealerSignup /> }, 
      { path: "addcar", element: <AddCar /> },  
      { path: "viewcars", element: <Viewcars /> },  
      { path: "editcars/:id", element: <Editcars /> },  
      { path: "booking", element: <Getbooking /> },  

      
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      
    <ThemeProvider>
    <RouterProvider router={router} />
        <ToastContainer />
  </ThemeProvider>
       
     
    </Provider>
  </StrictMode>
  
   
)
