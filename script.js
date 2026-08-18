const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyu2di6059vIjeklMmhRE3mVOAWUSK-N3TRvJpUL4isxbke5a-RSzuFFvfZxiJ-G4ft0w/exec";


const form = document.getElementById("sorteioForm");
const button = document.getElementById("submitButton");
const successMessage = document.getElementById("successMessage");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    button.disabled = true;
    button.innerText = "ENVIANDO...";


    const nome = document.getElementById("nome").value.trim();
    const instagram = document.getElementById("instagram").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    const seguiu = document.getElementById("seguiu").checked;
    const avaliou = document.getElementById("avaliou").checked;
    const story = document.getElementById("story").checked;


    const dados = {
        nome: nome,
        instagram: instagram,
        telefone: telefone,

        seguiu: seguiu ? "SIM" : "NÃO",
        avaliou: avaliou ? "SIM" : "NÃO",
        story: story ? "SIM" : "NÃO",

        data: new Date().toLocaleString("pt-BR")
    };


    try {

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(dados)

        });


        form.classList.add("hidden");
        successMessage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        alert(
            "Não foi possível registrar sua participação. Tente novamente."
        );

        button.disabled = false;
        button.innerText = "🎉 PARTICIPAR DO SORTEIO";
    }

});
