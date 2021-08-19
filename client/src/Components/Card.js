import React from 'react'

export default function Card(props) {
    const title = props.title;
    const instructor = props.instructor;
    const onclick = props.onClick;
    return (
        <div className="card w-25 p-2 m-2" onClick={onclick} >
            <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
            {/* <div className="card-img-overlay">
                <h5 class="card-title">{title}</h5>
                <p className="card-text">{instructor}</p>
            </div> */}
            <div className="card-body">
                <h5 class="card-title">{title}</h5>
                <p className="card-text">{instructor}</p>
            </div>
            <div className="card-footer">
                Hello
            </div>
        </div>
    )
}
