import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topnavigation from './components/topNavigation';
import Footer from './components/footer';
import SignIn from './modal/signIn';
import SignUp from './modal/signUp';
import MenuItem from './components/menuLink';
import ReviewModal from './modal/reviewModal';
import MypagePerson from './pages/MypagePerson';
import MypageOrg from './pages/MypageOrg';
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
      <div className="body">
        <SignIn {... {isSignInVisible, setIsSignInVisible, setIsSignUpVisible, setUserState}} />
        <SignUp {... {isSignUpVisible, setIsSignUpVisible, setUserState}} />
        <Routes>
          <Route path="/">
            <Route path="/mypageperson" element={<MypagePerson {... {userState, setUserState}}/>} />
            <Route path="/mypageorg" element={<MypageOrg {... {userState, setUserState}}/>} />
          </Route>
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
