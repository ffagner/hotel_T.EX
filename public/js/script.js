/*********************
 ** ID dos Elementos **
 *********************/

/* Elementos do Modal */
const modal__overlay = document.getElementById("modal__overlay");
const box__detalhes = document.getElementById("box__detalhes");
const btn_fechar = document.getElementById("fechar");

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

/* Botões */
const radio_button = document.querySelectorAll('input[name="reservar-quarto"]');
const adicionar_servicos = document.getElementById("adicionar_servicos");
const btn_confirmar = document.getElementById("confirmar");

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

// Abrir Modal
function mostrarModal() {
  modal__overlay.classList.remove("hidden");
  box__detalhes.classList.remove("hidden");
}

// Fechar Modal
function fecharModal() {
  modal__overlay.classList.add("hidden");
  box__detalhes.classList.add("hidden");
}

// Formatar Data
function formatarData(data) {
  const hoje = new Date();
  const data_recebida = new Date(data);

  const ano = data_recebida.getFullYear();
  const mes = String(data_recebida.getMonth() + 1).padStart(2, "0");
  const dia = String(data_recebida.getDate()).padStart(2, "0");

  return [dia, mes, ano].join("-");
}

// Adicionar Mensagem de Erro
function mostrarMensagemErro(msg) {
  msg_erro.classList.remove("hidden");
  msg_erro.classList.add("msg-erro");
  msg_erro.innerText = msg;
}

// Remover Mensagem de Erro
function removerMensagemErro() {
  msg_erro.classList.remove("msg-erro");
  msg_erro.classList.add("hidden");
}

// function obterdados() {
//   const reserva = {};
//   let acomodacao;
//   let status = true;

//   // validar checkin
//   if (check_in.value === "") {
//     mostrarMensagemErro("Selecione a data de entrada");
//     check_in.focus();
//     return;
//     status = false;
//   }

//   // validar checkout
//   if (check_out.value === "") {
//     mostrarMensagemErro("Selecione a data de saída");
//     check_out.focus();
//     status = false;
//     return;
//   }

//   // validar checkout
//   if (adultos.value === "") {
//     mostrarMensagemErro("Selecione o número de adultos");
//     adultos.focus();
//     status = false;
//     return;
//   }

//   for (let radio of radio_button) {
//     if (!radio.checked) {
//       mostrarMensagemErro("nenhum quarto selecionado!");
//       console.log("Oi");
//       status = false;
//       break;
//     }
//   }

//   if (status) {
//     console.log("Dados enviados com sucesso");
//   } else {
//     console.log("Erro");
//   }

//   //acomodacao = acomodacoes.find((item) => item.id === i + 1);

//   // reserva.check_in = formatarData(check_in.value);
//   // reserva.check_out = formatarData(check_out.value);
//   // reserva.adultos = formatarData(adultos.value);
//   // reserva.imagem = acomodacao.image;
//   // reserva.titulo = acomodacao.titulo;
//   // reserva.texto = acomodacao.texto;
//   // reserva.preco = acomodacao.preco;
// }

let anterior = 0;
radio_button.forEach((n, i) => {
  n.onclick = function (e) {
    if (n.checked) {
      document
        .querySelector(`.quarto-box:nth-of-type(${i + 1})`)
        .classList.add(`quarto-selecionado`);
    }
    document
      .querySelector(`.quarto-box:nth-of-type(${anterior + 1})`)
      .classList.remove(`quarto-selecionado`);
    anterior = i;
  };
});

// acomodacao = acomodacoes.find((item) => item.id === i + 1);

/**********************
 * Atribuindo Eventos *
 **********************/

adicionar_servicos.addEventListener("click", mostrarModal);
btn_fechar.addEventListener("click", fecharModal);
modal__overlay.addEventListener("click", fecharModal);

btn_confirmar.addEventListener("click", () => {
  obterdados();
});
