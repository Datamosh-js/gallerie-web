import Dropzone from "react-dropzone";

const UploadImage = ({ onFileChange }) => (
  <Dropzone onDrop={onFileChange}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Upload</p>
        </div>
      </section>
    )}
  </Dropzone>
);

export default UploadImage;
