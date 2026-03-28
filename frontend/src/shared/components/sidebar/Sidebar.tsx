import SideActions from "./SideActions";

const Sidebar = () => {
  return (
    <aside className="flex text-gray-200">
      <SideActions />
      {/*

      <ul className="flex flex-col p-8 bg-neutral-950 h-screen items-center justify-center p-3">
        <li>arquivo.md</li>
        <li>teste.md</li>
        <li>ola.md</li>
        <li>folder/</li>
      </ul>
*/}
    </aside>
  );
};

export default Sidebar;
