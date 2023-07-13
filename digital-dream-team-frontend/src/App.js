import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import Builder from './components/Builder';
import SignIn from './components/SignIn';
import { UserProvider } from './components/contexts/UserProvider';
import { ResumeProvider } from './components/contexts/ResumeProvider';
import SignUp from './components/SignUp';
import Generator from './components/Generator';
import Profile from './components/Profile';

function App() {
  return (
    <UserProvider>
      <ResumeProvider>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Header /> } >
                  <Route index element={<Home />} />
                  <Route path="builder" element={<Builder />} /> 
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="generator" element={<Generator />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </UserProvider>
  );
}

export default App;
