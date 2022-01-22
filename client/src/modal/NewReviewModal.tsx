import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

interface ReviewInfoType {
  rating : number,
  comment : string
}

function ReviewModal({ target, setNewReviewTarget }): JSX.Element {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [userInput, setUserInput] = useState({
    rating: 0,
    comment: '',
  })

  function controlInput (key) {
    return function (e) {
      setUserInput(prev => ({ ...prev, [key]: e.target.value }));
    };
  }

  const style = {
    width: `${24.5*userInput.rating}px`
  }

  const styleModal = {
    width: `${38.5*userInput.rating}px`
  }

  const handleReview = () => {
    //TODO: axios post
    if(!userInput.rating && !userInput.comment) {
      alert('별점 혹은 내용을 작성해주세요!');
      return;
    }

    axios.post(`/${target.type}/review/${target.uuid}`, {
      rating: userInput.rating,
      comment: userInput.comment,
    })
      .then(res => { setNewReviewTarget(); navigate('/') })
      .catch(err => console.log(err));

  }

  return (
    <div className="modalBackground" onClick={() => setNewReviewTarget()}>
      <div className="reviewWrap" onClick={(e) => e.stopPropagation()}>
        <h2 className="reviewLogo">리뷰를 남겨보세요!</h2>
        <h2 className="targetName">{ target.name }</h2>
        <div className="star-rating">
          <input type="radio" id="5-stars" name="rating" value='5' v-model="ratings" onChange={controlInput('rating')} />
          <label htmlFor="5-stars" className="star">★</label>
          <input type="radio" id="4-stars" name="rating" value='4' v-model="ratings" onChange={controlInput('rating')} />
          <label htmlFor="4-stars" className="star">★</label>
          <input type="radio" id="3-stars" name="rating" value='3' v-model="ratings" onChange={controlInput('rating')} />
          <label htmlFor="3-stars" className="star">★</label>
          <input type="radio" id="2-stars" name="rating" value='2' v-model="ratings" onChange={controlInput('rating')} />
          <label htmlFor="2-stars" className="star">★</label>
          <input type="radio" id="1-star" name="rating" value='1' v-model="ratings" onChange={controlInput('rating')} />
          <label htmlFor="1-star" className="star">★</label>
        </div>
        <div className="comentWrap">
            <textarea className="reviewModalText" onChange={controlInput('comment')} value={userInput.comment}></textarea>
        </div>
        <div className="reviewBtu">
          <button type='button' className="reviewModalBtn" onClick={handleReview}>리뷰남기기</button>
          <button type='button' className="reviewModalBtn" onClick={() => setIsEditing(false)}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
