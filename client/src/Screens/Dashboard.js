import React from 'react'
import StCard from '../Components/StCard'
import { StudentData } from '../Components/Data'

export default function Dashboard() {
    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <div className="row">
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
