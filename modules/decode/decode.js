import { exitPrompt } from "../utils/prompts.js";

export async function decode(fileBuffer, encoding) {
    if (!Buffer.isEncoding(encoding)) {
        await exitPrompt("Encoding is not valid, should we default to utf-8 and continue?", false);
        encoding = 'utf-8';
    }

    return fileBuffer.toString(encoding);
}