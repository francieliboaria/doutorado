let ultimoValorSelecionado = {};
var soma1=0;soma2=0,soma3=0,soma4=0,soma5=0;
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
    img.innerHTML="<img src='img/"+n+".png'>";

    div.innerHTML=rel;
}
function somaIndividual(e){
    let sTotal1 = JSON.parse(localStorage.getItem('sTotal1')) || [];
    novo=(soma1+soma2+soma3+soma4+soma5)
    let i = parseInt(e.id);
    sTotal1[i] = novo;
    localStorage.setItem('sTotal1', JSON.stringify(sTotal1));
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