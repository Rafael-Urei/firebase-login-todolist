import React, { memo, useContext } from "react";
import { TbEdit as Edit } from "react-icons/tb";
import { RiDeleteBin2Line as Delete } from "react-icons/ri";
import { GlobalContext } from "../../helper/Context";
import { parseISO, formatDistance } from "date-fns";

function Task({ task }) {
  const { setTaskId, setModal, setDocumentId } = useContext(GlobalContext);
  const postDate = parseISO(task.date);
  const formatedDate = formatDistance(postDate, new Date());
  console.log(formatedDate);
  console.log(task.date);

  return (
    <div className="w-full h-fit bg-slate-50 shadow-md rounded-lg p-4 flex-wrap mb-4">
      <div className="flex justify-between">
        <h1 className="text-slate-400 font-semibold">{task.title}</h1>
        <div className="flex gap-2 text-slate-400 text-sm">
          <button>
            <Edit />
          </button>
          <button>
            <Delete
              onClick={() => {
                setTaskId(task.taskId);
                setDocumentId(task.id);
                setModal({
                  number: "2",
                  visible: true,
                });
              }}
            />
          </button>
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-sm break-words pt-4 pl-2 pr-2 text-justify">
          {task.description}
        </p>
        <p className="text-slate-300 text-xs mt-2 pl-2 pr-2">{formatedDate}</p>
        <p className="text-slate-300 text-xs mt-2 pl-2 pr-2">{task.taskId}</p>
      </div>
    </div>
  );
}

export default memo(Task);
