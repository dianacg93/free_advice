import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CLIENT_URL} from '../Constants'
import Advice from './Advice'

const Main = () => {

    const [randomAdvice, setRandomAdvice] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchAdvice = async () => {
            try{
                const res = await axios.get(CLIENT_URL);
                const {advice} = res.data.slip;
                setRandomAdvice(advice);
            } catch (e) {
                console.log(e);
            }
        }
        fetchAdvice();
    },[]);

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const fetchData = async () => {
        try{
            console.log("search: ", search)
            const res = await axios.get(`${CLIENT_URL}/search/${search}`);
            console.log(res)
            setSearchResults(res.data.slips )
        } catch (e) {
            console.log("Error", e)
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div>
            <h4>{randomAdvice}</h4>

            <input onChange={handleChange}/>
            <button onClick={fetchData}> Search</button>
            <ul>
            {
                searchResults ? 
                searchResults.map((el, i) => {
                    const {advice} = el;
                    return <Advice advice={advice} id={i} />
                })
                : ""
            }
            </ul>
        </div>
    )
}

export default Main;