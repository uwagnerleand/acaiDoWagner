// App.js
// Ponto de entrada: configura a navegação em pilha com as 4 telas.

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import CardapioScreen    from './src/screens/CardapioScreen';
import MontarPedidoScreen from './src/screens/MontarPedidoScreen';
import ResumoPedidoScreen from './src/screens/ResumoPedidoScreen';
import ConfirmadoScreen  from './src/screens/ConfirmadoScreen';  // bônus

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Cardapio"
        screenOptions={{
          headerStyle: { backgroundColor: '#6A1B4D' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Cardapio"
          component={CardapioScreen}
          options={{ title: '🍇 Açaí do Campus' }}
        />
        <Stack.Screen
          name="MontarPedido"
          component={MontarPedidoScreen}
          options={{ title: 'Monte seu açaí' }}
        />
        <Stack.Screen
          name="ResumoPedido"
          component={ResumoPedidoScreen}
          options={{ title: 'Resumo do pedido' }}
        />
        {/* Tela bônus — pode remover se não for implementar */}
        <Stack.Screen
          name="Confirmado"
          component={ConfirmadoScreen}
          options={{ title: 'Pedido confirmado!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}