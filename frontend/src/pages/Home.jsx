import { useEffect, useState } from "react";
import api from "../api"; 
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth(); // user object JWT-тэй
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [img, setImg] = useState("");
  const [comment, setComment] = useState("");

  // Posts-г авах
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("posts/"); // baseURL + "posts/"
        setPosts(res.data);
      } catch (err) {
        console.error("Post авахад алдаа:", err);
      }
    };

    fetchPosts();
  }, []);

  // Post нэмэх
  const addPost = async () => {
    if (!user) return alert("Login хийнэ үү");

    try {
      const res = await api.post("posts/", {
        author: user.username || user.email, // JWT-д username ашиглаж болно
        img,
        comment,
      });

      setPosts([res.data, ...posts]);
      setShowForm(false);
      setImg("");
      setComment("");
    } catch (err) {
      console.error("Post нэмэхэд алдаа:", err);
      alert("Post нэмэхэд алдаа гарлаа");
    }
  };

  return (
    <>
      {/* Posts */}
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        {posts.map((p) => (
          <div key={p.id} className="bg-white shadow rounded">
            {p.img && <img src={p.img} className="h-64 w-full object-cover rounded-t" />}
            <div className="p-4">
              <p className="font-semibold">{p.author}</p>
              <p className="text-gray-600">{p.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Post товч */}
      {user && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white w-14 h-14 rounded-full text-2xl flex items-center justify-center shadow-lg"
        >
          +
        </button>
      )}

      {/* Post form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <input
              placeholder="Image URL"
              className="border p-2 w-full mb-3 rounded"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <textarea
              placeholder="Comment"
              className="border p-2 w-full mb-3 rounded"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addPost}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
