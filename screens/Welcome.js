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

import {View} from 'react-native';

//Colors
const {brand, darkLight, primary, title} = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Login = ({navigation}) => {
    const [userId, setUserId] = useState(null);
    const [userCurp, setUserCurp] = useState(null);
    const [idContacto, setIdContacto] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                console.log("Correo recuperado de AsyncStorage:", email);
        
                const response = await fetch(
                    `http://189.138.113.163:8080/api/user/search-by-email/${email}`
                );
                const userData = await response.json();
        
                setUserId(userData.idUsuario);
                console.log("Correo y ID recuperados:", email, userData.idUsuario);
        
                // Llamada a la segunda API con el userId utilizando fetch
                const secondApiUrl = `http://189.138.113.163:8080/api/infante/search-by-user/${userData.idUsuario}`;
                const secondApiResponse = await fetch(secondApiUrl);
                const secondApiData = await secondApiResponse.json();
        
                if (
                    secondApiData &&
                    Array.isArray(secondApiData) &&
                    secondApiData.length > 0 &&
                    secondApiData[0].curp
                ) {
                    const curp = secondApiData[0].curp;
            
                    // Almacenar el CURP en AsyncStorage
                    await AsyncStorage.setItem("userCurp", curp);
            
                    // Actualizar el estado de userCurp utilizando la función de callback
                    setUserCurp((prevCurp) => {
                        console.log("CURP guardado en AsyncStorage:", curp);
                        console.log(
                        "CURP almacenado en el estado:",
                        prevCurp || curp
                        ); // Utiliza prevCurp o curp si prevCurp es null
                        return prevCurp || curp; // Utiliza prevCurp o curp si prevCurp es null
                    });
            
                    // Llamada a la tercera API con el userCurp utilizando fetch
                    const thirdApiUrl = `http://189.138.113.163:8095/api/contacto/search-by-curp/${curp}`;
                    const thirdApiResponse = await fetch(thirdApiUrl);
                    const thirdApiData = await thirdApiResponse.json();
            
                    if (
                        thirdApiData &&
                        Array.isArray(thirdApiData) &&
                        thirdApiData.length > 0 &&
                        thirdApiData[0].idContacto
                    ) {
                        // Almacena el idContacto en el estado
                        setIdContacto(thirdApiData[0].idContacto);
                    } else {
                        console.log(
                        "La respuesta de la tercera API no contiene datos válidos o un idContacto."
                        );
                    }
                } else {
                    console.log(
                        "La respuesta de la segunda API no contiene datos válidos o un CURP."
                    );
                }
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        };
    
        getUserData();
      }, []); // No es necesario agregar userCurp como dependencia aquí
    
    useEffect(() => {
        console.log('este es el id', userId);
    
        // Puedes realizar acciones adicionales aquí con el userId
    }, [userId]);
    console.log('este es el curp', userCurp);
    console.log('este es el idcontacto', idContacto);

    const clearUserData = async () => {
        try {
            // Obtener el valor de userEmail y userId antes de eliminarlos
            const userEmail = await AsyncStorage.getItem('userEmail');
            const userId = await AsyncStorage.getItem('userId');
    
            // Eliminar el correo y el ID de AsyncStorage
            await AsyncStorage.removeItem('userEmail');
            console.log('Correo eliminado de AsyncStorage:', userEmail);
    
            await AsyncStorage.removeItem('userId');
            console.log('ID eliminado de AsyncStorage:', userId);
        } catch (error) {
            console.error('Error al limpiar datos del usuario en AsyncStorage:', error);
        }
    };

    const handleLogout = () => {
        // Llamar a la función para eliminar los datos de AsyncStorage
        clearUserData();
        // También puedes realizar otras acciones de cierre de sesión aquí, como navegar a la pantalla de inicio de sesión
        navigation.navigate("Inicio de Sesion");
        console.log("Cierre de sesion exitoso");
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}/>
                    <PageTitle>Ixchel</PageTitle>
                    <SubTitle>Menu</SubTitle>

                    <Formik>
                        <StyledFormArea>
                                <StyledButton onPress={() => navigation.navigate("DatosSensores")}>
                                    <ButtonText>
                                        Datos de Salud
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                <StyledButton onPress={() => navigation.navigate("DatosInfante")}>
                                    <ButtonText>
                                        Datos del Infante
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                <StyledButton onPress={() => navigation.navigate("DatosContacto")}>
                                    <ButtonText>
                                        Contactos de Emergencia
                                    </ButtonText>
                                </StyledButton>

                                <Line/>

                                <StyledButton onPress={handleLogout}>
                                    <ButtonText>
                                        Cerrar Sesion
                                    </ButtonText>
                                </StyledButton>

                                <Line/>
                            </StyledFormArea>

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