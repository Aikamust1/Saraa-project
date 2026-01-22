import { useState } from "react";
import api from "../api"; // axios instance

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // axios interceptor-тэй тул Authorization автоматаар очно
      const res = await api.post("posts/", {
        title,
        content,
        is_public: true,
      });

      alert("Post амжилттай нэмэгдлээ!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert("Post нэмэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Шинэ Post нэмэх</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border p-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
        >
          Нэмэх
        </button>
      </form>
    </div>
  );
}

export default AddPost;
