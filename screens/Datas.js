import React, { useState, useEffect } from 'react';
import { StatusBar, Image, View, Text, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik'; // Importa Formik
import Temp from './../assets/img/termometro.png';

import Latidos from './../assets/img/salud.png';
import Oxigeno from './../assets/img/o2.png';

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


const Datas = () => {

    const [temperatura, setTemperatura] = useState();
    const [pulsaciones, setPulsaciones] = useState('');
    const [frecuenciaResp, setFrecuenciaResp] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCurp = await AsyncStorage.getItem('userCurp');
    
                // Llamada a la primera API para la temperatura
                const tempApiUrl = `http://189.138.113.163:8080/api/temperatura/ultima/${userCurp}`;
                const tempResponse = await fetch(tempApiUrl);
                const tempData = await tempResponse.json();
    
                if (tempData && Array.isArray(tempData) && tempData.length > 0 && tempData[0].temperatura) {
                    const temperatura = tempData[0].temperatura.toFixed(2);
                    setTemperatura(temperatura);
                } else {
                    console.log('La respuesta de la primera API no contiene datos válidos o una temperatura.');
                }
    
                // Llamada a la segunda API para las pulsaciones
                const pulsacionesApiUrl = `http://189.138.113.163:8080/api/frecuenciac/ultima/${userCurp}`;
                const pulsacionesResponse = await fetch(pulsacionesApiUrl);
                const pulsacionesData = await pulsacionesResponse.json();
    
                if (
                    pulsacionesData &&
                    Array.isArray(pulsacionesData) &&
                    pulsacionesData.length > 0 &&
                    pulsacionesData[0].pulsaciones
                ) {
                    const pulsaciones = pulsacionesData[0].pulsaciones;
                    setPulsaciones(pulsaciones);
                } else {
                    console.log('La respuesta de la segunda API no contiene datos válidos o pulsaciones.');
                }
    
                // Llamada a la tercera API para la frecuencia respiratoria
                const frecuenciaRespApiUrl = `http://189.138.113.163:8080/api/frecuenciar/ultima/${userCurp}`;
                const frecuenciaRespResponse = await fetch(frecuenciaRespApiUrl);
                const frecuenciaRespData = await frecuenciaRespResponse.json();
    
                if (
                    frecuenciaRespData &&
                    Array.isArray(frecuenciaRespData) &&
                    frecuenciaRespData.length > 0 &&
                    frecuenciaRespData[0].frecuencia_Resp
                ) {
                    const frecuenciaResp = frecuenciaRespData[0].frecuencia_Resp;
                    setFrecuenciaResp(frecuenciaResp);
                } else {
                    console.log('La respuesta de la tercera API no contiene datos válidos o frecuencia respiratoria.');
                }
            } catch (error) {
                console.error('Error al obtener datos de las API:', error);
            }
        };
    
        // Llamar fetchData inicialmente y luego cada 5 segundos
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
    
        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []); // Asegúrate de incluir la dependencia vacía para que se ejecute solo una vez al montar el componente

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>

                    <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}/>
                    <SubTitle>Datos de Salud</SubTitle>

                </InnerContainer>

                    <Formik
                        initialValues={{ temperatura: '' }}
                        onSubmit={(values) => {
                            // Maneja el envío del formulario aquí si es necesario
                            console.log('Formulario enviado con valores:', values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 13,
                                paddingRight: 35,
                                borderRadius: 8,
                                marginTop: 5
                            }}>

                                <Image source={Temp} style={{
                                    width: 60,
                                    height: 80,
                                    marginLeft: 110 
                                }}>

                                </Image>

                                <Text style={{ fontSize: 25, fontWeight: 'bold', paddingLeft: 15 }}>
                                    {temperatura} ℃
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 13,
                                paddingRight: 35,
                                borderRadius: 8,
                                marginTop: 5
                            }}>

                                <Image source={Latidos} style={{
                                    width: 90,
                                    height: 90,
                                    marginLeft: 100
                                }}>

                                </Image>

                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    paddingLeft: 15,
                                }}>
                                    {pulsaciones} BPM
                                </Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 13,
                                paddingRight: 35,
                                borderRadius: 8,
                                marginTop: 5
                            }}>

                                <Image source={Oxigeno} style={{
                                    width: 80,
                                    height: 60,
                                    marginLeft: 100
                                }}>

                                </Image>

                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    paddingLeft: 15,
                                }}>
                                    {frecuenciaResp} SPO2
                                </Text>
                            </View>

                            <StyledButton onPress={() => Linking.openURL('https://ixchel-app-main-lyntc.azurewebsites.net/')}>
                                <ButtonText>Generar PDF</ButtonText>
                            </StyledButton>

                        </StyledFormArea>)}
                    </Formik>

                
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default Datas;