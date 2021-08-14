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
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import layout from "../utils/layout";
import MyWebView from "react-native-webview-autoheight";

import RenderHtml from "react-native-render-html";

export default function Article({ route, navigation }) {
	const { item } = route.params;
	const [source, setSource] = React.useState(
		documentToHtmlString(item.fields.article)
	);
	React.useEffect(() => {
		let newSource = source.replace(
			/\<p/g,
			`<p style="color:${colors.textAccent}; line-height: 30px;font-size:18px;"`
		);
		newSource.replace(
			/\<a/g,
			`<a style="color:${colors.textAccent}; line-height: 30px;font-size:18px;"`
		);
		newSource.replace(
			/\<i/g,
			`<i style="color:${colors.textAccent}; line-height: 30px;font-size:18px;"`
		);

		setSource(newSource);
	}, []);
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
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				style={styles.wrapper}
				showsVerticalScrollIndicator={false}
			>
				<SharedElement id={`item.${item.id}.image`}>
					<Image
						source={{
							uri: `https:${item.fields.featuredImage.fields.file.url}`,
						}}
						style={styles.image}
					/>
				</SharedElement>
				<SharedElement id={`item.${item.id}.title`}>
					<Text style={styles.title}>{item.fields.title}</Text>
				</SharedElement>
				<RenderHtml
					originWhitelist={["*"]}
					contentWidth={layout.width}
					source={{
						html: `${source}`,
					}}
					containerStyle={{ padding: 20, flex: 1 }}
					style={{ backgroundColor: colors.background }}
				/>
				<View
					style={{
						width: 25,
						height: 25,
						borderWidth: 2,
						borderColor: colors.textAccent,
						borderRadius: 20,
						justifyContent: "center",
						alignItems: "center",
						marginVertical: 25,
						marginHorizontal: "45%",
					}}
				/>
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
		padding: 20,
		backgroundColor: colors.background,
	},
	image: {
		width: layout.width - 40,
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
