import { LinkObject, NodeObject } from "react-force-graph-2d";

export type Level = 0 | 1 | 2;

// export type Node = {
//   id: string;
//   label: string;
//   level: number;
//   type?: string;
//   x?: number;
//   y?: number;
// };

export type GraphNode = NodeObject & {
  id: string;
  label: string;
  level: number;
  type?: string;
};

export type GraphLink = LinkObject<GraphNode> & {
  source: string | GraphNode;
  target: string | GraphNode;
  relation?: string;
};

export type Graph = {
  nodes: GraphNode[];
  links: GraphLink[];
};
