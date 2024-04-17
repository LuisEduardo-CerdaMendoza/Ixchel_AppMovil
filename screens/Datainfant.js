import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik
import { Formik, isPromise } from "formik";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

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

const DataInfant = ({navigation}) => {
    const [infanteData, setInfanteData] = useState({
        curp: '',
        nombreInfante: '',
        apPaterno: '',
        apMaterno: '',
        sexo: '',
        tipoSangre: '',
        fechanac: '',
        talla: '',
        peso: '',
        observaciones: '',
        idUsuario: null, // Inicializado como nulo
    });
    
    useEffect(() => {
        // Función para obtener el correo de AsyncStorage y realizar la solicitud a la API
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                console.log("Correo recuperado de AsyncStorage:", email);
        
                // Realizar solicitud a la API del usuario con el correo obtenido
                const userResponse = await fetch(`http://189.138.113.163:8080/api/user/search-by-email/${email}`);
                const userData = await userResponse.json();
        
                // Obtener el userId
                const userId = userData.idUsuario;
        
                // Realizar solicitud a la API del infante con el userId obtenido
                const infanteResponse = await fetch(`http://189.138.113.163:8080/api/infante/search-by-user/${userId}`);
                const infanteData = await infanteResponse.json();
        
                // Actualizar el estado con los datos obtenidos de la API
                setInfanteData(infanteData[0]);
            } catch (error) {
                console.error('Error al obtener datos del usuario o infante:', error);
            }
        };
    
        // Llamar a la función al cargar el componente
        fetchData();
    }, []); // Ejecutará la función una vez al montar el componente
    
    
    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}/>
                    <SubTitle>Datos del Infante</SubTitle>

                    <Text>
                        Datos del Infante
                    </Text>
                </InnerContainer>

                    <Card style={styles.cardBox}>
                        <Card.Title title="INFANTE"/>
                        <Card.Content>
                            <Text variant="titleLarge">CURP</Text>
                            <Text>{infanteData.curp}</Text>
                            <Text variant="bodyMedium">NOMBRE</Text>
                            <Text>{infanteData.nombreInfante} {infanteData.apPaterno} {infanteData.apMaterno}</Text>
                            <Text variant="bodyMedium">SEXO</Text>
                            <Text>{infanteData.sexo}</Text>
                            <Text variant="bodyMedium">TIPO DE SANGRE</Text>
                            <Text>{infanteData.tipoSangre}</Text>
                            <Text variant="bodyMedium">FECHA DE NACIMIENTO</Text>
                            <Text>{infanteData.fechanac}</Text>
                            <Text variant="bodyMedium">TALLA</Text>
                            <Text>{infanteData.talla} cm</Text>
                            <Text variant="bodyMedium">PESO</Text>
                            <Text>{infanteData.peso} g</Text>
                            <Text variant="bodyMedium">OBSERVACIONES</Text>
                            <Text>{infanteData.observaciones}</Text>
                            <Card.Actions>
                            <Button style={styles.button} onPress={() => navigation.navigate("EditarInfante")}>
                                <ButtonText style={styles.font}>
                                    Editar Datos del Infante
                                </ButtonText>
                            </Button>
                        </Card.Actions>
                        </Card.Content>
                        
                    </Card>

                    <Line/>

            </StyledContainer>
        </KeyboardAvoidingWrapper>

    );
};

export default DataInfant;

const styles = StyleSheet.create({
    cardBox:{
        margin: 5
    },
    button:{
        backgroundColor: '#B8285C',
        marginRight: 55
    },
    font:{
        fontSize: 15
    }
});