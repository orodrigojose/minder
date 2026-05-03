import type { IEdge, INodeFlow, SettingsType } from "../types/types";

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

const createNode = async (nodeName: string, nodes: INodeFlow[]) => {
  const node = {
    x:
      nodes.length > 0
        ? nodes[nodes.length - 1].position.x + (Math.random() * 100 - 20)
        : Math.random() * 100 - 50,
    y:
      nodes.length > 0
        ? nodes[nodes.length - 1].position.y + (Math.random() * 100 - 20)
        : Math.random() * 100 - 50,
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

  return await result.json();
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

const updateFile = async (id: string, data: string) => {
  const response = await fetch(`${BASE_URL}/file/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Accept: "application/json",
    },
    body: data,
  });

  return await response.json();
};

const getSettings = async () => {
  const response = await fetch(`${BASE_URL}/settings/`);
  return await response.json();
};

const getDefaultSettings = async () => {
  const response = await fetch(`${BASE_URL}/settings/default/`);
  return await response.json();
};

const updateSettings = async (settings: SettingsType) => {
  const response = await fetch(`${BASE_URL}/settings/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theme: settings.theme,
      fontSize: settings.fontSize,
      placeholder: settings.placeholder,

      topBar: settings.topBar,
      toolBar: settings.toolBar,

      titleText: settings.titleText,
      welcomeText: settings.welcomeText,
    }),
  });

  return await response.json();
};

const uploadImage = async (file: File) => {
  const fd = new FormData();

  fd.append("fileImage", file);
  const response = await fetch(`${BASE_URL}/file/assets/upload`, {
    method: "POST",
    body: fd,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const res = await response.json();

  return new URL(`/uploads/${res.data}`, BASE_URL).toString();
};

const deleteUploadedImage = async (fileName: string) => {
  const response = await fetch(`${BASE_URL}/file/assets/upload/${fileName}`, {
    method: "DELETE",
  });

  return await response.json();
};

export {
  getEdges,
  createEdge,
  deleteEdge,
  updateFile,
  getNodeContent,
  getNodes,
  updateNode,
  createNode,
  deleteNode,
  getSettings,
  getDefaultSettings,
  updateSettings,
  uploadImage,
  deleteUploadedImage,
};
