import { ChatSendBeforeEvent, system, world } from '@minecraft/server';
import { UseTags } from '../enum/index';
import InventoryFormData from '../uis/inventory.ui';

class Before {
    static always(): (ev: ChatSendBeforeEvent) => void {
        return (ev: ChatSendBeforeEvent) => {
            const { message, sender } = ev;

            const message_split = message.split(' '); // メッセージをスペースで分割

            // メッセージのはじめが「!inventory」と一致するか確認
            if (message_split[0] !== '!inventory' && message_split[0] !== '！inventory') return;

            // 送ったプレイヤーにallow_view_inventoryタグがあるか確認
            if (!sender.hasTag(UseTags.AllowViewInventory)) {
                // 権限がない場合はメッセージを送信し、イベントをキャンセル
                sender.sendMessage({ translate: 'command.inventory.permission.no' });
                ev.cancel = true;
                return;
            }

            //メッセージのindexの1をチェク
            switch (message_split[1]) {
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
                    if (!all_player_names.includes(message_split[1])) {
                        // プレイヤー名が存在しない場合はメッセージを送信し、イベントをキャンセル
                        sender.sendMessage({ translate: 'command.inventory.player.not_found', with: [message_split[1]] });
                        ev.cancel = true;
                        return;
                    } else {
                        // プレイヤー名が存在する場合はプレイヤー名を取得
                        const target_player = world.getPlayers({ name: message_split[1] })[0];

                        // チャットを閉じるメッセージを送信
                        sender.sendMessage({ translate: 'command.inventory.close.chat' });

                        // プレイヤーにインベントリを表示する
                        system.run(() => InventoryFormData.show(sender, target_player));

                        ev.cancel = true;

                        return;
                    }
            }
        };
    }
}

class After {
    static always(): (ev: ChatSendBeforeEvent) => void {
        return (ev: ChatSendBeforeEvent) => {};
    }
}

export default class ChatSendEvent {
    static readonly before_always = Before.always();
    static readonly after_always = After.always();
}
