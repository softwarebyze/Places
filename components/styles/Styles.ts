import { StyleSheet } from "react-native";

import COLORS from "../../settings/Colors";
import {
  WIDTH,
  HEIGHT,
  LOGOWIDTH,
  LOGOHEIGHT,
} from "../../settings/Dimensions";

const ELEMENT_WIDTH = 0.87 * WIDTH;
const ELEMENT_HEIGHT = 0.071 * HEIGHT;
const SULI_HEADER_HEIGHT = 0.06 * HEIGHT;

export default StyleSheet.create({
  spaceEvenly: {
    justifyContent: "space-evenly",
  },
  page: {
    backgroundColor: COLORS.white_100,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  fullLogo: {
    width: WIDTH / 2,
    height: (WIDTH * LOGOHEIGHT) / LOGOWIDTH,
    resizeMode: "contain",
  },
  d2Box: {
    width: ELEMENT_WIDTH,
    height: ELEMENT_HEIGHT,
    borderWidth: 1,
  },
  welcomeText: {
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 48,
    textAlign: "center",
  },
  groupLabelText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
  },
  sloganText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
  },
  descriptionText: {
    color: "#888888",
    fontSize: 14,
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
    fontWeight: "700",
    lineHeight: 28.8,
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
    fontWeight: "400",
    lineHeight: 21.6,
    alignItems: "flex-start",
  },
  inputSubtext: {
    fontSize: 13,
    fontWeight: "400",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0.05 * ELEMENT_WIDTH,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
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
    fontWeight: "400",
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
  whiteText: {
    color: COLORS.white_100,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.white_100,
    gap: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    width: "48%",
    height: "35%",
  },
  blackText: {
    color: "black",
  },
  borderRadii: {
    borderRadius: 10,
  },
  topBorderRadii: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dropdownHeader: {
    padding: 16,
    backgroundColor: COLORS.white_100,
    color: COLORS.dark_grey,
  },
  dropdownHeaderActive: {
    borderBottomWidth: 0,
  },
  blueBorder: {
    borderWidth: 1,
    borderColor: COLORS.primary1_100,
  },
  fullWidth: {
    width: ELEMENT_WIDTH,
  },
  dropdownItem: {
    width: ELEMENT_WIDTH,
    padding: 16,
    backgroundColor: COLORS.white_100,
  },
  backgroundWhite: {
    backgroundColor: COLORS.white_100,
  },
  dropdownMargin: {
    marginVertical: 24,
  },
  tagNotSelected: {
    backgroundColor: COLORS.white_100,
    color: COLORS.dark_grey,
    borderColor: COLORS.light_grey,
  },
  tagSelected: {
    backgroundColor: COLORS.orange,
    color: COLORS.white_100,
    borderColor: COLORS.orange,
  },
  tagNotSelectedText: {
    color: COLORS.dark_grey,
    fontSize: 14,
    fontWeight: "600",
  },
  tagSelectedText: {
    color: COLORS.white_100,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryText: {
    fontWeight: "600",
    fontSize: 20,
  },
  catPageGrid: {
    flexDirection: "row",
    height: 64,
    borderRadius: 10,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 16,
  },
  catPageInfo: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 9,
  },
  catPageMemberInfo: {
    marginLeft: 15,
  },
  catPageLocationText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  catPageMembersText: {
    fontSize: 13,
    color: "gray",
  },
  catPageArrow: {
    alignSelf: "center",
    marginHorizontal: 20,
  },
  genderInput: {
    width: ELEMENT_WIDTH,
  },
  sheetHeader: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray1_100,
    alignItems: "center",
  },
  textButton: {
    textDecorationLine: "underline",
    color: COLORS.primary1_100,
    fontSize: 16,
    marginTop: 24,
  },
});
