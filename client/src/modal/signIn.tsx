import React, {useState} from 'react';

interface LoginModal {
    isSignInVisible: boolean;
    setIsSignInVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSignUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginInfo {
    id: string;
    pw: string;
    permission: string
}

const myId:string = "kimcoding";
const myPw:string = "qweqwe"

function SignIn (props: LoginModal) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    id: '',
    pw: '',
    permission:''
  })

    const controlInput = (key:string) => (e:any) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
      };

      const handleLogin = () => {
        
        if(myId === loginInfo.id && myPw === loginInfo.pw){
            setErrorMessage("로그인 성공!")
            props.setIsLogin(true);
            props.setIsSignInVisible(false);
            // axios:get 비교후 로그인 승인
        }else{
            setErrorMessage("아이디와 비밀번호를 확인해주세요!")
        }
      }

      const changeModal = () => {
        props.setIsSignInVisible(false);
        props.setIsSignUpVisible(true);
      }

  return (
      <>
      {props.isSignInVisible
      ? (
    <div className="modalBackground" onClick={() => props.setIsSignInVisible(false)}>
      <div className="signInWrap" onClick={(e) => e.stopPropagation()}>
        <div className="signInLogo">로그인</div>
        <div className="signInChoiseWrap">
            <input type="radio" id="orgLogin" name="rating" value="org" onChange={controlInput('permission')} />
            <label htmlFor="5-stars" className="star pr-4">단체회원</label>
            <input type="radio" id="perLogin" name="rating" value="person" onChange={controlInput('permission')} />
            <label htmlFor="4-stars" className="star">개인회원</label>
        </div>
        <div className="signInInputWrap">
            <div>아이디</div>
            <input type="text" placeholder="아이디를 입력하시오" value={loginInfo.id} onChange={controlInput('id')} />
            <div>비밀번호</div>
            <input type="password" placeholder="비밀번호를 입력하시오" value={loginInfo.pw} onChange={controlInput('pw')} />
        </div>
        <div className="errMessage">
        {errorMessage}
        </div>
        <div className="signInbutton">
            <div className="btn" onClick={changeModal}>회원가입</div>
            <div className="btn" onClick={handleLogin}>로그인</div>
        </div>
      </div>
    </div>) : null}
    
    </>
  )
}

export default SignIn