import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";

interface AlarmButtonProps {
  title: string;
  onPress: () => void;
}

const AlarmButton: React.FC<AlarmButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const AlarmScreen: React.FC = () => {
  const colorScheme = useColorScheme(); // ✅ Detect light/dark mode
  const isDarkMode = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
    >
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? "#000" : "#fff"}
      />

      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
        Silent Alarm
      </Text>

      <AlarmButton
        title="Set Alarm"
        onPress={() => console.log("Alarm Set!")}
      />
      <AlarmButton
        title="Cancel Alarm"
        onPress={() => console.log("Alarm Canceled!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AlarmScreen;
