import { world } from '@minecraft/server';
import ChatSendEvent from './events/chatSend.event';

// イベント登録
world.beforeEvents.chatSend.subscribe(ChatSendEvent.before_always);
