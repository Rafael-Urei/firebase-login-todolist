import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "../../helper/Context";
import { useAuthState } from "react-firebase-hooks/auth";
import z from "zod";
import { auth, db } from "../../config/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";

export const tasksSchema = z.object({
  title: z.string().nonempty("Cannot be blank!"),
  description: z.string().nonempty("Cannot be blank!"),
});

export default function AddTask() {
  const [user] = useAuthState(auth);

  const { setModal, setTasks } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tasksSchema),
  });

  const onSubmit = async (values) => {
    const actualDate = new Date().toISOString();
    console.log(actualDate);
    const tasksRef = collection(db, "tasks");
    console.log(values);
    const taskId = v4();
    await addDoc(tasksRef, {
      ...values,
      user_id: user.uid,
      date: actualDate,
      taskId: taskId,
    })
      .then((response) => {
        setTasks((prev) => {
          return [
            ...prev,
            {
              ...values,
              user_id: user.uid,
              date: actualDate,
              taskId: taskId,
            },
          ];
        });
        setModal({
          number: "",
          visible: false,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="h-screen w-full z-10 backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-black/10 h-screen w-screen z-20"></div>
      <div className="z-30 h-fit min-w-400 bg-slate-100 rounded-md p-5 animate-drop-modal absolute ">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-slate-600 font-semibold">Title</label>
          <input
            type="text"
            className="pr-2 pl-2 rounded"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-400 text-xs font-semibold">
              {errors.title.message}
            </p>
          )}
          <label className="text-slate-600 font-semibold">Description</label>
          <input
            type="text"
            className="pr-2 pl-2 h-12 rounded"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-400 text-xs font-semibold">
              {errors.description.message}
            </p>
          )}
          <div className="flex self-end gap-2 mt-4">
            <button
              className="bg-red-500 rounded pr-2 pl-2 text-slate-50 font-semibold"
              type="button"
              onClick={() => setModal({ number: "", visible: false })}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-500 rounded pr-2 pl-2 text-slate-50 font-semibold"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
