// MongoDB command to create the admin user
db.users.insertOne({
  name: "Admin",
  email: "admin@admin.com",
  role: "admin",
  status: "active",
  joinDate: "2025-06-25",
  lastLogin: "",
  password: "$2a$10$ry5S7O9gsMyucFk0EREKFOoVcjU.GVBGLT7uuaTPrDlCwYKuoyzzu"
});
