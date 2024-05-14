import { useRef } from "react";
import { useNotification } from "../context/NotificationContext"

export default function BlogForm({ createBlog, setFormVisibility }) {
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);
  const { setNotification } = useNotification()

  function handleSubmit() {
    if (
      titleRef.current.value &&
      authorRef.current.value &&
      urlRef.current.value
    ) {
      const inputs = {
        title: titleRef.current.value,
        author: authorRef.current.value,
        url: urlRef.current.value,
      };
      createBlog(inputs);
    } else {
      setNotification({ text: "All Fields are required", status: "error" });
    }
  }

  return (
    <div className="space-y-3 sm:max-w-lg">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create new Blog</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
        <input
          type="text"
          ref={titleRef}
          name="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        ></input>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authur:</label>
        <input
          type="text"
          ref={authorRef}
          name="authur"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        ></input>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url:</label>
        <input
          ref={urlRef}
          name="url"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        ></input>
      </div>
      <div className="p-3 space-x-3">
        <button className="text-white bg-violet-700 hover:bg-violet-800 px-5 py-1 font-semibold rounded-md" data-testid="button-submit" onClick={handleSubmit}>
          Create
        </button>
        <button className="text-white bg-red-600 hover:bg-red-800 px-5 py-1 font-semibold rounded-md" onClick={() => setFormVisibility(false)}>Cancel</button>
      </div>
    </div>
  );
}
