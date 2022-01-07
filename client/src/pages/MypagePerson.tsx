import React, {useState} from 'react';
import MypageHistory from '../components/MypageHistory'
import ReviewItem from '../components/reviewItem'

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
  setUserState: React.Dispatch<React.SetStateAction<UserStateType>>,
  setIsReviewVisible: React.Dispatch<React.SetStateAction<boolean>>
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

  const controlAccount = () => {
    // TODO: axios delete 보내기
  }

    // TODO: axios get 공고 및 리뷰 가져오기

  return (
    <>
    {props.userState.isSignedIn
    ? (
      <div className="mypageWrap">
        <div className="mypageProfileWrap">
          <div className="mypageProfile">
            <img className="profileImg" src={require('../img/user.png')} />
            <div className="btu" onClick={controlAccount}>탈퇴하기</div>
          </div>
          <div className="mypageHistoryWrap">
            <MypageHistory {...{ mypageInfo, setMypageInfo }} />
          </div>
        </div>
        <div className="mypageMenuWrap">
          <div className="mypageNav">
              <span className="mypageBtu" onClick={() => {setSelectMenu('adv')}}>공고</span>
              <span className="mypageBtu" onClick={() => {setSelectMenu('reviewToMe')}}>나에대한리뷰</span>
              <span className="mypageBtu" onClick={() => {setSelectMenu('reviewFromMe')}}>내가쓴리뷰</span>
          </div>
          <div className="mypageMenu">
            {/* 공고 메뉴 + 리뷰 상태(써야하는지 썼는지 수정할지)
                리뷰만 모아서 보기 */
              selectMenu === 'adv' ? (
                <div>advadv</div>
              ) : selectMenu === 'reviewToMe' ? (
                // TODO: 가져온 리뷰를 연결
                <ReviewItem />
              ) : selectMenu === 'reviewFromMe' ? (
                // TODO: 가겨온 리뷰를 연결
                <ReviewItem />
              ) : null
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