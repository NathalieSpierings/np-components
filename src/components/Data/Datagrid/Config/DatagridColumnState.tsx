import { DatagridPinnedPosition } from "../Datagrid";

export interface DatagridColumnState {
  prop: string; 
  width: number;
  visible: boolean;
  pinned: DatagridPinnedPosition;
}
