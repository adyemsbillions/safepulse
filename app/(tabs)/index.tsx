import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Switch,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";

// Ensure notifications are handled properly
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function IndexScreen() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [alarmsEnabled, setAlarmsEnabled] = useState(true);
  const [scheduledAlarms, setScheduledAlarms] = useState<
    Notifications.NotificationRequest[]
  >([]);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      console.log("Notification Permissions:", status);
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable notifications in settings."
        );
      }
    };
    checkPermissions();
  }, []);

  // ✅ Ensure notifications are received inside the component
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert(
          notification.request.content.title ?? "Notification",
          notification.request.content.body ?? "No content available."
        );
      }
    );
    return () => subscription.remove(); // Cleanup listener
  }, []);

  const fetchScheduledAlarms = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();
    setScheduledAlarms(notifications);
  };

  useEffect(() => {
    fetchScheduledAlarms();
  }, []);

  const toggleAlarms = (value: boolean) => {
    setAlarmsEnabled(value);
    if (!value) {
      cancelAllAlarms();
    }
  };

  // ✅ Function to set a one-time alarm
  const setAlarm = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable notifications in settings."
      );
      return;
    }

    console.log("Scheduling notification...");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔔 Alarm",
        body: "Your alarm is going off!",
        sound: "default",
      },
      trigger: { seconds: 10 },
    });

    Alert.alert("Alarm Set", "Notification will appear in 10 seconds.");
    fetchScheduledAlarms();
  };

  const cancelAllAlarms = async () => {
    console.log("🛑 Cancelling all alarms...");
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert(
      "Alarm Canceled",
      "All scheduled notifications have been cleared."
    );
    setScheduledAlarms([]);
  };

  // ✅ Function to trigger an instant alarm
  const triggerAlarm = async () => {
    console.log("🚀 Triggering instant alarm...");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚨 Immediate Alarm!",
        body: "This should appear instantly.",
        sound: "default",
        priority: "high",
      },
      trigger: null, // 🚀 Instant notification
    });
  };

  // ✅ Function to set a weekly alarm
  const setWeeklyAlarm = async () => {
    if (!alarmsEnabled) {
      Alert.alert("Alarms Disabled", "Enable alarms to schedule a new one.");
      return;
    }

    const trigger: Notifications.CalendarTriggerInput = {
      type: "calendar" as any,
      hour: 9,
      minute: 0,
      repeats: true,
      weekday: selectedDay,
    };

    console.log(`📆 Scheduling alarm for day ${selectedDay}`);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📅 Weekly Alarm",
        body: `It's time! Your scheduled alarm for this day.`,
        sound: "default",
      },
      trigger,
    });

    Alert.alert(
      "Weekly Alarm Set",
      `Your alarm for day ${selectedDay} is scheduled.`
    );
    fetchScheduledAlarms();
  };

  const getDayName = (weekday: number): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[weekday - 1] || "Unknown";
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#121212" />
      <Text style={styles.title}>Silent Alarm</Text>

      <Switch
        value={alarmsEnabled}
        onValueChange={toggleAlarms}
        thumbColor={alarmsEnabled ? "#1DB954" : "#ff3b30"}
      />
      <Text style={styles.switchText}>
        {alarmsEnabled ? "Alarms Enabled" : "Alarms Disabled"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={setAlarm}>
        <Text style={styles.buttonText}>Set Alarm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={cancelAllAlarms}
      >
        <Text style={styles.buttonText}>Cancel Alarm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFD700" }]}
        onPress={triggerAlarm}
      >
        <Text style={styles.buttonText}>Trigger Alarm Now</Text>
      </TouchableOpacity>

      <Text style={styles.weeklyTitle}>Set Weekly Alarms:</Text>
      <Picker
        selectedValue={selectedDay}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setSelectedDay(Number(itemValue))}
      >
        <Picker.Item label="Sunday" value={1} />
        <Picker.Item label="Monday" value={2} />
        <Picker.Item label="Tuesday" value={3} />
        <Picker.Item label="Wednesday" value={4} />
        <Picker.Item label="Thursday" value={5} />
        <Picker.Item label="Friday" value={6} />
        <Picker.Item label="Saturday" value={7} />
      </Picker>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1DB954" }]}
        onPress={setWeeklyAlarm}
      >
        <Text style={styles.buttonText}>
          Set Weekly Alarm for {selectedDay}
        </Text>
      </TouchableOpacity>

      <Text style={styles.scheduledTitle}>Scheduled Alarms:</Text>
      <FlatList
        data={scheduledAlarms}
        keyExtractor={(item) => item.identifier.toString()}
        renderItem={({ item }) => {
          const trigger =
            item.trigger as Notifications.NotificationTriggerInput | null;

          console.log("🔍 Scheduled Alarm Item:", item);
          console.log("🔍 Scheduled Trigger:", trigger);

          let triggerText = "Unknown Trigger";

          if (trigger) {
            if ("seconds" in trigger) {
              triggerText = `In ${trigger.seconds} seconds`;
            } else if ("dateComponents" in trigger) {
              console.log("✅ Calendar Trigger Found:", trigger.dateComponents);

              const { weekday, hour, minute } = trigger.dateComponents as {
                weekday?: number;
                hour?: number;
                minute?: number;
              };

              if (
                weekday !== undefined &&
                hour !== undefined &&
                minute !== undefined
              ) {
                triggerText = `Every ${getDayName(weekday)} at ${hour}:${minute
                  .toString()
                  .padStart(2, "0")}`;
              }
            } else {
              triggerText = JSON.stringify(trigger); // Debug fallback
            }
          }

          console.log("📢 Final Trigger Text:", triggerText);

          return (
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#1DB954",
              }}
            >
              <Text>{triggerText}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#ff3b30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  scheduledTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  alarmItem: {
    color: "#fff",
    padding: 10,
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 250,
    color: "#fff",
    backgroundColor: "#1DB954",
    borderRadius: 10,
    marginBottom: 20,
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
