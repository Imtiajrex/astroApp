import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Image,
	Animated,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import data from "../utils/data";
import layout from "../utils/layout";
import colors from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import client from "../utils/client";
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);
export default function Articles({ navigation }) {
	const scrollY = useRef(new Animated.Value(0)).current;
	const [articles, setArticles] = useState([]);
	const getArticles = async () => {
		try {
			const trv = await client.getEntries({
				content_type: "articles",
				limit: 10,
			});
			setArticles(trv.items);
		} catch (err) {
			console.log("Error:", err);
		}
	};
	useEffect(() => {
		getArticles();
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				style={styles.logo}
				onPress={() => navigation.navigate("Home")}
			>
				<Image source={require("../assets/logo.png")} style={styles.logo} />
			</TouchableOpacity>
			<Animated.FlatList
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				data={articles}
				scrollEventThrottle={16}
				keyExtractor={(_, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				snapToInterval={layout.height}
				decelerationRate={"fast"}
				bounces={false}
				renderItem={({ item, index }) => {
					const inputRange = [
						(index - 0.3) * layout.height,
						index * layout.height,
						(index + 0.3) * layout.height,
					];
					const opacity = scrollY.interpolate({
						inputRange,
						outputRange: [0, 1, 0],
					});
					const translateY = scrollY.interpolate({
						inputRange,
						outputRange: [5, 0, 5],
					});
					const extranslateY = scrollY.interpolate({
						inputRange,
						outputRange: [15, 0, 15],
					});
					return (
						<Article
							item={item}
							opacity={opacity}
							translateY={translateY}
							extranslateY={extranslateY}
							navigation={navigation}
						/>
					);
				}}
			/>
			<Backdrop scrollY={scrollY} data={articles} />
		</View>
	);
}
function Article({ item, opacity, translateY, extranslateY, navigation }) {
	const { title = "", shortDescription = "", featuredImage } = item.fields;

	return (
		<View style={styles.article_wrapper}>
			<TouchableWithoutFeedback
				onPress={() => navigation.push("Article", { item })}
			>
				<View style={styles.article}>
					<SharedElement id={`item.${item.id}.image`}>
						<AnimatedImage
							source={{ uri: `https:${featuredImage.fields.file.url}` }}
							style={{
								...styles.image,
								opacity,
								transform: [{ translateY: extranslateY }],
							}}
						/>
					</SharedElement>
					<SharedElement id={`item.${item.id}.title`}>
						<AnimatedText
							style={{ ...styles.title, opacity, transform: [{ translateY }] }}
						>
							{title}
						</AnimatedText>
					</SharedElement>

					<AnimatedText
						style={{
							...styles.excerpt,
							opacity,
							transform: [{ translateY: extranslateY }],
						}}
					>
						{shortDescription}
					</AnimatedText>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}
function Backdrop({ data, scrollY }) {
	return (
		data.length > 0 && (
			<View
				style={{
					position: "absolute",
					width: layout.width,
					height: layout.height,
					zIndex: -10,
					backgroundColor: colors.background,
				}}
			>
				<FlatList
					data={data}
					keyExtractor={(_, index) => index.toString()}
					contentContainerStyle={{
						flexGrow: 1,
						borderWidth: 1,
					}}
					renderItem={({ item, index }) => {
						const inputRange = [
							(index - 1) * layout.height,
							index * layout.height,
						];
						const opacity = scrollY.interpolate({
							inputRange,
							outputRange: [0, 1],
						});
						return (
							<AnimatedImage
								source={{
									uri: `https:${item.fields.featuredImage.fields.file.url}`,
								}}
								style={{
									position: "absolute",
									...styles.bg_image,
									opacity,
								}}
							/>
						);
					}}
				/>
				<LinearGradient
					colors={["#131313", "transparent", colors.background]}
					locations={[0, 0.35, 1]}
					style={{
						position: "absolute",
						width: layout.width,
						height: layout.height,
					}}
				/>
			</View>
		)
	);
}
const styles = StyleSheet.create({
	logo: {
		width: 85,
		zIndex: 999,
		height: 50,
		position: "absolute",
		top: 20,
		left: "50%",
		transform: [{ translateX: -42.5 }],
	},
	article_wrapper: {
		width: layout.width,
		height: layout.height,
		alignItems: "center",
		padding: 20,
		justifyContent: "flex-end",
	},
	bg_image: {
		width: layout.width,
		height: layout.height,
		resizeMode: "cover",
	},
	article: {
		width: layout.width * 0.8,
		// height: layout.width * 1.2,
		borderRadius: 25,
		padding: 20,
		backgroundColor: colors.background,
		marginBottom: 20,
		zIndex: 99,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 25,
		resizeMode: "cover",
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		color: colors.text,
		marginVertical: 5,
		padding: 10,
		fontFamily: "Roboto-Bold",
	},
	excerpt: {
		fontSize: 16,
		color: colors.textAccent,
		lineHeight: 25,
		padding: 10,
		paddingTop: 0,

		fontFamily: "Roboto",
	},
});
