export function setUser(userInput) {
  if (typeof userInput === "object")
    localStorage.setItem("user", JSON.stringify(userInput));
  else if (typeof userInput === "string")
    localStorage.setItem("user", userInput);
  else {
    localStorage.setItem("user", "");
  }
  window.dispatchEvent(new Event("userChange"));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("userChange"));
}

export function isLoggedin() {
  return getUser() ? true : false;
}
