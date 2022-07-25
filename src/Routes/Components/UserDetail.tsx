import { useQuery } from "react-query";
import { ImatchType, IsearchUser, IuserDivision, matchType, userMaxdivision } from "../../api";

function UserDetail({accessId, nickname, level}:IsearchUser){
    const {data, isLoading} = useQuery<IuserDivision>(["maxDivision"], () => userMaxdivision(accessId));
    const {data:mathCode} = useQuery<ImatchType>(["matchType"], matchType);
    console.log(data);    

    return(
        <div>
            <h1>{nickname}</h1>
        </div>
    )
}

export default UserDetail;