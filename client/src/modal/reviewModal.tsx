import { useState } from "react"

interface ReviewType {
  isReviewVisible: boolean,
  setIsReviewVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function ReviewModal(props: ReviewType):JSX.Element {
  const [reviewInfo, setReviewInfo] = useState({
    rating:'',
    comment:''
  })

  const controlInput = (key:string) => (e:any) => {
    setReviewInfo({ ...reviewInfo, [key]: e.target.value });
  };

  const handleReview = () => {
    //TODO: axios post
  }

  return (
    <>
      {props.isReviewVisible
        ? (
          <div className="modalBackground" onClick={() => props.setIsReviewVisible(false)}>
            <div className="signInWrap" onClick={(e) => e.stopPropagation()}>
              <div className="signInLogo">리뷰를 남겨보세요!</div>
              <div className="star-rating">
                <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings" onChange={controlInput('rating')} />
                <label htmlFor="5-stars" className="star">★</label>
                <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings" onChange={controlInput('rating')} />
                <label htmlFor="4-stars" className="star">★</label>
                <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings" onChange={controlInput('rating')} />
                <label htmlFor="3-stars" className="star">★</label>
                <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings" onChange={controlInput('rating')} />
                <label htmlFor="2-stars" className="star">★</label>
                <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" onChange={controlInput('rating')} />
                <label htmlFor="1-star" className="star">★</label>
              </div>
              <div className="comentWrap">
                  <textarea typeof='text' onChange={controlInput('comment')} />
              </div>
              <div className="reviewBtu">
                <div className="btn" onClick={handleReview}>리뷰남기기</div>
              </div>
            </div>
          </div>
        ) : null}
    
    </>
  )
}

export default ReviewModal