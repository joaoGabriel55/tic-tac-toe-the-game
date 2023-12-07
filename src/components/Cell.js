import { StyleSheet, Text, View } from "react-native";

export default function Cell({ id, symbol = null, onPress }) {
  return (
    <View style={styles.cell} id={id}>
      <Text style={styles.symbol} onPress={onPress}>
        {symbol}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    fontSize: 24,
    margin: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
  },
  symbol: {
    width: 100,
    height: 100,
    color: "white",
    fontSize: 68,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
