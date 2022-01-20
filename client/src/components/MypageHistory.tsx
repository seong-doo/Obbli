import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


// interface mypageInfoType {
//     user_id: string,
//     name: string,
//     professional: boolean,
//     instrument: string,
//     history: string
// }

// interface historyType {
//     mypageInfo: mypageInfoType
//     setMypageInfo: React.Dispatch<React.SetStateAction<mypageInfoType>>
// }

function MypageHistory(props):JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pwChange, setPwChange] = useState({
    pw:'',
    pw_cheke:'',
  })

  const controlInputValue = (key:string) => (e:any) => {
    props.setMypageInfo({ ...props.mypageInfo, [key]: e.target.value });
  };

  const controlInputPw = (key:string) => (e:any) => {
    setPwChange({ ...pwChange, [key]: e.target.value});
  };
  const navigate = useNavigate();


  const onClickUpdate = () => {
    // TODO: axios fetch 정보 수정
    if(pwChange.pw !== pwChange.pw_cheke){
      alert('비밀번호가 다릅니다.')
      return;
    }
    axios.patch(`/person`)
    .then((res)=> {
      props.setMypageInfo({
        uuid: props.mypageInfo.uuid,
        name:props.mypageInfo.name,
        professional: props.mypageInfo.professional,
        skill:props.mypageInfo.skill,
        history: props.mypageInfo.history
      })
      setIsEditing(false)
    })
  }

  const checkBoxChecked = (e:any) => {
    if(e.target.checked){
      props.setMypageInfo({
        ...props.mypageInfo,
        professional: true,
      })
    }
    else{
      props.setMypageInfo({
        ...props.mypageInfo,
        professional: false,
      })
    }
  }

  const onClickCancel = () => {
    // TODO: axios로 수정하기 않고 닫기
    setIsEditing(false);
  }

  const controlAccount = () => {
    // TODO: axios delete 보내기
    axios.delete(`/person`)
    .then((res) => {
      navigate('/')
    })
  }

  useEffect(() => {
    
  }, [])

  return (
    <>
    {isEditing ? (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="inputWrap">
            <div className="mypageInfoNameEdit">이름 : </div>
            <input type="text" value={props.mypageInfo.name} onChange={controlInputValue('realname')} />
          </div>
          <div className="inputWrap">
            <div className="mypageInfoNameEdit">악기 : </div>
            <input type="text" value={props.mypageInfo.skill} onChange={controlInputValue('skill')} />
          </div>
          <div className="inputWrap">
            <div className="mypageInfoNameEdit">전공 여부</div>
            <input type='checkbox' onChange={(e)=>checkBoxChecked(e)} />
          </div>
        </div>
        <div className="pwChangeWrap">
          <div className="inputWrap">
            <div className="mypageInfoNameEdit">비밀번호 : </div>
            <input type="password" value={pwChange.pw} onChange={controlInputPw('pw')} />
          </div>
          <div className="inputWrap">
            <div className="mypageInfoNameEdit">비밀번호 확인 : </div>
            <input type="password" value={pwChange.pw_cheke} onChange={controlInputPw('pw_cheke')} />
          </div>
        </div>
      </div>
      <div className="userHistoryWrap">
        <textarea className="userHistoryText">{props.mypageInfo.history}</textarea>        
      </div>
      <button type='button' className="mypageBtu delete" onClick={controlAccount}>탈퇴하기</button>
      <button type='button' className="mypageBtu" onClick={onClickUpdate}>확인</button>
      <button type='button' className="mypageBtu" onClick={onClickCancel}>취소하기</button>
    </div>
    ) : (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="mypageInfoName">이름 : {props.mypageInfo.name}</div>
          <div className="mypageInfoName">악기 : {props.mypageInfo.skill}</div>
        </div>
        <div>
          <div className="mypageInfoName">전공 여부 {props.mypageInfo.professional ? '✔' : null}</div>
        </div>
      </div>
      <div className="userHistory">
        {/* 엔터로 구분?? */}
        {props.mypageInfo.history}
      </div>
      <button type='button' className="mypageBtu" onClick={() => setIsEditing(true)}>수정하기</button>
    </div>
    )}
      
    </>
  )
}

export default MypageHistory
