import ContactSvg from "../assets/cont.svg";

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-slate-200 backdrop-blur-lg dark:bg-black py-5">
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg shadow-md dark:shadow-purple-500 p-5 md:p-10  h-full bg-white dark:bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mt-5">
          Contact Us
        </h2>
        <p className="text-md md:text-lg text-center text-gray-600 dark:text-gray-400 mt-2">
          We'd love to hear from you! Reach out to us with any questions or
          feedback.
        </p>
        <form className="w-full max-w-md mt-8">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600"
                id="grid-name"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600"
                id="grid-email"
                type="email"
                placeholder="jane.doe@example.com"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-xs font-bold mb-2"
                htmlFor="grid-message"
              >
                Message
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600"
                id="grid-message"
                rows={4}
                placeholder="Your message..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:flex w-full md:w-1/2  items-center justify-center p-5 md:p-10  h-full">
        <img src={ContactSvg} alt="Contact Us" className="w-1/2 md:w-3/4 " />
      </div>
    </div>
  );
};

export default ContactUs;
