import { BiPlus } from "react-icons/bi";

interface ICreateActionProps {
  newNode: string;
  setNewNode: React.Dispatch<React.SetStateAction<string>>;
  action: () => void;
}

const CreateAction = ({ newNode, setNewNode, action }: ICreateActionProps) => {
  return (
    <div className="flex items-center justify-center gap-3 transition-all bg-neutral-800 text-gray-300 border-neutral-700 rounded-xl border-3 p-4 hover:border-blue-500">
      <input
        value={newNode}
        placeholder="Filename (e.g. Note.md)"
        onChange={(e) => setNewNode(e.target.value)}
        className="outline-none placeholder-neutral-500 font-mono text-pretty"
        onKeyDown={(e) => e.key === "Enter" && action()}
      />
      <button
        onClick={action}
        className="hover:text-blue-500 hover:scale-115 hover:brightness-125 text-2xl transition-all cursor-pointer"
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default CreateAction;
