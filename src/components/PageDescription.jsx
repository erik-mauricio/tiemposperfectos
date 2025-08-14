import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";

export default function PageDescription({title, titleIcon, text, details, bgColor, pageLink}){
    return (
      <>
        <div
          className="max-w-full rounded-lg text-left p-4 space-y-2 border-3"
          style={{ backgroundColor: bgColor }}
        >
          <div className=" flex gap-2 ">
            <div className="mt-2">{titleIcon}</div>
            <h2 className="font-bold text-3xl">{title}</h2>
          </div>

          <p className="text-2xl text-grey-300">{text}</p>
          {details.length > 0 && (
            <>
              {details.map((detail, index) => (
                <div className="flex gap-2">
                  <CircleCheckBig color="green" />
                  <p className="text-xl" key={index}>
                    {detail}
                  </p>
                </div>
              ))}
            </>
          )}

          <div className="text-center">
            <div className="rounded-xl border-2 bg-green-400 max-w-xl mx-auto hover:bg-emerald-400">
              <Link to={pageLink} className="block py-3 px-2">
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}