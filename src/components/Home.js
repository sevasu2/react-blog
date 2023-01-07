import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import React from "react";
import "./Home.css";
import { auth, db } from "../firebase";

export const Home = () => {
  const [postList, setPostist] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));

      setPostist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h1>{post.title}</h1>
            </div>

            <div className="postTextContainer">{post.postText}</div>
            <div className="nameAndDeleteButton">
              <h3>@{post.author.username}</h3>
              {post.author.id === auth.currentUser.uid && (
                <button onClick={() => handleDelete(post.id)}>削除</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
