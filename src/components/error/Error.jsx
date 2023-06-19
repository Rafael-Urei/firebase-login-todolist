import error from "./img/error.png";

export default function Error() {
  return (
    <>
      <div className="h-screen bg-slate-50 flex flex-col justify-center items-center">
        <img src={error} className="animate-pulse"></img>
        <h1 className="text-slate-800 text-2xl">Something wrong happened!</h1>
      </div>
    </>
  );
}
