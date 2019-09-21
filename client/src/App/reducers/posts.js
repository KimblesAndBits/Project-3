function posts(state = {}, action) {
  switch (action.type) {
    case "CREATE_POST_REQUEST":
      return {};
    case "CREATE_POST_SUCCESS":
      return [
        ...state,
        {
          author: action.post.author,
          content: action.post.content,
          title: action.post.title,
          url: action.post.url,
          video: action.post.video,
          likes: action.post.likes
        }
      ];
    case "CREATE_POST_FAILURE":
      return {};
    case "CREATE_COMMENT_REQUEST":
      return {};
    case "CREATE_COMMENT_SUCCESS":
      return [
        ...state,
        {
          author: action.comment.author,
          message: action.comment.message,
          post_id: action.comment.post_id
        }
      ];
    case "CREATE_COMMENT_FAILURE":
      return {};
    case "DELETE_COMMENT_REQUEST":
      return {};
    case "DELETE_COMMENT_SUCCESS":
      const commentId = action.index;
      return [
        ...state.slice(0, commentId),
        ...state.slice(commentId + 1)
      ];
    case "DELETE_COMMENT_FAILURE":
      return {};
    case "INCREMENT_LIKES":
      console.log("Incrementing Likes!!");
      const i = action.index;
      return [
        ...state.slice(0, i), // before the one we are updating
        { ...state[i], likes: state[i].likes + 1 },
        ...state.slice(i + 1) // after the one we are updating
      ];
    default:
      return state;
  }
}

export default posts;
