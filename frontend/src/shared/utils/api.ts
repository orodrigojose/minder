import type { IEdge } from "../types/types";

const BASE_URL = import.meta.env.VITE_API_URL;

const getNodeContent = async (id: string) => {
  const response = await fetch(`${BASE_URL}/node/file/${id}`);

  return await response.json();
};

const getNodes = async () => {
  const response = await fetch(`${BASE_URL}/node/`);
  return await response.json();
};

const updateNode = async (id: string, x: number, y: number) => {
  const response = await fetch(`${BASE_URL}/node/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      x: x,
      y: y,
    }),
  });

  return await response.json();
};

const createNode = async (nodeName: string) => {
  const node = {
    x: 100 + (Math.random() * 100 - 50),
    y: 100 + (Math.random() * 100 - 50),
    file: `${nodeName}.md`,
  };

  const result = await fetch(`${BASE_URL}/node/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(node),
  });

  return await result.json();
};

const deleteNode = async (id: string) => {
  const result = await fetch(`${BASE_URL}/node/delete/${id}`, {
    method: "DELETE",
  });

  console.log(result);
};

const getEdges = async () => {
  const response = await fetch(`${BASE_URL}/edge/`);
  return await response.json();
};

const createEdge = async (edge: IEdge) => {
  const result = await fetch(`${BASE_URL}/edge/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: edge.source,
      target: edge.target,
    }),
  });

  return await result.json();
};

const deleteEdge = async (edge: IEdge) => {
  const result = await fetch(`${BASE_URL}/edge/delete/${edge.id}`, {
    method: "DELETE",
  });

  return await result.json();
};

export {
  getEdges,
  createEdge,
  deleteEdge,
  getNodeContent,
  getNodes,
  updateNode,
  createNode,
  deleteNode,
};
