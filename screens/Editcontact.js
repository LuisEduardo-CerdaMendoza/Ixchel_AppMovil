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

const EditarContactoEmergencia = ({navigation}) => {

    const [email, setEmail] = useState("");


    const actualizarContacto = async (values) => {
        try {
            const userCurp = await AsyncStorage.getItem('userCurp');
            const idContacto = await AsyncStorage.getItem('idContacto');
            console.log('userCurp en AsyncStorage:', userCurp);
            console.log('idcontacto en AsyncStorage:', idContacto);
    
            const response = await fetch(`http://189.138.113.0:8095/api/contacto/update/${idContacto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombreContacto: values.nombreContacto,
                    curp: userCurp,
                    apPaterno: values.apPaterno,
                    apMaterno: values.apMaterno,
                    parentesco: values.parentesco,
                    email: values.email,
                }),
            });
    
            // Obtener el contenido de la respuesta como texto
            const data = await response.text();
    
            if (response.ok) {
                // Decide cómo manejar el texto según tu lógica de aplicación
                await AsyncStorage.setItem('email', values.email);
                console.log('Contacto actualizado correctamente:', data);
                console.log('este es email', email);
            } else {
                // Puedes imprimir el texto de la respuesta en caso de error
                console.error('Error al actualizar contacto:', data);
            }
        } catch (error) {
            console.error('Error en la solicitud de actualización:', error);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Actualizar Contacto de Emergencia</SubTitle>

                    <Formik
                        initialValues={{nombreContacto: '',
                                        apPaterno: '',
                                        apMaterno: '',
                                        parentesco: '',
                                        email: ''
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                            actualizarContacto(values);
                            navigation.navigate("VerificarActContacto");
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                            <MyTextInput
                                    label="Nombre(s)"
                                    icon="person"
                                    placeholder="Nombres(s)"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('nombreContacto')}
                                    onBlur={handleBlur('nombreContacto')}
                                    value={values.nombreContacto}
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
                                    label="Parentesco"
                                    icon="people"
                                    placeholder="Parentesco"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('parentesco')}
                                    onBlur={handleBlur('parentesco')}
                                    value={values.parentesco}
                                />

                                <MyTextInput
                                    label="Correo Electronico"
                                    icon="mail"
                                    placeholder="ejemplo@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    KeyboardType="email-addres"
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Enviar Codigo de Verificacion
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                <StyledButton onPress={() => navigation.navigate("DatosContacto")}>
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

export default EditarContactoEmergencia;