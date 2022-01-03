import React, {useState} from 'react';

interface LoginModal {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginInfo {
    id: string;
    pw: string;
}

const myId:string = "kimcoding";
const myPw:string = "qweqwe"

function SignIn (props: LoginModal) {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
      id: '',
      pw: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('');

    const controlInput = (key:string) => (e:any) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
      };

      const handleLogin = () => {
        
        if(myId === loginInfo.id && myPw === loginInfo.pw){
            setErrorMessage("로그인 성공!")
            props.setIsLogin(true);
            props.setIsModalVisible(false);
        }else{
            setErrorMessage("아이디와 비밀번호를 확인해주세요!")
        }
      }

  return (
      <>
      {props.isModalVisible
      ? (
    <div className="modalBackground" onClick={() => props.setIsModalVisible(false)}>
      <div className="signInWrap" onClick={(e) => e.stopPropagation()}>
        <div className="signInLogo">로그인</div>
        <div className="signInChoiseWrap">
            <div>단체회원</div>
            <div>개인회원</div>
        </div>
        <div className="signInInputWrap">
            <div>ID</div>
            <input type="text" placeholder="아이디를 입력하시오" value={loginInfo.id} onChange={controlInput('id')} />
            <div>Password</div>
            <input type="password" placeholder="비밀번호를 입력하시오" value={loginInfo.pw} onChange={controlInput('pw')} />
        </div>
        <div className="errMessage">
        {errorMessage}
        </div>
        <div className="signInbutton">
            <div className="btn">회원가입</div>
            <div className="btn" onClick={handleLogin}>로그인</div>
        </div>
      </div>
    </div>) : null}
    
    </>
  )
}

export default SignIn