import type { INode } from "../types/types";

const serializerNode = (node: INode) => {
  return {
    id: node.id,
    position: { x: Number(node.x), y: Number(node.y) },
    data: { label: node.file },
  };
};

export default serializerNode;
