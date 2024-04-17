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

const Verifynewcontactcount = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Ingresa el Codigo de Verificacion para Registrar al nuevo Contacto</SubTitle>

                    <Formik
                        initialValues={{number: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("DatosContacto");
                        }}
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

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Verificar Cuenta
                                    </ButtonText>
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

                                <StyledButton onPress={handleSubmit}>
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

export default Verifynewcontactcount;