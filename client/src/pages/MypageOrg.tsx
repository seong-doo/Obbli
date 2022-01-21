import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MypageOrgInfo from '../components/MypageOrgInfo'
import ReviewItem from '../components/ReviewItem'
import ReviewModal from '../modal/ReviewModal';
import axios from 'axios';

function MypageOrg(props: any):JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState(null as any);
  const controlAccount = () => {
    // TODO: axios delete 보내기
  }

    // TODO: axios get 공고 및 리뷰 가져오기

  useEffect(() => {
    if (!props.auth) { navigate('/'); }
    axios.get('/org').then(resp => { setData(resp.data); });
  }, [])

  return (
    <> { data
      ? (
        <div className="mypageWrap">
          {/* <ReviewModal {... {isReviewVisible, setIsReviewVisible, data, selectMenu}} /> */}
          <div className="mypageProfileWrap">
            <div className="mypageProfile">
              <img className="profileImg" src={require('../img/user.png')} />
              <div className="btu" onClick={controlAccount}>탈퇴하기</div>
            </div>
            <div className="mypageHistoryWrap">
              { data ? <MypageOrgInfo {...{ data }} /> : null }
            </div>
          </div>
          <div className="mypageMenuWrap">
            <div className="mypageNav">
                <span className="mypageBtu" onClick={() => {}}>공고</span>
                <span className="mypageBtu" onClick={() => {}}>나에대한리뷰</span>
                <span className="mypageBtu" onClick={() => {}}>내가쓴리뷰</span>
            </div>
            <div className="mypageMenu">
            </div>
          </div>
        </div>
      ) : (
        <div>
          로그인이 필요합니다!
        </div>
      )
    } <p>{ JSON.stringify(data) }</p></>
  )
}

export default MypageOrg
