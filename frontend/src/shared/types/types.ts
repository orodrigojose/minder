export interface INode {
  id: string;
  x: string;
  y: string;
  file: string;
  created_at: string;
}

export interface INodeFlow {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
}
