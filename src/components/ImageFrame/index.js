import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const ImageFrame = ({
  deleteMosh,
  mosh: { moshURI, originURI, name, mode },
}) => (
  <Paper>
    <p>
      Moshed {name} using {mode}
    </p>
    <IconButton aria-label="delete" onClick={deleteMosh}>
      <DeleteIcon />
    </IconButton>
    <br />
    <img alt="origin" src={`data:image;base64,${originURI}`} width="50%" />
    <img alt="moshed" src={`data:image;base64,${moshURI}`} width="50%" />
  </Paper>
);
export default ImageFrame;
