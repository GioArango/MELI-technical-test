import { config } from "./config";
import { AppRoutes } from "./routes";
import { Server } from "./server";

(async () => {
    main();
})();

function main() {
    const app = new Server({
        port: config.PORT,
        public_path: config.PUBLIC_PATH,
        routes: AppRoutes.routes
    });

    app.start()
}