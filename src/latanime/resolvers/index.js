import { resolveMp4Upload } from "./mp4upload.js";
import { resolveHexload } from "./hexload.js";
import { resolveMixdrop } from "./mixdrop.js";

// ======================================================
// SWITCH DE SOURCES
// ======================================================
// true/false para activar o desactivar cada servidor sin tocar el resto
// del código. Un source en false ni siquiera se resuelve.

export const ENABLED_SOURCES = {
    MP4Upload: true,
    Hexload: true,
    Mixdrop: true
};

// ======================================================
// ORDEN DE SALIDA
// ======================================================
// Orden en que aparecen los servidores en la lista de streams
// (el primero sale arriba). Cambia el orden de esta lista para
// cambiar la prioridad. Un servidor que no esté aquí queda al final.

export const SOURCE_ORDER = [
    "MP4Upload",
    "Hexload",
    "Mixdrop"
];

// ======================================================
// REGISTRO
// ======================================================
// Para sumar un nuevo source: 1) crear su resolver en esta carpeta,
// 2) agregarlo aquí, 3) añadirlo a ENABLED_SOURCES y SOURCE_ORDER.

const RESOLVERS = {
    MP4Upload: resolveMp4Upload,
    Hexload: resolveHexload,
    Mixdrop: resolveMixdrop
};

function findSourceKey(serverName) {

    const name =
        String(serverName || "")
            .toLowerCase()
            .trim();

    return Object.keys(RESOLVERS).find(
        key => name.includes(key.toLowerCase())
    ) || null;
}

export function getResolver(serverName) {

    const key =
        findSourceKey(serverName);

    if (!key || !ENABLED_SOURCES[key]) {
        return null;
    }

    return RESOLVERS[key];
}

// Posición del servidor en SOURCE_ORDER (menor = más arriba).
export function sourceRank(serverName) {

    const key =
        findSourceKey(serverName);

    const index =
        key ? SOURCE_ORDER.indexOf(key) : -1;

    return index === -1
        ? SOURCE_ORDER.length
        : index;
}
