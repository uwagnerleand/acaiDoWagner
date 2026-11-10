// src/screens/ResumoPedidoScreen.js
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ACOMPANHAMENTOS, formatarDinheiro } from '../utils/cardapio';

export default function ResumoPedidoScreen({ route, navigation }) {
  const { nome, tamanho, extras, cupom, subtotal, desconto, total } = route.params;

  const itensExtras = extras.map(
    (id) => ACOMPANHAMENTOS.find((a) => a.id === id) ?? { id, nome: id }
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── TOPO ── */}
      <View style={styles.topo}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={42} color="#fff" />
        </View>
        <Text style={styles.titulo}>Pedido montado!</Text>
        <Text style={styles.subtitulo}>Olá, {nome} 👋</Text>
      </View>

      {/* ── CARD RESUMO ── */}
      <View style={styles.card}>

        {/* tamanho */}
        <View style={styles.cardSecao}>
          <Ionicons name="water" size={18} color="#7C3AED" style={{ marginRight: 8 }} />
          <Text style={styles.cardSecaoTitulo}>Tamanho</Text>
        </View>
        <View style={styles.itemComImagem}>
          {tamanho.imagem && (
            <Image source={{ uri: tamanho.imagem }} style={styles.resumoImagem} />
          )}
          <Text style={styles.cardValor}>{tamanho.nome}</Text>
        </View>

        <View style={styles.divider} />

        {/* acompanhamentos */}
        <View style={styles.cardSecao}>
          <MaterialCommunityIcons name="bowl-mix-outline" size={18} color="#7C3AED" style={{ marginRight: 8 }} />
          <Text style={styles.cardSecaoTitulo}>Acompanhamentos</Text>
        </View>
        {itensExtras.length > 0 ? (
          itensExtras.map((item, i) => (
            <View key={i} style={styles.extraRow}>
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.extraImagem} />
              ) : (
                <Ionicons name="ellipse" size={6} color="#A78BFA" style={{ marginRight: 8, marginTop: 2 }} />
              )}
              <Text style={styles.extraNome}>{item.nome}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.semItem}>Sem acompanhamentos</Text>
        )}

        {/* cupom + valores */}
        <View style={styles.divider} />

        <View style={styles.valorRow}>
          <Text style={styles.valorLabel}>Subtotal</Text>
          <Text style={styles.valorTexto}>{formatarDinheiro(subtotal)}</Text>
        </View>

        {desconto > 0 && (
          <View style={styles.valorRow}>
            <View style={styles.cupomTag}>
              <Ionicons name="pricetag" size={12} color="#D946EF" />
              <Text style={styles.cupomCodigo}> {cupom}</Text>
            </View>
            <Text style={styles.descontoTexto}>− {formatarDinheiro(desconto)}</Text>
          </View>
        )}

        <View style={[styles.divider, { marginBottom: 14 }]} />

        <View style={styles.valorRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValor}>{formatarDinheiro(total)}</Text>
        </View>
      </View>

      {/* ── INSTRUÇÃO ── */}
      <View style={styles.instrucaoBox}>
        <Ionicons name="information-circle-outline" size={18} color="#7C3AED" style={{ marginRight: 8 }} />
        <Text style={styles.instrucaoTexto}>
          Vá até o balcão, informe seu nome e pague por lá. 🍇
        </Text>
      </View>

      {/* ── BOTÕES ── */}
      <TouchableOpacity style={styles.botao} onPress={() => navigation.popToTop()} activeOpacity={0.85}>
        <Ionicons name="refresh" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.botaoTexto}>Novo pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSec} onPress={() => navigation.navigate('Cardapio')} activeOpacity={0.8}>
        <Ionicons name="list" size={18} color="#7C3AED" style={{ marginRight: 6 }} />
        <Text style={styles.botaoSecTexto}>Ver cardápio</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F9F5FF', padding: 24, paddingBottom: 48 },

  /* topo */
  topo: { alignItems: 'center', marginBottom: 28 },
  checkCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...Platform.select({
      ios:     { shadowColor: '#7C3AED', shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 8 },
    }),
  },
  titulo: { fontSize: 26, fontWeight: '800', color: '#1A0A2E', letterSpacing: -0.5 },
  subtitulo: { fontSize: 15, color: '#6B7280', marginTop: 4 },

  /* card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    ...Platform.select({
      ios:     { shadowColor: '#7C3AED', shadowOpacity: 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 4 },
    }),
  },
  cardSecao: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardSecaoTitulo: { fontSize: 13, fontWeight: '700', color: '#7C3AED', textTransform: 'uppercase', letterSpacing: 0.8 },
  itemComImagem: { flexDirection: 'row', alignItems: 'center', paddingLeft: 26, marginBottom: 4 },
  resumoImagem: { width: 44, height: 44, borderRadius: 10, marginRight: 12, backgroundColor: '#EDE9FE' },
  cardValor: { fontSize: 16, color: '#1F1535', fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#EDE9FE', marginVertical: 16 },
  extraRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 26, marginBottom: 8 },
  extraImagem: { width: 32, height: 32, borderRadius: 16, marginRight: 10, backgroundColor: '#EDE9FE' },
  extraNome: { fontSize: 15, color: '#374151' },
  semItem: { fontSize: 14, color: '#9CA3AF', paddingLeft: 26 },

  /* valores */
  valorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  valorLabel: { fontSize: 14, color: '#6B7280' },
  valorTexto: { fontSize: 15, color: '#1F1535', fontWeight: '600' },
  cupomTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF4FF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  cupomCodigo: { fontSize: 12, fontWeight: '700', color: '#D946EF' },
  descontoTexto: { fontSize: 15, fontWeight: '700', color: '#16A34A' },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1A0A2E' },
  totalValor: { fontSize: 26, fontWeight: '800', color: '#7C3AED' },

  /* instrução */
  instrucaoBox: {
    flexDirection: 'row',
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  instrucaoTexto: { fontSize: 14, color: '#4C1D95', flex: 1, lineHeight: 20 },

  /* botões */
  botao: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  botaoTexto: { color: '#fff', fontSize: 17, fontWeight: '700' },
  botaoSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  botaoSecTexto: { fontSize: 15, color: '#7C3AED', fontWeight: '600' },
});