import { Button } from 'react-bootstrap'
import './uploadImage.css'

const UploadImage = ({ onFileChange }) => {
  return (
    <div id='upload-image'>
      <input type='file' onChange={onFileChange} multiple />
    </div>
  )
}

export default UploadImage
