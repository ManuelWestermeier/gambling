import { areSetAndTheSameType } from "are-set";
import { createServer } from "wsnet-server";
import fs, { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { error, log } from "console";
import securifyPath from "./utils/securify-path.js";
import hash from "./utils/hash.js";
import path from "path";
import GET_DEFAULT_USER_DATA from "./utils/default-user-data.js";
import { randomInt } from "crypto";

createServer({ port: 8080 }, async (client) => {
  var user = false;

  client.onGet("login", async (data) => {
    if (
      !areSetAndTheSameType(data, [
        ["user", "string"],
        ["password", "string"],
      ])
    )
      return false;

    const passwordFilePath = securifyPath(
      "data",
      "user",
      data.user,
      "password"
    );

    if (!existsSync(passwordFilePath)) return false;

    const userPassword = await fs.readFile(passwordFilePath, "utf-8");

    if (hash(data.password) == userPassword) {
      user = data.user;
      return true;
    }

    return false;
  });

  client.onGet("create-account", async (data) => {
    if (
      !areSetAndTheSameType(data, [
        ["user", "string"],
        ["password", "string"],
      ])
    )
      return false;

    const passwordFilePath = securifyPath(
      "data",
      "user",
      data.user,
      "password"
    );

    if (existsSync(passwordFilePath)) return false;

    try {
      await mkdir(path.dirname(passwordFilePath), { recursive: true });

      writeFile(passwordFilePath, hash(data.password), "utf-8");
      writeFile(
        securifyPath("data", "user", data.user, "data"),
        JSON.stringify(GET_DEFAULT_USER_DATA(data.user)),
        "utf-8"
      );

      user = data.user;

      return true;
    } catch (error) {
      return false;
    }
  });

  client.onGet(
    "user-data",
    async (user) =>
      await readFile(securifyPath("data", "user", user, "data"), "utf-8")
  );

  client.onGet("play:heads-or-trails", async (data) => {
    if (
      !user ||
      !areSetAndTheSameType(data, [
        ["money", "number"],
        ["selectedIsHead", "boolean"],
      ])
    ) {
      return "error";
    }

    const userData = JSON.parse(
      await readFile(securifyPath("data", "user", user, "data"), "utf-8")
    );

    if (data.money < 0 || userData.money < data.money) return "error";

    const isWon = randomInt(2) > 0.5 == data.selectedIsHead;

    userData.money += isWon ? data.money : -data.money;
    userData.gamesPlayed++;

    writeFile(
      securifyPath("data", "user", user, "data"),
      JSON.stringify(userData),
      "utf-8"
    );

    client.say("change-user-data", userData)

    return isWon;
  });
});

process.on("uncaughtException", (err) => error(err));
