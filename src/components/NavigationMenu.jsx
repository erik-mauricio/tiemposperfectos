import {Link} from 'react-router-dom';

export default function NavigationMenu() {
    return (
        <div className={"bg-grey-100 border-b-4"}>
            <div className={"flex items-center justify-between px-14 py-2"}>
                <h1 className={"text-[64px] text-red-500 font-bold"}>TiemposPerfectos</h1>
                <nav>
                    <menu className={"flex gap-5"}>
                        <Link
                            className={"text-[28px] font-bold text-slate-700 hover:underline hover:text-red-500"}
                            to="/">Home</Link>
                        <Link
                            className={"text-[28px] font-bold text-slate-700 hover:underline hover:text-red-500"}
                            to="/grammar">Grammar</Link>
                        <Link
                            className={"text-[28px] font-bold text-slate-700 hover:underline hover:text-red-500"}
                            to="/speech">Speech</Link>
                        <Link
                            className={"text-[28px] font-bold text-slate-700 hover:underline hover:text-red-500"}
                            to="/reading">Reading</Link>
                        <Link
                            className={"text-[28px] font-bold text-slate-700 hover:underline hover:text-red-500"}
                            to="/profile">Profile</Link>
                    </menu>
                </nav>
            </div>
        </div>
    );
}
