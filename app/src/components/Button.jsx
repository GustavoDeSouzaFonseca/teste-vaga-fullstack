import React from 'react'

export default function Button({ onClick, text }) {
  return (
    <button 
      className='w-[170px] h-[50px] mx-5 bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-xl text-white font-semibold text-lg shadow drop-shadow-xl shadow-black'
      onClick={onClick}
    >
      {text}
    </button>
  )
}
