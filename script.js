const tabs = document.getElementById("tabs");
const products = document.getElementById("products");

if (tabs && products) {
  const allTabs = [...tabs.querySelectorAll(".tab")];
  const allProducts = [...products.querySelectorAll(".product")];

  function setActive(tab) {
    allTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  }

  function filterBy(category) {
    allProducts.forEach(p => {
      const c = p.dataset.category;
      const show = category === "all" || c === category;
      p.style.display = show ? "" : "none";
    });
  }

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const filter = tab.dataset.filter;
    setActive(tab);
    filterBy(filter);
  });
}
