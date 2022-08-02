import { motion } from "framer-motion";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, theme } from "../../theme";

const Wrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    top: 0;
`

const Logo = styled.img`
    background-image: url(https://ssl.nexon.com/s2/game/fo4/obt/sprite_210600.png);
    background-position: 0px -402px;
    width: 218px;
    height: 35px;
    position: absolute;
    text-indent: -9999px;
    top: 24px;
    left: 40px;
    z-index: 2;
    padding: 20px;
`

const SVG  = styled(motion.svg)`
    width: 45px;
    cursor: pointer;
    margin-right: 20px;
    fill: ${(props) => props.theme.black};
    path,g{
        stroke-width: 1px;
        stroke: ${(props) => props.theme.black};
    }
`



const themeModVariant = {
    normal: {
        fillOpacity: 1,

    },
    active: {
        fillOpacity:[1, 0, 1],
        transition: {
            //무한반복
            repeat: Infinity,
            duration: 2
        }
    },
}


function Header(){
    const [themeMod, setThemeMod] = useState(false);
    const setDarkAtom = useSetRecoilState(isDarkAtom);

    const changeMod = () => {
       setThemeMod((prev) => !prev);
       setDarkAtom((prev) => !prev);
    }

    return(
        <Wrapper>
            <Logo />
            {themeMod ?  
                <SVG xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 32 32" onClick={changeMod}  variants={themeModVariant} initial="normal" whileHover="active" >
                 <motion.g><motion.circle cx="16" cy="16" r="9"/>
                    <motion.path d="M17.5,4.13867V2c0-0.82813-0.67139-1.5-1.5-1.5S14.5,1.17188,14.5,2v2.13867c0,0.82813,0.67139,1.5,1.5,1.5   S17.5,4.9668,17.5,4.13867z"/>
                    <motion.path d="M8.67383,8.67285c0.58545-0.58594,0.58545-1.53613-0.00049-2.12109L7.16113,5.04004   c-0.58594-0.58594-1.53564-0.58594-2.12158,0C4.4541,5.62598,4.4541,6.57617,5.04004,7.16113l1.51221,1.51172   C6.84521,8.96582,7.229,9.1123,7.61279,9.1123S8.38086,8.96582,8.67383,8.67285z"/>
                    <motion.path d="M2,17.5h2.13818c0.82861,0,1.5-0.67188,1.5-1.5s-0.67139-1.5-1.5-1.5H2c-0.82861,0-1.5,0.67188-1.5,1.5   S1.17139,17.5,2,17.5z"/>
                    <motion.path d="M5.03955,26.95996c0.29297,0.29297,0.67725,0.43945,1.06104,0.43945s0.76758-0.14648,1.06055-0.43945l1.51221-1.51172   c0.58594-0.58496,0.58594-1.53516,0.00049-2.12109c-0.58594-0.58594-1.53564-0.58594-2.12158,0l-1.51221,1.51172   C4.4541,25.42383,4.4541,26.37402,5.03955,26.95996z"/>
                    <motion.path d="M14.5,27.86133V30c0,0.82813,0.67139,1.5,1.5,1.5s1.5-0.67188,1.5-1.5v-2.13867c0-0.82813-0.67139-1.5-1.5-1.5   S14.5,27.0332,14.5,27.86133z"/>
                    <motion.path d="M24.83887,26.95996c0.29297,0.29297,0.67676,0.43945,1.06055,0.43945s0.76758-0.14648,1.06055-0.43945   c0.58594-0.58594,0.58594-1.53516,0-2.12109l-1.51172-1.51172c-0.58594-0.58594-1.53516-0.58594-2.12109,0   s-0.58594,1.53516,0,2.12109L24.83887,26.95996z"/>
                    <motion.path d="M30,14.5h-2.13867c-0.82813,0-1.5,0.67188-1.5,1.5s0.67188,1.5,1.5,1.5H30c0.82813,0,1.5-0.67188,1.5-1.5   S30.82813,14.5,30,14.5z"/>
                    <motion.path d="M26.95996,5.04004c-0.58594-0.58594-1.53516-0.58594-2.12109,0l-1.51172,1.51172   c-0.58594,0.58594-0.58594,1.53516,0,2.12109c0.29297,0.29297,0.67676,0.43945,1.06055,0.43945s0.76758-0.14648,1.06055-0.43945   l1.51172-1.51172C27.5459,6.5752,27.5459,5.62598,26.95996,5.04004z"/></motion.g>
                </SVG> :
                <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"  onClick={changeMod} variants={themeModVariant} initial="normal" whileHover="active" >
                    <motion.path  d="M216.5,144.6l-2.2.4A84,84,0,0,1,111,41.6a5.7,5.7,0,0,0,.3-1.8,8,8,0,0,0-5-7.9,7.8,7.8,0,0,0-5.2-.2A100,100,0,1,0,224.3,154.9a7.9,7.9,0,0,0,0-4.8A8.2,8.2,0,0,0,216.5,144.6Z"/>
                </SVG>}
            

            
        </Wrapper>
    )
}

export default Header;