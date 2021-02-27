// @flow

import {httpServer} from "./http/http-server";
import {app} from "./express/app";

httpServer(app);