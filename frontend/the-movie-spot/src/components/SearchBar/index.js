import React, { useState, useEffect, useRef } from 'react';

//Image

import searchIcon from '../../pictures/search-icon.svg';
//styles
import { Wrapper, Content } from './Search.styles';

const SearchBar = ({ setSearchTerm }) => {
    const[cool, setState]= useState('');
    const initial = useRef(true);



    useEffect(()=>{
        if(initial.current){
            initial.current = false;
            return;
        }

        const timer = setTimeout(()=>{
            setSearchTerm(cool);
        },500)
        return () => clearTimeout(timer)
    },[setSearchTerm, cool])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input
                 type='text' 
                 placeholder='Search Movie'
                 onChange = {event => setState(event.currentTarget.value)} 
                 value={cool}
                 />
            </Content>
        </Wrapper>
    )
};

export default SearchBar;
