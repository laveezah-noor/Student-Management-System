import React, { useEffect, useState } from 'react'
import StCard from '../Components/StCard'
import { StudentData } from '../Components/Data'
import axios from 'axios';


export default function Dashboard(props) {
    const [data, setData] = useState([])
    const getData = () => {
        axios
          .get(`http://localhost:4000/dashboard`)
          .then((response) => response.data)
          .then((response) => setData(response));
        console.log(data);
        
    };    
    useEffect(() => {
        getData();
    }, [props]);

    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <div className="row">
            {data.map(item=>
            <StCard 
                    title={item.label}
                    icon={'fa-chalkboard'} 
                    cls={'red'} 
                    value={item.value} />
            )}
            {
                StudentData.map(item=>{
                    return(
                    <StCard 
                    title={item.title}
                    icon={item.icon} 
                    cls={item.class} 
                    value={item.value} />
                )})
            }
            
            </div>
        </div>
    )
}
