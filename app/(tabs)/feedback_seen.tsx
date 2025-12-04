import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

export default function feedback_seen() {
  return (
    <SafeAreaView>
      <Text>Feedback Seen Page</Text>
      <Text>
        Here users will be able to see the feedbacks that their doctor has given
        to them
      </Text>
    </SafeAreaView>
  );
}
