

document.addEventListener("DOMContentLoaded", function() { 
  const horario = document.getElementById("horarios");
  const btnFechar = document.getElementById('btnFechar');
  const inputMeia = document.getElementById('qtdMeia'); 
  const inputInteira = document.getElementById('qtdeInteira'); 

  

  //horario.addEventListener("click", function(event) {
  //  SelecionaFilme(); 
  //});

  
});



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

            cadeira.onclick = () => {
                cadeira.classList.toggle("selecionado");
               
            };

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
document.addEventListener("DOMContentLoaded", criarCadeiras);