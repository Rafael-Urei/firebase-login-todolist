import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../helper/Context";
import Task from "./Task";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default function Tasks() {
  const { setTasks, setModal, tasks } = useContext(GlobalContext);

  const tasksRef = collection(db, "tasks");

  const getTasks = async () => {
    const data = await getDocs(tasksRef);
    setTasks(data.docs.map((task) => ({ ...task.data(), id: task.id })));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen">
        <button
          className="font-semibold text-slate-600 bg-teal-400 p-2 rounded"
          onClick={() => setModal({ number: "1", visible: true })}
        >
          ADD NEW TASK
        </button>
        <ul className="self-center w-5/6 mt-4">
          {tasks.reverse().map((task) => {
            return <Task task={task} />;
          })}
        </ul>
      </div>
    </>
  );
}
