const Option = () => {
  return (
    <form className="max-w-sm mx-auto ">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      ></label>
      <select
        id="countries"
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-200 to-lime-200 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-600 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT">Choose a language</option>
        <option value="US">English</option>
        <option value="CA">German</option>
        <option value="FR">French</option>
        <option value="DE">Russian</option>
        <option value="TR">Turkish</option>
      </select>
    </form>
  );
};

export default Option;
