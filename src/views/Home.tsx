import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Modal, FlatList } from "react-native";
import Formulario from "../components/Formulario";
import InformacionPaciente from "../components/InformacionPaciente";
import Paciente from "../components/Paciente";
// Asumiendo que esta importación existe en tu proyecto para tipos
import { Paciente as PacienteTipo } from "../types/Paciente"; 
// Eliminamos la importación de Alert ya que no la usaremos.

export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [paciente, setPaciente] = useState<any>({}); 
  const [modalPaciente, setModalPaciente] = useState(false)

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const pacienteEditar = (id: string) => {
    const pacienteAEditar = pacientes.find(p => p.id === id); 
    setPaciente(pacienteAEditar);
    setModalVisible(true); 
  };
  
  // 🚀 FUNCIÓN ELIMINAR SIMPLIFICADA (Borrado inmediato sin Alerta)
  const pacienteEliminar = (id: string) => {
      
      // Filtramos la lista para excluir el paciente con el ID dado
      const pacientesActualizados = pacientes.filter(
          pac => pac.id !== id
      );
      setPacientes(pacientesActualizados);
      
      // Limpiar el paciente seleccionado y cerrar el modal de información si está abierto
      setPaciente({} as PacienteTipo);
      setModalPaciente(false);
      
      console.log(`Paciente con ID ${id} eliminado.`);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <Text style={styles.tituloBold}>Veterinarie</Text>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
        data={pacientes}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return(
            <Paciente
            item={item}
            setModalVisible={setModalVisible}
            setPaciente={setPaciente} 
            setModalPaciente={setModalPaciente}
            pacienteEditar={pacienteEditar} 
            pacienteEliminar={pacienteEliminar}
            ></Paciente>
          )
        }}
        ></FlatList>
      )}

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => {
          setModalVisible(true);
          setPaciente({} as PacienteTipo);
        }}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal
      visible={modalPaciente}
      animationType="slide"
      >
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "900",
    color: "#6D28D9",
    textAlign: "center",
  },
  btnNuevaCita: {
    backgroundColor: "#6D28D9",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});