import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { formatearFecha } from "../helpers"; // Asumimos que esta función existe

export default function Paciente({
  item,
  setModalVisible,
  setPaciente,
  setModalPaciente,
  pacienteEditar, // Nueva prop recibida desde Home.tsx
}: any) {

    const {nombre, fecha, id} = item
    
    // Función para manejar la acción de editar
    const handleEditar = () => {
        // Ejecutamos la función recibida de Home.tsx y le pasamos el id
        pacienteEditar(id); 
    }
    
  return(
    <Pressable >
        <View style={styles.contenedor}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.texto}>{nombre}</Text>
            <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

{/* Editar y borrar */}
            <View style={styles.contenedorBotones}>
          <Pressable 
            style={[styles.btn, styles.btnEditar]} 
            onPress={handleEditar} // Agregamos la funcionalidad al Pressable
          >
            <Text style={styles.textoBtn}>Editar</Text>
          </Pressable>

          <Pressable style={[styles.btn, styles.btnEliminar]}>
            <Text style={styles.textoBtn}>Eliminar</Text>
          </Pressable>
        </View>
        </View>
        
    </Pressable>
  )
  
  
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomColor: "#94a3B8",
    borderBottomWidth: 1,
  },
  label: {
    color: "#374151",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 10,
  },
  texto: {
    color: "#6D28D9",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  fecha: {
    color: "#374151",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: "#F59E0B",
  },
  btnEliminar: {
    backgroundColor: "#EF4444",
  },
  // Se corrigió el estilo del texto del botón de `texto` a `textoBtn` para usar el estilo que trae el código
  textoBtn: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#FFF",
  },
});