import React, {useState} from 'react';
import MypageHistory from '../components/MypageHistory'

interface UserStateType {
    isSignedIn: boolean,
    accessToken: string,
    uuid: string,
}

interface mypageInfoType{
    user_id: string,
    realname: string,
    professional: boolean,
    instrument: string,
    history: string
}

interface MypageType {
  userState: UserStateType,
  setUserState: React.Dispatch<React.SetStateAction<UserStateType>>
}

function MypagePerson(props:MypageType):JSX.Element {
  const [mypageInfo, setMypageInfo] = useState<mypageInfoType>({
    user_id: 'kimcoding',
    realname: '김코딩',
    professional: true,
    instrument: '바이올린',
    history: `2022 신년 연주회 \n dksldksl`
  })
  const [selectMenu, setSelectMenu] = useState<string>('adv')


  return (
    <>
    {props.userState.isSignedIn
    ? (
      <div className="mypageWrap">
        <div className="mypageProfileWrap">
          <div className="mypageProfile">
            <img className="profileImg" src={require('../img/user.png')} />
          </div>
          <div className="mypageHistoryWrap">
            <MypageHistory {...{ mypageInfo, setMypageInfo }} />
          </div>
        </div>
        <div className="mypageMenuWrap">
          <div className="mypageNav">
              <span className="mypageBtu" onClick={() => {setSelectMenu('adv')}}>공고</span>
              <span className="mypageBtu" onClick={() => {setSelectMenu('review')}}>리뷰</span>
          </div>
          <div className="mypageMenu">
            {/* 공고 메뉴 + 리뷰 상태(써야하는지 썼는지 수정할지)
                리뷰만 모아서 보기 */
              selectMenu === 'adv' ? (
                <div>advadv</div>
              ) : selectMenu === 'review' ? (
                <div>review</div>
              ) :null
            }
          </div>
        </div>
      </div>
    ) : 
      <div>
          로그인이 필요합니다!
      </div>
    }
    </>
  )
}

export default MypagePerson