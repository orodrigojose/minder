import type { Node } from "@xyflow/react";

export interface INode {
  id: string;
  x: string;
  y: string;
  file: string;
  sourcePosition?: string;
  targetPosition?: string;
  created_at: string;
}

export type MindmapNodeData = {
  label: string;
  entering?: boolean;
  removing?: boolean;
};

export type INodeFlow = Node<MindmapNodeData>;

export interface IEdge {
  id: string;
  source: string;
  target: string;
}

export type CrepeTheme =
  | "classic"
  | "classic-dark"
  | "nord"
  | "nord-dark"
  | "frame"
  | "frame-dark";

export type SettingsType = {
  id: string;
  fontSize?: number;
  theme?: CrepeTheme;
  placeholder?: string;

  topBar?: boolean;
  toolBar?: boolean;

  titleText: string;
  welcomeText: string;
};
