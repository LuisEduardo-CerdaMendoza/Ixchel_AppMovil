import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik
import { Formik, isPromise } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles';

import {View, TouchableOpacity} from 'react-native';

//Colors
const {brand, darkLight, primary} = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Editarinfant = ({navigation}) => {

    const createInfante = async (values) => {
        try {
            const userCurp = await AsyncStorage.getItem('userCurp');
            const apiUrl = `http://189.138.113.163:8094/api/infante/update/${userCurp}`;
    
            // Construir el cuerpo de la solicitud
            const requestBody = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Puedes incluir otros encabezados según sea necesario
                },
                body: JSON.stringify({
                    nombreInfante: values.nombreInfante,
                    apPaterno: values.apPaterno,
                    apMaterno: values.apMaterno,
                    sexo: values.sexo,
                    tipoSangre: values.tipoSangre,
                    fechanac: values.fechanac,
                    talla: parseFloat(values.talla), // Convertir a número, ya que podría ser un string
                    peso: parseFloat(values.peso), // Convertir a número, ya que podría ser un string
                    observaciones: values.observaciones,
                }),
            };
    
            const response = await fetch(apiUrl, requestBody);
    
            if (response.ok) {
                console.log('Datos del infante actualizados exitosamente.');
                // Redirigir a la pantalla "DatosInfante" después del éxito
                navigation.navigate("Bienvenido");
            } else {
                console.error('Error al actualizar datos del infante:', response.statusText);
            }
        } catch (error) {
            console.error('Error inesperado:', error.message);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Actualizar Datos del Infante</SubTitle>


                    <Formik
                        initialValues={{
                                        nombreInfante: '',
                                        apPaterno: '',
                                        apMaterno: '',
                                        sexo: '',
                                        tipoSangre: '',
                                        fechanac: '',
                                        talla: '',
                                        peso: '',
                                        observaciones: '',
                                    }}
                        onSubmit={createInfante}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                                <MyTextInput
                                    label="Nombre(s)"
                                    icon="person"
                                    placeholder="Nombre(s)"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('nombreInfante')}
                                    onBlur={handleBlur('nombreInfante')}
                                    value={values.nombreInfante}
                                />

                                <MyTextInput
                                    label="Primer Apellido"
                                    icon="person"
                                    placeholder="Primer Apellido"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('apPaterno')}
                                    onBlur={handleBlur('apPaterno')}
                                    value={values.apPaterno}
                                />

                                <MyTextInput
                                    label="Segundo Apellido"
                                    icon="person"
                                    placeholder="Segundo Apellido"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('apMaterno')}
                                    onBlur={handleBlur('apMaterno')}
                                    value={values.apMaterno}
                                />

                                <MyTextInput
                                    label="Sexo"
                                    icon="circle"
                                    placeholder="Sexo"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('sexo')}
                                    onBlur={handleBlur('sexo')}
                                    value={values.sexo}
                                />

                                <MyTextInput
                                    label="Tipo de Sangre"
                                    icon="diamond"
                                    placeholder="Tipo de Sangre"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('tipoSangre')}
                                    onBlur={handleBlur('tipoSangre')}
                                    value={values.tipoSangre}
                                />

                                <MyTextInput
                                    label="Fecha De Nacimiento"
                                    icon="calendar"
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('fechanac')}
                                    onBlur={handleBlur('fechanac')}
                                    value={values.fechanac}
                                />

                                <MyTextInput
                                    label="Talla"
                                    icon="accessibility"
                                    placeholder="Talla"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('talla')}
                                    onBlur={handleBlur('talla')}
                                    value={values.talla}
                                />

                                <MyTextInput
                                    label="Peso"
                                    icon="horizontal-rule"
                                    placeholder="Peso"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('peso')}
                                    onBlur={handleBlur('peso')}
                                    value={values.peso}
                                />

                                <MyTextInput
                                    label="Observaciones"
                                    icon="pencil"
                                    placeholder="Observaciones"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('observaciones')}
                                    onBlur={handleBlur('observaciones')}
                                    value={values.observaciones}
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Registrar Datos
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                <StyledButton onPress={() => navigation.navigate("DatosInfante")}>
                                    <ButtonText>
                                        Cancelar
                                    </ButtonText>
                                </StyledButton>

                            </StyledFormArea>)}

                    </Formik>

                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, ShowDatePicker, ...props }) => {
    return (
        <View>

            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>

            <StyledInputLabel>
                {label}
            </StyledInputLabel>

            {! isDate && <StyledTextInput {...props} />}
            {isDate && <TouchableOpacity onPress={ShowDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>}

            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}

        </View>
    );
};

export default Editarinfant;