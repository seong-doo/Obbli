import { useEffect, useState } from 'react';
import NewReviewModal from './NewReviewModal';
import axios from 'axios';

function ReviewsModal({ reviews }) {
  const ratingStar = ['','★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★']
  return (
    <div className="reviewSideviewWrap" onClick={e => e.stopPropagation()}>
      <div className='reviewSideContent'>
        <h2>Review</h2>
        <ul className='reviewSideList'>
          {console.log(reviews)}
          { reviews.map(review => 
            <li >
              <span className='reviewSideRating'>{ ratingStar[review.rating] }</span>
              <p className='reviewSidecomment'>{ review.comment }</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
  // return reviews.map(review =>
  //   <ul>
  //     <li>
  //       <span>{ review.rating }</span>
  //       <span>{ review.comment }</span>
  //     </li>
  //   </ul>
  // );
}

export default function AdvertModal({ data, setAdvertModalVisibility }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsModalVisibility, setReviewsModalVisibility] = useState(false);
  const [newReviewData, setNewReviewData] = useState(null as any);

  function showReviews(person_uuid) {
    axios.get(`/person/review/${person_uuid}`)
      .then(resp => {
        setReviews(resp.data);
        setReviewsModalVisibility(true);
      });
  }

  function markApplication(person_uuid, position_uuid, state) {
    axios.patch('/application', { person_uuid, position_uuid, state })
  }

  function popReviewModal(uuid, name) {
    setNewReviewData({ type: 'person', uuid, name });
  }

  return (
    <div className="advertModalBackground " onClick={() => setAdvertModalVisibility(false)}>
      { newReviewData ? <NewReviewModal target={newReviewData} setNewReviewTarget={setNewReviewData} />: null}
      { reviewsModalVisibility ? <ReviewsModal reviews={reviews} /> : null}
        <div className='applicationWrap' onClick={e => e.stopPropagation()}>
        { data.map(({uuid, skill_name, person}) => { return (
          <div className="modalcontent">
            <h3>{ skill_name }</h3>
            <table className='advertmodaltable'>
              <thead>
                  <colgroup>
                  </colgroup>
                  <tr>
                    <td>이름</td>
                    <td>리뷰</td>
                    <td>1차 합격</td>
                    <td>최종 계약</td>
                    <td>리뷰</td>
                  </tr>
              </thead>
                { person.map(each => { return (
                  <tr>
                    <td><span>{ each.name }</span></td>
                    {/* <span>{ each.uuid }</span> */}
                    <td><span><button className='advertModalBtn' onClick={() => showReviews(each.uuid)}>리뷰 보기</button></span></td>
                    <td><span><button className='advertModalBtn' onClick={() => markApplication(each.uuid, uuid, 'received')}>연락처 보기</button></span></td>
                    <td>{ each.hired_at ? '✅' :
                      <span><button className='advertModalBtn confirm' onClick={() => markApplication(each.uuid, uuid, 'hired')}>계약하기</button></span>
                    }</td>
                    <td>{ !each.hired_at ? null :
                      each.reviewed ? '✅' : <button className="newReviewButton" onClick={() => popReviewModal(each.uuid, each.name)}>리뷰 남기기</button>
                    }</td>
                  </tr>
                ); }) }
            </table>
          </div>
        ); })}
      </div>
    </div>
  );
}