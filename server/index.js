import { areSetAndTheSameType } from "are-set";
import { createServer } from "wsnet-server";
import fs, { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { error, log } from "console";
import securifyPath from "./utils/securify-path.js";
import hash from "./utils/hash.js";
import path from "path";

createServer({ port: 8080 }, async client => {
    var user = false

    client.onGet("login", async data => {
        if (!areSetAndTheSameType(data, [["user", "string"], ["password", "string"]]))
            return false

        const passwordFilePath = securifyPath("data", "user", data.user, "password.txt")

        if (!existsSync(passwordFilePath))
            return false

        const userPassword = (await fs.readFile(passwordFilePath)).toString("utf-8")

        if (hash(data.password) == userPassword) {
            user = data.user
            return true
        }

        return false
    })

    client.onGet("create-account", async data => {
        if (!areSetAndTheSameType(data, [["user", "string"], ["password", "string"]]))
            return false

        const passwordFilePath = securifyPath("data", "user", data.user, "password.txt")

        if (existsSync(passwordFilePath))
            return false

        try {
            await mkdir(path.dirname(passwordFilePath), { recursive: true })

            writeFile(passwordFilePath, hash(data.password), "utf-8")

            user = data.user

            return true
        } catch (error) {
            return false
        }
    })
})

process.on("uncaughtException", err => error(err))