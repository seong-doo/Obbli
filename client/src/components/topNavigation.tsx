import { useNavigate } from 'react-router-dom';

interface UseModal {
  setIsSignInVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin:React.Dispatch<React.SetStateAction<boolean>>;
}

function Topnavigation(props: UseModal) {
  const navigate = useNavigate();

  const handleModal = () => {
    props.setIsSignInVisible(true)
  }

  return (
    <div className="headWrapper">
      <img className="logoImg" src={require('../img/logo.png')} onClick={() => navigate('/')} />
      <div className="naviList">
        <ul className="naviList">
          {props.isLogin 
          ? (
            <li className="naviButtom" onClick={() => props.setIsLogin(false)}>로그아웃</li>
          ) : (
            <li className="naviButtom" onClick={handleModal}>로그인</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Topnavigation