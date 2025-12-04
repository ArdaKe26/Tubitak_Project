import { initializeApp } from "@firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const firebaseConfig = {
  apiKey: "AIzaSyBVU4KPRdEKNdg0tt2hep4Ymy8RlatH_GM",
  authDomain: "ekinoks-database.firebaseapp.com",
  projectId: "ekinoks-database",
  storageBucket: "ekinoks-database.firebasestorage.app",
  messagingSenderId: "33498627652",
  appId: "1:33498627652:web:c238125d5942c1e1230611",
};

const app = initializeApp(firebaseConfig);

export default function LoginScreen(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const auth = getAuth(app);

  const handleResetPassword = async () => {
    if (!resetEmail) {
      Alert.alert("Uyarı", "Lütfen email adresinizi girin.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert(
        "Mail Gönderildi",
        "Şifre sıfırlama bağlantısı email adresinize gönderildi."
      );
      setResetModalVisible(false); // popup kapanır
    } catch (err: any) {
      Alert.alert("Hata", err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // when authenticated go to panel
        router.replace("/(tabs)/main");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Hata", err.message);
      } else {
        Alert.alert("Hata", "Bilinmeyen bir hata oluştu");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          <View style={styles.header}>
            <Image
              resizeMode="contain"
              style={styles.headerImg}
              source={require("../assets/images/icon.png")}
            />
            <Text style={{ fontSize: 31, fontWeight: "700", color: "#075eec" }}>
              Kullanıcı
            </Text>
            <Text style={styles.subtitle}>Tarımda Teknolojiyi Keşfedin!!</Text>
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            placeholder="ornek@gmail.com"
            placeholderTextColor="#6b7280"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Şifre</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            placeholder="********"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            onPress={() => {
              setResetModalVisible(true);
            }}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.passwordForgetText,
                  { color: !pressed ? "#3498db" : "#144c88ff" }, // basılıyken biraz koyulaşır
                ]}
              >
                Şifrenizi mi unuttunuz?
              </Text>
            )}
          </Pressable>

          <View style={styles.buttonContainer}>
            <Button
              title={isLogin ? "Giriş Yap" : "Kayıt ol"}
              onPress={handleAuthentication}
              color="#fff"
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text
              style={styles.toggleText}
              onPress={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Hesabınız Yok mu? Hemen Oluşturun"
                : "Hesabınız Var Mı? Giriş Yapın"}
            </Text>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={resetModalVisible}
            onRequestClose={() => setResetModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Şifre Sıfırlama</Text>
                <Text style={styles.modalDesc}>
                  Şifre sıfırlama bağlantısını göndereceğimiz email adresini
                  girin:
                </Text>

                <TextInput
                  placeholder="ornek@gmail.com"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  style={styles.modalInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={styles.modalButtons}>
                  <Pressable
                    onPress={() => setResetModalVisible(false)}
                    style={styles.modalCancel}
                  >
                    <Text style={styles.modalCancelText}>İptal</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleResetPassword}
                    style={styles.modalConfirm}
                  >
                    <Text style={styles.modalConfirmText}>Gönder</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    marginTop: 8,
  },
  buttonContainer: {
    width: 200,
    marginBottom: 16,
    marginTop: 40,
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
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: -30,
    borderRadius: 30,
  },
  passwordForgetText: {
    textDecorationLine: "underline",
    color: "#3498db",
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#075eec",
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalCancelText: {
    color: "#888",
    fontSize: 15,
  },
  modalConfirm: {
    backgroundColor: "#075eec",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  modalConfirmText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
