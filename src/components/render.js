const renderComponent = function (container, html) {
  container.insertAdjacentHTML(`beforeend`, html);
};

export default renderComponent;
