function byId(idName) {
  return document.getElementById(idName);
}

function hide(dom) {
  dom.style.display = "none";
}

function show(dom) {
  dom.style.display = "block";
}

const domGroup = {
  page: {
    menu: byId("js-menu-page"),
    game: byId("js-game-page"),
    me: byId("js-me-page"),
  },

  btn: {
    goMePage: byId("js-go-me-page-btn"),
    mePageBack: byId("js-me-page-back-btn"),
  },
};

function hideAllPage() {
  hide(domGroup.page.menu);
  hide(domGroup.page.game);
  hide(domGroup.page.me);
}

function showMePage() {
  hideAllPage();

  show(domGroup.page.me);
}

function showMenuPage() {
  hideAllPage();

  show(domGroup.page.menu);
}

function showGamePage() {
  hideAllPage();

  show(domGroup.page.game);
}

function bindEvent() {

  document.body.addEventListener("click", function (event) {
    event.stopPropagation();

    const elem = event.target;
    console.log(elem);

    const action = elem.getAttribute("data-action");

    if (action) {
      switch (action) {
        case "go-me-page": {
          setTimeout(() => {
            showMePage();
          }, 200)
          
          break;
        }

        case "go-menu-page": {
          showMenuPage();
          break;
        }

        case "go-game-page": {
          showGamePage();
          break;
        }
      }
    }
  });
}

export { bindEvent };
