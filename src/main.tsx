import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from './screens/Home.tsx'
import ProfileManagerProvider from './contexts/ProfileManagerProvider.tsx'
import ProfileSelection from './screens/Profiles.tsx';
import CreateUserForm from './screens/CreateProfileForm.tsx';
import Profile from './screens/Profile.tsx';
import AppLayout from './Layouts/AppLayout.tsx';
import ProfilesMiddleware from './components/ProfilesMiddleware.tsx';
import LoginForm from './screens/Login.tsx';
import AuthMiddleware from './components/AuthMiddleware.tsx';
import Logout from './components/Logout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileManagerProvider>
      <BrowserRouter>
        <Routes>
          <Route 
          element={<AppLayout />}
          >
            <Route index element={<Home />} />
            <Route path="profiles">
              <Route index element={
                <ProfilesMiddleware>
                  <ProfileSelection />
                </ProfilesMiddleware>
              } />
              <Route path=":pid" element={
                <ProfilesMiddleware>
                  <Profile />
                </ProfilesMiddleware>
              } />
              <Route path="create" element={<CreateUserForm />} />
              {/* <Route path=":pid/edit" element={<EditProject />} /> */}
            </Route>
            <Route path="me" element={<AuthMiddleware><Profile me={true}/></AuthMiddleware>} />
            <Route path="login" element={<ProfilesMiddleware><LoginForm/></ProfilesMiddleware>} />
            <Route path="logout" element={<Logout/>} />
          </Route>


        </Routes>
      </BrowserRouter>
    </ProfileManagerProvider>
  </StrictMode>
)
