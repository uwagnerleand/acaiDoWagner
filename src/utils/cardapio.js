// src/utils/cardapio.js
// Centraliza os dados do cardápio. As telas importam daqui.

export const IMAGEM_BANNER =
  'https://img.criativodahora.com.br/homologacao/thumbs/2025/07/18/01981f4f-421a-7004-adb1-b4dfa20999d7.jpg';

export const TAMANHOS = [
  {
    id: 'p',
    nome: 'Açaí 300 ml',
    preco: 12.0,
    imagem: 'https://img.criativodahora.com.br/homologacao/thumbs/2025/07/18/01981f4f-421a-7004-adb1-b4dfa20999d7.jpg',
  },
  {
    id: 'm',
    nome: 'Açaí 500 ml',
    preco: 16.0,
    imagem: 'https://img.criativodahora.com.br/homologacao/thumbs/2025/07/18/01981f4f-421a-7004-adb1-b4dfa20999d7.jpg',
  },
  {
    id: 'g',
    nome: 'Açaí 700 ml',
    preco: 20.0,
    imagem: 'https://img.criativodahora.com.br/homologacao/thumbs/2025/07/18/01981f4f-421a-7004-adb1-b4dfa20999d7.jpg',
  },
];

export const ACOMPANHAMENTOS = [
  {
    id: 'granola',
    nome: 'Granola',
    preco: 2.0,
    imagem: 'https://media.istockphoto.com/id/911929074/photo/homemade-granola-texture.jpg?s=612x612&w=0&k=20&c=luDEju3NjW2Ciyz145cVdlRVWNq1QeNXodOjiihHk_k=',
  },
  {
    id: 'banana',
    nome: 'Banana',
    preco: 2.0,
    imagem: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'morango',
    nome: 'Morango',
    preco: 2.0,
    imagem: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'pacoca',
    nome: 'Paçoca',
    preco: 2.0,
    imagem: 'https://media.istockphoto.com/id/1382305704/photo/peanut-and-powder.jpg?s=612x612&w=0&k=20&c=1kH_Pb14bwC2sVFyK1EZrVQH_oruZyuYQ0pFyjKszC4=',
  },
  {
    id: 'leite_po',
    nome: 'Leite em Pó',
    preco: 2.0,
    imagem: 'https://media.istockphoto.com/id/1131111463/photo/wooden-spoon-filled-with-milk-powder.jpg?s=612x612&w=0&k=20&c=gBA_EMOHmxHf7e4v_OJ3My_zfV2XQznUW3YY_fokTCw=',
  },
  {
    id: 'leite_cond',
    nome: 'Leite Condensado',
    preco: 2.0,
    imagem: 'https://media.istockphoto.com/id/1917705758/pt/foto/fresh-condensed-milk-in-the-bowl.jpg?s=612x612&w=0&k=20&c=bWR-60ZOAMpta-nxGhe4RQtg7oG4v2oigoIfACU3gqk=',
  },
];

// Limite de acompanhamentos inclusos no preço base.
// A partir do 4º, cobrar preço normal de cada um (bônus).
export const LIMITE_GRATIS = 3;

// Código de cupom de desconto (bônus).
export const CUPONS = {
  CALOURO: 0.10, // 10% de desconto
};

/**
 * Calcula o total do pedido.
 * @param {object} tamanho  - Item de TAMANHOS escolhido
 * @param {string[]} extras - Array de ids de ACOMPANHAMENTOS escolhidos
 * @param {string} cupom    - Código de cupom (pode ser vazio)
 * @returns {{ subtotal, desconto, total }}
 */
export function calcularTotal(tamanho, extras, cupom = '') {
  if (!tamanho) return { subtotal: 0, desconto: 0, total: 0 };

  // Acompanhamentos grátis até LIMITE_GRATIS; os excedentes são cobrados
  const extrasGratis = extras.slice(0, LIMITE_GRATIS);
  const extrasCobrados = extras.slice(LIMITE_GRATIS);

  const valorExtras = extrasCobrados.reduce((acc, id) => {
    const item = ACOMPANHAMENTOS.find((a) => a.id === id);
    return acc + (item ? item.preco : 0);
  }, 0);

  const subtotal = tamanho.preco + valorExtras;

  const taxaCupom = CUPONS[cupom.toUpperCase()] ?? 0;
  const desconto = subtotal * taxaCupom;
  const total = subtotal - desconto;

  return { subtotal, desconto, total };
}

/** Formata número como moeda brasileira: 16 → "R$ 16,00" */
export function formatarDinheiro(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

/** Gera número de pedido aleatório entre 100 e 999 (bônus) */
export function gerarNumeroPedido() {
  return Math.floor(Math.random() * 900) + 100;
}