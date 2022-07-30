import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 400px;
    color: "white";
`

interface ImatchResult{
    win:number,
    tie:number,
    lose:number
}

function Chart({matchResult,nickname}:any){
    const [result, setResult] = useState<ImatchResult>();

    

    useEffect(() => {
        const result = [];
        for(let i = 0; i < matchResult?.length; i++){
            if(matchResult[i].matchInfo[0].nickname === nickname){
                result.push(matchResult[i].matchInfo[0].matchDetail.matchResult);
            }else{
                result.push(matchResult[i].matchInfo[1].matchDetail.matchResult);
            }
        }
        let winCount = result.filter(element => "승" === element).length;
        let tieCount = result.filter(element => "무" === element).length;
        let loseCount = result.filter(element => "패" === element).length;
       
        const sort = {
            win: winCount,
            tie : tieCount,
            lose: loseCount
        }

        setResult(sort);
    },[matchResult])

    
    return(
        <Wrapper>
            <ApexChart 
                    type="donut" 
                    series={result ? [ result?.win , result.tie ,result.lose] : []}
                    options={{
                        theme:{
                            mode:"dark"
                        },
                        chart : {
                            height: 200,
                            width: 200,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        
                        stroke: {
                            curve: "smooth",
                            width: 3
                        },
                        plotOptions:{
                            pie:{
                                donut:{
                                    labels:{
                                        show:true,
                                        total:{
                                            showAlways: true,
                                            show:true,
                                            label: "총 경기 수",
                                            fontSize:"24px",
                                            color: "white"
                                        },
                                        value:{
                                            color: "white",
                                        }
                                    }
                                }
                            }
                        },
                        
                       
                        labels:["승","무","패"],
                        
                        colors: ["#0fbcf9", "#a3a3a3" ,"#ea2020"],
                       
                    }} 
                />
        </Wrapper>
    )
}

export default Chart;