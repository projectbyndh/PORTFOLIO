// Utility for user finding using localStorage
export function findUserByName(name) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(u => u.name.toLowerCase() === name.toLowerCase());
}

export function addUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
