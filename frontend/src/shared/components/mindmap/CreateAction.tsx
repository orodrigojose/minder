import serializerNode from "../../utils/serializerNode";
import type { INodeFlow } from "../../types/types";
import { BiCheck, BiPlus } from "react-icons/bi";
import * as api from "../../utils/api";
import toast from "react-hot-toast";

interface ICreateActionProps {
  newNode: string;
  setNewNode: React.Dispatch<React.SetStateAction<string>>;
  setNodes: React.Dispatch<React.SetStateAction<INodeFlow[]>>;
}

const CreateAction = ({
  newNode,
  setNewNode,
  setNodes,
}: ICreateActionProps) => {
  const createNode = async () => {
    const data = await api.createNode(newNode);

    toast("Node has been created", {
      position: "top-center",
      icon: <BiCheck />,
    });
    setNodes((n) => [...n, serializerNode(data)]);
    setNewNode("");
  };

  return (
    <div className="flex items-center justify-center gap-3 transition-all bg-neutral-800 text-gray-300 border-neutral-700 rounded-xl border-3 p-4 hover:border-blue-500">
      <input
        value={newNode}
        placeholder="Filename (e.g. Note.md)"
        onChange={(e) => setNewNode(e.target.value)}
        className="outline-none placeholder-neutral-500 font-mono text-pretty"
        onKeyDown={(e) => e.key === "Enter" && createNode()}
      />
      <button
        onClick={createNode}
        className="hover:text-blue-500 hover:scale-115 hover:brightness-125 text-2xl transition-all cursor-pointer"
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default CreateAction;
