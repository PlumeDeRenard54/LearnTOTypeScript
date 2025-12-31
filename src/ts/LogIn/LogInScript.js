"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerSock_1 = require("../Server/ServerSock");
var ClientSock_1 = require("./ClientSock");
var server = ServerSock_1.ServerSock.getInstance();
var client = ClientSock_1.ClientSock.getInstance();
server.getUsers();
