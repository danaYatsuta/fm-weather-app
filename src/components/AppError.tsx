import iconError from "../assets/icon-error.svg";
import iconRetry from "../assets/icon-retry.svg";

export default function AppError({
  onRetryButtonClick,
}: {
  onRetryButtonClick: () => void;
}) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <article
      aria-labelledby="error-heading"
      className="flex flex-col items-center text-center"
    >
      <img alt="" className="size-10" src={iconError} />

      <h2
        className="font-bricolage-grotesque mt-4 text-[3.375rem] leading-16 font-bold"
        id="error-heading"
      >
        Something went wrong
      </h2>

      <p className="mt-3 max-w-xl text-xl text-neutral-200">
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>

      <button
        className="mt-4 flex h-11 items-center gap-2 rounded-lg bg-neutral-800 px-4 hover:bg-neutral-700"
        onClick={onRetryButtonClick}
        type="button"
      >
        <img alt="" src={iconRetry} />
        Retry
      </button>
    </article>
  );
}
