export type Level = 0 | 1 | 2;

export type Node = {
  id: string;
  label: string;
  level: number;
  type?: string;
  x?: number;
  y?: number;
};

export type Link = {
  source: string;
  target: string;
  relation?: string;
};

export type Graph = {
  nodes: Node[];
  links: Link[];
};
