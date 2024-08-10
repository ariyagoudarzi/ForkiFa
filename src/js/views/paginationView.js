import { View } from "./View";
import icons from "url:../../img/icons.svg";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");
  #curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const pageNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    this.#curPage = this._data.page;
    // page 1, there is other page
    if (this.#curPage === 1 && pageNum && pageNum > 1) {
      return this._generateNextMarkup();
    }

    // last page
    else if (pageNum && pageNum === this.#curPage) {
      return this._generatePrevMarkup();
    }

    // other pages
    else if (pageNum && pageNum > this.#curPage) {
      return `${this._generatePrevMarkup()}${this._generateNextMarkup()}`;
    }

    // page 1, there is No other pages
    return "";
  }

  _generateNextMarkup() {
    return `<button data-goto="${
      this.#curPage + 1
    }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>صفحه ${Intl.NumberFormat("fa-IR").format(
              this.#curPage + 1
            )}</span>
            </button>`;
  }

  _generatePrevMarkup() {
    return `<button data-goto="${
      this.#curPage - 1
    }" class="btn--inline pagination__btn--prev">
              <span>صفحه ${Intl.NumberFormat("fa-IR").format(
                this.#curPage - 1
              )}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
          </button>`;
  }
}

export default new paginationView();
