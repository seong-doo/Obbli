import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topnavigation from './components/topNavigation';
import Footer from './components/footer';
import SignIn from './modal/signIn';
import SignUp from './modal/signUp';
import './App.css';

function App() {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      <nav>
        <Topnavigation {...{ isLogin, setIsLogin, setIsSignInVisible}} />
      </nav>
      <body>
        <SignIn {... {isSignInVisible, setIsSignInVisible, setIsSignUpVisible, setIsLogin}} />
        <SignUp {... {isSignUpVisible, setIsSignUpVisible, setIsLogin}} />
        hello, world
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
