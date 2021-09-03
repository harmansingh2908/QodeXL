module.exports = {
  systemError: {
    statusCode: 500,
    status: "error",
    message: "Technical error ! Please try again later.",
  },
  emailAlreadyExists: {
    statusCode: 103,
    status: "warning",
    message: "Email is already registered.",
  },
  emailNotRegister: {
    statusCode: 104,
    status: "warning",
    message: "Email is not registered.",
  },
  invalidCredentials: {
    statusCode: 104,
    status: "warning",
    message: "Invalid Credentials.",
  },
  userCreatedSuccess: {
    statusCode: 200,
    status: "success",
    message: "User registered successfully",
  },
  userLoginSuccess: {
    statusCode: 200,
    status: "success",
    message: "User Login successfully",
  },
  userLogoutSuccess: {
    statusCode: 200,
    status: "success",
    message: "User Logout successfully",
  },
  userListing: {
    statusCode: 200,
    status: "success",
    message: "User Listing",
  },
  postCreatedSuccess: {
    statusCode: 200,
    status: "success",
    message: "Post created successfully",
  },
  postDetail: {
    statusCode: 200,
    status: "success",
    message: "Post Details",
  },
  postList: {
    statusCode: 200,
    status: "success",
    message: "My Post listing",
  },
  allPostList: {
    statusCode: 200,
    status: "success",
    message: "All Post",
  },
  postLike: {
    statusCode: 200,
    status: "success",
    message: "Post Like successfully",
  },
  postDisLike: {
    statusCode: 200,
    status: "success",
    message: "Post DisLiked successfully",
  },
  invalidPostId: {
    statusCode: 104,
    status: "warning",
    message: "Invalid Post Id",
  },
  invalidUserId: {
    statusCode: 104,
    status: "warning",
    message: "Invalid User Id",
  },
  postAlreadyLike: {
    statusCode: 200,
    status: "success",
    message: "You have already liked this Post.",
  },
  postAlreadyDisLike: {
    statusCode: 200,
    status: "success",
    message: "You have already disliked this Post.",
  },
  commentAdded: {
    statusCode: 200,
    status: "success",
    message: "Comment added successfully.",
  },
  invalidCommentId: {
    statusCode: 104,
    status: "warning",
    message: "Invalid Comment Id.",
  },
  commentDelete: {
    statusCode: 200,
    status: "success",
    message: "Comment deleted successfully.",
  },
  postDelete: {
    statusCode: 200,
    status: "success",
    message: "Post deleted successfully.",
  },
  commentLike: {
    statusCode: 200,
    status: "success",
    message: "Comment like successfully.",
  },
  commentAlreadyLike: {
    statusCode: 200,
    status: "success",
    message: "Comment already liked.",
  },
  commentAlreadyDisLike: {
    statusCode: 200,
    status: "success",
    message: "Comment already disliked.",
  },
  commentDisLike: {
    statusCode: 200,
    status: "success",
    message: "Comment disliked successfully.",
  },
  notPermission: {
    statusCode: 104,
    status: "warning",
    message: "User can delete only his own post or comment",
  },
};
