import{useState,useEffect} from 'react';
import API from '../Api';

export const useMovieFecth = movieID =>{
    const[cool, setCool]= useState({});
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieID);
                const credits = await API.fetchCredits(movieID);
                //get directors
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setCool({
                ...movie,
                actors: credits.cast,
                directors
                })

                setLoading(false);

            }catch(error){
                setError(true);
            }
          
        }
        fetchData()
    },[movieID]);
   
    return{cool,loading, error};
}