export default function Skeleton({}){
    return (
      <>
        <div className="p-3 animate-pulse border-grey-300" >
          <h3 className="text-grey-200 font-bold text-xl">
            Exercise
          </h3>
          <div
            className="rounded-md bg-[#f8f9fa] border-2 border-[#e9ecef] p-4 hover:border-grey-50"
          >
            <label>
              
              <input
                type="text"
                className="border-2 border-grey-300 rounded-md"
              ></input>
             
            </label>
            <p className="border-t-2 mt-2 max-w-100">
              <em className="font-bold text-normal">Translation:</em>{" "}
              
            </p>
          </div>
        </div>
      </>
    );
}