import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

////////////////////////////////////////////////////////////////////////////////
//Esquema de validación y mensajes de error de lanzará yup
const mensajesValidacion = yup.object().shape({
  nombre: yup.string("Introduzca su nombre").required("* Obligatorio"),
  apellidos: yup.string("Introduzca sus apellidos").required("* Obligatorio"),
  email: yup
    .string()
    .email("Introduzca su dirección de correo")
    .required("* Obligatorio"),
  contrasenya: yup
    .string("Introduzca su contraseña")
    .required("* Obligatorio")
    .min(8),
});

export default function App() {
  const [salida, setSalida] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contrasenya: "",
  });

  function limpiar() {
    let sal = { nombre: "", apellidos: "", email: "", contrasenya: "" };
    setSalida(sal);
  }

  function formatSalida(objeto) {
    let nombre = objeto.nombre;
    let apellidos = objeto.apellidos;
    let email = objeto.email;
    let contrasenya = objeto.contrasenya;

    let mensajeSalida =
      "Nombre:         " +
      nombre +
      "\n Apellidos:      " +
      apellidos +
      "\n Correo:            " +
      email +
      "\n Contraseña:   " +
      contrasenya;
    return mensajeSalida;
  }

  return (
    <ScrollView>
      {/*Cabecera de la App*/}
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Formulario de acceso"
          subtitle="Introduzca sus datos"
        />
        <Appbar.Action icon="clipboard-account-outline" />
      </Appbar.Header>

      {/*Formulario usando la libreria Formik.
         Validacion con la libreía Yup*/}
      <View>
        <Formik
          validateOnMount={true}
          validationSchema={mensajesValidacion}
          initialValues={{
            nombre: "",
            apellidos: "",
            email: "",
            contrasenya: "",
          }}
          onSubmit={(values) => setSalida(values)}
        >
          {/*Manejadores y objetos*/}
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            values /*objeto con valores de todos los campos*/,
            errors /*objeto con errores para que los lea */,
            touched /*almacena los campos que han sido tocados*/,
          }) => (
            <>
              <View>
                <Text style={styles.etiquetas}>Nombre</Text>
                <TextInput
                  style={styles.camposFormulario}
                  placeholder="Escriba su nombre"
                  onChangeText={handleChange("nombre")}
                  onBlur={handleBlur("nombre")}
                  value={values.nombre}
                  keyboardType="default"
                />
                {errors.nombre && touched.nombre && (
                  <Text style={styles.errorText}>{errors.nombre}</Text>
                )}
              </View>

              <View>
                <Text style={styles.etiquetas}>Apellidos</Text>
                <TextInput
                  style={styles.camposFormulario}
                  placeholder="Escriba sus apellidos"
                  onChangeText={handleChange("apellidos")}
                  onBlur={handleBlur("apellidos")}
                  value={values.apellidos}
                  keyboardType="default"
                />
                {errors.apellidos && touched.apellidos && (
                  <Text style={styles.errorText}>{errors.apellidos}</Text>
                )}
              </View>

              <View>
                <Text style={styles.etiquetas}>Correo</Text>
                <TextInput
                  style={styles.camposFormulario}
                  placeholder="Escriba su email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View>
                <Text style={styles.etiquetas}>Contraseña</Text>
                <TextInput
                  style={styles.camposFormulario}
                  placeholder="Escriba su contraseña"
                  onChangeText={handleChange("contrasenya")}
                  onBlur={handleBlur("contrasenya")}
                  value={values.contrasenya}
                  keyboardType="default"
                />

                {errors.contrasenya && touched.contrasenya && (
                  <Text style={styles.errorText}>{errors.contrasenya}</Text>
                )}
              </View>

              <View style={styles.botonera}>
                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                  <Text style={styles.textoBoton}>Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.boton} onPress={handleReset}>
                  <Text style={styles.textoBoton}>Borrar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>

      {/*Pantalla visalización datos*/}
      <View style={styles.pantallaSalida}>
        <Text style={styles.textoSalida}> {formatSalida(salida)}</Text>
      </View>
      <TouchableOpacity
        style={styles.boton2}
        mode="contained"
        onPress={limpiar}
      >
        <Text style={styles.textoBoton}>Limpiar pantalla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  appbar: {
    height: 80,
  },

  etiquetas: {
    marginLeft: 21,
    marginTop: 15,
    marginBottom: 5,
    color: "darkblue",
    fontSize: 14,
  },

  camposFormulario: {
    color: "black",
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "600",
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "darkblue",
    paddingRight: 12,
    height: 50,
  },

  botonera: {
    display: "flex",
    flexDirection: "row-reverse",
  },

  boton: {
    backgroundColor: "#6200ED",
    borderColor: "#7A297B",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: 160,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },

  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 20,
    marginLeft: 20,
  },

  pantallaSalida: {
    borderWidth: 8,
    borderColor: "#6200ED",
    marginTop: 50,
    margin: 15,
    height: 160,
    borderRadius: 10,
    padding: 20,
    fontSize: 25,
    backgroundColor: "#EDD3ED",
  },

  textoSalida: {
    fontSize: 16,
    paddingTop: 7,
    color: "#6200ED",
    fontWeight: "800",
  },

  boton2: {
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#6200ED",
  },
});
