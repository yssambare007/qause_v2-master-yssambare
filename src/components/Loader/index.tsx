import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  isLoading: boolean;
}
const Loader = (props: LoaderProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
