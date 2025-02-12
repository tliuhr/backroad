"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBackroadServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const formidable_1 = tslib_1.__importDefault(require("formidable"));
const http = tslib_1.__importStar(require("http"));
const path_1 = tslib_1.__importDefault(require("path"));
const socket_io_1 = require("socket.io");
const path_2 = require("path");
const session_manager_1 = require("./sessions/session-manager");
const startBackroadServer = (options) => {
    return new Promise((resolve) => {
        const app = (0, express_1.default)();
        const server = http.createServer(app);
        const io = new socket_io_1.Server(server, {
            path: '/api/socket.io',
            cors: {},
        });
        app.use(express_1.default.static((0, path_2.join)(__dirname, 'public')));
        app.post('/api/uploads', (req, res) => {
            const form = (0, formidable_1.default)({});
            form.parse(req, (err, fields, files) => {
                // if (err) {
                //   next(err);
                //   return;
                // }
                const sessionId = fields.sessionId?.[0];
                const id = fields.id?.[0];
                if (sessionId && id) {
                    // const file = files.files?.[0]
                    const session = session_manager_1.sessionManager.getSession(sessionId);
                    const value = files.files || [];
                    session?.setValue(id, value);
                    return res.json(value);
                }
            });
        });
        // app.post<
        //   '/api/uploads',
        //   any,
        //   any,
        //   {
        //     sessionId: string;
        //     id: string;
        //   }
        // >('/api/uploads', upload.array('files'), (req, res) => {
        //   const session = sessionManager.getSession(req.body.sessionId);
        //   console.log('received file upload request', req.files, req.files?.length);
        //   return res.json(
        //     session?.uploadManager.setFiles(
        //       req.body.id,
        //       req.files as Express.Multer.File[]
        //     )
        //   );
        // });
        app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'public', 'index.html')));
        server.listen(options.port, () => {
            console.log(`Server started and can be accessed on http://localhost:${options.port}/`);
            if (process.env.BACKROAD_ENV === 'dev') {
                console.log('Backroad is running in development mode. Frontend will be running on a separate address: http://localhost:4200/');
            }
            resolve(io.of(/^\/.+$/));
        });
    });
};
exports.startBackroadServer = startBackroadServer;
//# sourceMappingURL=index.js.map