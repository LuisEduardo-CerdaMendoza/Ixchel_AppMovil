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

const Verifycontactemergency = ({navigation}) => {

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
            const response = await fetch('http://189.138.113.163:8080/api/contacto/verify-account', {
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
            if (responseData.includes('Cuenta verificada , ahyora ya puede recibir Alertas')) {
                // Si el string contiene 'Verificación exitosa', considera que la operación fue exitosa
                navigation.navigate("Inicio de Sesion");
            } else {
                // Si hay un error, muestra el mensaje del servidor
                console.error("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor:', error);
            console.error("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    const handleResendVerificationCode = async () => {
        try {
            // Realiza la solicitud a la API para regenerar el código de verificación
            const response = await fetch('http://189.138.113.163:8080/api/contacto/regenerate-otp', {
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

export default Verifycontactemergency;