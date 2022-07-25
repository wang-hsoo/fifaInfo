import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserSerach from "./UserSearch";


const Wrapper =styled.div`
    width: 100vw;
    height: 80vh;
    position: relative;
`

const MenuList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
`

const MenuBox = styled(motion.div)`
    width: 350px;
    height: 350px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.header};
    cursor: pointer;
`
const MenuDetail = styled(motion.div)`
    width: 50vw;
    height: 80vh;
    background-color: ${(props) => props.theme.header};
    position: absolute;
    top: 20px;
    left: 23%;
`



function Home(){
    const [selectMenu, setSelectMenu] = useState("");
    const history = useHistory();

    return(
        <Wrapper>
            <MenuList>
                <MenuBox layoutId="userSearch" onClick={() => {
                    setSelectMenu("userSearch");
                    history.push("/userSearch")
                }}>
                    <h3>유저 검색</h3>    
                </MenuBox>
                <MenuBox />
                <MenuBox />
                <MenuBox />
            </MenuList>
            
            
            <AnimatePresence>
                {selectMenu && selectMenu === "userSearch" && (
                    <MenuDetail layoutId={selectMenu}>
                            <button onClick={() => {
                                setSelectMenu("");
                                history.push("/");
                            }}>
                                X
                            </button>
                            <UserSerach />
                    </MenuDetail>
                    )}
            </AnimatePresence>
           
            
        </Wrapper>
    )
}

export default Home;