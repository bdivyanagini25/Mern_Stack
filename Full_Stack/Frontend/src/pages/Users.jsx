export default function Users() {
    const datas=[1,2,3,4,5];
    return (
        <>
            <div className="flex w-full h-screen justify-center items-center font-mono">
                <div className="bg-gray-100 w-1/3 p-5">
                    <div className="text-center-space-underline"> Users List</div>
                    <div>
                        {datas.map((data)=>{
                            <div>(data)</div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}