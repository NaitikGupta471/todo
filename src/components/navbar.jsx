import React from 'react'

const navbar = () => {
  return (
    <div className='flex justify-between px-16 max-md:text-sm max-md:px-8 p-3 text-lg font-semibold bg-purple-950 text-white'>
        <div className="logo"> <a href="/">iTask Manager</a></div>
        <div className="basic ">
            <ul className='flex max-md:gap-2 gap-7'>
                <li><a href="">Home</a> </li>
                <li><a href="">About</a> </li>
                <li><a href="">Log In</a> </li>
            </ul>
        </div>
    </div>
  )
}

export default navbar