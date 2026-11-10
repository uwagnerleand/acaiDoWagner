// src/screens/ConfirmadoScreen.js 
// Quarta tela: pedido confirmado com número aleatório e tempo estimado de preparo.
// Navegue até ela a partir do ResumoPedidoScreen se quiser implementar o bônus.

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { gerarNumeroPedido, IMAGEM_BANNER } from '../utils/cardapio';
import { useState } from 'react';

export default function ConfirmadoScreen({ route, navigation }) {
  const { nome } = route.params;

  // Gera o número apenas uma vez, mesmo que o componente redesenhe
  const [numeroPedido] = useState(() => gerarNumeroPedido());
  const tempoEstimado = 5; // minutos

  return (
    <View style={styles.container}>
      <Image source={{ uri: IMAGEM_BANNER }} style={styles.imagemTopo} />
      <Text style={styles.titulo}>Pedido confirmado!</Text>
      <Text style={styles.subtitulo}>Obrigado, {nome}!</Text>

      <View style={styles.card}>
        <Text style={styles.labelNumero}>Número do seu pedido</Text>
        <Text style={styles.numero}>#{numeroPedido}</Text>
        <Text style={styles.tempo}>⏱ Tempo estimado: {tempoEstimado} minutos</Text>
      </View>

      <Text style={styles.instrucao}>
        Fique de olho no painel e aguarde seu número ser chamado.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.popToTop()}>
        <Text style={styles.textoBotao}>Fazer novo pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  imagemTopo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#CE93D8',
    marginBottom: 8,
  },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#6A1B4D', marginTop: 10 },
  subtitulo: { fontSize: 16, color: '#777', marginBottom: 28 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#CE93D8',
    marginBottom: 24,
  },
  labelNumero: { fontSize: 14, color: '#888', marginBottom: 6 },
  numero: { fontSize: 52, fontWeight: 'bold', color: '#6A1B4D' },
  tempo: { fontSize: 15, color: '#555', marginTop: 12 },

  instrucao: { fontSize: 14, color: '#777', textAlign: 'center', marginBottom: 32, lineHeight: 20 },

  botao: {
    backgroundColor: '#6A1B4D',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
  },
  textoBotao: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});