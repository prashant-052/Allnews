const API_KEY="04494f417e1e4e9cb53e5eca9fd24c0c";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDisc=cardClone.querySelector('#news-disc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDisc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",
{timeZone:"Asia/Jakarta"});
newsSource.innerHTML=`${article.source.name} . ${date}`;


cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
});

}
function onNavItemClick(id){
    fetchNews(id);

    const navItem=document.getElementById(id);
    curSelectednav?.classList.remove('active');
    curSelectednav=navItem;
    curSelectednav.classList.addEventListener('active');

}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curSelectednav?.classList.remove('active');
    curSelectednav=null;
});
