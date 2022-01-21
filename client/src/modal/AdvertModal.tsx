import { useState } from 'react';
import axios from 'axios';

function ReviewsModal({ reviews }) {
  return (
    <div className="reviewSideviewWrap">
      <ul>
        { reviews.map(review => 
          <li>
            <span>{ review.rating }</span>
            <span>{ review.comment }</span>
          </li>
        )}
      </ul>
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

export default function AdvertModal({ data }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsModalVisibility, setReviewsModalVisibility] = useState(false);

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

  return (
    <div className="modalBackground">
      { reviewsModalVisibility ? <ReviewsModal reviews={reviews}/> : null}
      <div className="applicationWrap">
        { data.map(({uuid, skill_name, person}) => { return (
          <div>
            <h3>{ skill_name }</h3>
            <ul>
              { person.map(each => { return (
                <li>
                  <span>{ each.name }</span>
                  <span>{ each.uuid }</span>
                  <span><button onClick={() => showReviews(each.uuid)}>평가 보기</button></span>
                  <span><button onClick={() => markApplication(each.uuid, uuid, 'received')}>연락처 보기</button></span>
                  <span><button onClick={() => markApplication(each.uuid, uuid, 'hired')}>계약하기</button></span>
                </li>
              ); }) }
            </ul>
          </div>
        ); })}
      </div>
    </div>
  );
}