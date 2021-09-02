import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [createVisible, setCreateVisible] = useState(false)


  const likeIncrease = async (blog) => {
    blog.likes += 1;
    const response = await blogService.addLike(blog, user.token)
    return response
  }

  const removeBlog = async (blog) => {
    const decision = window.confirm(`remove blog ${blog.title} by ${blog.author}?`);
    if (decision) {
      const response = await blogService.deleteBlog(blog.id, user.token)
      return response
    } else {
      return null
    }

  }


  return (
    <div style={blogStyle}  >

      <div>
        <div style={{ display: createVisible ? 'none' : 'block' }} >
          {blog.title}{' by '}{blog.author}<button
            style={{ display: createVisible ? 'none' : 'block' }}
            onClick={() => setCreateVisible(true)} >view</button>

        </div>
        <div style={{ display: createVisible ? 'block' : 'none' }} >
          title: <strong>{blog.title}</strong>
          <br />
          author: <strong>{blog.author}</strong>
          <br />
          url: <strong>{blog.url}</strong>
          <br />
          likes: <strong>{blog.likes}</strong>{' '}<button onClick={() => likeIncrease(blog)} >like</button>
          <br />
          {
            blog.author === user.name ? <button onClick={() => removeBlog(blog)} >remove</button> : null
          }
        </div>
        <div style={{ display: createVisible ? 'block' : 'none' }} >
          <button onClick={() => setCreateVisible(false)} >hide</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;