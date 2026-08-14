const Counter = ({ title, number }) => {
  return (
    <div className="flex w-14 flex-col items-center">
      <div className="flex h-8 w-full items-center justify-center rounded bg-black text-white font-bold">
        {String(number).padStart(2, "0")}
      </div>

      <p className="mt-1 text-sm">{title}</p>
    </div>
  );
};

export default Counter;