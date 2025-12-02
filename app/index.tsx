import { initializeApp } from "@firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBVU4KPRdEKNdg0tt2hep4Ymy8RlatH_GM",
  authDomain: "ekinoks-database.firebaseapp.com",
  projectId: "ekinoks-database",
  storageBucket: "ekinoks-database.firebasestorage.app",
  messagingSenderId: "33498627652",
  appId: "1:33498627652:web:c238125d5942c1e1230611",
};

const app = initializeApp(firebaseConfig);

// Hide the native header for this route (expo-router / react-navigation)
export const options = {
  headerShown: false,
};

type AuthScreenProps = {
  email: string;
  setEmail: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  isLogin: boolean;
  setIsLogin: (b: boolean) => void;
  handleAuthentication: () => Promise<void> | void;
};

const AuthScreen: React.FC<AuthScreenProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.authContainer}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          style={styles.headerImg}
          source={require("../assets/images/icon.png")}
        />

        <Text style={{ fontSize: 31, fontWeight: "700", color: "#075eec" }}>
          Ekinoks
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
      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Giriş Yap" : "Kayıt ol"}
          onPress={handleAuthentication}
          color="#fff"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Hasabınız Yok mu? Hemen Oluşturun"
            : "Hesabınız Var Mı? Giriş Yapın"}
        </Text>
      </View>
    </View>
  );
};

type AuthenticatedScreenProps = {
  user: any;
  handleAuthentication: () => Promise<void> | void;
};

const AuthenticatedScreen: React.FC<AuthenticatedScreenProps> = ({
  user,
  handleAuthentication,
}) => {
  return <Redirect href={"/Panel_Seciniz"} />;
};

export default function App(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully!");
        }
      }
    } catch (error: unknown) {
      Alert.alert("Şifre Yanlış", "Şifrenizi Doğru Girdiğinizden Emin Olun!!", [
        { text: "Tamam", onPress: () => console.log("OK Pressed") },
      ]);
      // `error` is unknown by default in strict TS. Narrow before using.
      if (error instanceof Error) {
        console.log("şifre yanlış", error.message);
      } else {
        console.log("şifre yanlış", error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen
          user={user}
          handleAuthentication={handleAuthentication}
        />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
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
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
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
});

/*return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./ekinoks_logo.png')} />
          <Text style={styles.title}>
            Hoşgeldiniz! </Text>
          <Text style={{ fontSize: 31, fontWeight: '700', color: '#075eec' }}>Ekinoks</Text>
          <Text style={styles.subtitle}>
            Tarımda Teknolojiyi Keşfedin!!
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={email => setForm({ ...form, email })}
              keyboardType="email-address"
              placeholder="ornek@gmail.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
               />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              clearButtonMode="while-editing"
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
              />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Giriş Yap</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // handle link
            }}>
            <Text style={styles.formLink}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          // handle link
        }}>
        <Text style={styles.formFooter}>
          Hesabınız yok mu?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Hemen kaydolun</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
  
  
  
  <Text style={styles.title}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>
  
   <Text style={styles.title}>
            Hoşgeldiniz! </Text>
  
  
  */

/*const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header 
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
    'flex-direction': null,
    'margin-bottom': null,
  },
  headerImg: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  /** Form 
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    'margin-top': null,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input 
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button 
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },

});*/
