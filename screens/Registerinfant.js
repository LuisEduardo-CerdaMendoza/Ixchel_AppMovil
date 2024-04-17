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
const Registerinfant = ({ navigation }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Función para obtener el correo de AsyncStorage y realizar la solicitud a la API
        const getUserData = async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                console.log("Correo recuperado de AsyncStorage:", email);
    
                // Realizar solicitud a la API con el correo obtenido
                const response = await fetch(`http://189.138.113.163:8080/api/user/search-by-email/${email}`);
                const userData = await response.json();
    
                // Almacenar el ID en la variable global userId
                setUserId(userData.idUsuario);
    
                // Esperar a que setUserId se complete antes de imprimir el mensaje en la consola
                console.log("Correo y ID recuperados:", email, userData.idUsuario);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };
    
        // Llamar a la función al cargar el componente
        getUserData();
    }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente
    
    console.log('este es el id', userId);

    const createInfante = async (infanteData) => {
        try {
            const response = await fetch('http://189.138.113.163:8080/api/infante/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    curp: infanteData.curp,
                    nombreInfante: infanteData.nombreInfante,
                    apPaterno: infanteData.apPaterno,
                    apMaterno: infanteData.apMaterno,
                    sexo: infanteData.sexo,
                    tipoSangre: infanteData.tipoSangre,
                    fechanac: infanteData.fechanac,
                    talla: infanteData.talla,
                    peso: infanteData.peso,
                    observaciones: infanteData.observaciones,
                    idUsuario: userId,
                }),
            });

            const responseData = await response.text();
            console.log("Respuesta del servidor (crear infante):", responseData);

            const saveCurpToStorage = async (curp) => {
                try {
                    await AsyncStorage.setItem('curp', curp);
                    console.log("CURP guardado en AsyncStorage:", curp);
                } catch (error) {
                    console.error('Error al guardar el CURP en AsyncStorage:', error);
                }
            };
            

            if (responseData.includes('Infante registrado con éxito')) {
                await AsyncStorage.removeItem('userId');
                console.log("ID eliminado de AsyncStorage");
                console.log("Éxito", "Infante creado exitosamente.");
                // Guarda el CURP en AsyncStorage
                await saveCurpToStorage(infanteData.curp); 
                navigation.navigate("Registro Contacto Emergencia");
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
                    <SubTitle>Registrar Datos del Infante</SubTitle>

                    <Formik
                        initialValues={{curp: '',
                                        nombreInfante: '',
                                        apPaterno: '',
                                        apMaterno: '',
                                        sexo: '',
                                        tipoSangre: '',
                                        fechanac: '',
                                        talla: '',
                                        peso: '',
                                        observaciones: '',
                                        idUsuario: '',
                                    }}
                        onSubmit={createInfante}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                                <MyTextInput
                                    label="CURP"
                                    icon="file"
                                    placeholder="CURP"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('curp')}
                                    onBlur={handleBlur('curp')}
                                    value={values.curp}
                                />

                                <MyTextInput
                                    label="Nombre(s)"
                                    icon="person"
                                    placeholder="Nombre(s)"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('nombreInfante')}
                                    onBlur={handleBlur('nombreInfante')}
                                    value={values.nombreInfante}
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
                                    label="Sexo"
                                    icon="circle"
                                    placeholder="Sexo"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('sexo')}
                                    onBlur={handleBlur('sexo')}
                                    value={values.sexo}
                                />

                                <MyTextInput
                                    label="Tipo de Sangre"
                                    icon="diamond"
                                    placeholder="Tipo de Sangre"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('tipoSangre')}
                                    onBlur={handleBlur('tipoSangre')}
                                    value={values.tipoSangre}
                                />

                                <MyTextInput
                                    label="Fecha De Nacimiento"
                                    icon="calendar"
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('fechanac')}
                                    onBlur={handleBlur('fechanac')}
                                    value={values.fechanac}
                                />

                                <MyTextInput
                                    label="Talla"
                                    icon="accessibility"
                                    placeholder="Talla"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('talla')}
                                    onBlur={handleBlur('talla')}
                                    value={values.talla}
                                />

                                <MyTextInput
                                    label="Peso"
                                    icon="horizontal-rule"
                                    placeholder="Peso"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('peso')}
                                    onBlur={handleBlur('peso')}
                                    value={values.peso}
                                />

                                <MyTextInput
                                    label="Observaciones"
                                    icon="pencil"
                                    placeholder="Observaciones"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('observaciones')}
                                    onBlur={handleBlur('observaciones')}
                                    value={values.observaciones}
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Registrar Datos
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

export default Registerinfant;