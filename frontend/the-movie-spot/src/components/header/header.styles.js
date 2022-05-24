import styled from 'styled-components';


export const Wrapper = styled.div`
background: var(--darkGrey);
// padding: 0 10px;
`;

export const Content = styled.div`
display: flex; 
align-items: center;
justify-content: space-between;
max-width:var(--maxWidth);
padding: 0 20px;
margin: 0 auto;

`;

export const LogoImg = styled.img`
width: 200px;
@media screen and (max-width:500px){
    width: 200px;
}
`;

export const TMDBLogoImage = styled.img`
width: 100px;
@media screen and (max-width:500px){
    width: 80px;
}
`;