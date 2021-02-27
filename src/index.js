// @flow

import {httpServer} from "./express/http-server";
import {app} from "./express/app";
import {socketIOServer} from "./socket-io/socket-io-server";

const http = httpServer(app);
socketIOServer(http);