1.Update User - PUT /user/updateuser/:id
This route allows an authenticated user (with a valid token) to update their user data like username, email, or role.

2.Protected Route:
You need to pass a valid JWT token in the headers to access this route.

✅ Example Request
Method: PUT
URL: http://localhost:5000/user/updateuser/USER_ID

Headers:        Key	Value
Authorization	Bearer <My_token>
Content-Type	application/json
Body (JSON):
{
  "username": "newUsername",
  "email": "newemail@example.com",
  "role": "user"
}