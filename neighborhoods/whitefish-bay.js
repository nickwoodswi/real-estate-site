function menuDrop() {
    $('.menu-button-container').on('click', function() {
      $('.navwrapper').toggleClass('mobileNav');
    });
  }
  
  function neighborhoodsDrop() {
    $('#neighborhoods').on('click', function() {
     let text = document.getElementById('neighborhoods');
      if (text.innerHTML === '<a href="#" onclick="return false;">+ HOMES FOR SALE</a>') {
        text.innerHTML = '<a href="#" onclick="return false;">- HOMES FOR SALE</a>'
      } else {text.innerHTML = '<a href="#" onclick="return false;">+ HOMES FOR SALE</a>'};
      $('.neighborhoodsHidden').toggleClass('neighborhoodsOpen');
    })
  };
  
  let searchUrl =
    'https://www.firstweber.com/homes-for-sale/whitefish+bay_combo/P_lp-cd-presentation/sc_l_listing_price+DESC/sd_S2/';
  
  const neighborhoods = {
    '#oneMil':
      'https://www.firstweber.com/homes-for-sale/Whitefish+Bay_combo/1000000_search-price-low/P_lp-cd-presentation/sc_lsearch_amt_search_price+DESC/sd_S2/',
   '#fiveK':
      'https://www.firstweber.com/homes-for-sale/Whitefish+Bay_combo/500000_search-price-low/999999_search-price-high/P_lp-cd-presentation/sc_lsearch_amt_search_price+DESC/sd_S2/',
    '#zero':
      'https://www.firstweber.com/homes-for-sale/Whitefish+Bay_combo/0_search-price-low/499999_search-price-high/P_lp-cd-presentation/sc_l_listing_price+DESC/sd_S2/',
  };
  
  function loadPropertyDetails(url) {
    fetch(url)
    .then((response) => {
      return response.text();
    })
    .then ((pageSource) => {
      const properties = [];
      $.each($(pageSource), function(_, element) {
        if (element.id === 'pagewrap') {
          const $listing = $(element).find('.props_summary .property');
          $listing.each(function(i, property) {
            const street = $(property)
              .find('.address')
              .text();
            const streetSubj = $(property)
              .find('.address')
              .text()
              .split(" ")
              .join("%20");
            const city = $(property)
              .find('.city')
              .text();
            const price = $(property)
              .find('.price')
              .text()
              .trim();
            const [bedrooms, full, half] = $(property)
              .find('.bedbath')
              .text()
              .trim()
              .split('|')
              .filter(room => room.length > 1)
              .map(string => {
                return string.trim();
              });
            const rooms = { bedrooms, full, half };
            const link = `http://firstweber.com/${$(property)
              .find('.tilelink')
              .attr('href')}`;
            const photo = $(property)
              .find('img')
              .attr('src');
            if (
              city &&
              price &&
              street &&
              link &&
              photo &&
              Object.values(rooms).filter(value => value).length >= 2
            )
              properties.push({ street, city, price, rooms, link, photo, streetSubj });
          });
        }
      });
      buildPreviews(properties);
    });
  }
  function buildPreviews(properties) {
    const payload = properties.map(property => {
      const { city, price, street, link, photo, streetSubj } = property;
      const { bedrooms, full, half } = property.rooms;
      const rooms = half
        ? `${bedrooms} / ${full} / ${half}</div>`
        : `${bedrooms} / ${full}</div>`;
      return `<div class="listing">
          <div class="property-photo-container">
              <img class="property-photo" src="${photo}" alt="property-preview-photo"></img>
          </div>
          <div class="property-info-container">
              <div class="city">${city}</div>
              <div class="rooms">${rooms}</div>
              <div class="price-address-container">
                  <div class="price">${price} </div>
                  <div class="address">${street}</div>
              </div>
              <div class="property-details">
                  <a href="mailto:ksewart@firstweber.com?subject=Schedule%20showing%20at%20${streetSubj}">Schedule Showing</a> | <a href="${link}" target="_blank">View Full Listing</a>
              </div>
          </div>
      </div>`;
    });
    if (payload.length === 0) {
      $('.listings').html(`<div class="noResults"><h1>No results found</h1></div>`)
    } else {
    $('.listings').html(payload)};
  }
  function chooseNeighborhood() {
    Object.keys(neighborhoods).forEach(id => {
      $(id).on('click', function() {
        $('.listings').empty();
        loadPropertyDetails(neighborhoods[id]);
      });
    });
  }
  loadPropertyDetails(searchUrl);
  menuDrop();
  chooseNeighborhood();
  neighborhoodsDrop();