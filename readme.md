# Qodexl

### How to use api's?

Add app details and mongodb details inside Configs folder.

#### set app constant
```js
{
  dev: {
    name: "Qodexl",
    host: "127.0.0.1",
    port: 3000,
    debug: true,
  },
  test: {
    name: "Qodexl",
    host: "127.0.0.1",
    port: 8005,
    debug: true,
  },
  live: {
    name: "Qodexl",
    host: "127.0.0.1",
    port: 8008,
    debug: true,
  },
};
```

#### set Database constant

```js
const db = {
  dev: {
    host: "127.0.0.1",
    username: "",
    password: "",
    port: "27017",
    database: "qodexl",
  },
  test: {
    host: "127.0.0.1",
    username: "",
    password: "",
    port: "27017",
    database: "qodexl",
  },
  live: {
    host: "",
    username: "",
    password: "",
    port: "",
    database: "",
  },
};
```

#### set env variable inside env.json file. default is dev
```js
{
  "instance": "dev"
}
```

#### Issue the following command on your terminal:

```sh
npm i

npm run start:watch

```

Task which I have achieved"
1. User can register successful.
2. Register user can login with his credentials(email and password, token will return in headers response with the keyName X-logintoken, for all valid api request we have to pass token in headers).
3. Register user can see all user list, can post on his wall or other user's wall (a post has title and post field need to be add).
4. Register user can like/dislike post.
5. Register user can reply on his/other user's post.
6. Register user can like/dislike the reply on the post.
7. Register user can get post details.
8. Register user can delete his own post and comment.


We have Following api list and payload of each api is define with response.
```txt
1. Create User API Details
METHOD: POST
ENDPOINT: user/v1/createUser
PAYLOAD: {
    "username":"test",
    "email":"test@test.com",
    "password":"test@123"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "User registered successfully"
}

2. Login API Details
METHOD: POST
ENDPOINT: user/v1/loginUser
PAYLOAD: {
    "email":"test@test.com",
    "password":"test@123"
}

RESPONSE HEADER: {
    X-logintoken: "token"
}
RESPONSE BODY: {
    "statusCode": 200,
    "status": "success",
    "message": "User Login successfully"
}

3. Get All Users API Details
METHOD: GET
ENDPOINT: user/v1/getAllUsers
HEADER: {
    X-logintoken: "token"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "User Listing",
    "data": [
        {
            "_id": "61309f003fbc9b2a91b360a6",
            "email": "testqa@ss.com",
            "username": "Harry"
        },
        {
            "_id": "6130abaf3ba080dd3e83393e",
            "username": "Harry",
            "email": "harry@ss1.com"
        }
    ]
}

4. Create Post API Details
METHOD: POST
ENDPOINT: post/v1/createPost
PAYLOAD :{
    "title":"FirstPost",
    "post":"This is my first post on harpreet's Wall",
    "userWallId":"6131e2654d35efccd43fd5f3" 
}
HEADER: {
    X-logintoken: "token"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post created successfully",
    "postId": "6131e5e0efe8e27641232381"
}


5. Create Post API Details (create Post on my Wall)
METHOD: POST
ENDPOINT: post/v1/createPost
PAYLOAD :{
    "title":"FirstPost",
    "post":"This is my first post on My Wall"
}
HEADER: {
    X-logintoken: "token"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post created successfully",
    "postId": "6131e5e0efe8e27641232381"
}

6. get Post Details API
METHOD: POST
ENDPOINT: post/v1/getPostDetail?postId=6131e62fefe8e27641232384
PAYLOAD :{}
HEADER: {
    X-logintoken: "token"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post Details",
    "postDetail": {
        "_id": "6131e62fefe8e27641232384",
        "title": "FirstPost",
        "post": "This is my first post on My Wall",
        "creationUser": {
            "_id": "6131e2654d35efccd43fd5f3",
            "username": "harpreet"
        },
        "reply_count": 0,
        "likes_count": 0,
        "dislikes_count": 0,
        "post_reply": [],
        "post_like": [],
        "post_dislike": []
    }
}

7. get my wall posts API
METHOD: GET
ENDPOINT: /user/v1/getMyWallPost
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   skip:0,    //optional
   limit:10   //optional
}
RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "My Post listing",
    "totalMyPost": 2,
    "myPosts": [
        {
            "_id": "6131e62fefe8e27641232384",
            "title": "FirstPost",
            "post": "This is my first post on My Wall",
            "creationUser": {
                "_id": "6131e2654d35efccd43fd5f3",
                "username": "harpreet"
            },
            "is_deleted": false,
            "is_blocked": false,
            "is_reported": false,
            "reply_count": 0,
            "likes_count": 0,
            "dislikes_count": 0,
            "created_at": "2021-09-03T09:09:03.711Z",
            "post_reply": [],
            "post_like": [],
            "post_dislike": [],
            "__v": 0
        }
    ]
}

8. get user wall posts API
METHOD: GET
ENDPOINT: /user/v1/getUserWall
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   skip:0,    //optional
   limit:10   //optional
   userId:"userId"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "My Post listing",
    "totalMyPost": 2,
    "myPosts": [
        {
            "_id": "6131e62fefe8e27641232384",
            "title": "FirstPost",
            "post": "This is my first post on My Wall",
            "creationUser": {
                "_id": "6131e2654d35efccd43fd5f3",
                "username": "harpreet"
            },
            "is_deleted": false,
            "is_blocked": false,
            "is_reported": false,
            "reply_count": 0,
            "likes_count": 0,
            "dislikes_count": 0,
            "created_at": "2021-09-03T09:09:03.711Z",
            "post_reply": [],
            "post_like": [],
            "post_dislike": [],
            "__v": 0
        }
    ],
    "totalUserPost": 0,
    "username": "Harry",
    "userWallPosts": []
}


9. like post API
METHOD: POST
ENDPOINT: /post/v1/likePost
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   postId:"postId"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post Like successfully"
}

10. dislike post API
METHOD: POST
ENDPOINT: /post/v1/disLikePost
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   postId:"postId"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post DisLiked successfully"
}

11. add comment on post API
METHOD: POST
ENDPOINT: /post/v1/addComment
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   postId:"postId"
}

RESPONSE: {{
    "statusCode": 200,
    "status": "success",
    "message": "Comment added successfully."
}

12. delete comment API
METHOD: Delete
ENDPOINT: /post/v1/deleteComment
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   "postId":"6131dd2c64a70f9e7153b36d",
   "commentId":"6131ec087937dbfb6dd99305"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Comment deleted successfully."
}

13. delete post API
METHOD: Delete
ENDPOINT: /post/v1/deletePost
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   "postId":"6131dd2c64a70f9e7153b36d"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Post deleted successfully."
}

14. Like comment API
METHOD: Post
ENDPOINT: /post/v1/likeComment
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   "postId":"6131dd2c64a70f9e7153b36d",
   "commentId":"6131ec6bdad1e644f1a61276"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Comment like successfully."
}

15. disLike comment API
METHOD: Post
ENDPOINT: /post/v1/disLikeComment
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
   "postId":"6131dd2c64a70f9e7153b36d",
   "commentId":"6131ec6bdad1e644f1a61276"
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "Comment disliked successfully."
}

15. logout API
METHOD: Post
ENDPOINT: /user/v1/logoutUser
HEADER: {
    X-logintoken: "token"
}
PAYLOAD:{
}

RESPONSE: {
    "statusCode": 200,
    "status": "success",
    "message": "User Logout successfully"
}
```