import type { ChatPreview } from '../../types/chat.types';

export type ChatListItemProps = {
  item: ChatPreview;
  onPress: () => void;
};
