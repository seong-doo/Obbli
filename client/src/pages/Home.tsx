import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    scrollY > 500 ? setBtnStatus(true) : setBtnStatus(false);
  }

  const handleScrol = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    });
    setScrollY(0);
    setBtnStatus(false);
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    }
  })

  return(
    <div className="homeBody">
      <div className="homeWrap-1">
        <div>
          <img className="homeImg-1" src={require('../img/homeImg1.png')} />
        </div>
        <div>
          <div className="homeTitle">
            {`실력 있는 \n 연주자를 찾기 어려웠나요?`}
          </div>
          <div className="homeContent">
            {`공고를 올려 연주자를 찾고 \n 지도를 통해 공연 장소를 공유해 주세요!`}
          </div>
          <div className="advButtonWrap">
            <button type='button' className="advBtu hoverAdvBtu" onClick={()=>navigate('/advert')}>공고 보러 가기</button>
            <button type='button' className="advBtu hoverAdvBtu" onClick={()=>navigate('/filter')}>지도에서 공고 보기</button>
          </div>
        </div>
      </div>
      <div className="homeWrap-2">
        <div>
          <div className="homeTitle">
            {`갈고 닦은 \n 실력을 뽐내고 싶으신가요?`}
          </div>
          <div className="homeContent">
            {`올려져 있는 공고를 보고 \n 지도를 통해 연주회를 장소를 찾아보세요!`}
          </div>
          <div className="advButtonWrap">
            <button type='button' className="advBtu hoverAdvBtu" onClick={()=>navigate('/advert')}>공고 보러 가기</button>
            <button type='button' className="advBtu hoverAdvBtu" onClick={()=>navigate('/filter')}>지도에서 공고 보기</button>
          </div>
        </div>
        <div>
          <img className="homeImg-1" src={require('../img/homeImg2.png')} />
        </div>
      </div>
      <div className="homeWrap-3">
        <div>
          <img className="homeImg-1" src={require('../img/homeImg3.png')} />
        </div>
        <div>
          <div className="homeTitle">
            {`지도를 통해 지역을 검색하여 \n 공고에 지원할 수 있습니다.`}
          </div>
          <div className="homeContent">
            {`연주자가 원하는 지역을 지도 검색을 총해서 공고를 살펴보세요!`}
          </div>
        </div>
      </div>
      <div className="homeWrap-2">
        <div>
          <div className="homeTitle">
            {`공연 뒤 서로에게 리뷰를 \n 남기실 수 있습니다.`}
          </div>
          <div className="homeContent">
            {`리뷰를 통해 서로의 실력을 칭찬하고 \n 원하는 실력의 연주자를 찾아 볼 수 있습니다!`}
          </div>
        </div>
        <div>
          <img className="homeImg-1 piano" src={require('../img/homeImg4.png')} />
        </div>
      </div>
      <div className="homeWrap-5">
        <div>
          <div className="homeTitle last">
            {`모두에게 즐거운 공연을 함께 연주해 봅시다!!!`}
          </div>
        </div>
        <div>
          <img className="homeImg-5" src={require('../img/homeImg5.png')} />
        </div>
      </div>
      <button type='button' className={btnStatus ? "topBtn active" : "topBtn"} onClick={handleScrol}>TOP</button>
    </div>
  )
}

export default Home
