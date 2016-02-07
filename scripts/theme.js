import Colors  from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

export default{
    spacing: Spacing,
    fontFamily: 'Roboto Mono, sans-serif',
    palette: {
        primary1Color: "#2b2f3e",
        primary2Color: Colors.grey300,
        primary3Color: Colors.grey300,
        accent1Color: "#7ccfaf",
        accent2Color: Colors.grey300,
        accent3Color: Colors.grey300,
        textColor: "rgba(0, 0, 0, 0.701961)",
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
};