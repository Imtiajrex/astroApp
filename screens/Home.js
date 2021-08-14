import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import colors from "../utils/colors";
import layout from "../utils/layout";
import client from "../utils/client";
import { useEffect } from "react";
import { useState } from "react";
export default function Home({ navigation }) {
	const ref = useRef();
	const [trivias, setTrivias] = useState([]);
	const getTrivias = async () => {
		try {
			const trv = await client.getEntries({ content_type: "trivias" });
			setTrivias(trv.items);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		console.clear();
		getTrivias();
	}, []);
	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo.png")} style={styles.logo} />
			<TouchableOpacity
				style={styles.article}
				onPress={() => navigation.push("Articles")}
			>
				<Text style={styles.article_text}>Immersive Articles</Text>

				<Ionicons name="chevron-forward" size={32} color={colors.primary} />
			</TouchableOpacity>
			<Text style={styles.title}>Today's Trivias</Text>
			{trivias.length > 0 && (
				<Carousel
					layout={"stack"}
					ref={ref}
					layoutCardOffset={0}
					data={trivias}
					sliderWidth={layout.width}
					contentContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					itemWidth={layout.width}
					renderItem={({ item }) => (
						<View style={styles.trivia}>
							<Image
								source={{ uri: `https:${item.fields.image.fields.file.url}` }}
								style={styles.trivia_image}
							/>
							{console.log(`https:${item.fields.image.fields.file.url}`)}
							<View style={styles.overlay} />
							<Text style={styles.trivia_text}>{item.fields.trivia}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		padding: 20,
		flex: 1,
		paddingTop: 180,
	},
	logo: {
		width: 130,
		height: 80,
		position: "absolute",
		top: 20,
		left: "50%",
		transform: [{ translateX: -45 }],
		zIndex: 999,
	},
	article: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	article_text: {
		fontSize: 22,
		color: colors.primary,

		fontFamily: "Roboto",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 20,
		marginTop: 40,
		fontFamily: "Roboto-Bold",

		color: colors.text,
	},
	trivia: {
		width: layout.width * 0.85,
		height: layout.width * 0.85,
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1,
		borderRadius: 20,
		// overflow: "hidden",
		// position: "relative",
	},
	trivia_image: {
		position: "absolute",
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		zIndex: -99,
		borderRadius: 20,
	},
	overlay: {
		position: "absolute",
		width: "100%",
		height: "100%",
		zIndex: -9,
		backgroundColor: "rgba(0,0,0,0.65)",
		borderRadius: 20,
	},
	trivia_text: {
		fontSize: 30,
		lineHeight: 40,
		color: colors.text,
		padding: 20,

		fontFamily: "Roboto",
	},
});
