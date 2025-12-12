// Basit global store
let feedbackList: { to: string; text: string }[] = [];

export function addFeedback(entry: { to: string; text: string }) {
  feedbackList.unshift(entry);
}

export function getFeedbacks() {
  return feedbackList;
}
