import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Cell from "./components/Cell";
import InfoModal from "./components/InfoModal";
import useGameEngine from "./useGameEngine";
import { LinearGradient } from "expo-linear-gradient";

export default function Game() {
  const {
    currentPlayer,
    cells,
    gameBoard,
    winner,
    isDraw,
    clickCell,
    finishGame,
    resetGame,
  } = useGameEngine();
  const [gameMessage, setGameMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false);
    resetGame();
  }

  useEffect(() => {
    if (winner) setGameMessage(`"${winner}" wins!`);
    if (isDraw) setGameMessage("It's a draw!");

    if (winner || isDraw) {
      finishGame();
      setModalVisible(true);
    }
  }, [winner, isDraw]);

  return (
    <LinearGradient
      style={styles.container}
      colors={["blue", "green"]}
      start={{ x: 0.7, y: 0 }}
    >
      <Text style={styles.currentPlayer}>Current Player: {currentPlayer}</Text>
      <View style={styles.board}>
        {Array.from({ length: cells }).map((_, index) => (
          <Cell
            key={index}
            id={index}
            symbol={gameBoard[index]}
            onPress={() => clickCell(index)}
          />
        ))}
      </View>
      <InfoModal
        open={modalVisible}
        message={gameMessage}
        onClose={() => closeModal()}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  currentPlayer: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  board: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 400,
    height: 300,
  },
});
