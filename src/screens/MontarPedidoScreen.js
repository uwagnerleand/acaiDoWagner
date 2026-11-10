// src/screens/MontarPedidoScreen.js
// Tela de montagem do pedido: nome do cliente, tamanho, acompanhamentos e cupom.
// Equivale à HomeScreen do app de IMC.

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {
  TAMANHOS,
  ACOMPANHAMENTOS,
  calcularTotal,
  formatarDinheiro,
  LIMITE_GRATIS,
} from '../utils/cardapio';

export default function MontarPedidoScreen({ navigation }) {
  const [nome, setNome]           = useState('');
  const [tamanho, setTamanho]     = useState(null);   // objeto de TAMANHOS
  const [extras, setExtras]       = useState([]);     // array de ids
  const [cupom, setCupom]         = useState('');
  const [erro, setErro]           = useState('');

  /* Alterna um acompanhamento: adiciona se não estava, remove se já estava */
  function alternarExtra(id) {
    if (extras.includes(id)) {
      setExtras(extras.filter((item) => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  }

  function handleFinalizar() {
    if (!nome.trim()) {
      setErro('Informe seu nome para continuar.');
      return;
    }
    if (!tamanho) {
      setErro('Escolha um tamanho para o açaí.');
      return;
    }
    setErro('');

    const { subtotal, desconto, total } = calcularTotal(tamanho, extras, cupom);

    navigation.navigate('ResumoPedido', {
      nome: nome.trim(),
      tamanho,
      extras,
      cupom: cupom.toUpperCase(),
      subtotal,
      desconto,
      total,
    });
  }

  const { total } = calcularTotal(tamanho, extras, cupom);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Nome do cliente */}
      <Text style={styles.label}>Seu nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: João"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      {/* Escolha do tamanho */}
      <Text style={styles.label}>Tamanho</Text>
      <View style={styles.opcoes}>
        {TAMANHOS.map((item) => {
          const selecionado = tamanho?.id === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, selecionado && styles.chipSelecionado]}
              onPress={() => setTamanho(item)}
            >
              <Image source={{ uri: item.imagem }} style={styles.chipImagem} />
              <Text style={[styles.chipTexto, selecionado && styles.chipTextoSelecionado]}>
                {item.nome}{'\n'}
                <Text style={styles.chipPreco}>{formatarDinheiro(item.preco)}</Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Acompanhamentos */}
      <Text style={styles.label}>
        Acompanhamentos{' '}
        <Text style={styles.labelSub}>
          ({extras.length} escolhido{extras.length !== 1 ? 's' : ''} — {LIMITE_GRATIS} grátis)
        </Text>
      </Text>
      <View style={styles.opcoes}>
        {ACOMPANHAMENTOS.map((item) => {
          const selecionado = extras.includes(item.id);
          // Cobrado a partir do (LIMITE_GRATIS + 1)º item
          const posicao = extras.indexOf(item.id);
          const cobrado = selecionado && posicao >= LIMITE_GRATIS;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.chip, selecionado && styles.chipSelecionado]}
              onPress={() => alternarExtra(item.id)}
            >
              <Image source={{ uri: item.imagem }} style={styles.chipImagem} />
              <Text style={[styles.chipTexto, selecionado && styles.chipTextoSelecionado]}>
                {item.nome}
                {cobrado ? '\n+R$ 2,00' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Cupom */}
      <Text style={styles.label}>Cupom de desconto (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: CALOURO"
        value={cupom}
        onChangeText={setCupom}
        autoCapitalize="characters"
      />

      {/* Total parcial */}
      {tamanho && (
        <View style={styles.totalBox}>
          <Text style={styles.totalTexto}>
            Total estimado: <Text style={styles.totalValor}>{formatarDinheiro(total)}</Text>
          </Text>
        </View>
      )}

      {/* Erro */}
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {/* Botão finalizar */}
      <TouchableOpacity style={styles.botao} onPress={handleFinalizar}>
        <Text style={styles.textoBotao}>Finalizar pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, backgroundColor: '#FFF8F0', paddingBottom: 48 },

  label: { fontSize: 16, fontWeight: '700', color: '#4A0D35', marginBottom: 8, marginTop: 16 },
  labelSub: { fontSize: 13, fontWeight: '400', color: '#888' },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CE93D8',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  /* chips (tamanhos e acompanhamentos) */
  opcoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1.5,
    borderColor: '#CE93D8',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    minWidth: 104,
    alignItems: 'center',
  },
  chipImagem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 6,
    backgroundColor: '#F3E5F5',
  },
  chipSelecionado: { backgroundColor: '#6A1B4D', borderColor: '#6A1B4D' },
  chipTexto: { fontSize: 14, color: '#6A1B4D', textAlign: 'center' },
  chipTextoSelecionado: { color: '#fff' },
  chipPreco: { fontSize: 12, fontWeight: '600' },

  /* total */
  totalBox: {
    marginTop: 20,
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  totalTexto: { fontSize: 16, color: '#4A0D35' },
  totalValor: { fontWeight: 'bold', fontSize: 20 },

  /* erro */
  erro: { color: '#C62828', textAlign: 'center', marginTop: 12, fontSize: 14 },

  /* botão */
  botao: {
    backgroundColor: '#6A1B4D',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});