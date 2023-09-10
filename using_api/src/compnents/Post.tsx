import { useEffect, useState } from 'react';
import axios from 'axios';


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getApi = async () => {
    try {
      const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
      console.log(response.data)
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const renderPosts = () => {
    const rows = [];
    for (let i = 0; i < posts.length; i += 4) {
      const rowPosts = posts.slice(i, i + 4);
      const row = (
        <div key={i} className="row">
          {rowPosts.map((post) => (
            <div key={post.id} className="col-md-3">
              <div className="main_card">
                <div className="card-body">  
                  <h5 className="card-header">{post.userId}</h5>
                  <h5 className="card-title">{post.title}</h5>   
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <>
      {renderPosts()}
    </>
  );
};

export default Post;
