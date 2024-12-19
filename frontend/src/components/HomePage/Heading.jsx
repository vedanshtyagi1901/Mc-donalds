import React from 'react'

function Heading() {
    return (
        <>
            {/* This is the heading of my home page */}
            <div className="company-logo mx-96 pt-2 overflow-hidden justify-center text-center">

                {/* Image on left */}
                <img src="./various-items/images.jpg" alt="" srcSet="" className="h-[150px] inline rounded-full" />
                <br />
                {/* Text on right */}
                <div className="inline text-5xl font-bold text-[#DA291C]">MC Donalds</div>

            </div>
        </>
    )
}

export default Heading