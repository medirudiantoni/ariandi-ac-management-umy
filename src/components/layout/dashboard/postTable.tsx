import React from 'react'
import { Post } from '@/types/post';
import { useRouter } from 'next/router';

type PostPropsTable = {
  posts: Post[],
  onDelete: (id: string) => void;
}

const PostTable: React.FC<PostPropsTable> = ({ posts, onDelete }) => {
  const { push } = useRouter();
  
  const confirmDelete = (id: string) => {
    let isDelete = confirm('Are you sure?');
    if(isDelete){
      fetch(`/api/post/${id}`, {method: 'DELETE'}).then(res => res.json()).then(res => console.log(res)).catch(error => console.log(error));
      onDelete(String(id))
    }
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">No</th>
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Title</th>
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Author</th>
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Published Date</th>
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Status</th>
          <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, no) => (
          <tr key={post.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{no + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{post.title}</td>
            <td className="border border-gray-300 px-4 py-2">{post.author.username}</td>
            <td className="border border-gray-300 px-4 py-2">{post.createdAt}</td>
            <td className="border border-gray-300 px-4 py-2">{post.status ? 'Publish' : 'Draft'}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button onClick={() => push(`/dashboard/edit-post/${Number(post.id)}`)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => confirmDelete(String(post.id))} className="text-red-500 hover:underline ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PostTable;