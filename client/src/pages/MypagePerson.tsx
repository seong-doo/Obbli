import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MypageHistory from '../components/MypageHistory'
import ReviewItem from '../components/ReviewItem'
import ReviewModal from '../modal/ReviewModal';
import axios from 'axios';

function MypagePerson(props: any):JSX.Element {
  const navigate = useNavigate();
  if (!props.userState) { navigate('/') }
  const [data, setData] = useState(null as any);
  const [tab, setTab] = useState('Application');
  const [reviewModalVisibility, setReviewModalVilibility] = useState(false);

  const controlAccount = () => {
    // TODO: axios delete 보내기
  }

  useEffect(() => {
    axios.get('/person').then(resp => {
      setData(resp.data);
    });
  }, []);

  return (
    <div className="mypageWrap">
      {/* <p>{ JSON.stringify(data['Application']) }</p> */}
      {/* { reviewModalVisibility ? <ReviewModal {... {data}} /> : null } */}
      <div className="mypageProfileWrap">
        <div className="mypageProfile">
          <img className="profileImg" src={require('../img/user.png')} />
          <div className="btu" onClick={controlAccount}>탈퇴하기</div>
        </div>
        <div className="mypageHistoryWrap">
          { data ? <MypageHistory data={data} /> : null }
        </div>
      </div>
      <div className="mypageMenuWrap">
        <div className="mypageNav">
            <span className="mypageBtu" onClick={() => {setTab('Application')}}>공고</span>
            <span className="mypageBtu" onClick={() => {setTab('myReviews')}}>나에대한리뷰</span>
            <span className="mypageBtu" onClick={() => {setTab('reviewsToMe')}}>내가쓴리뷰</span>
        </div>
        <div className="mypageMenu">
        </div>
      </div>
    </div>
  )
}

export default MypagePerson
