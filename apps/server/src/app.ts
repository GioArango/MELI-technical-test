import { Server } from "./presentation/server";

(async() => {
    main();
})();

function main(){
    const app = new Server();

    app.start()
}