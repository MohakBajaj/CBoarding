import { Elysia, t } from "elysia";

const app = new Elysia();

app.get("/", () => "Server is Up and Running.");

app.ws("/notes", {
  // validate incoming message
  body: t.Object({
    message: t.String(),
  }),
  message(ws, { message }) {
    ws.send({
      message,
      time: Date.now(),
    });
  },
});

app.listen(4000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
