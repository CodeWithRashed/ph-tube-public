console.log("Linked With PH TUBE JS");

const getWebData = async () => {
  let dataUrl = "https://openapi.programming-hero.com/api/videos/categories";
  const res = await fetch(dataUrl);
  const rawData = await res.json();
  const data = rawData.data;
  let categoryContainer = document.querySelector(".category-container");
  data.forEach((category) => {
    console.log(category);
    let categoryItem = document.createElement("a");
    categoryItem.classList = "bg-[#25252520] py-2 px-7 rounded text-[#25252590] font-bold"
    categoryItem.innerText = `${category.category}`;
    categoryContainer.appendChild(categoryItem);
  });
};

getWebData();
