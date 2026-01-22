import { useEffect, useState } from "react";
import api from "../api/axios";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get(`/api/comments/?post=${postId}`)
       .then(res => setComments(res.data));
  }, [postId]);

  const submit = async () => {
    await api.post("/api/comments/", {
      post: postId,
      content
    });
    setContent("");
  };

  return (
    <div>
      {comments.map(c => <p key={c.id}>{c.author}: {c.content}</p>)}

      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={submit}>Comment</button>
    </div>
  );
}

export default CommentSection;
