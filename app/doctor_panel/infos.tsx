import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
    const mapped = patients.map((p, i) => ({ key: String(i + 1), value: p }));
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
    </View>
  );
}
