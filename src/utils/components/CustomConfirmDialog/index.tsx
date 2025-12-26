import { DialogProps } from "../../../types/views";
import styles from "./index.module.scss";
import { Modal } from "@mui/material";

export default function ConfirmDialogCustom(props: Readonly<DialogProps>) {
  return (
    <Modal open={props.isOpen} className={styles.dialogContentWrapper}>
      <div className={styles.dialogContent}>
        <span className={styles.dialogTitle}>{props.title}</span>
        <div className={styles.messageContent}>
          <div
            className={styles.message}
            dangerouslySetInnerHTML={{
              __html: props.contentPopup,
            }}
          ></div>
          <div className={styles.buttonWrapper}>
            {props.buttonLeft && props.buttonLeft !== "" && (
              <button
                onClick={props.onClickButtonLeft}
                className={styles.disagreeButton}
              >
                {props.buttonLeft}
              </button>
            )}
            {props.buttonRight && props.buttonRight !== "" && (
              <button
                onClick={props.onClickButtonRight}
                className={styles.agreeButton}
              >
                {props.buttonRight}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
