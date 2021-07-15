import Switch from "@material-ui/core/Switch";

/* does nothing right now, lol */
const NavBar = ({ swapTheme, darkMode }) => (
  <>
    <Switch checked={darkMode} onChange={swapTheme} />
    {darkMode ? "Dark Mode" : "Light Mode"}
  </>
);

export default NavBar;
