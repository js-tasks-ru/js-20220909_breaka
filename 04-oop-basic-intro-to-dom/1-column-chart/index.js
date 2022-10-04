export default class ColumnChart {
  constructor(props = {}) {
    const { data = [], value = 0, link = '', label = '', formatHeading = data => data } = props;

    this.data = data;
    this.value = formatHeading(value);
    this.link = link;
    this.label = label;
    this.chartHeight = 50;
    this.subElements = {};

    this.render();
  }

  chartStyle () {
    return this.data.length
      ? `column-chart`
      : `column-chart column-chart_loading`; 
  }

  getTemplate () {
    return `
      <div class="${this.chartStyle()}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
        </div>
        <div data-element="body" class="column-chart__chart">
          ${this.getColumnBody()}
        </div>
      </div>
    `;
  }

  getColumnBody () {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;
    const resultChart = this.data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);
        const value = Math.floor(item * scale);
      
        return `<div style="--value:${value}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
    
    return resultChart;
  }

  getLink () {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>`
      : "";
  }

  getSubElements () {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const item = subElement.dataset.element;

      result[item] = subElement;
    }

    return result;
  }

  update (data = []) {
    this.data = data;

    this.subElements.body.innerHTML = this.getSubElements();
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
    this.subElements = null;
  }

  render () {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;

    this.subElements = this.getSubElements();
  }
}
