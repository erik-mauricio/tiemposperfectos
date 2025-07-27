export default function Instructions({children, title, text, titleColor, isSpeech}){

   
    return (
      <div className="border-0 rounded-md overflow-hidden bg-white">
        <h2
          className={`font-bold text-3xl text-white p-4`}
          style={{ backgroundColor: titleColor }}
        >
          {title}
        </h2>

        <div className="p-4  bg-[#f8f9fa]">
          <h2 className="font-semibold">Instructions</h2>
          <p>{text}</p>
        </div>

        <div className="p-3">{children}</div>

        <div className="justify-center flex gap-2 ">
          {!isSpeech && (
            <>
              <button className="inline border-2 border-black bg-red-500 p-2 rounded-lg w-[250px] mb-3 text-white font-bold hover:bg-green-600">
                Check Answers
              </button>

              <button className="inline border-2 border-black bg-green-500 p-2 rounded-lg w-[250px] mb-3 text-white font-bold hover:bg-green-600">
                Submit All
              </button>
            </>
          )}
        </div>
      </div>
    );

}