import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const PostPage = () => {
  const [publicPosts, setPublicPosts] = useState([]);
  const { push } = useHistory();
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState(0);
  // console.log(likes);
  const increase = () => {
    let newLikes = likes + 1;
    setLikes(newLikes);
    console.log(newLikes);
  };
  useEffect(() => {
    fetchPosts();
    fetchNames();
  }, []);

  const fetchPosts = () => {
    axiosWithAuth()
      .get("/api/posts")
      .then((res) => {
        console.log(res);
        setPublicPosts(res.data.reverse());
      })
      .catch((err) => console.log(err));
  };

  const fetchNames = () => {
    axiosWithAuth()
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
      });
  };

  return (
    <div>
      {publicPosts.map((post, i) => (
        <Main
          className="main-post"
          onClick={() => push(`/post/${post.id}`)}
          key={post.id}
        >
          <div className="post-header">
            <h2>Title: {post.title}</h2>
            {users.map((user) => {
              return post.user_id === user.id ? (
                <h3 key={user.id} className="creator">
                  Created By: {user.username}
                </h3>
              ) : null;
            })}
          </div>

          <img className="post" src={post.img_url} alt="oops! no_image" />
          <div id="likes" className="like-button">
            <button id="increase" onClick={increase}>
              <h1>&#128076;</h1>
            </button>
            <span className="count">0</span>
          </div>
          <div className="txt">
            <p>{post.body}</p>
          </div>
          <div>
            <form className="form-container">
              <input
                placeholder="type comment here"
                value=""
                name="comments"
                type="text"
              />
              <button className="posts">submit</button>
            </form>
          </div>
        </Main>
      ))}
    </div>
  );
};

const Main = styled.div`
  /* border-bottom: 2px solid rgba(5, 5, 5, 0.4);
  border-left: 4px outset rgba(5, 5, 5, 0.4); */
  border-radius: 2px;
  width: 75%;
  margin: auto;
  margin-bottom: 10%;
  padding: 5% 0;
  background-color: ${(pr) => pr.theme.prime};
  cursor: pointer;
  border: 1px solid ${(pr) => pr.theme.secondaryColor};
  color: ${(pr) => pr.theme.secondaryColor};
  text-shadow: 1px 1px black;
  font-size: 1.2rem;
  box-shadow: 2px 4px 15px 2px black;
  h2 {
    margin-left: 10px;
  }
  h3 {
    margin-right: 10px;
  }
  img {
    border-radius: 2px;
  }
  .txt {
    margin-top: 20px;
  }
  #likes {
    width: 10%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  span {
    display: flex;
    justify-content: center;
  }
  #increase {
    margin-top: 10px;
    padding: 1%;
    border-radius: 2px;
    background-color: ${(pr) => pr.theme.white};
    border: 2px solid ${(pr) => pr.theme.primaryColor};
    &:hover {
      border: 2px solid ${(pr) => pr.theme.secondaryColor};
      box-shadow: 1px 1px 5px 1px;
      color: ${(pr) => pr.theme.secondaryColor};
    }
    span {
      padding: 0.2%;
      background-color: white;
      border: 1px solid ${(pr) => pr.theme.black};
    }
  }
  .form-container {
    width: 45%;
    margin: auto;
    margin-top: 30px;
    display: flex;
    box-shadow: 1px 1px 5px 1px;
  }
  input {
    width: 90%;
    height: 2.5vh;
  }
  .posts {
    width: 15%;
    border: 2px solid ${(pr) => pr.theme.secondaryColor};
  }
`;

export default PostPage;
