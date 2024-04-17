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

const Verifyeditcount = ({navigation}) => {

    // Función para obtener el valor del correo electrónico desde AsyncStorage
    const getEmailFromStorage = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            return email;
        } catch (error) {
            console.error('Error al obtener el correo electrónico desde AsyncStorage:', error);
            return null;
        }
    };

    const handleVerification = async (values) => { // Modificación aquí
        try {
            const email = await getEmailFromStorage();

            // Verifica si se obtuvo el correo electrónico
            if (!email) {
                console.error('Error: No se pudo obtener el correo electrónico desde AsyncStorage.');
                return;
            }

            // Realiza la solicitud a la API para verificar la cuenta
            const response = await fetch('http://189.138.113.163:8080/api/contacto/verify-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: values.number, // Usa values.number aquí
                }),
            });

            // Lee el cuerpo de la respuesta como texto
            const responseData = await response.text();

            console.log("Respuesta del servidor (verificar cuenta):", responseData);

            // Realiza la lógica en base al contenido del string
            if (responseData.includes('Cuenta verificada , ahyora ya puede recibir Alertas')){
                // Si el string contiene el mensaje de éxito, muestra una alerta
                console.log("Éxito", "Cuenta verificada exitosamente.");
                navigation.navigate("Bienvenido");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                console.error("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor (verificar cuenta):', error);
            console.error("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    // Función para regenerar el código de verificación
    const handleResendVerificationCode = async () => {
        try {
            const email = await getEmailFromStorage();

            // Verifica si se obtuvo el correo electrónico
            if (!email) {
                console.error('Error: No se pudo obtener el correo electrónico desde AsyncStorage.');
                return;
            }

            // Realiza la solicitud a la API para regenerar el código de verificación
            const response = await fetch('http://189.138.113.163:8080/api/contacto/regenerate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            // Lee el cuerpo de la respuesta como texto
            const responseData = await response.text();

            console.log("Respuesta del servidor (regenerar OTP):", responseData);

            // Realiza la lógica en base al contenido del string
            if (responseData.includes('Correo electrónico enviado... Verifique la cuenta dentro de 1 minuto')) {
                // Si el string contiene el mensaje de éxito, muestra una alerta
                console.log("Éxito", "Código de verificación regenerado exitosamente. Revisa tu correo.");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                console.error("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor (regenerar OTP):', error);
            console.error("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Ingresa el Codigo de Verificacion del Contacto de Emergencia</SubTitle>

                    <Formik
                        initialValues={{ otp: '' }}
                        onSubmit={handleVerification}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                                <MyTextInput
                                    label="Codigo de Verificacion"
                                    icon="check"
                                    placeholder="Codigo de Verificacion"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('number')}
                                    onBlur={handleBlur('number')}
                                    value={values.number}
                                />

                                <StyledButton onPress={() => {handleSubmit();}}>
                                    <ButtonText>Verificar Cuenta</ButtonText>
                                </StyledButton>

                                <Line/>

                                <ExtraView>
                                    <ExtraText>
                                        En caso de no recibir  el codigo de
                                    </ExtraText>
                                </ExtraView>
                                <ExtraView>
                                    <ExtraText>
                                    verificacion o no lo halla ingresado a tiempo
                                    </ExtraText>
                                </ExtraView>

                                <StyledButton onPress={handleResendVerificationCode}>
                                    <ButtonText>
                                        Reenviar Codigo de Verificacion
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

export default Verifyeditcount;