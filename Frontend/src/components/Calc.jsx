import { ServerHeartbeatStartedEvent } from "mongodb";
import { useState } from "react";
export default function Calc(){
    const [num1,setNum1]=useState(0);
    const [num2,setNum2]=useState(0);
    {/*const[result,setResult]=useState(0);*/}
    return (
        <>
            <div className="flex w-full h-screen justify-center items-center">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <div className="flex flex-col p-10 gap-5">
                        <input
                            type="number"
                            placeholder="Enter Number 1"
                            className="px-5 py-4 font-mono text-2xl border-2 border-gray-200"
                            onChange={(e)=>setNum1(Number(e.target.value))}
                        />
                        <input
                            type="number"
                            placeholder="Enter Number 2"
                            className=" px-5 py-4 font-mono text-2xl border-2 border-gray-200"
                            onChange={(e)=>setNum2(Number(e.target.value))}
                        />
                        {/*
                        <div className="grid grid-cols-3">

                        </div>
                        <button 
                            onClick={()=>setResult(num1+num2)}>Add
                        </button>
                        <p>Result: {result}</p>
                        */}
                    </div>
                </div>
            </div>
        </>
    )
}