import Hello from "./components/Hello";
import Calc from "./components/Calc";
function App(){
    return (
        <>
          <Calc />
          <Hello name="Divya" />
          <Hello name="Gunasri" />
          <h1 className=" text-7xl">Hello</h1>
          <h2 className=" text-5xl text-green-800">Hello</h2>

          <div className=" flex h-screen items-center justify-center bg-amber-300">
            <h1 className=" text-7xl">Hello</h1>
            <div className=" bg-white flex flex-col p-5 rounded-lg gap-2">
              <input 
                className=" bg-gray-100 px-3 py-1 rounded-lg"
                type="text" 
                placeholder="Email" />
              <input 
                className="bg-gray-100 px-3 py-1 rounded-lg"
                type="password" placeholder="Password" />
              <button className="bg-blue-100">Sign In</button>
            </div>
          </div>

          <div className=" flex h-screen items-center justify-center bg-violet-700">
            <div className="bg-blue-500 flex flex-col p-3 rounded-lg gap-3">
              <input
                className=" bg-gray-300 px-3 py-2 rounded-lg"
                type="text"
                placeholder="Username"
              />
              <input
                className=" bg-gray-300 px-3 py-2 rounded-lg"
                type="text"
                placeholder="Email"
              />
              <input
                className=" bg-gray-300 px-3 py-2 rounded-lg text-red-900"
                type="password"
                placeholder="Password "
              />
              <input
                className=" bg-gray-300 px-3 py-2 rounded-lg"
                type="password"
                placeholder="Retype Password"
              />
              <button className=" bg-green-500">Log In</button>
            </div>
          </div>
          <div className="flex w-full justify-between px-5 py-3">
            <div>LOGO</div>
            <div className="flex gap-5">
              <div className=" hover:bg-red-300 hover:text-red-500 px-2 py-1">Home</div>
              <div className=" hover:bg-red-300 hover:text-red-500 px-2 py-1">About</div>
              <div className=" hover:bg-red-300 hover:text-red-500 px-2 py-1">Service</div>
              <div className=" hover:bg-red-300 hover:text-red-500 px-2 py-1">Blog</div>
              <div className=" hover:bg-red-300 hover:text-red-500 px-2 py-1">Contact</div>
            </div>
          </div>
          {/*}
          <div className="px-5 py-4 flex justify-between">
            <div className="flex gap-10">
              <div className=" text-2xl font-extrabold">EverTrust</div>
              <div className=" flex items-center gap-10">
                <div>Home</div>
                <div>P</div>
                <div></div>
                <div></div>
                <div></div>
                <div>Contact</div>
              </div>
            </div>
          </div>
          */}
        </>
    );
}
export default App;