const totalInteira =document.getElementById('totalInteira');

//refere-se ao campo total Geral
const totalGeral= document.getElementById('totalGeral');

document.addEventListener("DOMContentLoaded", function() { 
  const horario = document.getElementById("horarios");
  const btnFechar = document.getElementById('btnFechar');
  const inputMeia = document.getElementById('qtdMeia'); // Referência correta ao campo
  const inputInteira = document.getElementById('qtdeInteira'); // Referência correta ao campo

  //CALCULA OS INGRESSOS VALOR MEIO
  inputMeia.addEventListener("input", function(event) {   
    let quantidade = Number(inputMeia.value);     
    let totalMetade = quantidade * 10;         
    document.getElementById('totalMeia').innerHTML = `R$ ${totalMetade.toFixed(2)}`;
    CalculatotalGeral();
  });
  
  //CALCULA OS INGRESSOS VALOR INTEIRO
  inputInteira.addEventListener("input", function(event) {       
    let quantidade = Number(inputInteira.value);     
    let totalinteiro = quantidade * 20;         
    document.getElementById('totalInteira').innerHTML = `R$ ${totalinteiro.toFixed(2)}`;    
    CalculatotalGeral();
  });

  horario.addEventListener("click", function(event) {
    SelecionaFilme(); 
  });

  
});

function CalculatotalGeral() { 
  const vlMeia = parseFloat(document.getElementById("totalMeia").innerText.replace("R$ ", "")) || 0;
  const vlInteira = parseFloat(document.getElementById("totalInteira").innerText.replace("R$ ", "")) || 0;  
  const somaTotal = vlMeia + vlInteira;  
  document.getElementById('totalGeral').innerHTML = `R$ ${somaTotal.toFixed(2)}`;
}

