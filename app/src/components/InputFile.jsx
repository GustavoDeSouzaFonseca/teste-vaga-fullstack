'use client'
import React from 'react';

const FileInput = ({ onFileSelect }) => {
  const [fileName, setFileName] = React.useState('Importe a planilha .csv')

  const handleFileChange = (file) => {
    setFileName(file.name);
    onFileSelect(file)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div 
      className='w-[400px] h-[120px] bg-emerald-100 flex flex-col items-center justify-center border border-black border-dashed rounded-xl m-5'
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
        <label 
          htmlFor="file-upload" 
          className="custom-file-upload flex items-center justify-center w-[370px] px-1 h-12 border border-black rounded-xl cursor-pointer"
        >
          <span className="mr-2 text-black">{fileName}</span>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={(e) => handleFileChange(e.target.files[0])}  
          />
      </label>
      <p className="mt-4 text-gray-500 text-sm">ou arraste e solte aqui</p>
    </div>
  );
};

export default FileInput;
