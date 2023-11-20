import {system, world} from "@minecraft/server";
import {onDeathAfter} from "./events";

function main() {
	world.afterEvents.entityDie.subscribe(onDeathAfter);
}

system.run(main);
