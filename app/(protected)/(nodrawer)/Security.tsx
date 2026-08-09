import SettingsScreen from "@/components/SettingsScreen";
import { Switch } from "react-native";
export default function Security() {
  return (
    <SettingsScreen
      title="Security"
      subtitle="Keep your Campuso account protected"
      items={[
        {
          icon: "key-outline",
          title: "Change password",
          note: "Update your current password",
        },
        {
          icon: "phone-portrait-outline",
          title: "Biometric login",
          note: "Use Face ID or fingerprint",
          trailing: <Switch value trackColor={{ true: "#008751" }} />,
        },
        {
          icon: "shield-checkmark-outline",
          title: "Two-step verification",
          note: "Add an extra layer of security",
        },
        {
          icon: "log-in-outline",
          title: "Active sessions",
          note: "Review devices signed into your account",
        },
      ]}
    />
  );
}
