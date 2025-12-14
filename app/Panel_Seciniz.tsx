import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Button, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App3() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={styles.container2}>
        {/* <Image
          alt="App Logo"
          resizeMode="contain"
          style={styles.headerImg1}
          source={require("../assets/images/icon.png")}
        /> */}

        <FontAwesome5
          name="user-md"
          size={180}
          color="#000"
          style={styles.headerImg1}
        />

        <View style={styles.buttonBox}>
          <Button title="Doktorum" onPress={doctorButtonPressed} color="#fff" />
        </View>

        {/* <Image
          alt="App Logo"
          resizeMode="contain"
          style={styles.headerImg}
          source={require("../assets/images/icon.png")}
        /> */}

        <Ionicons
          name="person"
          size={180}
          color="#000"
          style={styles.headerImg}
        />

        {/*Alternative one to the user icon*/}
        {/* <MaterialCommunityIcons
          name="account-group"
          size={180}
          color="#000"
          style={styles.headerImg}
        /> */}
        <View style={styles.buttonBox}>
          <Button
            title="Kullanıcıyım"
            onPress={userButtonPressed}
            color="#fff"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const userButtonPressed = () => {
  router.push("/login_user");
  console.log("tüketici -> login");
};

const doctorButtonPressed = () => {
  router.push("/login_page");
  console.log("üretici -> login");
};

const styles = StyleSheet.create({
  buttonBox: {
    width: 200,
    marginBottom: 16,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#075eec",
  },

  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerImg1: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 2,
    marginTop: 50,
    marginLeft: 60,
  },
  headerImg: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: -5,
    marginTop: 50,
    marginLeft: 40,
  },
});
