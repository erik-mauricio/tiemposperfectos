export default function PageCard({text, bgColor, borderColor}){
    return (
      <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4"
            style={{backgroundColor: bgColor,
                    borderColor: borderColor
            }}>
        <h1 className="font-bold text-4xl text-center ">{text}</h1>
      </div>
    );

}