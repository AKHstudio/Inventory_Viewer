import { BlockPermutation, ItemStack } from '@minecraft/server';
import { MinecraftBlockTypes, MinecraftItemTypes } from './vanilla-data/lib/index';

const stateTypes = new Map<string, Record<string, string | number | boolean> | undefined>([[MinecraftItemTypes.CobblestoneWall, { wall_block_type: '' }]]);

export const DataTypes: { type: string; dataType: string; itemStack: ItemStack | undefined }[] = [
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'cobblestone_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'mossy_cobblestone_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'granite_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'diorite_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'andesite_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'sandstone_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'brick_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'stone_brick_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'mossy_stone_brick_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'end_brick_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'nether_brick_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'prismarine_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'red_sandstone_wall'),
    getItemStackFromBlockType(MinecraftItemTypes.CobblestoneWall, 'red_nether_brick_wall'),
];

function getItemStackFromBlockType(type: string, dataType: string): { type: string; dataType: string; itemStack: ItemStack | undefined } {
    const originalString = dataType;
    const lastIndex = originalString.lastIndexOf('_');
    const resultString = originalString.substring(0, lastIndex);

    let state = stateTypes.get(type);

    if (type.includes(dataType)) {
        state = undefined;
    } else {
        if (state) {
            state.wall_block_type = resultString;
        }
    }

    return {
        type: type,
        dataType: dataType,
        itemStack: BlockPermutation.resolve(type, state).getItemStack(),
    };
}
