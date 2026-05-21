import { Position } from "@xyflow/react";
import type { INode, INodeFlow } from "../types/types";

type SerializerOptions = {
  entering?: boolean;
  removing?: boolean;
};

const serializerNode = (node: INode, options: SerializerOptions = {}): INodeFlow => {
  const x = Number(node.x) || 0;
  const y = Number(node.y) || 0;

  return {
    id: String(node.id),
    position: { x, y },
    sourcePosition: (node.sourcePosition as Position) || Position.Left,
    targetPosition: (node.targetPosition as Position) || Position.Right,
    data: { label: node.file, ...options },
    type: "default",
  };
};

export default serializerNode;
