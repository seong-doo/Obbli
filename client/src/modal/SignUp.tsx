import axios from "axios";
import { useState } from "react";

import { storeAccessToken } from '../utils';

function SignUp(props: any):JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const [signUpInfo, setSignUpInfo] = useState({
    user_id: '',
    pw: '',
    pw_check: '',
    name: '',
    permission: 'person'
  })

  const controlInput = (key:string) => (e:React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const {user_id, pw, pw_check, name, permission} = signUpInfo;

    if(pw !== pw_check){
      setErrorMessage('비밀번호가 다릅니다.')
      return;
    }
    if(!user_id || !pw || !pw_check || !name){
      setErrorMessage('모든 칸을 채워주세요!')
      return ;
    }
    // TODO: axios:post 할때 맨드포인트에 permission으로 단체와 개인회원 구분
    axios.post(`/${permission}`, { user_id, pw, pw_check, name })
      .then(({data})=>{
        storeAccessToken(data);
        axios.defaults.headers.common.authorization = `${data.token_type} ${data.access_token}`;
        props.setIsSignUpVisible(false);
      })
      .catch((err)=> console.log(err));
  }

  return (
    <>
      {props.isSignUpVisible
        ? (
          <div className="modalBackground" onClick={() => props.setIsSignUpVisible(false)}>
            <div className="signUpWrap" onClick={(e) => e.stopPropagation()}>
            <h1 className="signInLogo">회원가입</h1>
              <div className="signInChoiseWrap">
                <input type="radio" id="perLogin" name="permission" value="person" defaultChecked onChange={controlInput('permission')} />
                <label htmlFor="perLogin" className="permission">개인회원</label>
                <input type="radio" id="orgLogin" name="permission" value="org" onChange={controlInput('permission')} />
                <label htmlFor="orgLogin" className="permission">단체회원</label>
              </div>
              <div className="signInInputWrap">
                <div>아이디</div>
                <input type="text" placeholder="아이디" value={signUpInfo.user_id} onChange={controlInput('user_id')} />
                <div>비밀번호</div>
                <input type="password" placeholder="비밀번호" value={signUpInfo.pw} onChange={controlInput('pw')} />
                <div>비밀번호 확인</div>
                <input type="password" placeholder="비밀번호 확인" value={signUpInfo.pw_check} onChange={controlInput('pw_check')} />
                <div>이름</div>
                <input type="text" placeholder="이름" value={signUpInfo.name} onChange={controlInput('name')} />
              </div>
              <div className="errMessage">
                {errorMessage}
              </div>
              <div className="signInbutton">
                <button className="loginBtn" onClick={handleSignUp}>회원가입</button>
              </div>
            </div>
          </div>
          ) : null 
        }
    </>
  )
}

export default SignUp
