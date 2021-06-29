import React from 'react';
import './StCard.css'

export default function StCard({title, icon, cls, value}) {
    return (
        <div className={`main ${cls}`}>
            <div className="title">
                {/* Title */}
                <i className={`fas ${icon}`}></i>
                {title}
            </div>
            <div className="hr"/>
            <div className="text">
                {/* Value */}
                {value}
            </div>
        </div>
    )
}
