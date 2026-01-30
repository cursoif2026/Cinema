
document.addEventListener("DOMContentLoaded", function() {    
  const  horario = document.getElementById("horarios");  

  horario.addEventListener("click", function(event) {
    alert("aqui")
    SelecionaFilme(); 
  });
})





function gerarSessoes(nomeFilme, caminhoCartaz, horarios, prefixoId) {
    return horarios.map((hora, index) => {
        return {
            id: `${prefixoId}${index + 1}`, // Gera hora1f1, hora2f1...
            hora: hora,
            filme: nomeFilme,
            cartaz: caminhoCartaz
        };
    });
}

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

       const filme2 = [
        {id:'hora1f2', hora:'10:00', filme:'Mufasa',cartaz:"./filmes/filme2.jpeg"}, 
        {id:'hora2f2', hora:'14:00', filme:'Mufasa',cartaz:"./filmes/filme2.jpeg"},
        {id:'hora3f2', hora:'16:00', filme:'Mufasa',cartaz:"./filmes/filme2.jpeg"},
        {id:'hora4f2', hora:'22:00', filme:'Mufasa',cartaz:"./filmes/filme2.jpeg"}
       ];
       

       criar uma função que crie esses arrays acima automático


      const busca = filme1.find(u => u.id === idDaDiv);

      if (busca) {
          salvaFilme(busca.hora, busca.filme,busca.cartaz,busca.id);}       
      });

    });
}

//salva na sessionionStorage
function salvaFilme (horario,nFilme,cartaz, id){  
  
  sessionStorage.setItem("sessao", horario);
  sessionStorage.setItem( "filme", nFilme);
  sessionStorage.setItem("endereco", cartaz);
  sessionStorage.setItem("id", id);

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