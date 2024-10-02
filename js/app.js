async function getAll() {
    const panel = document.getElementById("lista");
    const resultado = await fetch(`http://localhost:8080/users`)
    const dados = await resultado.json()

    console.log(dados)
    const ul = document.createElement("ul")
    console.log("dados percorridos")
    dados.forEach(usuario => {
        const li = document.createElement("li")
        li.innerHTML = `${usuario.nome} ${usuario.email}`
        ul.appendChild(li)
    });
    panel.appendChild(ul)
}

getAll();

const form = document.getElementById("formuser")
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }
    enviarDados(usuario)

})
async function enviarDados(usuario) {
    const resultado = await fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })

    console.log(resultado)

    if(!resultado.ok){
        alert("Dados inválidos")
    } 

    if(resultado.status === 201){
        const result = await resultado.json()
        alert(result.message)
        nome: document.getElementById("nome").value = ""
        email: document.getElementById("email").value = ""
        senha: document.getElementById("senha").value = ""
    } else {
        console.error("Erro ao enviar os dados")
    }

    const result = await resultado.json()
    console.log(result)
}
