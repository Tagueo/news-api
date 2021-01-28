# Project Beaver's API & Database

## API Types :

### News :
```ts
interface News {
    id: number;
    title: string;
    content: string;
    date: number;
    author: string;
    likes: number;
}
```

### NewsSummary :
```ts
interface NewsSummary {
    id: number,
    title: string;
    author: string;
    date: number;
}
```

### Comment :
```ts
interface Comment {
    id: number;
    content: string;
    date: number;
    author: string;
    newsId: number;
}
```

## API Endpoints :

### ``auth`` - api authentification

JsonWebToken system used to authenticate users for the requests of the other sections.

For each request where authentication is required, the validity of the token is checked with the middleware located in ``modules/token/check``.

**The token is provided in a header of the request of this form:**
```http
Authorization: Bearer <token>
```
with the token in place of ``<token>``. 

A token can be obtained only when making a request to ``auth/login`` with valid credentials.

**If the token is invalid**, the request is rejected with the following error:
```js
{
    success: false,
    error: 'Auth token is invalid'
}
```

**If there is no token provided**, the request is rejected with the following error:
```js
{
    success: false,
    error: 'Auth token is not supplied'
}
```

### POST ``auth/register``

Takes a new user's info to register it.

Body Parameters :
- ``username: string`` String used for identifiying the user. Must be unique.
- ``password: string`` Password used by the user along with its username to authenticate.

Returns :
- ``success: bool`` Boolean signifying the success of the registration.
- ``error?: string`` If success is false, contains the error that caused the failure.


### POST ``auth/login``

Takes a user id and password and returns a token if the info provided is valid

Body Parameters :
- ``username: string`` String used for identifiying the user.
- ``password: string`` Password used by the user to authenticate.

Returns :
- ``success: bool`` Boolean signifying the success of the login.
- ``token?: string`` If success is true, contains the token that will be used by the user for authenticating.
- ``error?: string`` If success is false, contains the error that caused the failure.

### POST ``auth/check``

*Requires authentification* - Checks if the provided token is still valid.
This endpoint can be used when needing to know if the user is still authenticated, in other words, if his token is still valid.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Returns :
- ``valid: bool`` validity state of the provided token

### POST ``auth/user``

*Requires authentification* - Returns the token's user info.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Returns :
- ``success: bool`` Boolean signifying the success of the request.
- ``username?: string`` If success is true, contains the username associed with the provided token.
- ``id?: number`` If success is true, contains the id associed with the provided token.
- ``role?: 'member' | 'admin'`` If success is true, contains the role associed with the provided token.
- ``error?: string`` If success is false, contains the error that caused the failure.


### ``news`` - game's news manager

News system to update the users about the game developement and updates.

### GET ``news/count``

Returns the number of posted news.

URL Parameters :
- No parameters required

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.
- ``number?: number`` If success is true, contains the number of news.

### GET ``news/fetch``

Returns a number of summary of the last posted news.

URL Parameters :
- ``count: number`` Number of news desired.

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.
- ``newsSummary?: Array<NewsSummary>`` If success is true, Array containing the requested number of news summary.

### GET ``news/summaries``

Returns every summary of the news.

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.
- ``newsSummary?: Array<NewsSummary>`` If success is true, Array containing the news summaries.
- ``count?: number`` If success is true, contains the number of news summaries.

### GET ``news/get``

Returns a specific news with all its info.

URL Parameters :
- ``newsId: number`` Id of the requested news.

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.
- ``news?: News`` If success is true, Object containing the requested news.
- ``comments?: Array<Comment>`` If success is true, Array containing the comments posted on the news.

### GET ``news/fetchall``

Returns a every news ordered by date.
**Do not return the comments**

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.
- ``news?: Array<News>`` If success is true, Array containing the requested number of news summary.
- ``count?: number`` If success is true, contains the number of news.

### POST ``news/like``

*Requires authentification* - Likes a news.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Body Parameters :
- ``newsId: number`` Id of the liked news.

Returns :
- ``success: bool`` Boolean signifying the success of the like.
- ``error?: string`` If success is false, contains the error that caused the failure.

### POST ``news/create``

*Requires authentification* - Creates a news with the specified info. Only a specific set of hardcoded users are allowed to create a news.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Body Parameters :
- ``newsTitle: string`` Title of the news.
- ``newsBody: string`` Content of the news. Can be text or an HTML string.

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.

### POST ``news/delete``

*Requires authentification* - Deletes a news. Only a specific set of hardcoded users are allowed to delete a news.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Body Parameters :
- ``newsId: number`` Id of the deleted news.

Returns :
- ``success: bool`` Boolean signifying the success of the deletion.
- ``error?: string`` If success is false, contains the error that caused the failure.

### POST ``news/comment``

*Requires authentification* - Allows a user to comment a news.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Body Parameters :
- ``newsId: number`` Id of the commented news.
- ``content: string`` Content of the comment. Can only be text.

Returns :
- ``success: bool`` Boolean signifying the success of the creation.
- ``error?: string`` If success is false, contains the error that caused the failure.

### POST ``news/comment/delete``

*Requires authentification* - Allows a user to delete a comment. Only a specific set of hardcoded users and the comment's author are allowed to delete a comment.

HEADERS Parameters :
- ``Authorization: Bearer <token>`` token used for authentification.

Body Parameters :
- ``commentId: number`` Id of the comment.

Returns :
- ``success: bool`` Boolean signifying the success of the deletion.
- ``error?: string`` If success is false, contains the error that caused the failure.