const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const spinner = document.getElementById("spinner");
const qrContainer = document.getElementById("qr-code-container");

qrContainer.style.display = "none";

const onGenerateSubmit = (e) => {
  e.preventDefault();

  qrContainer.style.display = "flex";
  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQrCode(url, size);

      setTimeout(() => {
        const saveURL = qr.querySelector("img").src;
        createSaveButton(saveURL);
      }, 100);
    }, 1000);
  }
};

const generateQrCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: "#000",
    colorLight: "#ffffff",
  });
};

const showSpinner = () => {
  spinner.style.display = "block";
};
const hideSpinner = () => {
  spinner.style.display = "none";
};

const createSaveButton = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-cyan-600 rounded w-full md:w-2/3 p-2 text-white text-md mt-5 hover:bg-cyan-700";

  link.href = saveUrl;
  link.download = "qrcode";
  link.textContent = "Save Image";

  qrContainer.appendChild(link);
};

hideSpinner();

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) {
    saveLink.remove();
  }
};

form.addEventListener("submit", onGenerateSubmit);
