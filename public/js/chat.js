const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("Count has been updated", count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("Printing click to terminal");
//   socket.emit("increment");
// });

const $messageForm = document.querySelector("#messageForm");
const $messageFormInput = $messageForm.querySelector("input");
const $mesageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");
//templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
console.log("messageTemplate", messageTemplate);
socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, { message });
  console.log("html", html);
  $messages.insertAdjacentElement("beforeend", html);
});
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $mesageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    $mesageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("message is delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by browser");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location Shared");
      }
    );
  });
});
