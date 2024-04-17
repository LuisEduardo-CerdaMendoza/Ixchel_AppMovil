import { useEffect } from 'react';
import React, {useState} from "react";
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

import {View} from 'react-native';

//Colors
const {brand, darkLight, primary, title} = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//API client
import axios from "axios";

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://189.138.113.163:8080/api/user/login', {
                email: values.email,
                password: values.password
            });
    
            console.log("Respuesta del servidor:", response.data);
    
            if (response.data && response.data.includes("Inicio de sesión exitoso")) {
                console.log("Navegando a Bienvenido");
    
                // Guardar el email en AsyncStorage
                await AsyncStorage.setItem('email', values.email);
    
                navigation.navigate("Bienvenido");
                resetForm();
                setErrorMessage("");
            } else {
                console.log("Credenciales incorrectas. Mensaje del servidor:", response.data);
                setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            setErrorMessage("Usuario No encontrado");
        } finally {
            setSubmitting(false);
        }
    };
    
    

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                    <InnerContainer>

                        <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}/>
                        <PageTitle>Ixchel</PageTitle>
                        <SubTitle>Iniciar Sesion</SubTitle>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={handleLogin}  // Utilizar la función handleLogin para el envío del formulario
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <StyledFormArea>
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

                                    <MyTextInput
                                        label="Contraseña"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <MsgBox>{errorMessage}</MsgBox>

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Iniciar Sesion</ButtonText>
                                    </StyledButton>

                                    <Line/>

                                    <ExtraView>
                                        <ExtraText>
                                            ¿Aún no tienes una cuenta?
                                        </ExtraText>

                                        <TextLink onPress={() => navigation.navigate("Crear Cuenta")}>
                                            <TextLinkContent> Crear Cuenta</TextLinkContent>
                                        </TextLink>
                                    </ExtraView>

                                </StyledFormArea>)}
                            </Formik>

                    </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>

            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>

            <StyledInputLabel>
                {label}
            </StyledInputLabel>

            <StyledTextInput {...props} />

            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}

        </View>
    );
};

export default Login;