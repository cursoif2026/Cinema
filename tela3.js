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
    function atualizarSelecao() {
        // Conta quantos de cada tipo existem na tela
        const qtdMeias = [...document.querySelectorAll('.assento.selecionado')].filter(a => a.innerText === 'M').length;
        const qtdInteiras = [...document.querySelectorAll('.assento.selecionado')].filter(a => a.innerText === 'I').length;

        const totalMeia = (qtdMeias * 10);
        const totalinteira = (qtdInteiras * 20);
        const totalCalculado = (totalMeia  + totalinteira );


        // Atualiza os labels (IDs vindos do seu HTML anterior)
        if (document.getElementById('totalMeia')) document.getElementById('totalMeia').innerText = `(${totalMeia.toFixed(2)})`;
        if (document.getElementById('totaInteira')) document.getElementById('totaInteira').innerText = `(${totalinteira.toFixed(2)})`;
        if (document.getElementById('totalGeral')) document.getElementById('totalGeral').innerText = `R$ ${totalCalculado.toFixed(2)}`;
        
        // Atualiza o contador de cadeiras total
        if (document.getElementById('contador')) document.getElementById('contador').innerText = qtdMeias + qtdInteiras;
    }

    const chPrecoMeia = document.getElementById('meia');

    // Inicializa o array com o que já estiver no session storage, se houver
    let selecaoCadeiras = JSON.parse(sessionStorage.getItem('assentosSelecionados')) || [];

    container.addEventListener('click', (e) => {        
    const preco = parseFloat(document.querySelector('input[name="tipoEntrada"]:checked').value);
    
    if (e.target.classList.contains('assento') && !e.target.classList.contains('ocupado')) {
        
        e.target.classList.toggle('selecionado');
        const cadeiraId = e.target.id;

        if (e.target.classList.contains('selecionado')) {
            // Marca visualmente o tipo no assento
            e.target.innerText = (preco === 10) ? 'M' : "I";
            
            if (!selecaoCadeiras.includes(cadeiraId)) {
                selecaoCadeiras.push(cadeiraId);
            }
        } else {
            e.target.innerText = cadeiraId;
            selecaoCadeiras = selecaoCadeiras.filter(id => id !== cadeiraId);
        }

        // Chamamos a função de atualização sem passar o preço fixo, 
        // pois ela vai varrer os assentos agora
        atualizarSelecao();

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