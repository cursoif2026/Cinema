function criarCadeiras() {
    const container = document.getElementById("minhasCadeiras");
    // Recupera os dados da sessão
    const salvos = JSON.parse(sessionStorage.getItem("assentosTemporarios")) || [];

    for (let i = 0; i < 5; i++) {
        const linha = document.createElement("div");
        linha.className = "linha";

        for (let y = 0; y < 5; y++) {
            const cadeira = document.createElement("div");
            const idAssento = `${i + 1}-${y + 1}`;
            cadeira.className = "assento";
            cadeira.textContent = idAssento;

            if (salvos.includes(idAssento)) {
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
}
// Chamar a função após o carregamento da página

document.addEventListener("DOMContentLoaded", () => {
    const horario = document.getElementById("horarios");
    const btnFechar = document.getElementById('btnFechar');
 
    criarCadeiras();


    // 1. Recuperar e converter os dados (assumindo que salvou um array de índices)
    const dadosSalvos = sessionStorage.getItem('horario');
    const cadeirasReservadas = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    // 2. Selecionar todos os assentos criados
    const todosOsAssentos = document.querySelectorAll('.assento');

    // 3. Marcar como ocupado cada índice que estiver no sessionStorage
    cadeirasReservadas.forEach(indice => {
        if (todosOsAssentos[indice]) {
            todosOsAssentos[indice].classList.add('ocupado');
            // Opcional: remover a classe selecionado caso exista
            todosOsAssentos[indice].classList.remove('selecionado');
        }
    });

    //// Recuperar um dado
    const cadeirasOcupadas = sessionStorage.getItem('horario');
    console.log(cadeirasOcupadas)    

    // 1. SELEÇÃO CORRETA: Use o PAI dos assentos ou o 'body' para delegação
    const container = document.getElementById('minhasCadeiras'); 
    const contador = document.getElementById('contador');
    const total = document.getElementById('totalGeral');
    
    // 2. FUNÇÃO ATUALIZADA: Calcula com base no checkbox
    function atualizarSelecao(tipoIngresso) {                            
       
        const selecionados = document.querySelectorAll('.assento.selecionado').length - 1;        
        if (contador) contador.innerText = (selecionados);
     
        if (total) total.innerText = (selecionados * tipoIngresso).toFixed(2);
       
        
    }

    // 3. EVENTO DE CLIQUE: Delegação de evento
    container.addEventListener('click', (e) => {
        const chPrecoMeia = document.getElementById('meia'); // Certifique-se que este ID existe no HTML    
        
        const selecionado = (chPrecoMeia.checked) ? 10 : 20;        

        if (e.target.classList.contains('assento') && !e.target.classList.contains('ocupado')) {
            e.target.classList.toggle('selecionado');
     
            atualizarSelecao(selecionado);
        }
    });

    
});
