import React from 'react'

const Background = ({ children }) => {
    return (
        <div className='d-flex  justify-content-center align-items-center'>
            <div className="context">
                {children}
            </div>
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </div>
    )
}

export default Background
