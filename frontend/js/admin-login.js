document
  .getElementById("login-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    errorMsg.textContent = "";

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({ username, password }),
      });
      const data = await res.json();

      console.log(data);
      if (!res.ok) {
        errorMsg.textContent = data.message || "Login failed";
        return;
      }

      localStorage.setItem("adminToken", data.token);

      window.location.href = "admin.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "Server error";
    }
  });