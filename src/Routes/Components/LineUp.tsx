import { useEffect, useState } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const PlayerList = styled.div`
    font-weight: 600;
    margin-top: 50px;
`

const PlayerCon = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-left: 50px;
    font-size: 18px;
    margin-bottom: 13px;

`
const Position = styled.div`
    width: 50px;
    margin-right: 10px;
`
const Name = styled.div`
    width:180px;
`

interface IPlayerInfo{
    num: number,
    name: string,
    position: string,
    grade: number
}

function LineUp({playerCheck, result, getPosition}:any){
    const[loading, setLoading] = useState(true);
    const [homePlayer, setHomePlayer] = useState<any>();     
    const [awayPlayer, setAwayPlayer] = useState<any>([]);                 

    const a = () => {
        setTimeout(() => {
            const home = [];
            const away = [];
            for(let i = 0; i < playerCheck.default.length; i++){
                for(let a = 0; a < result.matchInfo[0].player.length; a++){
                    if(playerCheck.default[i].id === result.matchInfo[0].player[a].spId){
                        for(let b = 0; b < getPosition.length; b++){
                            if(result.matchInfo[0].player[a].spPosition === getPosition[b].spposition){
                                home.push({
                                    num: getPosition[b].spposition,
                                    name: playerCheck.default[i].name,
                                    position: getPosition[b].desc,
                                    grade: result.matchInfo[0].player[a].spGrade
                                })
                            }

                        }
                    }
                    if(playerCheck.default[i].id === result.matchInfo[1].player[a].spId){
                        for(let b = 0; b < getPosition.length; b++){
                            if(result.matchInfo[1].player[a].spPosition === getPosition[b].spposition){
                                away.push({
                                    num: getPosition[b].spposition,
                                    name: playerCheck.default[i].name,
                                    position: getPosition[b].desc,
                                    grade: result.matchInfo[1].player[a].spGrade
                                })
                            }

                        }
                    }
                 }
            }
            home.sort(function(a:any,b:any){
                return a.num - b.num 
            })
            away.sort(function(a:any,b:any){
                return a.num - b.num
            })

            setHomePlayer(home);
            setAwayPlayer(away);
        },100)
    }

    console.log(result);
    useEffect(() => {
        a();
        setLoading(false);
    },[result])
   

   

    return(
        <Wrapper>
           <PlayerList>
                {homePlayer?.map((player:IPlayerInfo) => (
                    <PlayerCon>
                        <Position >{player.position}</Position>
                        <Name>{player.name}</Name>
                        <div>+{player.grade}</div>
                    </PlayerCon>
                ))}
           </PlayerList>
           <PlayerList>
                {awayPlayer?.map((player:IPlayerInfo) => (
                    <PlayerCon>
                        <Position>{player.position}</Position>
                        <Name>{player.name}</Name>
                        <div>+{player.grade}</div>
                    </PlayerCon>
                ))}
           </PlayerList>
        </Wrapper>
            
          
    )
}

export default LineUp;