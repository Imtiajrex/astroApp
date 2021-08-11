import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import layout from "../utils/layout";
import { m } from "framer-motion";
export default function Article({ route, navigation }) {
	const { item } = route.params;
	return (
		<View style={styles.container}>
			<View style={styles.back_wrapper}>
				<TouchableOpacity
					style={styles.back}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="chevron-back" size={24} color={colors.text} />
				</TouchableOpacity>
				<Text style={styles.back_title}>Articles</Text>
			</View>
			<ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
				<SharedElement id={`item.${item.id}.image`}>
					<Image source={item.image} style={styles.image} />
				</SharedElement>
				<SharedElement id={`item.${item.id}.title`}>
					<Text style={styles.title}>{item.title}</Text>
				</SharedElement>
				<Text style={styles.description}>
					{item.excerpt}
					{item.excerpt}
					{item.excerpt}
				</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	wrapper: {
		flex: 1,
		padding: 20,
		backgroundColor: colors.background,
	},
	image: {
		width: "100%",
		height: 225,
		resizeMode: "cover",
		borderRadius: 15,
	},
	title: {
		fontSize: 22,
		marginVertical: 20,
		color: colors.text,
		fontWeight: "bold",
		lineHeight: 30,
		fontFamily: "Roboto-Bold",
	},
	description: {
		lineHeight: 28,
		fontSize: 18,
		color: colors.textAccent,
		fontFamily: "Roboto",
	},
	back_wrapper: {
		width: layout.width,
		padding: 20,
		justifyContent: "space-between",
		position: "absolute",
		bottom: 0,
		left: 0,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.background,
		zIndex: 100,
	},
	back_title: {
		flexGrow: 1,
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		textAlign: "right",
		marginRight: 10,
		fontFamily: "Roboto-Bold",
	},
});
