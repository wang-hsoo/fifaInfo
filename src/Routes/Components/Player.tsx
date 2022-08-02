import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    overflow: scroll;
    &::-webkit-scrollbar{
        width: 0.8em;
    }
    
    &::-webkit-scrollbar-thumb{
        background-color: ${(props) => props.theme.userName};
    }
`
const BtnBox = styled.div`
    display: flex;
    margin-left: 5px;
`
const Btn = styled(motion.div)`
    margin: 20px 20px 30px 0 ;
    border: none;
    color: ${(props) => props.theme.dark};
    cursor: pointer;
    font-size: 17px;
    font-weight: 500;
    opacity: 0.5;
    scale: 1;
    transition: 0.3s;
    &:hover{
        opacity: 1;
        font-weight: 600;
        
    }
`

const StatusForm = styled.div`
  width: 2500px;
`

const Gk = styled.div`
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    padding: 10px 0;
    place-items: center;
    &:first-child{
        background-color: ${(props) => props.theme.userName};
        color: ${(props) => props.theme.bgColor};
    }
    
    
`

const FieldBox = styled.div`
     
`

const Field = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    place-items: center;
    padding: 10px 0;
    &:first-child{
        background-color: ${(props) => props.theme.userName} !important;
        color: ${(props) => props.theme.bgColor};
    }
`

const Name = styled.div`
    text-align: center;
    width: 180px;
`

const PlayerStatus = styled.div`
    text-align: center;
    width: 150px;
    font-size: 15px;
`
const Position = styled.div`
    text-align: center;
    width: 80px;

`

interface IplayerStatus{
    name: string
    num: number
    position: string
    status:{
        aerialSuccess: number
        aerialTry: number
        assist: number
        ballPossesionSuccess: number
        ballPossesionTry: number
        block: number
        blockTry: number
        defending: number
        dribble: number
        dribbleSuccess: number
        dribbleTry: number
        effectiveShoot: number
        goal: number
        intercept: number
        passSuccess: number
        passTry: number
        redCards: number
        shoot: number
        spRating: number
        tackle: number
        tackleTry: number
        yellowCards: number
    }
    
}



function Player({playerCheck, result, getPosition}:any){
    const [homePlayer, setHomePlayer] = useState<IplayerStatus[]>();     
    const [awayPlayer, setAwayPlayer] = useState<IplayerStatus[]>();
    const [playerRecord, setPlayerRecord] = useState<IplayerStatus[]>();

    const getPlayerInfo = () => {
        setTimeout(() => {
            const home = [];
            const away = [];
            for(let i = 0; i < playerCheck.length; i++){
                for(let a = 0; a < result.matchInfo[0].player.length; a++){
                    if(playerCheck[i].id === result.matchInfo[0].player[a].spId){
                        for(let b = 0; b < getPosition.length; b++){
                            if(result.matchInfo[0].player[a].spPosition === getPosition[b].spposition){
                                home.push({
                                    num: getPosition[b].spposition,
                                    name: playerCheck[i].name,
                                    position: getPosition[b].desc,
                                    status: result.matchInfo[0].player[a].status
                                })
                            }

                        }
                    }
                    if(playerCheck[i].id === result.matchInfo[1].player[a].spId){
                        for(let b = 0; b < getPosition.length; b++){
                            if(result.matchInfo[1].player[a].spPosition === getPosition[b].spposition){
                                away.push({
                                    num: getPosition[b].spposition,
                                    name: playerCheck[i].name,
                                    position: getPosition[b].desc,
                                    status: result.matchInfo[0].player[a].status
                                })
                            }

                        }
                    }
                 }
            }
            home.sort(function(a:IplayerStatus,b:IplayerStatus){
                return a.num - b.num 
            })
            away.sort(function(a:IplayerStatus,b:IplayerStatus){
                return a.num - b.num
            })


            setHomePlayer(home);
            setAwayPlayer(away);
        },100)
    }

    
    useEffect(() => {
        getPlayerInfo();
    },[result]);

    const playerInfoSelect = (select:string) => {
        switch(select) {
            case "home":
                setPlayerRecord(homePlayer);
                break;

            case "away":
                setPlayerRecord(awayPlayer);
        }
        
    }

  
       
   

    
console.log(playerRecord);
   

    return(
        <Wrapper>
            <BtnBox>
                <Btn onClick={() =>  playerInfoSelect("home")}>
                    {result.matchInfo[0].nickname}
                </Btn>
                <Btn onClick={() => playerInfoSelect("away")}>
                    {result.matchInfo[1].nickname}
                </Btn>
            </BtnBox>
            <StatusForm>
                <Gk>
                            <Position>포지션</Position>
                            <Name>이름</Name>
                            <PlayerStatus>평점</PlayerStatus>
                            <PlayerStatus>볼 소유 시도 수 </PlayerStatus>
                            <PlayerStatus>볼 소유 성공 수</PlayerStatus>
                            <PlayerStatus>블락 시도 수</PlayerStatus>
                            <PlayerStatus>블락 성공 수</PlayerStatus>
                            <PlayerStatus>패스 시도 수</PlayerStatus>
                            <PlayerStatus>패스 성공 수</PlayerStatus>
                </Gk>
                {playerRecord?.map((palyer:IplayerStatus) => (
                    palyer.num === 0 ? 
                        <Gk>
                            <Position>{palyer.position}</Position>
                            <Name>{palyer.name}</Name>
                            <PlayerStatus>{palyer.status.spRating}</PlayerStatus>
                            <PlayerStatus>{palyer.status.ballPossesionTry}</PlayerStatus>
                            <PlayerStatus>{palyer.status.ballPossesionSuccess}</PlayerStatus>
                            <PlayerStatus>{palyer.status.blockTry}</PlayerStatus>
                            <PlayerStatus>{palyer.status.block}</PlayerStatus>
                            <PlayerStatus>{palyer.status.passTry}</PlayerStatus>
                            <PlayerStatus>{palyer.status.passSuccess}</PlayerStatus>
                        </Gk>
                    : null
                ))}
            
                <FieldBox>
                    <Field >
                                <Position>포지션</Position>
                                <Name>이름</Name>
                                <PlayerStatus>평점</PlayerStatus>
                                <PlayerStatus>득점</PlayerStatus>
                                <PlayerStatus>어시스트</PlayerStatus>
                                <PlayerStatus>슛 수</PlayerStatus>
                                <PlayerStatus>유효 슛 수</PlayerStatus>
                                <PlayerStatus>인터셉트 수</PlayerStatus>
                                <PlayerStatus>디펜딩 수</PlayerStatus>
                                <PlayerStatus>패스 시도 수</PlayerStatus>
                                <PlayerStatus>패스 성공 수</PlayerStatus>
                                <PlayerStatus>드리블 시도 수</PlayerStatus>
                                <PlayerStatus>드리블 성공 수</PlayerStatus>
                                <PlayerStatus>공중볼 경합 시도 수</PlayerStatus>
                                <PlayerStatus>공중볼 경합 성공 수</PlayerStatus>
                                
                    </Field>    
                {playerRecord?.map((palyer:IplayerStatus) => (
                        palyer.num === 0 ? null :  
                            <Field >
                                <Position>{palyer.position}</Position>
                                <Name>{palyer.name}</Name>
                                <PlayerStatus>{palyer.status.spRating}</PlayerStatus>
                                <PlayerStatus>{palyer.status.goal}</PlayerStatus>
                                <PlayerStatus>{palyer.status.assist}</PlayerStatus>
                                <PlayerStatus>{palyer.status.shoot}</PlayerStatus>
                                <PlayerStatus>{palyer.status.effectiveShoot}</PlayerStatus>
                                <PlayerStatus>{palyer.status.intercept}</PlayerStatus>
                                <PlayerStatus>{palyer.status.defending}</PlayerStatus>
                                <PlayerStatus>{palyer.status.passTry}</PlayerStatus>
                                <PlayerStatus>{palyer.status.passSuccess}</PlayerStatus>
                                <PlayerStatus>{palyer.status.dribbleTry}</PlayerStatus>
                                <PlayerStatus>{palyer.status.dribbleSuccess}</PlayerStatus>
                                <PlayerStatus>{palyer.status.aerialTry}</PlayerStatus>
                                <PlayerStatus>{palyer.status.aerialSuccess}</PlayerStatus>
                                
                            </Field>    
                        
                        
                ))}
                </FieldBox>
            </StatusForm>
        </Wrapper>
    )
}

export default Player;