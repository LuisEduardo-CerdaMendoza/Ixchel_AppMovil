import React from 'react';

import { Colors } from './../components/styles';
const {primary, tertiary} = Colors;

//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from '../screens/Login';
import Singup from '../screens/Singup';
import Welcome from '../screens/Welcome';
import Recover from '../screens/Recover';
import Newpassword from '../screens/Newpassword';
import Verifycount from '../screens/Verifycount';
import Registerinfant from '../screens/Registerinfant';
import Registercontactemergency from '../screens/Registecontactemergency';
import Verifycontactemergency from '../screens/Verifycontactemergency';
import Datas from '../screens/Datas'
import Datainfant from '../screens/Datainfant';
import Datacontact from '../screens/Datacontact';
import EditContact from '../screens/Editcontact';
import Verifyeditcontact from '../screens/Verifyeditcontact';
import Createnewconatct from '../screens/Createnewcontact';
import Verifynewcontact from '../screens/Verifynewcontact';
import Editarinfant from '../screens/Editinfant';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName='Inicio de Sesion'
            >

                <Stack.Screen name="Inicio de Sesion" component={Login} />
                <Stack.Screen name="Crear Cuenta" component={Singup} />
                <Stack.Screen name="Recuperar Contraseña" component={Recover} />
                <Stack.Screen name="Nueva Contraseña" component={Newpassword} />
                <Stack.Screen name="Verificar Cuenta Creada" component={Verifycount} />
                <Stack.Screen name="Registro Infante" component={Registerinfant} />
                <Stack.Screen name="Registro Contacto Emergencia" component={Registercontactemergency} />
                <Stack.Screen name="Verificar Contacto" component={Verifycontactemergency} />
                <Stack.Screen name="DatosSensores" component={Datas} />
                <Stack.Screen name="DatosInfante" component={Datainfant} />
                <Stack.Screen name="DatosContacto" component={Datacontact} />
                <Stack.Screen name="EditarContacto" component={EditContact} />
                <Stack.Screen name="VerificarActContacto" component={Verifyeditcontact} />
                <Stack.Screen name="RegistrarNewContacto" component={Createnewconatct} />
                <Stack.Screen name="VerificarNewContacto" component={Verifynewcontact} />
                <Stack.Screen name="EditarInfante" component={Editarinfant} />
                <Stack.Screen options={{headerTintColor: primary}} name="Bienvenido" component={Welcome} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
