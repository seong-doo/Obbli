import { useNavigate } from 'react-router-dom';

function Topnavigation() :any{
  const navigate = useNavigate();

  return (
    <div className="headWrapper">
      <img className="logoImg" src={require('../img/logo.png')} onClick={() => navigate('/')} />
      <div className="naviList">
        <ul className="naviList">
          <li className="naviButtom">회원가입</li>
          <li className="naviButtom">로그인</li>
        </ul>
      </div>
    </div>
  )
}

export default Topnavigation