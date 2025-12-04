import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainMenu(): React.ReactElement {
  const startButtonPressed = () => {
    router.push("/Panel_Seciniz");
  };
  return (
    <SafeAreaView>
      <Text>Main Menu</Text>
      <Button
        title="Başla"
        onPress={() => {
          startButtonPressed();
        }}
      ></Button>
    </SafeAreaView>
  );
}
