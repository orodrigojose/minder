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

  if (event.ctrlKey && event.key === "w") {
    event.preventDefault();
    onSave();
    onExit();
    return true;
  }

  if (event.ctrlKey && event.key === "q") {
    event.preventDefault();
    onExit();
    return true;
  }

  return false;
};
