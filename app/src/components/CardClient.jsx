'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function CardClient({
  cdClient,
  nmClient,
  nrInst,
  nrAgencia,
  cpf,
  cnpj,
  nrContrato,
  dtContrato,
  vlTotal,
  qtPrestacoes,
  cdProduto,
  dsProduto,
  vlPresta,
  dtVctPre,
  idSituac,
  idSitVen,
  vlAtual
}) {
  const [hovered, setHovered] = React.useState(false)
  const BASE_URL = 'http://localhost:8080'

  const handleSave = async () => {
    const body = {
      nrInst: nrInst,
      nrAgencia: nrAgencia
    }

    const response = await fetch(`${BASE_URL}/agency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`)
      return toast.error(`HTTP error! Status: ${response.status}`, toastConfig);
    } else {
      console.log('Agencia salva no banco!')
      return toast.success('Agencia salva no banco!')
    }
  }

  return (
    <>
      <div 
        className='flex justify-between'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <label className='font-bold text-emerald-950'>{cdClient} - {nmClient}</label>
        {hovered && (<button onClick={handleSave} className='text-md font-bold text-red-500'>SALVAR</button>)}
      </div>
      <article 
        className='border from-neutral-800 rounded-xl mb-5'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className='p-5'>
          <div className='w-full flex'>
            <p className='text-emerald-600 mr-2'>Instituição: </p>
            <p>{nrInst}</p>
          </div>
          <div className='w-full flex'>
            <p className='text-emerald-600 mr-2'>Agência: </p>
            <p>{nrAgencia}</p>
          </div>
          {cpf && (
            <div className='w-full flex'>
              <p className='text-emerald-600 mr-2'>CPF: </p>
              <p>{cpf}</p>
            </div>
          )}
          {cnpj && (
            <div className='w-full flex'>
              <p className='text-emerald-600 mr-2'>CNPJ: </p>
              <p>{cnpj}</p>
            </div>
          )}
          <div className='w-full flex'>
            <p className='text-emerald-600 mr-2 font-semibold'>{nrContrato}</p>
            <p>{dtContrato}</p>
          </div>

          <div className='w-full flex'>
            <div className='w-full flex flex-row'>
              <p className='text-emerald-600 mr-2'>Valor Total:</p>
              <p className='mr-3'>{vlTotal}</p>
            </div>
            <div className='w-full flex'>
              <p className='text-emerald-600 mr-2'>Prestações:</p>
              <p>{qtPrestacoes}</p>
            </div>
          </div>

          <div className='w-full flex'>
            <p className='text-emerald-600 mr-2 font-semibold'>{cdProduto}</p>
            <p>{dsProduto}</p>
          </div>

          <div className='w-full flex'>
            <div className='w-full flex flex-row'>
              <p className='text-emerald-600 mr-2'>Valor Prestação:</p>
              <p className='mr-3'>{vlPresta}</p>
            </div>
            <div className='w-full flex'>
              <p className='text-emerald-600 mr-2'>Data de vencimento:</p>
              <p>{dtVctPre}</p>
            </div>
          </div>

          <div className='w-full flex justify-between'>
            <div className='w-[300px] flex flex-row'>
              <p className='text-emerald-600 mr-2'>Valor Atual:</p>
              <p className='mr-3'>{vlAtual}</p>
            </div>
            <div className='flex text-emerald-600 font-semibold'>
              <p>{idSituac}</p>
            </div>
            <div className='flex text-emerald-600 font-semibold'>
              <p>{idSitVen}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
