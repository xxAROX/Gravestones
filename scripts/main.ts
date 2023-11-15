import {system, world} from "@minecraft/server";
import {onDeathAfter} from "./events";

function main() {
	world.afterEvents.entityDie.subscribe(onDeathAfter, {
		entityTypes: ["player"]
	});
}

system.run(main);
