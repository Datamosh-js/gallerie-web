import UploadImage from "../UploadImage";

/* material UI */
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const MoshMenu = (props) => {
  const { modes, onClickUpload, isLoading, onFileChange } = props;

  return (
    <>
      <Container maxWidth="sm" id="mosh-menu">
        <div>
          <UploadImage onFileChange={onFileChange} />
        </div>
        <br />
        <Grid container spacing={1}>
          {modes.map((mode, i) => (
            <Grid item key={i}>
              <Button
                onClick={onClickUpload.bind(null, mode)}
                disabled={isLoading}
                variant="contained"
                size="small"
              >
                {mode}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MoshMenu;
