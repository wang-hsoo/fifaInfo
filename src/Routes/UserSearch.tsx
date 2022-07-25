import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IsearchUser, searchUser } from "../api";
import UserDetail from "./Components/UserDetail";

const Wrapper = styled(motion.div)`

`

const Search = styled.form`
    
`

const Input = styled.input`
    
`

const List = styled.div`
    
    div{
        cursor: pointer;
    }
`

interface IForm{
    userName: string;
}

function UserSerach(){
    const {register, handleSubmit } = useForm<IForm>();
    const [userName, setUserName] = React.useState("");
    const {data, isLoading} = useQuery<IsearchUser>(["user", userName], () => searchUser(userName));
    const history = useHistory();
    const [userDetail, setUserDetail] = useState(false);
    const onValid = (data:IForm) =>{
       setUserName(data.userName);
       setUserDetail(false);
    }

    

    return(
        <Wrapper>
            <Search onSubmit={handleSubmit(onValid)}>
                <Input 
                    {...register("userName", {required:true, minLength:2})}
                    placeholder="닉네임"
                />
            </Search>
            <List>
                <div onClick={() => {
                    setUserDetail(true);
                    history.push(`/userSearch/${data?.nickname}`);
                }}>
                    {data?.nickname}
                </div>
            </List>
            {userDetail ? <UserDetail 
                    nickname = {data?.nickname+""}
                    accessId = {data?.accessId+""}
                    level= {data?.level || 0}
                /> : null}
            
        </Wrapper>
    )

}

export default UserSerach;