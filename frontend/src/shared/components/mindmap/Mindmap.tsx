"use client";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
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
import toast from "react-hot-toast";

const initialNodes: Array<INodeFlow> = [];
const initialEdges: Array<IEdge> = [];

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Unexpected error";

const Mindmap = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newNode, setNewNode] = useState("");
  const edgeReconnectSuccessful = useRef(true);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    const toastId = toast.loading("Loading nodes...");

    try {
      const { data: nodesData } = await api.getNodes();
      const newNodes = nodesData
        .map((node: INode) => serializerNode(node))
        .filter(
          (node: INodeFlow) =>
            !isNaN(node.position.x) && !isNaN(node.position.y),
        );

      const edgesResponse = await api.getEdges();

      setEdges(edgesResponse.data);
      setNodes(newNodes);
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error(getErrorMessage(error), { id: toastId });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    async (nodesToDelete: INodeFlow[]) => {
      try {
        await Promise.all(
          nodesToDelete.map(async (node) => {
            const result = await api.deleteNode(node.id);

            if (result.status !== 200)
              throw new Error(`Failed to delete #${node.data.label} node.`);

            toast.success(`${node.data.label} node deleted.`);
          }),
        );
      } catch (error) {
        toast.error(getErrorMessage(error));
        await loadData();
      }
    },
    [loadData],
  );

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
      try {
        await api.createEdge(params);
        await loadData();
      } catch (error) {
        toast.error("Failed to create edge");
      }
    },
    [loadData],
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
      if (!edgeReconnectSuccessful.current)
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));

      edgeReconnectSuccessful.current = true;
    },
    [],
  );

  const onEdgeDoubleClick = useCallback(
    async (_event: React.MouseEvent, edge: IEdge) => {
      try {
        await api.deleteEdge(edge);
        await loadData();
      } catch (error) {
        console.error("Error deleting edge:", error);
        toast.error("Failed to delete edge");
      }
    },
    [loadData],
  );

  const onEdgesDelete = useCallback(async (edgesToDelete: IEdge[]) => {
    try {
      await Promise.all(edgesToDelete.map((edge) => api.deleteEdge(edge)));
    } catch (error) {
      console.error("Erro ao deletar conexão", error);
    }
  }, []);

  const openNode = useCallback(
    async (_event: React.MouseEvent, node: INodeFlow) => {
      navigate(`/editor/${node.id}`, { replace: true });
    },
    [],
  );

  const createNode = async () => {
    try {
      if (!newNode || newNode == undefined)
        throw new Error("Please type valid node name!");

      const result = await api.createNode(newNode, nodes);

      if (result.status != 201) throw new Error(result.message);

      toast.success("Node has been created");
      await loadData();
      setNewNode("");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ReactFlow<INodeFlow, IEdge>
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={openNode}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onEdgesChange={onEdgesChange}
      onEdgeDoubleClick={onEdgeDoubleClick}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      onConnect={onConnect}
      colorMode="dark"
      // proOptions={{ hideAttribution: true }}
      fitView
    >
      <Panel position="top-right">
        <CreateAction
          newNode={newNode}
          setNewNode={setNewNode}
          action={createNode}
        />
      </Panel>
      <Background variant={BackgroundVariant.Dots} className="opacity-50" />
      <Controls
        showInteractive={false}
        className="bg-[#1e1e1e] border border-white/10 rounded-lg p-1 shadow-2xl fill-white"
        style={{
          display: "flex",
          flexDirection: "row",
          bottom: "20px",
          left: "20px",
        }}
      />

      <MiniMap
        className="bg-[#1e1e1e] border border-white/10 rounded-lg"
        nodeColor="#9333ea"
        maskColor="rgba(0, 0, 0, 0.2)"
        pannable
        zoomable
      />
    </ReactFlow>
  );
};

export default Mindmap;
