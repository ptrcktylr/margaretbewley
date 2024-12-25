import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div className="text-center pb-20">
        <div className="mb-8 animate-pulse">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
        <div className="card bg-base-200 shadow-xl p-6 max-w-sm mx-auto">
          <h2 className="text-4xl mb-4 flex items-center justify-center gap-3">
            <span className="font-extrabold">404</span>
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="font-light">Not Found</span>
          </h2>
          <p className="mb-6 text-base-content/70">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link href="/" className="btn btn-primary gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
