import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './styles.css';
import {FiUpload} from 'react-icons/fi';

interface props {
  onFileUploaded:(file:File) => void
}

const Dropzone : React.FC<props> = (props) => {
  const [seletedFile, setseletedFile] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    const file_url = URL.createObjectURL(file);
    setseletedFile(file_url);    
    props.onFileUploaded(file);
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept:'image/*'})

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
    {seletedFile 
    ? <img src={seletedFile} alt='Logo do Ponto de Coleta'/> 
    : (
        <p><FiUpload/><b>Imagem do Estabelecimento</b></p>
      )
    }
    </div>
  )
}

export default Dropzone;