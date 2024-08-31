import { Alert, AlertColor } from "@mui/material";

interface AlertProps {
  type: AlertColor;
  error: string;
  onClose?: () => void;
}
const AlertComp = (props: AlertProps) => {
  return <Alert onClose={props.onClose} severity={props.type}>{props.error}</Alert>;
};

export default AlertComp;
