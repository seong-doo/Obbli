export default function AdvertModal({ data }) {
  return (
    <div className="modalBackground">
      <div className="advertModalWrap">
        { data.map(({skill_name, person}) => { return (
          <div>
            <h3>{ skill_name }</h3>
            <ul>
              { person.map(each => { return (
                <li>
                  <span>{ each.name }</span>
                  <span><button>평가 보기</button></span>
                  <span><button>연락처 보기</button></span>
                  <span><button>계약하기</button></span>
                </li>
              ); }) }
            </ul>
          </div>
        ); })}
      </div>
    </div>
  );
}