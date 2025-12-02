import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View>
      <Text>Main Screen</Text>
      <Text>
        Here users will be able to see their helath data that has been recorded
        and analyzed from their breath samples
      </Text>

      <Text>Analiz Sonuçları:</Text>

      <Text> - Son 1 Ay: </Text>
      <Text> - Son 3 Ay: </Text>
      <Text> - Son 6 Ay: </Text>
      <Text> - Son 1 Yıl: </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
