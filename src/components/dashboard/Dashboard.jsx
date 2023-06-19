import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase/firebase";
import Tasks from "../tasks/Tasks";
import { GlobalContext } from "../../helper/Context";
import { useState } from "react";
import AddTask from "../modal/AddTask";
import DeleteTask from "../modal/DeleteTask";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  const [tasks, setTasks] = useState([]);

  const [taskId, setTaskId] = useState();

  const [documentId, setDocumentId] = useState();

  const [modal, setModal] = useState({
    number: "",
    visible: false,
  });

  const data = format(new Date(), "dd/MM/yyyy");

  const dataArr = [];

  return (
    <>
      <GlobalContext.Provider
        value={{
          modal,
          setModal,
          tasks,
          setTasks,
          taskId,
          setTaskId,
          documentId,
          setDocumentId,
        }}
      >
        {modal.number === "1" && modal.visible && <AddTask />}
        {modal.number === "2" && modal.visible && <DeleteTask />}
        <div className=" min-h-screen h-fit pt-20 bg-slate-100 flex flex-col items-center">
          {data.split("/").map((numbers) => {
            dataArr.push(numbers);
          })}
          <button
            className="mt-3 mb-3 bg-yellow-300 rounded p-2 text-slate-50 font-semibold
          "
          >
            <Link to="/">HOME</Link>
          </button>
          <div className="w-16 grid grid-cols-2 grid-rows2 items-center text-slate-400 absolute left-44 top-10 scale-150 border-b-2 duration-150 hover:border-pink-400">
            <div className="row-span-2 text-lg font-bold text-slate-600">
              {dataArr[0]}
            </div>
            <div className="text-xs font-semibold">{dataArr[1]}</div>
            <div className="text-xs font-semibold">{dataArr[2]}</div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-700 mb-5">{`Welcome ${user?.email}!`}</h1>
          </div>

          <div className="flex w-full min-h-screen h-fit relative pb-5 duration-200 shadow-md">
            <Tasks />
          </div>
        </div>
      </GlobalContext.Provider>
    </>
  );
}
