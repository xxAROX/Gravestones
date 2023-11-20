import {system, world} from "@minecraft/server";
import {onDeathAfter} from "./events";

function main() {
	world.afterEvents.entityDie.subscribe(onDeathAfter);
	world.afterEvents.worldInitialize.subscribe(onWorldInitialize)
}

system.run(main);
