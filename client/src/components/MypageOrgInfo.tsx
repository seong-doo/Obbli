import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MypageOrgInfo({ data }):JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInput, setUserInput] = useState({
    name: data.name,
    description: data.description,
    headcount: data.headcount,
    since: data.since,
    pw: '',
    pw_check: '',
  });

  const controlInput = (key:string) => (e:any) => {
    setUserInput({ ...userInput, [key]: e.target.value });
  };

  const onClickUpdate = () => {
    // TODO: axios fetch 정보 수정
    // TODO: pw check
    axios.patch(`/org`)
    .then((res)=> {
      setIsEditing(false)
    })
  }

  const onClickCancel = () => {
    // TODO: axios로 수정하기 않고 닫기
    setIsEditing(false);
  }

  return (
    <>
    {isEditing ? (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="mypageInfoName">단체 이름</div>
          <input type="name" value={userInput.name} onChange={controlInput('name')} />
          <div className="mypageInfoName">단체인원수</div>
          <input type="headcount" value={userInput.headcount} onChange={controlInput('headcount')} />
        </div>
        <div>
          <div className="mypageInfoName">단체설립일</div>
          <input type="since" value={userInput.since} onChange={controlInput('since')} />
        </div>
      </div>
      <div className="pwChangeWrap">
          <div className="mypageInfoName">비밀번호</div>
          <input type="password" value={userInput.pw} onChange={controlInput('pw')} />
          <div className="mypageInfoName">비밀번호 확인</div>
          <input type="password" value={userInput.pw_check} onChange={controlInput('pw_check')} />
        </div>
      <div className="userHistory">
        {userInput.description}
      </div>
      <div className="btu" onClick={onClickUpdate}>확인</div>
      <div className="btu" onClick={() => setIsEditing(false)}>취소하기</div>
    </div>
    ) : (
    <div>
      <div className="userInfoWrap">
        <div>
          <div className="mypageInfoName">단체 이름</div>
          <div className="mypageInfo">{userInput.name}</div>
          <div className="mypageInfoName">단체인원수</div>
          <div className="mypageInfo">{userInput.headcount}</div>
        </div>
        <div>
          <div className="mypageInfoName">단체설립일</div>
          <div className="mypageInfo">{userInput.since}</div>
        </div>
      </div>
      <div className="userHistory">
        {/* 엔터로 구분?? */}
        {userInput.description}
      </div>
      <div className="btu" onClick={() => setIsEditing(true)}>수정하기</div>
    </div>
    )}
      
    </>
  )
}

export default MypageOrgInfo
