export default function WordInput() {
  return (
    <div className="my-6 py-6 rounded-lg bg-gray-100">
      {/* title, only display in homepage, not in definition */}
      <div className="max-w-md mx-auto sm:max-w-lg">
        <h1 className="text-4xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Easy Grammar
        </h1>
        <p className="text-lg mb-4 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Your Personal English Learning Assistant
        </p>
      </div>
      {/* input */}
      <form className="max-w-md mx-auto sm:max-w-lg">
        <label
          htmlFor="word-input"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="word-input"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type to search a word..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-sm px-4 py-2 dark:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
