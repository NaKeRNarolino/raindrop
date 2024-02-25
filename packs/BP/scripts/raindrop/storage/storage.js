import * as mc from "@minecraft/server";
import { SliceJSONAt32K } from "raindrop/utils/flatten";
export class NumberStorage {
    constructor(Key) {
        this.key = Key;
    }
    write(value) {
        mc.world.setDynamicProperty(this.key, value);
        return mc.world.getDynamicProperty(this.key);
    }
    access() {
        return mc.world.getDynamicProperty(this.key);
    }
}
export class StringStorage {
    constructor(Key) {
        this.key = Key;
    }
    write(value) {
        mc.world.setDynamicProperty(this.key, value);
        return mc.world.getDynamicProperty(this.key);
    }
    access() {
        return mc.world.getDynamicProperty(this.key);
    }
}
export class BooleanStorage {
    constructor(Key) {
        this.key = Key;
    }
    write(value) {
        mc.world.setDynamicProperty(this.key, value);
        return mc.world.getDynamicProperty(this.key);
    }
    access() {
        return mc.world.getDynamicProperty(this.key);
    }
}
export class JSONStorage {
    constructor(Key) {
        this.key = Key;
    }
    write(value) {
        mc.world.setDynamicProperty(this.key, JSON.stringify(value));
        return value;
    }
    access() {
        return JSON.parse(mc.world.getDynamicProperty(this.key));
    }
}
export class MassiveJSONStorage {
    constructor(Key) {
        this.key = Key;
    }
    write(value) {
        const strso = SliceJSONAt32K(value);
        const strings = strso.strings;
        mc.world.setDynamicProperty(`${this.key}.idx`, strso.idx);
        for (let i = 0; i < strso.idx; i++) {
            mc.world.setDynamicProperty(`${this.key}:${i}`, strings[i]);
        }
        return value;
    }
    access() {
        const idx = mc.world.getDynamicProperty(`${this.key}.idx`);
        const strings = [];
        for (let i = 0; i < idx; i++) {
            strings.push(mc.world.getDynamicProperty(`${this.key}:${i}`));
        }
        return JSON.parse(strings.join(""));
    }
}
