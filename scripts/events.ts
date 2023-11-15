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

	const inventoryComponent = player.getComponent(EntityInventoryComponent.componentId);
	if (!(inventoryComponent instanceof EntityInventoryComponent)) return;

	const block = dimension.getBlock(location);
	if (!block) return;
	block.setPermutation(BlockPermutation.resolve("gravestones:default_gravestone"));
	block.getComponent(BlockInventoryComponent.componentId);
}

export {
	onDeathAfter,
};
