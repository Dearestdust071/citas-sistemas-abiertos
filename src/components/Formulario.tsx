import { useState } from "react";
import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  Pressable,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from "react-native-ui-datepicker";

export default function Formulario({
  cerrarModal,
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}: any) {
  let today = new Date();
  const [selected, setSelected] = useState<DateType>();
  const defaultStyles = useDefaultStyles();

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleCita = () => {
    cerrarModal();
    const nuevoPaciente = {
      id: Date.now(),
      nombre,
      propietario,
      email,
      telefono,
      fecha: selected || today,
    };
    const nuevosPacientes = [nuevoPaciente, ...pacientes];
    setPacientes(nuevosPacientes);
    console.log(pacientes);
    

    setNombre("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setSelected(undefined);
  };

  return (
    <Modal animationType="slide" visible={true}>
      <ScrollView style={styles.contenido}>
        <Text style={styles.titulo}>Nueva cita</Text>

        <Pressable style={styles.btnCancelar} onPress={cerrarModal}>
          <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
        </Pressable>

        <View>
          <Text style={styles.label}>Nombre paciente:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre paciente"
            placeholderTextColor={"#666"}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View>
          <Text style={styles.label}>Nombre propietario:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre propietario"
            placeholderTextColor={"#666"}
            value={propietario}
            onChangeText={setPropietario}
          />
        </View>

        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email del propietario"
            placeholderTextColor={"#666"}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono del propietario"
            placeholderTextColor={"#666"}
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha cita:</Text>
          <View style={styles.fechaContenedor}>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={defaultStyles}
            />
          </View>
        </View>

        <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
          <Text style={styles.btnNuevaCitaTexto}>Guardar Cita</Text>
        </Pressable>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#6D28D9",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 30,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
