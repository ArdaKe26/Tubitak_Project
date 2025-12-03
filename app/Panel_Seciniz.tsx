import { router } from "expo-router";
import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";

export default function App3() {
  return (
    <View style={styles.container2}>
      <Image
        alt="App Logo"
        resizeMode="contain"
        style={styles.headerImg1}
        source={require("../assets/images/icon.png")}
      />
      <View style={styles.container}>
        <Button
          title="Doktorum"
          onPress={doctorButtonPressed}
          color="#fff"
        ></Button>
      </View>
      <Image
        alt="App Logo"
        resizeMode="contain"
        style={styles.headerImg}
        source={require("../assets/images/icon.png")}
      />
      <View style={styles.container}>
        <Button
          title="Kullanıcıyım"
          onPress={userButtonPressed}
          color="#fff"
        ></Button>
      </View>
    </View>
  );
}

const userButtonPressed = () => {
  // Redirect user to the login page (app/index.tsx)
  router.push("/login_user");
  console.log("tüketici -> login");
};

const doctorButtonPressed = () => {
  // Redirect doctor to the login page as well
  router.push("/login_page");
  console.log("üretici -> login");
};

const styles = StyleSheet.create({
  container: {
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
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },

  container2: {
    backgroundColor: "#ffff",
  },
  headerImg1: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 2,
    marginTop: 50,
  },
  headerImg: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 30,
  },
});
