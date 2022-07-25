import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ImatchType, ImaxDivision, IsearchUser, IuserDivision, matchType, userMaxdivision } from "../../api";

const MaxList = styled.div`
    width: 80%;
`

const MaxContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    place-items: center;

`
const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
`

function UserDetail({accessId, nickname, level}:IsearchUser){
    const {data, isLoading} = useQuery<IuserDivision>(["maxDivision"], () => userMaxdivision(accessId));
    const {data:mathCode} = useQuery<ImatchType>(["matchType"], matchType);
    const [maxDivision, setMaxDivision] = useState<any>();
    const [division, setDivision] = useState<any>();

    
     useEffect(() => {
        if(data){
            const getMaxDivision = {
                default: data
            }

            const divisionCheck = {
                default: mathCode
            }

            setMaxDivision(getMaxDivision);
            setDivision(divisionCheck);
        }
     },[data])

     console.log(mathCode);
     
    return(
        <div>
            <h1>{nickname}</h1>
            <MaxList>
                <Row>
                    <div>매치종류</div>
                    <div>디비전</div>
                    <div>달성일자</div>
                </Row>
                {maxDivision && maxDivision?.default.map((info:any) => (
                    <MaxContent>

                        <div>{division && division?.default.map((match:any) => (
                            <div>{match.matchtype === info.matchType ? match.desc : null}</div>
                        ))}</div>
                        <div>{info.division}</div>
                        <div>{info.achievementDate}</div>
                    </MaxContent>
                ))}
            </MaxList>
        </div>
    )
}

export default UserDetail;