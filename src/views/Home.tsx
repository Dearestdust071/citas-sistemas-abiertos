import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Modal, FlatList } from "react-native";
import Formulario from "../components/Formulario";
import InformacionPaciente from "../components/InformacionPaciente";
import Paciente from "../components/Paciente";


export const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);
  // Inicializamos el estado 'paciente' con un objeto vacío para la edición.
  const [paciente, setPaciente] = useState<any>({}); 
  const [modalPaciente, setModalPaciente] = useState(false)

  const cerrarModal = () => {
    setModalVisible(false);
  };

  // Función para editar: busca el paciente por ID, lo establece en 'paciente' y abre el modal.
  const pacienteEditar = (id: string) => {
    // Busca el paciente cuyo id coincida con el pasado
    const pacienteAEditar = pacientes.find(p => p.id === id); 
    // Establece el paciente en el estado para que se cargue en el Formulario
    setPaciente(pacienteAEditar);
    // Abre el modal del Formulario
    setModalVisible(true); 
  };
  
  // La función original 'pacienteEditar' parecía ser para añadir, la renombramos a 'agregarPaciente' o la dejamos de lado por ahora.
  // La lógica para guardar y editar se manejará en el Formulario.
  /*
  const pacienteEditar = (pacienteEditado: any) => {
    const nuevosPacientes = [pacienteEditado, ...pacientes];
    setPacientes(nuevosPacientes);
  };
  */

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <Text style={styles.tituloBold}>Veterinarie</Text>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
        // style={styles.}
        data={pacientes}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return(
            <Paciente
            item={item}
            setModalVisible={setModalVisible}
            setPaicente={setPaciente}
            setModalPaciente={setModalPaciente}
            // Pasamos la nueva función pacienteEditar al componente Paciente
            pacienteEditar={pacienteEditar} 
            
            ></Paciente>
          )
        }}
        ></FlatList>
      )}

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => {
          setModalVisible(true);
          // Al presionar "Nueva cita", limpiamos el paciente si había uno cargado.
          setPaciente({});
        }}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {/* Condicional para mostrar el Formulario. Si modalVisible es true, se renderiza. */}
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
        {/* Componente InformacionPaciente dentro del Modal */}
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
      
      {/* Se eliminó el renderizado duplicado de InformacionPaciente ya que está dentro del Modal */}



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