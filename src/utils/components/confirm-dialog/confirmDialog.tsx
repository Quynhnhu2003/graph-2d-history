import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogTitle } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./confirmDialog.scss";
import { DialogTypeExtra } from "../../../types/views";

export const ConfirmDialogEventExtra = (props: DialogTypeExtra) => {
  return (
    <Dialog
      open={props.open}
      className="confirm-dialog"
      maxWidth="md"
      classes={{
        container: "",
        paper: "dialog-content-wrapper-confirm",
      }}
    >
      <DialogTitle className="dialog-title">{props.title}</DialogTitle>
      <DialogContent className="message-content">
        <DialogActions className="button-wrapper">
          {props.isExtra && (
            <button onClick={props.onDisExtra} className="click-close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M18 6.5L6 18.5M6 6.5L18 18.5"
                  stroke="#3D3D3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </DialogActions>
        <DialogContentText
          dangerouslySetInnerHTML={{
            __html: props.message,
          }}
          className="message"
        ></DialogContentText>
        {props.buttonAgree && props.buttonAgree !== "" && (
          <DialogActions className="button-wrapper">
            {props.buttonDisagree && props.buttonDisagree !== "" && (
              <Button onClick={props.onDisagree} className="disagree-button">
                {props.buttonDisagree}
              </Button>
            )}
            {props.buttonAgree && props.buttonAgree !== "" && (
              <Button onClick={props.onAgree} className="agree-button">
                {props.buttonAgree}
              </Button>
            )}
          </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDialogEventExtra;
