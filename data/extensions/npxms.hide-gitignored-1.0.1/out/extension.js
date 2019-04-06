"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitignore_hider_1 = require("./gitignore-hider");
const gitignore_reader_1 = require("./gitignore-reader");
const pattern_converter_1 = require("./pattern-converter");
const settings_accessor_1 = require("./settings-accessor");
function activate(context) {
    const gitignoreHider = new gitignore_hider_1.GitignoreHider(new gitignore_reader_1.GitignoreReader(), new pattern_converter_1.PatternConverter(), new settings_accessor_1.SettingsAccessor());
    gitignoreHider.registerCommands(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map