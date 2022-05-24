import { React } from 'react';

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//components
import HeroImage from './HeroImage'
//hook
import { useHomeFetch } from '../hooks/useHomeFetch';
//image
import NoImage from '../pictures/no_image.jpeg';
import Grid from './Grid'
import Thumb from './Thumb'

import Spinner from './Spinner';

import SearchBar from './SearchBar';

import Button from './Button';

const Home = () => {

    const { cool,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsloadingMore
    } = useHomeFetch();

    

    if (error)
    return(
          <div>Something went wrong.....</div>
          )
        
       
    
      

    return (
        <>
            {!searchTerm && cool.results[0] ?
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${cool.results[0].backdrop_path}`}
                    title={cool.results[0].original_title}
                    text={cool.results[0].overview}
                />
                : null
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {cool.results.map(movie => (
                    <Thumb
                        key={movie.id}
                        clickable={true}
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {cool.page < cool.total_pages && !loading && (
                <Button text='Load More' callback={() => setIsloadingMore(true)} />
            )}
        </>
    )

};

export default Home;
