import { useEffect, useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiComment, BiCommentCheck} from 'react-icons/bi';


import { getPosts, getSession, getUsers } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  // false ή κάποιο id
  const [showComments, setShowComments] = useState(false);
  const [fillLike, setFillLike] = useState(true);
  const [checkedComments, setCheckedComments] = useState(false);
  const [showAddCommentArea, setShowAddCommentArea] = useState(false);
  const [textOfComment, setTextOfComment] = useState('');

  useEffect(() => {
    // επιστρέφει { user }
    getSession().then((data) => {
      setUser(data.user);
    });
    // επιστρέφει []
    getPosts().then(setPosts);
    getUsers().then(setUsers);
  }, []);


  const handleToggleComments = (postId) => {
    if (showComments === postId) {
      setShowComments(false);
    } else {
      setShowComments(postId);
    }
  };

  const handleToggleLikes = (postId, likes) => {
    if(likes.find ( (like) => like.userId === user.id)  ) {
      setFillLike(false);
      posts.find( (post) => post.id === postId).likes.splice(
        likes.indexOf(likes.find( (like) => like.userId === user.id)), 1)
    }else {
      posts.find( (post) => post.id === postId).likes.push(
        { id: (likes.at(-1).id) + 1, 
          userId : user.id
        }); 
      setFillLike(postId);
    }     
  };

  const handleAddComment = (postId) => {
     if (showAddCommentArea === postId) {
      setShowAddCommentArea(false);
    } else {
      setShowAddCommentArea(postId);
    }
  }

  const handleCommentArea = (e) => {
    setTextOfComment(e.target.value);
  }

  const handlePostComment = (postId, comments) => { 
    if(textOfComment){
        handleAddComment(postId);
        posts.find( (post) => post.id === postId).comments.push(
          { id: comments.at(-1).id + 1 , 
            body: textOfComment, 
            userId: user.id
          });
        setCheckedComments(true);  
    }
  }

  const handleDeleteComment = (postId, comments) => {
        setCheckedComments(false);
        posts.find( (post) => post.id === postId).comments.splice(
          comments.indexOf(comments.find( (comment) => comment.userId === user.id), 1));
  }

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="h-16 flex items-center max-w-7xl mx-auto px-6 justify-between">
          <div className="font-medium text-lg">Blog Project</div>
          {user ? (
            <button className="h-9 w-9 bg-blue-500 rounded-full text-white" title={user.name}>
              {user.name
                .split(' ')
                .map((value) => value.charAt(0))
                .join('')}
            </button>
          ) : null}
        </div>
      </header>

      <main>
        <div className="h-16" />
        <div className="space-y-2 mt-8">
          {posts.map((post) => (
            <div key={post.id} className="max-w-7xl mx-auto px-6 py-4 bg-white rounded-md">
              <div className="font-medium text-lg">{post.title}</div>
              <div className="text-gray-500">{post.body}</div>
              <div className="flex items-center space-x-6 mt-4">
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleToggleComments(post.id)
                }}
                >
                  { post.comments.some(comment => comment.userId === user.id) && checkedComments?
                    <BiCommentCheck size={20} /> 
                    :
                    <BiComment size={20} /> }
                    {post.comments.length}                 
                </button>

                <button onClick ={(e) => { 
                  e.stopPropagation();
                  handleToggleLikes(post.id, post.likes);
                }}
                >              
                  {post.likes.some((like) => like.userId === user.id) ? (
                    <AiFillLike size={20} />
                  ) : (
                    <AiOutlineLike size={20} />
                  )}
                  {post.likes.length}
                </button>               
              </div>

              { showAddCommentArea ? 
                <div className={`mt-6 ${showAddCommentArea && showAddCommentArea === post.id ? '' : 'hidden'}`}>  
                  <textarea id='comment' 
                            placeholder = "Write your comment..." 
                            className='rounded border px-6 py-2 mt-4 text-sm shadow-xl w-full'                          
                            onChange = {handleCommentArea}>                       
                </textarea>
                <button className='rounded border px-6 py-2 mt-4 text-sm shadow-xl'
                      onClick = {() =>  handlePostComment(post.id, post.comments)}
                >
                  Add your comment
                </button>
                <button className='rounded border px-6 py-2 mt-4 text-sm shadow-xl'
                        onClick = {() => handleAddComment(post.id)}
                >
                  Cancel
                </button>
                </div>
              :          
                <button className='rounded border px-6 py-2 mt-4 text-sm shadow-xl'
                      onClick = {() => handleAddComment(post.id)}
                >
                  Add a Comment ...
                </button>
                  } 

              <ul className={`mt-6 ${showComments && showComments === post.id ? '' : 'hidden'}`}>
                {post.comments.map((comment) => (
                  <li key={comment.id} className="max-w-7xl mx-auto py-2 bg-white rounded-md">            
                    {user.id === comment.userId ? 
                      <>
                       <div className="text-sm text-gray-500">{comment.body}
                         <button className='rounded border px-1 py-1 ml-8 text-sm shadow-xl text-red-500'
                                 onClick = { () => handleDeleteComment(post.id, post.comments)}>
                           Delete Comment
                         </button>
                       </div>
                       <div className="text-sm mt-1">{user.name}</div>  
                      </> 
                      :
                      <>
                        <div className="text-sm text-gray-500">{comment.body}</div> 
                        <div className="text-sm mt-1">{users.find((user) => user.id === comment.userId)?.name}</div>
                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
