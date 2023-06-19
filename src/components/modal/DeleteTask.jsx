import { useContext } from "react";
import { GlobalContext } from "../../helper/Context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";

export default function DeleteTask() {
  const { setModal, setTasks, taskId, tasks, documentId } =
    useContext(GlobalContext);

  const handleDeleteTask = async () => {
    console.log(taskId);
    console.log(documentId);
    const taskRef = doc(db, "tasks", documentId);
    await deleteDoc(taskRef).then((res) =>
      setModal({
        number: "",
        visible: false,
      })
    );
    const newArr = tasks.filter((task) =>
      task.taskId === taskId ? false : true
    );
    setTasks(newArr);
  };

  return (
    <div className="h-screen w-full z-10 backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-black/10 h-screen w-screen z-20"></div>
      <div className="z-30 h-fit min-w-400 bg-slate-100 rounded-md p-5 animate-drop-modal absolute ">
        <h1>Are you sure? This process cannot be undone.</h1>
        <div className="flex items-center justify-end gap-2 mt-4 w-full">
          <button
            className="bg-slate-700 rounded pr-2 pl-2 text-slate-50 font-semibold"
            type="button"
            onClick={() =>
              setModal({
                number: "",
                visible: false,
              })
            }
          >
            Cancel
          </button>
          <button
            className="bg-red-500 rounded pr-2 pl-2 text-slate-50 font-semibold"
            type="submit"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
