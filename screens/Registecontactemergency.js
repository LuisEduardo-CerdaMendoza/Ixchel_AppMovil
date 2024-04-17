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

const Registercontactemergency = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [curp, setCurp] = useState('');

    useEffect(() => {
        const loadCurpAndEmail = async () => {
            try {
                const storedCurp = await AsyncStorage.getItem('curp');
                if (storedCurp) {
                    setCurp(storedCurp);
                }
            } catch (error) {
                console.error('Error al cargar el CURP desde AsyncStorage:', error);
            }
        };

        loadCurpAndEmail();
    }, []);

    const saveCurpAndEmail = async (curp) => {
        try {
            await AsyncStorage.setItem('curp', curp);
            console.log("CURP guardado en AsyncStorage:", curp);
        } catch (error) {
            console.error('Error al guardar el CURP en AsyncStorage:', error);
        }
    };

    const clearCurpAndEmail = async () => {
        try {
            await AsyncStorage.removeItem('curp');
            console.log("CURP eliminado de AsyncStorage");
            const userEmail = await AsyncStorage.getItem('email');
    
            // Eliminar el correo y el ID de AsyncStorage
            await AsyncStorage.removeItem('userEmail');
            console.log('Correo eliminado de AsyncStorage:', userEmail);
        } catch (error) {
            console.error('Error al eliminar el CURP de AsyncStorage:', error);
        }
    };

    const createContacto = async (contactoData) => {
        try {
            const response = await fetch('http://189.138.113.163:8080/api/contacto/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombreContacto: contactoData.nombreContacto,
                    curp: curp,
                    apPaterno: contactoData.apPaterno,
                    apMaterno: contactoData.apMaterno,
                    parentesco: contactoData.parentesco,
                    email: contactoData.email,
                }),
            });

            const responseData = await response.text();
            console.log("Respuesta del servidor (crear contacto de emergencia):", responseData);

            const saveEmail = async (email) => {
                try {
                    await AsyncStorage.setItem('email', email);
                    console.log("Email guardado en AsyncStorage:", email);
                } catch (error) {
                    console.error('Error al guardar el email en AsyncStorage:', error);
                }
            };

            if (responseData.includes('El registro de contacto se ha realizado correctamente para')) {
                // Guardar el email en AsyncStorage
                await saveEmail(contactoData.email);
                
                await clearCurpAndEmail();
                console.log("CURP eliminado de AsyncStorage");
                console.log("Éxito", "Contacto de emergencia registrado exitosamente.");
                navigation.navigate("Verificar Contacto");
            } else {
                console.error("Error", responseData);
            }
        } catch (error) {
            console.error('Error al enviar datos al servidor:', error);
            console.error("Error", "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Registrar Constacto de Emergencia</SubTitle>

                    <Formik
                        initialValues={{
                            nombreContacto: '',
                            apPaterno: '',
                            apMaterno: '',
                            parentesco: '',
                            email: ''
                        }}
                        onSubmit={createContacto}
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

export default Registercontactemergency;