const Loading = () => {
  return (
    <main className="w-full h-screen bg-black flex justify-center items-center text-gray-200">
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
      <div className="flex flex-col items-center gap-4 absolute brightness-125">
        <div className="w-1/3 h-1/3 animate-pulse transition-all">
          <img src="/assets/logo.png" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
