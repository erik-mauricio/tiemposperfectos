export default function Instructions({children, title, text, textTitle, titleColor, gameType}){

   
    return (
      <div className="border-0 rounded-md overflow-hidden bg-white">
        <h2
          className={`font-bold text-3xl text-white p-4`}
          style={{ backgroundColor: titleColor }}
        >
          {title}
        </h2>

        <div className="p-4  bg-[#f8f9fa] ">

        <h2
          className={`font-bold text-2xl text-slate-800`}
        >
          {textTitle}</h2>
          <p className="text-xl">{text}</p>
        </div>

        <div className="p-3">{children}</div>

        <div className="justify-center flex gap-2 ">
          
        </div>
      </div>
    );

}