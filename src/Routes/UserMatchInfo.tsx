import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ImatchInfo, IpalyerInfo, IsearchUser, matchInfo, palyerInfo, userMatchCode } from "../api";
import LineUp from "./Components/LineUp";
import Player from "./Components/Player";

import Record from "./Components/Record";

const Wrapper = styled.div`
    width: 100%;
    margin-top: 30px;
`

const Title = styled.h1`
    font-size: 40px;
    font-weight: 500;
    color: ${(props) => props.theme.bgColor};
    border-bottom: 2px solid white; 
    padding-bottom: 8px;
`

const Menu = styled.div`
    display: flex;
    margin-top: 13px;
`

const Btn = styled.div`
    cursor: pointer;
    margin-right: 10px;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.dark};
    text-align: center;
    padding: 10px 30px;
    border-radius: 20px;
    opacity: 0.5;
    transition: transform 0.5s;
    &:active{
        opacity: 1;
        
    }
`
const MatchList = styled.div`
    margin-top: 20px;
    width: 100%;
`
const MatchTItle = styled.h2`
    color: ${(props) => props.theme.bgColor};
    font-size: 30px;
    font-weight: 500;
`

const Matchform = styled.div`
    margin-top: 10px;
`

const MatchCover = styled.div`
    display: block;
    margin-bottom: 20px;
    margin-top: 20px;
`

const MatchContent = styled(motion.div)`
    background-color: rgba(255,255,255,0.9);
    display: flex;
    padding:  30px 30px;
    font-weight: 500;
    border-radius: 15px;
    align-items: center;
    cursor: pointer;
    div{
        font-weight: 600;
    }
`

const Vs = styled.div`
    font-size: 40px;
    margin-right: 30px;
    font-weight: 600;
`

const Opponent = styled.h1`
    font-size: 20px;
    font-weight: 600;
    margin-top: 7px;
    margin-right: 30px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Score = styled.div`
    display: flex;
    font-size: 20px;
    margin-top: 4px;
    margin-right: 80px;
    div{
        margin-right: 10px;
    }
`

const MatchResult = styled.div<{resultColor:string}>`
    color: ${(props) => props.resultColor};
`

const MatchDetail = styled(motion.div)`
    width: 100%;
    height: 500px;
    background-color: ${(props) => props.theme.bgColor};
    position: relative;
    border-radius: 15px;
    margin-top: -120px;
    margin-bottom: 20px;
    
`

const MatchHeader = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding-top: 23px;
`

const DetailBtnList =styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    justify-content: space-around;
    font-weight: 500;
    background-color: ${(props) => props.theme.dark};
`

const DetailBtn = styled.div`
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
`



function UserMatchInfo({accessId, nickname}:IsearchUser){
    const [changeMatchMode, setChangeMatchMode] = useState<string>("50");
    const {data:matchid} = useQuery<string>(["matchCode", accessId, changeMatchMode], () => userMatchCode(accessId, changeMatchMode));
    const {data, isLoading} = useQuery<any>(["matchInfo", matchid ], () => matchInfo(matchid));
    const [matchResult, setMatchResult] = useState<any>();
    const [matchTitle, setMatchTitle] = useState<string>("공식경기");
    const [matchDetail, setMatchDetail]  = useState("");
    const [playerCheck, setPalyerCheck] = useState<any>();
    const {data:playerInfo} = useQuery<IpalyerInfo>(["palyerInfo"], palyerInfo);
    const [changeMatchDetail, setChangeMatchDetail] = useState<string>("LineUp");
    
    

    useEffect(() => {
        
        setTimeout(() => {
            if(data?.info){
                Promise.all(data?.info).then((value:any) => setMatchResult(value))
            }   
            if(playerInfo){
                const palyer = {
                    default: playerInfo
                }
                setPalyerCheck(palyer);
            }
        }, 100);
           
    },[data,matchDetail])
    
    const changeMatch = (event:any) => {
        const title = event.target.innerText;
        switch(title){
            case "공식경기":
                setChangeMatchMode("50");
                setMatchTitle(title);
                break;
            
            case"클래식 1on1":
                setChangeMatchMode("40");
                setMatchTitle(title);
                break;
        }
    }

  
   
   


  
   


    

    return(
        <Wrapper>
            <Title>매치기록</Title>
            <Menu>
                <Btn onClick={changeMatch}>공식경기</Btn>
                <Btn onClick={changeMatch}>클래식 1on1</Btn>
            </Menu>

           { isLoading ? <div>로딩중</div> :
            <MatchList>
                <MatchTItle>{matchTitle}</MatchTItle>
                    <Matchform>
                        {matchResult?.map((result:any) => (
                            <MatchCover>
                                <MatchContent key={result.matchId} onClick={() => setMatchDetail(result.matchId)} layoutId={result.matchId}>
                                    <Vs>vs</Vs>
                                    <Opponent>
                                        {result.matchInfo[0].nickname === nickname ? result.matchInfo[1].nickname : result.matchInfo[0].nickname }
                                    </Opponent>
                                    <Score>
                                        <div>{result.matchInfo[0].shoot.goalTotal}</div>
                                        <div> : </div>
                                        <div>{result.matchInfo[1].shoot.goalTotal}</div>
                                    </Score>
                                    <MatchResult 
                                        resultColor={result.matchInfo[0].nickname === nickname ? result.matchInfo[0].matchDetail.matchResult === "승" ? "blue" :  result.matchInfo[0].matchDetail.matchResult === "패" ? "red" : "black"
                                            : result.matchInfo[1].matchDetail.matchResult === "승" ? "blue" :  result.matchInfo[1].matchDetail.matchResult === "패" ? "red" : "black"}
                                    >
                                        {result.matchInfo[0].nickname === nickname ? result.matchInfo[0].matchDetail.matchResult : result.matchInfo[1].matchDetail.matchResult}
                                    </MatchResult>
                                </MatchContent>
                                <AnimatePresence initial={false}>
                                   {matchDetail === result.matchId  && 
                                   <MatchDetail layoutId={result.matchId}>
                                        <MatchHeader>
                                            <Opponent>
                                                <div>{result.matchInfo[0].nickname}</div>
                                                <div>{result.matchInfo[0].shoot.goalTotal}</div>
                                            </Opponent>
                                            <Vs>vs</Vs>
                                            <Opponent>
                                                <div>{result.matchInfo[1].nickname}</div>
                                                <div>{result.matchInfo[1].shoot.goalTotal}</div>
                                            </Opponent>
                                        </MatchHeader>
                                        <DetailBtnList>
                                            <DetailBtn onClick={() => setChangeMatchDetail("LineUp")}>라인업</DetailBtn>
                                            <DetailBtn onClick={() => setChangeMatchDetail("player")}>선수 스탯</DetailBtn>
                                            <DetailBtn onClick={() => setChangeMatchDetail("record")}>경기 기록</DetailBtn>
                                        </DetailBtnList>
                                        {changeMatchDetail === "LineUp" && <LineUp />} 
                                        {changeMatchDetail === "player" && <Player />} 
                                        {changeMatchDetail === "record" && <Record />} 
                                    </MatchDetail>}
                                </AnimatePresence>
                            </MatchCover>
                            
                            
                        ))}
                    </Matchform> 
                </MatchList>

            }
        </Wrapper>
    )
}

export default React.memo(UserMatchInfo);