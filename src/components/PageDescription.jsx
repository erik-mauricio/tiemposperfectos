import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";

export default function PageDescription({title, titleIcon, text, details, bgColor}){
    return (
      <>
        <div
          className="max-w-full rounded-lg text-left p-4 space-y-2 border-3"
          style={{ backgroundColor: bgColor }}
        >
          <div className=" flex gap-2 ">
            {titleIcon}
            <h2 className="font-bold text-3xl">{title}</h2>
          </div>

          <p className="text-2xl text-grey-300">{text}</p>
          {details.length > 0 && (
            <>
              {details.map((detail, index) => (
                <div className="flex gap-2">
                  <CircleCheckBig color="green" />
                  <p className="text-xl" key={index}>{detail}</p>
                </div>
              ))}
            </>
          )}

          <div className="text-center">
            <div className="rounded-xl border-2 bg-slate-200 max-w-xl mx-auto">
              <Link to="/grammar" className="block py-3 px-2">
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}