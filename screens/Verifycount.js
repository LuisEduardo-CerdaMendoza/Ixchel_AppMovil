import React, { useState, useEffect } from "react";
import { StatusBar, Alert } from 'react-native';
import { Formik } from "formik";
import { Octicons, Ionicons } from '@expo/vector-icons';
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
} from './../components/styles';

import { View, TouchableOpacity } from 'react-native';

const Verifycount = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
    });

    useEffect(() => {
        // Cargar el email almacenado en AsyncStorage al montar el componente
        const loadEmailFromStorage = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                if (storedEmail) {
                    setFormData({ ...formData, email: storedEmail });
                }
            } catch (error) {
                console.error('Error al cargar el email desde AsyncStorage:', error);
            }
        };

        loadEmailFromStorage();
    }, []); // El segundo argumento [] asegura que este efecto solo se ejecute una vez al montar el componente

    const handleVerification = async (values) => {
        try {
            // Realiza la solicitud a la API utilizando fetch
            const response = await fetch('http://189.138.113.163:8080/api/user/verify-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email, // Utiliza el email del estado formData
                    otp: values.number
                }),
            });

            // Lee el cuerpo de la respuesta como texto
            const responseData = await response.text();

            console.log("Respuesta del servidor:", responseData);

            // Realiza la lógica en base al contenido del string
            if (responseData.includes('Cuenta verificada , puede iniciar sesión')) {
                // Si el string contiene 'Verificación exitosa', considera que la operación fue exitosa
                navigation.navigate("Registro Infante");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                Alert.alert("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor:', error);
            Alert.alert("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    const handleResendVerificationCode = async () => {
        try {
            // Realiza la solicitud a la API para regenerar el código de verificación
            const response = await fetch('http://189.138.113.163:8080/api/user/regenerate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });

            // Lee el cuerpo de la respuesta como texto
            const responseData = await response.text();

            console.log("Respuesta del servidor (regenerar OTP):", responseData);

            // Realiza la lógica en base al contenido del string
            if (responseData.includes('Código de verificación regenerado exitosamente')) {
                // Si el string contiene el mensaje de éxito, muestra una alerta
                Alert.alert("Éxito", "Código de verificación regenerado exitosamente. Revisa tu correo.");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                Alert.alert("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor (regenerar OTP):', error);
            Alert.alert("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Ixchel</PageTitle>
                <SubTitle>Ingresa el Codigo de Verificacion</SubTitle>

                <Formik
                    initialValues={{ otp: '' }}
                    onSubmit={handleVerification}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Codigo de Verificacion"
                                icon="check"
                                placeholder="Codigo de Verificacion"
                                placeholderTextColor={Colors.darkLight}
                                onChangeText={handleChange('number')}
                                onBlur={handleBlur('number')}
                                value={values.number}
                            />

                            <StyledButton onPress={() => {handleSubmit();}}>
                                <ButtonText>Verificar Cuenta</ButtonText>
                            </StyledButton>

                            <Line />

                            <ExtraView>
                                <ExtraText>
                                    En caso de no recibir el código de verificación o no lo haya ingresado a tiempo
                                </ExtraText>
                            </ExtraView>

                            <StyledButton onPress={handleResendVerificationCode}>
                                <ButtonText>Reenviar Codigo de Verificacion</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, ShowDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand} />
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
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Verifycount;