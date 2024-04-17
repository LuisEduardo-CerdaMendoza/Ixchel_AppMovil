import React, { useState, useEffect } from "react";
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

const Datacontact = ({navigation}) => {

    const [contactData, setContactData] = useState({
        idContacto: '',
        nombreContacto: '',
        apPaterno: '',
        apMaterno: '',
        parentesco: '',
        email: '',
        active: '',
        otp: '',
        otpGeneratedTime: '',
        curp: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCurp = await AsyncStorage.getItem('userCurp');
                const apiUrl = `http:/189.138.113.163:8095/api/contacto/search-by-curp/${userCurp}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    const { idContacto, active, otp, otpGeneratedTime, curp, ...filteredData } = data[0];

                    // Almacena idContacto en AsyncStorage
                    await AsyncStorage.setItem('idContacto', idContacto.toString());

                    // Almacena los datos filtrados en el estado
                    setContactData(filteredData);
                } else {
                    console.error('No se encontraron datos válidos en la respuesta de la API.');
                }
            } catch (error) {
                console.error('Error al obtener datos del contacto:', error.message);
            }
        };

        fetchData();
    }, []);

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}/>
                    <SubTitle>Contactos de Emergencia</SubTitle>

                    <Text>
                        Datos del Infante
                    </Text>
                </InnerContainer>

                    <Card style={styles.cardBox}>
                        <Card.Title title="Contacto"/>
                        <Card.Content>
                            <Text variant="titleLarge">Nombre</Text>
                            <Text>{contactData.nombreContacto} {contactData.apPaterno} {contactData.apMaterno}</Text>
                            <Text variant="bodyMedium">Parentesco</Text>
                            <Text>{contactData.parentesco}</Text>
                            <Text variant="bodyMedium">Email</Text>
                            <Text>{contactData.email}</Text>
                        </Card.Content>
                    </Card>

                    <Line/>

                    <StyledButton onPress={() => navigation.navigate("EditarContacto")}>
                        <ButtonText>
                            Actualizar Contacto de Emergencia
                        </ButtonText>
                    </StyledButton>
                
            </StyledContainer>
        </KeyboardAvoidingWrapper>

    );
};

export default Datacontact;

const styles = StyleSheet.create({
    cardBox:{
        margin: 5
    },
    button:{
        backgroundColor: '#B8285C'
    },
    font:{
        fontSize: 15
    }
});