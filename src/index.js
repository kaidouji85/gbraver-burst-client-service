// @flow

import {httpServer} from "./http/http-server";
import {app} from "./express/app";
import {socketIOServer} from "./socket-io/socket-io-server";

const http = httpServer(app);
socketIOServer(http);