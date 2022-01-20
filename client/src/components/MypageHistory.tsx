import axios from 'axios';
import React, { useState, useEffect } from 'react';
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

function MypageHistory({ data }):JSX.Element {
  const defaultInput = {
    name: data.name,
    pw: '',
    pw_check: '',
  };
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState({ ...defaultInput });

  function controlInput(key) {
    return function (ev) {
      setUserInput(prev => ({ ...prev, [key]: ev.target.value }));
    }
  }

  function update() {
    axios.patch('/person', Object.fromEntries(Object.entries(userInput).filter(pair => pair[1])))
      .then(resp => {
        if (resp.status !== 200) { /* Error */ }
        navigate('/');
      })
  }

  return (
    <>
    {isEditing ? (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="mypageInfoName">아이디</div>
          <div className="mypageInfo">{data.user_id}</div>
          <div className="mypageInfoName">이름</div>
          <input type="text" value={userInput.name} onChange={controlInput('name')} />
        </div>
        <div>
          <div className="mypageInfoName">악기</div>
          <input type="text" value={data.skill_name} />
          <div className="mypageInfoName">전공 여부</div>
          <div className="mypageInfo">{data.professional ? '전공' : null}</div>
        </div>
        <div className="pwChangeWrap">
          <div className="mypageInfoName">비밀번호</div>
          <input type="password" value={userInput.pw} onChange={controlInput('pw')} />
          <div className="mypageInfoName">비밀번호 확인</div>
          <input type="password" value={userInput.pw_check} onChange={controlInput('pw_check')} />
        </div>
      </div>
      <div className="userHistory">{ 'TODO' }</div>
      <div className="btu" onClick={update}>확인</div>
      <div className="btu" onClick={() => setIsEditing(false)}>취소하기</div>
    </div>
    ) : (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="mypageInfoName">아이디</div>
          <div className="mypageInfo">{data.user_id}</div>
          <div className="mypageInfoName">이름</div>
          <div className="mypageInfo">{data.name}</div>
        </div>
        <div>
          <div className="mypageInfoName">악기</div>
          <div className="mypageInfo">{data.skill_name}</div>
          <div className="mypageInfoName">전공 여부</div>
          <div className="mypageInfo">{data.professional ? '전공' : null}</div>
        </div>
      </div>
      <div className="userHistory">
        {/* 엔터로 구분?? */}
        {data.history}
      </div>
      <div className="btu" onClick={() => setIsEditing(true)}>수정하기</div>
    </div>
    )}
    </>
  )
}

export default MypageHistory
