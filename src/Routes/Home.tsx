import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserSerach from "./UserSearch";


const Wrapper =styled.div`
    width: 100vw;
    height: 91.5vh;
    position: relative;
    background-image: url("//ssl.nexon.com/s2/game/fo4/obt/theme/theme_icon/bg_main.jpg");
    background-position: center;
    background-color: ${(props => props.theme.mainBack)};
    background-blend-mode: multiply;
`

const MenuList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
`
const SVG = styled.svg`
    fill: ${(props) => props.theme.bgColor};
    cursor: pointer;
`

const Title = styled.h1`
    color: ${(props) => props.theme.bgColor};
    font-size: 28px;
    font-weight: 500;
    margin-top: 10px;
`

const MenuBox = styled(motion.div)`
    width: 350px;
    height: 350px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.darkBorwn};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const MenuDetail = styled(motion.div)`
    width: 50vw;
    height: 80vh;
    background-color: ${(props) => props.theme.darkBorwn};
    position: absolute;
    top: 20px;
    left: 23%;
    border-radius: 20px;
`
const DeleteBtn = styled.svg`
    position: fixed;
    margin-left: 870px;
    fill: white;
    cursor: pointer;
`

const DetailBox = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    

    &::-webkit-scrollbar{
        width: 0.5em;
        
    }
    &::-webkit-scrollbar-track{
        background-color: none;
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${(props) => props.theme.bgColor};
        border-radius: 20px;
    }
   
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
                    <SVG xmlns="http://www.w3.org/2000/svg" height="100px" version="1.1" viewBox="0 0 512 512" width="100px" >
                        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/></SVG>
                    <Title>유저 검색</Title>    
                </MenuBox>
                <MenuBox />
                <MenuBox />
                <MenuBox />
            </MenuList>
            
            
            <AnimatePresence>
                {selectMenu && selectMenu === "userSearch" && (
                    <MenuDetail layoutId={selectMenu}>
                        <DetailBox>
                        
                            <DeleteBtn xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" height="80" id="Layer_1" viewBox="0 0 200 200" width="80" 
                            onClick={() => {
                                setSelectMenu("");
                                history.push("/");
                            }}>
                                <title/><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                            </DeleteBtn>
                           
                            
                        
                            <UserSerach />

                        </DetailBox>
                    </MenuDetail>
                    )}
            </AnimatePresence>
           
            
        </Wrapper>
    )
}

export default Home;