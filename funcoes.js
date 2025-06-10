let ultimoValorSelecionado = {};
var soma1=0;soma2=0,soma3=0,soma4=0,soma5=0;
let vozes = [];
function pararLeitura(){
    speechSynthesis.cancel();
}
function mostrarErro(msg) {
    document.getElementById("alerta").textContent = msg;
}

// Carrega as vozes disponíveis
function carregarVozes() {
    vozes = speechSynthesis.getVoices();
}

if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    speechSynthesis.onvoiceschanged = carregarVozes;
    carregarVozes();
} else {
    mostrarErro("Este navegador não suporta leitura em voz alta.");
}

function lerTexto(texto) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        mostrarErro("Seu navegador não suporta leitura em voz alta.");
        return;
    }

    if (!texto || texto.trim() === "") {
        mostrarErro("Texto vazio.");
        return;
    }

    const fala = new SpeechSynthesisUtterance(texto.trim());
    fala.lang = "pt-BR";

    const voz = vozes.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt'));
    if (voz) {
        fala.voice = voz;
    }

    try {
        speechSynthesis.cancel(); // cancela qualquer leitura anterior
        speechSynthesis.speak(fala);

        setTimeout(() => {
            if (!speechSynthesis.speaking) {
            mostrarErro("Falha ao iniciar leitura. Pode ser um problema do navegador.");
        }
    }, 1000);
    } catch (erro) {
        mostrarErro("Erro ao tentar falar o texto.");
        console.error("Erro:", erro);
    }
}

function relatorio(){
   let min=37;
    let max= 185
   let sTotal1 = JSON.parse(localStorage.getItem('sTotal1')) || [];
   div1= document.getElementById("1");
    div2= document.getElementById("2");
    div3= document.getElementById("3");
    div4= document.getElementById("4");
    div5= document.getElementById("5");
    div1.innerHTML=sTotal1[0];
    div2.innerHTML=sTotal1[1];
    div3.innerHTML=sTotal1[2];
    div4.innerHTML=sTotal1[3];
    div5.innerHTML=sTotal1[4];

    let s=(sTotal1[0]+sTotal1[1]+sTotal1[2]+sTotal1[3]+sTotal1[4]);
    total= document.getElementById("total");
    total.innerHTML=s;
    let norm=((s-min)/(max-min));
    let n;
    if(norm<0.2)n=1;
    else if(norm<0.4)n=2;
    else if(norm<0.6)n=3;
    else if(norm<0.8)n=4;
    else n=5;
    img=document.getElementById("imagem");
    img.innerHTML="<img src='img/"+n+".png' width='200px' height='200px'>";

    //div.innerHTML=rel;
}
function recuperaSessaoNome(){
    const valorSalvo = localStorage.getItem("nomeSalvo");
    if (valorSalvo !== null) {
        document.getElementById("nomeHotel").innerText = valorSalvo;
    }
}
function SessaoNome(){
    const valor = document.getElementById("nome").value;
    if(!valor){
        const div = document.getElementById("alerta");

        // Atualiza o conteúdo e mostra
        div.innerHTML = `Por favor, informe o nome do Hotel`;
        div.style.display = "block";

        // Oculta depois de 3 segundos
        setTimeout(() => {
            div.style.display = "none";
    }, 3000);

        return false;
    }
    else {
        localStorage.setItem("nomeSalvo", valor);
        setTimeout(() => {
            location.href = 'pagina1.html';
    }, 100);
    }
}
function somaIndividual(e){
    let sTotal1 = JSON.parse(localStorage.getItem('sTotal1')) || [];
    novo=(soma1+soma2+soma3+soma4+soma5)
    let i = parseInt(e.id)-1;
    sTotal1[i] = novo;
    localStorage.setItem('sTotal1', JSON.stringify(sTotal1));
}
function validarRespostas() {
    const radios = document.querySelectorAll('input[type="radio"]').length;
    const totalQuestoes = radios/5;

    for (let i = 1; i <= totalQuestoes; i++) {
        const opcoes = document.getElementsByName(`q${i}`);
        let respondido = false;

        for (let opcao of opcoes) {
            if (opcao.checked) {
                respondido = true;
                break;
            }
        }

        if (!respondido) {
            const div = document.getElementById("alerta");

            // Atualiza o conteúdo e mostra
            div.innerHTML = `Por favor, responda à pergunta ${i} antes de continuar.`;
            div.style.display = "block";

            // Oculta depois de 3 segundos
            setTimeout(() => {
                div.style.display = "none";
        }, 3000);

            return false;
        }
    }

    return true;
}

function modeloCalculo(){
    let vet = document.querySelectorAll('input[type="radio"]');
    vet.forEach(function(radio) {
        if (radio.checked) {

            let q = parseInt(radio.value);
        switch (q) {
            case 1:
                soma1 += parseInt(radio.value);
                break;
            case 2:
                soma2 += parseInt(radio.value);

                break;
            case 3:
                soma3 += parseInt(radio.value);;

                break;
            case 4:
                soma4 += parseInt(radio.value);

                break;
            case 5:
                soma5 += parseInt(radio.value);

                break;
        }
        }
    });

}
