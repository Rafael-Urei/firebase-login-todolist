import "./styles/global.css";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd as NewTask } from "react-icons/md";
import { auth } from "./config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user] = useAuthState(auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log(user);
    }
  });

  return (
    <>
      <main className="h-screen bg-zinc-200 backdrop-blur-sm duration-200">
        <div>
          <div className="flex justify-center">
            <header className="flex h-16 justify-center fixed text-slate-300 font-bold">
              <nav className="flex items-center gap-2">
                <h1 className="text-3xl mr-10 cursor-pointer">LOGO</h1>
                <ul className="flex items-center gap-7">
                  <li className="text-sm cursor-pointer">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="text-sm cursor-pointer">
                    <Link to={user === null ? "/login" : "/dashboard"}>
                      To Do List
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center gap-7 ml-20">
                  <p className="text-sm cursor-pointer">
                    <Link to="/login" onClick={() => signOut(auth)}>
                      {user ? "SignOut" : "Login"}
                    </Link>
                  </p>
                  <p className="text-sm pt-1 pr-5 pb-1 pl-5 rounded-full border-2 transition-all cursor-pointer hover:border-amber-400">
                    <Link to="/register">JOIN US</Link>
                  </p>
                </div>
              </nav>
            </header>
          </div>
          <div className="h-96 bg-gray-950 flex items-end justify-center">
            <div className="text-slate-300 flex justify-center gap-4 items-center mb-20 relative">
              <h1 className="text-6xl leading-normal w-4/5 tracking-tighter">
                Do you want to organize your tasks?
              </h1>
              <Link
                to={user === null ? "/login" : "/dashboard"}
                className=" absolute right-75 bg-amber-400 pl-3 pt-2 pr-3 pb-2 text-slate-800 font-bold rounded cursor-pointer self-end mb-5"
              >
                TO DO LIST
              </Link>
            </div>
          </div>
          <div className="h-96 flex gap-2 mt-20 mb-20 items-center justify-center">
            <Link
              to={user === null ? "/login" : "/dashboard"}
              className="h-64 w-64 bg-slate-100 rounded flex items-center justify-center flex-col duration-200 cursor-pointer hover:scale-95"
            >
              <NewTask className="text-slate-300 h-28 w-28" />
              <p className="text-slate-400 font-bold mt-3">Add a new task</p>
            </Link>
            <div className="h-64 w-64 bg-slate-100 rounded">
              <p className="text-slate-400 font-bold mt-3"></p>
            </div>
          </div>
          <footer className="bg-gray-950 h-16"></footer>
        </div>
      </main>
    </>
  );
}

export default App;
