const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');


// Atribuição dos botões
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;


function diminuiTamanho(){
    if (tamanhoSenha > 1){
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}


function aumentaTamanho(){
    if (tamanhoSenha < 20){
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}


for (let i=0; i < checkbox.length; i++){
    checkbox[i].onclick = geraSenha;
}


geraSenha();


function geraSenha(){
    let alfabeto = '';
    if (checkbox[0].checked){
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked){
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked){
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked){
        alfabeto = alfabeto + simbolos;
    }
    

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++){
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    

    campoSenha.value = senha;
    

    classificaSenha( alfabeto.length); 
}


function classificaSenha(tamanhoAlfabeto){
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (tamanhoAlfabeto === 0) {
        const valorEntropia = document.querySelector('.entropia');
        valorEntropia.textContent = "0 dias";
        return; 
    }


    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);


    if (entropia >= 70){
       forcaSenha.classList.add('forte');
    } else if (entropia >= 54 && entropia < 70) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }


    // Calcula o tempo para quebrar a senha e exibe na tela
    const valorEntropia = document.querySelector('.entropia');
    let diasParaQuebrar = 2**Math.floor(entropia) / (100e6 * 60 * 60 * 24);
      

    valorEntropia.textContent = "Tempo estimado para quebrar: " + diasParaQuebrar.toFixed(2) + " dias";
}