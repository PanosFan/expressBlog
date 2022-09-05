const deleteBtn = document.querySelector("a.delete");
deleteBtn.onclick = () => {
  const endPoint = `/blogs/${deleteBtn.dataset.doc}`;
  fetch(endPoint, { method: "DELETE" })
    .then((response) =>
      response.json().then((data) => (window.location.href = data.redirect))
    )
    .catch((err) => console.log(err));
};
const form = document.querySelector("#updateForm");
const updateBtn = document.querySelector("a.update");
const submitUpdateBtn = document.querySelector("#submitUpdateBtn");

updateBtn.onclick = () => {
  form.style.opacity = 1;
};
submitUpdateBtn.onclick = () => {
  let title = document.querySelector(".title").value;
  let body = document.querySelector(".body").value;
  let input = { title, body };
  const endPoint = `/blogs/${updateBtn.dataset.doc}`;
  fetch(endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  }).then((response) =>
    response.json().then((data) => (window.location.href = data.redirect))
  );
};
