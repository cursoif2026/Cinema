
document.addEventListener("DOMContentLoaded",function(){
//Evento de clique para entrar
const bntEntrar=document.getElementById('bntEntrar')
bntEntrar.addEventListener("click", function(){   
  Login()
});
})

function Login() {

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  //testa se usuario e senha não estão em branco
  console.log=(usuario).value;
 
  if (usuario === "" || senha === "") {
    alert("Os campos de usuário e senha são obrigatórios.");
    return;
  } else {
    validarSenha(senha, usuario);
  }
}

function validarSenha(senha, usuario) {
  //teste o email
  if (usuario !== "cinema" ) {
    alert("Seu usuário está incorreto!");
    return;
  } else if (senha !== "123") {    
     alert("Sua senha está incorreta!")
  } else {    
    //Se estiver tudo certo abre a tela 2
     window.open('./tela2.html', '_blank')
    alert("Login bem sucedido!");
  }
}


//Relatório das Salas de Reuniões
function alternarVisibilidade() {
    const btn = document.getElementById("btnfechar")    
    const iframe = document.getElementById("meuIframe");
    

    if (iframe.style.display === "none") {
        iframe.style.display = "block"; // Mostra o iframe            
    } else {               
      iframe.style.display = "none"; // Oculta o iframe                   
    }
     
    
    if (btn.hidden === false) {
      btn.hidden=true

    }else{ 
      btn.hidden=false
    }
    
};

