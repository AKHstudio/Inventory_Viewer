import { EntityInventoryComponent, ItemEnchantableComponent, Player, RawText, world } from '@minecraft/server';
import { ActionFormResponse, FormCancelationReason } from '@minecraft/server-ui';
import { ChestFormData } from './extensions/forms';
import { DataTypes } from '../data';

const Player_Max_Inventory = 36;
const ui_flag = 'custom_inventory_ui:';

export default class InventoryFormData {
    static show(player: Player, target: Player): void {
        const inventory = target.getComponent(EntityInventoryComponent.componentId)?.container;
        if (!inventory) return;

        const form = new ChestFormData('36').title(`Inventory of ${target.name}`);

        for (let i = 0; i < Player_Max_Inventory; i++) {
            const item = inventory.getItem(i);
            if (item) {
                //player.sendMessage(`Slot ${i}: ${item.type.id}  count : ${item.amount}`); // debug

                // player.sendMessage(`id: ${item.type.id} , ${item.typeId} , ${item.nameTag}`); // debug

                const type = item.type.id;

                if (isDataItem(type)) {
                    const dataType = DataTypes.filter((data) => data.type === type);

                    dataType.some((data) => {
                        const itemStack = data.itemStack;
                        if (!itemStack) return false;

                        if (item.isStackableWith(itemStack)) {
                            const getEnchantable = item.getComponent(ItemEnchantableComponent.componentId);
                            if (getEnchantable?.isValid()) {
                                const count_enchant_list = getEnchantable.getEnchantments().length;

                                const is_enchant = count_enchant_list > 0;

                                setButton(form, i, 'minecraft:' + data.dataType, item.getLore(), item.amount, is_enchant);

                                return true;
                            }

                            setButton(form, i, 'minecraft:' + data.dataType, item.getLore(), item.amount, false);

                            return true;
                        }

                        return false;
                    });

                    continue;
                }

                const getEnchantable = item.getComponent(ItemEnchantableComponent.componentId);
                if (getEnchantable?.isValid()) {
                    const count_enchant_list = getEnchantable.getEnchantments().length;

                    const is_enchant = count_enchant_list > 0;

                    setButton(form, i, type, item.getLore(), item.amount, is_enchant);

                    continue;
                }

                setButton(form, i, type, item.getLore(), item.amount, false);
            }

            continue;
        }

        form.show(player).then(({ canceled: c, cancelationReason: reason, selection: s }: ActionFormResponse) => {
            if (c && reason == FormCancelationReason.UserBusy) {
                InventoryFormData.show(player, target);
            } else if (c && reason == FormCancelationReason.UserClosed) {
                return;
            }
        });
    }
}

function setButton(form: ChestFormData, i: number, type: string, lore: string[], amount: number, is_enchant: boolean): void {
    //world.sendMessage(`Slot ${i}: ${type}  count : ${amount}`); // debug

    //form.button(0, type, lore, type, amount, is_enchant);

    if (i < 9) {
        form.button(i + 27, type, lore, type, amount, is_enchant);
        console.log(i + 27);
    } else {
        form.button(i - 9, type, lore, type, amount, is_enchant);
        console.log(i - 9);
    }

    //world.sendMessage(`Slot ${i}`); // debug
}

function isDataItem(type: string): boolean {
    const data = DataTypes.find((data) => data.type === type);

    if (!data) {
        return false;
    }

    return true;
}
