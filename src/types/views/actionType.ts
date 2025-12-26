import { ActionType } from "../../enum";

export type Action = {
  dataAction: string;
  actionType: `${ActionType}`;
  data: any;
};
