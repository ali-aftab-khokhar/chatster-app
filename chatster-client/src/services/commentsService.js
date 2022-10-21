import CONSTANTS from '../constants'
import BaseServiceClass from './baseServiceClass'

class CommentService extends BaseServiceClass {
  deleteTheComment (commentId) {
    this.deleteMethod(`comment/${commentId}`, CONSTANTS.DELETION_FAILED)
  }

  publishNewComment (payload, postId) {
    this.postMethod(payload, CONSTANTS.COMMENTED, CONSTANTS.PUBLISHED_FAILED, `${postId}/comments`)
  }

  editTheComment (payload, commentId) {
    this.putMethod(payload, CONSTANTS.UPDATED, CONSTANTS.EDIT_FAILED, `comments/${commentId}`)
  }
}

export default CommentService
