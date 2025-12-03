import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function MainMenu(): React.ReactElement {
  const startButtonPressed = () => {
    router.push("/Panel_Seciniz");
  };
  return (
    <View>
      <Text>Main Menu</Text>
      <Button
        title="Başla"
        onPress={() => {
          startButtonPressed();
        }}
      ></Button>
    </View>
  );
}
