export const EditorHandleKeyDown = (
  view: any,
  event: KeyboardEvent,
  onSave: () => void,
  onExit: () => void,
): boolean => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    onSave();
    return true;
  }

  return false;
};
