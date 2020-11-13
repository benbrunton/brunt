const createDomButtonController = (buttonList) => {

  let activeButtons = [];

  const listen = () => {
    buttonList.forEach(btn => {
      btn.addEventListener('mousedown', () => {
        buttonPressed(btn);
      });

      btn.addEventListener('touchstart', () => {
        buttonPressed(btn);
      });

      btn.addEventListener('mouseup', () => {
        buttonReleased(btn);
      });

      btn.addEventListener('touchend', () => {
        buttonReleased(btn);
      });

    });
  };

  const buttonPressed = (btn) => {
    if(!activeButtons.includes(btn)) {
      activeButtons.push(btn);
    }
  };

  const buttonReleased = (btn) => {
    activeButtons = activeButtons.filter(x => x !== btn);
  };

  const getActiveButtons = () => {
    return activeButtons;
  };

  return { listen, getActiveButtons };
};

export default createDomButtonController;
