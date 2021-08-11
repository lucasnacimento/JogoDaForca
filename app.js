
let tentativas;

let textCategory = document.getElementById("categoria");

let textPalavra = document.getElementById("palavra");

let textErradas = document.getElementById("erradas");

let img = document.getElementById("boneco");

let desenho;

let faixa = document.getElementById("faixaOpacity");

let letrasErradas = [];

let index;

let palavraAtual = '';

const categorys = {
    Frutas: ['abacaxi','abacate','acai', 'acerola', 'banana', 'caja','carambola', 'cereja','coco','cupuacu','goiaba','jabuticaba','kiwi','laranja', 'limao','mamao','manga','maracuja', 'melancia','morango', 'pessego', 'siriguela','tangerina', 'uva'],
    Cores: ['azul','amarelo','branco','laranja','roxo','verde','vermelho','bege','cinza','dourado','marrom','preto','rosa','roxo','salmao'],
    Países: ['africa do sul','angola','argentina','austria','australia','belgica','brasil','bolivia','bulgaria','catar','canada','chile','cingapura','colombia','congo','costa rica','croacia','cuba','dinamarca','escocia','equador','espanha','estados unidos','finlandia', 'grecia','honduras','hungria','iraque','italia','inglaterra','marrocos','mexico','montenegro','noruega','nigeria','peru','polonia','portugal','russia','romenia','suica','suecia','tunisia','ucrania','uruguai','venezuela','vietnam'],
    Animais: ['cachorro','abelha','dragao de komodo','foca','hipopotamo','baleia','elefante','golfinho','arara','gato','rato','macaco','tatu','tigre','leao','camelo','cavalo','vaca','tucano','gorila','pantera','vespa','urso','coala','cobra','caracol','peixe','tartaruga','porco','tubarao','zebra','cervo','pato','galinha','coruja','pinguim','morcego','esquilo','Girrafa','coelho','lagarto','capivara','sapo','borboleta','panda', 'leopardo','cabra','Bufalo','mula','burro'],
    Bebidas: ['cerveja','vinho','vodka','champanhe','tequila','whisky','agua','conhaque','gim','licor','rum','energetico','coca cola','agua de coco','pinga','drink','cidra','Suco','isotonico'],
    Times: ['america mineiro','atletico paranaense','ceara','bahia','chapecoense', 'corinthians','flamengo','internacional','juventude','gremio','fortaleza','fluminense','palmeiras','bragantino','santos','sao paulo','sport','botafogo','vasco','cruzeiro','vitoria','csa','abc','criciuma','nautico','coritiba','guarani','ponte preta','crb','avai','paysandu','santa cruz'],
    Capitais: ['la paz','quito','bogota','nairobi','berlim','buenos aires','viena','bruxelas','brasilia','doha','santiago','pequim','zagrebe','havana','madrid','paris','atenas','budapeste','dublim','jerusalem','roma','toquio','luxemburgo','oslo','lisboa','londres','moscovo','bucareste','estocolmo','montevideu','caracas'],
    Nomes: ['miguel','arthur','davi','gabriel','maria','eduarda','alice','heitor','pedro','lucas','manuel','socorro','karla','caio','david','henrique','samuel','alberto','marina','mariana','amanda','isabel','isabela','eliana','cristina','joyce','bruno','breno','sergio','igor','tulio','leonardo','caique','rafaela','hugo','fabio','wiliam','wesley','francisco','danilo','alan','amauri','carlos','lucio','lais','larissa','jussara','rute','joao','jose','fernanda','vitoria','vitor','paulo','ronaldo','felipe','ingrid','sara','suelen','cassandra']
}

function newGame() {
    resetPropries();//reseta os atributos para default
    getIndexCategory();//sorteia um indice para o vetor de categoria
    exibeCategory();//insere a categoria no innerHTML
    getWord();//gera uma palavra
    ocultWord();//oculta a palavra gerada
    exibePalavra();//insere a palavra no innerHTML
    window.addEventListener("keypress", capturarLetra);//adiciona evento de teclado
}

function getVetorCategorys(){
    return Object.keys(categorys);
}
//sorteia um novo indice do array
function getIndexCategory(){
    index = Number(Math.random() * (getVetorCategorys().length-1)).toFixed(0);
    return index;
}

function getCategory(){ 
    return getVetorCategorys()[index];
}

function exibeCategory(){
    textCategory.innerHTML = getCategory();
}

//sorteia e retorna uma palavra aleatoria a partir da categoria atual
function getWord(){
    const vetorValues = categorys[textCategory.innerHTML];
    let i = Number(Math.random() * (vetorValues.length-1)).toFixed(0);
    palavraAtual = vetorValues[i];
    console.log(palavraAtual);
}

//ocultar palavra
function ocultWord(){
    let palavraOculta = '';
    for(let i = 0; i < palavraAtual.length; i++){
        if(palavraAtual[i] !== ' '){
            palavraOculta+='-';
        }else{
            palavraOculta+=' ';
        }
    }
    return palavraOculta;
}

function exibePalavra(){
    textPalavra.innerHTML = ocultWord();
}

//captura evento do teclado, ou seja a letra digitada
function capturarLetra(e){
    tentarLetra(e.key);
}

function tentarLetra(letra){
    if(palavraAtual.includes(letra)){
        atualizarPalavra(letra);
    }else{
        --tentativas;
        letrasErradas.push(letra);
        textErradas.innerHTML += letra+',';
        desenharBoneco();
    }
    isGameOver();
}

function atualizarPalavra(letra){
    let palavraApoio = '';
    for(let i = 0; i < palavraAtual.length; i++){
        if(palavraAtual[i] === letra){
            palavraApoio+=letra;
        }else if(textPalavra.innerHTML[i] !== '-'){
            palavraApoio+=textPalavra.innerHTML[i];
        }else{
            palavraApoio+='-';
        }
    }
    console.log(palavraApoio);
    textPalavra.innerHTML = palavraApoio;
}

function isGameOver(){
    if(tentativas == 0){
        textErradas.innerHTML = "VOCÊ PERDEU ! ! ! 😭";
        faixa.style.backgroundColor = "Red";
        faixa.style.opacity = 1;
        window.removeEventListener("keypress", capturarLetra);
    }else if(tentativas > 0 && !textPalavra.innerHTML.includes("-")){
        textErradas.innerHTML = "VOCÊ VENCEU ! ! ! 🏆";
        faixa.style.backgroundColor = "Green";
        faixa.style.opacity = 1;
        window.removeEventListener("keypress", capturarLetra);
    }
}

function resetPropries(){
    faixa.style.backgroundColor = "White";
    faixa.style.opacity = 0.4;
    faixa.style.marginTop = "-480px";
    faixa.style.height = "450px";
    tentativas = 7;
    img.setAttribute('src','');
    textErradas.innerHTML = "Pressione alguma tecla <br> Letras erradas: ";
}

function desenharBoneco(){
    if(tentativas == 6){
        img.setAttribute('src','imagens/cabeca.png');
    }else if(tentativas == 5){
        img.setAttribute('src','imagens/tronco.png');
    }else if(tentativas == 4){
        img.setAttribute('src','imagens/bracodireito.png');
    }else if(tentativas == 3){
        img.setAttribute('src','imagens/bracodireitoEesquerdo.png');
    }else if(tentativas == 2){
        img.setAttribute('src','imagens/pernadireita.png');
    }else if(tentativas == 1){
        img.setAttribute('src','imagens/completoOficial.png');
    }else{
        img.setAttribute('src','imagens/morto.png');
    }
}