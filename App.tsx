import { StyleSheet, View } from 'react-native';
import {Home} from './src/views/Home';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
export default function App() {
  return (
     <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
    <View style={styles.container}>
     <Home></Home>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

