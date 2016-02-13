import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export const baseTheme = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.grey700,
    primary2Color: Colors.grey900,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.amber500,
    accent2Color: Colors.amber700,
    accent3Color: Colors.amber900,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.pinkA200
  }
};

export const muiTheme = {
  toggle: {
    trackOffColor: Colors.grey700,
    trackOnColor: Colors.amber700,
    thumbOffColor: Colors.grey900,
    thumbOnColor: Colors.amber900
  }
}