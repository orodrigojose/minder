import type { MindmapNodeData } from "../../types/types";

import { Handle, Position, type NodeProps } from "@xyflow/react";

const NodeComponent = ({ data, selected }: NodeProps) => {
  const nodeData = data as MindmapNodeData;
  const isRemoving = Boolean(nodeData.removing);
  const isEntering = Boolean(nodeData.entering);

  return (
    <div
      className={`
        minder-node bg-[#1f1f1f] text-gray-200 border border-neutral-700 rounded-lg px-4 py-4
        font-mono text-sm
        shadow-lg shadow-black/40
        ${selected ? "ring-2 ring-blue-500/40" : ""}
        ${isEntering ? "minder-node--entering" : ""}
        ${isRemoving ? "minder-node--removing" : ""}
      `}
      data-node-removing={isRemoving ? "true" : "false"}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="minder-node__handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="minder-node__handle"
      />

      <div className="truncate select-none">{nodeData.label}</div>
    </div>
  );
};

export default NodeComponent;
