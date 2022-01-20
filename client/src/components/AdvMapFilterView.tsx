import axios from "axios";
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
const  kakao  = (window as any).kakao;




const AdvMapFilterView =  ({userInfo}:any) => {

    return(
        <div className="advMapFilter_view">
            <h3>Advertise</h3>
            <table className="advListTable">
                <thead>
                        <th>업체 이름</th>
                        <th>공고 제목</th>
                        <th>모집 기한</th>
                </thead>
                    
                        {
                            userInfo.map((el: { org_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; uuid: any; title: any; active_until: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; } )=>{
                                return (
                                    <tr>
                                        <td>{el.org_name}</td>
                                        <td><Link to={`/advert/${el.uuid}`}>{el.title}</Link></td>
                                        <td>{el.active_until}</td>            
                                    </tr>
                                )
                            })
                        }
                        
                    
            </table>
       </div>
       
        
        

    ) 
    
}



export default AdvMapFilterView;



