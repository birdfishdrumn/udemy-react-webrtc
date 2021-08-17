"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("@material-ui/core/Button");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Box_1 = require("@material-ui/core/Box");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var Container_1 = require("@material-ui/core/Container");
function Copyright() {
    return (react_1["default"].createElement(Typography_1["default"], { variant: "body2", color: "textSecondary", align: "center" },
        'Copyright © ',
        react_1["default"].createElement(Link_1["default"], { color: "inherit", href: "https://www.udemy.com/user/ham-san/" }, "bird"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}); });
function SignIn(_a) {
    var rtcClient = _a.rtcClient;
    var label = 'あなたの名前';
    var classes = useStyles();
    var _b = react_1.useState(true), disabled = _b[0], setDisabled = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(false), isComposed = _d[0], setIsComposed = _d[1];
    // useEffect(() => {
    //   const disabled = name === '';
    //   setDisabled(disabled);
    // }, [name]);
    // const initializeLocalPeer = useCallback(
    //   async (e) => {
    //     await rtcClient.startListening(name);
    //     e.preventDefault();
    //   },
    //   [name, rtcClient]
    // );
    // if (rtcClient.localPeerName !== '') return <></>;
    return (react_1["default"].createElement(Container_1["default"], { component: "main", maxWidth: "xs" },
        react_1["default"].createElement(CssBaseline_1["default"], null),
        react_1["default"].createElement("div", { className: classes.paper },
            react_1["default"].createElement(Typography_1["default"], { component: "h1", variant: "h5" },
                label,
                "\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"),
            react_1["default"].createElement("form", { className: classes.form, noValidate: true },
                react_1["default"].createElement(TextField_1["default"], { autoFocus: true, fullWidth: true, label: label, margin: "normal", name: "name", onChange: function (e) { return setName(e.target.value); }, 
                    // onCompositionEnd={() => setIsComposed(false)}
                    // onCompositionStart={() => setIsComposed(true)}
                    // onKeyDown={async (e:any) => {
                    //   if (isComposed) return;
                    //   if (e.target.value === '') return;
                    //   if (e.key === 'Enter') await initializeLocalPeer(e);
                    // }}
                    required: true, value: name, variant: "outlined" }),
                react_1["default"].createElement(Button_1["default"], { className: classes.submit, color: "primary", disabled: disabled, fullWidth: true, 
                    // onClick={async (e) => await initializeLocalPeer(e)}
                    type: "submit", variant: "contained" }, "\u6C7A\u5B9A"))),
        react_1["default"].createElement(Box_1["default"], { mt: 8 },
            react_1["default"].createElement(Copyright, null))));
}
exports["default"] = SignIn;
