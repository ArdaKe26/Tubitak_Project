import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  getPatients,
  getSelectedPatient,
  setSelectedPatient,
} from "../patientStore";

export default function Infos() {
  const [selected, setSelected] = React.useState("");

  const [data, setData] = useState<{ key: string; value: string }[]>([]);
  const [defaultOption, setDefaultOption] = useState<
    { key: string; value: string } | undefined
  >(undefined);

  useEffect(() => {
    const patients = getPatients();
    // Use patient name as both key and value so the SelectList shows the name
    const mapped = patients.map((p) => ({ key: p, value: p }));
    setData(mapped);
    // if a patient was selected in patients.tsx, pre-select it here
    const sel = getSelectedPatient();
    if (sel) {
      setSelected(sel);
      const opt = mapped.find((m) => m.value === sel);
      if (opt) setDefaultOption(opt);
    } else {
      setDefaultOption(undefined);
    }
  }, []);

  const texty = (): string => {
    if (!selected) return "No patients have been selected";
    return selected;
  };

  const feedback_pressed = () => {
    router.push("/doctor_panel/feedback");
  };

  return (
    <View>
      <Text>Infos Screen</Text>
      <Text>
        Here doctors will be able to see their patients monthly breath
        information
      </Text>

      <SelectList
        setSelected={(val: string) => {
          setSelected(val);
          try {
            setSelectedPatient(val);
          } catch (e) {}
        }}
        data={data}
        save="value"
        defaultOption={defaultOption}
      />

      <Text>{texty()}</Text>

      <Button
        title="Give Feedback"
        onPress={() => {
          feedback_pressed();
        }}
        color={"#0000ffff"}
      ></Button>
    </View>
  );
}
