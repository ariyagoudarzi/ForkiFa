import { View } from "./View";
import icons from "url:../../img/icons.svg";

class resultsView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return this._data.map(this.#generateMarkupPreview).join("");
  }

  #generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link ${
          results.id === id ? "preview__link--active" : ""
        }" href="#${results.id}">
          <figure class="preview__fig">
            <img src="${results.imageUrl}" alt="${results.id}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
            <div class="recipe__user-generated ${results.key ? "" : "hidden"}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
    </li>
    `;
  }
}

export default new resultsView();
