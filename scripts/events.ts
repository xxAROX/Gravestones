import {
	BlockInventoryComponent,
	BlockPermutation,
	EntityDieAfterEvent,
	EntityInventoryComponent,
	Player,
	world
} from "@minecraft/server";

function onDeathAfter(event: EntityDieAfterEvent): void{
	if (!(event.deadEntity instanceof Player)) return;
	const player = event.deadEntity as Player;
	const dimension = world.getDimension(player.dimension.id);
	const location = player.location;
	player.sendMessage("EntityDieAfterEvent at " + `X=${location.x}; Y=${location.y}; Z=${location.z}`);

	// NOTE: Copy the inventory
	const inv = player.getComponent(EntityInventoryComponent.componentId) as EntityInventoryComponent;
	const contents = [];
	for (let slot=0; slot<inv.container.size; slot++) {
		contents[slot] = inv.container.getItem(slot);
	}
	const block = dimension.getBlock(location);
	if (!block) return;
	block.setPermutation(BlockPermutation.resolve("gravestones:default_gravestone"));
	const entity = dimension.spawnEntity("minecraft:slime", location);
	const grave_inventory = block.getComponent(BlockInventoryComponent.componentId) as BlockInventoryComponent;
	player.sendMessage(grave_inventory ? "grave_inventory exists" : "grave_inventory doesn't exists");
}

export {
	onDeathAfter,
};
