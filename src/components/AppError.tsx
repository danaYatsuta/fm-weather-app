import iconError from "../assets/icon-error.svg";
import iconRetry from "../assets/icon-retry.svg";

function AppError({
  onRetryButtonClick,
}: {
  onRetryButtonClick: React.MouseEventHandler;
}) {
  return (
    <section className="flex flex-col items-center text-center">
      <img src={iconError} alt="" className="size-10" />

      <h2 className="font-bricolage-grotesque mt-4 text-[54px] leading-16 font-bold">
        Something went wrong
      </h2>

      <p className="mt-3 max-w-xl text-xl text-neutral-200">
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>

      <button
        onClick={onRetryButtonClick}
        type="button"
        className="mt-4 flex h-11 items-center gap-2 rounded-lg bg-neutral-800 px-4 hover:bg-neutral-700"
      >
        <img src={iconRetry} alt="" /> Retry
      </button>
    </section>
  );
}

export default AppError;
