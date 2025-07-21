import { useState } from "react";
export default function Controls({}) {
  const [difficulty, setDifficulty] = useState("Beginner");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

 
  return (
    <>
      <aside className="h-screen p-4 bg-[rgb(55,75,90)] space-y-2">
        <h2 className="font-bold text-3xl text-[#f8f9fa]">Reading Setup</h2>
        <label className="text-xl text-[#bdc3c7] font-bold ">
          Difficulty:{" "}
        </label>

        <div className="flex col space-y-2 mt-2">
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleChange}
            className="p-2 border rounded-md	bg-[#395c7f] text-white border-[#34495e] font-bold "
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <label className="text-xl text-[#bdc3c7] font-bold">Questions: </label>
        <div className="flex gap-3 mt-2">
          <button className="flex-1 rounded-lg py-2 px-10 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]">
            3
          </button>
          <button className="flex-1 rounded-lg py-2 px-10 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]">
            5
          </button>
          <button className="flex-1 rounded-lg py-2 px-10 font-semibold transition-all duration-200 bg-[#f39c12] w-20 text-white hover:bg-[#e67e22]">
            8
          </button>
        </div>

        <button className="rounded-md px-23 py-4 bg-[#3498db] mt-4 text-md text-white font-bold whitespace-nowrap text-center hover:bg-[#2980b9]">
          New Passage
        </button>

        <br className="bg-black"></br>
      </aside>
    </>
  );
}
