import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MypageHistory from '../components/MypageHistory'
import ReviewItem from '../components/ReviewItem'
import ReviewModal from '../modal/ReviewModal';
import axios from 'axios';

function MypagePerson(props: any):JSX.Element {
  const navigate = useNavigate();
  if (!props.auth) { navigate('/') }
  const placeHolder = <p>내용이 없습니다</p>;
  const [data, setData] = useState(null as any);
  const [selectMenu, setSelectMenu] = useState<string>('adv');
  const [isReviewVisible, setIsReviewVisible] = useState<boolean>(false);
  const [reviewModalData, setReviewModalData] = useState(null as any);
  const [tabs, setTabs] = useState({
    Application: placeHolder,
    Person_review: placeHolder,
    Org_review: placeHolder,
  });
  const clickReview = (data: any) => {
    setReviewModalData({
      rating: data.rating,
      comment: data.comment
    })
    setIsReviewVisible(true)
  }
  const [tab, setTab] = useState('Application');
  const [reviewModalVisibility, setReviewModalVilibility] = useState(false);

  const unregister = () => {
    // TODO: axios delete 보내기
  }

  useEffect(() => {
    axios.get('/person').then(resp => {
      setData(resp.data);
      setTabs({
        Application: <p>{ JSON.stringify(resp.data.Application) }</p>,
        Person_review: <>{ resp.data.Person_review.map(v => <ReviewItem data={v} />) }</>,
        Org_review: <>{ resp.data.Org_review.map(v => <ReviewItem data={v} />) }</>,
      });
    });
  }, []);

  return (
    <div className="mypageWrap">
      { reviewModalData ? <ReviewModal {... {isReviewVisible, setIsReviewVisible, data: reviewModalData, selectMenu}} /> : null }

      <div className="mypageProfileWrap">
        <div className="mypageProfile">
          <img className="profileImg" src={require('../img/user.png')} />
        </div>
        <div className="mypageHistoryWrap">
          { data ? <MypageHistory {...{ data }} /> : null }
        </div>
      </div>

      <div className="mypageMenuWrap">

        <div className="mypageNav">
          <input type="radio" id="advView" name="mypageTab" value="adv" defaultChecked onChange={() => {setSelectMenu('adv')}} />
          <label htmlFor="advView" className="mypageTab">공고보기</label>
          <input type="radio" id="reviewToMe" name="mypageTab" value="reviewToMe" onChange={() => setSelectMenu('reviewToMe')} />
          <label htmlFor="reviewToMe" className="mypageTab">나에대한리뷰</label>
          <input type="radio" id="reviewFromMe" name="mypageTab" value="reviewFromMe" onChange={() => {setSelectMenu('reviewFromMe')}} />
          <label htmlFor="reviewFromMe" className="mypageTab">내가쓴리뷰</label>
        </div>

        <div className="mypageMenu">
          { selectMenu === 'adv' ? (
              <div>advadv</div>
            ) : selectMenu === 'reviewToMe' ? (
              // TODO: 가져온 리뷰를 연결
              <ul className="reviewList">
                {data.Person_review.map((review, key)=>{
                  return (
                  <li onClick={()=>clickReview(review)} key={key}>
                    <ReviewItem  data={review} />
                  </li>)
                })}
              </ul>
            ) : selectMenu === 'reviewFromMe' ? (
              <ul className="reviewList">
                {data.Org_review.map((review, key)=>{
                  return (
                  <li onClick={()=>clickReview(review)} key={key}>
                    <ReviewItem  data={review} />
                  </li>)
                })}
              </ul>
            ) : null
          }
        </div>

      </div>
    </div>
  )
}

export default MypagePerson
