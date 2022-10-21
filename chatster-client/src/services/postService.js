import CONSTANTS from '../constants'
import BaseServiceClass from './baseServiceClass'

class PostService extends BaseServiceClass {
  addNewPost (payload) {
    this.postMethod(payload, CONSTANTS.POSTED, CONSTANTS.NEW_POST_FAILED, 'posts')
  }

  deleteThePost (postId) {
    this.deleteMethod(`posts/${postId}`, CONSTANTS.DELETION_FAILED)
  }

  editThePost (payload, postId) {
    this.putMethod(payload, CONSTANTS.EDITED, CONSTANTS.EDIT_FAILED, `posts/${postId}`)
  }

  dislikeThePost (payload, postId) {
    this.putMethod(payload, CONSTANTS.DISLIKED, CONSTANTS.DISLIKE_FAILED, `post/lod/${postId}`)
  }

  likeThePost (payload, postId) {
    this.putMethod(payload, CONSTANTS.LIKED, CONSTANTS.LIKE_FAILED, `post/lod/${postId}`)
  }

  publishThePost (postId) {
    const payload = {
      id: postId
    }
    this.putMethod(payload, CONSTANTS.PUBLISHED_SUCCESSFULLY, CONSTANTS.PUBLISHED_FAILED, `post/${postId}/publish`)
  }

  unpublishThePost (postId) {
    const payload = {
      id: postId
    }
    this.putMethod(payload, CONSTANTS.UNPUBLISHED_SUCCESSFULLY, CONSTANTS.UNPUBLISHED_FAILED, `post/${postId}/unpublish`)
  }
}

export default PostService
