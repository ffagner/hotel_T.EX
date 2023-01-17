/*
 * Quais são os impasses (faltando):
 *
 * 1) O primeiro quarto não marca (borda), preciso clicar no 2° ou 3° para o bon vivant resolver funcionar
 * 2) No carregamento dos dados o quarto não vem marcado *** cansei de pensar :)
 *
 *
 * Feito:
 *
 * 1) Modais (HTML + CSS)
 * 2) Captura de dados
 *    * Pequeno tratamento nas datas, datas iguais não passam porque precisa de pelo menos 1 noite
 * 3) Troca de botões caso tenha dados
 * 4) Carregamento dos dados
 */

/*********************
 ** ID dos Elementos **
 *********************/

/* Geral */
let quartoSelecionado = 0;

/* Elementos do Modal */
const modal__overlay = document.getElementById("modal__overlay");
const box__detalhes = document.getElementById("modal__detalhes");
const box__servicos = document.getElementById("modal__servicos");
const btn_fechar_detalhes = document.getElementById("fechar__detalhes");
const btn_fechar_servicos = document.getElementById("fechar__servicos");

/* Mensagem Erro */
const msg_erro = document.getElementById("msg-erro");

/* Elementos do Formulario  */
const check_in = document.getElementById("check-in");
const check_out = document.getElementById("check-out");
const adultos = document.getElementById("adultos");

/* Elementos do Painel das Reservas  */
const acomodacao = document.getElementById("acomodacao");
const n_adultos = document.getElementById("n_adultos");
const d_check_in = document.getElementById("d_check_in");
const d_check_out = document.getElementById("d_check_out");
const total_reserva = document.getElementById("total_reserva");

/* Elementos do Painel de Detalhes  */
const vApartamento = document.getElementById("vApartamento");
const vDiaria = document.getElementById("vPreco");
const vCheckin = document.getElementById("vCheckin");
const vCheckout = document.getElementById("vCheckout");
const vAdultos = document.getElementById("vAdultos");
const vNoites = document.getElementById("vNoites");
const vServicos = document.getElementById("vServicos");
const vTotal = document.getElementById("vTotal");

/* Elementos do Painel de Serviços  */
const checkbox_buttons = document.querySelectorAll("input[type=checkbox]");

/* Botões */
const radio_button = document.querySelectorAll('input[name="reservar-quarto"]');
const btn_servicos = document.getElementById("btn_servicos");
const btn_add_servicos = document.getElementById("btn_add_servicos");
const btn_detalhes = document.getElementById("btn_detalhes");
const btn_f_detalhes = document.getElementById("btn_f_detalhes");
const btn_confirmar = document.getElementById("btn_confirmar");

/**********************
 ** Dados Acomodações **
 **********************/
const acomodacoes = [
  {
    id: 1,
    image: "./../images/card5.png",
    titulo: "Quarto Executivo",
    texto:
      "Um quarto espaçoso com cama king-size ou duas camas de solteiro, vista para a cidade, TV de tela plana, mini-bar e banheiro privativo.",
    preco: 500,
  },
  {
    id: 2,
    image: "./../images/card4.png",
    titulo: "Quarto Deluxe",
    texto:
      "Um quarto espaçoso com cama king-size ou duas camas de solteiro, vista para a cidade, TV de tela plana, mini-bar, escrivaninha e banheiro privativo.",
    preco: 500,
  },
  {
    id: 3,
    image: "./../images/card6.png",
    titulo: "Quarto Família",
    texto:
      "Um quarto espaçoso com duas camas de casal e duas camas de solteiro, vista para a cidade, TV de tela plana, mini-bar, área de estar separada e banheiro privativo.",
    preco: 500,
  },
];

/**********************
 ****** Funções *******
 **********************/

// Abrir Modal Detalhes
function mostrarModalDetalhes() {
  modal__overlay.classList.remove("hidden");
  box__detalhes.classList.remove("hidden");
}

// Abrir Modal Serviços
function mostrarModalServicos() {
  modal__overlay.classList.remove("hidden");
  box__servicos.classList.remove("hidden");
}

// Fechar Modal
function fecharModal() {
  modal__overlay.classList.add("hidden");
  box__detalhes.classList.add("hidden");
  box__servicos.classList.add("hidden");
}

// Formatar Data BR
function formatarData(data) {
  const hoje = new Date();
  const data_recebida = new Date(data);

  const ano = data_recebida.getFullYear();
  const mes = String(data_recebida.getMonth() + 1).padStart(2, "0");
  const dia = String(data_recebida.getDate()).padStart(2, "0");

  return [dia, mes, ano].join("-");
}

// Formatar Data US
// Para validar os campos de data do formulário
function formatarDataUS(data) {
  if (data) {
    const separar = data.split("-");
    const dataCompleta = `${separar[2]}/${separar[1]}/${separar[0]}`;
    const data_recebida = new Date(dataCompleta);

    const ano = data_recebida.getFullYear();
    const mes = String(data_recebida.getMonth() + 1).padStart(2, "0");
    const dia = String(data_recebida.getDate()).padStart(2, "0");

    return [ano, mes, dia].join("-");
  }
}

// Primeira letra maiúscula
function primeiraLetraMaiuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Obter Serviços Selecionados (Modal)
function obterServicos() {
  let servicos = [];
  checkbox_buttons.forEach((item, i) => {
    if (item.checked) {
      const nome = item.name;
      const preco = item.value;
      servicos = [...servicos, { nome, preco }];
    }
  });
  return servicos;
}

// Salvar LocalStorage
function salvarLocalStorage(nome, dados) {
  localStorage.setItem(nome, JSON.stringify(dados));
}

// Recuperar LocalStorage
function recuperarLocalStorage(nome) {
  const dados = localStorage.getItem(nome)
    ? JSON.parse(localStorage.getItem(nome))
    : null;
  return dados;
}

// Validar valor padrão quando vazio (undefined)
function validarValor(valor) {
  return valor ? valor : "";
}

// Selecionar quarto (Efeito Borda)
function selecionarQuarto() {
  let anterior = 0;
  radio_button.forEach((n, i) => {
    n.onclick = function () {
      if (n.checked) {
        document
          .querySelector(
            `.todos-os-quartos-reserva .quarto-reserva:nth-of-type(${i + 1})`
          )
          .classList.add(`quarto-selecionado`);
        quartoSelecionado = i + 1;
        n.setAttribute("checked", "checked");
      }
      document
        .querySelector(
          `.todos-os-quartos-reserva .quarto-reserva:nth-of-type(${
            anterior + 1
          })`
        )
        .classList.remove(`quarto-selecionado`);
      anterior = i;
      n.removeAttribute("checked", "checked");
    };
  });
}

// Obter dados (validar)
function obterdados() {
  let acomodacao;

  // validar checkin
  if (check_in.value === "") {
    alert("Selecione a data de entrada");
    check_in.focus();
    return;
  }

  // validar checkout
  if (
    check_out.value === "" ||
    new Date(check_out.value).getDate() - new Date(check_in.value).getDate() < 1
  ) {
    alert("Selecione a data de saída");
    check_out.focus();
    return;
  }

  // validar adulto
  if (adultos.value === "") {
    alert("Selecione o número de adultos");
    adultos.focus();
    return;
  }

  // validar quarto
  if (quartoSelecionado === 0) {
    alert("Selecione o quarto");
    adultos.focus();
    return;
  }

  // obter acomodacao
  acomodacao = acomodacoes.find((item) => item.id === quartoSelecionado);

  // obter servicos
  const servicos = obterServicos();

  // Criar objeto reserva
  const reserva = {
    check_in: formatarData(check_in.value),
    check_out: formatarData(check_out.value),
    adultos: adultos.value,
    noites:
      new Date(check_out.value).getDate() - new Date(check_in.value).getDate(),
    imagem: acomodacao.image,
    titulo: acomodacao.titulo,
    texto: acomodacao.texto,
    preco: acomodacao.preco,
    servicos: servicos,
  };

  alert("Reserva realizada com sucesso!");
  return reserva;
}

// Carregar Dados (localstorage)
function carregarDados() {
  const dados = recuperarLocalStorage("reserva");
  let total_servicos = 0;
  let total = 0;

  if (dados !== null) {
    btn_confirmar.classList.add("hidden");
    btn_detalhes.classList.remove("hidden");

    // Formulario
    check_in.value = validarValor(formatarDataUS(dados.check_in));
    check_out.value = validarValor(formatarDataUS(dados.check_out));
    adultos.value = validarValor(dados.adultos);

    // Painel
    acomodacao.innerText = validarValor(dados.titulo);
    n_adultos.innerText = validarValor(dados.adultos);
    d_check_in.innerText = validarValor(dados.check_in);
    d_check_out.innerText = validarValor(dados.check_out);

    checkbox_buttons.forEach((item) => {
      dados.servicos.forEach((selecionado, i) => {
        if (item.name === selecionado.nome) {
          item.setAttribute("checked", "checked");
          total_servicos += Number(selecionado.preco);
        }
      });
    });

    // Carregar botão radio (faltando)
    radio_button.forEach((item, i) => {
      if (item.checked) {
        item.setAttribute("checked", "checked");
      }
    });

    total = `R$ ${(dados.noites * dados.preco + total_servicos).toFixed(2)}`;
    total_reserva.innerText = validarValor(total);

    // Detalhes
    vApartamento.innerText = validarValor(dados.titulo);
    vDiaria.innerText = "R$ " + validarValor(Number(dados.preco).toFixed(2));
    vCheckin.innerText = validarValor(dados.check_in);
    vCheckout.innerText = validarValor(dados.check_out);
    vAdultos.innerText = validarValor(dados.adultos);
    vNoites.innerText = validarValor(dados.noites);

    dados.servicos.forEach((item) => {
      vServicos.innerText += `✅ ${primeiraLetraMaiuscula(
        item.nome
      )}: R$ ${Number(item.preco).toFixed(2)} `;
    });

    vTotal.innerText = validarValor(total);
  } else {
    btn_confirmar.classList.remove("hidden");
    btn_detalhes.classList.add("hidden");
  }
}

/**********************
 * Atribuindo Eventos *
 **********************/

btn_servicos.addEventListener("click", mostrarModalServicos);
btn_detalhes.addEventListener("click", mostrarModalDetalhes);
btn_fechar_detalhes.addEventListener("click", fecharModal);
btn_fechar_servicos.addEventListener("click", fecharModal);
btn_add_servicos.addEventListener("click", fecharModal);
btn_f_detalhes.addEventListener("click", fecharModal);

/**********************
 ** Chamando Funções **
 **********************/
selecionarQuarto();
carregarDados();

btn_confirmar.addEventListener("click", () => {
  const dados = obterdados();
  salvarLocalStorage("reserva", dados);
  carregarDados();
});
