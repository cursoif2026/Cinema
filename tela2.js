
const listaFilmes = [
    {id: 'avatar', nFilme: 'Avatar', cartaz: './filmes/filme1.jpeg',categoria:'Ficção'},
    {id: 'mufasa', nFilme: 'Mufasa', cartaz: './filmes/filme2.jpg',categoria:'Animação'},
    {id: 'anaconda', nFilme: 'Anaconda', cartaz: './filmes/filme3.jpg', categoria:'Ficção'},
    {id: 'velozes', nFilme: 'Velozes e Furiosos', cartaz: './filmes/filme4.jpg',categoria:'Açao'},
    {id: 'zootopia', nFilme: 'Zootopia 2', cartaz: './filmes/filme5.jpg', categoria:'Animação'},
    {id: 'branca', nFilme: 'Branca de Neve', cartaz: './filmes/filme6.jpg',categoria:'Animação'}
];

function inicializaSelecao() {
    const botoes = document.querySelectorAll('.horarios button');

    botoes.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const filmeId = this.dataset.filme; 
            const horaSelecionada = this.innerText;

            const busca = listaFilmes.find(f => f.id === filmeId);
            
            if (busca) {               
                salvaFilme(horaSelecionada, busca.nFilme, busca.cartaz, busca.id, busca.categoria);               
            } else {
                console.error("Filme não encontrado:", filmeId);
            }
        });
    });
    document.getElementById('btnFechar').addEventListener('click', () => {
        sessionStorage.clear();       
        window.location.href = "./tela1.html"; // Redireciona para o início
    });
}

function salvaFilme(horario, nFilme, cartaz, id,categoria) {  
    try {
        sessionStorage.setItem("sessao", horario);
        sessionStorage.setItem("filme", nFilme);
        sessionStorage.setItem("endereco", cartaz);
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("categoria", categoria);
        irParaPagina3();
    } catch (e) {
        console.error("Erro ao salvar sessão:", e);
    }
}

function irParaPagina3() {  
    window.location.href = "./tela3.html";
}

// Inicializa 
document.addEventListener("DOMContentLoaded", inicializaSelecao);
