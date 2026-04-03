import { GiStabbedNote } from "react-icons/gi";

const Loading = () => {
  return (
    <main className="w-full h-screen  bg-neutral-950 flex justify-center items-center text-gray-200">
      <div className="w-full h-full flex flex-col items-start p-8 gap-8 transition-all opacity-10">
        <div className="w-1/4 h-4 bg-gray-300 rounded-full animate-pulse"></div>

        <div className="max-w-md w-full animate-pulse space-y-3 ">
          <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded-full"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>

          <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded-full"></div>
          <div className="w-2/4 h-2/4 bg-gray-400 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>

          <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
          <div className="flex items-center justiyf-center">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded-full"></div>
          </div>
          <div className="max-w-md w-full animate-pulse space-y-3 ">
            <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 absolute">
        <div className="text-9xl animate-pulse transition-all">
          <GiStabbedNote />
        </div>
      </div>
    </main>
  );
};

export default Loading;
