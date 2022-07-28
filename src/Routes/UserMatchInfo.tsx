import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ImatchInfo, IsearchUser, matchInfo, userMatchCode } from "../api";

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
    
`

const Opponent = styled.h1`
    font-size: 20px;
    font-weight: 600;
    margin-top: 7px;
    margin-right: 30px;
    width: 250px;
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
    background-color: black;
    position: relative;
    border-radius: 15px;
    margin-top: -120px;
    margin-bottom: 20px;
    
`



function UserMatchInfo({accessId, nickname}:IsearchUser){
    const [changeMatchMode, setChangeMatchMode] = useState<string>("50");
    const {data:matchid} = useQuery<string>(["matchCode", accessId, changeMatchMode], () => userMatchCode(accessId, changeMatchMode));
    const {data, isLoading} = useQuery<any>(["matchInfo", matchid ], () => matchInfo(matchid));
    const [matchResult, setMatchResult] = useState<any>();
    const [matchTitle, setMatchTitle] = useState<string>("공식경기");
    const [matchDetail, setMatchDetail]  = useState("");

    
    

    useEffect(() => {
        
        setTimeout(() => {
            if(data?.info){
                Promise.all(data?.info).then((value:any) => setMatchResult(value))
            }   
        }, 2000);
           
    },[data])
    
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

  
   
   

    console.log(matchResult, isLoading)
  
   


    

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
                                   {matchDetail === result.matchId  && <MatchDetail layoutId={result.matchId} onClick={() => setMatchDetail("")}>

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