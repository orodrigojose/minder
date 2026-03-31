import type { Position } from "@xyflow/react";

export interface INode {
  id: string;
  x: string;
  y: string;
  file: string;
  sourcePosition?: string;
  targetPosition?: string;
  created_at: string;
}

export interface INodeFlow {
  id: string;
  position: {
    x: number;
    y: number;
  };
  sourcePosition?: Position;
  targetPosition?: Position;
  data: {
    label: string;
  };
  type?: string;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
}
