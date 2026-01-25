
const modal = document.getElementById('modalFilme');

//refere-se a quantidade e total de ingressos meia entrada

const totalMeia =document.getElementById('totalMeia');

//refere-se a quantidade de ingressos meia entrada
const qtdInteira= document.getElementById('qtdeInteira');
const totalInteira =document.getElementById('totalInteira');

//refere-se ao campo total Geral
const totalGeral= document.getElementById('totalGeral');

document.addEventListener("DOMContentLoaded",function() { 
  //captura o botão clicado para saber qual horário foi selecionado
  const horario = document.getElementById("horarios");
  const btnFechar = document.getElementById('btnFechar');

  const qtdMeia =document.getElementById('qtdMeia');
  
  qtdMeia.addEventListener("input", function(event) {
    event.preventDefault();
   alert("aqui")
  })
  
  horario.addEventListener("click", function(event) {
    SelecionaFilme(); 
  })
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
function salvaFilme (horario,nFilme,cartaz){  
  sessionStorage.setItem(horario, nFilme,cartaz);
  console.log(nFilme);
  exibirModal(horario,nFilme,cartaz);
}

const modal = document.getElementById('modalFilme');
const imgCartaz = document.getElementById('filme');

function exibirModal(hora,filme,cartaz) {

  // Preenche as informações no modal
    document.getElementById('tituloModal').innerText = filme;
    document.getElementById('horarioModal').innerText = `Horário: ${hora}`;
    

    imgCartaz.src = cartaz; 
    imgCartaz.alt = `Cartaz do filme ${filme}`;
    
    //  Abre o modal   
    modal.showModal();
    //btnFechar.onclick = () => modal.close();
}

}

function CalculaTotais () {
  totalGeral=(totalInteira+totalMeia)
  document.getElementById('tituloModal').innerText = totalGeral;
}
//// Recuperar um dado
//const nome = sessionStorage.getItem('usuario');
//
//// Remover um item específico
//sessionStorage.removeItem('usuario');
//
//// Limpar tudo
sessionStorage.clear();