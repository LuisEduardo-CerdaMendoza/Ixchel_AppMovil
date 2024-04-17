import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';

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

//dateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

//Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Registernewcontactemergency = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Registrar Nuevo Contacto de Emergencia</SubTitle>

                    <Formik
                        initialValues={{fullName: '', number: '', email: '', dateOfBirth: '', password: '', ConfirmPassword: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("VerificarNewContacto");
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                                <MyTextInput
                                    label="Nombre(s)"
                                    icon="person"
                                    placeholder="Nombres(s)"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    KeyboardType="email-addres"
                                />

                                <MyTextInput
                                    label="Primer Apellido"
                                    icon="person"
                                    placeholder="Primer Apellido"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    KeyboardType="email-addres"
                                />

                                <MyTextInput
                                    label="Segundo Apellido"
                                    icon="person"
                                    placeholder="Segundo Apellido"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    KeyboardType="email-addres"
                                />

                                <MyTextInput
                                    label="Correo Electronico"
                                    icon="mail"
                                    placeholder="ejemplo@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                />

                                <MyTextInput
                                    label="Telefono"
                                    icon="number"
                                    placeholder="Telefono"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />

                                <MyTextInput
                                    label="Parentesco"
                                    icon="people"
                                    placeholder="Parentesco"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('ConfirmPassword')}
                                    onBlur={handleBlur('ConfirmPassword')}
                                    value={values.ConfirmPassword}
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

export default Registernewcontactemergency;