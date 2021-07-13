import './imageFrame.css'

const ImageFrame = props => {
  const { mosh: { moshURI, originURI, name, mode } } = props

  return (
    <div id='image-frame'>
      <p>Moshed {name} using {mode}</p>
      <br />
      <img
        alt='origin'
        src={`data:image;base64,${originURI}`}
        width='50%'
      />
      <img
        alt='moshed'
        src={`data:image;base64,${moshURI}`}
        width='50%'
      />
    </div>
  )
}

export default ImageFrame
