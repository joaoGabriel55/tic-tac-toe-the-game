import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function InfoModal({ open, message, onClose }) {
  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={onClose}
      style={{ backgroundColor: "transparent" }}
    >
      <LinearGradient
        style={styles.centeredView}
        colors={["blue", "green"]}
        start={{ x: 0.7, y: 0 }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Play again!</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  modalView: {
    margin: 20,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 36,
    color: "white",
    textAlign: "center",
  },
});
