import React from 'react'

export default function Header() {
  return (
    <section className='w-full h-32 bg-gradient-to-r from-emerald-700 via-emerald-950 to-emerald-950 flex items-center justify-around text-white'>
      <div className='w-[400px]'/>
      <h3 className='text-3xl font-bold'>Importe seus clientes</h3>
      <div className='w-[400px] flex flex-col items-center'>
        <span className='text-sm'>created by</span>
        <a href='https://www.linkedin.com/in/gustavo-fonseca-/' className='font-semibold text-2xl text-emerald-500'>Gustavo Fonseca</a>
      </div>
    </section>
  )
}
