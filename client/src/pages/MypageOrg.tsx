import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MypageOrgInfo from '../components/MypageOrgInfo'
import ReviewItem from '../components/ReviewItem'
import ReviewModal from '../modal/ReviewModal';
import axios from 'axios';

function MypageOrg(props: any):JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState(null as any);
  const [selectMenu, setSelectMenu] = useState<string>('adv');
  const [isReviewVisible, setIsReviewVisible] = useState<boolean>(false);
  const clickReview = (data: any) => {
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
    if (!props.auth) { navigate('/'); }
    axios.get('/org').then(resp => { setData(resp.data); });
  }, [])

  return (
    <div className="mypageWrap">
      <ReviewModal {... {isReviewVisible, setIsReviewVisible, data, selectMenu}} />
      <div className="mypageProfileWrap">
        <div className="mypageProfile">
          <img className="profileImg" src={require('../img/user.png')} />
        </div>
        <div className="mypageHistoryWrap">
          { data ? <MypageOrgInfo {...{ data }} /> : null }
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
          {/* 공고 메뉴 + 리뷰 상태(써야하는지 썼는지 수정할지)
              리뷰만 모아서 보기 */
            selectMenu === 'adv' ? (
              <div>advadv</div>
            ) : selectMenu === 'reviewToMe' ? (
              // TODO: 가져온 리뷰를 reviewItem에 하나씩 넘겨줌
              <ul className="reviewList">
                {data.Org_review.map((data, key)=>{
                  return (
                  <li onClick={()=>clickReview(data)} key={key}>
                    <ReviewItem  {... {data}} />
                  </li>)
                })}
              </ul>
            ) : selectMenu === 'reviewFromMe' ? (
              // TODO: 가져온 리뷰를 reviewItem에 하나씩 넘겨줌
              <ul className="reviewList">
                {data.Person_review.map((data, key)=>{
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
  )
}

export default MypageOrg
