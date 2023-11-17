/**
 * This file is part of Hide Top Bar
 *
 * Copyright 2020 Thomas Vogt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as Extension from 'resource:///org/gnome/shell/extensions/extension.js';

import { PanelVisibilityManager } from './panelVisibilityManager.js';
import { DEBUG } from './convenience.js';

export default class HideTopBar extends Extension.Extension {
    enable() {
        DEBUG("enable()");
        this.settings = this.getSettings();
        const monitorIndex = Main.layoutManager.primaryIndex;
        this.panelVisibilityManager = new PanelVisibilityManager(this.settings, monitorIndex);
    }

    disable() {
        DEBUG("disable()");
        this.panelVisibilityManager.destroy();
        this.settings.run_dispose();

        this.panelVisibilityManager = null;
        this.settings = null;
    }
}
