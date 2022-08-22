const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");


const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();
    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    
    console.log(color);
    if(url === ""){
        alert("Enter a URL");
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size, color);

            setTimeout(()=>{
                const saveurl= qr.querySelector("img").src;
                createSaveBtn(saveurl);
            },50)

        }, 1000);
    }
};

const generateQRCode = (url, size, color) => {
    const qrcode = new QRCode("qrcode",{
        text: url,
        width: size,
        height: size,
        colorDark: color,
        colorLight: "white",
    })
}

const showSpinner = () => {
    document.getElementById("spinner").style.display="block";
}
const hideSpinner = () => {
    document.getElementById("spinner").style.display="none";
}

const clearUI = () => {
    qr.innerHTML = "";
    const savelink = document.getElementById("save-link");
    if(savelink) {
        savelink.remove();
    }
}

const createSaveBtn = (saveurl) => {
    const link = document.createElement("a");
    link.id = "save-link";
    link.classList = "bg-gray-600 hover:bg-black text-white font-medium py-2 rounded w-1/3 m-auto my-5 mb-20";
    link.href= saveurl;
    link.download = "qrcode";
    link.innerHTML = "Download Image";
    document.getElementById("generated").appendChild(link);
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);