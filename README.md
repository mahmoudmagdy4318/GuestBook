# GuestBook
### Guestbook web app using Node.js, React.js and mongoDB to display message and replies of users.
- user can show, edit, delete messages.
- user can reply to messages.

## Server-Side
### Technoligies used
- Node.js under Express.js framework
- MongoDb
### Authentication
- User can register using email, username(unique) and password.
- User password is saved hashed using bcrypt package.
- User can login only if he has account and not already loginned "there is a middleware to check if he is already loginned" with his username and password.
### Authorization 
I used JsonWebToken package (JWT) to authorize users for specific actions using middlewares.
- user can see messages if he is loginned.
- user can only edit and delete his own messages.
### Models
##### User Model
- Before saving user, his password is being encrypted using bcrypt.
- User Model has instance method to compare password in login with his hashed password in database.
- User Model has instance method "generateToken" to generate web token during login.
- user Model has static method "getCurrentUserFromToken" to get the current authenticated user from his token.
##### Message Model
- The Message has reference on the user crreated it "user".
- Using "timestamps" option to save the time of creation and if update.
- Using Virtual to get all the replies of the message when populating them.
- Using "pre remove" to remove all message replies when removing it.
##### Reply Model
- The replies have references on their message and the user who created the reply.

### Routes
- AuthRouter where the APIs of authentication.
- MessageRouter where the APIs of messages.
- ReplyRouter where the APIs of replies.

### controllers
- AuthController to handle the APIs of authentication.
- MessageController to handle the APIs of messages.
- ReplyController to handle the APIs of replies.
### MiddleWares
- Token middleware to authenticate the token.
- user actions middleware to allow only authorized user to delete and edit messages.
- already logginned middleware to check whether the user is already loginned or not.

## Client-Side
### API
I used an axios instance to recieve the response from the server
### Components
#### AuthComponents
- ##### Login Component
When the user login successfully I save his token and username in local storage.
- ##### Register Component

#### MessagesComponents
- ##### HomeComponent 
It's the parent component where all messages are fetched from sever using the axios instance inside react hook "useEffect" and saving their state using  UseState.
- User can edit and delete his messages in place.
- ##### AddComponent
Component has form to add new message using the axios instance onSubmit.

#### RepliesComponents
- #### RepliesComponent
It's the component to list all the replies for a specific messages and is rendered in the HomeComponent under the owner message.
- #### AddReplyComponent
Component To add a new Reply to a specific message using the axios instance and auto update in the state and it's rendered in the replies component.
Component to add
- 
