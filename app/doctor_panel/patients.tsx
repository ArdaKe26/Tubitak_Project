// import React from "react";
// import { Text, View } from "react-native";

// export default function Paitents() {
//   return (
//     <View>
//       <Text>Paitents Screen</Text>
//       <Text>
//         Here doctors will be able add new patients as well as clicking the old
//         ones to see their infrmation
//       </Text>
//     </View>
//   );
// }

import {
  Alert,
  Appearance,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getAuth, signOut } from "@firebase/auth";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPatients, setPatients, setSelectedPatient } from "../patientStore";

export default function HomeScreen() {
  type Task = {
    id: number;
    text: string;
  };

  const colorScheme = Appearance.getColorScheme();

  const [text, setText] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const addTask = () => {
    if (text.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    setText("");
    try {
      setPatients(updated.map((t) => t.text));
    } catch (e) {}
  };

  const deleteTask = (id: number) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    try {
      setPatients(updated.map((t) => t.text));
    } catch (e) {}
  };

  const patientPressed = (patientText: string) => {
    try {
      setSelectedPatient(patientText);
    } catch (e) {}
    router.push("/doctor_panel/infos");
  };

  useEffect(() => {
    // Initialize local tasks from store on mount
    try {
      const ps = getPatients();
      if (ps && ps.length) {
        setTasks(ps.map((p, i) => ({ id: Date.now() + i, text: p })));
      }
    } catch (e) {}
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Redirect to login page after sign out
      router.replace("/Panel_Seciniz");
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Çıkış Hatası", err.message);
      } else {
        Alert.alert("Çıkış Hatası", "Bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.itemView}>
        <ThemedText style={styles.titleText}>Patients List</ThemedText>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textBox}
            placeholder="Add a new patient"
            placeholderTextColor="#ccc"
            value={text}
            onChangeText={setText}
          />
          <View style={styles.button}>
            <Button
              title="Add"
              color={"white"}
              onPress={() => {
                addTask();
              }}
            />
          </View>
        </View>

        <View style={styles.taskList}>
          {tasks.map((task, index) => (
            <Pressable
              key={index}
              style={styles.taskItem}
              onPress={() => {
                patientPressed(task.text);
              }}
            >
              <ThemedText style={styles.taskText}>{task.text}</ThemedText>
              <Button
                title="❌"
                color="red"
                onPress={() => deleteTask(task.id)}
              />
            </Pressable>
          ))}
          <View style={styles.logoutWrapper}>
            <Button title="Çıkış Yap" color="#d9534f" onPress={handleLogout} />
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000000ff",
  },
  itemView: {
    // backgroundColor: "#000000ff",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
    padding: 10,
  },
  textBox: {
    height: 40,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#525252ff",
    borderRadius: 20,
    // color: "#fff",
    paddingLeft: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    width: "20%",
    backgroundColor: "#005cb8ff",
    borderRadius: 20,
    justifyContent: "center",
  },
  taskList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#1a1a1a",
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#525252ff",
  },

  taskText: {
    fontSize: 16,
  },
  logoutWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: 200,
  },
});
