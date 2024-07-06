import React from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const emojis = [
  { id: 1, emoji: "😄" },
  { id: 2, emoji: "😢" },
  { id: 3, emoji: "😡" },
  { id: 4, emoji: "😎" },
  { id: 5, emoji: "😐" },
  { id: 6, emoji: "😂" },
  { id: 7, emoji: "😍" },
  { id: 8, emoji: "😔" },
  { id: 9, emoji: "😴" },
  { id: 10, emoji: "😇" },
  { id: 11, emoji: "🥳" },
  { id: 12, emoji: "🤔" },
  { id: 13, emoji: "😭" },
  { id: 14, emoji: "😬" },
  { id: 15, emoji: "🤢" },
];

const EmojiModal = ({
  isEmojiModalVisible,
  toggleEmojiModal,
  setSelectedEmoji,
}) => {
  return (
    <Modal
      visible={isEmojiModalVisible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.emojiModalContainer}>
        <View style={styles.emojiContainer}>
          {emojis.map((emojiObj) => (
            <TouchableOpacity
              key={emojiObj.id}
              onPress={() => {
                setSelectedEmoji(emojiObj.emoji); // Emoji statt der ID speichern
                toggleEmojiModal();
              }}
            >
              <Text style={styles.emojiText}>{emojiObj.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default EmojiModal;

const styles = StyleSheet.create({
  emojiModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  emojiContainer: {
    width: wp(80),
    height: hp(25),
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  emojiText: {
    fontSize: 29,
    margin: 10,
  },
});
