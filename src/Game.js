import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Cell from "./components/Cell";
import InfoModal from "./components/InfoModal";
import useGameEngine from "./useGameEngine";

export default function Game() {
  const { cells, gameBoard, winner, isDraw, clickCell, finishGame, resetGame } =
    useGameEngine();
  const [gameMessage, setGameMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false);
    resetGame();
  }

  useEffect(() => {
    if (winner) setGameMessage(`${winner} wins!`);
    if (isDraw) setGameMessage("It's a draw!");

    if (winner || isDraw) {
      finishGame();
      setModalVisible(true);
    }
  }, [winner, isDraw]);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
  },
});
