async function fetchNews(category) {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/${category}.rss`);
    const data = await res.json();
    return data;
}

function consumeNews() {
    const category = ['indian', 'indianpolitics', 'world', 'indiansports', 'indianbusiness', 'travel', 'fashion', 'weather']
    const newsEle = document.getElementById('news');
    category.forEach(async (ele, index) => {
        const data = await fetchNews(ele);
        const categoryTitle = data['feed']['title'];
        const newsArray = data['items'];
        console.log(newsArray);
        newsEle.innerHTML += `<div class="accordion" id="accordionExample-${index + 1}">
                    <div class="accordion-item">
                            <h2 class="accordion-header" id="heading-${index + 1}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse-${index + 1}" aria-expanded="true"
                                            aria-controls="collapse-${index + 1}"> ${categoryTitle}
                            </h2>
                            <div id="collapse-${index + 1}" class="accordion-collapse collapse show"
                                    aria-labelledby="heading-${index + 1}" data-bs-parent="#accordionExample-${index + 1}">
                                    <div class="accordion-body">
                                            <div id="carouselExampleControls-${index + 1}" class="carousel slide"
                                                    data-bs-ride="carousel">
                                                    <div class="carousel-inner" id="carousel-${index + 1}">
                                                    </div>
                                                    <button class="carousel-control-prev" type="button"
                                                            data-bs-target="#carouselExampleControls-${index + 1}"
                                                            data-bs-slide="prev">
                                                            <span class="carousel-control-prev-icon"
                                                                    aria-hidden="true"></span>
                                                            <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button"
                                                            data-bs-target="#carouselExampleControls-${index + 1}"
                                                            data-bs-slide="next">
                                                            <span class="carousel-control-next-icon"
                                                                    aria-hidden="true"></span>
                                                            <span class="visually-hidden">Next</span>
                                                    </button>
                                            </div>
                                    </div>
                            </div>
                    </div>

            </div>`;
        const carousel = document.getElementById(`carousel-${index + 1}`);
        newsArray.forEach((ele, index) => {
            carousel.innerHTML += `<div class="carousel-item ${index == 0 ? 'active' : ''}">
                                            <div class="card">
                                                    <a href=${ele['link']} target="_blank"><img src=${ele['enclosure']['link']} class="card-img-top"
                                                            alt="some image" onerror="this.onerror=null;this.src='https://bitsofco.de/content/images/2018/12/broken-1.png';"></a>
                                                    <div class="card-body">
                                                            <h5 class="card-title" style="font-weight: 700;">${ele['title']}</h5>
                                                            <div class="authorTime">By ${ele['author'] == "" ? "Unknown" : ele['author']}
                                                                                    <ul><li>${new Date(ele['pubDate']).toLocaleDateString("en-IN")}</li></ul>
                                                            </div>
                                                            <p class="card-text description">${ele['description']}</p>
                                                    </div>
                                            </div>
                                        </div>`;
        });

    });
}

consumeNews();