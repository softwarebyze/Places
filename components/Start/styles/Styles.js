import { StyleSheet } from "react-native";
import {
  WIDTH,
  HEIGHT,
  LOGOWIDTH,
  LOGOHEIGHT,
} from "../../../settings/Dimensions";
import COLORS from "../../../settings/Colors";

const ELEMENT_WIDTH = 0.87 * WIDTH;
const ELEMENT_HEIGHT = 0.071 * HEIGHT;
const SULI_HEADER_HEIGHT = 0.06 * HEIGHT;

export default new StyleSheet.create({
  spaceEvenly: {
    justifyContent: "space-evenly",
  },
  page: {
    backgroundColor: COLORS.white_100,
    flex: 1,
    alignItems: "center",
  },
  fullLogo: {
    width: WIDTH / 2,
    height: (WIDTH * LOGOHEIGHT) / LOGOWIDTH,
    resizeMode: "contain",
  },
  d1Box: {
    width: ELEMENT_WIDTH,
  },
  d2Box: {
    width: ELEMENT_WIDTH,
    height: ELEMENT_HEIGHT,
    borderWidth: 1,
  },
  welcomeText: {
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 48,
    textAlign: "center",
  },
  sloganText: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
  },
  suliHeader: {
    width: WIDTH,
    paddingLeft: 0.05 * WIDTH,
    paddingRight: 0.05 * WIDTH,
    height: SULI_HEADER_HEIGHT,
    backgroundColor: COLORS.white_100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  suliHeaderText: {
    color: COLORS.secondary_100,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 28.8,
  },
  temp_suliX: {
    color: COLORS.secondary_100,
    fontSize: 24,
    fontWeight: 200,
    lineHeight: 28.8,
  },
  suliMain: {
    backgroundColor: COLORS.white_100,
    flexDirection: "column",
    alignItems: "center",
  },
  suliInputs: {
    backgroundColor: COLORS.white_100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  suliContinues: {
    width: WIDTH,
    backgroundColor: COLORS.white_100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputLabel: {
    color: COLORS.secondary_100,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 21.6,
    alignItems: "flex-start",
  },
  inputSubtext: {
    fontSize: 9,
    fontWeight: 400,
    lineHeight: 10.8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0.05 * ELEMENT_WIDTH,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 400,
  },
  divider: {
    width: ELEMENT_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0.02 * HEIGHT,
  },
  dividerText: {
    fontStyle: "normal",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 22,
    paddingHorizontal: 5,
  },
  line: {
    flexGrow: 1,
    height: 1,
  },
  startButton: {
    marginBottom: 0.02 * HEIGHT,
  },
});
