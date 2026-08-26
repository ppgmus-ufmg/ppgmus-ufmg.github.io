// Fica de olho em src/obs/ e copia pra _site/obs/ a cada salvamento — o
// `npm start` (eleventy --serve) não faz isso sozinho porque src/obs está
// excluído do watch dele via .eleventyignore (mesmo motivo de src/slides).
// Uso: node scripts/watch-obs.mjs (roda até você interromper com Ctrl+C).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(AQUI, "..", "src", "obs");
const DEST = path.join(AQUI, "..", "_site", "obs");

function sincronizar() {
  fs.cpSync(SRC, DEST, { recursive: true });
  console.log(`[${new Date().toLocaleTimeString("pt-BR")}] src/obs → _site/obs sincronizado`);
}

sincronizar();
fs.watch(SRC, { recursive: true }, () => sincronizar());
console.log("Observando src/obs/ — deixe este terminal aberto. Ctrl+C para parar.");
