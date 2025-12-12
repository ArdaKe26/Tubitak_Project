// Global chat mesaj listesi (hafızada saklanır)
let chatMessages: { from: "user" | "assistant"; text: string }[] = [];

// Mesaj ekleme
export function addChatMessage(entry: { from: "user" | "assistant"; text: string }) {
  chatMessages.push(entry);
}

// Mesajları alma
export function getChatMessages() {
  return chatMessages;
}

// Mesajları temizleme (istersen kullanırsın)
export function clearChatMessages() {
  chatMessages = [];
}
