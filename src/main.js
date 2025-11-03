// import './style.css';

async function fetchDataFromAPIEndpoint() {
    try {  
        const response = await fetch('/.netlify/functions/fetchNotion');
        const data = await response.json();
        const cards = data.results; 
        
        document.querySelector('.container').innerHTML = cards
            .map((card) => `
                             <div class="card">
                    <div class="card-image"> 
                        <img src="${card.properties.image?.files?.[0]?.external?.url || 'https://placebeard.it/200x100'}" 
                             alt="${card.properties.Name?.title?.[0]?.plain_text || ''}"
                             class="card__image">
                    </div>
                    <div class="card-content"> 
                        <div class="rating-stars">
                            <i class="bx bx-star active"></i>
                            <i class="bx bx-star active"></i>
                            <i class="bx bx-star active"></i>
                            <i class="bx bx-star active"></i>
                            <i class="bx bx-star"></i>
                        </div> 
                        <div class="content-info">
                                 <h3>${card.properties.Name?.title?.[0]?.plain_text || 'Hangover Bar'}</h3>
                        <p class="cart-text"> 
                            ${card.properties.content?.rich_text?.[0]?.plain_text || ''}
                        </p>  
                        </div>                          
                        <a href="${card.properties.Link?.rich_text?.[0]?.plain_text || '#'}" 
                           class="add-to-cart">
                           ${card.properties.Btn__text?.rich_text?.[0]?.plain_text || 'Click link'}
                        </a>
                    </div> 
                </div>
            `).join(''); 
    } catch (error) {
        console.error('Error:', error);
    }
}



fetchDataFromAPIEndpoint();

