import { useThemeStore } from "@/store/ThemeStore";
import { Text, View } from "react-native";

type ChatMessage = {
  role: "user" | "assistant" | string;
  content: string;
};

export default function ChatCard({ message }: { message: ChatMessage }) {
  const { theme } = useThemeStore();
  const isUser = message.role === "user";

  return (
    <View className={`flex-row ${isUser ? "justify-end" : "justify-start"}`}>
      <View
        className="max-w-[82%] rounded-2xl px-4 py-3"
        style={{
          backgroundColor: isUser ? theme.colors.primary : "#E8FFE9",
        }}
      >
        <Text
          className="font-mregular text-sm leading-5"
          style={{ color: isUser ? "#fff" : "#2F2F2F" }}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}
