const sessao = sessionStorage.getItem('sessao');
const qualFilme=sessionStorage.getItem('filme');
const cartaz=sessionStorage.getItem('endereco'); 
const idFilme=sessionStorage.getItem('id'); 
const selecaoCadeiras= []

function mostrarDadosFilme(){
  //seleciona os dados do filme da tela2  
  document.getElementById('filmeSelecionado').innerHTML = qualFilme;
  document.getElementById('sessao').innerHTML = sessao;
  
  // Exibe a IMAGEM  
  const imgElemento = document.getElementById('imagemFilme');
  if (cartaz && imgElemento) {      
     imgElemento.src = cartaz; 
  }

}

function criarCadeiras() {
    const container = document.getElementById("minhasCadeiras");
    const salvosSessao = JSON.parse(sessionStorage.getItem("assentosTemporarios")) || [];
    
    // Busca os que já foram comprados definitivamente no localStorage e marca como ocupado    
    const ocupadosDefinitivos = JSON.parse(localStorage.getItem(idFilme)) || [];

    for (let i = 0; i < 5; i++) {
        const linha = document.createElement("div");
        linha.className = "linha";

        for (let y = 0; y < 5; y++) {
            const cadeira = document.createElement("div");
            const idAssento = `${i + 1}-${y + 1}`;
            
            cadeira.className = "assento";
            cadeira.textContent = idAssento;
            cadeira.id = idAssento;

            // Verificar se já está ocupado (comprado)
            if (ocupadosDefinitivos.includes(idAssento)) {
                cadeira.classList.add("ocupado");
                console.log("clicou na cadeiras")
            } 
            // Verificar se está apenas selecionado na sessão
            else if (salvosSessao.includes(idAssento)) {
                cadeira.classList.add("selecionado");                
            }

            linha.appendChild(cadeira);
        }
        container.appendChild(linha);
    }    
}




function atualizarSessao() {
    const selecionados = [...document.querySelectorAll(".assento.selecionado")]
                            .map(assento => assento.textContent);  
    // Salva na sessão atual (limpa ao fechar a aba)
    sessionStorage.setItem("assentosTemporarios", JSON.stringify(selecionados));
    // 1. Busca a lista de nomes/IDs ocupados do localStorage
    const ocupados = JSON.parse(localStorage.getItem(idFilme)) || [];

    // 2. Seleciona todos os assentos criados na tela
    const todosAssentos = document.querySelectorAll(".assento");

    // 3. Percorre cada um deles
    todosAssentos.forEach(assento => {
        // Verifica se o texto do assento (ex: "A1") está na lista de ocupados
        if (ocupados.includes(assento.textContent.trim())) {
            assento.classList.add("ocupado"); // Adiciona a classe de bloqueio
            assento.classList.remove("selecionado"); // Garante que não esteja selecionado
        }
    });
}


// Chamar a função após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    
    const btnFechar = document.getElementById('btnFechar');           
    const cadeirasOcupadas = sessionStorage.getItem('sessao');    
    const container = document.getElementById('minhasCadeiras'); 
    const contador = document.getElementById('contador');
    const total = document.getElementById('totalGeral');
   
    btnFechar.addEventListener("click", () => {
      window.location.href = "./tela2.html";
    });
   
    criarCadeiras();      

    // 2. FUNÇÃO ATUALIZADA: Calcula com base no checkbox
    function atualizarSelecao(tipoIngresso) {                            
       
        const selecionados = document.querySelectorAll('.assento.selecionado').length - 1;        
        if (contador) contador.innerText = (selecionados);
     
        if (total) total.innerText = (selecionados * tipoIngresso).toFixed(2);       
        
    }    

    const chPrecoMeia = document.getElementById('meia');

    // Inicializa o array com o que já estiver no session storage, se houver
    let selecaoCadeiras = JSON.parse(sessionStorage.getItem('assentosSelecionados')) || [];

    // 3. EVENTO DE CLIQUE
    container.addEventListener('click', (e) => {        
            
        // Define o preço baseado no checkbox de meia-entrada
        const preco = (chPrecoMeia.checked) ? 10 : 20;      

        // Verifica se clicou num assento e se não está ocupado
        if (e.target.classList.contains('assento') && !e.target.classList.contains('ocupado')) {
            
            // Alterna a classe de seleção
            e.target.classList.toggle('selecionado');

            const cadeiraId = e.target.id;       

            // Atualiza a UI e preço total (função assumida)
            if (typeof atualizarSelecao === 'function') {
                atualizarSelecao(preco);
            }

            // --- LÓGICA DE SESSION STORAGE ---
            if (e.target.classList.contains('selecionado')) {
                // Adiciona se não estiver na lista
                if (!selecaoCadeiras.includes(cadeiraId)) {
                    selecaoCadeiras.push(cadeiraId);
                    
                }
            } else {
                // Remove se a classe 'selecionado' foi removida pelo toggle
                selecaoCadeiras = selecaoCadeiras.filter(id => id !== cadeiraId);            
                sessionStorage.removeItem(cadeiraId);
            }

            // Salva o array atualizado como string no session storage
            sessionStorage.setItem('assentosSelecionados', JSON.stringify(selecaoCadeiras));
            
        }
    });    

    comprar.addEventListener("click", () => {    
       comprarIngresso(idFilme,selecaoCadeiras)        
    }); 

 mostrarDadosFilme();    
});


function comprarIngresso(idFilme, selecaoCadeiras) {
  // Busca as cadeiras do filme específico
    const cadeirasString = localStorage.getItem(idFilme);

    if (cadeirasString) {
        // Converte de volta para Array/Objeto
        const cadeirasReservadas = JSON.parse(cadeirasString);
        const listaAtualizada = [...cadeirasReservadas, ...selecaoCadeiras];
        
        // Salva a lista completa de volta
        localStorage.setItem(idFilme, JSON.stringify(listaAtualizada));  

    } else {

        localStorage.setItem(idFilme, JSON.stringify(selecaoCadeiras));      
        
    } 
   
    sessionStorage.removeItem("assentosSelecionados"); 
    atualizarSessao();
}