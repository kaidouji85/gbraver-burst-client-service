// @flow

import {expressApp} from "./express/app";
import {expressHttpServer} from "./express/http-server";
import {socketIOServer} from "./socket-io/socket-io-server";

const app = expressApp();
const httpServer = expressHttpServer(app);
socketIOServer(httpServer);