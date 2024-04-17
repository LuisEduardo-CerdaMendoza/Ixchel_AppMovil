import React, { useState } from "react";
import { StatusBar, Alert } from 'react-native';
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

const Recover = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);

    const [formData, setFormData] = useState({
        email: ''
    });

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('http://189.138.113.0:8080/api/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            const responseData = await response.text();

            console.log("Respuesta del servidor:", responseData);

            if (responseData.includes('Please check your email to set new password to your account')) {
                await AsyncStorage.setItem('email', formData.email);
                navigation.navigate("Nueva Contraseña");
            } else {
                Alert.alert('Error', responseData);
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
                    <Formik
                    initialValues={{ email: '' }}
                    onSubmit={handleForgotPassword}
                    >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                        <MyTextInput
                            label="Correo Electronico"
                            icon="mail"
                            placeholder="ejemplo@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            value={formData.email}
                            keyboardType="email-address"
                        />

                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Enviar Codigo de Verificacion
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

export default Recover;
