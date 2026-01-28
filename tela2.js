
document.addEventListener("DOMContentLoaded", function() {    
  const  horario = document.getElementById("horarios");
  horario.addEventListener("click", function(event) {
    SelecionaFilme(); 
  });
})

function SelecionaFilme () {
  // Seleciona todas as divs que você quer monitorar
 const divs = document.querySelectorAll('.card');

 divs.forEach(div => {
    div.addEventListener('click', function(event) {          
       const elementoClicado = event.target;        
        // Captura o ID (se tiver)
       const idDaDiv = elementoClicado.id; 
       const filme1 = [
        {id:'hora1f1', hora:'10:00', filme:'Avatar',cartaz:"./filmes/filme1.jpeg"}, 
        {id:'hora2f1', hora:'14:00', filme:'Avatar',cartaz:"./filmes/filme1.jpeg"},
        {id:'hora3f1', hora:'16:00', filme:'Avatar',cartaz:"./filmes/filme1.jpeg"},
        {id:'hora4f1', hora:'22:00', filme:'Avatar',cartaz:"./filmes/filme1.jpeg"}
       ];

      const busca = filme1.find(u => u.id === idDaDiv);

      if (busca) {
          salvaFilme(busca.hora, busca.filme,busca.cartaz);}       
      });

    });
}

//salva na sessionionStorage
function salvaFilme (horario,nFilme,cartaz){  
  
  sessionStorage.setItem("sessao", horario);
  sessionStorage.setItem( "filme", nFilme);
  sessionStorage.setItem("endereco", cartaz);

  irParaPagina3();
  console.log(nFilme);
  //exibirModal(horario,nFilme,cartaz);
}

//Abre a tela3 para seleção das cadeiras
function irParaPagina3() {  
   window.location.href = "./tela3.html";
}

//// Recuperar um dado
//const nome = sessionStorage.getItem('usuario');
//
//// Remover um item específico
//sessionStorage.removeItem('usuario');
//
//// Limpar tudo
sessionStorage.clear();