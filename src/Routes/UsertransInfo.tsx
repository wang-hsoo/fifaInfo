import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IpalyerInfo, IplayerBuy, IsearchUser, IseasonId, palyerBuy, palyerInfo, playerSell, seasonId } from "../api";

const Wrapper = styled.div`
    margin-top: 30px;
`
const Title = styled.h1`
    font-size: 40px;
    font-weight: 500;
    color: white;
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
    color: white;
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

const TransForm = styled.div`
    margin-top: 10px;
    width: 100%;
`

const TransList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 10px;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 20px;
    place-items: center;
    color: ${(props) => props.theme.black};
    
`

const PlayerInfo = styled.div`
    display: flex;

    div{
        margin-right: 8px;
    }
`

const SeasonImg = styled.div`
    img{
        width: 23px;
        margin-top: 1px;
    }
`

const Name = styled.h1`
    font-size: 17px;
    margin-right: 8px;
    font-weight: 500;
    color: ${(props) => props.theme.black};
`

function UserTransInfo({accessId}:IsearchUser){
    const {data:buy} = useQuery<IplayerBuy[]>(["playerBuy"], () => palyerBuy(accessId));
    
    const {data:sell} = useQuery<IplayerBuy[]>(["playersell"], () => playerSell(accessId));

    const {data:playerInfo} = useQuery<IpalyerInfo[]>(["palyerInfo"], palyerInfo);
    const {data:season} = useQuery<IseasonId[]>(["season"], seasonId);
    const [tradeData, setTradeData] = useState<IplayerBuy[]>();
    const [tradeCheck, setTradeCheck] = useState<Boolean>(false);


    const setData = (event:any) => {
        const value = event.target.outerText;
        setTradeCheck(false);
        switch(value){
            case "영입":
                const tradeBuy = buy
                setTradeData(tradeBuy);
                setTradeCheck(true);
                break;

            case "방출":
                const tradeSell = sell
                setTradeData(tradeSell);
                setTradeCheck(true);
                break;
        }

    }


    

    return(
        <Wrapper>
            <Title>이적시장</Title>
            <Menu>
                <Btn onClick={setData}>영입</Btn>
                <Btn onClick={setData}>방출</Btn>
            </Menu>
            <TransForm>
                {tradeCheck && tradeData?.map((data:IplayerBuy, idx:number) => (
                    <TransList key={idx}>
                        <div>{String(data.spid).substring(3).charAt( 0 ) === '0' ? 
                            <img src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${String(data.spid).substring(3).slice(1)}.png`} /> :
                            <img src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${String(data.spid).substring(3)}.png`} />   
                        }</div>
                        <PlayerInfo>
                            <SeasonImg>{season?.map((info:IseasonId, idx:number)=>(
                                info.seasonId+'' === String(data.spid).substring(0,3) ? 
                                    <img key={idx} src={info.seasonImg} />
                                : null
                            ))}</SeasonImg>

                            <Name>{playerInfo?.map((info:IpalyerInfo) => (
                                data.spid === info.id ? info.name : null
                            ))}</Name>
                        
                            <div>+{data.grade}</div>
                        </PlayerInfo>
                        <div>{data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}BP</div>
                    </TransList>
                ))}
            </TransForm>
        </Wrapper>
    )

}

export default React.memo(UserTransInfo);