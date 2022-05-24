import React from "react";
import { Link } from 'react-router-dom';

import logo from '../../pictures/movie-logo.svg';

import TMDBLog from '../../pictures/logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImage } from "./header.styles";

const Header = () => (
    <Wrapper>
        <Content> 
        <Link to='/'>
            <h1>The Movie Spot</h1>
            </Link>
            <h2> SignUp</h2>
            <Link to='/'>
            <div>
            <TMDBLogoImage src={TMDBLog} alt="tmbdLogo" />

            </div>   
            {/* <LogoImg src={logo} alt="logo" /> */}
            </Link>
           
            {/* <TMDBLogoImage src={TMDBLog} alt="tmbdLogo" /> */}
        </Content>
    </Wrapper>
);
export default Header;



