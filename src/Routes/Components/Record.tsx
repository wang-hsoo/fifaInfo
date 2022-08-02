import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { ImatchBasic, ImatchInfo } from "../../api";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    font-size: 20px;
    font-weight: 500;
    margin-top: 30px;
    div{
        margin-bottom: 20px;
    }
`

function Record<ImatchBasic>(result:ImatchInfo){
    const [home, setHome] = useState<number[]>([]);
    const [away, setAway]= useState<number[]>([]);
    
    console.log(result);
    useEffect(()=>{
        const home = [
            result.result.matchInfo[0].matchDetail.possession,
            result.result.matchInfo[0].shoot.shootTotal,
            result.result.matchInfo[0].shoot.effectiveShootTotal,
            result.result.matchInfo[0].pass.passTry,
            result.result.matchInfo[0].pass.passSuccess,
            result.result.matchInfo[0].matchDetail.foul,
            result.result.matchInfo[0].matchDetail.cornerKick,
            result.result.matchInfo[0].matchDetail.offsideCount,
            result.result.matchInfo[0].matchDetail.averageRating
        ]

        const away = [
            result.result.matchInfo[1].matchDetail.possession,
            result.result.matchInfo[1].shoot.shootTotal,
            result.result.matchInfo[1].shoot.effectiveShootTotal,
            result.result.matchInfo[1].pass.passTry,
            result.result.matchInfo[1].pass.passSuccess,
            result.result.matchInfo[1].matchDetail.foul,
            result.result.matchInfo[1].matchDetail.cornerKick,
            result.result.matchInfo[1].matchDetail.offsideCount,
            result.result.matchInfo[1].matchDetail.averageRating
        ]

        setHome(home);
        setAway(away);
    },[result])

    console.log(result);

    return(
        <Wrapper>
           <div>
                {home?.map((home:number) => (
                    <div>{home}</div>
                ))}
           </div>
           <div>
                <div>점유율</div>
                <div>총 슛</div>
                <div>유효슛</div>
                <div>총 패스</div>
                <div>패스 성공 수</div>
                <div>파울</div>
                <div>코너킥</div>
                <div>오프사이드</div>
                <div>경기평점</div>
           </div>
           <div>
                {away?.map((home:number) => (
                    <div>{home}</div>
                ))}
           </div>
        </Wrapper>
    )
}

export default Record;