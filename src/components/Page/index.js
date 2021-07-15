/* packages */
import { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

/* components */
import NavBar from "../NavBar";
import MoshMenu from "../MoshMenu";
import ImageFrame from "../ImageFrame";

/* utilities */
import bufferToBinary from "../../utils/bufferToBinary";
import validateImage from "../../utils/validateImage";

/* styles */
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";

const MOSH_BASE_URL = process.MOSH_BASE_URL ?? "http://localhost:3001";

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moshedImage: null,
      rawFileData: [],
      moshedImageURIs: [],
      moshes: [],
      modes: [],
      isLoading: false,
      darkMode: true,
    };
  }

  async componentDidMount() {
    const url = `${MOSH_BASE_URL}/modes`;

    try {
      const { data, status } = await axios.get(url);

      if (status === 200) {
        this.setState({ modes: data.modes });
      }
    } catch (err) {
      console.error(err);
    }
  }

  onFileChange = (files) => {
    if (!files || files.length === 0) return;

    const uploadData = files;

    const validatedData = [];
    uploadData.forEach((file) => {
      if (!validateImage(file)) {
        console.error(`Invalid image type: ${file?.name}`);
        return;
      }

      validatedData.push(file);
    });

    if (validatedData.length === 0) {
      console.error("No valid images where selected!");
      return;
    }

    const rawFileData = this.state.rawFileData;
    rawFileData.push(...validatedData);

    this.setState({ rawFileData });

    console.log(
      `Raw file data has been added!\nfileCount=${rawFileData.length}`
    );
  };

  onClickUpload = async (mode) => {
    if (this.state.rawFileData.length === 0) {
      console.log("No file data uploaded! Aborting request.");
      return;
    }

    let currMoshCount = this.state.moshes.length;

    this.state.rawFileData.forEach(async (file, i) => {
      const formData = new FormData();
      formData.append(i, file);

      try {
        this.setState({ isLoading: true });

        const url = `${MOSH_BASE_URL}/mosh/${mode}`;
        const { data, status } = await axios.post(url, formData);

        if (status !== 200) {
          console.error("Bad response when moshing...", { status });
          return;
        }

        // clear raw data after upload (avoid spamming)
        this.setState({ rawFileData: [] });

        const imgData = data.image.data;
        const imgBin = bufferToBinary(imgData);
        const originBin = bufferToBinary(await file.arrayBuffer());

        this.setState({ isLoading: false });
        currMoshCount++;

        const mosh = {
          moshURI: imgBin,
          originURI: originBin,
          name: file?.name,
          mode,
          index: currMoshCount,
        };

        const moshes = this.state.moshes;
        moshes.push(mosh);
        this.setState({
          moshes,
          isLoading: false,
        });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false });
      }
    });
  };

  swapTheme = () => {
    console.log("darkMode=", this.state.darkMode);
    this.setState({
      darkMode: this.state.darkMode ? false : true,
    });
  };

  deleteMosh = (index) => {
    console.log(`Deleting mosh at index ${index}`);
    let moshes = this.state.moshes;
    moshes.splice(index, 1);

    this.setState({ moshes });
  };

  render() {
    const theme = createTheme({
      palette: {
        type: this.state.darkMode ? "dark" : "light",
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <NavBar swapTheme={this.swapTheme} darkMode={this.state.darkMode} />
        <MoshMenu
          onFileChange={this.onFileChange}
          onClickUpload={this.onClickUpload}
          isLoading={this.state.isLoading}
          modes={this.state.modes}
        />
        {this.state.isLoading ? (
          <Loader type="ThreeDots" color="#FFFFFF" height="100" width="100" />
        ) : null}
        {this.state.moshes.length > 0
          ? this.state.moshes.map((mosh, index) => {
              return (
                <div key={index}>
                  <ImageFrame
                    mosh={mosh}
                    deleteMosh={this.deleteMosh.bind(this, index)}
                  />
                </div>
              );
            })
          : null}
      </ThemeProvider>
    );
  }
}

export default Page;
