import React, {useState, useEffect} from 'react';
import MypageOrgInfo from '../components/MypageOrgInfo'
import ReviewItem from '../components/ReviewItem'
import ReviewModal from '../modal/ReviewModal';


interface UserStateType {
    isSignedIn: boolean,
    accessToken: string,
    uuid: string,
}

interface mypageInfoType{
    name: string,
    description: string,
    since: string,
    headcount: number
}

interface MypageType {
  userState: UserStateType,
  setUserState: React.Dispatch<React.SetStateAction<UserStateType>>
}

interface ReviewInfoType {
  username : string,
  rating : number,
  comment : string
}

const listData = [
  {
    username : '김코딩',
    rating : 4,
    comment : "K-오케스트라 여윽시 최고다, 역시 이런 무대를 설수 있다니"
  },
  {
    username : '나코딩',
    rating : 4,
    comment : "역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '박코딩',
    rating : 4,
    comment : "아무리 그래도 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '이코딩',
    rating : 4,
    comment : "역시는 역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '김코딩',
    rating : 4,
    comment : "K-오케스트라 여윽시 최고다, 역시 이런 무대를 설수 있다니"
  },
  {
    username : '나코딩',
    rating : 4,
    comment : "역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '박코딩',
    rating : 4,
    comment : "아무리 그래도 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '이코딩',
    rating : 4,
    comment : "역시는 역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '김코딩',
    rating : 4,
    comment : "K-오케스트라 여윽시 최고다, 역시 이런 무대를 설수 있다니"
  },
  {
    username : '나코딩',
    rating : 4,
    comment : "역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '박코딩',
    rating : 4,
    comment : "아무리 그래도 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '이코딩',
    rating : 4,
    comment : "역시는 역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '김코딩',
    rating : 4,
    comment : "K-오케스트라 여윽시 최고다, 역시 이런 무대를 설수 있다니"
  },
  {
    username : '나코딩',
    rating : 4,
    comment : "역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '박코딩',
    rating : 4,
    comment : "아무리 그래도 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  },
  {
    username : '이코딩',
    rating : 4,
    comment : "역시는 역시 K-오케스트라 여윽시 최고다, 이런 무대를 설수 있다니"
  }
]


function MypageOrg(props:MypageType):JSX.Element {
  const [mypageInfo, setMypageInfo] = useState<mypageInfoType>({
    name: 'K-오케스트라',
    description: 'K-클래식을 연주하는 K-오케스트라',
    since: '2022-02-22',
    headcount: 222
  })
  const [selectMenu, setSelectMenu] = useState<string>('adv')
  const [isReviewVisible, setIsReviewVisible] = useState<boolean>(false)
  const [reviewInfoList, setReviewInfoList] = useState<ReviewInfoType[]>([])
  const [data, setData] = useState({
    rating : 0,
    comment : ''
  })

  const clickReview = (data:ReviewInfoType) => {
    setData({
      rating: data.rating,
      comment: data.comment
    })
    setIsReviewVisible(true)
  }

  const controlAccount = () => {
    // TODO: axios delete 보내기
  }

    // TODO: axios get 공고 및 리뷰 가져오기

useEffect(() => {
    setReviewInfoList(listData)
}, [])

  return (
    <>
    {true
    ? (
      <div className="mypageWrap">
        <ReviewModal {... {isReviewVisible, setIsReviewVisible, data, selectMenu}} />
        <div className="mypageProfileWrap">
          <div className="mypageProfile">
            <img className="profileImg" src={require('../img/user.png')} />
            <div className="btu" onClick={controlAccount}>탈퇴하기</div>
          </div>
          <div className="mypageHistoryWrap">
            <MypageOrgInfo {...{ mypageInfo, setMypageInfo }} />
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
                // TODO: 가져온 리뷰를 reviewItem에 하나씩 넘겨줌
                <ul className="reviewList">
                  {reviewInfoList.map((data, key)=>{
                    return (
                    <li onClick={()=>clickReview(data)} key={key}>
                      <ReviewItem  {... {data}} />
                    </li>)
                  })}
                </ul>
              ) : selectMenu === 'reviewFromMe' ? (
                // TODO: 가져온 리뷰를 reviewItem에 하나씩 넘겨줌
                <ul className="reviewList">
                  {reviewInfoList.map((data, key)=>{
                    return (
                    <li onClick={()=>clickReview(data)} key={key}>
                      <ReviewItem  {... {data}} />
                    </li>)
                  })}
                </ul>
              ) : null
            }
          </div>
        </div>
      </div>
    ) : (
      <div>
        로그인이 필요합니다!
      </div>
    )}
    </>
  )
}

export default MypageOrg