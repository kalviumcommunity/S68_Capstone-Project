 1. User Registration (POST /register)
I created an endpoint that allows a new user to register.

Steps involved:
Received user details like username, email, password, and optional role.
Validated the email using Regex.
Checked if the user already exists in the database.
Hashed the password using bcrypt for security.
Saved the new user to MongoDB.
Sent back a response with:a success message the new user details (excluding password for safety)

 2. User Login (POST /login)
This route allows an existing user to log in securely.

Steps involved:
Took email and password from the request.
Verified if a user with that email exists.
Compared the entered password with the hashed password using bcrypt.compare.
If everything matched, generated a JWT token using jsonwebtoken.
Sent back a response containing:a success message the token for further requests 
basic user info (ID, username, email, role)