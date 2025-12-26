// ** React Import
import React from "react";

// ** Another Import
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<any>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
      timeout={{ enter: 500, exit: 500 }}
    />
  );
});
