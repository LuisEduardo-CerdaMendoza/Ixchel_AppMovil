import React, { useState } from "react";
import { StatusBar, Alert } from 'react-native';

//formik
import { Formik, isPromise } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyledContainer,
    InnerContainer,
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
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles';

import { View, TouchableOpacity } from 'react-native';

const { brand, darkLight } = Colors;

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//API client
import axios from "axios";

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [formData, setFormData] = useState({
        nombreUsuario: '',
        email: '',
        password: '',
        confirmPassword: '',
        noSerie: ''
    });

    const handleVerification = async (values) => {
        try {
            // Verifica si las contraseñas coinciden
            if (values.password !== values.confirmPassword) {
                Alert.alert("Error", "Las contraseñas no coinciden.");
                return;
            }
    
            // Realiza la solicitud a la API utilizando fetch
            const response = await fetch('http://189.138.113.163:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombreUsuario: values.nombreUsuario,
                    email: values.email,
                    password: values.password,
                    noSerie: ''
                }),
            });
    
            // Lee el cuerpo de la respuesta como texto
            const responseData = await response.text();
    
            console.log("Respuesta del servidor:", responseData);
    
            // Realiza la lógica en base al contenido del string
            if (responseData.includes('El registro de usuario se ha realizado correctamente')) {
                // Si el string contiene 'Success', considera que la operación fue exitosa
    
                // Guardar el email en AsyncStorage
                await AsyncStorage.setItem('email', values.email);
    
                navigation.navigate("Verificar Cuenta Creada");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                Alert.alert("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor:', error);
            Alert.alert("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };
    

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Crear Cuenta</SubTitle>

                    <StyledFormArea>

                        <MyTextInput
                            label="Nombre Completo"
                            icon="person"
                            placeholder="Nombre Completo"
                            placeholderTextColor={darkLight}
                            onChangeText={(text) => setFormData({ ...formData, nombreUsuario: text })}
                            value={formData.nombreUsuario}
                        />

                        <MyTextInput
                            label="Correo Electronico"
                            icon="mail"
                            placeholder="ejemplo@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            value={formData.email}
                            keyboardType="email-address"
                        />

                        <MyTextInput
                            label="Contraseña"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                            value={formData.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MyTextInput
                            label="Confirmar Contraseña"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                            value={formData.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <StyledButton onPress={() => handleVerification(formData)}>
                            <ButtonText>
                                Enviar Codigo de Verificacion
                            </ButtonText>
                        </StyledButton>

                        <Line />

                        <ExtraView>
                            <ExtraText>
                                ¿Ya tienes una cuenta?
                            </ExtraText>

                            <TextLink onPress={() => navigation.navigate('Inicio de Sesion')}>
                                <TextLinkContent> Iniciar Sesion</TextLinkContent>
                            </TextLink>
                        </ExtraView>

                    </StyledFormArea>
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

            {!isDate && <StyledTextInput {...props} />}
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

export default Signup;
