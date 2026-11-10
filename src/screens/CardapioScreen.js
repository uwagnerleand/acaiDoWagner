// src/screens/CardapioScreen.js
// Tela inicial: apresenta a açaiteria, exibe a tabela de tamanhos/preços
// e os acompanhamentos disponíveis. Equivale à TabelaScreen do app de IMC.

import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  IMAGEM_BANNER,
  TAMANHOS,
  ACOMPANHAMENTOS,
  formatarDinheiro,
  LIMITE_GRATIS,
} from '../utils/cardapio';

export default function CardapioScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho visual da açaiteria */}
      <View style={styles.banner}>
        <Image source={{ uri: IMAGEM_BANNER }} style={styles.bannerImagem} />
        <Text style={styles.nomeAcaiteria}>Açaí do Campus</Text>
        <Text style={styles.slogan}>O melhor açaí perto de você!</Text>
      </View>

      {/* Tabela de tamanhos */}
      <Text style={styles.secaoTitulo}>Tamanhos</Text>
      <View style={[styles.linhaTitulo, styles.cabecalho]}>
        <Text style={[styles.celula, styles.textoCabecalho]}>Tamanho</Text>
        <Text style={[styles.celulaDireita, styles.textoCabecalho]}>Preço</Text>
      </View>
      {TAMANHOS.map((item) => (
        <View key={item.id} style={styles.linhaTitulo}>
          <Image source={{ uri: item.imagem }} style={styles.miniatura} />
          <Text style={styles.celula}>{item.nome}</Text>
          <Text style={styles.celulaDireita}>{formatarDinheiro(item.preco)}</Text>
        </View>
      ))}

      {/* Tabela de acompanhamentos */}
      <Text style={styles.secaoTitulo}>Acompanhamentos</Text>
      <Text style={styles.aviso}>
        Primeiros {LIMITE_GRATIS} acompanhamentos inclusos no preço.{'\n'}
        A partir do 4º, R$ 2,00 cada.
      </Text>
      <View style={[styles.linhaTitulo, styles.cabecalho]}>
        <Text style={[styles.celula, styles.textoCabecalho]}>Item</Text>
        <Text style={[styles.celulaDireita, styles.textoCabecalho]}>Preço</Text>
      </View>
      {ACOMPANHAMENTOS.map((item) => (
        <View key={item.id} style={styles.linhaTitulo}>
          <Image source={{ uri: item.imagem }} style={styles.miniatura} />
          <Text style={styles.celula}>{item.nome}</Text>
          <Text style={styles.celulaDireita}>{formatarDinheiro(item.preco)}</Text>
        </View>
      ))}

      {/* Cupom de desconto informativo */}
      <View style={styles.cupomBanner}>
        <Text style={styles.cupomTexto}> Use o cupom <Text style={styles.cupomCodigo}>CALOURO</Text> e ganhe 10% de desconto!</Text>
      </View>

      {/* Botão principal */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('MontarPedido')}
      >
        <Text style={styles.textoBotao}>Montar meu açaí</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFF8F0', paddingBottom: 40 },

  /* banner */
  banner: {
    alignItems: 'center',
    backgroundColor: '#6A1B4D',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  bannerImagem: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#E1BEE7',
    marginBottom: 6,
  },
  nomeAcaiteria: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  slogan: { fontSize: 14, color: '#E1BEE7', marginTop: 4 },

  /* tabelas */
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B4D',
    marginBottom: 10,
    marginTop: 8,
  },
  cabecalho: { backgroundColor: '#6A1B4D' },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 6,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#CE93D8',
  },
  miniatura: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F3E5F5',
  },
  celula: { flex: 1, fontSize: 15, color: '#333' },
  celulaDireita: { fontSize: 15, fontWeight: '600', color: '#333', textAlign: 'right' },
  textoCabecalho: { color: '#fff', fontWeight: 'bold' },

  /* aviso */
  aviso: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
    marginBottom: 10,
    lineHeight: 20,
  },

  /* cupom */
  cupomBanner: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CE93D8',
  },
  cupomTexto: { fontSize: 14, color: '#6A1B4D', textAlign: 'center' },
  cupomCodigo: { fontWeight: 'bold', letterSpacing: 1 },

  /* botão */
  botao: {
    backgroundColor: '#6A1B4D',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});