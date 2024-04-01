export default function SearchInput({ value, handleWord, wordSubmit }) {
  return (
    <section className="block w-full">
      <div className="max-w-4xl mx-auto my-6 py-12 px-4 md:shadow-lg md:rounded-2xl bg-purple-100">
        {/* title, only display in homepage, not in definition */}
        <div className="max-w-md mx-auto sm:max-w-lg">
          <h1 className="text-left text-4xl font-bold mt-4 text-gradient">
            Easy Grammar
          </h1>
          <p className="text-left text-lg mb-4 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Your Personal English Learning Assistant
          </p>
        </div>
        {/* input */}
        <form className="max-w-md mx-auto sm:max-w-lg" onSubmit={wordSubmit}>
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
              value={value}
              onChange={handleWord}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type to search a word..."
              required
            />
            <button
              type="submit"
              className="absolute end-2.5 bottom-2.5 btn-primary"
              title="Get definition and AI generated image"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
