import { postService } from "../services/post.service";
import { commentService } from "../services/comment.service";
import { alertActions } from './alert.actions';
import { history } from '../../store';

// increment
export function increment(index) {
  return {
    type: "INCREMENT_LIKES",
    index
  };
};

export function addComment(comment) {
  return dispatch => {
    dispatch(request({ comment }));

    commentService.create(comment.author, comment.message, comment.post_id)
      .then(
        comment => {
          dispatch(success(comment));
          history.push('/comment/create');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(comment) { return { type: "CREATE_COMMENT_REQUEST", comment } }
  function success(comment) { return { type: "CREATE_COMMENT_SUCCESS", comment } }
  function failure(error) { return { type: "CREATE_COMMENT_FAILURE", error } }
};

export function createPost(post) {
  return dispatch => {
    dispatch(request({ post }));

    postService.create(post.title, post.author, post.content, post.url, post.video)
      .then(
        post => {
          dispatch(success(post));
          history.push('/post/create');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(post) { return { type: "CREATE_POST_REQUEST", post } }
  function success(post) { return { type: "CREATE_POST_SUCCESS", post } }
  function failure(error) { return { type: "CREATE_POST_FAILURE", error } }
};

// remove comment

export function removeComment(postId, i) {
  return {
    type: "REMOVE_COMMENT",
    i,
    postId
  };
};
