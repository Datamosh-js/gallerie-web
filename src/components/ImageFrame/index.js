import Paper from "@material-ui/core/Paper";

const ImageFrame = ({ mosh: { moshURI, originURI, name, mode } }) => (
  <Paper>
    <p>
      Moshed {name} using {mode}
    </p>
    <br />
    <img alt="origin" src={`data:image;base64,${originURI}`} width="50%" />
    <img alt="moshed" src={`data:image;base64,${moshURI}`} width="50%" />
  </Paper>
);
export default ImageFrame;
