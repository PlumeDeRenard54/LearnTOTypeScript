//Script de test du server/client
import { ServerSock } from "../Server/ServerSock.js";
import { ClientSock } from "./ClientSock.js";
let server = ServerSock.getInstance();
let client = ClientSock.getInstance();
server.getUsers();
//# sourceMappingURL=LogInScript.js.map