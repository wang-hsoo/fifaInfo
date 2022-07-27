import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ImatchInfo, matchInfo, userMatchCode } from "../api";

function UserMatchInfo(accessId:any){

    const {data:matchid} = useQuery<string>(["matchCode", accessId], () => userMatchCode(accessId.accessId));
    const {data} = useQuery<any>(["matchInfo", matchid ], () => matchInfo(matchid));

    const [matchResult, setMatchResult] = useState<any>([]);


    useEffect(() => {
         Promise.all(data.default).then((value) => setMatchResult(value));

        console.log(matchResult[0].matchInfo[0]);
    },[data])
    

   
       
  
   


    

    return(
        <div>
            <h1>매치기록</h1>
            <div>
                {matchResult.map((result:any) => (
                    <div>
                        <div>{result.matchInfo[0].nickname} vs {result.matchInfo[1].nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserMatchInfo;