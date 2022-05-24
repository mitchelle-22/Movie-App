import { useState, useEffect, useRef} from "react";
//api_key
import API from '../Api';
import {isPersistedState} from '../helpers';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {

    const [searchTerm, setSearchTerm]= useState('');
    const [cool, setCool] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsloadingMore] = useState(false);


    // console.log(searchTerm);

    const fetchMovie = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page); 
            var sortedArray = movies.results;
            sortedArray.sort((a, b) => b.release_date > a.release_date ? 1 : -1)
            
             setCool(prev => ({
               ...sortedArray,
                results:
                 page > 1 ?[...prev.results, ...sortedArray ] : [...sortedArray]
                 
             }));     
          
        }
        catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    //initial render and search
    useEffect(() => {
        if(!searchTerm){
            const sessionStat = isPersistedState
        }

        setCool(initialState);
        fetchMovie(1, searchTerm);
    },[searchTerm]);

    //load more
    useEffect(()=>{
        if(!isLoadingMore) return;
        fetchMovie(cool.page + 1, searchTerm);
        setIsloadingMore(false);
    },[isLoadingMore, searchTerm, cool.page]);


    return{cool, loading,error, searchTerm,setSearchTerm, setIsloadingMore };
}