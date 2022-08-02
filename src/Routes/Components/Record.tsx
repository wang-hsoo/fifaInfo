import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { ImatchBasic } from "../../api";

function Record({result}:any){
    const [home, setHome] = useState([]);
    const [away, setAway]= useState([]);
    

    useEffect(()=>{
        const a = [
            result.matchInfo[0].matchDetail.possession,
            result.matchInfo[0].shoot.shootTotal,
            result.matchInfo[0].shoot.effectiveShootTotal,
        ]

    },[result])

    console.log(result);

    return(
        <div>
           <div></div>
           <div>
                <div>점유율</div>
                <div>총 슛 / 유효슛</div>
                <div>총 패스/ 패스 성공 수</div>
                <div>파울</div>
                <div>코너킥</div>
                <div>오프사이드</div>
                <div>경기평점</div>
           </div>
           <div></div>
        </div>
    )
}

export default Record;