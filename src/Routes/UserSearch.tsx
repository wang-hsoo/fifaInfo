import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IsearchUser, searchUser } from "../api";
import UserDetail from "./Components/UserDetail";

const Wrapper = styled.div`
    padding: 25px;
    padding-right: 80px;
    
`

const Search = styled.form`
    
`

const Input = styled.input`
    width: 40%;
    outline: none;
    border: none;
    background: transparent;
    border-bottom:  2px solid #ffffff;
    color: ${(props) => props.theme.bgColor};
    font-weight: bold;
    padding-bottom: 5px;
    margin-top: 20px;
    font-size: 24px;
    &::placeholder{
        color: ${(props) => props.theme.bgColor};
        opacity: 0.7;
    }
    &:focus::placeholder{
        color: transparent;
    }
`

const List = styled.div`
    
`

const Name = styled.div`
    width: 200px;
    margin-top: 10px;
    color: ${(props) => props.theme.black};
    cursor: pointer;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 20px;
    font-weight: 500;
    font-size: 15px;
    display: flex;
    div{
        margin-left: 5px;
        margin-right: 5px;
    }
`

interface IForm{
    userName: string;
}

function UserSerach(){
    const {register, handleSubmit } = useForm<IForm>();
    const [userName, setUserName] = React.useState("");
    const {data} = useQuery<IsearchUser>(["user", userName], () => searchUser(userName));
    const history = useHistory();
    const [userDetail, setUserDetail] = useState(false);
    const [searchName, setSearchName]= useState(false);
    const onValid = (data:IForm) =>{
       setUserName(data.userName);
       setUserDetail(false);
       setSearchName(true);
       
    }



    

    return(
        <Wrapper>
            <Search onSubmit={handleSubmit(onValid)}>
                <Input 
                    {...register("userName", {required:true, minLength:2})}
                    placeholder="닉네임"
                    autoComplete="off"  
                />
            </Search>
            <List>

                {searchName && <Name onClick={() => {
                    setUserDetail(true);
                    history.push(`/userSearch/${data?.nickname}`);
                }}>
                    <div>Lv.{data?.level}</div>
                    <div>{data?.nickname}</div>
                </Name>}
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