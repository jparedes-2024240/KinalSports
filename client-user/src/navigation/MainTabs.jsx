// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\navigation\MainTabs.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import FieldsScreen from '../features/fields/screens/FieldsScreen.jsx';
import FieldDetailScreen from '../features/fields/screens/FieldDetailScreen.jsx';
import CreateReservationFieldScreen from '../features/fields/screens/CreateReservationScreen.jsx';
import ReservationsScreen from '../features/reservations/screens/ReservationsScreen.jsx';
import TeamsScreen from '../features/teams/screens/TeamsScreen.jsx';
import TeamDetailScreen from '../features/teams/screens/TeamDetailScreen.jsx';
import MyTeamsScreen from '../features/teams/screens/MyTeamsScreen.jsx';
import CreateTeamScreen from '../features/teams/screens/CreateTeamScreen.jsx';
import TournamentsScreen from '../features/tournaments/screens/TournamentsScreen.jsx';
import TournamentDetailScreen from '../features/tournaments/screens/TournamentDetailScreen.jsx';
import MyTournamentsScreen from '../features/tournaments/screens/MyTournamentsScreen.jsx';
import ProfileScreen from '../features/profile/screens/ProfileScreen.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../shared/constants/theme.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function FieldsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FieldsList" component={FieldsScreen} />
      <Stack.Screen name="FieldDetail" component={FieldDetailScreen} />
      <Stack.Screen name="CreateReservation" component={CreateReservationFieldScreen} />
    </Stack.Navigator>
  );
}

function TeamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeamsList" component={TeamsScreen} />
      <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
      <Stack.Screen name="MyTeams" component={MyTeamsScreen} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
    </Stack.Navigator>
  );
}

function TournamentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TournamentsList" component={TournamentsScreen} />
      <Stack.Screen name="TournamentDetail" component={TournamentDetailScreen} />
      <Stack.Screen name="MyTournaments" component={MyTournamentsScreen} />
    </Stack.Navigator>
  );
}

function ReservationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReservationsList" component={ReservationsScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Profile',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'help-outline';

          if (route.name === 'Fields') {
            iconName = 'sports-soccer';
          } else if (route.name === 'Teams') {
            iconName = 'groups';
          } else if (route.name === 'Tournaments') {
            iconName = 'emoji-events';
          } else if (route.name === 'Reservations') {
            iconName = 'event';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 4
        }
      })}
    >
      <Tab.Screen name="Fields" component={FieldsStack} options={{ title: 'Canchas' }} />
      <Tab.Screen name="Teams" component={TeamsStack} options={{ title: 'Equipos' }} />
      <Tab.Screen name="Tournaments" component={TournamentsStack} options={{ title: 'Torneos' }} />
      <Tab.Screen name="Reservations" component={ReservationsStack} options={{ title: 'Reservas' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large
  },
  placeholderTitle: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xlarge,
    fontWeight: '700'
  }
});
