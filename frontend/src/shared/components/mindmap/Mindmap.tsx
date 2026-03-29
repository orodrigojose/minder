"use client";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  Controls,
  Panel,
  Background,
  MiniMap,
  BackgroundVariant,
  reconnectEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import * as api from "../../utils/api";
import CreateAction from "./CreateAction";
import { useNavigate } from "react-router-dom";
import serializerNode from "../../utils/serializerNode";
import type { IEdge, INode, INodeFlow } from "../../types/types";
import React, { useState, useCallback, useEffect, useRef } from "react";

const initialNodes: Array<INodeFlow> = [];
const initialEdges: Array<IEdge> = [];

const Mindmap = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newNode, setNewNode] = useState("");

  const edgeReconnectSuccessful = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.getNodes();
      const newNode = data.map((node: INode) => serializerNode(node));
      const edges = await api.getEdges();

      setEdges(edges.data);
      setNodes(newNode);
    };

    fetchData();
  }, []);

  const onNodesChange = useCallback(
    (
      changes: NodeChange<{
        id: string;
        position: { x: number; y: number };
        data: { label: string };
      }>[],
    ) => {
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
    },
    [],
  );

  const onNodesDelete = useCallback(
    async (nodes: INodeFlow[]) => {
      for (const node of nodes) {
        await api.deleteNode(node.id);
      }
    },
    []
  )

  const onNodeDragStop = useCallback(
    async (_event: React.MouseEvent, node: INodeFlow) => {
      await api.updateNode(node.id, node.position.x, node.position.y);
    },
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string }>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    async (params: any) => {
      await api.createEdge(params);
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    },
    [],
  );

  const onReconnectStart = useCallback(
    (
      _event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent,
      edge: IEdge,
      _handleType: string,
    ) => {
      void api.deleteEdge(edge);
      edgeReconnectSuccessful.current = false;
    },
    [],
  );

  const onReconnect = useCallback((oldEdge: IEdge, newConnection: any) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent,
      edge: IEdge,
      _handleType: any,
      _connectionState: any,
    ) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [],
  );

  const onEdgeDoubleClick = useCallback(
    async (_event: React.MouseEvent, edge: IEdge) => {
      await api.deleteEdge(edge);
      const newEdges = edges.filter((ed) => ed != edge);
      setEdges(newEdges);
    },
    [],
  );

  const openNode = useCallback(
    async (_event: React.MouseEvent, node: INodeFlow) => {
      navigate(`/editor/${node.id}`, { replace: true });
    },
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={openNode}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onEdgeDoubleClick={onEdgeDoubleClick}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      onConnect={onConnect}
      colorMode="dark"
      fitView
    >
      <Panel position="top-right">
        <CreateAction
          newNode={newNode}
          setNewNode={setNewNode}
          setNodes={setNodes}
        />
      </Panel>
      <Background variant={BackgroundVariant.Dots} className="opacity-50" />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default Mindmap;
