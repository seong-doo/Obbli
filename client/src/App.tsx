import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topnavigation from './components/topNavigation';
import Footer from './components/footer';
import SignIn from './modal/signIn';
import SignUp from './modal/signUp';
import MenuItem from './components/menuLink';
import ReviewModal from './modal/reviewModal';
import './App.css';

interface UserStateType {
  isSignedIn: boolean,
  accessToken: string,
  uuid: string,
}

function App() {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false)
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false)
  const [userState, setUserState] = useState<UserStateType>({
    isSignedIn: false,
    accessToken:'',
    uuid: '',
  })

  return (
    <div className="App">
      <nav>
        <Topnavigation {...{ userState, setUserState, setIsSignInVisible}} />
      </nav>
      <body>
        <SignIn {... {isSignInVisible, setIsSignInVisible, setIsSignUpVisible, setUserState}} />
        <SignUp {... {isSignUpVisible, setIsSignUpVisible, setUserState}} />

      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
