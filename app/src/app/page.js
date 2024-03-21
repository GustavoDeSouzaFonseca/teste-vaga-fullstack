'use client'
import React from 'react'
import Header from '@/components/Header'
import FileInput from '@/components/InputFile';
import Button from '@/components/Button';
import CardClient from '@/components/CardClient';
import Services from '@/services/apiService';
import Image from 'next/image';
import kronoosLogo from '../assets/kronooslogo.svg'
import { ToastContainer } from 'react-toastify';

export default function Page() {
  const [file, setFile] = React.useState(false)
  const [cards, setCards] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  let abortController = new AbortController();

  const handleSendFile = async () => {
    try {
      const readable = await Services.consumeAPI(selectedFile, abortController.signal);
      setFile(true)
      console.log("API consumption started...");
      await readable.pipeTo(await Services.renderClientOnCard(window), { signal: abortController.signal })
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleSelectedFile = async (response) => {
    setSelectedFile(response)
  }

  React.useEffect(() => {
    const cardReceivedHandler = (event) => {
      const newCard = event.detail;
      setCards(prevCards => [...prevCards, newCard]);
    };

    window.addEventListener('cardReceived', cardReceivedHandler);

    return () => {
      window.removeEventListener('cardReceived', cardReceivedHandler);
    };
  }, []);

  const stopFetching = async () => {
    await abortController.abort()
    console.log('aborting...')
  }

  return (
    <div className='w-screen'>
      <Header />
      <section className='w-full h-[600px] bg-white flex flex-col items-center justify-center'>
        {!file ? (
          <>
            <FileInput onFileSelect={handleSelectedFile} />
            <Button
              onClick={handleSendFile}
              text={'Enviar'}
            />
          </>
        ) : (
          <>
            <div className='mb-5'>
              <Button
                onClick={async () => {
                  await stopFetching()
                }}
                text={'Cancelar'}
              />
              <Button
                onClick={() => {
                  stopFetching()
                  setCards([])
                  setFile(false)
                }}
                text={'Voltar'}
              />
            </div>
            <div className='w-3/4 overflow-auto h-3/4 p-5'>
              <main className=''>
                {cards.length > 0 && cards.map((cardData) => (
                  <CardClient key={cardData.id} {...cardData} />
                ))}
              </main>
            </div>
          </>
        )}
      </section>
      <footer className='w-full h-[70px] px-[30px] py-3 bg-emerald-950 flex justify-between'>
        {!file ? (
          <>
            <div className='w-[170px]' />

            <div className='flex w-[200px] h-full items-center mb-10 mr-30'>
              <p className='text-[12px] text-white'>powered by</p>
              <a href='https://kronoos.com/'>
                <Image
                  src={kronoosLogo}
                  alt=''
                  className='w-32'
                />
              </a>
            </div>

            <div className='w-[170px]' />
          </>
        ) : (
          <>
            <div className='w-[170px]'></div>

            <div className='flex w-[200px] h-full items-center mb-10 mr-30'>
              <p className='text-[12px] text-white'>powered by</p>
              <a href='https://kronoos.com/'>
                <Image
                  src={kronoosLogo}
                  alt=''
                  className='w-32'
                />
              </a>
            </div>

            <Button
              text={'Salvar'}
            />
          </>
        )}
      <ToastContainer />
      </footer>
    </div>
  )
}
