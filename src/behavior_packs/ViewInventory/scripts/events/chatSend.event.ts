import { ChatSendBeforeEvent, DimensionType, MinecraftDimensionTypes, Player, system, world } from '@minecraft/server';
import { UseTags } from '../enum/index';
import InventoryFormData from '../uis/inventory.ui';
import { MinecraftEntityTypes } from '../vanilla-data/lib/index';

class Before {
    static always(): (ev: ChatSendBeforeEvent) => void {
        return (ev: ChatSendBeforeEvent) => {
            const { message, sender } = ev;

            // Command_Debug(ev, message, sender);

            Command_Inventory(ev, message, sender);

            return;
        };
    }
}

const Command_Debug = (ev: ChatSendBeforeEvent, message: string, sender: Player) => {
    const message_split = message.split(' '); // メッセージをスペースで分割

    // メッセージのはじめが「!debug」と一致するか確認
    if (message_split[0] !== '!debug' && message_split[0] !== '！debug') return;

    // 送ったプレイヤーが開発者タグを持っているか
    if (!sender.hasTag(UseTags.Development)) {
        // 権限がない場合はメッセージを送信し、イベントをキャンセル
        ev.cancel = true;
        return;
    }

    //メッセージのindexの1をチェク
    switch (message_split[1]) {
        case undefined:
            // キャンセルし返す
            ev.cancel = true;
            return;
        case 'allow_space':
            system.runTimeout(() => {
                const entity1 = world.getDimension(sender.dimension.id).spawnEntity(MinecraftEntityTypes.ArmorStand, sender.location);

                const location = { x: sender.location.x, y: sender.location.y, z: sender.location.z + 1 };
                const entity2 = world.getDimension(sender.dimension.id).spawnEntity(MinecraftEntityTypes.ArmorStand, location);

                // 半角スペース
                entity1.nameTag = 'Test ArmorStand';
                // 全角スペース
                entity2.nameTag = 'Test　ArmorStand';

                const getEntity = world.getDimension(sender.dimension.id).getEntities({ name: entity1.nameTag })[0];
                const getEntity2 = world.getDimension(sender.dimension.id).getEntities({ name: entity2.nameTag })[0];

                sender.sendMessage('Entity1: ' + getEntity?.nameTag);
                sender.sendMessage('Entity2: ' + getEntity2?.nameTag);

                //entity1.remove();
                //entity2.remove();
            }, 1);

            ev.cancel = true;
            return;
        default:
            // キャンセルし返す
            sender.sendMessage('Command not found');
            ev.cancel = true;
            return;
    }
};

const Command_Inventory = (ev: ChatSendBeforeEvent, message: string, sender: Player) => {
    const arg1 = message.split(' ')[0]; // メッセージをスペースで分割

    // メッセージのはじめが「!inventory」と一致するか確認
    if (arg1 !== '!inventory' && arg1 !== '！inventory') return;

    // 送ったプレイヤーにallow_view_inventoryタグがあるか確認
    if (!sender.hasTag(UseTags.AllowViewInventory)) {
        // 権限がない場合はメッセージを送信し、イベントをキャンセル
        sender.sendMessage({ translate: 'command.inventory.permission.no' });
        ev.cancel = true;
        return;
    }

    const arg2 = message.split('!inventory ')[1]; // メッセージのindexの1を取得

    //メッセージのindexの1をチェク
    switch (arg2) {
        case '--help':
        case '-h':
        case 'help':
        case 'h':
        case undefined:
            // ヘルプメッセージを送信
            sender.sendMessage({ translate: 'command.inventory.help' });
            ev.cancel = true;
            return;
        default:
            // すべてのプレイヤーの名前を取得
            const all_player_names = world.getAllPlayers().map((player) => player.name);

            // メッセージのindexの1がプレイヤー名に一致するか確認
            if (!all_player_names.includes(arg2)) {
                // プレイヤー名が存在しない場合はメッセージを送信し、イベントをキャンセル
                sender.sendMessage({ translate: 'command.inventory.player.not_found', with: [arg2] });
                ev.cancel = true;
                return;
            } else {
                // プレイヤー名が存在する場合はプレイヤー名を取得
                const target_player = world.getPlayers({ name: arg2 })[0];

                // チャットを閉じるメッセージを送信
                sender.sendMessage({ translate: 'command.inventory.close.chat' });

                // プレイヤーにインベントリを表示する
                system.run(() => InventoryFormData.show(sender, target_player));

                ev.cancel = true;

                return;
            }
    }
};

class After {
    static always(): (ev: ChatSendBeforeEvent) => void {
        return (ev: ChatSendBeforeEvent) => {};
    }
}

export default class ChatSendEvent {
    static readonly before_always = Before.always();
    static readonly after_always = After.always();
}
