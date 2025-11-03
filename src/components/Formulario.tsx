import { useState, useEffect } from "react";
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
interface Paciente {
  id?: string;
  nombre: string;
  propietario: string;
  email: string;
  telefono: string;

  fecha: Date | string; 
}

export default function Formulario({
  cerrarModal,
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}: {
  cerrarModal: () => void;
  pacientes: Paciente[];
  setPacientes: (pacientes: Paciente[]) => void;
  paciente: Paciente;
  setPaciente: (paciente: Paciente) => void;
}) {
  let today = new Date();
  
  const [nombre, setNombre] = useState(paciente.nombre || ""); 
  const [propietario, setPropietario] = useState(paciente.propietario || ""); 
  const [email, setEmail] = useState(paciente.email || ""); 
  const [telefono, setTelefono] = useState(paciente.telefono || ""); 

  
  // LÓGICA DE FECHA CORREGIDA:
  // 1. Inicialización para Edición
  const initialDate = paciente.id 
    // Verifica si es un string (que debe ser convertible a Date) o directamente un objeto Date.
    ? (typeof paciente.fecha === 'string' ? new Date(paciente.fecha) : (paciente.fecha as Date)) 
    : undefined;

  // 2. Establece el estado de la fecha. Usamos 'any' o eliminamos el genérico si el error persiste.
  const [selected, setSelected] = useState<any>(initialDate); 
  const defaultStyles = useDefaultStyles();

  // useEffect para cargar los datos cuando se selecciona un paciente (edición)
  useEffect(() => {
    if(paciente.id){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setTelefono(paciente.telefono)
      // Asegura que el valor asignado sea un objeto Date
      setSelected(typeof paciente.fecha === 'string' ? new Date(paciente.fecha) : paciente.fecha)
    }
  }, [paciente])


  const handleCita = () => {
    
    const pacienteActualizado: Paciente = {
      nombre,
      propietario,
      email,
      telefono,
      fecha: selected || today,
    };
    
    if (paciente.id) {
      // Lógica para EDITAR PACIENTE
      pacienteActualizado.id = paciente.id
      
      const pacientesActualizados = pacientes.map((pac) =>
        pac.id === paciente.id ? pacienteActualizado : pac
      );

      setPacientes(pacientesActualizados);
      
    } else {
      // Lógica para NUEVO PACIENTE
      pacienteActualizado.id = Date.now().toString();
      
      const nuevosPacientes = [pacienteActualizado, ...pacientes];
      setPacientes(nuevosPacientes);
    }

    // Limpiar el paciente en el estado de Home
    setPaciente({} as Paciente);

    // Cerrar y limpiar formulario
    cerrarModal();

    setNombre("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setSelected(undefined);
  };

  return (
    <Modal animationType="slide" visible={true}> 
      <ScrollView style={styles.contenido}>
        <Text style={styles.titulo}>
          {paciente.id ? "Editar cita" : "Nueva cita"}
        </Text>

        <Pressable style={styles.btnCancelar} onPress={() => {
          cerrarModal();
          // Limpiar el paciente en Home al cancelar 
          setPaciente({} as Paciente);
        }}>
          <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
        </Pressable>
        {/* ... (El resto de los TextInputs) ... */}
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
              // Usamos 'selected as Date' para forzar el tipo si TypeScript se queja
              date={selected as Date} 
              onChange={({ date }) => setSelected(date)}
              styles={defaultStyles}
            />
          </View>
        </View>

        <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
          <Text style={styles.btnNuevaCitaTexto}>
            {paciente.id ? "Guardar Cambios" : "Guardar Cita"}
          </Text>
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