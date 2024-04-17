import React, { useState, useEffect } from "react";
import { StatusBar, Alert } from 'expo-status-bar';
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
const {brand, darkLight, primary} = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Newpassword = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
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

    const handleSetPassword = async (values) => {
        try {
            const response = await fetch('http://189.138.113.0:8080/api/user/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: values.otp,
                    newPassword: values.newPassword
                }),
            });

            const responseData = await response.text();

            console.log("Respuesta del servidor:", responseData);

            if (responseData.includes('Nueva contraseña actualizada , inicie sesion')) {
                // Contraseña actualizada exitosamente, puedes navegar a la pantalla de inicio de sesión o realizar otras acciones
                navigation.navigate("Inicio de Sesion");
            } else {
                // Si la respuesta no es exitosa, mostramos un mensaje de alerta
                console.error('Error', responseData);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Recuperar Contraseña</SubTitle>
                        <ExtraText>
                            Tienes que agregar el Codigo que se envia a tu correo y la Contraseña y despues presionar el Boton
                        </ExtraText>
                    

                    <Formik
                        initialValues={{ otp: '', newPassword: '' }}
                        onSubmit={handleSetPassword}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                                <ExtraView>
                                </ExtraView>

                                <MyTextInput
                                    label="Codigo de Verificacion"
                                    icon="check"
                                    placeholder="Codigo de Verificacion"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('otp')}
                                    onBlur={handleBlur('otp')}
                                    value={values.otp}
                                />

                                <MyTextInput
                                    label="Contraseña"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                                    value={formData.newPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Crear Nueva Contraseña
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                

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

export default Newpassword;