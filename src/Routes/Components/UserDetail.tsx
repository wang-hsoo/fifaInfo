import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { divisionType, IdivisionType, ImatchType, IpalyerInfo, IsearchUser, IuserDivision, matchType, palyerInfo, userMaxdivision } from "../../api";
import UserMatchInfo from "../UserMatchInfo";
import UserTransInfo from "../UsertransInfo";

const Wrapper =styled.div`
    width: 700px;
    height: 90%;
    margin-top: 30px;
`
const Title = styled.h1`
    color: ${(props) => props.theme.bgColor};
    font-size: 45px;
    font-weight: 900;
    padding-bottom: 8px;
    width: 100%;
    border-bottom: 2px solid white;
`

const MaxList = styled.div`
    width: 80%;
    margin-top: 10px;
`

const MaxContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 700px;
    background-color: aliceblue;
    place-items: center;
    padding: 10px 0;
    font-weight: 400;
`
const Row = styled.div`
    display: flex;
    width: 700px;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.bgColor};
    padding: 8px 0;
`

const RowList = styled.div`
    font-size: 18px;
    font-weight: 600;
`

const Submenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;

`


const SubList = styled.div`
    margin-right: 5px;
    position: relative;
`

const Btn = styled(motion.button)`
    border: none;
    background-color:transparent;
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    opacity: 0.5;
    scale: 1;
    
    &:hover{
        font-weight: 600;
    }
`
const MenuCheck = styled(motion.div)`
    
`

const Circle = styled(motion.svg)`
    position: absolute;
    margin-left: 40px;
    fill: #ac9a00;
`;

const btnVariant = {
    active: {
        opacity: 1,
        scale: 1.2,
        
        
    }
}

function UserDetail({accessId, nickname, level}:IsearchUser){
    const history = useHistory();
    const {data, isLoading} = useQuery<IuserDivision>(["maxDivision"], () => userMaxdivision(accessId));
    const {data:mathCode} = useQuery<ImatchType>(["matchType"], matchType);
    const {data:divisionCode} = useQuery<IdivisionType>(["divisiontype"], divisionType);
    const [maxDivision, setMaxDivision] = useState<any>();
    const [division, setDivision] = useState<any>();
    const [divisionName, setDivisionName] = useState<any>();
    const trans = useRouteMatch(`/userSearch/${nickname}/trans`);
    const math = useRouteMatch(`/userSearch/${nickname}/math`);
    const {data:playerInfo} = useQuery<IpalyerInfo>(["palyerInfo"], palyerInfo);


     useEffect(() => {
        setTimeout(() => {
            if(data){
                const getMaxDivision = {
                    default: data
                }
    
                const divisionCheck = {
                    default: mathCode
                }
    
                const divisionMax = {
                    default: divisionCode
                }
    
                setMaxDivision(getMaxDivision);
                setDivision(divisionCheck);
                setDivisionName(divisionMax);
            }
        },100)
        
     },[data])

     const tarnsMove = () => {
        history.push(`/userSearch/${nickname}/trans`);
     }
     const mathMove = () =>{
        history.push(`/userSearch/${nickname}/math`)
     }

     
     
    return(
        <Wrapper>
            <Title>{nickname}</Title>
            <MaxList>
                <Row>
                    <RowList>매치종류</RowList>
                    <RowList>디비전</RowList>
                    <RowList>달성일자</RowList>
                </Row>
                {maxDivision && maxDivision?.default.map((info:any) => (
                    <MaxContent>

                        <div>{division && division?.default.map((match:any) => (
                            <div>{match.matchtype === info.matchType ? match.desc : null}</div>
                        ))}</div>

                        <div>{divisionName && divisionName?.default.map((match:any) => (
                            <div>{match.divisionId === info.division ? match.divisionName : null}</div>
                        ))}</div>

                        <div>{info.achievementDate}</div>
                    </MaxContent>
                ))}
            </MaxList>
            <Submenu>
                <SubList>
                    <Btn onClick={tarnsMove} variants={btnVariant} whileHover="active">이적시장 기록</Btn>
                    {trans && <MenuCheck layoutId="circle">
                         <Circle  xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 1792 1792" width="15">
                            <path d="M609 816l287-208 287 208-109 336h-355zm287-816q182 0 348 71t286 191 191 286 71 348-71 348-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71zm619 1350q149-203 149-454v-3l-102 89-240-224 63-323 134 12q-150-206-389-282l53 124-287 159-287-159 53-124q-239 76-389 282l135-12 62 323-240 224-102-89v3q0 251 149 454l30-132 326 40 139 298-116 69q117 39 240 39t240-39l-116-69 139-298 326-40z"/>
                            </Circle>
                        
                    </MenuCheck>}
                    
                </SubList>

                <SubList>
                    <Btn onClick={mathMove} variants={btnVariant} whileHover="active">매치 기록</Btn>
                    {math && <MenuCheck layoutId="circle">
                        <Circle xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 1792 1792" width="15">
                            <path d="M609 816l287-208 287 208-109 336h-355zm287-816q182 0 348 71t286 191 191 286 71 348-71 348-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71zm619 1350q149-203 149-454v-3l-102 89-240-224 63-323 134 12q-150-206-389-282l53 124-287 159-287-159 53-124q-239 76-389 282l135-12 62 323-240 224-102-89v3q0 251 149 454l30-132 326 40 139 298-116 69q117 39 240 39t240-39l-116-69 139-298 326-40z"/>
                            </Circle>
                        
                    </MenuCheck>}
    
                </SubList>
            
            </Submenu>

            {trans && <UserTransInfo accessId = {accessId} />}
            {math && <UserMatchInfo  accessId = {accessId}  nickname = {nickname} />}
        </Wrapper>
    )
}

export default UserDetail;