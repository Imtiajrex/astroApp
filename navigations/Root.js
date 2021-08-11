import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native-reanimated";
import Home from "../screens/Home";
import Articles from "../screens/Articles";
import Article from "../screens/Article";
const forFade = ({ current, closing }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});
const Stack = createSharedElementStackNavigator();

const options = {
	animationTypeForReplace: "pop",
	gestureEnabled: false,
	headerBackTitleVisible: false,
	transitionSpec: {
		open: {
			animation: "timing",
			config: { duration: 350, easing: Easing.inOut(Easing.ease) },
		},
		close: {
			animation: "timing",
			config: { duration: 350, easing: Easing.inOut(Easing.ease) },
		},
	},
	cardStyleInterpolator: forFade,
};
export default function Root() {
	return (
		<Stack.Navigator initialRouteName={"Home"} headerMode="none">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Articles" component={Articles} />
			<Stack.Screen
				name="Article"
				component={Article}
				options={options}
				sharedElementsConfig={(route, otherRoute, showing) => {
					const { item } = route.params;
					return [
						{
							id: `item.${item.id}.image`,
							animation: "move",
						},
						{
							id: `item.${item.id}.title`,
							animation: "fade",
							resize: "clip",
						},
					];
				}}
			/>
		</Stack.Navigator>
	);
}
