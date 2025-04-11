1.Created GET All Users Route
This route fetches all users from the database.
Sensitive info like passwords are excluded by keeping Ueserschema Password select:false
Used in admin-level features (like user management panels).
Example: GET /user/allusers

2.Created GET User By ID Route
This route gets a specific user by their MongoDB _id.
Also hides the password field for safety.
Can be used for viewing profiles or personal dashboards.
Example: GET /user/allusers/:id

Secured the routes
authMiddleware can be added to protect the routes if needed.
Ensures only authenticated users can access user data.

Notes
Passwords are never sent in the response due to select: false in the schema.
These routes are important for building features like dashboards, account management, and admin panels.