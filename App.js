import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Root from "./navigations/Root";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
export default function App() {
	const [loaded] = useFonts({
		Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});
	if (!loaded) return <AppLoading />;
	return (
		<>
			<SafeAreaView style={styles.container}>
				<NavigationContainer>
					<Root />
				</NavigationContainer>
			</SafeAreaView>
			<StatusBar hidden={true} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
