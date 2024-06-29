// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Sidebar(props) {
    const {handleToggleModal, data} = props
    return (
        <div className='sidebar'>
            <div onClick={handleToggleModal}>
                <div className='bgOverlay'/>
                <div className='sidebarContents'/>
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}
                    </p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className='fa-solid fa-arrow-right'></i>
                </button>
            </div>
        </div>
    )
}
