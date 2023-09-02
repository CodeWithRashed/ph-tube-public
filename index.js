//Global Variable
let categoryContainer = document.querySelector(".category-container");
let videoContainer = document.querySelector(".video-container");
let mainData = [];

//Getting Category from API function
const getWebData = async () => {
  //Getting Data from API
  let dataUrl = "https://openapi.programming-hero.com/api/videos/categories";
  const res = await fetch(dataUrl);
  const rawData = await res.json();
  const data = rawData.data;

  //Getting Tabs And Append them to Document
  data.forEach((category) => {
    let categoryItem = document.createElement("button");
    categoryItem.addEventListener("click", function () {
      getCategoryData(category.category_id);
    });
    categoryItem.classList =
      "bg-[#25252520] py-1 px-7 rounded text-[#25252590] hover:scale-110  font-bold cursor-pointer focus:bg-[#FF1F3D] focus:text-white";
    categoryItem.innerText = `${category.category}`;
    categoryContainer.appendChild(categoryItem);
  });
};


//Getting video card data from API
const getCategoryData = async (id = 1000) => {
  //Getting Data based on Category
  let url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const res = await fetch(url);
  const rawData = await res.json();
  const data = rawData.data;
  mainData = data;
  appendData(data);
  activeAllBtn(id)
};

//Appending Data to Video Container
const appendData = (dataArray) => {
  videoContainer.innerHTML = "";
  
  //Logic for blank data
  if (dataArray == "") {
    videoContainer.innerHTML = `
    <div class="flex justify-center items-center flex-col space-y-2 col-span-4 mt-12">
    <img src="icon.png" class="h-24 w-24">
    <h1 class="font-bold text-2xl text-center">Oops!! Sorry, There is no <br> content here</h1>
    </div>`;
  }

  //Getting Data One by One
  dataArray.forEach((videoEl) => {
    //Video Details
    let videoThumb = videoEl.thumbnail;
    let videoTitle = videoEl.title;
    //Converting sec into min and hr
    let videoPostedTime = videoEl.others.posted_date;
    let videoPostHour = Math.floor(parseInt(videoPostedTime) / 3600);
    let videoPostMin = Math.floor((parseInt(videoPostedTime) % 3600) / 60);

    let videoPostStatus = "block";

    //Setting Hidden Class if there is no post time
    if (!videoPostedTime) {
      videoPostStatus = "hidden";
    }

    let videoViews = videoEl.others.views;

    //Author Details
    let authorImage = videoEl.authors[0].profile_picture;
    let authorName = videoEl.authors[0].profile_name;
    let authorVerification = videoEl.authors[0].verified;

    let isVerified = "block";
    //Setting Hidden Class if there is no Verification
    if (!authorVerification) {
      isVerified = "hidden";
    }

    //Creating Video Card
    let videoCard = document.createElement("div");
    videoCard.classList = "shadow-lg rounded-xl py-2 px-2";
    videoCard.innerHTML = `
    <div class="relative h-44 bg-black rounded-xl">
      <img src="${videoThumb}" class="object-fill object-center w-full h-full rounded-xl ">
      <h2 class="rounded absolute ${videoPostStatus} text-xs bg-black p-1 px-2 text-white z-20 bottom-2 right-3">${videoPostHour}hrs ${videoPostMin}min ago</h2>
    </div>
    <div class="flex gap-3 mt-5 ">
      <div class="author-image w-8 h-8 rounded-full"> <img class="rounded-full object-cover w-8 h-8 " src="${authorImage}"> </div>
        <div class="video-details space-y-2">
          <h1 class="font-bold">${videoTitle}</h1>
          <div class="flex items-center justify-start gap-1">
          <h3 class="text-[13px] font-medium text-[#17171795]">${authorName} </h3><span class="${isVerified}"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_11_34)">
          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
          <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
          </g>
          <defs>
          <clipPath id="clip0_11_34">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          
        </span>
          </div>
          
          <p class="text-[13px] font-medium text-[#17171795]">${videoViews} <span>views</span> </p>
         </div>
    </div>
    `;
    //Appending Video Card
    videoContainer.appendChild(videoCard);
  });
};

//Sorting Data Function
const doSorting = () => {
  mainData.sort((firstData, secData) => {
    let firstDataViews = firstData.others.views;
    let secDataViews = secData.others.views;
    return parseInt(secDataViews) - parseInt(firstDataViews);
  });
  appendData(mainData);
};

//navigate to Questions and Answers html file
const gotoQna = () => {
  window.open("qna.html", "_blank");
};

//Set All Tab active by default
const activeAllBtn = (tabId) => {
  if(tabId == 1000){
    console.log("BUtton is active")
  }

}

//Calling For First Time Load
getWebData();
getCategoryData();
