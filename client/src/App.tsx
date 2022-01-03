import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topnavigation from './components/topNavigation';
import Footer from './components/footer';
import SignIn from './modal/signIn';
import './App.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      <nav>
        <Topnavigation {...{ isLogin, setIsLogin, setIsModalVisible}} />
      </nav>
      <body>
        <SignIn {... {isModalVisible, setIsModalVisible, setIsLogin}} />
        hello, world
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
