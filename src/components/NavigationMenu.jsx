import {Link} from 'react-router-dom';

export default function NavigationMenu() {
    return (
      <div className={"bg-[#2c3e50]"}>
        <div className={"flex items-center justify-between px-14 py-2"}>
          <h1 className={"text-[64px] text-[#ebeff4] font-bold"}>
            TiemposPerfectos
          </h1>
          <nav>
            <menu className={"flex gap-10"}>
              <Link
                className={
                  "text-[28px] text-[#95a5a6] p-1 hover:bg-[rgba(255,255,255,0.1)] hover:rounded-md"
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={
                  "text-[28px] text-[#95a5a6] p-1  hover:bg-[rgba(255,255,255,0.1)] hover:rounded-md hover:p-1"
                }
                to="/grammar"
              >
                Grammar
              </Link>
              <Link
                className={
                  "text-[28px] text-[#95a5a6] p-1  hover:bg-[rgba(255,255,255,0.1)] hover:rounded-md hover:p-1"
                }
                to="/speech"
              >
                Speech
              </Link>
              <Link
                className={
                  "text-[28px] text-[#95a5a6] p-1  hover:bg-[rgba(255,255,255,0.1)] hover:rounded-md hover:p-1"
                }
                to="/reading"
              >
                Reading
              </Link>
            </menu>
          </nav>
        </div>
      </div>
    );
}
