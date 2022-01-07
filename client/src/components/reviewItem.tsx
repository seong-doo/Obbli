import React, { useState } from 'react';

function ReviewItem(): JSX.Element{

  // TODO: props로 받아온 데이터로 리뷰 나타내기
  const username = '김코딩';
  const rating = 4;
  const comment = "역시 K-오케스트라"

  const style = {
    width: `${24.5*rating}px`
  }

  return (
  <>
    <div className="reviewItemWrap">
      <div className="reviewStars">
        <div className="star-ratings-fill" style={style}>
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div className="star-ratings-base">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
        <div className="userName">
          {username}
        </div>
        <div className="reviewComment">
          {comment}
        </div>
    </div>
  </>
  )
}

export default ReviewItem