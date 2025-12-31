import {ServerSock} from "../Server/ServerSock.js";
import {ClientSock} from "./ClientSock.js";

let server : ServerSock =  ServerSock.getInstance();
let client : ClientSock = ClientSock.getInstance();

server.getUsers();