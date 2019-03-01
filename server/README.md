# hacktivoverflow

**User Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/users/register|POST|none|body.name:String, body.email:String, body.Password:String,body.gender:String,body.role:String | create new user |
|/users/login|POST|none|body.email:String, body.Password:String|login and generate access_token|
|/users/|GET|access_token|none|get all user data(backend only)|

<br>

**Question Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/questions/|POST|token|body.title:String, body.description:String|create new question|
|/questions/|GET|none|none|get all questions|
|/questions/:questionId|GET|none|none|get one question|
|/questions/:questionId|PUT|token|body.title:String, body.description:String|update question with questionId|
|/questions/:questionId/upvote|PATCH|token|none|upvote question with questionId|
|/questions/:questionId/downvote|PATCH|token|none|downvote question with questionId|
|/questions/:questionId/removeupvote|PATCH|token|none| remove upvote from question with questionId|
|/questions/:questionId/removedownvote|PATCH|token|none| remove downvote from question with questionId|
|/questions/:questionId|DELETE|token|none| delete question with questionId|

<br>

**Answer Routes :**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/answers/|POST|token|body.title:String, body.description:String|create new question|
|/answers/|GET|none|none|get all answers|
|/answers/:answerId|GET|none|none|get one answer|
|/answers/:answerId|PUT|token|body.title:String, body.description:String|update question with answerId|
|/answers/:answerId/upvote|PATCH|token|none|upvote answer with answerId|
|/answers/:answerId/downvote|PATCH|token|none|downvote answer with answerId|
|/answers/:answerId/removeupvote|PATCH|token|none| remove upvote from answer with answerId|
|/answers/:answerId/removedownvote|PATCH|token|none| remove downvote from answer with answerId|
|/answers/:answerId|DELETE|token|none| delete answer with answerId|
